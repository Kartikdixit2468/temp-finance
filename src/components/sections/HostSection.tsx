import React from 'react';
import {
  Instagram,
  CheckCircle2,
  Users,
  ShieldCheck,
  Lightbulb,
  Image as ImageIcon,
  Sparkles,
  Award,
} from 'lucide-react';


const industryPhotos = [
  {
    id: 1,
    imageUrl: '/images/1.jpg', // Drop your image path here (e.g., "/images/host-meeting-1.jpg")
    title: 'Industry Leader Interaction',
    subtitle: 'Discussion on Health Insurance Claim Transparency',
    tag: 'Conference Meet',
  },
  {
    id: 2,
    imageUrl: '/images/2.jpg', // Drop your image path here (e.g., "/images/host-meeting-2.jpg")
    title: 'Finance & Insurance Roundtable',
    subtitle: 'Collaborating on Consumer Protection & IRDAI Guidelines',
    tag: 'Industry Summit',
  },
  {
    id: 3,
    imageUrl: '/images/3.jpg', // Drop your image path here (e.g., "/images/host-meeting-3.jpg")
    title: 'Executive Mentorship Meet',
    subtitle: 'Strategic insights with veteran insurance ecosystem leaders',
    tag: 'Office Meet',
  },
];

// 📰 MEDIA NEWS PORTALS FEATURED CONFIGURATION
const mediaFeatures = [
  { name: 'The Economic Times', category: 'Financial Press' },
  { name: 'Business Standard', category: 'Industry News' },
  { name: 'Mint', category: 'Economy & Wealth' },
  { name: 'Financial Express', category: 'Market Insights' },
  { name: 'Zee Business', category: 'Consumer Finance' },
];

