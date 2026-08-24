import React from 'react';
import { ShieldCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer id="footer" className="relative z-10 border-t border-slate-200/60 bg-white/70 backdrop-blur-sm pt-8 pb-32 sm:pb-36 text-center text-xs text-slate-500 font-medium">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 text-left">
        <div className="bg-slate-50/90 rounded-2xl p-4 sm:p-5 border border-slate-200/80 text-slate-500 text-[11px] sm:text-xs leading-relaxed shadow-sm">
          <div className="flex items-center gap-1.5 font-bold text-slate-700 uppercase tracking-wider text-[10px] sm:text-[11px] mb-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-600 shrink-0" />
            <span>Disclaimer</span>
          </div>
          <p>
            YouFinance is a content and education platform. Insurance-related guidance is offered by Yash Singh, a certified insurance advisor under IRDAI regulations. This masterclass is for educational purposes only and is not financial or legal advice. Insurance is a subject matter of solicitation.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-slate-500">
        <p className="text-xs">
          © {new Date().getFullYear()} <span className="font-bold text-slate-700">Youfinance School</span>. All rights reserved.
        </p>
        <p className="text-xs text-slate-400">
          Pure financial education. Zero spam.
        </p>
      </div>
    </footer>
  );
};
