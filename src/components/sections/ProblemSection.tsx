import React from 'react';
import {
  HelpCircle,
  Shield,
  Clock,
  ShieldAlert,
  Bed,
  Users2,
  Coins,
  FileSpreadsheet,
  Lightbulb,
} from 'lucide-react';
import { Card } from '../ui/Card';

export const ProblemSection: React.FC = () => {
  const problems = [
    {
      id: 'waiting-periods',
      icon: Clock,
      title: 'Waiting periods?',
    },
    {
      id: 'exclusions',
      icon: ShieldAlert,
      title: 'Exclusions?',
    },
    {
      id: 'room-rent-limits',
      icon: Bed,
      title: 'Room-rent limits?',
    },
    {
      id: 'copayment',
      icon: Users2,
      title: 'Co-payment?',
    },
    {
      id: 'sub-limits',
      icon: Coins,
      title: 'Sub-limits?',
    },
    {
      id: 'claim-conditions',
      icon: FileSpreadsheet,
      title: 'Claim conditions?',
    },
  ];

  return (
    <section
      id="problem"
      className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 md:py-14 text-center"
    >
      {/* Icon Badge */}
      <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-600 text-white shadow-md text-xl font-black mb-4 sm:mb-5">
        <HelpCircle className="w-6 h-6" />
      </div>

      {/* Headline */}
      <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-slate-950 tracking-tight leading-[1.15] max-w-4xl mx-auto mb-2">
        You Have Insurance. <br />
        <span className="text-blue-600">But Do You Understand It?</span>
      </h2>

      {/* Shield Divider */}
      <div className="flex items-center justify-center gap-3 my-4 sm:my-5 w-full max-w-xs mx-auto">
        <div className="h-[1.5px] w-full bg-gradient-to-r from-transparent to-blue-300"></div>
        <div className="text-blue-600 text-base shrink-0">
          <Shield className="w-5 h-5 fill-blue-50 text-blue-600" />
        </div>
        <div className="h-[1.5px] w-full bg-gradient-to-l from-transparent to-blue-300"></div>
      </div>

      <p className="text-slate-600 text-base sm:text-xl font-medium mb-8 sm:mb-10">
        You know your coverage amount. <br className="sm:hidden" />
        But <span className="font-bold text-blue-600">what about:</span>
      </p>

      {/* 6 Grid Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6 mb-8 sm:mb-12">
        {problems.map((item) => {
          const Icon = item.icon;
          return (
            <Card
              key={item.id}
              className="flex flex-col items-center justify-between group p-5 sm:p-6"
            >
              <div className="w-16 h-16 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
                <Icon className="w-7 h-7" />
              </div>
              <h3 className="font-bold text-slate-800 text-sm sm:text-base mb-3 leading-snug">
                {item.title}
              </h3>
              <div className="w-8 h-1 bg-blue-600 rounded-full"></div>
            </Card>
          );
        })}
      </div>

      {/* Bigger Question Callout */}
      <div className="flex justify-center items-center mb-6">
        <span className="text-slate-500 font-medium text-base sm:text-lg flex items-center gap-2">
          <span className="text-blue-400">\\\</span> And the bigger question: <span className="text-blue-400">///</span>
        </span>
      </div>

      <div className="relative max-w-3xl mx-auto bg-gradient-to-r from-blue-50/90 via-white to-blue-50/90 rounded-3xl p-6 sm:p-8 border border-blue-100 shadow-soft-card flex flex-col sm:flex-row items-center justify-between gap-6 overflow-hidden mb-8">
        <div className="flex items-center gap-4 text-left z-10">
          <div className="w-14 h-14 rounded-2xl bg-slate-900 text-white flex items-center justify-center text-2xl shrink-0 shadow-md">
            <ShieldAlert className="w-7 h-7 text-blue-400" />
          </div>
          <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
            Is your policy actually right for{' '}
            <span className="relative text-blue-600">
              YOU?
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
            </span>
          </h3>
        </div>
        <div className="relative z-10 text-blue-600 flex-shrink-0 animate-pulse">
          <HelpCircle className="w-16 h-16 drop-shadow-md" />
        </div>
      </div>

      <div className="inline-flex items-center justify-center gap-2 text-slate-600 text-sm sm:text-base font-semibold">
        <Lightbulb className="w-5 h-5 text-blue-600" />
        <span>We'll help you understand what to look for.</span>
      </div>
    </section>
  );
};
