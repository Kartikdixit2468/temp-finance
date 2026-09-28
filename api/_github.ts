interface GitHubContentResponse {
  content: string;
  encoding: string;
  sha: string;
  html_url: string;
}

export interface StoredEventConfig {
  datetime: string;
  durationMinutes: number;
  updatedAt?: string;
}

const requiredEnv = (name: string): string => {
  const value = process.env[name];
  if (!value) throw new Error(`Missing required environment variable: ${name}`);
  return value;
};

const getRepositoryConfig = () => ({
  owner: requiredEnv('GITHUB_OWNER'),
  repo: requiredEnv('GITHUB_REPO'),
  branch: process.env.GITHUB_BRANCH || 'main',
  path: process.env.GITHUB_EVENT_FILE_PATH || 'public/event.json',
  token: requiredEnv('GITHUB_ADMIN_TOKEN'),
});

const githubHeaders = (token: string): HeadersInit => ({
  Accept: 'application/vnd.github+json',
  Authorization: `Bearer ${token}`,
  'Content-Type': 'application/json',
  'User-Agent': 'youfinance-event-admin',
  'X-GitHub-Api-Version': '2022-11-28',
});

const getContentUrl = (owner: string, repo: string, path: string): string => {
  const encodedPath = path.split('/').map(encodeURIComponent).join('/');
  return `https://api.github.com/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/contents/${encodedPath}`;
};

const readGitHubError = async (response: Response): Promise<string> => {
  try {
    const body = (await response.json()) as { message?: string };
    return body.message || `GitHub returned ${response.status}`;
  } catch {
    return `GitHub returned ${response.status}`;
  }
};

export const readStoredEventConfig = async (): Promise<{
  event: StoredEventConfig;
  sha: string;
  fileUrl: string;
}> => {
  const config = getRepositoryConfig();
  const response = await fetch(
    `${getContentUrl(config.owner, config.repo, config.path)}?ref=${encodeURIComponent(config.branch)}`,
    { headers: githubHeaders(config.token) },
  );

  if (!response.ok) throw new Error(await readGitHubError(response));

  const content = (await response.json()) as GitHubContentResponse;
  if (content.encoding !== 'base64') throw new Error('Unexpected GitHub content encoding');

  const event = JSON.parse(
    Buffer.from(content.content.replace(/\n/g, ''), 'base64').toString('utf8'),
  ) as StoredEventConfig;

  return { event, sha: content.sha, fileUrl: content.html_url };
};

export const updateStoredEventConfig = async (
  event: StoredEventConfig,
): Promise<{ changed: boolean; commitUrl?: string; fileUrl: string }> => {
  const config = getRepositoryConfig();
  const current = await readStoredEventConfig();
  const unchanged =
    current.event.datetime === event.datetime &&
    current.event.durationMinutes === event.durationMinutes;

  if (unchanged) return { changed: false, fileUrl: current.fileUrl };

  const nextEvent: StoredEventConfig = {
    datetime: event.datetime,
    durationMinutes: event.durationMinutes,
    updatedAt: new Date().toISOString(),
  };
  const response = await fetch(getContentUrl(config.owner, config.repo, config.path), {
    method: 'PUT',
    headers: githubHeaders(config.token),
    body: JSON.stringify({
      message: `Update event schedule to ${event.datetime}`,
      content: Buffer.from(`${JSON.stringify(nextEvent, null, 2)}\n`).toString('base64'),
      sha: current.sha,
      branch: config.branch,
    }),
  });

  if (!response.ok) throw new Error(await readGitHubError(response));

  const result = (await response.json()) as {
    commit?: { html_url?: string };
    content?: { html_url?: string };
  };

  return {
    changed: true,
    commitUrl: result.commit?.html_url,
    fileUrl: result.content?.html_url || current.fileUrl,
  };
};
