export type TransactionType = 'income' | 'expense';

export type TransactionCategory = 
  | 'Housing'
  | 'Dining & Food'
  | 'Groceries'
  | 'Technology'
  | 'Transportation'
  | 'Health & Wellness'
  | 'Entertainment'
  | 'Salary'
  | 'Investment'
  | 'Freelance'
  | 'Utilities';

export interface Transaction {
  id: string;
  title: string;
  merchant: string;
  category: TransactionCategory;
  amount: number;
  type: TransactionType;
  date: string; // ISO date string or formatted
  account: string;
  note?: string;
  isTaxDeductible?: boolean;
}

export interface BudgetCategory {
  id: string;
  category: TransactionCategory;
  allocated: number;
  spent: number;
  color: string;
}

export type InsightType = 'saving' | 'warning' | 'tip' | 'growth';

export interface FinancialInsight {
  id: string;
  type: InsightType;
  title: string;
  description: string;
  impactAmount?: number;
  actionLabel?: string;
  category?: string;
}

export interface SubscriptionPlan {
  id: 'starter' | 'pro' | 'wealth';
  name: string;
  tagline: string;
  priceMonthly: number;
  priceYearly: number;
  popular?: boolean;
  features: string[];
}

export type SupportedCurrency = 'USD' | 'EUR' | 'GBP' | 'JPY' | 'CAD';

export interface UserProfile {
  name: string;
  email: string;
  avatar: string;
  role?: string;
  phone?: string;
  startingBalance?: number;
  monthlyBudgetLimit?: number;
  tier: 'Starter' | 'Aura Pro' | 'Private Wealth';
  currency: SupportedCurrency;
  privacyMode: boolean;
  biometricsEnabled: boolean;
  biometricMethod?: 'face' | 'fingerprint';
  securityPin?: string;
  lockOnBackground: boolean;
  notificationsEnabled: boolean;
}

export interface CashFlowSummary {
  totalBalance: number;
  monthlyIncome: number;
  monthlyExpenses: number;
  savingsRate: number;
  investmentsTotal: number;
}
