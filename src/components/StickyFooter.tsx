import React from 'react';
import { useModal } from '../context/ModalContext';
import { Armchair, ArrowRight } from 'lucide-react';

export const StickyFooter: React.FC = () => {
  const { openModal } = useModal();

  return (
    <div
      id="sticky-youfinance-footer"
      className="fixed bottom-0 left-0 right-0 z-40 block w-full bg-white/95 backdrop-blur-xl text-slate-900 border-t border-slate-200/90 shadow-[0_-10px_30px_rgba(15,23,42,0.08)]"
    >
      {/* Ambient Radial Blue Glow */}
      <div className="absolute left-1/4 top-0 w-80 sm:w-96 h-32 rounded-full bg-blue-500/5 blur-3xl pointer-events-none -z-0" />

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-2.5 sm:py-3 relative z-10">
        <div className="flex items-center justify-between gap-2.5 sm:gap-6">
          
          {/* LEFT SIDE: YOUFINANCE SCHOOL BRANDING */}
          <div className="flex items-center gap-2.5 sm:gap-4 min-w-0 flex-1">
            {/* Logo with Thin Border */}
            <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-13 md:h-13 rounded-xl bg-white border border-slate-200 p-1 shrink-0 shadow-xs flex items-center justify-center overflow-hidden">
              <img
                src="/Youfinance Logo.jpg"
                alt="YouFinance Logo"
                className="w-full h-full object-contain rounded-lg"
              />
            </div>

            {/* Typography & Details */}
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-x-2 gap-y-0.5 flex-wrap">
                <h4 className="text-sm sm:text-base md:text-lg font-black tracking-tight text-slate-950 leading-tight whitespace-nowrap">
                  <span className="text-purple-900">Youfinance</span> School
                </h4>

                {/* Green Blinking Dot + Live Badge */}
                <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-[10px] sm:text-xs font-extrabold whitespace-nowrap shadow-2xs">
                  <span className="relative flex h-1.5 w-1.5 sm:h-2 sm:w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 sm:h-2 sm:w-2 bg-emerald-600"></span>
                  </span>
                  <span>100% Free Live</span>
                </div>
              </div>

              {/* Host & Mission Statement (Visible on tablet & desktop) */}
              <p className="hidden md:block text-slate-500 text-xs font-medium mt-0.5 line-clamp-1 max-w-xl leading-relaxed">
                Hosted by IRDAI-licensed insurance advisor, Yash Singh founder of Youfinance. Dedicated to objective, transparent financial literacy across India.
              </p>
              <p className="hidden sm:block md:hidden text-slate-500 text-[11px] font-medium mt-0.5 line-clamp-1 leading-relaxed">
                Hosted by IRDAI-licensed insurance advisor, Yash Singh.
              </p>
            </div>
          </div>

          {/* RIGHT SIDE: CTA BUTTON (ALWAYS VISIBLE ON BOTH MOBILE & DESKTOP) */}
          <div className="flex items-center shrink-0">
            <button
              onClick={openModal}
              id="sticky-footer-reserve-cta"
              type="button"
              className="inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3.5 py-2.5 sm:px-6 sm:py-3 rounded-xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-extrabold text-xs sm:text-sm tracking-wide shadow-md shadow-blue-600/25 transition-all duration-200 hover:scale-[1.02] active:scale-95 cursor-pointer whitespace-nowrap"
            >
              <span className="hidden sm:inline">RESERVE MY FREE SEAT</span>
              <span className="sm:hidden">RESERVE SEAT</span>
              <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.5]" />
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
