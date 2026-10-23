import React, { useState } from 'react';
import { X, User, Mail, DollarSign, Lock, Shield, Check, Image, Sparkles } from 'lucide-react';
import { UserProfile, SupportedCurrency } from '../../types/finance';

interface EditProfileModalProps {
  isOpen: boolean;
  profile: UserProfile;
  onClose: () => void;
  onSave: (updated: Partial<UserProfile>) => void;
}

const PRESET_AVATARS = [
  { id: 'av-1', label: 'Executive', url: '/src/assets/images/user_avatar_executive_1792504360449.jpg' },
  { id: 'av-2', label: 'Tech Lead', url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80' },
  { id: 'av-3', label: 'Founder', url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80' },
  { id: 'av-4', label: 'Designer', url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80' },
  { id: 'av-5', label: 'Investor', url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80' },
];

export const EditProfileModal: React.FC<EditProfileModalProps> = ({
  isOpen,
  profile,
  onClose,
  onSave,
}) => {
  const [name, setName] = useState(profile.name);
  const [email, setEmail] = useState(profile.email);
  const [role, setRole] = useState(profile.role || 'Fintech Entrepreneur');
  const [avatar, setAvatar] = useState(profile.avatar);
  const [currency, setCurrency] = useState<SupportedCurrency>(profile.currency);
  const [startingBalance, setStartingBalance] = useState(
    profile.startingBalance ? profile.startingBalance.toString() : '24850.75'
  );
  const [monthlyBudgetLimit, setMonthlyBudgetLimit] = useState(
    profile.monthlyBudgetLimit ? profile.monthlyBudgetLimit.toString() : '6000'
  );
  const [securityPin, setSecurityPin] = useState(profile.securityPin || '1234');
  const [biometricMethod, setBiometricMethod] = useState<'face' | 'fingerprint'>(
    profile.biometricMethod || 'face'
  );
  const [lockOnBackground, setLockOnBackground] = useState(profile.lockOnBackground ?? true);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      name: name.trim() || 'Alex Sterling',
      email: email.trim() || 'user@aurawealth.io',
      role: role.trim() || 'Fintech Member',
      avatar,
      currency,
      startingBalance: parseFloat(startingBalance) || 24850.75,
      monthlyBudgetLimit: parseFloat(monthlyBudgetLimit) || 6000,
      securityPin: securityPin.length === 4 ? securityPin : '1234',
      biometricMethod,
      lockOnBackground,
    });
    onClose();
  };

  return (
    <div className="absolute inset-0 bg-slate-950/85 backdrop-blur-md z-50 flex flex-col justify-end p-3 animate-fade-in text-white select-none">
      <div 
        className="w-full bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-2xl max-h-[92%] overflow-y-auto no-scrollbar"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-10 h-1 bg-slate-700 rounded-full mx-auto mb-3" />

        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-xl bg-sky-500/20 flex items-center justify-center text-sky-400">
              <User size={15} />
            </div>
            <div>
              <h3 className="text-xs font-bold text-white tracking-tight">
                Add / Edit Your Information
              </h3>
              <span className="text-[10px] text-slate-400">Personalize your wallet profile</span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-300"
          >
            <X size={15} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 py-3">
          {/* Avatar Selector */}
          <div>
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
              Choose Your Profile Avatar
            </label>
            <div className="flex items-center gap-3 overflow-x-auto no-scrollbar pb-1">
              {PRESET_AVATARS.map((av) => (
                <button
                  key={av.id}
                  type="button"
                  onClick={() => setAvatar(av.url)}
                  className={`relative w-12 h-12 rounded-full overflow-hidden border-2 transition-all shrink-0 ${
                    avatar === av.url ? 'border-sky-400 scale-105 shadow-md shadow-sky-500/30' : 'border-slate-700 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={av.url} alt={av.label} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  {avatar === av.url && (
                    <div className="absolute inset-0 bg-sky-500/30 flex items-center justify-center">
                      <Check size={16} className="text-white drop-shadow" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Name & Role */}
          <div className="grid grid-cols-2 gap-2.5">
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                Your Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Alex Sterling"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-sky-500"
                required
              />
            </div>

            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                Role / Title
              </label>
              <input
                type="text"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="e.g. Founder, Developer"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-sky-500"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. alex@example.com"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-sky-500"
              required
            />
          </div>

          {/* Currency & Starting Balance */}
          <div className="grid grid-cols-2 gap-2.5">
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                Preferred Currency
              </label>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value as SupportedCurrency)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-sky-500 cursor-pointer"
              >
                <option value="USD">USD ($)</option>
                <option value="EUR">EUR (€)</option>
                <option value="GBP">GBP (£)</option>
                <option value="JPY">JPY (¥)</option>
                <option value="CAD">CAD (CA$)</option>
              </select>
            </div>

            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                Wallet Balance ({currency})
              </label>
              <input
                type="number"
                step="0.01"
                value={startingBalance}
                onChange={(e) => setStartingBalance(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-sky-500"
              />
            </div>
          </div>

          {/* Security & Biometrics Configuration */}
          <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800/80 space-y-3">
            <div className="flex items-center gap-1.5 text-xs font-bold text-sky-400">
              <Shield size={14} />
              <span>Biometric Security Settings</span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  Biometric Style
                </label>
                <select
                  value={biometricMethod}
                  onChange={(e) => setBiometricMethod(e.target.value as 'face' | 'fingerprint')}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white"
                >
                  <option value="face">Face ID (iOS Style)</option>
                  <option value="fingerprint">Fingerprint (Touch ID)</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  4-Digit Security PIN
                </label>
                <input
                  type="password"
                  maxLength={4}
                  value={securityPin}
                  onChange={(e) => setSecurityPin(e.target.value.replace(/\D/g, ''))}
                  placeholder="1234"
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white font-mono tracking-widest text-center"
                />
              </div>
            </div>

            <label className="flex items-center gap-2 cursor-pointer pt-1">
              <input
                type="checkbox"
                checked={lockOnBackground}
                onChange={(e) => setLockOnBackground(e.target.checked)}
                className="rounded bg-slate-900 border-slate-700 text-sky-500 focus:ring-0"
              />
              <span className="text-[11px] text-slate-300">
                Lock app with Biometrics when leaving or switching apps
              </span>
            </label>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 text-xs font-bold transition-all shadow-md shadow-sky-500/20"
            >
              Save Information
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
