'use client';

import React from 'react';

/**
 * SupplierInvoices Component
 * 
 * Manages vendor invoices, tracking payment status and outstanding balances.
 */
const SupplierInvoices = () => {
  const invoices = [
    { id: 'INV-0291', supplier: 'TechWorld Distributors', poRef: 'PO-2024-087', amount: 'KSh 312,400', dueDate: '05 Jun 2024', status: 'Unpaid' },
    { id: 'INV-0290', supplier: 'Nairobi General Supplies', poRef: 'PO-2024-086', amount: 'KSh 54,000', dueDate: '29 May 2024', status: 'Overdue' },
    { id: 'INV-0289', supplier: 'Eastleigh Wholesale Hub', poRef: 'PO-2024-085', amount: 'KSh 78,600', dueDate: '20 May 2024', status: 'Paid' },
    { id: 'INV-0288', supplier: 'Mombasa Traders Ltd', poRef: 'PO-2024-084', amount: 'KSh 145,200', dueDate: '18 May 2024', status: 'Paid' },
  ];

  const summary = [
    { label: 'Total Outstanding', value: 'KSh 366,400', color: 'text-gray-800' },
    { label: 'Overdue (3)', value: 'KSh 124,500', color: 'text-red-500' },
    { label: 'Due This Week', value: 'KSh 241,900', color: 'text-orange-600' },
    { label: 'Paid This Month', value: 'KSh 223,800', color: 'text-olive' },
  ];

  return (
    <div className="flex flex-col md:flex-row gap-6 h-full overflow-hidden">
      
      {/* INVOICE LEDGER */}
      <div className="flex-1 flex flex-col bg-white rounded-[32px] border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-50 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-black text-gray-800 uppercase tracking-widest">Supplier Invoices</h3>
              <p className="text-[10px] font-bold text-gray-400 uppercase mt-0.5">24 invoices total</p>
            </div>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xs">⌕</span>
              <input 
                type="text" 
                placeholder="Search invoices…" 
                className="pl-10 pr-4 py-2 bg-gray-50 border-none rounded-xl text-[10px] font-bold w-48 focus:ring-2 focus:ring-olive/10 outline-none uppercase"
              />
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar">
          <table className="w-full text-left border-collapse">
            <thead className="sticky top-0 bg-white/95 backdrop-blur-sm z-10">
              <tr className="border-b border-gray-50 text-[9px] font-black text-gray-400 uppercase tracking-widest">
                <th className="px-6 py-4">Invoice No.</th>
                <th className="px-6 py-4">Supplier</th>
                <th className="px-6 py-4">PO Ref</th>
                <th className="px-6 py-4 text-right">Amount</th>
                <th className="px-6 py-4">Due Date</th>
                <th className="px-6 py-4 text-center">Status</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {invoices.map((inv) => (
                <tr key={inv.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4 text-xs font-black text-gray-800">{inv.id}</td>
                  <td className="px-6 py-4 text-xs font-black text-olive uppercase">{inv.supplier}</td>
                  <td className="px-6 py-4 text-xs font-bold text-gray-400 uppercase font-mono">{inv.poRef}</td>
                  <td className="px-6 py-4 text-xs font-black text-gray-800 text-right">{inv.amount}</td>
                  <td className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">{inv.dueDate}</td>
                  <td className="px-6 py-4 text-center">
                    <span className={`text-[9px] font-black px-2 py-0.5 rounded uppercase ${
                      inv.status === 'Paid' ? 'bg-green-100 text-green-700' : 
                      inv.status === 'Overdue' ? 'bg-red-100 text-red-700' : 'bg-orange-100 text-orange-700'
                    }`}>
                      {inv.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    {inv.status !== 'Paid' && (
                      <button className="bg-olive text-white px-4 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest hover:bg-olive transition-all shadow-sm">
                        Pay Now
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* INVOICE SUMMARY SIDEBAR */}
      <div className="w-full md:w-80 flex flex-col space-y-6 shrink-0">
        <div className="bg-white rounded-[40px] border border-gray-100 shadow-xl p-8 space-y-8">
          <h3 className="text-sm font-black text-gray-800 uppercase tracking-[0.2em]">Invoice Summary</h3>
          
          <div className="space-y-6">
            {summary.map((item) => (
              <div key={item.label} className="flex justify-between items-end border-b border-gray-50 pb-4 last:border-0 last:pb-0">
                <div>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{item.label}</p>
                  <p className={`text-lg font-black ${item.color}`}>{item.value}</p>
                </div>
              </div>
            ))}
          </div>

          <button className="w-full py-4 bg-orange-500 hover:bg-orange-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-md shadow-orange-100 transition-all active:scale-95 flex items-center justify-center space-x-2">
            <span>📱</span>
            <span>Pay All Overdue via M-Pesa</span>
          </button>
        </div>

        <div className="p-6 bg-olive rounded-[32px] text-white/90 shadow-lg relative overflow-hidden">
           <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full -mr-12 -mt-12"></div>
           <p className="text-[10px] font-black uppercase tracking-widest mb-2">Pro Tip</p>
           <p className="text-[11px] font-bold leading-relaxed italic">
             &quot;Early payments to Eastleigh Wholesale Hub often result in 2% trade discounts.&quot;
           </p>
        </div>
      </div>

    </div>
  );
};

export default SupplierInvoices;
