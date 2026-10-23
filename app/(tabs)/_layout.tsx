import React from 'react';
import { BottomTabBar, TabId } from '../../src/components/navigation/BottomTabBar';

export default function TabsLayout({
  activeTab = 'home',
  onSelectTab,
  children,
}: {
  activeTab?: TabId;
  onSelectTab?: (tab: TabId) => void;
  children?: React.ReactNode;
}) {
  return (
    <div className="flex-1 flex flex-col h-full bg-slate-950 text-white overflow-hidden">
      <div className="flex-1 overflow-hidden flex flex-col">
        {children}
      </div>
      {onSelectTab && (
        <BottomTabBar activeTab={activeTab} onSelectTab={onSelectTab} />
      )}
    </div>
  );
}
