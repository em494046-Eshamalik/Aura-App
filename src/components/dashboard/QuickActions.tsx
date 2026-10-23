import React from 'react';
import { Plus, Send, Sparkles, Download } from 'lucide-react';

interface QuickActionsProps {
  onAddTransaction: () => void;
  onSendMoney: () => void;
  onOpenAI: () => void;
  onExport: () => void;
}

export const QuickActions: React.FC<QuickActionsProps> = ({
  onAddTransaction,
  onSendMoney,
  onOpenAI,
  onExport,
}) => {
  const actions = [
    {
      id: 'add',
      label: 'Add Entry',
      icon: Plus,
      onClick: onAddTransaction,
      color: 'bg-sky-500/10 text-sky-400 border-sky-500/20 hover:bg-sky-500/20',
    },
    {
      id: 'send',
      label: 'Transfer',
      icon: Send,
      onClick: onSendMoney,
      color: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20 hover:bg-indigo-500/20',
    },
    {
      id: 'ai',
      label: 'AI Copilot',
      icon: Sparkles,
      onClick: onOpenAI,
      color: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20 hover:bg-cyan-500/20',
    },
    {
      id: 'export',
      label: 'Statement',
      icon: Download,
      onClick: onExport,
      color: 'bg-slate-800/60 text-slate-300 border-slate-700/60 hover:bg-slate-800',
    },
  ];

  return (
    <div className="grid grid-cols-4 gap-2.5 py-1">
      {actions.map(action => {
        const Icon = action.icon;
        return (
          <button
            key={action.id}
            onClick={action.onClick}
            className="flex flex-col items-center justify-center p-2.5 rounded-2xl bg-slate-900/60 border border-slate-800/80 active:scale-95 transition-all group min-h-[58px]"
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center border transition-all mb-1.5 ${action.color}`}>
              <Icon size={18} className="transition-transform group-hover:scale-110" />
            </div>
            <span className="text-[11px] font-medium text-slate-300 tracking-tight">
              {action.label}
            </span>
          </button>
        );
      })}
    </div>
  );
};
