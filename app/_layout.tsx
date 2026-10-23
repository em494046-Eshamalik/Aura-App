import React from 'react';

/**
 * Expo Router Root Layout
 * Used when running natively with Expo Router (npx expo start)
 */
export default function RootLayout({ children }: { children?: React.ReactNode }) {
  return (
    <div className="flex-1 flex flex-col h-full bg-slate-950 text-white">
      {children}
    </div>
  );
}
