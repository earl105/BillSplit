import React from 'react';
import { ExpenseRecord, PersonName, ExpenseType } from '../types';

interface ExpenseCardProps {
  expense: ExpenseRecord;
  onUpdate: (id: ExpenseType, field: 'amount' | 'paidBy', value: any) => void;
  icon: React.ReactNode;
  color: string;
}

const PEOPLE: PersonName[] = ['Dylan', 'Kaitlyn', 'Caroline', 'Dylan + Kaitlyn'];

export const ExpenseCard: React.FC<ExpenseCardProps> = ({ expense, onUpdate, icon, color }) => {
  return (
    <div className="bg-white rounded-[20px] p-5 mb-4 ios-shadow border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white ${color}`}>
            {icon}
          </div>
          <h3 className="font-semibold text-[17px] text-gray-900">{expense.id}</h3>
        </div>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-medium">$</span>
          <input
            type="number"
            inputMode="decimal"
            min="0"
            step="0.01"
            pattern="[0-9]*([.,][0-9]+)?"
            aria-label={`${expense.id} amount`}
            placeholder="0.00"
            className="w-28 pl-7 pr-3 py-2 bg-[#F2F2F7] rounded-xl text-right font-semibold text-[16px] focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            value={expense.amount || ''}
            onChange={(e) => onUpdate(expense.id, 'amount', parseFloat(e.target.value) || 0)}
          />
        </div>
      </div>

      <div className="flex flex-col pt-2 border-t border-gray-50">
        <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-2">Paid By</span>
        <div className="flex bg-[#F2F2F7] p-1 rounded-xl overflow-x-auto no-scrollbar">
          {PEOPLE.map((person) => (
            <button
              key={person}
              onClick={() => onUpdate(expense.id, 'paidBy', person)}
              aria-pressed={expense.paidBy === person}
              className={`flex-none px-4 py-2 rounded-lg text-[13px] font-bold transition-all whitespace-nowrap mr-2 last:mr-0 touch-manipulation ${
                expense.paidBy === person
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-400'
              }`}
            >
              {person}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
