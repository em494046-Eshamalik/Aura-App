import React from 'react';
import { SplashScreen } from '../src/screens/SplashScreen';

export default function IndexPage({ onNavigate }: { onNavigate?: (route: string) => void }) {
  return (
    <SplashScreen
      onComplete={() => {
        if (onNavigate) onNavigate('onboarding');
      }}
    />
  );
}