export const HostSection: React.FC = () => {
  return (
    <section
      id="host"
      className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 md:py-14"
    >
      <div className="bg-white/85 backdrop-blur-md rounded-3xl p-5 sm:p-8 lg:p-10 border border-slate-100 shadow-soft-card">
        {/* TOP ROW: PORTRAIT + BIO */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* LEFT COLUMN: HOST PORTRAIT */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
            <div className="relative w-full max-w-xs sm:max-w-sm h-[380px] sm:h-[440px] bg-gradient-to-b from-blue-600 to-blue-700 rounded-t-[160px] rounded-b-3xl shadow-xl flex items-end justify-center overflow-hidden pt-8">
              <img
                src="/images/Yash Sing Portrait.png"
                alt="Yash Singh - Host"
                className="w-full h-full object-cover object-top relative z-10"
              />

              <div className="absolute inset-2 rounded-t-[150px] rounded-b-2xl border-2 border-white/20 pointer-events-none z-20"></div>
            </div>

            {/* FLOATING CARD */}
            <div className="relative lg:absolute -bottom-6 lg:-bottom-6 w-[90%] sm:w-80 bg-white rounded-2xl p-4 shadow-floating border border-slate-100 z-30 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-xl">
                  <Instagram className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-slate-400 font-medium block">Founder of</span>
                  <span className="text-sm font-extrabold text-blue-600 tracking-tight block">
                    YouFinance
                  </span>
                </div>
              </div>
              <div className="h-8 w-px bg-slate-100"></div>
              <div className="text-right">
                <div className="text-[11px] font-bold text-slate-700">
                  <span className="text-blue-600 font-extrabold text-sm">128K+</span> IG
                </div>
                <div className="text-[11px] font-bold text-slate-700">
                  <span className="text-blue-600 font-extrabold text-sm">10M+</span> Views
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: BIO & QUALIFICATIONS */}
          <div className="lg:col-span-7 pt-6 lg:pt-0">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 text-blue-600 font-extrabold text-xs tracking-wider mb-4">
              <span className="w-2 h-2 rounded-full bg-blue-600"></span>
              <span>Meet Your Host</span>
            </div>

            <h2 className="text-4xl sm:text-5xl font-black text-slate-950 tracking-tight mb-2">
              Yash <span className="text-blue-600">Singh</span>
            </h2>

            <div className="flex items-center gap-2 text-slate-800 font-bold text-base sm:text-lg mb-4">
              <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0" />
              <span>IRDAI Licensed POSP</span>
            </div>

            <p className="text-slate-600 text-base sm:text-lg leading-relaxed mb-6 font-normal">
              Yash brings <span className="font-extrabold text-blue-600">6+ years</span> of experience in the insurance and finance industry, backed by real-world, on-ground experience.
            </p>

            <div className="w-12 h-1 bg-blue-600 rounded-full mb-8"></div>
            
            <h3 className="text-xs sm:text-sm font-extrabold text-slate-500 tracking-wider mb-4">
              Why Learn from Yash?
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-slate-50/90 rounded-2xl p-5 border border-slate-100 flex flex-col justify-between hover:border-blue-200 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-blue-100/70 text-blue-600 flex items-center justify-center mb-3">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-extrabold text-blue-600 text-base mb-1">
                    1200+
                  </h4>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                    Families supported on their insurance journey
                  </p>
                </div>
              </div>

              <div className="bg-slate-50/90 rounded-2xl p-5 border border-slate-100 flex flex-col justify-between hover:border-blue-200 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-blue-100/70 text-blue-600 flex items-center justify-center mb-3">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-extrabold text-blue-600 text-base mb-1">
                    Real Claim Experience
                  </h4>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                    Supported 700+ families on their claim journey
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 📸 INDUSTRY LEADERS & REPUTED INTERACTIONS SHOWCASE */}
        <div className="mt-14 pt-10 border-t border-slate-100">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-blue-50 text-blue-600 font-extrabold text-xs tracking-wider uppercase mb-2">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>Industry Network & Ecosystem</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Engaging with Industry Leaders & Pioneers
            </h3>
            <p className="text-slate-500 text-sm mt-2">
              Bringing deep sector insights straight from trusted industry interactions and policy forums.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {industryPhotos.map((item) => (
              <div
                key={item.id}
                className="group bg-slate-50 rounded-2xl overflow-hidden border border-slate-200/80 hover:border-blue-300 hover:shadow-md transition-all duration-300 flex flex-col"
              >
                {/* Photo Slot */}
                <div className="relative aspect-[4/3] bg-gradient-to-br from-slate-100 via-blue-50/50 to-slate-200 flex items-center justify-center overflow-hidden">
                  {item.imageUrl ? (
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center p-6 text-center text-slate-400">
                      <div className="w-14 h-14 rounded-2xl bg-white/90 shadow-sm border border-slate-200/80 flex items-center justify-center mb-3 group-hover:scale-110 group-hover:text-blue-600 transition-all">
                        <ImageIcon className="w-7 h-7" />
                      </div>
                      <span className="text-xs font-bold text-slate-600 block mb-0.5">
                        Photo Placeholder #{item.id}
                      </span>
                      <span className="text-[11px] text-slate-400">
                        Drop image in <code className="bg-slate-200/70 px-1 py-0.5 rounded text-[10px] text-slate-700">imageUrl</code>
                      </span>
                    </div>
                  )}

                  {/* Top Tag */}
                  <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm px-2.5 py-1 rounded-full text-[11px] font-extrabold text-blue-700 shadow-sm border border-blue-100 flex items-center gap-1">
                    <Award className="w-3 h-3 text-blue-600" />
                    <span>{item.tag}</span>
                  </div>
                </div>

                {/* Caption & Description */}
                <div className="p-4 flex-1 flex flex-col justify-between bg-white">
                  <div>
                    <h4 className="text-sm font-extrabold text-slate-900 mb-1 leading-snug">
                      {item.title}
                    </h4>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      {item.subtitle}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 📰 MEDIA RECOGNITION & PRESS FEATURES LOGO STRIP */}
        <div className="mt-12 pt-8 border-t border-slate-100">
          <div className="text-center mb-6">
            <span className="text-xs font-extrabold text-slate-400 uppercase tracking-widest block">
              Featured Across Leading Media & Financial Portals
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 lg:gap-6">
            {mediaFeatures.map((media, idx) => (
              <div
                key={idx}
                className="px-4 py-2.5 bg-slate-50 hover:bg-blue-50/70 border border-slate-200/80 hover:border-blue-200 rounded-xl flex items-center gap-2.5 shadow-sm transition-all duration-300 group cursor-default"
              >
                <div className="w-2 h-2 rounded-full bg-blue-500 group-hover:scale-125 transition-transform"></div>
                <div className="text-left">
                  <span className="text-xs sm:text-sm font-black text-slate-800 tracking-tight block group-hover:text-blue-700 transition-colors">
                    {media.name}
                  </span>
                  <span className="text-[10px] text-slate-400 font-medium block">
                    {media.category}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Callout Banner */}
        <div className="mt-10 bg-gradient-to-r from-blue-50 via-blue-100/40 to-blue-50 rounded-2xl p-5 sm:p-6 border border-blue-100 flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
          <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center text-xl shrink-0 shadow-md">
            <Lightbulb className="w-6 h-6" />
          </div>
          <p className="text-slate-800 text-base sm:text-lg font-bold leading-relaxed">
            Insurance is complicated. <span className="text-blue-600 font-extrabold">But it shouldn’t be.</span>
          </p>
        </div>
      </div>
    </section>
  );
};
