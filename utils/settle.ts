
import { ExpenseRecord, PersonName, Transaction, SettlementSummary } from '../types';

const CONSUMERS: PersonName[] = ['Dylan', 'Kaitlyn', 'Caroline'];
const ALL_ENTITIES: PersonName[] = ['Dylan', 'Kaitlyn', 'Caroline', 'Dylan + Kaitlyn'];

export const calculateSettlement = (expenses: ExpenseRecord[]): SettlementSummary => {
  const totalAmount = expenses.reduce((sum, exp) => sum + exp.amount, 0);
  const perPerson = totalAmount / CONSUMERS.length;

  const individualPaid: Record<PersonName, number> = {
    Dylan: 0,
    Kaitlyn: 0,
    Caroline: 0,
    'Dylan + Kaitlyn': 0,
  };

  expenses.forEach((exp) => {
    individualPaid[exp.paidBy] += exp.amount;
  });

  // Balance calculation:
  // Dylan, Kaitlyn, and Caroline each 'owe' perPerson.
  // The Joint Account ('Dylan + Kaitlyn') owes nothing itself, it only pays.
  const balances: { name: PersonName; balance: number }[] = ALL_ENTITIES.map((name) => {
    const consumptionCost = CONSUMERS.includes(name) ? perPerson : 0;
    return {
      name,
      balance: individualPaid[name] - consumptionCost,
    };
  });

  const transactions: Transaction[] = [];
  
  // Greedy algorithm for minimum transactions
  let debtors = balances
    .filter((b) => b.balance < -0.01)
    .sort((a, b) => a.balance - b.balance);
  let creditors = balances
    .filter((b) => b.balance > 0.01)
    .sort((a, b) => b.balance - a.balance);

  let dIdx = 0;
  let cIdx = 0;

  while (dIdx < debtors.length && cIdx < creditors.length) {
    const debtor = debtors[dIdx];
    const creditor = creditors[cIdx];
    
    const amountToTransfer = Math.min(Math.abs(debtor.balance), creditor.balance);
    
    if (amountToTransfer > 0.01) {
      transactions.push({
        from: debtor.name,
        to: creditor.name,
        amount: Number(amountToTransfer.toFixed(2)),
      });
    }

    debtor.balance += amountToTransfer;
    creditor.balance -= amountToTransfer;

    if (Math.abs(debtor.balance) < 0.01) dIdx++;
    if (Math.abs(creditor.balance) < 0.01) cIdx++;
  }

  return {
    totalAmount,
    perPerson,
    individualSpend: individualPaid,
    transactions,
  };
};
