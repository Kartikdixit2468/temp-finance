import React, { useState, useEffect, useRef } from 'react';
import { Users, Eye, X, Check } from 'lucide-react';

export const WhyYouFinanceSection: React.FC = () => {
  // Animated Count-Up State
  const [communityCount, setCommunityCount] = useState(1);
  const [viewsCount, setViewsCount] = useState(1);
  const statsRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          
          const duration = 1800; // 1.8 seconds animation
          const startTime = performance.now();

          const animateCounters = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Ease-out cubic formula for smooth deceleration
            const easeOutProgress = 1 - Math.pow(1 - progress, 3);

            // Animate Community from 1 to 128
            const currentCommunity = Math.max(1, Math.floor(1 + easeOutProgress * (128 - 1)));
            setCommunityCount(currentCommunity);

            // Animate Views from 1 to 10
            const currentViews = Math.max(1, Math.floor(1 + easeOutProgress * (10 - 1)));
            setViewsCount(currentViews);

            if (progress < 1) {
              requestAnimationFrame(animateCounters);
            } else {
              setCommunityCount(128);
              setViewsCount(10);
            }
          };

          requestAnimationFrame(animateCounters);
        }
      },
      {
        threshold: 0.25,
      }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="why-youfinance"
      className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 md:py-14"
    >
      {/* Decorative Dot Grid Pattern */}
      <svg
        className="absolute top-8 right-6 w-32 h-32 opacity-25 text-blue-400 pointer-events-none"
        fill="currentColor"
        viewBox="0 0 100 100"
      >
        <pattern
          id="dot-pattern-why-top"
          x="0"
          y="0"
          width="16"
          height="16"
          patternUnits="userSpaceOnUse"
        >
          <circle cx="3" cy="3" r="2.5" />
        </pattern>
        <rect width="100" height="100" fill="url(#dot-pattern-why-top)" />
      </svg>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
        {/* LEFT COLUMN */}
        <div className="lg:col-span-6 flex flex-col justify-center">
          <div className="w-12 h-[3.5px] bg-blue-600 rounded-full mb-5"></div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-950 tracking-tight leading-[1.15] mb-4">
            Why <span className="text-blue-600">YouFinance?</span>
          </h2>

          <p className="text-xl sm:text-2xl font-bold text-slate-800 mb-8">
            Financial education{' '}
            <span className="relative inline-block text-blue-600">
              without
              <svg
                className="absolute -bottom-1 left-0 w-full h-2 text-blue-600"
                viewBox="0 0 100 20"
                preserveAspectRatio="none"
              >
                <path
                  d="M0,15 Q50,0 100,10"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              </svg>
            </span>{' '}
            the jargon.
          </p>

          <div ref={statsRef} className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 mb-8">
            <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-soft-card flex items-center gap-4 hover:-translate-y-1 transition-transform">
              <div className="w-14 h-14 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center text-2xl shrink-0">
                <Users className="w-7 h-7" />
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-blue-600 leading-none mb-1 tabular-nums">
                  {communityCount}K+
                </div>
                <p className="text-xs font-semibold text-slate-500">Instagram community</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-soft-card flex items-center gap-4 hover:-translate-y-1 transition-transform">
              <div className="w-14 h-14 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center text-2xl shrink-0">
                <Eye className="w-7 h-7" />
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-blue-600 leading-none mb-1 tabular-nums">
                  {viewsCount}M+
                </div>
                <p className="text-xs font-semibold text-slate-500">monthly views</p>
              </div>
            </div>
          </div>

          <p className="text-slate-600 text-base sm:text-lg mb-8 leading-relaxed">
            YouFinance exists to make complicated financial concepts{' '}
            <span className="font-extrabold text-blue-600">easier to understand</span>.
          </p>

          <div className="bg-gradient-to-br from-blue-50/90 to-blue-100/50 rounded-3xl p-6 sm:p-7 border border-blue-100/80 shadow-sm">
            <h3 className="text-sm sm:text-base font-bold text-slate-700 mb-5">
              Youfinance has only one philosophy:
            </h3>
            <div className="space-y-4">
              <div className="flex items-center gap-4 bg-white/80 backdrop-blur-sm p-4 rounded-2xl border border-white">
                <div className="w-10 h-10 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-lg shrink-0 font-bold">
                  <X className="w-5 h-5 stroke-[2.5]" />
                </div>
                <div className="w-px h-6 bg-slate-200"></div>
                <p className="text-sm sm:text-base text-slate-800 font-medium">
                  We don't tell you <span className="font-bold text-slate-950">what to buy</span>.
                </p>
              </div>

              <div className="flex items-center gap-4 bg-white/80 backdrop-blur-sm p-4 rounded-2xl border border-white">
                <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-lg shrink-0 font-bold">
                  <Check className="w-5 h-5 stroke-[2.5]" />
                </div>
                <div className="w-px h-6 bg-slate-200"></div>
                <p className="text-sm sm:text-base text-slate-800 font-medium">
                  We teach you <span className="font-bold text-slate-950">how to decide</span>.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN (EXPANDED DOUBLE-SIZED MOBILE MOCKUP DISPLAY WITH AMBIENT BACKDROP) */}
        <div className="lg:col-span-6 flex flex-col items-center justify-center relative pt-6 lg:pt-0">
          <div className="relative w-full max-w-lg sm:max-w-xl lg:max-w-2xl flex items-center justify-center">
            
            {/* Ambient Radial Glow & Decorative Backdrop */}
            <div className="absolute w-[360px] h-[360px] sm:w-[480px] sm:h-[480px] lg:w-[560px] lg:h-[560px] rounded-full bg-gradient-to-tr from-blue-600/25 via-sky-400/20 to-indigo-500/15 blur-3xl pointer-events-none -z-10 animate-pulse" />
            <div className="absolute -bottom-8 w-80 sm:w-[420px] h-16 bg-slate-900/15 blur-2xl rounded-full pointer-events-none -z-10" />

            {/* Decorative Orbit Rings */}
            <div className="absolute w-[380px] h-[380px] sm:w-[520px] sm:h-[520px] lg:w-[580px] lg:h-[580px] rounded-full border border-blue-200/40 pointer-events-none -z-10" />
            <div className="absolute w-[300px] h-[300px] sm:w-[420px] sm:h-[420px] lg:w-[460px] lg:h-[460px] rounded-full border border-dashed border-blue-300/35 pointer-events-none -z-10 animate-[spin_60s_linear_infinite]" />

            <div className="relative z-10 flex flex-col items-center group w-full">
              {/* Floating Mockup with natural depth shadow */}
              <div className="relative w-full flex justify-center transition-transform duration-500 ease-out hover:-translate-y-2">
                <img
                  src="/images/Mobile Mockup New.png"
                  alt="YouFinance Mobile App Showcase"
                  className="w-full max-w-[420px] sm:max-w-[560px] md:max-w-[620px] lg:max-w-[680px] h-auto object-contain mx-auto drop-shadow-[0_30px_45px_rgba(15,23,42,0.25)] drop-shadow-[0_12px_24px_rgba(37,99,235,0.22)]"
                />
              </div>

              {/* Verified Instagram handle pill under mockup with link */}
              <a
                href="https://www.instagram.com/youfinance.in"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/95 backdrop-blur-md border border-slate-200 shadow-xl text-sm font-extrabold text-slate-800 -mt-5 z-20 hover:scale-105 hover:bg-white hover:text-blue-600 hover:border-blue-300 transition-all cursor-pointer group/ig"
              >
                <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span>
                <span>@youfinance.in</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
