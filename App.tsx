
import React, { useState, useMemo } from 'react';
import { ExpenseRecord, ExpenseType, PersonName } from './types.ts';
import { ExpenseCard } from './components/ExpenseCard.tsx';
import { calculateSettlement } from './utils/settle.ts';

// Icons as SVG strings
const Icons = {
  Electric: (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
    </svg>
  ),
  Gas: (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z" />
    </svg>
  ),
  Water: (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21.75c-4.142 0-7.5-3.358-7.5-7.5 0-3.75 4.5-9.75 7.5-9.75s7.5 6 7.5 9.75c0 4.142-3.358 7.5-7.5 7.5z" />
    </svg>
  ),
  Wifi: (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.288 15.038a5.25 5.25 0 017.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 011.06 0z" />
    </svg>
  ),
};

const COLORS = {
  Electric: 'bg-yellow-400',
  Gas: 'bg-orange-500',
  Water: 'bg-blue-400',
  Wifi: 'bg-indigo-500',
};

const App: React.FC = () => {
  const [expenses, setExpenses] = useState<ExpenseRecord[]>([
    { id: 'Electric', amount: 0, paidBy: 'Caroline' },
    { id: 'Gas', amount: 0, paidBy: 'Dylan + Kaitlyn' },
    { id: 'Water', amount: 0, paidBy: 'Dylan + Kaitlyn' },
    { id: 'Wifi', amount: 40.0, paidBy: 'Dylan + Kaitlyn' },
  ]);

  const handleUpdate = (id: ExpenseType, field: 'amount' | 'paidBy', value: any) => {
    setExpenses((prev) =>
      prev.map((exp) => (exp.id === id ? { ...exp, [field]: value } : exp))
    );
  };

  const settlement = useMemo(() => calculateSettlement(expenses), [expenses]);

  return (
    <div className="min-h-screen pb-20 pt-12 px-4 md:max-w-md md:mx-auto">
      {/* Header */}
      <header className="mb-8 px-2">
        <h1 className="text-[34px] font-bold tracking-tight text-gray-900 leading-tight">Shared Bills</h1>
        <p className="text-gray-500 font-medium">Dylan, Kaitlyn, & Caroline split</p>
      </header>

      {/* Expense Inputs */}
      <section>
        {expenses.map((exp) => (
          <ExpenseCard
            key={exp.id}
            expense={exp}
            onUpdate={handleUpdate}
            icon={Icons[exp.id]}
            color={COLORS[exp.id]}
          />
        ))}
      </section>

      {/* Summary Section */}
      <section className="mt-10">
        <h2 className="text-[22px] font-bold text-gray-900 mb-4 px-2">Settlement Summary</h2>
        
        <div className="bg-white rounded-[24px] p-6 ios-shadow border border-gray-100 overflow-hidden relative">
          <div className="flex justify-between items-center mb-6">
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1 text-[10px]">Total Group Spend</p>
              <p className="text-3xl font-bold text-gray-900">${settlement.totalAmount.toFixed(2)}</p>
            </div>
            <div className="text-right">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1 text-[10px]">Split /3</p>
              <p className="text-xl font-bold text-blue-600">${settlement.perPerson.toFixed(2)}</p>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">Transfers to Settle</h4>
            {settlement.transactions.length > 0 ? (
              settlement.transactions.map((t, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 bg-blue-50/50 rounded-2xl border border-blue-100/50">
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-gray-800 text-[13px]">{t.from}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-blue-400">
                      <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
                    </svg>
                    <span className="font-bold text-gray-800 text-[13px]">{t.to}</span>
                  </div>
                  <span className="text-[15px] font-black text-blue-700">${t.amount.toFixed(2)}</span>
                </div>
              ))
            ) : (
              <div className="text-center py-4 text-gray-400 italic font-medium">
                Everything is settled!
              </div>
            )}
          </div>
        </div>

        {/* Detailed Breakdown */}
        <div className="mt-8 px-2 space-y-4">
          <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Initial Payments</h4>
          {Object.entries(settlement.individualSpend).map(([name, amount]) => (
            <div key={name} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
              <span className="font-semibold text-gray-600 text-sm">{name}</span>
              <span className="font-bold text-gray-900 text-sm">${(amount as number).toFixed(2)}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom Padding for iOS Home Indicator */}
      <div className="h-10"></div>
    </div>
  );
};

export default App;
