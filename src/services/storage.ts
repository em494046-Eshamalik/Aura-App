import { Transaction, UserProfile, BudgetCategory, FinancialInsight } from '../types/finance';
import { INITIAL_TRANSACTIONS, INITIAL_USER_PROFILE, INITIAL_BUDGETS, INITIAL_INSIGHTS } from '../constants/demoData';

const STORAGE_KEYS = {
  TRANSACTIONS: 'aura_transactions_v1',
  PROFILE: 'aura_profile_v1',
  BUDGETS: 'aura_budgets_v1',
  INSIGHTS: 'aura_insights_v1',
  ACTIVE_PLAN: 'aura_active_plan_v1',
  ONBOARDED: 'aura_onboarded_v1',
};

// Safe storage helper compatible with Web and AsyncStorage semantics
export const storageService = {
  getTransactions(): Transaction[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.TRANSACTIONS);
      if (!data) return INITIAL_TRANSACTIONS;
      return JSON.parse(data);
    } catch {
      return INITIAL_TRANSACTIONS;
    }
  },

  saveTransactions(transactions: Transaction[]): void {
    try {
      localStorage.setItem(STORAGE_KEYS.TRANSACTIONS, JSON.stringify(transactions));
    } catch (e) {
      console.warn('Could not save transactions to storage', e);
    }
  },

  addTransaction(transaction: Omit<Transaction, 'id'>): Transaction {
    const list = this.getTransactions();
    const newTx: Transaction = {
      ...transaction,
      id: `tx-${Date.now()}`,
    };
    const updated = [newTx, ...list];
    this.saveTransactions(updated);
    return newTx;
  },

  deleteTransaction(id: string): Transaction[] {
    const list = this.getTransactions();
    const updated = list.filter(t => t.id !== id);
    this.saveTransactions(updated);
    return updated;
  },

  getProfile(): UserProfile {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.PROFILE);
      if (!data) return INITIAL_USER_PROFILE;
      return JSON.parse(data);
    } catch {
      return INITIAL_USER_PROFILE;
    }
  },

  saveProfile(profile: UserProfile): void {
    try {
      localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(profile));
    } catch (e) {
      console.warn('Could not save profile to storage', e);
    }
  },

  getBudgets(): BudgetCategory[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.BUDGETS);
      if (!data) return INITIAL_BUDGETS;
      return JSON.parse(data);
    } catch {
      return INITIAL_BUDGETS;
    }
  },

  saveBudgets(budgets: BudgetCategory[]): void {
    try {
      localStorage.setItem(STORAGE_KEYS.BUDGETS, JSON.stringify(budgets));
    } catch (e) {
      console.warn('Could not save budgets to storage', e);
    }
  },

  getInsights(): FinancialInsight[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.INSIGHTS);
      if (!data) return INITIAL_INSIGHTS;
      return JSON.parse(data);
    } catch {
      return INITIAL_INSIGHTS;
    }
  },

  saveInsights(insights: FinancialInsight[]): void {
    try {
      localStorage.setItem(STORAGE_KEYS.INSIGHTS, JSON.stringify(insights));
    } catch (e) {
      console.warn('Could not save insights to storage', e);
    }
  },

  isOnboarded(): boolean {
    try {
      return localStorage.getItem(STORAGE_KEYS.ONBOARDED) === 'true';
    } catch {
      return false;
    }
  },

  setOnboarded(value: boolean): void {
    try {
      localStorage.setItem(STORAGE_KEYS.ONBOARDED, value ? 'true' : 'false');
    } catch (e) {
      console.warn('Could not save onboarding state', e);
    }
  },

  resetAll(): void {
    try {
      localStorage.removeItem(STORAGE_KEYS.TRANSACTIONS);
      localStorage.removeItem(STORAGE_KEYS.PROFILE);
      localStorage.removeItem(STORAGE_KEYS.BUDGETS);
      localStorage.removeItem(STORAGE_KEYS.INSIGHTS);
      localStorage.removeItem(STORAGE_KEYS.ACTIVE_PLAN);
      localStorage.removeItem(STORAGE_KEYS.ONBOARDED);
    } catch (e) {
      console.warn('Could not reset storage', e);
    }
  }
};
