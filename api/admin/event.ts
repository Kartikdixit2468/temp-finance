import { getAdminSession } from '../_auth';
import { readStoredEventConfig, updateStoredEventConfig } from '../_github';
import { isSameOriginRequest, jsonResponse, methodNotAllowed } from '../_response';

const LOCAL_DATETIME_PATTERN = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/;

const isValidIstLocalDatetime = (localDatetime: string): boolean => {
  if (!LOCAL_DATETIME_PATTERN.test(localDatetime)) return false;

  const parsed = new Date(`${localDatetime}:00+05:30`);
  if (Number.isNaN(parsed.getTime())) return false;

  const parts = new Intl.DateTimeFormat('en-CA', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
    timeZone: 'Asia/Kolkata',
  }).formatToParts(parsed);
  const value = Object.fromEntries(parts.map((part) => [part.type, part.value]));
  return `${value.year}-${value.month}-${value.day}T${value.hour}:${value.minute}` === localDatetime;
};

export default {
  async fetch(request: Request): Promise<Response> {
    try {
      const session = getAdminSession(request);
      if (!session) return jsonResponse({ error: 'Unauthorized' }, 401);

      if (request.method === 'GET') {
        const current = await readStoredEventConfig();
        return jsonResponse({ event: current.event, fileUrl: current.fileUrl });
      }

      if (request.method !== 'POST') return methodNotAllowed(['GET', 'POST']);
      if (!isSameOriginRequest(request)) return jsonResponse({ error: 'Invalid request origin' }, 403);

      const body = (await request.json()) as {
        localDatetime?: unknown;
        durationMinutes?: unknown;
      };
      if (typeof body.localDatetime !== 'string' || !isValidIstLocalDatetime(body.localDatetime)) {
        return jsonResponse({ error: 'Choose a valid event date and time' }, 400);
      }

      const durationMinutes = Number(body.durationMinutes);
      if (!Number.isInteger(durationMinutes) || durationMinutes < 15 || durationMinutes > 240) {
        return jsonResponse({ error: 'Duration must be between 15 and 240 minutes' }, 400);
      }

      const result = await updateStoredEventConfig({
        datetime: `${body.localDatetime}:00+05:30`,
        durationMinutes,
      });

      return jsonResponse({
        ...result,
        message: result.changed
          ? 'Schedule committed. Vercel will publish it after the production deployment finishes.'
          : 'The selected schedule is already current.',
      });
    } catch (error) {
      console.error('[AdminEvent]', error);
      return jsonResponse({ error: 'Unable to read or update the event schedule' }, 500);
    }
  },
};
