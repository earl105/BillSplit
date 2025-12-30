
export type PersonName = 'Dylan' | 'Kaitlyn' | 'Caroline' | 'Dylan + Kaitlyn';

export type ExpenseType = 'Electric' | 'Gas' | 'Water' | 'Wifi';

export interface ExpenseRecord {
  id: ExpenseType;
  amount: number;
  paidBy: PersonName;
}

export interface Transaction {
  from: PersonName;
  to: PersonName;
  amount: number;
}

export interface SettlementSummary {
  totalAmount: number;
  perPerson: number;
  individualSpend: Record<PersonName, number>;
  transactions: Transaction[];
}
