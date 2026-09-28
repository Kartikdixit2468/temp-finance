import {
  createSessionCookie,
  createSessionToken,
  verifyAdminCredentials,
} from '../_auth.js';
import { isSameOriginRequest, jsonResponse, methodNotAllowed } from '../_response.js';

export default {
  async fetch(request: Request): Promise<Response> {
    if (request.method !== 'POST') return methodNotAllowed(['POST']);
    if (!isSameOriginRequest(request)) return jsonResponse({ error: 'Invalid request origin' }, 403);

    try {
      const body = (await request.json()) as { username?: unknown; password?: unknown };
      if (typeof body.username !== 'string' || typeof body.password !== 'string') {
        return jsonResponse({ error: 'Username and password are required' }, 400);
      }
      if (body.username.length > 128 || body.password.length > 256) {
        return jsonResponse({ error: 'Invalid username or password' }, 401);
      }

      if (!verifyAdminCredentials(body.username, body.password)) {
        await new Promise((resolve) => setTimeout(resolve, 500));
        return jsonResponse({ error: 'Invalid username or password' }, 401);
      }

      const token = createSessionToken(body.username);
      return jsonResponse(
        { authenticated: true, username: body.username },
        200,
        { 'Set-Cookie': createSessionCookie(request, token) },
      );
    } catch (error) {
      console.error('[AdminLogin]', error);
      return jsonResponse({ error: 'Admin login is not configured correctly' }, 500);
    }
  },
};
