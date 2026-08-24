import React from 'react';
import { ShieldAlert, IndianRupee, RefreshCw, Handshake } from 'lucide-react';

export const AudienceSection: React.FC = () => {
  const audiences = [
    {
      id: 'audience-1',
      number: '01',
      icon: ShieldAlert,
      title: 'Already have health insurance',
      description: "But you're not completely sure what you've actually bought.",
    },
    {
      id: 'audience-2',
      number: '02',
      icon: IndianRupee,
      title: "Planning to buy health insurance",
      description: "And don't want to blindly follow someone else's recommendation.",
    },
    {
      id: 'audience-3',
      number: '03',
      icon: RefreshCw,
      title: "You are renewing your current policy",
      description: "And want to know exactly what you're paying for.",
    },
    {
      id: 'audience-4',
      number: '04',
      icon: Handshake,
      title: 'Agent recommended a policy to you',
      description: 'And you want to understand it before saying yes.',
    },
  ];

  return (
    <section
      id="audience"
      className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 md:py-14"
    >
      <div className="mb-6 sm:mb-8">
        <div className="w-12 h-[3.5px] bg-blue-600 rounded-full mb-3 sm:mb-4"></div>
        <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-slate-950 tracking-tight leading-[1.1]">
          This Workshop <br />
          <span className="relative inline-block text-blue-600">
            Is for You If...
            <svg
              className="absolute -bottom-2 left-0 w-full h-3 text-blue-600"
              viewBox="0 0 200 20"
              preserveAspectRatio="none"
            >
              <path
                d="M0,15 Q100,0 200,12"
                fill="none"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
              />
            </svg>
          </span>
        </h2>
      </div>

      {/* 2x2 CARDS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        {audiences.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.id}
              className="bg-white rounded-3xl p-6 sm:p-8 shadow-soft-card border border-slate-100 flex flex-col sm:flex-row items-start sm:items-center gap-6 hover:-translate-y-1 hover:border-blue-200 transition-all duration-300"
            >
              <div className="shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-2xl sm:rounded-full bg-blue-50/80 flex items-center justify-center text-blue-600 border border-blue-100/60">
                <Icon className="w-8 h-8" />
              </div>
              <div className="hidden sm:block w-px h-[90px] bg-slate-100"></div>
              <div className="flex-1">
                <div className="flex items-start gap-3 mb-2">
                  <span className="shrink-0 bg-blue-600 text-white font-extrabold text-xs px-2.5 py-1 rounded-md mt-0.5 tracking-wider">
                    {item.number}
                  </span>
                  <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 leading-snug">
                    {item.title}
                  </h3>
                </div>
                <p className="text-slate-500 text-sm mt-3 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
