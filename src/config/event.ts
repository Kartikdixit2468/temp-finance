const DEFAULT_EVENT_DATETIME = '2026-08-26T18:00:00+05:30';
const DEFAULT_EVENT_DATE_DISPLAY = 'Wed, 26 Aug';
const DEFAULT_EVENT_TIME_DISPLAY = '6:00 PM IST';
const EVENT_DURATION_MINUTES = 60;
const EVENT_TIME_ZONE = 'Asia/Kolkata';
const EVENT_TIME_ZONE_LABEL = 'IST';

const datetime = import.meta.env.VITE_EVENT_DATETIME || DEFAULT_EVENT_DATETIME;
const parsedStart = new Date(datetime);
const hasValidDatetime = !Number.isNaN(parsedStart.getTime());

const formatTime = (date: Date) =>
  new Intl.DateTimeFormat('en-IN', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
    timeZone: EVENT_TIME_ZONE,
  })
    .format(date)
    .replace(/\b(am|pm)\b/i, (period) => period.toUpperCase());

const fullDateDisplay = hasValidDatetime
  ? new Intl.DateTimeFormat('en-IN', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      timeZone: EVENT_TIME_ZONE,
    }).format(parsedStart)
  : import.meta.env.VITE_EVENT_DATE_DISPLAY || DEFAULT_EVENT_DATE_DISPLAY;

const timeRangeDisplay = hasValidDatetime
  ? `${formatTime(parsedStart)} - ${formatTime(
      new Date(parsedStart.getTime() + EVENT_DURATION_MINUTES * 60_000),
    )} ${EVENT_TIME_ZONE_LABEL} (${EVENT_DURATION_MINUTES} Minutes)`
  : `${import.meta.env.VITE_EVENT_TIME_DISPLAY || DEFAULT_EVENT_TIME_DISPLAY} (${EVENT_DURATION_MINUTES} Minutes)`;

export const EVENT_CONFIG = Object.freeze({
  datetime,
  dateDisplay: import.meta.env.VITE_EVENT_DATE_DISPLAY || DEFAULT_EVENT_DATE_DISPLAY,
  timeDisplay: import.meta.env.VITE_EVENT_TIME_DISPLAY || DEFAULT_EVENT_TIME_DISPLAY,
  fullDateDisplay,
  timeRangeDisplay,
  durationMinutes: EVENT_DURATION_MINUTES,
});
