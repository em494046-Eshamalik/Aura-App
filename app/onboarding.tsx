import React from 'react';
import { OnboardingScreen } from '../src/screens/OnboardingScreen';

export default function OnboardingPage({ onNavigate }: { onNavigate?: (route: string) => void }) {
  return (
    <OnboardingScreen
      onGetStarted={() => {
        if (onNavigate) onNavigate('subscription');
      }}
      onSignIn={() => {
        if (onNavigate) onNavigate('tabs');
      }}
    />
  );
}
