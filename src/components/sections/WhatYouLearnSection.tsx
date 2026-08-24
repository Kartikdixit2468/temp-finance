import React from 'react';
import { useModal } from '../../context/ModalContext';
import { Button } from '../ui/Button';
import {
  BookOpen,
  IndianRupee,
  Calculator,
  FileText,
  ListChecks,
  Scale,
  AlertTriangle,
  Building2,
  ShieldAlert,
  LifeBuoy,
} from 'lucide-react';

export const WhatYouLearnSection: React.FC = () => {
  const { openModal } = useModal();

  const steps = [
    {
      number: 1,
      icon: IndianRupee,
      title: 'How to get the right insurance at a cheaper rate',
    },
    {
      number: 2,
      icon: Calculator,
      title: 'How to decide how much cover you actually need',
    },
    {
      number: 3,
      icon: FileText,
      title: 'How to read and understand your policy document',
    },
    {
      number: 4,
      icon: ListChecks,
      title: 'The 7 most important things to check in every insurance policy',
    },
    {
      number: 5,
      icon: Scale,
      title: 'How to compare policies and choose the right one',
    },
    {
      number: 6,
      icon: AlertTriangle,
      title: 'How to spot a bad insurance recommendation',
    },
    {
      number: 7,
      icon: Building2,
      title: 'Where to buy insurance — and where not to',
    },
    {
      number: 8,
      icon: ShieldAlert,
      title: 'How to fix loopholes that could lead to claim rejection',
    },
    {
      number: 9,
      icon: LifeBuoy,
      title: 'What to do when your insurance claim gets rejected',
    },
  ];

  return (
    <section
      id="learn"
      className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 md:py-14 text-center"
    >
      {/* Top Badge */}
      <div className="relative inline-flex items-center justify-center mb-4 sm:mb-5">
        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center text-2xl border border-blue-100 shadow-sm">
          <BookOpen className="w-6 h-6 sm:w-7 sm:h-7" />
        </div>
        <span className="absolute -left-4 top-1/2 -translate-y-1/2 text-blue-400 font-bold text-xs">
          \\\
        </span>
        <span className="absolute -right-4 top-1/2 -translate-y-1/2 text-blue-400 font-bold text-xs">
          ///
        </span>
      </div>

      <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-slate-950 tracking-tight leading-none mb-3">
        What <span className="text-blue-600">You'll</span> Learn
      </h2>
      <div className="w-16 h-1 bg-blue-600 rounded-full mx-auto mb-8 sm:mb-10"></div>

      {/* Timeline Layout */}
      <div className="relative max-w-4xl mx-auto py-2">
        {/* Center Line */}
        <div className="absolute left-6 sm:left-1/2 top-6 bottom-6 w-0.5 bg-blue-200 -translate-x-1/2 z-0"></div>

        <div className="space-y-6 sm:space-y-8 relative z-10">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isEven = index % 2 === 1;

            return (
              <div
                key={step.number}
                className="flex flex-col sm:flex-row items-center justify-between gap-6 sm:gap-0"
              >
                {/* Left Card or Empty on desktop */}
                {!isEven ? (
                  <div className="w-full sm:w-[44%] pl-14 sm:pl-0 sm:pr-4">
                    <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-100 shadow-soft-card flex items-center gap-5 text-left hover:-translate-y-1 transition-transform">
                      <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                        <Icon className="w-7 h-7" />
                      </div>
                      <p className="font-extrabold text-slate-800 text-base sm:text-lg leading-snug">
                        {step.title}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="hidden sm:block sm:w-[44%]"></div>
                )}

                {/* Timeline Number Circle */}
                <div className="absolute left-6 sm:left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-blue-600 text-white font-extrabold text-base flex items-center justify-center shadow-md ring-4 ring-white border border-blue-200 z-20">
                  {step.number}
                </div>

                {/* Right Card or Empty on desktop */}
                {isEven ? (
                  <div className="w-full sm:w-[44%] pl-14 sm:pl-0 sm:pl-4">
                    <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-100 shadow-soft-card flex items-center gap-5 text-left hover:-translate-y-1 transition-transform">
                      <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                        <Icon className="w-7 h-7" />
                      </div>
                      <p className="font-extrabold text-slate-800 text-base sm:text-lg leading-snug">
                        {step.title}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="hidden sm:block sm:w-[44%]"></div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-8 sm:mt-10">
        <Button
          onClick={openModal}
          showChairIcon={true}
          showArrowIcon={true}
          size="lg"
        >
          I WANT TO UNDERSTAND INSURANCE
        </Button>
      </div>
    </section>
  );
};
