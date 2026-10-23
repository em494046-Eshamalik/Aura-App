import React, { useState } from 'react';
import { ArrowRight, Sparkles, TrendingUp, ShieldCheck, Lock } from 'lucide-react';

interface OnboardingScreenProps {
  onGetStarted: () => void;
  onSignIn: () => void;
  onOpenInstall?: () => void;
}

export const OnboardingScreen: React.FC<OnboardingScreenProps> = ({
  onGetStarted,
  onSignIn,
  onOpenInstall,
}) => {
  const [slideIndex, setSlideIndex] = useState(0);

  const slides = [
    {
      kicker: 'PREDICTIVE CASH FLOW',
      title: 'Master your wealth with proactive AI intelligence',
      subtitle: 'Real-time liquidity forecasting, automated high-yield sweeps, and zero guesswork for personal finance.',
    },
    {
      kicker: 'TAX-OPTIMIZED STRATEGY',
      title: 'Flag deductions and optimize spending velocity',
      subtitle: 'Aura flags business expenses, negotiates recurring subscriptions, and automates CPA exports.',
    },
    {
      kicker: 'FAMILY-OFFICE SECURITY',
      title: 'Institutional-grade privacy with zero ad trackers',
      subtitle: 'Your transactions stay private. Encrypted locally with biometrics and secure device hardware keys.',
    },
  ];

  const current = slides[slideIndex];

  return (
    <div className="relative flex-1 flex flex-col justify-between p-6 bg-slate-950 text-white overflow-hidden select-none">
      {/* Top Header */}
      <div className="flex items-center justify-between pt-1">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-sky-500/20 flex items-center justify-center">
            <Sparkles size={13} className="text-sky-400" />
          </div>
          <span className="text-xs font-bold tracking-tight text-white uppercase">
            Aura Wealth
          </span>
        </div>

        <button
          onClick={onSignIn}
          className="text-xs text-sky-400 hover:text-sky-300 font-semibold py-1 px-2.5 rounded-lg transition-colors"
        >
          Sign In
        </button>
      </div>

      {/* Visual Illustration Slot */}
      <div className="relative my-auto py-2">
        <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden border border-slate-800 shadow-2xl group">
          <img
            src="/src/assets/images/onboarding_finance_hero_1792504360094.jpg"
            alt="Aura Wealth Onboarding Glass Card"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
          
          {/* Floating Micro-pill on hero */}
          <div className="absolute bottom-3 left-3 right-3 p-2.5 rounded-xl bg-slate-900/90 backdrop-blur-md border border-slate-700/60 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-400" />
              <span className="text-[11px] font-medium text-slate-200">5.2% APY Yield Active</span>
            </div>
            <span className="text-[10px] font-mono font-semibold text-emerald-400">+$218.40/yr</span>
          </div>
        </div>
      </div>

      {/* Text Content */}
      <div className="space-y-3 pb-2">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono uppercase tracking-wider text-sky-400 font-semibold">
            {current.kicker}
          </span>
        </div>

        <h2 className="text-xl font-bold tracking-tight text-white leading-snug">
          {current.title}
        </h2>

        <p className="text-xs text-slate-400 leading-relaxed">
          {current.subtitle}
        </p>

        {/* Carousel Indicators */}
        <div className="flex items-center gap-1.5 pt-2">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setSlideIndex(idx)}
              className={`h-1.5 rounded-full transition-all ${
                slideIndex === idx ? 'w-6 bg-sky-400' : 'w-2 bg-slate-800'
              }`}
              aria-label={`Slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-2 pt-3 border-t border-slate-900">
        {onOpenInstall && (
          <button
            onClick={onOpenInstall}
            className="w-full h-11 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 active:scale-[0.98] text-slate-950 font-extrabold text-xs flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-500/20"
          >
            <span>📲 موبائل میں ایپ انسٹال کریں (Install App)</span>
          </button>
        )}

        <button
          onClick={onGetStarted}
          className="w-full h-11 rounded-2xl bg-sky-500 hover:bg-sky-400 active:scale-[0.98] text-slate-950 font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-lg shadow-sky-500/25"
        >
          <span>Get Started with Aura</span>
          <ArrowRight size={16} />
        </button>

        <button
          onClick={onSignIn}
          className="w-full h-9 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 font-semibold text-xs transition-colors flex items-center justify-center"
        >
          Explore Demo Dashboard Directly
        </button>
      </div>
    </div>
  );
};
