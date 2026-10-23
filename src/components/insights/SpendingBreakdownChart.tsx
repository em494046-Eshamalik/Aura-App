import React from 'react';
import { BudgetCategory, SupportedCurrency } from '../../types/finance';
import { formatCurrency } from '../../utils/formatters';

interface SpendingBreakdownChartProps {
  budgets: BudgetCategory[];
  currency: SupportedCurrency;
  privacyMode: boolean;
}

export const SpendingBreakdownChart: React.FC<SpendingBreakdownChartProps> = ({
  budgets,
  currency,
  privacyMode,
}) => {
  const totalSpent = budgets.reduce((acc, b) => acc + b.spent, 0);

  return (
    <div className="bg-slate-900/80 border border-slate-800/80 rounded-2xl p-4 shadow-lg">
      <div className="flex items-center justify-between mb-3">
        <div>
          <h4 className="text-xs font-bold text-white tracking-tight">Category Breakdown</h4>
          <span className="text-[10px] text-slate-400">Actual vs Budget Allocation</span>
        </div>
        <span className="text-xs font-mono font-semibold text-slate-200">
          {privacyMode ? '••••' : formatCurrency(totalSpent, currency)}
        </span>
      </div>

      {/* Multi-segment Progress Bar */}
      <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden flex mb-4">
        {budgets.map((b) => {
          const pct = totalSpent > 0 ? (b.spent / totalSpent) * 100 : 0;
          return (
            <div
              key={b.id}
              style={{
                width: `${pct}%`,
                backgroundColor: b.color,
              }}
              className="h-full transition-all duration-500 first:rounded-l-full last:rounded-r-full"
              title={`${b.category}: ${pct.toFixed(1)}%`}
            />
          );
        })}
      </div>

      {/* Detailed Category Rows */}
      <div className="space-y-2.5">
        {budgets.map((b) => {
          const ratio = b.allocated > 0 ? Math.min(100, Math.round((b.spent / b.allocated) * 100)) : 0;
          const isOverBudget = b.spent > b.allocated;

          return (
            <div key={b.id} className="text-xs">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-1.5 min-w-0">
                  <span
                    className="w-2 h-2 rounded-full shrink-0"
                    style={{ backgroundColor: b.color }}
                  />
                  <span className="text-slate-300 font-medium truncate max-w-[130px]">
                    {b.category}
                  </span>
                </div>

                <div className="flex items-center gap-2 font-mono text-[11px]">
                  <span className={isOverBudget ? 'text-rose-400 font-semibold' : 'text-slate-200'}>
                    {privacyMode ? '••' : formatCurrency(b.spent, currency)}
                  </span>
                  <span className="text-slate-500">/</span>
                  <span className="text-slate-400">
                    {privacyMode ? '••' : formatCurrency(b.allocated, currency)}
                  </span>
                </div>
              </div>

              {/* Progress bar per category */}
              <div className="w-full h-1.5 bg-slate-950 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    isOverBudget ? 'bg-rose-500' : 'bg-sky-500'
                  }`}
                  style={{
                    width: `${ratio}%`,
                    backgroundColor: isOverBudget ? '#f43f5e' : b.color,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
