import React, { useState } from 'react';
import { Download, X, Sparkles, Smartphone } from 'lucide-react';
import { usePWAInstall } from '../../hooks/usePWAInstall';

interface PWAInstallBannerProps {
  onOpenGuide: () => void;
}

export const PWAInstallBanner: React.FC<PWAInstallBannerProps> = ({ onOpenGuide }) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [isDismissed, setIsDismissed] = useState(() => {
    return sessionStorage.getItem('aura_pwa_banner_dismissed') === 'true';
  });

  // Do not show if already installed as standalone PWA or dismissed for this session
  if (isInstalled || isDismissed) {
    return null;
  }

  const handleInstallClick = async () => {
    if (isInstallable) {
      const success = await install();
      if (!success) {
        onOpenGuide();
      }
    } else {
      // If beforeinstallprompt hasn't triggered yet or on iOS Safari, open guided install
      onOpenGuide();
    }
  };

  const handleDismiss = () => {
    setIsDismissed(true);
    sessionStorage.setItem('aura_pwa_banner_dismissed', 'true');
  };

  return (
    <div className="shrink-0 bg-gradient-to-r from-sky-950 via-slate-900 to-indigo-950 border-b border-sky-500/40 px-3 py-2 flex items-center justify-between text-xs shadow-lg shadow-sky-950/40 z-40 animate-fade-in text-white">
      <div className="flex items-center gap-2.5 min-w-0">
        <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-sky-500 to-indigo-600 p-0.5 shadow-md shadow-sky-500/20 shrink-0">
          <img 
            src="/pwa-192x192.png" 
            alt="Aura Wealth" 
            className="w-full h-full object-cover rounded-[10px]" 
            onError={(e) => {
              // fallback
              (e.currentTarget as HTMLElement).style.display = 'none';
            }}
          />
        </div>
        <div className="min-w-0">
          <div className="flex items-center gap-1.5">
            <span className="font-bold text-white text-xs truncate">Aura Wealth Mobile</span>
            <span className="text-[9px] bg-sky-500/20 text-sky-300 border border-sky-400/30 px-1 rounded font-mono font-bold">
              PWA
            </span>
          </div>
          <p className="text-[10px] text-slate-300 truncate">
            {isInstallable 
              ? 'موبائل میں انسٹال کرنے کے لیے کلک کریں' 
              : 'Add to home screen for full mobile experience'}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 shrink-0 pl-2">
        <button
          onClick={handleInstallClick}
          className="px-3 py-1.5 rounded-xl bg-sky-400 hover:bg-sky-300 active:scale-95 text-slate-950 font-extrabold text-xs flex items-center gap-1.5 shadow-md shadow-sky-400/25 transition-all"
        >
          <Download size={13} className="stroke-[2.5]" />
          <span>انسٹال کریں (Install)</span>
        </button>

        <button
          onClick={handleDismiss}
          className="w-7 h-7 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
          title="Dismiss banner"
        >
          <X size={14} />
        </button>
      </div>
    </div>
  );
};
