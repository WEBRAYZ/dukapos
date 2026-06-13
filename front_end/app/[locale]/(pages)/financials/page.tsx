'use client';

import React, { useState, useEffect, useMemo } from 'react';
import BaseNavbar from '@/app/components/shared/BaseNavbar';
import { api } from '@/lib/api';

interface Summary {
  total_revenue: string;
  total_expenses: string;
  net_profit: string;
  profit_margin: number;
  monthly_data: { month: string, income: string, expense: string }[];
}

interface Expense {
  id: number;
  description: string;
  amount: string;
  date: string;
  category_name: string;
}

const FinancialsPage = () => {
  const [summary, setSummary] = useState<Summary | null>(null);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [sumData, expData] = await Promise.all([
          api.get<Summary>('/finance/summary/'),
          api.get<Expense[]>('/finance/expenses/')
        ]);
        setSummary(sumData);
        setExpenses(expData);
      } catch (err) {
        console.error('Failed to fetch financial data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const financialStats = useMemo(() => {
    if (!summary) return [];
    return [
      { name: 'Total Revenue', value: `KSh ${parseFloat(summary.total_revenue).toLocaleString()}`, icon: '📈', color: 'text-green-600', bgColor: 'bg-green-50' },
      { name: 'Total Expenses', value: `KSh ${parseFloat(summary.total_expenses).toLocaleString()}`, icon: '📉', color: 'text-red-600', bgColor: 'bg-red-50' },
      { name: 'Net Profit', value: `KSh ${parseFloat(summary.net_profit).toLocaleString()}`, icon: '💰', color: 'text-blue-800', bgColor: 'bg-blue-50' },
      { name: 'Profit Margin', value: `${summary.profit_margin.toFixed(1)}%`, icon: '🎯', color: 'text-orange-600', bgColor: 'bg-orange-50' },
    ];
  }, [summary]);

  if (loading) {
      return (
          <div className="flex flex-col h-full bg-blue-50 items-center justify-center">
            <div className="w-12 h-12 border-4 border-blue-900 border-t-transparent rounded-full animate-spin" />
            <p className="mt-4 text-xs font-black text-blue-900 uppercase tracking-widest">Compiling Books...</p>
          </div>
      );
  }

  return (
    <div className="flex flex-col h-full bg-blue-50 overflow-hidden">
      <BaseNavbar 
        title="Financials" 
        subtitle="Revenue & Expenses" 
        icon="📉" 
      />
      
      <div className="flex-1 overflow-y-auto custom-scrollbar p-4 md:p-6 lg:p-8">
        <div className="space-y-6">
          {/* Financial Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {financialStats.map((stat) => (
              <div key={stat.name} className="bg-white p-5 rounded-sm border border-blue-100 shadow-sm hover:shadow-md transition-all group relative overflow-hidden">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-none mb-1.5">{stat.name}</p>
                    <p className="text-xl font-black text-blue-900">{stat.value}</p>
                  </div>
                  <div className={`p-3 rounded-sm ${stat.bgColor} ${stat.color} text-xl transition-transform group-hover:scale-110 shadow-inner`}>
                    {stat.icon}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Expenses Table */}
            <div className="lg:col-span-2 bg-white rounded-sm border border-blue-100 shadow-sm overflow-hidden flex flex-col">
              <div className="p-5 border-b border-blue-50 flex items-center justify-between bg-slate-50/50">
                <h3 className="text-xs font-black text-blue-900 uppercase tracking-widest">Recent Expenses</h3>
                <button className="px-4 py-2 bg-blue-900 text-white rounded-sm font-black text-[10px] uppercase tracking-widest hover:bg-blue-800 transition-all shadow-lg shadow-blue-900/20">
                  + Add Expense
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50/30 border-b border-blue-50">
                      <th className="px-6 py-4 text-[10px] font-black text-blue-900 uppercase tracking-widest">Description</th>
                      <th className="px-6 py-4 text-[10px) font-black text-blue-900 uppercase tracking-widest">Category</th>
                      <th className="px-6 py-4 text-[10px] font-black text-blue-900 uppercase tracking-widest text-right">Amount</th>
                      <th className="px-6 py-4 text-[10px] font-black text-blue-900 uppercase tracking-widest text-right">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {expenses.map((expense) => (
                      <tr key={expense.id} className="hover:bg-blue-50/30 transition-colors">
                        <td className="px-6 py-4">
                          <span className="text-xs font-black text-blue-900 uppercase tracking-tight">{expense.description}</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="px-2 py-0.5 bg-slate-100 text-slate-500 rounded text-[8px] font-black uppercase tracking-widest border border-slate-200">
                            {expense.category_name}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm font-black text-red-500 text-right">
                          KSh {parseFloat(expense.amount).toLocaleString()}
                        </td>
                        <td className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase text-right">
                          {new Date(expense.date).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                    {expenses.length === 0 && (
                        <tr>
                            <td colSpan={4} className="py-20 text-center font-black uppercase text-slate-400">No expense records found</td>
                        </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Cash Flow Visualisation */}
            <div className="bg-white p-6 rounded-sm border border-blue-100 shadow-sm flex flex-col">
              <h3 className="text-xs font-black text-blue-900 uppercase tracking-widest mb-8 border-b border-blue-50 pb-3">Cash Flow</h3>
              <div className="flex-1 flex items-end justify-between px-2 gap-1.5 pb-2">
                {summary?.monthly_data.map((m) => {
                  const income = parseFloat(m.income);
                  const expense = parseFloat(m.expense);
                  const maxVal = Math.max(...summary.monthly_data.map(d => Math.max(parseFloat(d.income), parseFloat(d.expense)))) || 1;
                  
                  return (
                    <div key={m.month} className="flex-1 flex flex-col items-center gap-2">
                      <div className="w-full flex items-end justify-center gap-0.5 h-48">
                        <div className="w-1.5 bg-blue-900 rounded-t-sm transition-all duration-1000" style={{ height: `${(income/maxVal)*100}%` }}></div>
                        <div className="w-1.5 bg-blue-300 rounded-t-sm transition-all duration-1000" style={{ height: `${(expense/maxVal)*100}%` }}></div>
                      </div>
                      <span className="text-[8px] font-black text-slate-400 uppercase tracking-tighter">{m.month}</span>
                    </div>
                  );
                })}
              </div>
              <div className="flex items-center justify-center space-x-6 mt-6 pt-6 border-t border-blue-50">
                <div className="flex items-center space-x-2">
                  <div className="w-2.5 h-2.5 bg-blue-900 rounded-full"></div>
                  <span className="text-[9px] font-black text-slate-500 uppercase">Income</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2.5 h-2.5 bg-blue-300 rounded-full"></div>
                  <span className="text-[9px] font-black text-slate-500 uppercase">Expense</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinancialsPage;

