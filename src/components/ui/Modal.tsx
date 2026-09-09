import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { useModal } from '../../context/ModalContext';
import {
  X,
  Armchair,
  CheckCircle2,
  Calendar,
  Clock,
  Sparkles,
  ShieldCheck,
  PhoneCall,
  Mail,
  User,
  MessageCircle,
  Newspaper,
  Check,
  ExternalLink,
} from 'lucide-react';
import { Button } from './Button';

// PLACEHOLDER LINK: The user can update this URL anytime
const WHATSAPP_REDIRECT_URL = "https://chat.whatsapp.com/KuHFZ6nKh4UKyleRGKuinU";

export const Modal: React.FC = () => {
  const { isOpen, closeModal, isSubmitting, isSuccess, submitReservation } = useModal();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    whatsapp: '',
    policyStatus: 'existing',
    subscribeNewsletter: true,
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [countdown, setCountdown] = useState<number>(2);
  const [redirectStarted, setRedirectStarted] = useState<boolean>(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Trigger grand celebration confetti effect on success
  useEffect(() => {
    if (isSuccess && isOpen) {
      setCountdown(2);
      setRedirectStarted(true);

      // Multi-burst fireworks confetti
      const end = Date.now() + 2 * 1000;
      const colors = ['#1B64F2', '#2563EB', '#60A5FA', '#F59E0B', '#10B981', '#EC4899'];

      const frame = () => {
        confetti({
          particleCount: 4,
          angle: 60,
          spread: 55,
          origin: { x: 0, y: 0.7 },
          colors: colors,
        });
        confetti({
          particleCount: 4,
          angle: 120,
          spread: 55,
          origin: { x: 1, y: 0.7 },
          colors: colors,
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };
      frame();

      // Big center burst
      confetti({
        particleCount: 80,
        spread: 100,
        origin: { y: 0.6 },
        colors: colors,
      });
    } else {
      setRedirectStarted(false);
      if (timerRef.current) clearInterval(timerRef.current);
    }
  }, [isSuccess, isOpen]);

  // Handle 2-second countdown & WhatsApp redirect
  useEffect(() => {
    if (redirectStarted && isSuccess) {
      timerRef.current = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            if (timerRef.current) clearInterval(timerRef.current);
            // Execute redirect to WhatsApp placeholder link
            try {
              window.open(WHATSAPP_REDIRECT_URL, '_blank', 'noopener,noreferrer');
            } catch {
              // fallback
              window.location.href = WHATSAPP_REDIRECT_URL;
            }
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [redirectStarted, isSuccess]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        closeModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, closeModal]);

  if (!isOpen) return null;

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Please enter your full name';
    }
    if (!formData.email.trim() || !/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.whatsapp.trim() || formData.whatsapp.length < 8) {
      newErrors.whatsapp = 'Please enter a valid WhatsApp phone number';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    await submitReservation(formData);
  };

  const handleImmediateWhatsAppJoin = () => {
    try {
      window.open(WHATSAPP_REDIRECT_URL, '_blank', 'noopener,noreferrer');
    } catch {
      window.location.href = WHATSAPP_REDIRECT_URL;
    }
  };

  return (
    <div
      id="seat-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md transition-opacity duration-300 animate-in fade-in"
      onClick={(e) => {
        if (e.target === e.currentTarget) closeModal();
      }}
    >
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-100 relative max-h-[92vh] overflow-y-auto transform transition-all duration-300">
        {/* Close Button */}
        <button
          onClick={closeModal}
          aria-label="Close modal"
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors cursor-pointer z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSuccess ? (
          <div id="modal-form-content">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center text-2xl mb-3">
              <Armchair className="w-6 h-6" />
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 font-bold text-xs uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Free 60-Minute Masterclass</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight mb-1">
              THE HEALTH INSURANCE PLAYBOOK
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mb-5">
              Live with Yash Singh (Youfinanceschool) • Sat, 23 Aug at 7:00 PM IST
            </p>

            <form onSubmit={handleSubmit} className="space-y-3.5">
              {/* Name */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="e.g. Yash Sharma"
                    className={`w-full pl-10 pr-4 py-2.5 sm:py-3 rounded-xl border ${
                      errors.fullName ? 'border-red-400 bg-red-50/30' : 'border-slate-200'
                    } focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none text-sm transition-all`}
                  />
                </div>
                {errors.fullName && <p className="text-xs text-red-500 mt-1">{errors.fullName}</p>}
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@example.com"
                    className={`w-full pl-10 pr-4 py-2.5 sm:py-3 rounded-xl border ${
                      errors.email ? 'border-red-400 bg-red-50/30' : 'border-slate-200'
                    } focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none text-sm transition-all`}
                  />
                </div>
                {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
              </div>

              {/* WhatsApp Phone */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  WhatsApp Number <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <PhoneCall className="w-4 h-4" />
                  </div>
                  <input
                    type="tel"
                    required
                    value={formData.whatsapp}
                    onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                    placeholder="9876******"
                    className={`w-full pl-10 pr-4 py-2.5 sm:py-3 rounded-xl border ${
                      errors.whatsapp ? 'border-red-400 bg-red-50/30' : 'border-slate-200'
                    } focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none text-sm transition-all`}
                  />
                </div>
                {errors.whatsapp && <p className="text-xs text-red-500 mt-1">{errors.whatsapp}</p>}
              </div>

              {/* Current Policy Status */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Current Policy Status
                </label>
                <select
                  value={formData.policyStatus}
                  onChange={(e) => setFormData({ ...formData, policyStatus: e.target.value })}
                  className="w-full px-4 py-2.5 sm:py-3 rounded-xl border border-slate-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none text-sm bg-white text-slate-800 transition-all cursor-pointer"
                >
                  <option value="planning">I am planning to buy soon</option>
                  <option value="existing">I already have health insurance</option>
                </select>
              </div>

              {/* AUTO CHECKLIST: Join Our Exclusive Top Mind Community */}
              <div className="pt-1">
                <label
                  onClick={() =>
                    setFormData({
                      ...formData,
                      subscribeNewsletter: !formData.subscribeNewsletter,
                    })
                  }
                  className="flex items-start gap-3 p-3.5 rounded-2xl bg-blue-50/70 border border-blue-100/90 hover:bg-blue-50 transition-colors cursor-pointer select-none"
                >
                  <div className="pt-0.5">
                    <div
                      className={`w-5 h-5 rounded-md flex items-center justify-center transition-colors ${
                        formData.subscribeNewsletter
                          ? 'bg-blue-600 text-white'
                          : 'border-2 border-slate-300 bg-white'
                      }`}
                    >
                      {formData.subscribeNewsletter && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>
                  </div>
                  <div className="flex-1 text-left">
                    <div className="flex items-center gap-1.5 text-xs sm:text-sm font-extrabold text-slate-900 leading-tight">
                      <Newspaper className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                      <span>Join Our Exclusive Top Mind Community</span>
                    </div>
                    <p className="text-[11px] text-slate-600 mt-1 leading-normal font-medium">
                      45k+ brilliant mind already joined
                    </p>
                  </div>
                </label>
              </div>

              <div className="pt-2">
                <Button
                  type="submit"
                  size="md"
                  isLoading={isSubmitting}
                  showArrowIcon={true}
                  className="w-full py-4 text-base rounded-xl font-black"
                >
                  CONFIRM SEAT RESERVATION
                </Button>
              </div>

              <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400 text-center font-medium pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                <span>Zero policy pushing. No spam. Youfinanceschool education.</span>
              </div>
            </form>
          </div>
        ) : (
          /* BIG CELEBRATION POPUP BOX */
          <div id="modal-celebration-content" className="text-center py-4 relative">
            {/* Sparkles / Burst Animation */}
            <div className="relative inline-block mb-3">
              <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-400 text-white flex items-center justify-center mx-auto shadow-xl ring-8 ring-emerald-50 animate-bounce">
                <CheckCircle2 className="w-11 h-11" />
              </div>
              <div className="absolute -top-1 -right-1 bg-amber-400 text-slate-900 rounded-full p-1 shadow">
                <Sparkles className="w-4 h-4 fill-current" />
              </div>
            </div>

            {/* Requested Exact Celebration Heading */}
            <div className="bg-gradient-to-r from-blue-50 via-indigo-50 to-blue-50 rounded-2xl p-5 border border-blue-200 mb-6 shadow-sm">
              <span className="inline-block px-3 py-1 rounded-full bg-blue-600 text-white text-[11px] font-black uppercase tracking-widest mb-2 shadow-sm">
                🎉 YOU ARE OFFICIALLY REGISTERED
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-slate-950 leading-snug tracking-tight">
                "Thanks For Joining The Workshop I'll Meet You In The Live"
              </h3>
              <p className="text-xs text-blue-700 font-bold mt-1">
                — Yash Sing (Founder, Youfinanceschool)
              </p>
            </div>

            {/* Event Summary Card */}
            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 mb-5 text-left space-y-2.5 text-xs sm:text-sm">
              <div className="flex items-center gap-3">
                <Calendar className="w-4 h-4 text-blue-600 shrink-0" />
                <span className="font-bold text-slate-800">Saturday, 23 August 2026</span>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-blue-600 shrink-0" />
                <span className="font-bold text-slate-800">7:00 PM - 8:00 PM IST (60 Minutes)</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-blue-600 shrink-0" />
                <span className="text-slate-600">
                  Access pass sent to: <span className="font-bold text-slate-800">{formData.email}</span>
                </span>
              </div>
            </div>

            {/* Auto WhatsApp Redirect Timer Bar */}
            <div className="bg-emerald-50 rounded-2xl p-4 border border-emerald-200 mb-5">
              <div className="flex items-center justify-between text-xs font-bold text-emerald-900 mb-2">
                <div className="flex items-center gap-1.5">
                  <MessageCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Redirecting to WhatsApp Community</span>
                </div>
                <span className="text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full text-[11px]">
                  in {countdown}s
                </span>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-emerald-200 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-emerald-600 h-full rounded-full transition-all duration-1000 ease-linear"
                  style={{ width: `${((2 - countdown) / 2) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Direct Instant Action Button */}
            <button
              onClick={handleImmediateWhatsAppJoin}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-black py-4 px-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 text-base flex items-center justify-center gap-2 mb-3 cursor-pointer group"
            >
              <MessageCircle className="w-5 h-5 fill-current" />
              <span>JOIN WHATSAPP GROUP NOW</span>
              <ExternalLink className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </button>

            <button
              onClick={closeModal}
              className="w-full bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold py-2.5 rounded-xl transition-colors text-xs cursor-pointer"
            >
              Stay on page / Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
