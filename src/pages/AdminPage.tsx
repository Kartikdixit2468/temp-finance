import React, { useEffect, useMemo, useState } from 'react';
import {
  CalendarClock,
  CheckCircle2,
  ExternalLink,
  GitCommit,
  LoaderCircle,
  LockKeyhole,
  LogOut,
  RefreshCw,
  Save,
  ShieldCheck,
} from 'lucide-react';
import {
  createEventConfig,
  toIstDatetimeLocalValue,
  type EventConfigSource,
} from '../config/event';

type SessionStatus = 'loading' | 'anonymous' | 'authenticated';

interface ApiResult {
  authenticated?: boolean;
  error?: string;
  message?: string;
  changed?: boolean;
  commitUrl?: string;
  fileUrl?: string;
  event?: EventConfigSource;
}

const readApiResult = async (response: Response): Promise<ApiResult> => {
  const contentType = response.headers.get('content-type') || '';
  if (!contentType.includes('application/json')) {
    throw new Error('The admin API is unavailable in this environment');
  }

  const result = (await response.json()) as ApiResult;
  if (!response.ok) throw new Error(result.error || 'The request could not be completed');
  return result;
};

export default function AdminPage() {
  const [sessionStatus, setSessionStatus] = useState<SessionStatus>('loading');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [localDatetime, setLocalDatetime] = useState('');
  const [durationMinutes, setDurationMinutes] = useState(60);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingEvent, setIsLoadingEvent] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [commitUrl, setCommitUrl] = useState('');

  const preview = useMemo(() => {
    if (!localDatetime) return null;
    try {
      return createEventConfig({
        datetime: `${localDatetime}:00+05:30`,
        durationMinutes,
      });
    } catch {
      return null;
    }
  }, [durationMinutes, localDatetime]);

  const loadEvent = async () => {
    setIsLoadingEvent(true);
    setError('');
    try {
      const response = await fetch('/api/admin/event', {
        credentials: 'same-origin',
        cache: 'no-store',
      });
      const result = await readApiResult(response);
      if (!result.event) throw new Error('The repository event file is missing');

      setLocalDatetime(toIstDatetimeLocalValue(result.event.datetime));
      setDurationMinutes(result.event.durationMinutes || 60);
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'Unable to load the event schedule');
    } finally {
      setIsLoadingEvent(false);
    }
  };

  useEffect(() => {
    document.title = 'Event Schedule Admin | YouFinance';

    const checkSession = async () => {
      try {
        const response = await fetch('/api/admin/session', {
          credentials: 'same-origin',
          cache: 'no-store',
        });
        const result = await readApiResult(response);
        if (!result.authenticated) {
          setSessionStatus('anonymous');
          return;
        }
        setSessionStatus('authenticated');
      } catch {
        setSessionStatus('anonymous');
      }
    };

    void checkSession();
  }, []);

  useEffect(() => {
    if (sessionStatus === 'authenticated') void loadEvent();
  }, [sessionStatus]);

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError('');
    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const result = await readApiResult(response);
      if (!result.authenticated) throw new Error('The admin session could not be started');
      setPassword('');
      setSessionStatus('authenticated');
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'Unable to sign in');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSave = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!preview) {
      setError('Choose a valid event date and time');
      return;
    }

    setIsSubmitting(true);
    setError('');
    setSuccess('');
    setCommitUrl('');
    try {
      const response = await fetch('/api/admin/event', {
        method: 'POST',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ localDatetime, durationMinutes }),
      });
      const result = await readApiResult(response);
      setSuccess(result.message || 'Schedule saved');
      setCommitUrl(result.commitUrl || '');
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'Unable to save the schedule');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogout = async () => {
    await fetch('/api/admin/logout', {
      method: 'POST',
      credentials: 'same-origin',
    }).catch(() => undefined);
    setSessionStatus('anonymous');
    setUsername('');
    setPassword('');
    setError('');
    setSuccess('');
  };

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-8 sm:py-12 text-slate-900">
      <div className="mx-auto w-full max-w-xl">
        <a href="/" className="mb-5 inline-flex items-center gap-2 text-sm font-bold text-blue-200 hover:text-white">
          <span aria-hidden="true">←</span> Return to landing page
        </a>

        <section className="overflow-hidden rounded-3xl border border-white/10 bg-white shadow-2xl">
          <header className="border-b border-slate-200 bg-gradient-to-br from-blue-700 to-blue-600 px-6 py-7 text-white sm:px-8">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 ring-1 ring-white/25">
              <CalendarClock className="h-6 w-6" />
            </div>
            <p className="mb-1 text-xs font-extrabold uppercase tracking-[0.18em] text-blue-100">
              YouFinance administration
            </p>
            <h1 className="text-2xl font-black tracking-tight sm:text-3xl">Event schedule</h1>
            <p className="mt-2 max-w-md text-sm leading-relaxed text-blue-100">
              Update the live masterclass date once. The landing page, countdown, registration form, and confirmation screen will update together.
            </p>
          </header>

          <div className="p-6 sm:p-8">
            {sessionStatus === 'loading' ? (
              <div className="flex min-h-52 items-center justify-center text-slate-500">
                <LoaderCircle className="mr-2 h-5 w-5 animate-spin" /> Checking secure session…
              </div>
            ) : sessionStatus === 'anonymous' ? (
              <form onSubmit={handleLogin} className="space-y-5">
                <div>
                  <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                      <LockKeyhole className="h-5 w-5" />
                    </div>
                    <div>
                      <h2 className="font-black text-slate-950">Admin sign in</h2>
                      <p className="text-sm text-slate-500">Use the credentials configured in Vercel.</p>
                    </div>
                  </div>

                  <label htmlFor="admin-username" className="mb-1.5 block text-sm font-bold text-slate-700">
                    Username
                  </label>
                  <input
                    id="admin-username"
                    name="username"
                    autoComplete="username"
                    required
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                  />
                </div>

                <div>
                  <label htmlFor="admin-password" className="mb-1.5 block text-sm font-bold text-slate-700">
                    Password
                  </label>
                  <input
                    id="admin-password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                  />
                </div>

                {error && <p role="alert" className="rounded-xl bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-700">{error}</p>}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3.5 font-black text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSubmitting ? <LoaderCircle className="h-5 w-5 animate-spin" /> : <ShieldCheck className="h-5 w-5" />}
                  Sign in securely
                </button>
              </form>
            ) : (
              <form onSubmit={handleSave} className="space-y-6">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <h2 className="font-black text-slate-950">Masterclass timing</h2>
                    <p className="text-sm text-slate-500">All times are saved in India Standard Time.</p>
                  </div>
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-bold text-slate-500 hover:bg-slate-100 hover:text-slate-800"
                  >
                    <LogOut className="h-4 w-4" /> Sign out
                  </button>
                </div>

                <div>
                  <label htmlFor="event-datetime" className="mb-1.5 block text-sm font-bold text-slate-700">
                    Event date and start time
                  </label>
                  <input
                    id="event-datetime"
                    type="datetime-local"
                    required
                    value={localDatetime}
                    onChange={(event) => setLocalDatetime(event.target.value)}
                    disabled={isLoadingEvent}
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100 disabled:bg-slate-100"
                  />
                </div>

                <div>
                  <label htmlFor="event-duration" className="mb-1.5 block text-sm font-bold text-slate-700">
                    Duration in minutes
                  </label>
                  <input
                    id="event-duration"
                    type="number"
                    min="15"
                    max="240"
                    step="15"
                    required
                    value={durationMinutes}
                    onChange={(event) => setDurationMinutes(Number(event.target.value))}
                    disabled={isLoadingEvent}
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100 disabled:bg-slate-100"
                  />
                </div>

                {preview && (
                  <div className="rounded-2xl border border-blue-200 bg-blue-50 p-4">
                    <p className="mb-2 text-xs font-black uppercase tracking-wider text-blue-700">Live preview</p>
                    <p className="font-black text-slate-950">{preview.fullDateDisplay}</p>
                    <p className="mt-1 text-sm font-bold text-blue-700">{preview.timeRangeDisplay}</p>
                  </div>
                )}

                {error && <p role="alert" className="rounded-xl bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-700">{error}</p>}
                {success && (
                  <div role="status" className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
                    <div className="flex items-start gap-2 font-semibold">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
                      <span>{success}</span>
                    </div>
                    {commitUrl && (
                      <a href={commitUrl} target="_blank" rel="noreferrer" className="mt-2 inline-flex items-center gap-1.5 font-bold text-emerald-900 underline underline-offset-2">
                        View GitHub commit <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    )}
                  </div>
                )}

                <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
                  <button
                    type="submit"
                    disabled={isSubmitting || isLoadingEvent || !preview}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3.5 font-black text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {isSubmitting ? <LoaderCircle className="h-5 w-5 animate-spin" /> : <Save className="h-5 w-5" />}
                    Save and publish
                  </button>
                  <button
                    type="button"
                    onClick={() => void loadEvent()}
                    disabled={isLoadingEvent || isSubmitting}
                    aria-label="Reload schedule from GitHub"
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 px-4 py-3.5 font-bold text-slate-700 hover:bg-slate-50 disabled:opacity-60"
                  >
                    <RefreshCw className={`h-5 w-5 ${isLoadingEvent ? 'animate-spin' : ''}`} />
                    <span className="sm:hidden">Reload</span>
                  </button>
                </div>

                <div className="flex items-start gap-2 border-t border-slate-200 pt-5 text-xs leading-relaxed text-slate-500">
                  <GitCommit className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />
                  Saving creates a commit on the configured production branch. Vercel publishes the change after that deployment succeeds.
                </div>
              </form>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
