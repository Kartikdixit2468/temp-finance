import {
  createHmac,
  scryptSync,
  timingSafeEqual,
} from 'node:crypto';

const SESSION_COOKIE_NAME = 'youfinance_event_admin';
const SESSION_DURATION_SECONDS = 8 * 60 * 60;

interface SessionPayload {
  sub: string;
  exp: number;
}

const requiredEnv = (name: string): string => {
  const value = process.env[name];
  if (!value) throw new Error(`Missing required environment variable: ${name}`);
  return value;
};

const safeEqual = (left: string, right: string): boolean => {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);
  return leftBuffer.length === rightBuffer.length && timingSafeEqual(leftBuffer, rightBuffer);
};

const sign = (value: string): string =>
  createHmac('sha256', requiredEnv('SESSION_SECRET')).update(value).digest('base64url');

export const verifyAdminCredentials = (username: string, password: string): boolean => {
  const expectedUsername = requiredEnv('ADMIN_USERNAME');
  const encodedHash = requiredEnv('ADMIN_PASSWORD_HASH');
  const [algorithm, saltHex, expectedHashHex] = encodedHash.split('$');

  if (algorithm !== 'scrypt' || !saltHex || !expectedHashHex) {
    throw new Error('ADMIN_PASSWORD_HASH must use the scrypt$salt$hash format');
  }

  const usernameMatches = safeEqual(username, expectedUsername);
  const actualHash = scryptSync(password, Buffer.from(saltHex, 'hex'), 64);
  const expectedHash = Buffer.from(expectedHashHex, 'hex');
  const passwordMatches =
    actualHash.length === expectedHash.length && timingSafeEqual(actualHash, expectedHash);

  return usernameMatches && passwordMatches;
};

export const createSessionToken = (username: string): string => {
  const payload: SessionPayload = {
    sub: username,
    exp: Math.floor(Date.now() / 1000) + SESSION_DURATION_SECONDS,
  };
  const encodedPayload = Buffer.from(JSON.stringify(payload)).toString('base64url');
  return `${encodedPayload}.${sign(encodedPayload)}`;
};

const readCookie = (request: Request, name: string): string | undefined => {
  const cookies = request.headers.get('cookie');
  if (!cookies) return undefined;

  for (const item of cookies.split(';')) {
    const [key, ...valueParts] = item.trim().split('=');
    if (key === name) return decodeURIComponent(valueParts.join('='));
  }
  return undefined;
};

export const getAdminSession = (request: Request): SessionPayload | null => {
  const token = readCookie(request, SESSION_COOKIE_NAME);
  if (!token) return null;

  const [encodedPayload, signature] = token.split('.');
  if (!encodedPayload || !signature || !safeEqual(signature, sign(encodedPayload))) return null;

  try {
    const payload = JSON.parse(Buffer.from(encodedPayload, 'base64url').toString('utf8')) as SessionPayload;
    const expectedUsername = requiredEnv('ADMIN_USERNAME');
    if (payload.exp <= Math.floor(Date.now() / 1000) || !safeEqual(payload.sub, expectedUsername)) {
      return null;
    }
    return payload;
  } catch {
    return null;
  }
};

const useSecureCookie = (request: Request): boolean => {
  const forwardedProto = request.headers.get('x-forwarded-proto')?.split(',')[0]?.trim();
  return forwardedProto === 'https' || new URL(request.url).protocol === 'https:';
};

export const createSessionCookie = (request: Request, token: string): string =>
  [
    `${SESSION_COOKIE_NAME}=${encodeURIComponent(token)}`,
    'Path=/',
    'HttpOnly',
    'SameSite=Strict',
    `Max-Age=${SESSION_DURATION_SECONDS}`,
    useSecureCookie(request) ? 'Secure' : '',
  ]
    .filter(Boolean)
    .join('; ');

export const clearSessionCookie = (request: Request): string =>
  [
    `${SESSION_COOKIE_NAME}=`,
    'Path=/',
    'HttpOnly',
    'SameSite=Strict',
    'Max-Age=0',
    useSecureCookie(request) ? 'Secure' : '',
  ]
    .filter(Boolean)
    .join('; ');
