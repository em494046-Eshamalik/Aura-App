import React, { useState } from 'react';
import { Sparkles, ArrowRight, ShieldCheck, AlertCircle, TrendingUp, Check } from 'lucide-react';
import { FinancialInsight } from '../../types/finance';

interface AIInsightWidgetProps {
  insights: FinancialInsight[];
  onOpenAdvisor: (topic?: string) => void;
}

export const AIInsightWidget: React.FC<AIInsightWidgetProps> = ({
  insights,
  onOpenAdvisor,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [completedActionId, setCompletedActionId] = useState<string | null>(null);

  if (!insights || insights.length === 0) return null;

  const current = insights[currentIndex % insights.length];

  const getIcon = (type: string) => {
    switch (type) {
      case 'warning':
        return <AlertCircle size={15} className="text-amber-400" />;
      case 'growth':
        return <TrendingUp size={15} className="text-emerald-400" />;
      case 'saving':
      default:
        return <ShieldCheck size={15} className="text-sky-400" />;
    }
  };

  const handleAction = () => {
    setCompletedActionId(current.id);
    setTimeout(() => {
      onOpenAdvisor(current.title);
    }, 400);
  };

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950/40 border border-sky-500/30 rounded-2xl p-4 shadow-xl shadow-sky-950/20">
      {/* AI Header Line */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-1.5">
          <div className="w-5 h-5 rounded-full bg-sky-500/20 flex items-center justify-center">
            <Sparkles size={11} className="text-sky-400" />
          </div>
          <span className="text-xs font-bold uppercase tracking-wider text-sky-400">
            Aura AI Copilot
          </span>
          <span className="text-[10px] text-slate-500">· Real-time</span>
        </div>

        {/* Carousel indicator */}
        <div className="flex items-center gap-1">
          {insights.map((ins, idx) => (
            <button
              key={ins.id}
              onClick={() => setCurrentIndex(idx)}
              className={`h-1 rounded-full transition-all ${
                currentIndex === idx ? 'w-4 bg-sky-400' : 'w-1.5 bg-slate-700'
              }`}
              aria-label={`Insight ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Insight Title & Description */}
      <div className="mt-1">
        <div className="flex items-center gap-1.5 mb-1">
          {getIcon(current.type)}
          <h4 className="text-xs font-semibold text-white tracking-tight">
            {current.title}
          </h4>
        </div>
        <p className="text-[11px] text-slate-300 leading-relaxed">
          {current.description}
        </p>
      </div>

      {/* Action Footer */}
      <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-slate-800/80">
        <div className="text-[10px] text-slate-400">
          Impact: <span className="font-semibold text-sky-300 font-mono">+${current.impactAmount || 150}/yr</span>
        </div>

        <button
          onClick={handleAction}
          className="flex items-center gap-1 text-[11px] font-semibold text-slate-950 bg-sky-400 hover:bg-sky-300 px-2.5 py-1 rounded-lg transition-all active:scale-95 shadow-sm shadow-sky-500/20"
        >
          {completedActionId === current.id ? (
            <>
              <Check size={12} />
              <span>Applied</span>
            </>
          ) : (
            <>
              <span>{current.actionLabel || 'Analyze Strategy'}</span>
              <ArrowRight size={12} />
            </>
          )}
        </button>
      </div>
    </div>
  );
};
