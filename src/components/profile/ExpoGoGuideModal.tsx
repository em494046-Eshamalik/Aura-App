import React, { useState } from 'react';
import { X, QrCode, Smartphone, Terminal, Check, Copy, ExternalLink } from 'lucide-react';

interface ExpoGoGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ExpoGoGuideModal: React.FC<ExpoGoGuideModalProps> = ({ isOpen, onClose }) => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  if (!isOpen) return null;

  const commands = [
    { label: '1. Install Expo CLI globally or run locally', cmd: 'npm install' },
    { label: '2. Launch Expo Dev Server with Expo Router', cmd: 'npx expo start' },
    { label: '3. Clear cache if needed', cmd: 'npx expo start -c' },
  ];

  const handleCopy = (cmd: string, idx: number) => {
    navigator.clipboard?.writeText(cmd);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="absolute inset-0 bg-slate-950/85 backdrop-blur-md z-50 flex flex-col justify-end p-3 animate-fade-in">
      <div 
        className="w-full bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-2xl max-h-[92%] overflow-y-auto no-scrollbar"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-10 h-1 bg-slate-700 rounded-full mx-auto mb-3" />

        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Smartphone size={18} className="text-sky-400" />
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">
              Testing on Mobile with Expo Go
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-300"
          >
            <X size={15} />
          </button>
        </div>

        <div className="py-3 space-y-4 text-xs text-slate-300">
          {/* Simulated QR Code */}
          <div className="flex flex-col items-center justify-center p-4 rounded-2xl bg-slate-950 border border-slate-800 text-center">
            <div className="w-36 h-36 bg-white p-2.5 rounded-xl flex items-center justify-center shadow-lg mb-2">
              {/* Clean SVG QR pattern */}
              <svg viewBox="0 0 100 100" className="w-full h-full text-slate-950 fill-current">
                <rect x="0" y="0" width="30" height="30" />
                <rect x="5" y="5" width="20" height="20" fill="white" />
                <rect x="10" y="10" width="10" height="10" />
                
                <rect x="70" y="0" width="30" height="30" />
                <rect x="75" y="5" width="20" height="20" fill="white" />
                <rect x="80" y="10" width="10" height="10" />

                <rect x="0" y="70" width="30" height="30" />
                <rect x="5" y="75" width="20" height="20" fill="white" />
                <rect x="10" y="80" width="10" height="10" />

                <rect x="35" y="10" width="10" height="10" />
                <rect x="50" y="15" width="15" height="10" />
                <rect x="35" y="35" width="30" height="30" />
                <rect x="75" y="50" width="15" height="20" />
                <rect x="40" y="75" width="20" height="15" />
                <rect x="70" y="75" width="25" height="15" />
              </svg>
            </div>
            <p className="text-[11px] font-semibold text-slate-200">
              Metro Bundler Expo QR Code
            </p>
            <p className="text-[10px] text-slate-400 mt-0.5">
              exp://192.168.1.100:8081
            </p>
          </div>

          {/* Steps */}
          <div className="space-y-2.5">
            <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800">
              <span className="font-bold text-sky-400 block mb-1">
                Step 1: Download the Expo Go App
              </span>
              <p className="text-[11px] text-slate-300">
                Install <strong className="text-white">Expo Go</strong> from the iOS App Store or Google Play Store on your physical device.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800">
              <span className="font-bold text-sky-400 block mb-1">
                Step 2: Start Development Server
              </span>
              <p className="text-[11px] text-slate-300 mb-2">
                Run the command below in your project terminal on your computer:
              </p>
              {commands.map((c, i) => (
                <div key={i} className="mb-2 last:mb-0">
                  <div className="text-[10px] text-slate-400 mb-0.5">{c.label}</div>
                  <div className="flex items-center justify-between bg-black/60 px-2.5 py-1.5 rounded-lg border border-slate-800 font-mono text-[11px] text-sky-300">
                    <code>{c.cmd}</code>
                    <button
                      onClick={() => handleCopy(c.cmd, i)}
                      className="text-slate-400 hover:text-white p-1"
                      title="Copy command"
                    >
                      {copiedIndex === i ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800">
              <span className="font-bold text-sky-400 block mb-1">
                Step 3: Scan & Connect
              </span>
              <ul className="text-[11px] text-slate-300 space-y-1 list-disc list-inside">
                <li><strong className="text-white">iOS:</strong> Open the built-in Camera app and tap the Expo banner.</li>
                <li><strong className="text-white">Android:</strong> Open Expo Go and tap "Scan QR Code".</li>
                <li>Ensure both phone and computer share the same Wi-Fi network.</li>
              </ul>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs transition-all shadow-md shadow-sky-500/20"
          >
            Got It
          </button>
        </div>
      </div>
    </div>
  );
};
