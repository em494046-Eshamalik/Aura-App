import React, { useState } from 'react';
import { CreditCard, Eye, EyeOff, Copy, Check, Wifi } from 'lucide-react';
import { formatCurrency } from '../../utils/formatters';
import { SupportedCurrency } from '../../types/finance';

interface FinancialCardCarouselProps {
  balance: number;
  currency: SupportedCurrency;
  privacyMode: boolean;
  onTogglePrivacy: () => void;
}

export const FinancialCardCarousel: React.FC<FinancialCardCarouselProps> = ({
  balance,
  currency,
  privacyMode,
  onTogglePrivacy,
}) => {
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [isCopied, setIsCopied] = useState(false);
  const [showFullNumber, setShowFullNumber] = useState(false);

  const cards = [
    {
      id: 'card-1',
      name: 'Aura Obsidian Titanium',
      type: 'WORLD ELITE',
      last4: '4821',
      fullNumber: '4821 •••• •••• 9012',
      exp: '09/29',
      cvv: '842',
      limit: 50000,
      spent: 3280.50,
      texture: '/src/assets/images/wealth_card_texture_1792504360332.jpg',
      accentColor: 'from-sky-500/20 to-indigo-600/30',
    },
    {
      id: 'card-2',
      name: 'Aura Platinum Vault',
      type: 'TREASURY DEBIT',
      last4: '1092',
      fullNumber: '1092 •••• •••• 3341',
      exp: '11/30',
      cvv: '197',
      limit: 100000,
      spent: 850.00,
      texture: null,
      accentColor: 'from-emerald-500/20 to-teal-800/40',
    },
  ];

  const currentCard = cards[activeCardIndex];

  const handleCopyCard = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard?.writeText(currentCard.fullNumber.replace(/••••/g, '4410'));
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="w-full">
      {/* Card Header & Privacy Switch */}
      <div className="flex items-center justify-between mb-3 px-1">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-300">My Wealth Cards</span>
          <span className="text-[10px] text-slate-400 font-mono">
            {activeCardIndex + 1}/{cards.length}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onTogglePrivacy}
            className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-slate-200 transition-colors py-1 px-1.5 rounded-md min-h-[36px]"
            title={privacyMode ? 'Show Balances' : 'Hide Balances'}
          >
            {privacyMode ? <EyeOff size={13} className="text-sky-400" /> : <Eye size={13} />}
            <span>{privacyMode ? 'Protected' : 'Visible'}</span>
          </button>
        </div>
      </div>

      {/* Main Virtual Card */}
      <div 
        className="relative w-full aspect-[1.586] rounded-2xl p-5 text-white overflow-hidden shadow-2xl border border-slate-700/60 transition-transform duration-300 hover:scale-[1.01] active:scale-[0.99] select-none"
        style={{
          backgroundImage: currentCard.texture
            ? `linear-gradient(to bottom, rgba(15, 23, 42, 0.4), rgba(3, 7, 18, 0.9)), url(${currentCard.texture})`
            : undefined,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundColor: '#090d16',
        }}
      >
        {/* Subtle Ambient Refraction */}
        <div className={`absolute inset-0 bg-gradient-to-tr ${currentCard.accentColor} pointer-events-none opacity-60`} />

        <div className="relative h-full flex flex-col justify-between z-10">
          {/* Card Top: Brand & Contactless */}
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              <div className="w-7 h-5 rounded bg-amber-400/80 border border-amber-300/40 flex items-center justify-center shadow-sm">
                <div className="w-4 h-3 border border-amber-800/40 rounded-sm" />
              </div>
              <Wifi size={16} className="text-slate-300 rotate-90" />
            </div>

            <div className="text-right">
              <span className="text-xs font-bold tracking-widest uppercase bg-gradient-to-r from-white via-sky-200 to-slate-300 bg-clip-text text-transparent">
                AURA WEALTH
              </span>
              <p className="text-[9px] text-slate-400 tracking-wider uppercase font-mono mt-0.5">
                {currentCard.type}
              </p>
            </div>
          </div>

          {/* Card Balance */}
          <div>
            <span className="text-[10px] text-slate-400 tracking-wider uppercase block mb-0.5">
              Available Credit Limit
            </span>
            <div className="text-2xl font-bold tracking-tight font-mono text-white flex items-baseline gap-2">
              {privacyMode ? '••••••••' : formatCurrency(currentCard.limit - currentCard.spent, currency)}
              <span className="text-xs text-emerald-400 font-sans font-medium">● Active</span>
            </div>
          </div>

          {/* Card Bottom: Number, Holder, Expiry & Copy Action */}
          <div className="flex items-end justify-between pt-2 border-t border-white/10">
            <div>
              <p className="text-[12px] font-mono tracking-wider text-slate-200">
                {showFullNumber ? currentCard.fullNumber : `•••• •••• •••• ${currentCard.last4}`}
              </p>
              <p className="text-[10px] font-medium tracking-wide uppercase text-slate-400 mt-0.5">
                ALEX STERLING
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-right">
                <span className="text-[8px] text-slate-400 uppercase tracking-widest block">EXPIRES</span>
                <span className="text-[11px] font-mono text-slate-200">{currentCard.exp}</span>
              </div>

              <button
                onClick={handleCopyCard}
                className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 active:scale-95 flex items-center justify-center transition-all border border-white/15"
                title="Copy card number"
              >
                {isCopied ? <Check size={14} className="text-emerald-400" /> : <Copy size={13} className="text-slate-200" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Card Selector Dots */}
      <div className="flex items-center justify-center gap-2 mt-3">
        {cards.map((card, idx) => (
          <button
            key={card.id}
            onClick={() => setActiveCardIndex(idx)}
            className={`transition-all duration-300 rounded-full ${
              activeCardIndex === idx
                ? 'w-6 h-1.5 bg-sky-400'
                : 'w-1.5 h-1.5 bg-slate-700 hover:bg-slate-500'
            }`}
            aria-label={`Select ${card.name}`}
          />
        ))}
      </div>
    </div>
  );
};
