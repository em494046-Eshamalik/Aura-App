import React, { useState, useEffect, useMemo } from 'react';
import { DeviceFrame } from './components/ui/DeviceFrame';
import { BottomTabBar, TabId } from './components/navigation/BottomTabBar';
import { SplashScreen } from './screens/SplashScreen';
import { OnboardingScreen } from './screens/OnboardingScreen';
import { SubscriptionScreen } from './screens/SubscriptionScreen';
import { HomeScreen } from './screens/HomeScreen';
import { TransactionsScreen } from './screens/TransactionsScreen';
import { InsightsScreen } from './screens/InsightsScreen';
import { ProfileScreen } from './screens/ProfileScreen';
import { AddTransactionModal } from './components/transactions/AddTransactionModal';
import { TransactionDetailModal } from './components/transactions/TransactionDetailModal';
import { AIConsultantSheet } from './components/insights/AIConsultantSheet';
import { ExpoGoGuideModal } from './components/profile/ExpoGoGuideModal';
import { ExpoRouterGuideModal } from './components/tutorial/ExpoRouterGuideModal';
import { BiometricLockOverlay } from './components/security/BiometricLockOverlay';
import { EditProfileModal } from './components/profile/EditProfileModal';
import { InstallAppModal } from './components/ui/InstallAppModal';
import { PWAInstallBanner } from './components/ui/PWAInstallBanner';

import { storageService } from './services/storage';
import { computeCashFlow, exportTransactionsCsv } from './utils/formatters';
import { 
  Transaction, 
  UserProfile, 
  BudgetCategory, 
  FinancialInsight, 
  SubscriptionPlan 
} from './types/finance';
import { INITIAL_BUDGETS, INITIAL_INSIGHTS, INITIAL_TRANSACTIONS, INITIAL_USER_PROFILE } from './constants/demoData';

type AppRoute = 'splash' | 'onboarding' | 'subscription' | 'tabs';

