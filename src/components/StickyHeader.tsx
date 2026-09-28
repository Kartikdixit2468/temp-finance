import React, { useState, useEffect } from 'react';
import { Sparkles } from 'lucide-react';
import { useModal } from '../context/ModalContext';
import { useEventConfig } from '../context/EventConfigContext';

export const StickyHeader: React.FC = () => {
  const { openModal } = useModal();
  const { eventConfig } = useEventConfig();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        id="sticky-live-masterclass-header"
        onClick={openModal}
        title="Click to register for free masterclass"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 cursor-pointer ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-200/80 py-2 sm:py-2.5'
            : 'bg-white/90 backdrop-blur-sm border-b border-slate-200/60 py-2 sm:py-2.5'
        }`}
      >
        <div className="max-w-6xl mx-auto px-3 sm:px-6 lg:px-8 flex items-center justify-center text-center">
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3.5 text-[11px] sm:text-xs md:text-sm font-bold text-slate-700">

            {/* LIVE BADGE */}
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-rose-50 border border-rose-200 text-rose-600 font-extrabold uppercase tracking-wider text-[10px] sm:text-xs shadow-2xs">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
              </span>
              <span>LIVE 60-MIN MASTERCLASS</span>
            </div>

            <span className="text-slate-300">•</span>

            {/* DATE & TIME (from .env) */}
            <div className="inline-flex items-center gap-1.5 text-slate-700">
              <span className="text-slate-900 font-extrabold">{eventConfig.dateDisplay}</span>
              <span className="text-slate-400">•</span>
              <span className="text-blue-600 font-extrabold">{eventConfig.timeDisplay}</span>
              <span className="text-slate-500 text-[10px] sm:text-xs font-semibold hidden sm:inline">(Zoom)</span>
            </div>

            {/* 100% FREE badge — hide on very small screens to keep strip compact */}
            <span className="text-slate-300 hidden sm:inline">•</span>
            <div className="hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-50 border border-amber-200 text-amber-700 font-extrabold text-[10px] sm:text-xs shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 fill-amber-500 text-amber-500 shrink-0" />
              <span>100% Free • Online</span>
            </div>

          </div>
        </div>
      </header>

      {/* Spacer to prevent content shift under fixed header */}
      <div className="h-9 sm:h-10 md:h-11 w-full" aria-hidden="true" />
    </>
  );
};
