import React from 'react';
import { TrendingUp, ArrowDownLeft, ArrowUpRight, DollarSign } from 'lucide-react';
import { formatCurrency } from '../../utils/formatters';
import { SupportedCurrency, CashFlowSummary } from '../../types/finance';

interface CashFlowSummaryCardProps {
  cashFlow: CashFlowSummary;
  currency: SupportedCurrency;
  privacyMode: boolean;
}

export const CashFlowSummaryCard: React.FC<CashFlowSummaryCardProps> = ({
  cashFlow,
  currency,
  privacyMode,
}) => {
  const netSavings = cashFlow.monthlyIncome - cashFlow.monthlyExpenses;

  return (
    <div className="bg-slate-900/80 border border-slate-800/90 rounded-2xl p-4 backdrop-blur-md shadow-lg shadow-black/30">
      {/* Total Balance Headline */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-800/60">
        <div>
          <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider block">
            Total Net Worth
          </span>
          <div className="text-2xl font-bold tracking-tight text-white font-mono mt-0.5">
            {privacyMode ? '••••••••' : formatCurrency(cashFlow.totalBalance, currency)}
          </div>
        </div>

        <div className="flex flex-col items-end">
          <span className="text-[10px] text-slate-400 font-medium">Monthly Savings Rate</span>
          <div className="flex items-center gap-1 text-emerald-400 text-xs font-semibold mt-0.5">
            <TrendingUp size={13} />
            <span>{privacyMode ? '••%' : `+${cashFlow.savingsRate.toFixed(1)}%`}</span>
          </div>
        </div>
      </div>

      {/* Two-Column Cash Flow Breakdown */}
      <div className="grid grid-cols-2 gap-3 pt-3">
        {/* Income Block */}
        <div className="flex items-center gap-2.5 p-2 rounded-xl bg-slate-950/50 border border-slate-800/40">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
            <ArrowDownLeft size={16} className="text-emerald-400" />
          </div>
          <div className="min-w-0">
            <span className="text-[10px] text-slate-400 uppercase tracking-wider block truncate">
              Income Inflow
            </span>
            <span className="text-sm font-semibold font-mono text-emerald-400 truncate block">
              {privacyMode ? '••••' : formatCurrency(cashFlow.monthlyIncome, currency)}
            </span>
          </div>
        </div>

        {/* Expense Block */}
        <div className="flex items-center gap-2.5 p-2 rounded-xl bg-slate-950/50 border border-slate-800/40">
          <div className="w-8 h-8 rounded-lg bg-rose-500/10 border border-rose-500/20 flex items-center justify-center shrink-0">
            <ArrowUpRight size={16} className="text-rose-400" />
          </div>
          <div className="min-w-0">
            <span className="text-[10px] text-slate-400 uppercase tracking-wider block truncate">
              Total Outflow
            </span>
            <span className="text-sm font-semibold font-mono text-slate-200 truncate block">
              {privacyMode ? '••••' : formatCurrency(cashFlow.monthlyExpenses, currency)}
            </span>
          </div>
        </div>
      </div>

      {/* Visual Cash Flow Progress Track */}
      <div className="mt-3 pt-2">
        <div className="flex justify-between text-[10px] text-slate-400 mb-1">
          <span>Net Surplus: {privacyMode ? '••••' : formatCurrency(netSavings, currency)}</span>
          <span className="font-mono text-sky-400">Target: $4,500/mo</span>
        </div>
        <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden flex">
          <div 
            className="h-full bg-gradient-to-r from-emerald-500 to-sky-400 rounded-full transition-all duration-500"
            style={{ width: `${Math.min(100, Math.max(10, cashFlow.savingsRate))}%` }}
          />
        </div>
      </div>
    </div>
  );
};
