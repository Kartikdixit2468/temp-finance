import { getAdminSession } from '../_auth';
import { jsonResponse, methodNotAllowed } from '../_response';

export default {
  async fetch(request: Request): Promise<Response> {
    if (request.method !== 'GET') return methodNotAllowed(['GET']);

    try {
      const session = getAdminSession(request);
      if (!session) return jsonResponse({ authenticated: false }, 401);

      return jsonResponse({ authenticated: true, username: session.sub });
    } catch (error) {
      console.error('[AdminSession]', error);
      return jsonResponse({ authenticated: false }, 500);
    }
  },
};
