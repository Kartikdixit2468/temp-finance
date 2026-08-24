import React from 'react';

export const BackgroundWaves: React.FC = () => {
  return (
    <>
      {/* Background Vector Waves SVG */}
      <svg
        className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-40 z-0"
        viewBox="0 0 1440 3200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <path
          d="M0,160 C320,300 420,100 720,200 C1020,300 1200,120 1440,220 L1440,0 L0,0 Z"
          fill="url(#grad1)"
          opacity="0.6"
        />
        <path
          d="M0,600 C480,450 720,700 1440,550 L1440,0 L0,0 Z"
          fill="url(#grad2)"
          opacity="0.3"
        />
        <path
          d="M0,1800 C400,1650 800,1950 1440,1750 L1440,0 L0,0 Z"
          fill="url(#grad1)"
          opacity="0.25"
        />
        <defs>
          <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#93C5FD" stopOpacity="0.05" />
          </linearGradient>
          <linearGradient id="grad2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#60A5FA" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#BFDBFE" stopOpacity="0.05" />
          </linearGradient>
        </defs>
      </svg>

      {/* Background Watermark Shield Graphic (Left) */}
      <div className="absolute top-[280px] -left-16 w-80 h-80 opacity-20 pointer-events-none text-blue-400 z-0 hidden lg:block">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-full h-full"
        >
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <path d="m9 12 2 2 4-4" />
        </svg>
      </div>

      {/* Background Dot Grid Pattern (Right) */}
      <div className="absolute top-20 right-8 w-36 h-36 opacity-30 pointer-events-none hidden md:block z-0">
        <svg width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
          <pattern id="dot-grid" x="0" y="0" width="16" height="16" patternUnits="userSpaceOnUse">
            <circle cx="3" cy="3" r="2.5" fill="#3B82F6" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#dot-grid)" />
        </svg>
      </div>
    </>
  );
};
