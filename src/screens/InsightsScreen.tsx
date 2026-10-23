import React, { useState } from 'react';
import { Sparkles, TrendingUp, AlertTriangle, ArrowRight, ShieldCheck, DollarSign, PieChart } from 'lucide-react';
import { Transaction, BudgetCategory, UserProfile, FinancialInsight } from '../types/finance';
import { SpendingBreakdownChart } from '../components/insights/SpendingBreakdownChart';
import { WeeklyTrendChart } from '../components/insights/WeeklyTrendChart';
import { formatCurrency } from '../utils/formatters';

interface InsightsScreenProps {
  transactions: Transaction[];
  budgets: BudgetCategory[];
  profile: UserProfile;
  insights: FinancialInsight[];
  onOpenAdvisor: (topic?: string) => void;
}

export const InsightsScreen: React.FC<InsightsScreenProps> = ({
  transactions,
  budgets,
  profile,
  insights,
  onOpenAdvisor,
}) => {
  const [selectedPeriod, setSelectedPeriod] = useState<'month' | 'quarter'>('month');

  const totalSpent = budgets.reduce((acc, b) => acc + b.spent, 0);
  const totalAllocated = budgets.reduce((acc, b) => acc + b.allocated, 0);
  const budgetUtilization = totalAllocated > 0 ? (totalSpent / totalAllocated) * 100 : 0;

  return (
    <div className="flex-1 overflow-y-auto no-scrollbar p-4 space-y-4 bg-slate-950 text-white select-none">
      {/* Top Header */}
      <div className="flex items-center justify-between pt-1">
        <div>
          <h2 className="text-base font-bold text-white tracking-tight">
            Financial Insights
          </h2>
          <span className="text-[10px] text-slate-400">
            Intelligence Engine & Spending Analytics
          </span>
        </div>

        <button
          onClick={() => onOpenAdvisor()}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-500 text-slate-950 text-xs font-bold transition-all shadow-md shadow-sky-500/20 active:scale-95"
        >
          <Sparkles size={14} />
          <span>Ask AI</span>
        </button>
      </div>

      {/* Main Budget Gauge Card */}
      <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-900/90 border border-slate-800 shadow-xl">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">
            October Target Budget Health
          </span>
          <span className="text-xs font-mono font-bold text-sky-400">
            {budgetUtilization.toFixed(0)}% Utilized
          </span>
        </div>

        <div className="flex items-baseline justify-between mb-2">
          <div className="text-2xl font-extrabold font-mono text-white">
            {formatCurrency(totalSpent, profile.currency)}
          </div>
          <div className="text-xs text-slate-400 font-mono">
            of {formatCurrency(totalAllocated, profile.currency)} limit
          </div>
        </div>

        <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-700 ${
              budgetUtilization > 90
                ? 'bg-rose-500'
                : budgetUtilization > 75
                ? 'bg-amber-400'
                : 'bg-emerald-400'
            }`}
            style={{ width: `${Math.min(100, budgetUtilization)}%` }}
          />
        </div>

        <div className="flex items-center justify-between text-[10px] text-slate-400 mt-2 font-mono">
          <span>Safe pacing: 11 days remaining</span>
          <span className="text-emerald-400">+$2,352.20 buffer</span>
        </div>
      </div>

      {/* Weekly Velocity Chart */}
      <WeeklyTrendChart
        currency={profile.currency}
        privacyMode={profile.privacyMode}
      />

      {/* Category Breakdown & Progress Bars */}
      <SpendingBreakdownChart
        budgets={budgets}
        currency={profile.currency}
        privacyMode={profile.privacyMode}
      />

      {/* AI Strategy Recommendations Feed */}
      <div className="space-y-2.5 pt-1">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-xs font-bold text-white tracking-tight flex items-center gap-1.5">
            <Sparkles size={14} className="text-sky-400" />
            <span>AI Wealth Recommendations</span>
          </h3>
          <span className="text-[10px] text-slate-500 font-mono">3 Active</span>
        </div>

        <div className="space-y-2.5">
          {insights.map((ins) => (
            <div
              key={ins.id}
              className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-slate-700/80 transition-all text-xs"
            >
              <div className="flex items-start justify-between gap-2 mb-1">
                <span className="font-semibold text-slate-200">
                  {ins.title}
                </span>
                {ins.impactAmount && (
                  <span className="text-[10px] font-mono font-bold text-emerald-400 shrink-0">
                    +${ins.impactAmount}/yr
                  </span>
                )}
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed mb-2.5">
                {ins.description}
              </p>

              <button
                onClick={() => onOpenAdvisor(ins.title)}
                className="flex items-center gap-1 text-[11px] font-semibold text-sky-400 hover:text-sky-300"
              >
                <span>{ins.actionLabel || 'Explore Strategy'}</span>
                <ArrowRight size={12} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
