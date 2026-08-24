import React from 'react';
import { useModal } from '../../context/ModalContext';
import { Play, Shield, CheckCircle2 } from 'lucide-react';
import { Button } from '../ui/Button';
import { CountdownTimer } from '../CountdownTimer';

export const HeroSection: React.FC = () => {
  const { openModal } = useModal();

  return (
    <section
      id="hero"
      className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-8 sm:pt-8 sm:pb-10 md:pt-10 md:pb-12 text-center flex flex-col items-center"
    >
      {/* TOP BADGE — Logo + Text as two separate compact elements */}
      <div className="inline-flex flex-col items-center gap-3 mb-8">
        {/* Logo */}
        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border border-blue-100 shadow-md bg-white p-1.5">
          <img
            src="/Youfinance Logo.jpg"
            alt="YouFinance Logo"
            className="w-full h-full object-cover rounded-xl"
          />
        </div>
        {/* Text badge */}
        <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/95 border border-slate-200/90 shadow-sm hover:shadow-md hover:border-blue-200 transition-all duration-300">
          <span className="text-blue-700 font-extrabold text-sm sm:text-base tracking-widest uppercase">PRESENTED BY YOUFINANCE</span>
        </div>
      </div>

      {/* ALL CAPS SHORT HEADLINE */}
      <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-slate-950 tracking-tight leading-[1.08] mb-4">
        Health Insurance <span className="text-blue-600">Decoded</span>
      </h1>

      {/* SHIELD ACCENT DIVIDER */}
      <div className="flex items-center justify-center gap-3 my-4 w-full max-w-xs">
        <div className="h-[1.5px] w-full bg-gradient-to-r from-transparent to-blue-300"></div>
        <div className="text-blue-600 text-base shrink-0">
          <Shield className="w-5 h-5 fill-blue-50 text-blue-600" />
        </div>
        <div className="h-[1.5px] w-full bg-gradient-to-l from-transparent to-blue-300"></div>
      </div>

      {/* START CASE SUBHEADING */}
      <p className="text-lg sm:text-2xl md:text-3xl font-bold text-slate-700 mb-8 tracking-tight max-w-3xl leading-snug">
        Learn How to Choose, Compare, and Claim.
      </p>

      {/* COUNTDOWN TIMER */}
      <div className="mb-8 w-full flex justify-center">
        <CountdownTimer className="" />
      </div>

      {/* PRIMARY CTA BUTTON */}
      <div className="mb-4 w-full flex justify-center">
        <Button
          onClick={openModal}
          showChairIcon={true}
          showArrowIcon={true}
          size="lg"
          className="w-full sm:w-auto sm:min-w-[360px] py-3 sm:py-5 px-6 sm:px-12 text-sm sm:text-lg font-black"
        >
          RESERVE MY FREE SEAT
        </Button>
      </div>

      {/* TRUST MICRO-COPY */}
      <div className="flex items-center gap-2 text-slate-600 text-xs sm:text-sm font-semibold">
        <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
        <span>No policy pushing. Just practical insurance education.</span>
      </div>
    </section>
  );
};
