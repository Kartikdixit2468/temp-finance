const FALLBACK_EVENT_DATETIME = '2026-08-26T18:00:00+05:30';
const FALLBACK_EVENT_DURATION_MINUTES = 60;

export const EVENT_TIME_ZONE = 'Asia/Kolkata';
export const EVENT_TIME_ZONE_LABEL = 'IST';

export interface EventConfigSource {
  datetime: string;
  durationMinutes?: number;
  dateDisplay?: string;
  timeDisplay?: string;
}

export interface EventConfig {
  datetime: string;
  durationMinutes: number;
  dateDisplay: string;
  timeDisplay: string;
  fullDateDisplay: string;
  timeRangeDisplay: string;
}

const formatTime = (date: Date) =>
  new Intl.DateTimeFormat('en-IN', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
    timeZone: EVENT_TIME_ZONE,
  })
    .format(date)
    .replace(/\b(am|pm)\b/i, (period) => period.toUpperCase());

export const createEventConfig = (source: EventConfigSource): EventConfig => {
  const parsedStart = new Date(source.datetime);
  if (Number.isNaN(parsedStart.getTime())) {
    throw new Error('Invalid event datetime');
  }

  const durationMinutes =
    Number.isInteger(source.durationMinutes) && Number(source.durationMinutes) > 0
      ? Number(source.durationMinutes)
      : FALLBACK_EVENT_DURATION_MINUTES;

  const dateDisplay =
    source.dateDisplay ||
    new Intl.DateTimeFormat('en-IN', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      timeZone: EVENT_TIME_ZONE,
    }).format(parsedStart);

  const timeDisplay = source.timeDisplay || `${formatTime(parsedStart)} ${EVENT_TIME_ZONE_LABEL}`;
  const fullDateDisplay = new Intl.DateTimeFormat('en-IN', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      timeZone: EVENT_TIME_ZONE,
    }).format(parsedStart);
  const end = new Date(parsedStart.getTime() + durationMinutes * 60_000);

  return Object.freeze({
    datetime: source.datetime,
    durationMinutes,
    dateDisplay,
    timeDisplay,
    fullDateDisplay,
    timeRangeDisplay: `${formatTime(parsedStart)} - ${formatTime(end)} ${EVENT_TIME_ZONE_LABEL} (${durationMinutes} Minutes)`,
  });
};

export const DEFAULT_EVENT_CONFIG = createEventConfig({
  datetime: import.meta.env.VITE_EVENT_DATETIME || FALLBACK_EVENT_DATETIME,
  durationMinutes: FALLBACK_EVENT_DURATION_MINUTES,
  dateDisplay: import.meta.env.VITE_EVENT_DATE_DISPLAY,
  timeDisplay: import.meta.env.VITE_EVENT_TIME_DISPLAY,
});

export const toIstDatetimeLocalValue = (datetime: string): string => {
  const date = new Date(datetime);
  if (Number.isNaN(date.getTime())) return '';

  const parts = new Intl.DateTimeFormat('en-CA', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
    timeZone: EVENT_TIME_ZONE,
  }).formatToParts(date);
  const value = Object.fromEntries(parts.map((part) => [part.type, part.value]));

  return `${value.year}-${value.month}-${value.day}T${value.hour}:${value.minute}`;
};
