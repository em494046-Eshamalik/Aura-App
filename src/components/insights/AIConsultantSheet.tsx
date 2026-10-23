import React, { useState } from 'react';
import { X, Sparkles, Send, CheckCircle2, TrendingUp, Lightbulb, ArrowRight, Loader2 } from 'lucide-react';
import { Transaction, BudgetCategory, UserProfile } from '../../types/finance';
import { askFinancialAdvisor, AIAdviceResponse } from '../../services/aiAdvisor';
import { formatCurrency } from '../../utils/formatters';

interface AIConsultantSheetProps {
  isOpen: boolean;
  initialTopic?: string;
  transactions: Transaction[];
  budgets: BudgetCategory[];
  profile: UserProfile;
  onClose: () => void;
}

const PRESET_QUERIES = [
  'How can I save $300 next month?',
  'Analyze my dining & grocery spending velocity',
  'Can I afford a $1,500 vacation right now?',
  'How should I allocate my surplus cash reserves?',
];

export const AIConsultantSheet: React.FC<AIConsultantSheetProps> = ({
  isOpen,
  initialTopic,
  transactions,
  budgets,
  profile,
  onClose,
}) => {
  const [query, setQuery] = useState(initialTopic || '');
  const [loading, setLoading] = useState(false);
  const [advice, setAdvice] = useState<AIAdviceResponse | null>(null);

  if (!isOpen) return null;

  const handleAsk = async (questionText: string) => {
    if (!questionText.trim()) return;
    setLoading(true);
    try {
      const result = await askFinancialAdvisor(questionText, transactions, budgets, profile);
      setAdvice(result);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="absolute inset-0 bg-slate-950/85 backdrop-blur-md z-50 flex flex-col justify-end p-3 animate-fade-in">
      <div 
        className="w-full bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-2xl max-h-[92%] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Grab Handle */}
        <div className="w-10 h-1 bg-slate-700 rounded-full mx-auto mb-3" />

        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-xl bg-sky-500/20 border border-sky-500/30 flex items-center justify-center">
              <Sparkles size={15} className="text-sky-400" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-white tracking-tight">
                Aura AI Wealth Copilot
              </h3>
              <span className="text-[10px] text-slate-400">Gemini 2.5 Quantitative Reasoning</span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-300"
          >
            <X size={15} />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto no-scrollbar py-3 space-y-3.5">
          {/* Quick preset chips */}
          {!advice && !loading && (
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block mb-2">
                Suggested Financial Inquiries
              </span>
              <div className="flex flex-col gap-1.5">
                {PRESET_QUERIES.map((preset) => (
                  <button
                    key={preset}
                    onClick={() => {
                      setQuery(preset);
                      handleAsk(preset);
                    }}
                    className="w-full text-left p-2.5 rounded-xl bg-slate-950/60 hover:bg-slate-800 border border-slate-800/80 text-xs text-slate-300 transition-all flex items-center justify-between group"
                  >
                    <span>{preset}</span>
                    <ArrowRight size={13} className="text-slate-500 group-hover:text-sky-400 transition-colors" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Loading Indicator */}
          {loading && (
            <div className="py-8 flex flex-col items-center justify-center text-center space-y-3">
              <Loader2 size={24} className="text-sky-400 animate-spin" />
              <p className="text-xs text-slate-300">
                Auditing portfolio cash flow & calculating projections...
              </p>
            </div>
          )}

          {/* Advice Output */}
          {advice && !loading && (
            <div className="space-y-3">
              {/* Projected Savings Banner */}
              {advice.projectedSavings && (
                <div className="p-3 rounded-xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <TrendingUp size={16} className="text-sky-400" />
                    <span className="text-xs text-slate-200">Potential Monthly Optimization</span>
                  </div>
                  <span className="text-sm font-bold font-mono text-sky-400">
                    +{formatCurrency(advice.projectedSavings, profile.currency)}/mo
                  </span>
                </div>
              )}

              {/* Main Diagnostic Paragraph */}
              <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 text-xs text-slate-300 leading-relaxed space-y-2 whitespace-pre-line">
                {advice.answer}
              </div>

              {/* Recommendations */}
              {advice.recommendations && advice.recommendations.length > 0 && (
                <div className="p-3 rounded-xl bg-slate-950/50 border border-slate-800">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                    Action Plan Recommendations
                  </span>
                  <ul className="space-y-1.5">
                    {advice.recommendations.map((rec, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-slate-300">
                        <CheckCircle2 size={13} className="text-emerald-400 shrink-0 mt-0.5" />
                        <span>{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Immediate Step */}
              {advice.actionableStep && (
                <div className="p-3 rounded-xl bg-indigo-950/30 border border-indigo-500/30 text-xs flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Lightbulb size={15} className="text-amber-400 shrink-0" />
                    <span className="text-slate-200">{advice.actionableStep}</span>
                  </div>
                </div>
              )}

              <button
                onClick={() => setAdvice(null)}
                className="w-full py-2 text-center text-xs text-sky-400 hover:text-sky-300 font-medium"
              >
                Ask Another Question
              </button>
            </div>
          )}
        </div>

        {/* Input Bar */}
        <div className="pt-2 border-t border-slate-800 shrink-0">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleAsk(query);
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              placeholder="Ask anything about your money..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-sky-500"
            />
            <button
              type="submit"
              disabled={loading || !query.trim()}
              className="w-9 h-9 rounded-xl bg-sky-500 hover:bg-sky-400 disabled:opacity-40 text-slate-950 flex items-center justify-center transition-all shrink-0 font-bold"
            >
              <Send size={15} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
