import React, { useState, useMemo } from 'react';
import { Search, Plus, Filter, ArrowDownUp, X, ShoppingBag } from 'lucide-react';
import { Transaction, SupportedCurrency, TransactionCategory, TransactionType } from '../types/finance';
import { TransactionItem } from '../components/transactions/TransactionItem';

interface TransactionsScreenProps {
  transactions: Transaction[];
  currency: SupportedCurrency;
  privacyMode: boolean;
  onOpenAddModal: () => void;
  onSelectTransaction: (tx: Transaction) => void;
}

const CATEGORIES: ('All' | TransactionCategory)[] = [
  'All',
  'Technology',
  'Dining & Food',
  'Groceries',
  'Transportation',
  'Investment',
  'Salary',
  'Health & Wellness',
  'Utilities',
];

export const TransactionsScreen: React.FC<TransactionsScreenProps> = ({
  transactions,
  currency,
  privacyMode,
  onOpenAddModal,
  onSelectTransaction,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<'all' | TransactionType>('all');
  const [categoryFilter, setCategoryFilter] = useState<'All' | TransactionCategory>('All');

  // Filtered transactions
  const filtered = useMemo(() => {
    return transactions.filter((t) => {
      const matchesSearch =
        t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.merchant.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.category.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesType = typeFilter === 'all' || t.type === typeFilter;
      const matchesCategory = categoryFilter === 'All' || t.category === categoryFilter;

      return matchesSearch && matchesType && matchesCategory;
    });
  }, [transactions, searchQuery, typeFilter, categoryFilter]);

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-slate-950 text-white select-none">
      {/* Top Search & Filter Bar */}
      <div className="p-4 pb-2 border-b border-slate-900 space-y-3 shrink-0">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-white tracking-tight">
            Financial Activity
          </h2>
          <button
            onClick={onOpenAddModal}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 text-xs font-bold transition-all shadow-md shadow-sky-500/20 active:scale-95"
          >
            <Plus size={15} />
            <span>Add Entry</span>
          </button>
        </div>

        {/* Search Input */}
        <div className="relative">
          <Search size={15} className="absolute left-3 top-2.5 text-slate-400" />
          <input
            type="text"
            placeholder="Search merchant, category, or note..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-8 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-500"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-2.5 text-slate-400 hover:text-white"
            >
              <X size={14} />
            </button>
          )}
        </div>

        {/* Type Toggle Tabs */}
        <div className="grid grid-cols-3 gap-1 p-1 bg-slate-900 rounded-xl border border-slate-800 text-xs font-semibold">
          <button
            onClick={() => setTypeFilter('all')}
            className={`py-1.5 rounded-lg transition-all ${
              typeFilter === 'all'
                ? 'bg-slate-800 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            All Activity
          </button>
          <button
            onClick={() => setTypeFilter('expense')}
            className={`py-1.5 rounded-lg transition-all ${
              typeFilter === 'expense'
                ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Expenses (-)
          </button>
          <button
            onClick={() => setTypeFilter('income')}
            className={`py-1.5 rounded-lg transition-all ${
              typeFilter === 'income'
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Income (+)
          </button>
        </div>

        {/* Category Horizontal Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-3 py-1 rounded-full text-[11px] whitespace-nowrap transition-all ${
                categoryFilter === cat
                  ? 'bg-sky-500 text-slate-950 font-bold shadow-sm'
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Transactions List Area */}
      <div className="flex-1 overflow-y-auto no-scrollbar p-4 space-y-2">
        {filtered.length === 0 ? (
          <div className="py-16 text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center mx-auto text-slate-500">
              <ShoppingBag size={22} />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-300">No Transactions Found</p>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Try clearing search terms or selected category filters.
              </p>
            </div>
            {(searchQuery || typeFilter !== 'all' || categoryFilter !== 'All') && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setTypeFilter('all');
                  setCategoryFilter('All');
                }}
                className="text-xs text-sky-400 font-semibold hover:underline"
              >
                Reset All Filters
              </button>
            )}
          </div>
        ) : (
          filtered.map((tx) => (
            <TransactionItem
              key={tx.id}
              transaction={tx}
              currency={currency}
              privacyMode={privacyMode}
              onSelect={onSelectTransaction}
            />
          ))
        )}
      </div>
    </div>
  );
};
