import React, { useState } from 'react';
import {
  HelpCircle,
  ChevronDown,
  Sparkles,
  MessageCircle,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';

// 💬 FAQ WHATSAPP SUPPORT LINK:
export const FAQ_WHATSAPP_URL =
  'https://wa.me/918600259555?text=Hi%20YouFinance%20team,%20I%20have%20a%20few%20questions%20regarding%20the%20workshop.';

interface FaqItem {
  id: number;
  question: string;
  category: string;
  answer: string;
}

const faqs: FaqItem[] = [
  {
    id: 1,
    category: 'Free & Transparent',
    question: 'Is this masterclass really 100% free, or will I be pitched an insurance policy?',
    answer:
      'It is 100% free and strictly educational. Yash Singh and the YouFinance team uphold a strict "No Policy Pushing & Zero Spam" code. The entire 60 minutes are dedicated purely to decoding fine print, hidden traps, and giving you an unbiased framework to evaluate any policy independently.',
  },
  {
    id: 2,
    category: 'Existing Coverage',
    question: 'I already have health insurance from my employer. Do I still need this?',
    answer:
      'Yes, absolutely. Employer policies often carry hidden room-rent sub-limits, co-pays, and vanish the moment you change jobs or retire. You will learn how to audit your corporate cover and strategically combine it with affordable Super Top-Up plans for lifelong safety.',
  },
  {
    id: 3,
    category: 'Policy Audit & Porting',
    question: 'I bought a personal policy years ago. How does this session help me?',
    answer:
      'Over 40% of policyholders only discover sub-limits and missing riders when a claim is partially rejected at the hospital billing desk. This workshop teaches you how to run a 10-point audit on your existing policy and how to safely port to a better insurer without losing accumulated waiting-period credits.',
  },
  {
    id: 4,
    category: 'Schedule & Access',
    question: 'What if I miss the live session at 7:00 PM IST?',
    answer:
      'Because this is a hands-on workshop featuring live teardowns and interactive Q&A, we strongly recommend attending live. However, all confirmed registrants will receive the Insurance Diagnostic E-Book, 10-Point Checklist, and bonus resources directly in the WhatsApp group.',
  },
  {
    id: 5,
    category: 'Joining & Materials',
    question: 'How will I receive the live workshop link and bonus resources?',
    answer:
      'Immediately after reserving your free seat, you will be invited to our official private WhatsApp group. The secure Google Meet / Zoom link, workbook PDFs, and reminders will be delivered directly to you inside the group.',
  },
];

export const FaqSection: React.FC = () => {
  // Keep first FAQ open by default for immediate preview
  const [openId, setOpenId] = useState<number | null>(1);

  const toggleFaq = (id: number) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section
      id="faq"
      className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 md:py-14"
    >
      {/* SECTION HEADER */}
      <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 text-blue-700 font-extrabold text-xs tracking-wider uppercase mb-3 shadow-xs border border-blue-100/80">
          <HelpCircle className="w-3.5 h-3.5 text-blue-600" />
          <span>Clear Answers. Zero Confusion.</span>
        </div>

        <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-slate-950 tracking-tight leading-[1.15] mb-3">
          Frequently Asked <span className="text-blue-600">Questions</span>
        </h2>

        <div className="w-16 h-1 bg-blue-600 rounded-full mx-auto mb-3"></div>

        <p className="text-slate-600 text-base sm:text-lg font-medium leading-relaxed">
          Everything you need to know about the 60-minute health insurance masterclass.
        </p>
      </div>

      {/* ACCORDION CONTAINER */}
      <div className="space-y-3.5">
        {faqs.map((faq) => {
          const isOpen = openId === faq.id;

          return (
            <div
              key={faq.id}
              className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                isOpen
                  ? 'bg-white border-blue-300 shadow-md ring-2 ring-blue-500/10'
                  : 'bg-white/90 border-slate-200/80 hover:border-blue-200 hover:bg-white shadow-xs'
              }`}
            >
              {/* Question Header Button */}
              <button
                type="button"
                onClick={() => toggleFaq(faq.id)}
                className="w-full text-left p-5 sm:p-6 flex items-start justify-between gap-4 cursor-pointer select-none focus:outline-none"
                aria-expanded={isOpen}
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-[10px] sm:text-[11px] font-extrabold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-100/80">
                      {faq.category}
                    </span>
                  </div>
                  <h3
                    className={`text-base sm:text-lg font-extrabold tracking-tight transition-colors ${
                      isOpen ? 'text-blue-600' : 'text-slate-900 hover:text-blue-600'
                    }`}
                  >
                    {faq.question}
                  </h3>
                </div>

                {/* Animated Chevron Icon */}
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 ${
                    isOpen
                      ? 'bg-blue-600 text-white rotate-180 shadow-sm'
                      : 'bg-slate-100 text-slate-500 hover:bg-blue-50 hover:text-blue-600'
                  }`}
                >
                  <ChevronDown className="w-5 h-5" />
                </div>
              </button>

              {/* Collapsible Answer Body */}
              {isOpen && (
                <div className="px-5 sm:px-6 pb-5 sm:pb-6 pt-1 text-slate-600 text-sm sm:text-base leading-relaxed border-t border-slate-100/80 bg-slate-50/50">
                  <div className="flex items-start gap-2.5 pt-3">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-1" />
                    <p className="font-medium text-slate-700">{faq.answer}</p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* STILL HAVE QUESTIONS BOX */}
      <div className="mt-8 sm:mt-10 bg-slate-50/90 rounded-2xl p-5 sm:p-6 border border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
            <MessageCircle className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-extrabold text-slate-900 text-sm sm:text-base">
              Have a specific question about your policy?
            </h4>
            <p className="text-slate-500 text-xs sm:text-sm font-medium">
              Chat directly with our team on WhatsApp for free, impartial guidance.
            </p>
          </div>
        </div>

        <a
          href={FAQ_WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all shrink-0"
        >
          <MessageCircle className="w-4 h-4 fill-white text-emerald-600" />
          <span>Ask on WhatsApp</span>
        </a>
      </div>
    </section>
  );
};
