import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { EVENT_CONFIG } from '../config/event';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  expired: boolean;
}

function calculateTimeLeft(targetISO: string): TimeLeft {
  const target = new Date(targetISO).getTime();
  const now = Date.now();
  const diff = target - now;

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, expired: true };
  }

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
    expired: false,
  };
}

// ─── Individual animated unit ────────────────────────────────────────────────
interface CountdownUnitProps {
  value: number;
  label: string;
}

const CountdownUnit: React.FC<CountdownUnitProps> = ({ value, label }) => {
  const padded = String(value).padStart(2, '0');

  return (
    <div className="flex flex-col items-center gap-1.5">
      <div className="relative flex items-center justify-center w-[52px] h-[52px] sm:w-[60px] sm:h-[60px] rounded-xl bg-white border border-slate-200 shadow-sm overflow-hidden">
        {/* Top shine */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-300/70 to-transparent pointer-events-none" />

        {/* Slide transition — old number exits up, new enters from below */}
        <AnimatePresence mode="sync" initial={false}>
          <motion.span
            key={padded}
            initial={{ y: 70 }}
            animate={{ y: 0 }}
            exit={{ y: -70 }}
            transition={{ duration: 0.45, ease: 'easeInOut' }}
            className="absolute text-[22px] sm:text-[28px] font-black text-slate-900 tabular-nums leading-none select-none"
          >
            {padded}
          </motion.span>
        </AnimatePresence>
      </div>
      <span className="text-[9px] sm:text-[11px] font-bold uppercase tracking-[0.12em] text-slate-400 select-none">
        {label}
      </span>
    </div>
  );
};

// ─── Separator colon ─────────────────────────────────────────────────────────
const Colon: React.FC = () => (
  <div className="flex flex-col gap-1.5 pb-5 select-none">
    <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-slate-300" />
    <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-slate-300" />
  </div>
);

// ─── Main export ─────────────────────────────────────────────────────────────
interface CountdownTimerProps {
  /** ISO 8601 with timezone, e.g. "2026-08-26T18:00:00+05:30" */
  targetDatetime?: string;
  className?: string;
}

export const CountdownTimer: React.FC<CountdownTimerProps> = ({
  targetDatetime = EVENT_CONFIG.datetime,
  className = '',
}) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() =>
    calculateTimeLeft(targetDatetime)
  );

  useEffect(() => {
    if (timeLeft.expired) return;
    const id = setInterval(() => {
      setTimeLeft(calculateTimeLeft(targetDatetime));
    }, 1000);
    return () => clearInterval(id);
  }, [targetDatetime, timeLeft.expired]);

  if (timeLeft.expired) {
    return (
      <div className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-rose-50 border border-rose-200 text-rose-600 font-bold text-sm ${className}`}>
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-rose-500" />
        </span>
        Masterclass is Live Now!
      </div>
    );
  }

  return (
    <div className={`flex flex-col items-center gap-2.5 ${className}`}>
      {/* Label */}
      <p className="text-[11px] sm:text-xs font-semibold text-slate-400 uppercase tracking-[0.14em] select-none">
        Masterclass starts in
      </p>

      {/* Timer row */}
      <div className="flex items-center gap-1.5 sm:gap-2.5">
        <CountdownUnit value={timeLeft.days} label="Days" />
        <Colon />
        <CountdownUnit value={timeLeft.hours} label="Hours" />
        <Colon />
        <CountdownUnit value={timeLeft.minutes} label="Mins" />
        <Colon />
        <CountdownUnit value={timeLeft.seconds} label="Secs" />
      </div>
    </div>
  );
};
