import React from 'react';
import { LayoutDashboard, ArrowLeftRight, TrendingUp, User } from 'lucide-react';

export type TabId = 'home' | 'transactions' | 'insights' | 'profile';

interface BottomTabBarProps {
  activeTab: TabId;
  onSelectTab: (tab: TabId) => void;
  transactionsBadgeCount?: number;
}

export const BottomTabBar: React.FC<BottomTabBarProps> = ({
  activeTab,
  onSelectTab,
  transactionsBadgeCount,
}) => {
  const tabs = [
    {
      id: 'home' as TabId,
      label: 'Home',
      icon: LayoutDashboard,
    },
    {
      id: 'transactions' as TabId,
      label: 'Activity',
      icon: ArrowLeftRight,
      badge: transactionsBadgeCount,
    },
    {
      id: 'insights' as TabId,
      label: 'Insights',
      icon: TrendingUp,
    },
    {
      id: 'profile' as TabId,
      label: 'Settings',
      icon: User,
    },
  ];

  return (
    <nav 
      aria-label="Mobile Navigation"
      className="shrink-0 bg-slate-950/95 backdrop-blur-xl border-t border-slate-800/80 px-3 pt-2 pb-5 z-30"
    >
      <div className="flex items-center justify-around max-w-md mx-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => onSelectTab(tab.id)}
              className={`relative flex flex-col items-center justify-center min-w-[56px] min-h-[44px] py-1 px-2 rounded-xl transition-all duration-200 ${
                isActive
                  ? 'text-sky-400 font-medium'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {/* Active Tab Ambient Pill Glow */}
              {isActive && (
                <span className="absolute inset-x-2 -top-2 h-0.5 bg-gradient-to-r from-transparent via-sky-400 to-transparent rounded-full shadow-[0_0_8px_#38bdf8]" />
              )}

              <div className="relative">
                <Icon
                  size={20}
                  className={`transition-transform duration-200 ${
                    isActive ? 'scale-110 stroke-[2.4px]' : 'stroke-[1.8px]'
                  }`}
                />
                {tab.badge && tab.badge > 0 ? (
                  <span className="absolute -top-1.5 -right-2.5 min-w-[16px] h-4 bg-sky-500 text-slate-950 text-[10px] font-bold rounded-full flex items-center justify-center px-1">
                    {tab.badge}
                  </span>
                ) : null}
              </div>

              <span className={`text-[10px] mt-1 tracking-tight transition-colors ${
                isActive ? 'text-sky-400 font-semibold' : 'text-slate-400'
              }`}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
