import React from 'react';
import {
  AlertOctagon,
  FileWarning,
  ScrollText,
  FileX2,
  TrendingUp,
  ShieldAlert,
  Percent,
  ArrowRight,
  MessageCircle,
  ExternalLink,
} from 'lucide-react';

// 💬 WHATSAPP AUDIT LINK: You can update this URL anytime below
export const WHATSAPP_AUDIT_URL = "https://wa.me/918600259555?text=Hey%20team%20YouFinance%2C%20looking%20for%20a%20free%20audit%20of%20my%20insurance%20policy%20";

export const HiddenStatsSection: React.FC = () => {

  const stats = [
    {
      id: 'stat-1',
      badge: '75% REJECTIONS',
      highlight: 'The 75% Knowledge Gap',
      description:
        'Around 75% of rejections are linked to a limited understanding of the policy and unintentional non-disclosure of pre-existing diseases. It isn’t fraud—just dangerous gaps in what families were actually told.',
      icon: Percent,
      statNumber: '75%',
      statLabel: 'Knowledge & Disclosure Gaps',
      sourceName: 'Even.in',
      sourceUrl: 'https://even.in/blog/reasons-for-claim-rejection-health-insurance/',
      accentColor: 'from-amber-500/10 to-amber-500/5 text-amber-600 border-amber-200/80',
      badgeBg: 'bg-amber-100 text-amber-800',
    },
    {
      id: 'stat-2',
      badge: '1 IN 3 CLAIMS',
      highlight: 'The Fine-Print Trap',
      description:
        'Over one-third of claim rejections happen simply because the medical emergency didn’t meet a specific term or condition buried deep in the documentation.',
      icon: ScrollText,
      statNumber: '36%+',
      statLabel: 'Fine-Print Disqualifications',
      sourceName: 'Businessworld.in',
      sourceUrl: 'https://www.businessworld.in/article/why-your-health-insurance-claim-may-berejected-and-how-to-fix-it-536681',
      accentColor: 'from-rose-500/10 to-rose-500/5 text-rose-600 border-rose-200/80',
      badgeBg: 'bg-rose-100 text-rose-800',
    },
    {
      id: 'stat-3',
      badge: 'PROCEDURAL DENIALS',
      highlight: 'Punished for Paperwork',
      description:
        'A massive share of claims are rejected over innocent procedural mistakes—like a late intimation, a missing discharge summary, or mismatched details—even when the treatment was 100% genuine.',
      icon: FileX2,
      statNumber: '100%',
      statLabel: 'Genuine Cases Denied on Filing',
      sourceName: 'Economictimes.com',
      sourceUrl: 'https://economictimes.indiatimes.com/wealth/insure/health-insurance-policy-claim-checklist-hospital-documentation-and-other-errors-that-can-lead-to-claim-rejections/articleshow/129561809.cms',
      accentColor: 'from-red-500/10 to-red-500/5 text-red-600 border-red-200/80',
      badgeBg: 'bg-red-100 text-red-800',
    },
    {
      id: 'stat-4',
      badge: 'PARTIAL CUTS',
      highlight: 'The 40% Shock',
      description:
        'Even if a claim avoids outright denial, roughly 40% of policyholders face partial rejections, forcing them to drain their savings to cover hidden "co-payments" and "room-rent caps."',
      icon: FileWarning,
      statNumber: '40%',
      statLabel: 'Forced to Pay Out of Pocket',
      sourceName: 'Rediff.com',
      sourceUrl: 'https://www.rediff.com/getahead/report/why-insurance-claims-get-rejected/20260415.htm',
      accentColor: 'from-orange-500/10 to-orange-500/5 text-orange-600 border-orange-200/80',
      badgeBg: 'bg-orange-100 text-orange-800',
    },
    {
      id: 'stat-5',
      badge: '+41% ESCALATION',
      highlight: 'The 41% Surge in Disputes',
      description:
        'Official health insurance complaints have shot up by 41% recently, with the vast majority of families fighting exhausted battles against insurers over unpaid claims.',
      icon: TrendingUp,
      statNumber: '+41%',
      statLabel: 'Surge in Official Grievances',
      sourceName: 'Timesofindia.com',
      sourceUrl: 'https://timesofindia.indiatimes.com/business/india-business/non-transparency-post-claim-investigation-of-proposals-main-triggers-of-dis-satisfaction-in-health-inusrance/articleshow/131912146.cms',
      accentColor: 'from-purple-500/10 to-purple-500/5 text-purple-600 border-purple-200/80',
      badgeBg: 'bg-purple-100 text-purple-800',
    },
  ];

  return (
    <section
      id="hidden-stats"
      className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 md:py-14"
    >
      {/* Top Warning Pill */}
      <div className="flex justify-center mb-3">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-50 border border-rose-200/80 text-rose-700 font-extrabold text-xs tracking-wider uppercase shadow-sm">
          <AlertOctagon className="w-4 h-4 text-rose-600" />
          <span>REALITY CHECK & INDUSTRY DATA</span>
        </div>
      </div>

      {/* Main Section Heading */}
      <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
        <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-slate-950 tracking-tight leading-[1.15] mb-3">
          Think You’re Covered? <br />
          <span className="text-blue-600">Here Is Some Hidden Stats</span>
        </h2>
        <div className="w-16 h-1 bg-blue-600 rounded-full mx-auto mb-3"></div>
        <p className="text-slate-600 text-base sm:text-lg font-medium leading-relaxed">
          Most policyholders believe buying insurance is enough. Here is what actually happens when hospital bills land on the table.
        </p>
      </div>

      {/* Stats Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 mb-8 sm:mb-10">
        {stats.map((item, index) => {
          const Icon = item.icon;
          const isSpanWide = index === 0;

          return (
            <div
              key={item.id}
              className={`bg-white rounded-3xl p-6 sm:p-7 border shadow-soft-card flex flex-col justify-between hover:-translate-y-1.5 transition-all duration-300 ${
                isSpanWide ? 'md:col-span-2 lg:col-span-1 bg-gradient-to-b from-white to-slate-50/60' : ''
              } border-slate-100 hover:border-blue-200`}
            >
              <div>
                {/* Header with Metric badge */}
                <div className="flex items-center justify-between gap-3 mb-5">
                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black tracking-wider uppercase ${item.badgeBg}`}
                  >
                    {item.badge}
                  </span>
                  <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                </div>

                {/* Big Stat Metric Display */}
                <div className="mb-4">
                  <div className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                    {item.statNumber}
                  </div>
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mt-0.5">
                    {item.statLabel}
                  </div>
                </div>

                {/* Highlight Title */}
                <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 mb-2.5 leading-snug">
                  {item.highlight}
                </h3>

                {/* Full Description */}
                <p className="text-slate-600 text-sm leading-relaxed font-normal">
                  {item.description}
                </p>
              </div>

              {/* Bottom source link bar */}
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-400">
                <a
                  href={item.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-slate-500 hover:text-blue-600 font-extrabold hover:underline transition-colors group/link"
                  title={`Read source at ${item.sourceName}`}
                >
                  <span>Source: {item.sourceName}</span>
                  <ExternalLink className="w-3 h-3 text-blue-500 shrink-0 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                </a>
                <span className="text-blue-600 font-extrabold">Decoded in Masterclass</span>
              </div>
            </div>
          );
        })}

        {/* 6th Callout Card to Balance Grid */}
        <div className="bg-gradient-to-br from-slate-950 to-blue-950 text-white rounded-3xl p-6 sm:p-7 shadow-xl flex flex-col justify-between relative overflow-hidden">
          <div className="absolute -right-8 -bottom-8 w-36 h-36 bg-blue-600/20 rounded-full blur-2xl pointer-events-none"></div>

          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-black uppercase tracking-wider mb-4 border border-blue-400/30">
              <ShieldAlert className="w-3.5 h-3.5 text-blue-400" />
              <span>THE SOLUTION</span>
            </div>

            <h3 className="text-xl sm:text-2xl font-black tracking-tight text-white mb-2 leading-snug">
              Don't Wait For An Emergency To Find Out.
            </h3>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mt-2">
              Learn the exact 10-point audit checklist to bulletproof your policy before renewal or your next hospital visit.
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800">
            <a
              href={WHATSAPP_AUDIT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs sm:text-sm py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg hover:shadow-emerald-500/25 group"
            >
              <MessageCircle className="w-4 h-4 fill-current text-white shrink-0" />
              <span>AUDIT MY POLICY FOR FREE</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
