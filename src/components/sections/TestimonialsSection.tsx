import React, { useState, useCallback } from 'react';
import {
  Star,
  MessageSquareQuote,
  CheckCircle2,
  Maximize2,
  X,
  Sparkles,
  ShieldCheck,
  ImageIcon,
} from 'lucide-react';

// 💬 TESTIMONIALS & FEEDBACK SCREENSHOTS CONFIGURATION
// Add your screenshot image paths, client names, and notes below anytime!
export interface TestimonialItem {
  id: number;
  imageUrl: string; // Drop your screenshot path here (e.g. "/images/feedback-1.jpg")
  author: string;
  location?: string;
  tag: string;
  highlight: string;
  rating: number;
}

const testimonialsList: TestimonialItem[] = [
  {
    id: 1,
    imageUrl: '/images/TEST1.jpg', 
    author: 'Ahana Singh',
    location: 'Mumbai',
    tag: 'Maternity Cover & Claims',
    highlight: 'Guided client to pick the right maternity plan and secured a smooth, zero-surprise claim.',
    rating: 5,
  },
  {
    id: 2,
    imageUrl: '/images/TEST2.jpg', 
    author: 'Aman Via',
    location: 'Bengaluru',
    tag: 'Policy Audit & Renewal',
    highlight: 'Audited existing policy before renewal to identify and plug critical hidden leakages.',
    rating: 4.9,
  },
  {
    id: 3,
    imageUrl: '/images/TEST3.jpg', 
    author: 'Gaurav Mishra',
    location: 'Kochi',
    tag: 'Jargon-Free Advisory',
    highlight: 'Cleared months of confusion and simplified terms to help client purchase with complete clarity.',
    rating: 5,
  },
  {
    id: 4,
    imageUrl: '/images/TEST4.jpg', 
    author: 'Vikas Kulkarni',
    location: 'Pune',
    tag: 'Pre-Existing Disease Disclosure',
    highlight: 'Guided us properly on declaring BP & diabetes without getting rejected.',
    rating: 5,
  },
  {
    id: 5,
    imageUrl: '/images/TEST5.jpg',
    author: 'Sneha Roy',
    location: 'Kolkata',
    tag: 'Maternity & Consumables',
    highlight: 'Understood consumable riders and restored peace of mind for our family.',
    rating: 5,
  },
  {
    id: 6,
    imageUrl: '/images/TEST6.jpg',
    author: 'Harish Varma',
    location: 'Hyderabad',
    tag: 'Corporate vs Personal Top-up',
    highlight: 'Helped pick the right super top-up alongside my corporate insurance cover.',
    rating: 5,
  },
];

