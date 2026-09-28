export const jsonResponse = (
  body: unknown,
  status = 200,
  headers: HeadersInit = {},
): Response =>
  Response.json(body, {
    status,
    headers: {
      'Cache-Control': 'no-store',
      ...headers,
    },
  });

export const methodNotAllowed = (allowed: string[]): Response =>
  jsonResponse(
    { error: 'Method not allowed' },
    405,
    { Allow: allowed.join(', ') },
  );

export const isSameOriginRequest = (request: Request): boolean => {
  const origin = request.headers.get('origin');
  const forwardedHost = request.headers.get('x-forwarded-host')?.split(',')[0]?.trim();
  const host = forwardedHost || request.headers.get('host');

  if (!origin || !host) return false;

  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
};
