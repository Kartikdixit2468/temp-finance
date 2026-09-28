import { clearSessionCookie } from '../_auth';
import { isSameOriginRequest, jsonResponse, methodNotAllowed } from '../_response';

export default {
  async fetch(request: Request): Promise<Response> {
    if (request.method !== 'POST') return methodNotAllowed(['POST']);
    if (!isSameOriginRequest(request)) return jsonResponse({ error: 'Invalid request origin' }, 403);

    return jsonResponse(
      { authenticated: false },
      200,
      { 'Set-Cookie': clearSessionCookie(request) },
    );
  },
};
