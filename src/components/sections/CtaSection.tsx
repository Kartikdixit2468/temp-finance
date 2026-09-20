import React from 'react';
import { useModal } from '../../context/ModalContext';
import { Button } from '../ui/Button';
import { EVENT_CONFIG } from '../../config/event';
import {
  CalendarCheck,
  Tag,
  Clock,
  FileSearch,
  ClipboardCheck,
  Users2,
  FileCheck2,
  ShieldCheck,
  PhoneOff,
  MessageSquare,
  Sparkles,
  Gift,
  Award,
  CheckCircle2,
} from 'lucide-react';

export const CtaSection: React.FC = () => {
  const { openModal } = useModal();

  const deliverables = [
    {
      icon: FileSearch,
      title: 'Insurance Diagnostic E-Book',
      description: 'Spot the hidden red flags, sub-limits, and exclusions missing from your current coverage.',
      formatBadge: 'PDF E-Book',
      highlight: '12+ Red Flags Decoded',
      valueTag: 'FREE BONUS',
      accent: 'bg-blue-600',
      iconBg: 'bg-blue-50',
      iconColor: 'text-blue-600',
    },
    {
      icon: ClipboardCheck,
      title: '10-Point "No-Brainer" Checklist',
      description: 'A quick 5-minute decision framework to evaluate any health policy before you pay a single rupee.',
      formatBadge: 'Quick-Check SOP',
      highlight: '5-Minute Evaluation',
      valueTag: 'FREE BONUS',
      accent: 'bg-indigo-600',
      iconBg: 'bg-indigo-50',
      iconColor: 'text-indigo-600',
    },
    {
      icon: Users2,
      title: 'Premium Community Access',
      description: 'Private insider circle with policy updates, claim walkthroughs, and truths agents won\'t share.',
      formatBadge: 'VIP Member Circle',
      highlight: 'Direct Insights & Q&A',
      valueTag: 'LIFETIME ACCESS',
      accent: 'bg-purple-600',
      iconBg: 'bg-purple-50',
      iconColor: 'text-purple-600',
    },
    
    {
      icon: FileCheck2,
      title: 'Claim Approval Bonus Guide',
      description: 'Exact documentation steps and hospital intimation protocols to guarantee stress-free approval.',
      formatBadge: 'Action Blueprint',
      highlight: 'Zero Rejection Protocol',
      valueTag: 'FREE BONUS',
      accent: 'bg-emerald-600',
      iconBg: 'bg-emerald-50',
      iconColor: 'text-emerald-600',
    },
  ];

  return (
    <section
      id="cta"
      className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 md:py-14"
    >
      <div className="bg-white/95 backdrop-blur-md rounded-[36px] p-6 sm:p-10 lg:p-12 border border-slate-100 shadow-floating relative overflow-hidden">
        {/* Decorative Ambient Background */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-100/50 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-indigo-100/40 rounded-full blur-3xl pointer-events-none"></div>

        {/* SECTION HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12 relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 text-blue-700 font-extrabold text-xs tracking-wider uppercase mb-3 shadow-xs border border-blue-100/80">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>Interactive Live Masterclass</span>
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-slate-950 tracking-tight leading-[1.15] mb-4">
            Diagnose Your <span className="text-blue-600">Health Insurance</span>
          </h2>

          <div className="w-16 h-1 bg-blue-600 rounded-full mx-auto mb-4"></div>

          <p className="text-slate-700 text-base sm:text-xl font-bold max-w-2xl mx-auto leading-relaxed">
            After this workshop, you will be <span className="text-blue-600 font-extrabold">100% insurance-proof</span>, not an insurance fool.
          </p>
        </div>

        {/* FEATURED MASTERCLASS OVERVIEW HERO CARD */}
        <div className="relative z-10 bg-gradient-to-br from-blue-600 via-blue-600 to-blue-700 rounded-3xl p-6 sm:p-8 text-white mb-12 shadow-xl overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>

          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-blue-50 font-extrabold text-xs uppercase tracking-wider mb-3">
              <Award className="w-3.5 h-3.5" />
              <span>High-Impact Practical Curriculum</span>
            </div>

            <h3 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-white mb-3 leading-tight">
              The Only Health Insurance Masterclass You Will Ever Need
            </h3>

            <p className="text-blue-100 text-sm sm:text-base leading-relaxed font-medium">
              A free, 60-minute practical workshop by Youfinanceschool. Learn how to confidently choose, compare, and get your claims approved without the confusing jargon or industry traps.
            </p>
          </div>
        </div>

        {/* WHAT YOU WILL WALK AWAY WITH */}
        <div className="relative z-10 mb-12 sm:mb-14">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 text-white flex items-center justify-center shadow-md shadow-blue-500/20">
                <Gift className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
                  What You Will Walk Away With
                </h3>
                <p className="text-slate-500 text-xs sm:text-sm font-medium">
                  Exclusive practical resources delivered straight to workshop attendees
                </p>
              </div>
            </div>

            <div className="inline-flex items-center gap-1.5 self-start sm:self-auto px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-700 font-extrabold text-xs">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>Included at 100% Zero Cost</span>
            </div>
          </div>

          {/* 4 BONUS CARDS — clean unified design */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {deliverables.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="group relative bg-white rounded-2xl p-5 border border-slate-200/70 hover:border-slate-300 hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between overflow-hidden"
                >
                  {/* Slim left accent bar */}
                  <div className={`absolute top-0 left-0 bottom-0 w-1 rounded-l-2xl ${item.accent}`} />

                  <div className="pl-2">
                    {/* Icon + format badge */}
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-10 h-10 rounded-xl ${item.iconBg} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className={`w-5 h-5 ${item.iconColor}`} />
                      </div>
                      <span className="text-[10px] font-extrabold px-2.5 py-1 rounded-full bg-slate-100 text-slate-500 border border-slate-200/80">
                        {item.formatBadge}
                      </span>
                    </div>

                    {/* Title */}
                    <h4 className="font-black text-slate-900 text-sm sm:text-base mb-2 leading-snug">
                      {item.title}
                    </h4>

                    {/* Description */}
                    <p className="text-slate-500 text-xs leading-relaxed mb-4">
                      {item.description}
                    </p>
                  </div>

                  {/* Footer */}
                  <div className="pl-2 pt-3 border-t border-slate-100 flex items-center justify-between">
                    <div className={`flex items-center gap-1 text-[11px] font-bold ${item.iconColor}`}>
                      <CheckCircle2 className="w-3 h-3 shrink-0" />
                      <span>{item.highlight}</span>
                    </div>
                    <span className="text-[10px] font-black text-emerald-700 uppercase tracking-wide bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100">
                      {item.valueTag}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* WORKSHOP DETAILS & CTA WRAPPER */}
        <div className="relative z-10 bg-slate-50/80 rounded-3xl p-6 sm:p-8 border border-slate-200/70 text-center flex flex-col items-center">
          {/* Workshop Details Badges */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-6">
            <div className="flex items-center gap-2 px-4 py-2.5 bg-white rounded-xl border border-slate-200/80 text-slate-800 font-extrabold text-xs sm:text-sm shadow-xs">
              <CalendarCheck className="w-4 h-4 text-blue-600 shrink-0" />
              <span>{EVENT_CONFIG.dateDisplay}</span>
            </div>

            <div className="flex items-center gap-2 px-4 py-2.5 bg-white rounded-xl border border-slate-200/80 text-slate-800 font-extrabold text-xs sm:text-sm shadow-xs">
              <Clock className="w-4 h-4 text-blue-600 shrink-0" />
              <span>{EVENT_CONFIG.timeDisplay}</span>
            </div>

            <div className="flex items-center gap-2 px-4 py-2.5 bg-white rounded-xl border border-slate-200/80 text-slate-800 font-extrabold text-xs sm:text-sm shadow-xs">
              <Tag className="w-4 h-4 text-emerald-600 shrink-0" />
              <span className="text-emerald-600 font-black">100% FREE</span>
            </div>
          </div>

          {/* Main CTA Button */}
          <div className="mb-8 w-full sm:w-auto">
            <Button
              onClick={openModal}
              showChairIcon={true}
              showArrowIcon={true}
              size="lg"
              className="w-full sm:w-auto text-sm sm:text-base px-8 py-4 shadow-xl hover:shadow-2xl"
            >
              I Want to Diagnose My Insurance Policy
            </Button>
          </div>

          {/* YOUFINANCE PROMISE TO YOU BADGES */}
          <div className="w-full pt-6 border-t border-slate-200/60">
            <span className="text-xs font-black text-slate-500 uppercase tracking-wider block mb-4">
              YouFinance Promise to You
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 max-w-3xl mx-auto">
              <div className="flex items-center justify-center gap-2.5 px-4 py-2.5 rounded-xl bg-white border border-slate-200/80 shadow-xs">
                <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
                <span className="font-bold text-slate-800 text-xs sm:text-sm">No Policy Pushing</span>
              </div>

              <div className="flex items-center justify-center gap-2.5 px-4 py-2.5 rounded-xl bg-white border border-slate-200/80 shadow-xs">
                <PhoneOff className="w-4 h-4 text-rose-500 shrink-0" />
                <span className="font-bold text-slate-800 text-xs sm:text-sm">Zero Spam Calls</span>
              </div>

              <div className="flex items-center justify-center gap-2.5 px-4 py-2.5 rounded-xl bg-white border border-slate-200/80 shadow-xs">
                <MessageSquare className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="font-bold text-slate-800 text-xs sm:text-sm">100% Plain Explanation</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
