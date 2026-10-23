import React, { useState, useEffect } from 'react';
import { Smartphone, Monitor, Wifi, BatteryMedium, Sparkles, Lock, Download, Maximize2 } from 'lucide-react';

interface DeviceFrameProps {
  children: React.ReactNode;
  activeScreenName?: string;
  onOpenGuide?: () => void;
  onLockApp?: () => void;
  onOpenInstall?: () => void;
}

export type DeviceMode = 'iphone' | 'pixel' | 'responsive' | 'fullscreen';

export const DeviceFrame: React.FC<DeviceFrameProps> = ({
  children,
  activeScreenName,
  onOpenGuide,
  onLockApp,
  onOpenInstall,
}) => {
  const [deviceMode, setDeviceMode] = useState<DeviceMode>('iphone');
  const [time, setTime] = useState<string>('9:41');
  const [isMobileScreen, setIsMobileScreen] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    const isSmall = window.innerWidth < 768;
    const isStandalone =
      window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as unknown as { standalone?: boolean }).standalone === true;
    const isMobileUA = /android|iphone|ipad|ipod/i.test(navigator.userAgent);
    return isSmall || isStandalone || isMobileUA;
  });

  useEffect(() => {
    const checkMobile = () => {
      const isSmall = window.innerWidth < 768;
      const isStandalone =
        window.matchMedia('(display-mode: standalone)').matches ||
        (window.navigator as unknown as { standalone?: boolean }).standalone === true;
      const isMobileUA = /android|iphone|ipad|ipod/i.test(navigator.userAgent);
      setIsMobileScreen(isSmall || isStandalone || isMobileUA);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: false })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, []);

  // When viewed on real mobile devices or when running in standalone installed PWA mode,
  // do NOT wrap in a simulated frame. Fill 100% of the screen seamlessly.
  if (isMobileScreen || deviceMode === 'fullscreen') {
    return (
      <div className="w-full h-[100dvh] flex flex-col overflow-hidden bg-slate-950 text-slate-100 select-none">
        {/* If user on desktop explicitly chose fullscreen, show a tiny restore toggle */}
        {deviceMode === 'fullscreen' && !isMobileScreen && (
          <button
            onClick={() => setDeviceMode('iphone')}
            className="fixed top-2 right-2 z-50 p-1.5 rounded-lg bg-slate-900/90 text-slate-400 hover:text-white border border-slate-800 text-[10px] flex items-center gap-1 shadow-lg backdrop-blur-md"
            title="Exit Fullscreen Mode"
          >
            <Smartphone size={12} />
            <span>Show Device Frame</span>
          </button>
        )}
        <div className="flex-1 overflow-hidden flex flex-col relative bg-slate-950">
          {children}
        </div>
      </div>
    );
  }

  // Desktop Simulator View
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-start p-2 sm:p-4 md:p-6 selection:bg-sky-500/30 selection:text-sky-200">
      {/* Top Device & Environment Control Bar */}
      <header className="w-full max-w-4xl mx-auto flex items-center justify-between py-2 px-3 mb-3 bg-slate-900/60 border border-slate-800/80 rounded-2xl backdrop-blur-md">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-sky-600 via-indigo-600 to-cyan-400 flex items-center justify-center shadow-lg shadow-sky-500/20">
            <Sparkles size={16} className="text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold tracking-tight text-white">Aura Wealth OS</span>
              <span className="text-[10px] text-slate-400 font-mono">React Native · Expo</span>
            </div>
            {activeScreenName && (
              <span className="text-[10px] text-sky-400 font-medium">
                Route: {activeScreenName}
              </span>
            )}
          </div>
        </div>

        {/* Viewport Mode Switcher & Guide Trigger */}
        <div className="flex items-center gap-1.5 bg-slate-950/80 p-1 rounded-xl border border-slate-800">
          {onLockApp && (
            <button
              onClick={onLockApp}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold bg-indigo-500/15 text-indigo-400 hover:bg-indigo-500/25 border border-indigo-500/30 transition-all shadow-sm"
              title="Test Background Biometric Lock (Face ID / Fingerprint)"
            >
              <Lock size={12} />
              <span className="hidden sm:inline">Lock App</span>
            </button>
          )}

          {onOpenInstall && (
            <button
              onClick={onOpenInstall}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold bg-emerald-500/15 text-emerald-400 hover:bg-emerald-500/25 border border-emerald-500/30 transition-all shadow-sm"
              title="Install App on Phone"
            >
              <Download size={12} />
              <span className="hidden sm:inline">Install Setup</span>
            </button>
          )}

          {onOpenGuide && (
            <button
              onClick={onOpenGuide}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold bg-sky-500/15 text-sky-400 hover:bg-sky-500/25 border border-sky-500/30 transition-all shadow-sm"
              title="Expo Router & React Native Architecture Guide"
            >
              <Sparkles size={13} />
              <span className="inline">Expo Guide</span>
            </button>
          )}

          <button
            onClick={() => setDeviceMode('iphone')}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
              deviceMode === 'iphone'
                ? 'bg-sky-500 text-slate-950 font-semibold shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
            title="iPhone 16 Pro Frame"
          >
            <Smartphone size={13} />
            <span className="hidden sm:inline">iPhone 16 Pro</span>
          </button>

          <button
            onClick={() => setDeviceMode('pixel')}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
              deviceMode === 'pixel'
                ? 'bg-sky-500 text-slate-950 font-semibold shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
            title="Google Pixel 9 Frame"
          >
            <Smartphone size={13} />
            <span className="hidden sm:inline">Pixel 9</span>
          </button>

          <button
            onClick={() => setDeviceMode('responsive')}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
              deviceMode === 'responsive'
                ? 'bg-sky-500 text-slate-950 font-semibold shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
            title="Responsive Container"
          >
            <Monitor size={13} />
            <span className="hidden sm:inline">Responsive</span>
          </button>

          <button
            onClick={() => setDeviceMode('fullscreen')}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium text-slate-400 hover:text-slate-200 transition-all"
            title="Full Native Screen"
          >
            <Maximize2 size={13} />
            <span className="hidden sm:inline">Full</span>
          </button>
        </div>
      </header>

      {/* Frame Container */}
      <main className="w-full flex-1 flex items-center justify-center">
        {deviceMode === 'responsive' ? (
          <div className="w-full max-w-2xl bg-slate-950 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col h-[880px] max-h-[92vh]">
            {/* Top Status Bar */}
            <div className="h-10 bg-slate-950 px-5 flex items-center justify-between text-xs text-slate-400 shrink-0 border-b border-slate-900 select-none">
              <span className="font-semibold text-slate-200 font-mono">{time}</span>
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-slate-500 font-mono">5G</span>
                <Wifi size={13} />
                <BatteryMedium size={15} />
              </div>
            </div>
            <div className="flex-1 overflow-hidden flex flex-col relative bg-slate-950">
              {children}
            </div>
          </div>
        ) : (
          <div
            className={`relative transition-all duration-300 flex flex-col overflow-hidden bg-slate-950 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] border-4 border-slate-800 ${
              deviceMode === 'iphone'
                ? 'w-[393px] h-[835px] max-h-[90vh] rounded-[52px] ring-1 ring-slate-700/60 ring-offset-2 ring-offset-slate-950'
                : 'w-[412px] h-[850px] max-h-[90vh] rounded-[44px] ring-1 ring-slate-700/60'
            }`}
          >
            {/* Mobile Status Bar with Hardware Cutouts */}
            <div className="h-11 bg-slate-950 px-6 pt-1 flex items-center justify-between text-xs text-slate-300 shrink-0 z-40 select-none">
              <span className="font-semibold text-white tracking-tight font-mono text-[13px] pl-1">
                {time}
              </span>

              {/* Dynamic Island (iPhone) or Punch-hole (Pixel) */}
              {deviceMode === 'iphone' ? (
                <div className="w-28 h-6 bg-black rounded-full flex items-center justify-end px-2 gap-2 shadow-inner border border-slate-800/60">
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-900 border border-slate-800" />
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-950 border border-slate-800" />
                </div>
              ) : (
                <div className="w-3.5 h-3.5 rounded-full bg-black mx-auto border border-slate-800" />
              )}

              <div className="flex items-center gap-1.5 text-slate-300 pr-1">
                <span className="text-[10px] font-bold text-slate-400 font-mono">5G</span>
                <Wifi size={13} className="text-slate-300" />
                <BatteryMedium size={15} className="text-slate-300" />
              </div>
            </div>

            {/* Mobile Viewport Screen Content */}
            <div className="flex-1 overflow-hidden flex flex-col relative bg-slate-950">
              {children}
            </div>

            {/* Bottom Hardware Gesture Home Indicator */}
            <div className="h-4 bg-slate-950 flex items-center justify-center shrink-0 z-40">
              <div className="w-32 h-1 bg-slate-600/70 rounded-full" />
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
