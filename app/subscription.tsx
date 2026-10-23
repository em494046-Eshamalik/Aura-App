import React from 'react';
import { SubscriptionScreen } from '../src/screens/SubscriptionScreen';
import { SubscriptionPlan } from '../src/types/finance';

export default function SubscriptionPage({ 
  onSelectPlan, 
  onBack 
}: { 
  onSelectPlan?: (plan: SubscriptionPlan) => void;
  onBack?: () => void;
}) {
  return (
    <SubscriptionScreen
      onSelectPlan={(plan) => {
        if (onSelectPlan) onSelectPlan(plan);
      }}
      onBack={() => {
        if (onBack) onBack();
      }}
    />
  );
}
