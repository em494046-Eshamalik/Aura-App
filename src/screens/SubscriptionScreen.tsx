import React, { useState } from 'react';
import { Check, Sparkles, ArrowLeft, Shield, Zap } from 'lucide-react';
import { SUBSCRIPTION_PLANS } from '../constants/demoData';
import { SubscriptionPlan } from '../types/finance';

interface SubscriptionScreenProps {
  currentTier?: string;
  onSelectPlan: (plan: SubscriptionPlan) => void;
  onBack: () => void;
}

export const SubscriptionScreen: React.FC<SubscriptionScreenProps> = ({
  currentTier = 'Aura Pro',
  onSelectPlan,
  onBack,
}) => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('yearly');
  const [selectedPlanId, setSelectedPlanId] = useState<'starter' | 'pro' | 'wealth'>('pro');

  const selectedPlan = SUBSCRIPTION_PLANS.find(p => p.id === selectedPlanId) || SUBSCRIPTION_PLANS[1];

  const handleContinue = () => {
    onSelectPlan(selectedPlan);
  };

  return (
    <div className="relative flex-1 flex flex-col justify-between p-4 bg-slate-950 text-white overflow-y-auto no-scrollbar select-none">
      {/* Top Header */}
      <div className="flex items-center justify-between pb-3 shrink-0">
        <button
          onClick={onBack}
          className="w-8 h-8 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-white"
        >
          <ArrowLeft size={16} />
        </button>

        <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
          Membership Plans
        </span>

        <span className="w-8" />
      </div>

      <div className="space-y-4 py-1">
        {/* Title */}
        <div className="text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-400 text-[10px] font-bold uppercase tracking-wider mb-2">
            <Sparkles size={11} />
            <span>AI Wealth Intelligence Tier</span>
          </div>
          <h2 className="text-xl font-extrabold text-white tracking-tight">
            Elevate Your Financial Horizon
          </h2>
          <p className="text-xs text-slate-400 mt-1 max-w-xs mx-auto">
            Choose the portfolio management and AI copilot tier that fits your wealth strategy.
          </p>
        </div>

        {/* Monthly vs Yearly Switcher */}
        <div className="flex items-center justify-center">
          <div className="grid grid-cols-2 p-1 bg-slate-900 border border-slate-800 rounded-xl w-64 text-xs font-semibold">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`py-1.5 rounded-lg transition-all ${
                billingCycle === 'monthly'
                  ? 'bg-slate-800 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`py-1.5 rounded-lg transition-all flex items-center justify-center gap-1 ${
                billingCycle === 'yearly'
                  ? 'bg-sky-500 text-slate-950 font-bold shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <span>Annual</span>
              <span className="text-[9px] bg-slate-950 text-sky-300 px-1 rounded font-mono">
                -20%
              </span>
            </button>
          </div>
        </div>

        {/* Plan Cards */}
        <div className="space-y-3">
          {SUBSCRIPTION_PLANS.map((plan) => {
            const isSelected = selectedPlanId === plan.id;
            const price = billingCycle === 'yearly' ? plan.priceYearly : plan.priceMonthly;

            return (
              <div
                key={plan.id}
                onClick={() => setSelectedPlanId(plan.id)}
                className={`relative p-4 rounded-2xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-slate-900/95 border-sky-500/80 shadow-lg shadow-sky-950/40'
                    : 'bg-slate-900/40 border-slate-800/80 hover:border-slate-700'
                }`}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <div className="absolute -top-2.5 right-4 px-2 py-0.5 rounded-full bg-gradient-to-r from-sky-500 to-indigo-500 text-slate-950 text-[9px] font-extrabold uppercase tracking-wider shadow-sm">
                    Recommended
                  </div>
                )}

                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-white flex items-center gap-2">
                      <span>{plan.name}</span>
                      {isSelected && (
                        <span className="w-2 h-2 rounded-full bg-sky-400" />
                      )}
                    </h3>
                    <p className="text-[10px] text-slate-400 mt-0.5">
                      {plan.tagline}
                    </p>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="text-base font-extrabold font-mono text-white">
                      ${price.toFixed(2)}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono block">
                      {price === 0 ? 'Free tier' : '/month'}
                    </span>
                  </div>
                </div>

                {/* Features List */}
                <div className="mt-3 pt-3 border-t border-slate-800/60 space-y-1.5">
                  {plan.features.slice(0, 4).map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-slate-300">
                      <div className="w-3.5 h-3.5 rounded-full bg-sky-500/10 border border-sky-500/20 flex items-center justify-center shrink-0">
                        <Check size={9} className="text-sky-400" />
                      </div>
                      <span className="text-[11px] leading-tight">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Sticky Bottom Actions */}
      <div className="pt-4 border-t border-slate-900 shrink-0 space-y-2">
        <button
          onClick={handleContinue}
          className="w-full h-12 rounded-2xl bg-sky-500 hover:bg-sky-400 active:scale-[0.98] text-slate-950 font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-lg shadow-sky-500/25"
        >
          <span>Continue with {selectedPlan.name}</span>
        </button>

        <div className="flex items-center justify-center gap-2 text-[10px] text-slate-400">
          <Shield size={11} className="text-slate-400" />
          <span>Demo Pricing Only · Cancel or Change Anytime</span>
        </div>
      </div>
    </div>
  );
};
