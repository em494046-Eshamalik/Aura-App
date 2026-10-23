import React, { useState } from 'react';
import { 
  X, 
  Download, 
  Smartphone, 
  CheckCircle2, 
  Share2, 
  PlusSquare, 
  Package, 
  ArrowDownCircle, 
  ExternalLink,
  ShieldCheck,
  Sparkles,
  Info
} from 'lucide-react';
import { usePWAInstall } from '../../hooks/usePWAInstall';

interface InstallAppModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InstallAppModal: React.FC<InstallAppModalProps> = ({ isOpen, onClose }) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [activeTab, setActiveTab] = useState<'pwa' | 'apk' | 'ios'>(isIOS ? 'ios' : 'pwa');
  const [installSuccess, setInstallSuccess] = useState(false);
  const [downloadStarted, setDownloadStarted] = useState(false);

  if (!isOpen) return null;

  const handle1ClickInstall = async () => {
    if (isInstallable) {
      const res = await install();
      if (res) {
        setInstallSuccess(true);
      }
    } else {
      // If prompt isn't directly triggered by Chrome policy, switch to visual guide
      setActiveTab('pwa');
    }
  };

  const handleDownloadApk = () => {
    setDownloadStarted(true);
    // Trigger download
    const link = document.createElement('a');
    link.href = '/AuraWealth.apk';
    link.download = 'AuraWealth.apk';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 bg-slate-950/85 backdrop-blur-md z-50 flex items-center justify-center p-3 sm:p-4 animate-fade-in text-white select-none">
      <div 
        className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-sky-500 via-indigo-600 to-cyan-400 flex items-center justify-center shadow-md shadow-sky-500/25">
              <Download size={18} className="text-white" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white tracking-tight">
                موبائل میں ایپ انسٹال کریں
              </h3>
              <span className="text-[11px] text-slate-400 font-medium">
                Install Aura Wealth on Your Mobile
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800/80 hover:bg-slate-700 flex items-center justify-center text-slate-300 transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="grid grid-cols-3 gap-1.5 p-1 bg-slate-950 rounded-2xl border border-slate-800/80 my-3 shrink-0 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('pwa')}
            className={`py-2 px-1 rounded-xl transition-all text-center flex flex-col items-center justify-center gap-0.5 ${
              activeTab === 'pwa'
                ? 'bg-sky-500 text-slate-950 font-bold shadow-md shadow-sky-500/20'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <span>کروم انسٹال</span>
            <span className="text-[9px] opacity-80">1-Tap Install</span>
          </button>

          <button
            onClick={() => setActiveTab('apk')}
            className={`py-2 px-1 rounded-xl transition-all text-center flex flex-col items-center justify-center gap-0.5 ${
              activeTab === 'apk'
                ? 'bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/20'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <span>APK فائل ڈاؤنلوڈ</span>
            <span className="text-[9px] opacity-80">Android Setup</span>
          </button>

          <button
            onClick={() => setActiveTab('ios')}
            className={`py-2 px-1 rounded-xl transition-all text-center flex flex-col items-center justify-center gap-0.5 ${
              activeTab === 'ios'
                ? 'bg-indigo-500 text-slate-950 font-bold shadow-md shadow-indigo-500/20'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <span>iPhone / Safari</span>
            <span className="text-[9px] opacity-80">iOS Setup</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto space-y-3.5 pr-0.5 text-xs">
          {/* TAB 1: 1-Click Mobile Chrome Install */}
          {activeTab === 'pwa' && (
            <div className="space-y-3 animate-fade-in">
              <div className="p-4 rounded-2xl bg-gradient-to-br from-sky-950/60 via-slate-950 to-indigo-950/40 border border-sky-500/30">
                <div className="flex items-center gap-2 text-sky-400 text-[11px] font-bold font-mono uppercase tracking-wider">
                  <Sparkles size={14} />
                  <span>سب سے آسان طریقہ (Direct Setup)</span>
                </div>
                <h4 className="text-sm font-bold text-white mt-1">
                  1-Click Home Screen Installation
                </h4>
                <p className="text-[11px] text-slate-300 mt-1 leading-relaxed">
                  نیچے والے بٹن پر کلک کریں۔ کروم آپ سے پوچھے گا کہ کیا آپ ایپ انسٹال کرنا چاہتے ہیں؟ <strong>Install</strong> پر کلک کرنے کے بعد ایپ کا آئیکن آپ کے فون کی اسکرین پر آ جائے گا!
                </p>

                <button
                  onClick={handle1ClickInstall}
                  disabled={isInstalled || installSuccess}
                  className={`mt-3 w-full py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-lg active:scale-95 ${
                    isInstalled || installSuccess
                      ? 'bg-emerald-500 text-slate-950 font-bold'
                      : 'bg-sky-400 hover:bg-sky-300 text-slate-950 shadow-sky-400/20'
                  }`}
                >
                  {isInstalled || installSuccess ? (
                    <>
                      <CheckCircle2 size={17} />
                      <span>ایپ انسٹال ہو چکی ہے (Installed!)</span>
                    </>
                  ) : (
                    <>
                      <Download size={17} />
                      <span>ابھی انسٹال کریں (Install to Phone)</span>
                    </>
                  )}
                </button>
              </div>

              {/* Chrome Manual 3-Dot Steps */}
              <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800/80 space-y-2">
                <div className="text-[11px] font-bold text-slate-200 flex items-center gap-1.5">
                  <Info size={13} className="text-sky-400" />
                  <span>اگر بٹن کام نہ کرے تو کروم کے مینیو سے انسٹال کریں:</span>
                </div>

                <div className="space-y-2 text-[11px] text-slate-300">
                  <div className="flex items-start gap-2 bg-slate-900/60 p-2 rounded-xl border border-slate-800">
                    <span className="w-5 h-5 rounded-full bg-sky-500/20 text-sky-400 font-bold flex items-center justify-center shrink-0 text-[10px]">
                      1
                    </span>
                    <p>
                      کروم براؤزر میں اوپر دائیں طرف <strong>تین نقطوں (⋮)</strong> کے مینیو پر ٹیپ کریں۔
                    </p>
                  </div>

                  <div className="flex items-start gap-2 bg-slate-900/60 p-2 rounded-xl border border-slate-800">
                    <span className="w-5 h-5 rounded-full bg-sky-500/20 text-sky-400 font-bold flex items-center justify-center shrink-0 text-[10px]">
                      2
                    </span>
                    <p>
                      لسٹ میں <strong>"Install app"</strong> یا <strong>"Add to Home screen"</strong> (ہوم اسکرین میں شامل کریں) پر کلک کریں۔
                    </p>
                  </div>

                  <div className="flex items-start gap-2 bg-slate-900/60 p-2 rounded-xl border border-slate-800">
                    <span className="w-5 h-5 rounded-full bg-sky-500/20 text-sky-400 font-bold flex items-center justify-center shrink-0 text-[10px]">
                      3
                    </span>
                    <p>
                      <strong>Install</strong> پر کلک کریں۔ ایپ کا لوگو آپ کے موبائل کی ہوم اسکرین پر آ جائے گا۔
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Direct APK Download */}
          {activeTab === 'apk' && (
            <div className="space-y-3 animate-fade-in">
              <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-950/60 via-slate-950 to-slate-900 border border-emerald-500/30">
                <div className="flex items-center gap-2 text-emerald-400 text-[11px] font-bold font-mono uppercase tracking-wider">
                  <Package size={14} />
                  <span>اینڈرائیڈ سیٹ اپ فائل (Android APK Package)</span>
                </div>
                <h4 className="text-sm font-bold text-white mt-1">
                  AuraWealth.apk Setup File
                </h4>
                <p className="text-[11px] text-slate-300 mt-1 leading-relaxed">
                  اگر آپ اپنے موبائل میں براہِ راست APK سیٹ اپ انسٹال کرنا چاہتے ہیں تو یہ فائل ڈاؤنلوڈ کریں۔
                </p>

                <div className="mt-3 p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between text-[11px]">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                      <Package size={15} />
                    </div>
                    <div>
                      <div className="font-bold text-white">AuraWealth.apk</div>
                      <div className="text-[10px] text-slate-400">سائز: 29 KB · Version 1.0.0</div>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded-full border border-emerald-500/20">
                    Ready
                  </span>
                </div>

                <button
                  onClick={handleDownloadApk}
                  className="mt-3 w-full py-3 rounded-xl font-bold text-xs bg-emerald-500 hover:bg-emerald-400 text-slate-950 flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-500/20 active:scale-95"
                >
                  <ArrowDownCircle size={17} />
                  <span>APK فائل ڈاؤنلوڈ کریں (Download APK)</span>
                </button>

                {downloadStarted && (
                  <div className="mt-2.5 p-2 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-[11px] text-emerald-300 flex items-center gap-1.5">
                    <CheckCircle2 size={14} className="shrink-0" />
                    <span>فائل ڈاؤنلوڈ ہو رہی ہے۔ اپنے موبائل کے Downloads فولڈر میں جا کر انسٹال کریں۔</span>
                  </div>
                )}
              </div>

              {/* APK Install Steps */}
              <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
                <div className="text-[11px] font-bold text-slate-200">
                  APK انسٹال کرنے کا طریقہ (3 آسان قدم):
                </div>
                <div className="space-y-1.5 text-[11px] text-slate-300">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold flex items-center justify-center shrink-0 text-[10px]">
                      1
                    </span>
                    <span>اوپر والا سبز بٹن دبا کر APK ڈاؤنلوڈ کریں۔</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold flex items-center justify-center shrink-0 text-[10px]">
                      2
                    </span>
                    <span>نوٹیفکیشن یا فون کے <strong>Files / Downloads</strong> میں فائل پر ٹیپ کریں۔</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold flex items-center justify-center shrink-0 text-[10px]">
                      3
                    </span>
                    <span><strong>Install</strong> دبائیں۔ ایپ کا آئیکن آپ کی ایپس میں شامل ہو جائے گا۔</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: iPhone / Safari */}
          {activeTab === 'ios' && (
            <div className="space-y-3 animate-fade-in">
              <div className="p-4 rounded-2xl bg-gradient-to-br from-indigo-950/60 via-slate-950 to-slate-900 border border-indigo-500/30">
                <div className="flex items-center gap-2 text-indigo-400 text-[11px] font-bold font-mono uppercase tracking-wider">
                  <Smartphone size={14} />
                  <span>آئی فون پر انسٹالیشن (Apple iOS)</span>
                </div>
                <h4 className="text-sm font-bold text-white mt-1">
                  iPhone Safari Setup
                </h4>
                <p className="text-[11px] text-slate-300 mt-1 leading-relaxed">
                  آئی فون پر ایپ انسٹال کرنے کے لیے سفاری براؤزر کی مدد سے ہوم اسکرین پر شامل کریں۔
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2.5">
                <div className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-indigo-500/20 text-indigo-400 font-bold flex items-center justify-center shrink-0 text-[10px]">
                    1
                  </span>
                  <p className="text-[11px] text-slate-300">
                    یہ لنک اپنے آئی فون کے <strong>Safari</strong> براؤزر میں کھولیں۔
                  </p>
                </div>

                <div className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-indigo-500/20 text-indigo-400 font-bold flex items-center justify-center shrink-0 text-[10px]">
                    2
                  </span>
                  <p className="text-[11px] text-slate-300 flex items-center gap-1.5 flex-wrap">
                    نیچے بار میں <strong>Share</strong> بٹن <Share2 size={13} className="text-sky-400 inline" /> پر کلک کریں۔
                  </p>
                </div>

                <div className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-indigo-500/20 text-indigo-400 font-bold flex items-center justify-center shrink-0 text-[10px]">
                    3
                  </span>
                  <p className="text-[11px] text-slate-300 flex items-center gap-1.5 flex-wrap">
                    مینیو میں <strong>"Add to Home Screen"</strong> <PlusSquare size={13} className="text-sky-400 inline" /> پر کلک کر کے <strong>Add</strong> دبائیں۔
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-slate-800 shrink-0">
          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs transition-colors"
          >
            بند کریں (Close)
          </button>
        </div>
      </div>
    </div>
  );
};