// ─── Per-card component with image error handling ───────────────────────────
const TestimonialCard: React.FC<{ item: TestimonialItem; onOpenImage: (item: TestimonialItem) => void }> = ({ item, onOpenImage }) => {
  const [imgError, setImgError] = useState(false);
  const handleError = useCallback(() => setImgError(true), []);
  const hasImage = item.imageUrl && !imgError;

  return (
    <div
      onClick={() => hasImage && onOpenImage(item)}
      className={`tap-card group bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-xs hover:shadow-md hover:border-blue-300 transition-all duration-300 flex flex-col justify-between ${
        hasImage ? 'cursor-pointer' : ''
      }`}
    >
      {/* TOP PREVIEW AREA */}
      <div className="relative aspect-[4/3] bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-100 flex items-center justify-center overflow-hidden border-b border-slate-100">
        {hasImage ? (
          <>
            <img
              src={item.imageUrl}
              alt={`${item.author} feedback`}
              onError={handleError}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            {/* Desktop hover overlay */}
            <div className="hidden sm:flex absolute inset-0 bg-slate-950/20 opacity-0 group-hover:opacity-100 transition-opacity items-center justify-center">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/95 rounded-full text-xs font-extrabold text-slate-900 shadow-md">
                <Maximize2 className="w-3.5 h-3.5 text-blue-600" />
                <span>View full</span>
              </span>
            </div>
            {/* Mobile always-visible tap hint */}
            <div className="sm:hidden absolute bottom-2 right-2">
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-black/50 backdrop-blur-sm rounded-full text-[10px] font-bold text-white">
                <Maximize2 className="w-3 h-3" />
                Tap to expand
              </span>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center p-5 w-full text-center text-slate-400">
            <div className="w-12 h-12 rounded-2xl bg-white shadow-xs border border-slate-200/80 flex items-center justify-center mb-2.5">
              <ImageIcon className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold text-slate-600 block mb-0.5">
              {item.author}
            </span>
            <span className="text-[11px] text-slate-400">{item.location}</span>
          </div>
        )}

        {/* Tag Badge */}
        <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm px-2.5 py-1 rounded-full text-[11px] font-extrabold text-blue-700 shadow-xs border border-blue-100">
          {item.tag}
        </div>
      </div>

      {/* CARD CONTENT */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between bg-white">
        <div>
          {/* Rating Stars */}
          <div className="flex items-center gap-1 mb-2 text-amber-400">
            {[...Array(item.rating)].map((_, i) => (
              <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            ))}
          </div>
          {/* Highlight Quote */}
          <div className="flex items-start gap-2 mb-3">
            <MessageSquareQuote className="w-4 h-4 text-blue-500 shrink-0 mt-0.5 opacity-80" />
            <p className="text-xs sm:text-sm font-semibold text-slate-800 leading-relaxed">
              "{item.highlight}"
            </p>
          </div>
        </div>
        {/* Client Info */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
          <div>
            <span className="font-extrabold text-slate-900 block">{item.author}</span>
            {item.location && (
              <span className="text-slate-400 text-[11px] font-medium">{item.location}</span>
            )}
          </div>
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600">
            <CheckCircle2 className="w-3 h-3" />
            <span>Verified Client</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export const TestimonialsSection: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<TestimonialItem | null>(null);

  return (
    <section
      id="testimonials"
      className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 md:py-14"
    >
      {/* SECTION HEADER */}
      <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 text-blue-700 font-extrabold text-xs tracking-wider uppercase mb-3 shadow-sm border border-blue-100/80">
          <Sparkles className="w-3.5 h-3.5 text-blue-600" />
          <span>Real Client Experiences & Feedback</span>
        </div>

        <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-slate-950 tracking-tight leading-[1.15] mb-3">
          Trusted by <span className="text-blue-600">1,200+ Families</span> Across India
        </h2>

        <div className="w-16 h-1 bg-blue-600 rounded-full mx-auto mb-3"></div>

        <p className="text-slate-600 text-base sm:text-lg font-medium leading-relaxed">
          On-ground claim assistance, policy audits, and honest guidance from real policyholders.
        </p>

        {/* TRUST BADGE STRIP */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mt-5 text-xs sm:text-sm font-bold text-slate-700">
          <div className="flex items-center gap-1.5 bg-white/80 px-3.5 py-1.5 rounded-full border border-slate-200/80 shadow-xs">
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span>4.9 / 5 Client Rating</span>
          </div>

          <div className="flex items-center gap-1.5 bg-white/80 px-3.5 py-1.5 rounded-full border border-slate-200/80 shadow-xs text-blue-700">
            <CheckCircle2 className="w-4 h-4 text-blue-600" />
            <span>100% Genuine Feedback</span>
          </div>

          <div className="flex items-center gap-1.5 bg-white/80 px-3.5 py-1.5 rounded-full border border-slate-200/80 shadow-xs text-emerald-700">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>700+ Claims Assisted</span>
          </div>
        </div>
      </div>

      {/* 6 TESTIMONIALS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
        {testimonialsList.map((item) => (
          <TestimonialCard
            key={item.id}
            item={item}
            onOpenImage={setSelectedImage}
          />
        ))}
      </div>

      {/* FULL-IMAGE LIGHTBOX MODAL */}
      {selectedImage && (
        <div
          onClick={() => setSelectedImage(null)}
          className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-hidden shadow-2xl flex flex-col"
          >
            {/* Top Bar */}
            <div className="p-4 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h4 className="font-bold text-slate-900 text-sm sm:text-base">
                  {selectedImage.author}
                </h4>
                <span className="text-xs text-blue-600 font-semibold">{selectedImage.tag}</span>
              </div>
              <button
                onClick={() => setSelectedImage(null)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors"
                title="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Full Image Display */}
            <div className="p-4 overflow-y-auto max-h-[70vh] flex items-center justify-center bg-slate-50">
              <img
                src={selectedImage.imageUrl}
                alt={selectedImage.author}
                className="max-h-full max-w-full rounded-xl object-contain shadow-sm"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