export default function App() {
  const [currentRoute, setCurrentRoute] = useState<AppRoute>('splash');
  const [activeTab, setActiveTab] = useState<TabId>('home');

  // Core Data States
  const [profile, setProfile] = useState<UserProfile>(() => storageService.getProfile());
  const [transactions, setTransactions] = useState<Transaction[]>(() => storageService.getTransactions());
  const [budgets, setBudgets] = useState<BudgetCategory[]>(() => storageService.getBudgets());
  const [insights, setInsights] = useState<FinancialInsight[]>(() => storageService.getInsights());

  // Modals & Overlays
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [isAdvisorOpen, setIsAdvisorOpen] = useState(false);
  const [advisorTopic, setAdvisorTopic] = useState<string | undefined>(undefined);
  const [isExpoGuideOpen, setIsExpoGuideOpen] = useState(false);
  const [isRouterGuideOpen, setIsRouterGuideOpen] = useState(false);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [isInstallOpen, setIsInstallOpen] = useState(false);
  const [isLocked, setIsLocked] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Auto-calculated Cash Flow
  const cashFlow = useMemo(() => computeCashFlow(transactions), [transactions]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Sync state changes to storage
  const handleUpdateProfile = (updated: Partial<UserProfile>) => {
    const next = { ...profile, ...updated };
    setProfile(next);
    storageService.saveProfile(next);
  };

  // Trigger biometric lock on background-to-foreground transition
  useEffect(() => {
    let wasInBackground = false;

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        wasInBackground = true;
      } else if (document.visibilityState === 'visible') {
        if (wasInBackground && profile.biometricsEnabled && profile.lockOnBackground && currentRoute === 'tabs') {
          setIsLocked(true);
        }
        wasInBackground = false;
      }
    };

    const handleWindowBlur = () => {
      wasInBackground = true;
    };

    const handleWindowFocus = () => {
      if (wasInBackground && profile.biometricsEnabled && profile.lockOnBackground && currentRoute === 'tabs') {
        setIsLocked(true);
      }
      wasInBackground = false;
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('blur', handleWindowBlur);
    window.addEventListener('focus', handleWindowFocus);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('blur', handleWindowBlur);
      window.removeEventListener('focus', handleWindowFocus);
    };
  }, [profile.biometricsEnabled, profile.lockOnBackground, currentRoute]);

  const handleAddTransaction = (newTxData: Omit<Transaction, 'id'>) => {
    const created = storageService.addTransaction(newTxData);
    setTransactions(storageService.getTransactions());
    
    // Also update budget category spent if expense
    if (newTxData.type === 'expense') {
      const updatedBudgets = budgets.map((b) => {
        if (b.category === newTxData.category) {
          return { ...b, spent: b.spent + newTxData.amount };
        }
        return b;
      });
      setBudgets(updatedBudgets);
      storageService.saveBudgets(updatedBudgets);
    }

    showToast(`Added: ${newTxData.title}`);
  };

  const handleDeleteTransaction = (id: string) => {
    const updated = storageService.deleteTransaction(id);
    setTransactions(updated);
    showToast('Transaction removed');
  };

  const handleToggleTaxDeductible = (id: string) => {
    const updated = transactions.map((t) => {
      if (t.id === id) {
        return { ...t, isTaxDeductible: !t.isTaxDeductible };
      }
      return t;
    });
    setTransactions(updated);
    storageService.saveTransactions(updated);
    if (selectedTransaction && selectedTransaction.id === id) {
      setSelectedTransaction({
        ...selectedTransaction,
        isTaxDeductible: !selectedTransaction.isTaxDeductible,
      });
    }
  };

  const handleSelectPlan = (plan: SubscriptionPlan) => {
    handleUpdateProfile({ tier: plan.name as any });
    setCurrentRoute('tabs');
    setActiveTab('home');
    showToast(`Activated ${plan.name} Tier`);
  };

  const handleExportStatement = () => {
    exportTransactionsCsv(transactions);
    showToast('Exported CSV statement');
  };

  const handleResetData = () => {
    storageService.resetAll();
    setProfile(INITIAL_USER_PROFILE);
    setTransactions(INITIAL_TRANSACTIONS);
    setBudgets(INITIAL_BUDGETS);
    setInsights(INITIAL_INSIGHTS);
    showToast('Reset to default portfolio');
  };

  const handleOpenAdvisor = (topic?: string) => {
    setAdvisorTopic(topic);
    setIsAdvisorOpen(true);
  };

  // Compute active screen display label
  const activeScreenName = useMemo(() => {
    if (currentRoute === 'splash') return 'Splash (Initial)';
    if (currentRoute === 'onboarding') return 'Onboarding';
    if (currentRoute === 'subscription') return 'Subscription Plans';
    if (currentRoute === 'tabs') {
      switch (activeTab) {
        case 'home':
          return 'Tabs / Home Dashboard';
        case 'transactions':
          return 'Tabs / Transactions';
        case 'insights':
          return 'Tabs / AI Insights';
        case 'profile':
          return 'Tabs / Settings';
      }
    }
    return 'Home';
  }, [currentRoute, activeTab]);

  return (
    <DeviceFrame 
      activeScreenName={activeScreenName}
      onOpenGuide={() => setIsRouterGuideOpen(true)}
      onLockApp={() => setIsLocked(true)}
      onOpenInstall={() => setIsInstallOpen(true)}
    >
      <div className="flex-1 flex flex-col h-full bg-slate-950 relative overflow-hidden">
        {/* Mobile PWA Install Banner (Triggers Chrome / Safari Install) */}
        <PWAInstallBanner onOpenGuide={() => setIsInstallOpen(true)} />

        {/* Floating Quick Flow Navigator for Easy Navigation */}
        <div className="bg-slate-900/90 border-b border-slate-800/80 px-2 sm:px-3 py-1 flex items-center justify-between text-[11px] shrink-0 z-30">
          <div className="flex items-center gap-1 overflow-x-auto no-scrollbar py-0.5">
            <span className="text-slate-500 font-medium text-[10px] hidden sm:inline">Screen:</span>
            <button
              onClick={() => setCurrentRoute('splash')}
              className={`px-2 py-0.5 rounded text-[10px] transition-colors shrink-0 ${
                currentRoute === 'splash' ? 'bg-sky-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              Splash
            </button>
            <button
              onClick={() => setCurrentRoute('onboarding')}
              className={`px-2 py-0.5 rounded text-[10px] transition-colors shrink-0 ${
                currentRoute === 'onboarding' ? 'bg-sky-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              Onboard
            </button>
            <button
              onClick={() => setCurrentRoute('subscription')}
              className={`px-2 py-0.5 rounded text-[10px] transition-colors shrink-0 ${
                currentRoute === 'subscription' ? 'bg-sky-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              Plans
            </button>
            <button
              onClick={() => {
                setCurrentRoute('tabs');
                setActiveTab('home');
              }}
              className={`px-2 py-0.5 rounded text-[10px] transition-colors shrink-0 ${
                currentRoute === 'tabs' ? 'bg-sky-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              App Tabs
            </button>
          </div>

          <div className="flex items-center gap-1 shrink-0 ml-1">
            <button
              onClick={() => setIsInstallOpen(true)}
              className="px-2 py-0.5 rounded text-[10px] bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 border border-emerald-500/40 transition-colors font-bold flex items-center gap-1"
            >
              <span>انسٹال (Install)</span>
            </button>
            <button
              onClick={() => setIsRouterGuideOpen(true)}
              className="px-2 py-0.5 rounded text-[10px] bg-sky-500/15 text-sky-400 hover:bg-sky-500/25 border border-sky-500/30 transition-colors font-medium hidden sm:inline"
            >
              Expo Guide
            </button>
          </div>
        </div>

        {/* Global Toast Notification */}
        {toastMessage && (
          <div className="absolute top-10 left-4 right-4 z-50 p-2.5 rounded-xl bg-slate-900/95 border border-sky-400/50 shadow-2xl text-xs text-sky-200 text-center font-medium animate-fade-in backdrop-blur-md">
            {toastMessage}
          </div>
        )}

        {/* Screen Routing Switch */}
        {currentRoute === 'splash' && (
          <SplashScreen onComplete={() => setCurrentRoute('onboarding')} />
        )}

        {currentRoute === 'onboarding' && (
          <OnboardingScreen
            onGetStarted={() => setCurrentRoute('subscription')}
            onSignIn={() => {
              setCurrentRoute('tabs');
              setActiveTab('home');
            }}
            onOpenInstall={() => setIsInstallOpen(true)}
          />
        )}

        {currentRoute === 'subscription' && (
          <SubscriptionScreen
            currentTier={profile.tier}
            onSelectPlan={handleSelectPlan}
            onBack={() => setCurrentRoute('onboarding')}
          />
        )}

        {currentRoute === 'tabs' && (
          <div className="flex-1 flex flex-col overflow-hidden">
            <div className="flex-1 overflow-hidden flex flex-col">
              {activeTab === 'home' && (
                <HomeScreen
                  profile={profile}
                  transactions={transactions}
                  budgets={budgets}
                  insights={insights}
                  cashFlow={cashFlow}
                  onOpenAddModal={() => setIsAddModalOpen(true)}
                  onSelectTransaction={(tx) => setSelectedTransaction(tx)}
                  onViewAllTransactions={() => setActiveTab('transactions')}
                  onOpenAI={handleOpenAdvisor}
                  onExport={handleExportStatement}
                  onTogglePrivacy={() => handleUpdateProfile({ privacyMode: !profile.privacyMode })}
                  onOpenProfile={() => setActiveTab('profile')}
                  onOpenEditProfile={() => setIsEditProfileOpen(true)}
                  onOpenInstall={() => setIsInstallOpen(true)}
                  onLockApp={() => setIsLocked(true)}
                />
              )}

              {activeTab === 'transactions' && (
                <TransactionsScreen
                  transactions={transactions}
                  currency={profile.currency}
                  privacyMode={profile.privacyMode}
                  onOpenAddModal={() => setIsAddModalOpen(true)}
                  onSelectTransaction={(tx) => setSelectedTransaction(tx)}
                />
              )}

              {activeTab === 'insights' && (
                <InsightsScreen
                  transactions={transactions}
                  budgets={budgets}
                  profile={profile}
                  insights={insights}
                  onOpenAdvisor={handleOpenAdvisor}
                />
              )}

              {activeTab === 'profile' && (
                <ProfileScreen
                  profile={profile}
                  onUpdateProfile={handleUpdateProfile}
                  onOpenSubscription={() => setCurrentRoute('subscription')}
                  onOpenExpoGuide={() => setIsExpoGuideOpen(true)}
                  onOpenEditProfile={() => setIsEditProfileOpen(true)}
                  onOpenInstall={() => setIsInstallOpen(true)}
                  onLockApp={() => setIsLocked(true)}
                  onExport={handleExportStatement}
                  onResetData={handleResetData}
                />
              )}
            </div>

            {/* Custom Bottom Tab Bar */}
            <BottomTabBar
              activeTab={activeTab}
              onSelectTab={(tab) => setActiveTab(tab)}
              transactionsBadgeCount={transactions.length}
            />
          </div>
        )}

        {/* Modal: Add New Transaction */}
        <AddTransactionModal
          isOpen={isAddModalOpen}
          currency={profile.currency}
          onClose={() => setIsAddModalOpen(false)}
          onAdd={handleAddTransaction}
        />

        {/* Modal: Transaction Details */}
        <TransactionDetailModal
          transaction={selectedTransaction}
          currency={profile.currency}
          onClose={() => setSelectedTransaction(null)}
          onDelete={handleDeleteTransaction}
          onToggleTaxDeductible={handleToggleTaxDeductible}
        />

        {/* Modal: AI Consultant Sheet */}
        <AIConsultantSheet
          isOpen={isAdvisorOpen}
          initialTopic={advisorTopic}
          transactions={transactions}
          budgets={budgets}
          profile={profile}
          onClose={() => {
            setIsAdvisorOpen(false);
            setAdvisorTopic(undefined);
          }}
        />

        {/* Modal: Expo Go Mobile Testing Guide */}
        <ExpoGoGuideModal
          isOpen={isExpoGuideOpen}
          onClose={() => setIsExpoGuideOpen(false)}
        />

        {/* Modal: Expo Router & Build Your First Mobile App Architecture Guide */}
        <ExpoRouterGuideModal
          isOpen={isRouterGuideOpen}
          onClose={() => setIsRouterGuideOpen(false)}
        />

        {/* Modal: Edit Profile / Add Your Information */}
        <EditProfileModal
          isOpen={isEditProfileOpen}
          profile={profile}
          onClose={() => setIsEditProfileOpen(false)}
          onSave={handleUpdateProfile}
        />

        {/* Modal: Install App on Phone / Desktop */}
        <InstallAppModal
          isOpen={isInstallOpen}
          onClose={() => setIsInstallOpen(false)}
        />

        {/* Biometric Security Overlay (Face ID / Fingerprint / PIN) */}
        <BiometricLockOverlay
          isLocked={isLocked}
          profile={profile}
          onUnlock={() => setIsLocked(false)}
        />
      </div>
    </DeviceFrame>
  );
}
