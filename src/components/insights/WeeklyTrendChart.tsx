import React, { useState } from 'react';
import { SupportedCurrency } from '../../types/finance';
import { formatCurrency } from '../../utils/formatters';

interface WeeklyTrendChartProps {
  currency: SupportedCurrency;
  privacyMode: boolean;
}

export const WeeklyTrendChart: React.FC<WeeklyTrendChartProps> = ({
  currency,
  privacyMode,
}) => {
  const [selectedDayIndex, setSelectedDayIndex] = useState<number | null>(3); // default Thursday

  const daysData = [
    { day: 'Mon', amount: 45.20, label: 'Oct 14' },
    { day: 'Tue', amount: 89.00, label: 'Oct 15' },
    { day: 'Wed', amount: 32.50, label: 'Oct 16' },
    { day: 'Thu', amount: 142.80, label: 'Oct 17 (Peak)' },
    { day: 'Fri', amount: 65.00, label: 'Oct 18' },
    { day: 'Sat', amount: 120.40, label: 'Oct 19' },
    { day: 'Sun', amount: 55.10, label: 'Oct 20' },
  ];

  const maxAmount = Math.max(...daysData.map(d => d.amount));
  const activeDay = selectedDayIndex !== null ? daysData[selectedDayIndex] : daysData[3];
  const weeklyTotal = daysData.reduce((acc, d) => acc + d.amount, 0);

  return (
    <div className="bg-slate-900/80 border border-slate-800/80 rounded-2xl p-4 shadow-lg">
      <div className="flex items-center justify-between mb-2">
        <div>
          <h4 className="text-xs font-bold text-white tracking-tight">Weekly Velocity</h4>
          <span className="text-[10px] text-slate-400">Past 7 Days Discretionary</span>
        </div>

        <div className="text-right">
          <span className="text-[10px] text-slate-400 block">7-Day Total</span>
          <span className="text-xs font-bold font-mono text-white">
            {privacyMode ? '••••' : formatCurrency(weeklyTotal, currency)}
          </span>
        </div>
      </div>

      {/* Selected Day Info Badge */}
      <div className="mb-3 py-1 px-2.5 rounded-lg bg-slate-950/60 border border-slate-800/60 flex items-center justify-between text-xs">
        <span className="text-slate-400 text-[11px]">{activeDay.label}:</span>
        <span className="font-mono font-bold text-sky-400">
          {privacyMode ? '••••' : formatCurrency(activeDay.amount, currency)}
        </span>
      </div>

      {/* SVG / Flex Bar Chart */}
      <div className="h-32 flex items-end justify-between gap-2 pt-2 px-1">
        {daysData.map((item, idx) => {
          const heightPct = Math.round((item.amount / maxAmount) * 100);
          const isSelected = selectedDayIndex === idx;

          return (
            <button
              key={item.day}
              onClick={() => setSelectedDayIndex(idx)}
              className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end group cursor-pointer focus:outline-none"
            >
              <div className="w-full flex justify-center items-end h-[85%]">
                <div
                  style={{ height: `${heightPct}%` }}
                  className={`w-full max-w-[24px] rounded-t-md transition-all duration-300 ${
                    isSelected
                      ? 'bg-sky-400 shadow-[0_0_12px_rgba(56,189,248,0.5)]'
                      : 'bg-slate-800 group-hover:bg-slate-700'
                  }`}
                />
              </div>
              <span
                className={`text-[10px] font-mono transition-colors ${
                  isSelected ? 'text-sky-400 font-bold' : 'text-slate-500'
                }`}
              >
                {item.day}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
