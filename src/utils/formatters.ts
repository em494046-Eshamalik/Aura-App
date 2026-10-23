import { Transaction, SupportedCurrency, CashFlowSummary } from '../types/finance';
import { CURRENCY_SYMBOLS } from '../constants/demoData';

export function formatCurrency(amount: number, currency: SupportedCurrency = 'USD'): string {
  const symbol = CURRENCY_SYMBOLS[currency] || '$';
  return `${symbol}${amount.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

export function formatDate(dateStr: string): string {
  try {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  } catch {
    return dateStr;
  }
}

export function computeCashFlow(transactions: Transaction[]): CashFlowSummary {
  const monthlyIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const monthlyExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalBalance = 24850.75 + (monthlyIncome - monthlyExpenses);
  const savingsRate = monthlyIncome > 0 ? ((monthlyIncome - monthlyExpenses) / monthlyIncome) * 100 : 0;
  const investmentsTotal = 48920.00;

  return {
    totalBalance,
    monthlyIncome,
    monthlyExpenses,
    savingsRate: Math.max(0, savingsRate),
    investmentsTotal,
  };
}

export function exportTransactionsCsv(transactions: Transaction[]): void {
  const headers = ['Date', 'Title', 'Merchant', 'Category', 'Type', 'Amount', 'Account', 'Note', 'Tax Deductible'];
  const rows = transactions.map(t => [
    `"${t.date}"`,
    `"${t.title.replace(/"/g, '""')}"`,
    `"${t.merchant.replace(/"/g, '""')}"`,
    `"${t.category}"`,
    `"${t.type}"`,
    t.amount.toFixed(2),
    `"${t.account}"`,
    `"${(t.note || '').replace(/"/g, '""')}"`,
    t.isTaxDeductible ? 'Yes' : 'No',
  ]);

  const csvContent = [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `Aura_Financial_Statement_${new Date().toISOString().split('T')[0]}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
