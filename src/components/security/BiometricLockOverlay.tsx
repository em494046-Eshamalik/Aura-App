import React, { useState, useEffect } from 'react';
import { 
  ScanFace, 
  Fingerprint, 
  Lock, 
  KeyRound, 
  ShieldCheck, 
  Check, 
  AlertCircle,
  Delete
} from 'lucide-react';
import { UserProfile } from '../../types/finance';

interface BiometricLockOverlayProps {
  isLocked: boolean;
  profile: UserProfile;
  onUnlock: () => void;
}

export const BiometricLockOverlay: React.FC<BiometricLockOverlayProps> = ({
  isLocked,
  profile,
  onUnlock,
}) => {
  const [method, setMethod] = useState<'face' | 'fingerprint' | 'pin'>(
    profile.biometricMethod || 'face'
  );
  const [isScanning, setIsScanning] = useState(false);
  const [scanSuccess, setScanSuccess] = useState(false);
  const [pinDigits, setPinDigits] = useState<string>('');
  const [pinError, setPinError] = useState(false);

  // Play synthetic native-like haptic sound using Web Audio API
  const playHapticTone = (type: 'scan' | 'success' | 'error') => {
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);

      if (type === 'success') {
        osc.frequency.setValueAtTime(587.33, audioCtx.currentTime); // D5
        osc.frequency.exponentialRampToValueAtTime(880, audioCtx.currentTime + 0.12); // A5
        gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.2);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.2);
      } else if (type === 'scan') {
        osc.frequency.setValueAtTime(329.63, audioCtx.currentTime);
        gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.08);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.08);
      } else {
        osc.frequency.setValueAtTime(196, audioCtx.currentTime);
        gain.gain.setValueAtTime(0.2, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.25);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.25);
      }
    } catch {
      // AudioContext unavailable or blocked by browser policy
    }
  };

  // Trigger automatic scan when locked screen appears
  useEffect(() => {
    if (isLocked) {
      setPinDigits('');
      setPinError(false);
      setScanSuccess(false);
      setMethod(profile.biometricMethod || 'face');

      // Auto-trigger biometric scan after brief delay
      const autoScan = setTimeout(() => {
        triggerBiometricScan();
      }, 500);

      return () => clearTimeout(autoScan);
    }
  }, [isLocked, profile.biometricMethod]);

  const triggerBiometricScan = () => {
    if (isScanning || scanSuccess) return;
    setIsScanning(true);
    playHapticTone('scan');

    // Simulate authentic biometric analysis (1.2 seconds)
    setTimeout(() => {
      setIsScanning(false);
      setScanSuccess(true);
      playHapticTone('success');

      setTimeout(() => {
        setScanSuccess(false);
        onUnlock();
      }, 600);
    }, 1200);
  };

  // Handle PIN input
  const handleKeypadPress = (digit: string) => {
    if (pinDigits.length < 4) {
      const nextDigits = pinDigits + digit;
      setPinDigits(nextDigits);
      playHapticTone('scan');

      if (nextDigits.length === 4) {
        // Validate PIN (user custom PIN or default '1234')
        const validPin = profile.securityPin || '1234';
        if (nextDigits === validPin) {
          playHapticTone('success');
          setScanSuccess(true);
          setTimeout(() => {
            setScanSuccess(false);
            onUnlock();
          }, 400);
        } else {
          playHapticTone('error');
          setPinError(true);
          setTimeout(() => {
            setPinDigits('');
            setPinError(false);
          }, 700);
        }
      }
    }
  };

  const handleBackspace = () => {
    setPinDigits(prev => prev.slice(0, -1));
  };

  if (!isLocked) return null;

  return (
    <div className="absolute inset-0 z-50 bg-slate-950/95 backdrop-blur-2xl flex flex-col items-center justify-between p-6 select-none animate-fade-in text-white">
      {/* Top Lock Status */}
      <div className="w-full flex items-center justify-between pt-2">
        <div className="flex items-center gap-1.5 text-xs text-slate-400">
          <ShieldCheck size={14} className="text-sky-400" />
          <span className="font-medium tracking-wide">Aura Security Shield</span>
        </div>

        <div className="flex items-center gap-1 bg-slate-900 px-2 py-0.5 rounded-full border border-slate-800 text-[10px] text-sky-400 font-mono">
          <Lock size={10} />
          <span>Locked</span>
        </div>
      </div>

      {/* Center User Identity & Biometric Viewport */}
      <div className="w-full max-w-xs flex flex-col items-center text-center my-auto">
        <div className="relative mb-3">
          <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-sky-400/80 shadow-2xl">
            <img
              src={profile.avatar}
              alt={profile.name}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-slate-900 border border-sky-400 flex items-center justify-center text-sky-400 shadow-md">
            {method === 'fingerprint' ? <Fingerprint size={13} /> : <ScanFace size={13} />}
          </div>
        </div>

        <h3 className="text-base font-bold text-white tracking-tight">
          {profile.name}
        </h3>
        <p className="text-[11px] text-slate-400 mt-0.5 mb-5">
          App locked for your security
        </p>

        {/* MODE 1: FACE ID & FINGERPRINT SCANNER */}
        {method !== 'pin' ? (
          <div className="w-full flex flex-col items-center">
            {/* Visual Scanner Area */}
            <div 
              onClick={triggerBiometricScan}
              className={`relative w-36 h-36 rounded-3xl flex flex-col items-center justify-center border-2 transition-all duration-300 cursor-pointer ${
                scanSuccess
                  ? 'bg-emerald-500/20 border-emerald-400 shadow-[0_0_30px_rgba(52,211,153,0.3)]'
                  : isScanning
                  ? 'bg-sky-500/15 border-sky-400 shadow-[0_0_30px_rgba(56,189,248,0.3)]'
                  : 'bg-slate-900/80 border-slate-700/80 hover:border-sky-500/60'
              }`}
            >
              {/* Corner Viewfinder brackets for FaceID */}
              {method === 'face' && (
                <>
                  <span className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-sky-400 rounded-tl-lg" />
                  <span className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-sky-400 rounded-tr-lg" />
                  <span className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-sky-400 rounded-bl-lg" />
                  <span className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-sky-400 rounded-br-lg" />
                </>
              )}

              {/* Laser scan line animation */}
              {isScanning && (
                <div className="absolute inset-x-2 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_10px_#22d3ee] animate-pulse" />
              )}

              {/* Icon Status */}
              {scanSuccess ? (
                <Check size={48} className="text-emerald-400 scale-110 transition-transform" />
              ) : method === 'face' ? (
                <ScanFace
                  size={46}
                  className={`transition-all duration-300 ${
                    isScanning ? 'text-cyan-300 scale-105' : 'text-slate-300'
                  }`}
                />
              ) : (
                <Fingerprint
                  size={46}
                  className={`transition-all duration-300 ${
                    isScanning ? 'text-cyan-300 scale-105' : 'text-slate-300'
                  }`}
                />
              )}

              <span className="text-[10px] font-medium text-slate-300 mt-2 font-mono">
                {scanSuccess
                  ? 'Identity Verified'
                  : isScanning
                  ? 'Scanning...'
                  : method === 'face'
                  ? 'Tap for Face ID'
                  : 'Touch Sensor'}
              </span>
            </div>

            {/* Manual scan trigger button */}
            <button
              onClick={triggerBiometricScan}
              disabled={isScanning}
              className="mt-5 w-full py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 active:scale-95 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md shadow-sky-500/20"
            >
              {method === 'face' ? <ScanFace size={15} /> : <Fingerprint size={15} />}
              <span>{isScanning ? 'Verifying Biometrics...' : 'Authenticate Now'}</span>
            </button>
          </div>
        ) : (
          /* MODE 2: PIN CODE FALLBACK */
          <div className="w-full flex flex-col items-center">
            {/* PIN Dots Display */}
            <div className={`flex items-center gap-4 mb-4 ${pinError ? 'animate-shake' : ''}`}>
              {[0, 1, 2, 3].map(idx => (
                <div
                  key={idx}
                  className={`w-3.5 h-3.5 rounded-full border-2 transition-all duration-200 ${
                    idx < pinDigits.length
                      ? 'bg-sky-400 border-sky-400 scale-110'
                      : 'border-slate-600 bg-transparent'
                  } ${pinError ? 'border-rose-500 bg-rose-500' : ''}`}
                />
              ))}
            </div>

            {pinError && (
              <span className="text-[11px] text-rose-400 font-medium mb-2 flex items-center gap-1">
                <AlertCircle size={12} />
                <span>Incorrect PIN. (Default: 1234)</span>
              </span>
            )}

            {!pinError && (
              <span className="text-[11px] text-slate-400 mb-3">
                Enter your 4-digit Passcode (Default: <strong className="text-white">1234</strong>)
              </span>
            )}

            {/* Numeric Keypad */}
            <div className="grid grid-cols-3 gap-2 w-full max-w-[220px]">
              {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map(num => (
                <button
                  key={num}
                  onClick={() => handleKeypadPress(num)}
                  className="h-11 rounded-2xl bg-slate-900 hover:bg-slate-800 active:bg-sky-500 active:text-slate-950 text-white font-mono text-base font-semibold flex items-center justify-center border border-slate-800 transition-colors"
                >
                  {num}
                </button>
              ))}

              <button
                onClick={() => setMethod('face')}
                className="h-11 rounded-2xl bg-slate-900/60 hover:bg-slate-800 text-sky-400 flex items-center justify-center border border-slate-800/80"
                title="Use Biometrics"
              >
                <ScanFace size={16} />
              </button>

              <button
                onClick={() => handleKeypadPress('0')}
                className="h-11 rounded-2xl bg-slate-900 hover:bg-slate-800 active:bg-sky-500 active:text-slate-950 text-white font-mono text-base font-semibold flex items-center justify-center border border-slate-800 transition-colors"
              >
                0
              </button>

              <button
                onClick={handleBackspace}
                className="h-11 rounded-2xl bg-slate-900/60 hover:bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center border border-slate-800/80"
                title="Backspace"
              >
                <Delete size={16} />
              </button>
            </div>
          </div>
        )}

        {/* Method Switchers */}
        <div className="flex items-center gap-3 mt-6">
          <button
            onClick={() => {
              setMethod('face');
              setPinDigits('');
            }}
            className={`text-xs font-semibold px-2.5 py-1 rounded-lg transition-all flex items-center gap-1 ${
              method === 'face'
                ? 'bg-sky-500/20 text-sky-400 border border-sky-500/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <ScanFace size={13} />
            <span>Face ID</span>
          </button>

          <button
            onClick={() => {
              setMethod('fingerprint');
              setPinDigits('');
            }}
            className={`text-xs font-semibold px-2.5 py-1 rounded-lg transition-all flex items-center gap-1 ${
              method === 'fingerprint'
                ? 'bg-sky-500/20 text-sky-400 border border-sky-500/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Fingerprint size={13} />
            <span>Fingerprint</span>
          </button>

          <button
            onClick={() => setMethod('pin')}
            className={`text-xs font-semibold px-2.5 py-1 rounded-lg transition-all flex items-center gap-1 ${
              method === 'pin'
                ? 'bg-sky-500/20 text-sky-400 border border-sky-500/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <KeyRound size={13} />
            <span>PIN Code</span>
          </button>
        </div>
      </div>

      {/* Footer Info */}
      <div className="w-full text-center pb-2">
        <p className="text-[10px] text-slate-500">
          Hardware Secure Enclave Protected · Zero-Knowledge Storage
        </p>
      </div>
    </div>
  );
};
