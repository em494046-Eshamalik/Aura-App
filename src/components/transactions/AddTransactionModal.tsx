import React, { useState } from 'react';
import { X, Plus, DollarSign, Calendar, Tag, CreditCard, Check } from 'lucide-react';
import { TransactionCategory, TransactionType, SupportedCurrency } from '../../types/finance';

interface AddTransactionModalProps {
  isOpen: boolean;
  currency: SupportedCurrency;
  onClose: () => void;
  onAdd: (tx: {
    title: string;
    merchant: string;
    category: TransactionCategory;
    amount: number;
    type: TransactionType;
    date: string;
    account: string;
    note?: string;
    isTaxDeductible?: boolean;
  }) => void;
}

const CATEGORIES: TransactionCategory[] = [
  'Dining & Food',
  'Groceries',
  'Technology',
  'Transportation',
  'Health & Wellness',
  'Entertainment',
  'Salary',
  'Investment',
  'Utilities',
  'Housing',
  'Freelance',
];

const ACCOUNTS = [
  'Titanium Card (*4821)',
  'Primary Checking (*1092)',
  'High-Yield Wealth (*9904)',
];

export const AddTransactionModal: React.FC<AddTransactionModalProps> = ({
  isOpen,
  currency,
  onClose,
  onAdd,
}) => {
  const [title, setTitle] = useState('');
  const [amountStr, setAmountStr] = useState('');
  const [type, setType] = useState<TransactionType>('expense');
  const [category, setCategory] = useState<TransactionCategory>('Dining & Food');
  const [account, setAccount] = useState(ACCOUNTS[0]);
  const [note, setNote] = useState('');
  const [isTaxDeductible, setIsTaxDeductible] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsedAmount = parseFloat(amountStr);

    if (!title.trim()) {
      setError('Please provide a title or merchant name.');
      return;
    }

    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      setError('Please enter a valid positive amount.');
      return;
    }

    onAdd({
      title: title.trim(),
      merchant: title.trim(),
      category,
      amount: parsedAmount,
      type,
      date: new Date().toISOString().split('T')[0],
      account,
      note: note.trim() || undefined,
      isTaxDeductible,
    });

    onClose();
  };

  return (
    <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex flex-col justify-end p-3 animate-fade-in">
      <div 
        className="w-full bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-2xl max-h-[90%] overflow-y-auto no-scrollbar"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-10 h-1 bg-slate-700 rounded-full mx-auto mb-4" />

        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
            <Plus size={16} className="text-sky-400" />
            <span>New Financial Entry</span>
          </h3>

          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-300"
          >
            <X size={15} />
          </button>
        </div>

        {error && (
          <div className="mt-2.5 p-2 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3.5 mt-3">
          {/* Income vs Expense Toggle */}
          <div className="grid grid-cols-2 gap-2 p-1 bg-slate-950 rounded-xl border border-slate-800">
            <button
              type="button"
              onClick={() => setType('expense')}
              className={`py-1.5 text-xs font-semibold rounded-lg transition-all ${
                type === 'expense'
                  ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Expense (-)
            </button>
            <button
              type="button"
              onClick={() => setType('income')}
              className={`py-1.5 text-xs font-semibold rounded-lg transition-all ${
                type === 'income'
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Income (+)
            </button>
          </div>

          {/* Amount input */}
          <div>
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
              Amount ({currency})
            </label>
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-slate-400 font-mono text-sm">$</span>
              <input
                type="number"
                step="0.01"
                placeholder="0.00"
                value={amountStr}
                onChange={(e) => setAmountStr(e.target.value)}
                autoFocus
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-8 pr-3 py-2 text-white font-mono text-base font-bold focus:outline-none focus:border-sky-500"
              />
            </div>
          </div>

          {/* Title / Merchant */}
          <div>
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
              Description / Merchant
            </label>
            <input
              type="text"
              placeholder="e.g. Blue Bottle Coffee, Figma Pro"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white text-xs focus:outline-none focus:border-sky-500"
            />
          </div>

          {/* Category Dropdown */}
          <div>
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as TransactionCategory)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white text-xs focus:outline-none focus:border-sky-500 cursor-pointer"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Account selector */}
          <div>
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
              Payment Account
            </label>
            <select
              value={account}
              onChange={(e) => setAccount(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white text-xs focus:outline-none focus:border-sky-500 cursor-pointer"
            >
              {ACCOUNTS.map((acc) => (
                <option key={acc} value={acc}>
                  {acc}
                </option>
              ))}
            </select>
          </div>

          {/* Note / Memo */}
          <div>
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
              Optional Memo / Note
            </label>
            <input
              type="text"
              placeholder="e.g. Quarterly business expense"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-white text-xs focus:outline-none focus:border-sky-500"
            />
          </div>

          {/* Tax checkbox */}
          <label className="flex items-center gap-2 cursor-pointer pt-1">
            <input
              type="checkbox"
              checked={isTaxDeductible}
              onChange={(e) => setIsTaxDeductible(e.target.checked)}
              className="rounded bg-slate-950 border-slate-700 text-sky-500 focus:ring-0"
            />
            <span className="text-xs text-slate-300">Mark as Tax-Deductible Business Outflow</span>
          </label>

          {/* Buttons */}
          <div className="flex items-center gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 text-xs font-bold transition-all shadow-md shadow-sky-500/20"
            >
              Save Entry
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
