import React from 'react';
import { X, Trash2, CheckCircle2, ShieldCheck, Calendar, CreditCard, FileText } from 'lucide-react';
import { Transaction, SupportedCurrency } from '../../types/finance';
import { formatCurrency, formatDate } from '../../utils/formatters';

interface TransactionDetailModalProps {
  transaction: Transaction | null;
  currency: SupportedCurrency;
  onClose: () => void;
  onDelete: (id: string) => void;
  onToggleTaxDeductible: (id: string) => void;
}

export const TransactionDetailModal: React.FC<TransactionDetailModalProps> = ({
  transaction,
  currency,
  onClose,
  onDelete,
  onToggleTaxDeductible,
}) => {
  if (!transaction) return null;

  const isIncome = transaction.type === 'income';

  return (
    <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex flex-col justify-end p-3 animate-fade-in">
      <div 
        className="w-full bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Grab Handle */}
        <div className="w-10 h-1 bg-slate-700 rounded-full mx-auto mb-4" />

        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <ShieldCheck size={18} className="text-sky-400" />
            <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
              Transaction Details
            </span>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-300 transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {/* Amount Big Display */}
        <div className="py-4 text-center">
          <span className="text-[11px] text-slate-400 block mb-1">
            {transaction.merchant || transaction.title}
          </span>
          <div
            className={`text-3xl font-extrabold font-mono tracking-tight ${
              isIncome ? 'text-emerald-400' : 'text-white'
            }`}
          >
            {isIncome ? '+' : '-'}{formatCurrency(transaction.amount, currency)}
          </div>
          <span className="inline-block mt-2 text-[10px] font-semibold uppercase px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
            {transaction.category}
          </span>
        </div>

        {/* Details Table */}
        <div className="space-y-2.5 py-3 border-t border-b border-slate-800 text-xs">
          <div className="flex items-center justify-between text-slate-300">
            <span className="flex items-center gap-1.5 text-slate-400">
              <Calendar size={14} /> Date
            </span>
            <span className="font-mono">{formatDate(transaction.date)}</span>
          </div>

          <div className="flex items-center justify-between text-slate-300">
            <span className="flex items-center gap-1.5 text-slate-400">
              <CreditCard size={14} /> Account
            </span>
            <span className="font-mono">{transaction.account}</span>
          </div>

          {transaction.note && (
            <div className="flex items-start justify-between text-slate-300 pt-1">
              <span className="flex items-center gap-1.5 text-slate-400 shrink-0">
                <FileText size={14} /> Note
              </span>
              <span className="text-right text-slate-300 pl-4 text-[11px]">
                {transaction.note}
              </span>
            </div>
          )}

          <div className="flex items-center justify-between text-slate-300 pt-1">
            <span className="text-slate-400">Tax Deductible</span>
            <button
              onClick={() => onToggleTaxDeductible(transaction.id)}
              className={`text-[11px] font-medium px-2 py-1 rounded-md transition-all flex items-center gap-1 ${
                transaction.isTaxDeductible
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                  : 'bg-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              {transaction.isTaxDeductible ? <CheckCircle2 size={12} /> : null}
              <span>{transaction.isTaxDeductible ? 'Flagged for CPA' : 'Mark as Business'}</span>
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 pt-4">
          <button
            onClick={() => {
              onDelete(transaction.id);
              onClose();
            }}
            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-300 text-xs font-semibold transition-all"
          >
            <Trash2 size={14} />
            <span>Delete Entry</span>
          </button>

          <button
            onClick={onClose}
            className="flex-1 py-2.5 px-3 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 text-xs font-bold transition-all shadow-md shadow-sky-500/20"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
