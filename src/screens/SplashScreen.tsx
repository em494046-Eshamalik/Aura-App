import React, { useEffect, useState } from 'react';
import { Sparkles, Shield, ChevronRight } from 'lucide-react';

interface SplashScreenProps {
  onComplete: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 400);
          return 100;
        }
        return prev + 25;
      });
    }, 180);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div className="relative flex-1 flex flex-col items-center justify-between p-6 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white select-none">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top empty spacer */}
      <div className="w-full flex justify-end pt-2">
        <button
          onClick={onComplete}
          className="text-xs text-slate-400 hover:text-slate-200 transition-colors flex items-center gap-1 min-h-[36px] px-2"
        >
          <span>Skip</span>
          <ChevronRight size={13} />
        </button>
      </div>

      {/* Center Logo & Branding */}
      <div className="flex flex-col items-center text-center -mt-8">
        <div className="relative w-24 h-24 mb-6">
          {/* Pulsing ring */}
          <div className="absolute inset-0 rounded-3xl bg-sky-500/20 blur-xl animate-pulse-subtle" />
          
          <div className="relative w-full h-full rounded-3xl bg-gradient-to-tr from-slate-900 via-slate-800 to-sky-900/60 border border-sky-400/30 flex items-center justify-center shadow-2xl shadow-sky-500/20">
            <Sparkles size={42} className="text-sky-400 drop-shadow-[0_0_12px_rgba(56,189,248,0.7)]" />
          </div>
        </div>

        <h1 className="text-2xl font-extrabold tracking-tight text-white mb-1.5 bg-gradient-to-r from-white via-slate-200 to-sky-200 bg-clip-text text-transparent">
          Aura Wealth OS
        </h1>
        <p className="text-xs text-slate-400 font-medium tracking-wide">
          Private AI Financial Intelligence
        </p>

        {/* Security badge */}
        <div className="flex items-center gap-1.5 mt-5 text-[10px] text-slate-400 bg-slate-900/80 px-3 py-1 rounded-full border border-slate-800">
          <Shield size={11} className="text-sky-400" />
          <span>Biometric & 256-Bit Vault Protected</span>
        </div>
      </div>

      {/* Bottom Progress Bar & Version */}
      <div className="w-full max-w-xs flex flex-col items-center pb-6">
        <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden mb-2">
          <div
            className="h-full bg-gradient-to-r from-sky-500 to-cyan-300 transition-all duration-200 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex items-center justify-between w-full text-[10px] text-slate-400 font-mono">
          <span>Initializing Portfolio</span>
          <span>{progress}%</span>
        </div>
      </div>
    </div>
  );
};
