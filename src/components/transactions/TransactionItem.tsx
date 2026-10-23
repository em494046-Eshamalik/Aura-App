import React from 'react';
import { 
  ShoppingBag, 
  Coffee, 
  Laptop, 
  Car, 
  Heart, 
  Film, 
  Briefcase, 
  TrendingUp, 
  Zap, 
  Home,
  CheckCircle2,
} from 'lucide-react';
import { Transaction, SupportedCurrency } from '../../types/finance';
import { formatCurrency, formatDate } from '../../utils/formatters';

interface TransactionItemProps {
  transaction: Transaction;
  currency: SupportedCurrency;
  privacyMode: boolean;
  onSelect: (transaction: Transaction) => void;
}

export const TransactionItem: React.FC<TransactionItemProps> = ({
  transaction,
  currency,
  privacyMode,
  onSelect,
}) => {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Dining & Food':
        return <Coffee size={16} className="text-amber-400" />;
      case 'Groceries':
        return <ShoppingBag size={16} className="text-emerald-400" />;
      case 'Technology':
        return <Laptop size={16} className="text-indigo-400" />;
      case 'Transportation':
        return <Car size={16} className="text-sky-400" />;
      case 'Health & Wellness':
        return <Heart size={16} className="text-rose-400" />;
      case 'Entertainment':
        return <Film size={16} className="text-purple-400" />;
      case 'Salary':
      case 'Freelance':
        return <Briefcase size={16} className="text-emerald-400" />;
      case 'Investment':
        return <TrendingUp size={16} className="text-cyan-400" />;
      case 'Utilities':
        return <Zap size={16} className="text-yellow-400" />;
      case 'Housing':
      default:
        return <Home size={16} className="text-blue-400" />;
    }
  };

  const isIncome = transaction.type === 'income';

  return (
    <button
      onClick={() => onSelect(transaction)}
      className="w-full flex items-center justify-between p-3 rounded-2xl bg-slate-900/40 hover:bg-slate-900/80 active:bg-slate-800/80 border border-slate-800/50 hover:border-slate-700/60 transition-all text-left group min-h-[58px]"
    >
      <div className="flex items-center gap-3 min-w-0">
        {/* Category Icon Container */}
        <div className="w-10 h-10 rounded-xl bg-slate-800/80 border border-slate-700/60 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
          {getCategoryIcon(transaction.category)}
        </div>

        {/* Merchant & Category */}
        <div className="min-w-0">
          <div className="flex items-center gap-1.5">
            <h4 className="text-xs font-semibold text-white truncate max-w-[170px]">
              {transaction.title}
            </h4>
            {transaction.isTaxDeductible && (
              <span className="text-[9px] font-mono text-emerald-400 bg-emerald-500/10 px-1 py-0.5 rounded border border-emerald-500/20">
                Tax Ded.
              </span>
            )}
          </div>
          <p className="text-[10px] text-slate-400 mt-0.5 truncate flex items-center gap-1.5">
            <span>{transaction.category}</span>
            <span>·</span>
            <span className="font-mono">{formatDate(transaction.date)}</span>
          </p>
        </div>
      </div>

      {/* Amount & Type */}
      <div className="text-right shrink-0 pl-2">
        <span
          className={`text-xs font-bold font-mono block ${
            isIncome ? 'text-emerald-400' : 'text-slate-100'
          }`}
        >
          {privacyMode
            ? '••••'
            : `${isIncome ? '+' : '-'}${formatCurrency(transaction.amount, currency)}`}
        </span>
        <span className="text-[9px] text-slate-500 font-mono block truncate max-w-[90px]">
          {transaction.account.split('(')[0]}
        </span>
      </div>
    </button>
  );
};
