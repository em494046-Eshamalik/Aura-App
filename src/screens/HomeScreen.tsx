import React, { useState } from 'react';
import { Bell, ArrowRight, ShieldCheck, ChevronRight, Lock, Download, Edit3, UserCheck, Sparkles } from 'lucide-react';
import { Transaction, UserProfile, BudgetCategory, FinancialInsight, CashFlowSummary } from '../types/finance';
import { FinancialCardCarousel } from '../components/dashboard/FinancialCardCarousel';
import { CashFlowSummaryCard } from '../components/dashboard/CashFlowSummaryCard';
import { QuickActions } from '../components/dashboard/QuickActions';
import { AIInsightWidget } from '../components/dashboard/AIInsightWidget';
import { TransactionItem } from '../components/transactions/TransactionItem';

interface HomeScreenProps {
  profile: UserProfile;
  transactions: Transaction[];
  budgets: BudgetCategory[];
  insights: FinancialInsight[];
  cashFlow: CashFlowSummary;
  onOpenAddModal: () => void;
  onSelectTransaction: (tx: Transaction) => void;
  onViewAllTransactions: () => void;
  onOpenAI: (topic?: string) => void;
  onExport: () => void;
  onTogglePrivacy: () => void;
  onOpenProfile: () => void;
  onOpenEditProfile: () => void;
  onOpenInstall: () => void;
  onLockApp: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  profile,
  transactions,
  budgets,
  insights,
  cashFlow,
  onOpenAddModal,
  onSelectTransaction,
  onViewAllTransactions,
  onOpenAI,
  onExport,
  onTogglePrivacy,
  onOpenProfile,
  onOpenEditProfile,
  onOpenInstall,
  onLockApp,
}) => {
  const [showNotificationToast, setShowNotificationToast] = useState(false);
  const recentTransactions = transactions.slice(0, 4);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const handleNotificationClick = () => {
    setShowNotificationToast(true);
    setTimeout(() => setShowNotificationToast(false), 3000);
  };

  return (
    <div className="flex-1 overflow-y-auto no-scrollbar p-4 space-y-4 bg-slate-950 text-white select-none">
      {/* Top Profile & Header Bar */}
      <div className="flex items-center justify-between pt-1">
        <div className="flex items-center gap-2.5">
          <button
            onClick={onOpenEditProfile}
            className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-sky-400/80 shadow-md group shrink-0"
            title="Click to edit your personal information"
          >
            <img
              src={profile.avatar}
              alt={profile.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform"
              referrerPolicy="no-referrer"
            />
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-sky-500 rounded-full border border-slate-950 flex items-center justify-center">
              <Edit3 size={7} className="text-slate-950" />
            </span>
          </button>

          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] text-slate-400 font-medium">
                {getGreeting()},
              </span>
              <button
                onClick={onOpenEditProfile}
                className="text-[9px] text-sky-400 hover:underline font-mono"
              >
                (Edit Info)
              </button>
            </div>
            <div className="flex items-center gap-1.5">
              <span 
                onClick={onOpenEditProfile}
                className="text-sm font-bold text-white hover:text-sky-400 transition-colors cursor-pointer truncate max-w-[120px]"
              >
                {profile.name.split(' ')[0]}
              </span>
              <span className="text-[9px] font-semibold text-sky-400 bg-sky-500/10 border border-sky-500/20 px-1.5 py-0.2 rounded-md font-mono">
                {profile.tier}
              </span>
            </div>
          </div>
        </div>

        {/* Action Controls: Lock Screen, Install App, Notifications */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={onLockApp}
            className="w-8 h-8 rounded-xl bg-slate-900 border border-slate-800 hover:border-sky-500/60 flex items-center justify-center text-slate-300 hover:text-sky-400 transition-colors"
            title="Lock App with Biometrics (Face ID / Fingerprint)"
          >
            <Lock size={14} className="text-sky-400" />
          </button>

          <button
            onClick={onOpenInstall}
            className="w-8 h-8 rounded-xl bg-slate-900 border border-slate-800 hover:border-sky-500/60 flex items-center justify-center text-slate-300 hover:text-white transition-colors"
            title="Install App on Phone"
          >
            <Download size={14} />
          </button>

          <div className="relative">
            <button
              onClick={handleNotificationClick}
              className="w-8 h-8 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 flex items-center justify-center text-slate-300 relative transition-colors"
              title="Notifications"
            >
              <Bell size={14} />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-sky-400" />
            </button>

            {showNotificationToast && (
              <div className="absolute right-0 top-10 w-60 p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-slate-200 shadow-2xl z-40 animate-fade-in">
                <p className="font-semibold text-sky-400 mb-0.5">Automated Sweep Complete</p>
                <p className="text-[11px] text-slate-300">
                  $450.00 was swept into your 5.2% APY Vault for optimal compounding yield.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Virtual Card Carousel */}
      <FinancialCardCarousel
        balance={cashFlow.totalBalance}
        currency={profile.currency}
        privacyMode={profile.privacyMode}
        onTogglePrivacy={onTogglePrivacy}
      />

      {/* Quick Action Buttons */}
      <QuickActions
        onAddTransaction={onOpenAddModal}
        onSendMoney={() => onOpenAI('Send money transfer simulation')}
        onOpenAI={() => onOpenAI()}
        onExport={onExport}
      />

      {/* Cash Flow Summary Card */}
      <CashFlowSummaryCard
        cashFlow={cashFlow}
        currency={profile.currency}
        privacyMode={profile.privacyMode}
      />

      {/* AI Financial Insights Section */}
      <div className="space-y-1.5">
        <AIInsightWidget
          insights={insights}
          onOpenAdvisor={(topic) => onOpenAI(topic)}
        />
      </div>

      {/* Recent Transactions List */}
      <div className="space-y-2 pt-1">
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-2">
            <h3 className="text-xs font-bold text-white tracking-tight">Recent Activity</h3>
            <span className="text-[10px] text-slate-400 font-mono">({transactions.length})</span>
          </div>

          <button
            onClick={onViewAllTransactions}
            className="text-xs text-sky-400 hover:text-sky-300 font-medium flex items-center gap-0.5"
          >
            <span>See All</span>
            <ChevronRight size={13} />
          </button>
        </div>

        <div className="space-y-2">
          {recentTransactions.map((tx) => (
            <TransactionItem
              key={tx.id}
              transaction={tx}
              currency={profile.currency}
              privacyMode={profile.privacyMode}
              onSelect={onSelectTransaction}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
