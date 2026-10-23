import React from 'react';
import { 
  User, 
  Shield, 
  Fingerprint, 
  Eye, 
  EyeOff, 
  Bell, 
  Download, 
  RotateCcw, 
  CreditCard, 
  ChevronRight, 
  Smartphone,
  ExternalLink,
  Award,
  Edit3,
  Lock,
  ScanFace
} from 'lucide-react';
import { UserProfile, SupportedCurrency } from '../types/finance';

interface ProfileScreenProps {
  profile: UserProfile;
  onUpdateProfile: (updated: Partial<UserProfile>) => void;
  onOpenSubscription: () => void;
  onOpenExpoGuide: () => void;
  onOpenEditProfile: () => void;
  onOpenInstall: () => void;
  onLockApp: () => void;
  onExport: () => void;
  onResetData: () => void;
}

const CURRENCIES: SupportedCurrency[] = ['USD', 'EUR', 'GBP', 'JPY', 'CAD'];

export const ProfileScreen: React.FC<ProfileScreenProps> = ({
  profile,
  onUpdateProfile,
  onOpenSubscription,
  onOpenExpoGuide,
  onOpenEditProfile,
  onOpenInstall,
  onLockApp,
  onExport,
  onResetData,
}) => {
  return (
    <div className="flex-1 overflow-y-auto no-scrollbar p-4 space-y-4 bg-slate-950 text-white select-none">
      {/* Header Profile Identity Card with Edit Button */}
      <div className="p-4 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl flex items-center justify-between gap-3">
        <div className="flex items-center gap-3.5 min-w-0">
          <div className="relative w-14 h-14 rounded-2xl overflow-hidden border-2 border-sky-400/80 shadow-lg shrink-0">
            <img
              src={profile.avatar}
              alt={profile.name}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <h2 className="text-sm font-bold text-white truncate">{profile.name}</h2>
              <Award size={14} className="text-amber-400 shrink-0" />
            </div>
            <p className="text-[11px] text-slate-400 truncate">{profile.email}</p>
            <div className="mt-1 flex items-center gap-2">
              <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-sky-500/10 text-sky-400 border border-sky-500/20">
                {profile.tier}
              </span>
              <span className="text-[10px] text-emerald-400">
                ● {profile.biometricMethod === 'fingerprint' ? 'Touch ID' : 'Face ID'}
              </span>
            </div>
          </div>
        </div>

        <button
          onClick={onOpenEditProfile}
          className="px-3 py-1.5 rounded-xl bg-sky-500/10 hover:bg-sky-500/20 border border-sky-500/30 text-sky-400 text-xs font-semibold flex items-center gap-1.5 transition-all shrink-0 active:scale-95"
        >
          <Edit3 size={13} />
          <span>Edit</span>
        </button>
      </div>

      {/* Quick Action Strip: Lock Now & Install App */}
      <div className="grid grid-cols-2 gap-2.5">
        <button
          onClick={onLockApp}
          className="p-3 rounded-2xl bg-gradient-to-br from-slate-900 to-indigo-950/40 border border-sky-500/30 hover:border-sky-400 transition-all flex items-center gap-2.5 text-left group"
        >
          <div className="w-8 h-8 rounded-xl bg-sky-500/20 border border-sky-500/30 flex items-center justify-center text-sky-400 shrink-0">
            <Lock size={15} />
          </div>
          <div>
            <span className="text-xs font-bold text-white block">Lock App</span>
            <span className="text-[10px] text-slate-400">Test Biometrics</span>
          </div>
        </button>

        <button
          onClick={onOpenInstall}
          className="p-3 rounded-2xl bg-gradient-to-br from-slate-900 to-sky-950/40 border border-sky-500/30 hover:border-sky-400 transition-all flex items-center gap-2.5 text-left group"
        >
          <div className="w-8 h-8 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
            <Download size={15} />
          </div>
          <div>
            <span className="text-xs font-bold text-white block">Install App</span>
            <span className="text-[10px] text-slate-400">Add to Phone</span>
          </div>
        </button>
      </div>

      {/* Subscription Tier Banner */}
      <button
        onClick={onOpenSubscription}
        className="w-full p-3.5 rounded-2xl bg-gradient-to-r from-sky-950/60 via-slate-900 to-indigo-950/60 border border-sky-500/40 hover:border-sky-400 transition-all flex items-center justify-between text-left group"
      >
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-sky-500/20 border border-sky-500/30 flex items-center justify-center text-sky-400">
            <CreditCard size={18} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-white">Manage Membership</span>
              <span className="text-[9px] bg-sky-400 text-slate-950 font-bold px-1.5 py-0.2 rounded font-mono">
                {profile.tier}
              </span>
            </div>
            <p className="text-[10px] text-slate-400">Change plan or switch to Annual (-20%)</p>
          </div>
        </div>
        <ChevronRight size={16} className="text-slate-400 group-hover:text-white transition-colors" />
      </button>

      {/* Expo Mobile Testing Guide Card */}
      <button
        onClick={onOpenExpoGuide}
        className="w-full p-3.5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all flex items-center justify-between text-left group"
      >
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
            <Smartphone size={18} />
          </div>
          <div>
            <span className="text-xs font-bold text-white">Test on Phone with Expo Go</span>
            <p className="text-[10px] text-slate-400">Scan QR code & run on physical iOS/Android</p>
          </div>
        </div>
        <ExternalLink size={15} className="text-slate-400 group-hover:text-sky-400 transition-colors" />
      </button>

      {/* Preferences Section */}
      <div className="space-y-1.5">
        <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider px-1">
          Financial Preferences
        </span>

        <div className="rounded-2xl bg-slate-900/60 border border-slate-800 divide-y divide-slate-800/80 text-xs">
          {/* Currency Selector */}
          <div className="p-3 flex items-center justify-between">
            <span className="text-slate-300 font-medium">Display Currency</span>
            <div className="flex items-center gap-1">
              {CURRENCIES.map((curr) => (
                <button
                  key={curr}
                  onClick={() => onUpdateProfile({ currency: curr })}
                  className={`px-2 py-1 rounded-md text-[10px] font-mono font-semibold transition-all ${
                    profile.currency === curr
                      ? 'bg-sky-500 text-slate-950 font-bold shadow-sm'
                      : 'bg-slate-850 text-slate-400 hover:text-white'
                  }`}
                >
                  {curr}
                </button>
              ))}
            </div>
          </div>

          {/* Privacy Balance Mode Toggle */}
          <div className="p-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              {profile.privacyMode ? <EyeOff size={15} className="text-sky-400" /> : <Eye size={15} className="text-slate-400" />}
              <span className="text-slate-300 font-medium">Privacy Balance Shield</span>
            </div>
            <button
              onClick={() => onUpdateProfile({ privacyMode: !profile.privacyMode })}
              className={`w-11 h-6 rounded-full transition-colors relative p-0.5 ${
                profile.privacyMode ? 'bg-sky-500' : 'bg-slate-800'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white transition-transform ${
                  profile.privacyMode ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Biometrics FaceID Toggle */}
          <div className="p-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Fingerprint size={15} className="text-slate-400" />
              <div>
                <span className="text-slate-300 font-medium block">Face ID / Biometric Lock</span>
                <span className="text-[10px] text-slate-400">PIN Fallback: {profile.securityPin || '1234'}</span>
              </div>
            </div>
            <button
              onClick={() => onUpdateProfile({ biometricsEnabled: !profile.biometricsEnabled })}
              className={`w-11 h-6 rounded-full transition-colors relative p-0.5 ${
                profile.biometricsEnabled ? 'bg-sky-500' : 'bg-slate-800'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white transition-transform ${
                  profile.biometricsEnabled ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Lock on Backgrounding Toggle */}
          <div className="p-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Lock size={15} className="text-slate-400" />
              <div>
                <span className="text-slate-300 font-medium block">Auto-Lock on Background</span>
                <span className="text-[10px] text-slate-400">Locks when switching tabs or apps</span>
              </div>
            </div>
            <button
              onClick={() => onUpdateProfile({ lockOnBackground: !profile.lockOnBackground })}
              className={`w-11 h-6 rounded-full transition-colors relative p-0.5 ${
                profile.lockOnBackground ? 'bg-sky-500' : 'bg-slate-800'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white transition-transform ${
                  profile.lockOnBackground ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Push Notifications Toggle */}
          <div className="p-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bell size={15} className="text-slate-400" />
              <span className="text-slate-300 font-medium">Smart Budget Notifications</span>
            </div>
            <button
              onClick={() => onUpdateProfile({ notificationsEnabled: !profile.notificationsEnabled })}
              className={`w-11 h-6 rounded-full transition-colors relative p-0.5 ${
                profile.notificationsEnabled ? 'bg-sky-500' : 'bg-slate-800'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white transition-transform ${
                  profile.notificationsEnabled ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Data Management */}
      <div className="space-y-1.5 pt-1">
        <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider px-1">
          Data & Security
        </span>

        <div className="space-y-2">
          {/* Export Statement CSV */}
          <button
            onClick={onExport}
            className="w-full p-3 rounded-2xl bg-slate-900/60 border border-slate-800 hover:bg-slate-900 transition-all flex items-center justify-between text-xs font-semibold text-slate-200"
          >
            <div className="flex items-center gap-2.5">
              <Download size={15} className="text-sky-400" />
              <span>Export Certified CSV Financial Statement</span>
            </div>
            <span className="text-[10px] text-slate-400 font-mono">.CSV</span>
          </button>

          {/* Reset Demo Data */}
          <button
            onClick={onResetData}
            className="w-full p-3 rounded-2xl bg-rose-500/10 border border-rose-500/20 hover:bg-rose-500/20 transition-all flex items-center justify-between text-xs font-semibold text-rose-300"
          >
            <div className="flex items-center gap-2.5">
              <RotateCcw size={15} />
              <span>Reset to Default Demo Portfolio</span>
            </div>
            <span className="text-[10px] text-rose-400">Clear Storage</span>
          </button>
        </div>
      </div>
    </div>
  );
};
