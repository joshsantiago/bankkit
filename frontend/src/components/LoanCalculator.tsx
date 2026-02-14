import React, { useState } from 'react';
import { motion } from 'motion/react';

export function LoanCalculator() {
  const [amount, setAmount] = useState(5000);
  const [months, setMonths] = useState(12);
  const interestRate = 6.5;

  const monthlyPayment = (
    (amount * (interestRate / 100 / 12)) /
    (1 - Math.pow(1 + interestRate / 100 / 12, -months))
  ).toFixed(2);

  return (
    <div className="bg-white rounded-[32px] p-8 md:p-12 shadow-2xl border border-gray-100 flex flex-col md:flex-row gap-12 items-center">
      <div className="flex-1 space-y-8 w-full">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="font-bold text-gray-500">Total Principal Paid</span>
            <span className="font-black text-[#064E3B] text-xl">${amount.toLocaleString()}</span>
          </div>
          <input 
            type="range" 
            min="1000" 
            max="50000" 
            step="1000"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="w-full h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-[#064E3B]"
          />
          <div className="flex justify-between text-xs font-bold text-gray-400">
            <span>$1,000</span>
            <span>$50,000</span>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="font-bold text-gray-500">Loan Term in Months</span>
            <span className="font-black text-[#064E3B] text-xl">{months} months</span>
          </div>
          <input 
            type="range" 
            min="6" 
            max="60" 
            step="6"
            value={months}
            onChange={(e) => setMonths(Number(e.target.value))}
            className="w-full h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-[#064E3B]"
          />
          <div className="flex justify-between text-xs font-bold text-gray-400">
            <span>6 months</span>
            <span>60 months</span>
          </div>
        </div>

        <div className="bg-[#DCFCE7] p-6 rounded-2xl flex justify-between items-center">
          <span className="font-bold text-[#064E3B]">Interest rate (%)</span>
          <span className="font-black text-[#064E3B]">{interestRate}%</span>
        </div>
        
        <button className="w-full bg-[#064E3B] text-white py-4 rounded-xl font-bold text-lg hover:bg-[#043d2e] transition-colors">
          Calculate Payment
        </button>
      </div>

      <div className="w-full md:w-[400px] aspect-square bg-gradient-to-br from-[#064E3B] to-[#043d2e] rounded-[32px] p-10 flex flex-col items-center justify-center text-center space-y-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#C6F4D6]/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
        
        <h4 className="text-white/80 font-bold text-lg">Monthly Payments</h4>
        <div className="space-y-1">
          <p className="text-white text-6xl font-black">${monthlyPayment}</p>
          <p className="text-white/60 font-medium">Estimated monthly payment</p>
        </div>
        
        <div className="pt-6 w-full space-y-4">
           <div className="flex justify-between text-sm">
             <span className="text-white/60 font-medium">Total Principal Paid</span>
             <span className="text-white font-bold">${amount.toLocaleString()}</span>
           </div>
           <div className="flex justify-between text-sm">
             <span className="text-white/60 font-medium">Total Interest Paid</span>
             <span className="text-white font-bold">${(monthlyPayment * months - amount).toFixed(2)}</span>
           </div>
        </div>
        
        <button className="text-[#C6F4D6] font-bold text-sm underline underline-offset-4 hover:text-white transition-colors">
          View your eligibility conditions
        </button>
      </div>
    </div>
  );
}
