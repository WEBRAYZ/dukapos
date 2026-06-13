'use client';

import React from 'react';
import EditProfile from './editprofile';

interface CustomerDetailsProps {
  onBack: () => void;
}

const CustomerDetails: React.FC<CustomerDetailsProps> = ({ onBack }) => {
  const [isMessageOpen, setIsMessageOpen] = React.useState(false);
  const [isEmailOpen, setIsEmailOpen] = React.useState(false);
  const [isInvoiceOpen, setIsInvoiceOpen] = React.useState(false);
  const [isEditProfileOpen, setIsEditProfileOpen] = React.useState(false);

  React.useEffect(() => {
    if (isMessageOpen || isEmailOpen || isInvoiceOpen || isEditProfileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMessageOpen, isEmailOpen, isInvoiceOpen, isEditProfileOpen]);

  const customer = {
    initials: 'SC',
    name: 'Sophia Chen',
    email: 'sophia.chen@email.com',
    phone: '+254 701 489 201',
    status: 'Active',
    tier: 'Gold',
    purchases: 84,
    totalValue: 234000,
    dob: 'March 14, 1991',
    address: '48 Elm Street, Nairobi',
    since: 'January 8, 2024',
    branch: 'Main Branch',
    loyaltyPoints: 4820,
    nextTierPoints: 5000,
    redeemable: 4820,
    creditLimit: 50000,
    creditUsed: 19250,
    overdueAmount: 19250,
    overdueDate: 'May 6',
  };

  const history = [
    { id: '#INV-8841', date: 'May 30, 2026', items: 3, amount: 6240, payment: 'Card', status: 'Paid' },
    { id: '#INV-8790', date: 'May 22, 2026', items: 5, amount: 11820, payment: 'Cash', status: 'Paid' },
    { id: '#INV-8741', date: 'May 14, 2026', items: 2, amount: 3480, payment: 'Card', status: 'Paid' },
    { id: '#INV-8690', date: 'May 06, 2026', items: 7, amount: 19250, payment: 'Credit', status: 'Overdue' },
    { id: '#INV-8620', date: 'Apr 28, 2026', items: 4, amount: 8800, payment: 'Card', status: 'Paid' },
  ];

  return (
    <div className="space-y-4 md:space-y-4">
      {/* Header Actions */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center space-x-3">
          <button 
            onClick={onBack}
            className="w-8 h-8 md:w-8 md:h-8 bg-linear-to-l from-blue-800 to-blue-950 border border-blue-100 rounded-sm flex items-center justify-center text-slate-600 hover:text-blue-900 transition-all shadow-sm active:scale-95"
          >
            ←
          </button>
          <div>
            <h2 className="text-lg md:text-lg font-black text-blue-800 uppercase">{customer.name}</h2>
            <p className="text-[10px] md:text-xs font-bold text-slate-600 uppercase">Profile & history</p>
          </div>
        </div>
        <div className="flex items-center space-x-3 w-full md:w-auto">
          <button className="flex-1 md:flex-none px-4 md:px-6 py-3 bg-slate-200 border border-blue-100 text-blue-800 hover:text-blue-800 rounded-sm font-black text-[9px] md:text-[10px] uppercase transition-all shadow-sm">
            Print Profile
          </button>
          <button 
            onClick={() => setIsEditProfileOpen(true)}
            className="flex-1 md:flex-none px-6 md:px-8 py-3 bg-linear-to-l from-blue-800 to-blue-950 text-white rounded-sm font-black text-[9px] md:text-[10px] uppercase hover:bg-blue-950 transition-all shadow-lg shadow-blue-900/20"
          >
            Edit Profile
          </button>
        </div>
      </div>

      {/* Profile Overview Card */}
      <div className="bg-white p-3 md:p-5 rounded-sm md:rounded-sm border border-blue-100 shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left space-y-3 sm:space-y-0 sm:space-x-4">
            <div className="w-12 h-12 md:w-14 md:h-14 rounded-sm bg-blue-50 text-blue-900 flex items-center justify-center text-4xl font-black shadow-inner">
              {customer.initials}
            </div>
            <div className="space-y-2">
              <h3 className="text-lg md:text-lg font-black text-blue-800 uppercase">{customer.name}</h3>
              <div className="flex flex-wrap justify-center sm:justify-start items-center gap-x-2 text-xs font-bold text-slate-700 uppercase">
                <span>{customer.email}</span>
                <span className="hidden sm:inline w-1 h-1 bg-blue-300 rounded-full"></span>
                <span>{customer.phone}</span>
              </div>
              <div className="flex flex-wrap justify-center sm:justify-start items-center gap-2">
                <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-[10px] font-black uppercase flex items-center border border-yellow-200 shadow-sm">
                  <span className="mr-1.5 text-xs">⭐</span> {customer.tier} Tier
                </span>
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-[10px] font-black uppercase flex items-center border border-green-200 shadow-sm">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2"></span>
                  {customer.status}
                </span>
              </div>
            </div>
          </div>
          
          <div className="flex flex-wrap justify-center lg:justify-end items-center gap-3 md:gap-3">
            <button 
              onClick={() => setIsMessageOpen(true)}
              className="flex-1 sm:flex-none px-6 py-4 bg-slate-100 hover:bg-slate-200 text-blue-900 rounded-sm text-[10px] font-black uppercase transition-all border border-blue-100"
            >
              Message
            </button>
            <button 
              onClick={() => setIsEmailOpen(true)}
              className="flex-1 sm:flex-none px-6 py-4 bg-slate-100 hover:bg-slate-200 text-blue-900 rounded-sm text-[10px] font-black uppercase transition-all border border-blue-100"
            >
              Email
            </button>
            <button 
              onClick={() => setIsInvoiceOpen(true)}
              className="w-full sm:w-auto px-8 py-4 bg-blue-100 hover:bg-blue-200 text-blue-900 rounded-sm text-[10px] font-black uppercase transition-all border border-blue-100 shadow-md"
            >
              Create Invoice
            </button>
          </div>
        </div>
      </div>

      {/* Invoice Modal */}
      {isInvoiceOpen && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-3">
          <div 
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300"
            onClick={() => setIsInvoiceOpen(false)}
          />
          <div className="relative w-full max-w-4xl bg-white rounded-sm shadow-sm overflow-hidden flex flex-col animate-in zoom-in-95 slide-in-from-bottom-8 duration-500 border border-blue-100">
            <div className="bg-white border-b border-blue-100 p-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-50 text-blue-900 rounded-sm flex items-center justify-center text-xl font-black shadow-inner border border-blue-100">
                  📄
                </div>
                <div>
                  <h3 className="text-lg font-black text-slate-800 uppercase ">Generate New Invoice</h3>
                  <p className="text-[10px] font-bold text-slate-600 uppercase">Billing to: {customer.name}</p>
                </div>
              </div>
              <button onClick={() => setIsInvoiceOpen(false)} className="w-10 h-10 rounded-full bg-slate-100 text-slate-600 hover:text-slate-800 hover:bg-slate-200 transition-all flex items-center justify-center">✕</button>
            </div>

            <div className="p-4 space-y-4 overflow-y-auto custom-scrollbar bg-slate-50/30 max-h-[70vh]">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2 text-left">
                  <label className="text-[11px] font-black text-slate-600 uppercase  ml-1">Invoice Number</label>
                  <input type="text" value="#INV-2026-0085" readOnly className="w-full px-4 py-4 bg-slate-100 border border-blue-100 rounded-sm text-[11px] font-black text-slate-600 cursor-not-allowed outline-none uppercase" />
                </div>
                <div className="space-y-2 text-left">
                  <label className="text-[11px] font-black text-slate-600 uppercase ml-1">Issue Date</label>
                  <input type="text" value="June 07, 2026" readOnly className="w-full px-4 py-4 bg-slate-100 border border-blue-100 rounded-sm text-[11px] font-black text-gray-500 cursor-not-allowed outline-none uppercase" />
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between px-1">
                   <h4 className="text-[11px] font-black text-slate-800 uppercase">Line Items</h4>
                   <button className="text-[10px] font-black text-blue-600 uppercase hover:underline">+ Add Product</button>
                </div>
                
                <div className="bg-white border border-blue-100 rounded-sm overflow-hidden shadow-sm">
                  <table className="w-full text-left border-collapse">
                    <thead className="bg-slate-50/50">
                      <tr>
                        <th className="px-4 py-4 text-[10px] font-black text-blue-600 uppercase">Item Description</th>
                        <th className="px-4 py-4 text-[10px] font-black text-blue-600 uppercase text-center">Qty</th>
                        <th className="px-4 py-4 text-[10px] font-black text-blue-600 uppercase text-right">Unit Price</th>
                        <th className="px-4 py-4 text-[10px] font-black text-blue-600 uppercase text-right">Total</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      <tr>
                        <td className="px-4 py-4">
                          <input type="text" placeholder="Start typing product name..." className="w-full bg-slate-100 p-3 border-none text-[11px] font-bold text-slate-800 focus:ring-0 uppercase" />
                        </td>
                        <td className="px-4 py-4 text-center">
                          <input type="number" defaultValue={1} className="w-14 bg-slate-100 border border-blue-100 rounded-sm text-[11px] font-black text-center p-2 focus:outline-none focus:border-blue-500" />
                        </td>
                        <td className="px-4 py-4 text-right font-black text-slate-600 text-[11px]">KSh 0.00</td>
                        <td className="px-4 py-4 text-right font-black text-blue-600 text-[11px]">KSh 0.00</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="flex flex-col items-end space-y-3 pt-3 pr-3">
                <div className="flex items-center space-x-12">
                   <span className="text-[11px] font-black text-slate-600 uppercase">Subtotal</span>
                   <span className="text-sm font-black text-slate-800">KSh 0.00</span>
                </div>
                <div className="flex items-center space-x-12">
                   <span className="text-[11px] font-black text-slate-600 uppercase">Tax (16%)</span>
                   <span className="text-sm font-black text-slate-800">KSh 0.00</span>
                </div>
                <div className="flex items-center space-x-12 pt-3 border-t border-blue-100">
                   <span className="text-[12px] font-black text-blue-900 uppercase">Grand Total</span>
                   <span className="text-xl font-black text-blue-600 uppercase ">KSh 0.00</span>
                </div>
              </div>
            </div>

            <div className="p-4 bg-white border-t border-blue-100 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="draft" className="w-4 h-4 border-blue-300 text-blue-600 focus:ring-blue-500" />
                  <label htmlFor="draft" className="text-[10px] font-black text-slate-600 uppercase cursor-pointer">Save as Draft</label>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <button onClick={() => setIsInvoiceOpen(false)} className="px-8 py-4 bg-slate-100 text-blue-700 rounded-sm text-[10px] font-black uppercase hover:bg-slate-200 transition-all active:scale-95">Cancel</button>
                <button className="px-8 py-3 bg-linear-to-l from-blue-800 to-blue-950 text-white rounded-sm flex items-center space-x-3 shadow-sm shadow-blue-900/20 hover:bg-blue-800 transition-all active:scale-95 group">
                  <span className="text-[10px] font-black uppercase">Finalize Invoice</span>
                  <span className="group-hover:translate-x-1 transition-transform">✓</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Email Modal */}
      {isEmailOpen && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-3">
          <div 
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300"
            onClick={() => setIsEmailOpen(false)}
          />
          <div className="relative w-full max-w-2xl bg-white rounded-sm shadow-sm overflow-hidden flex flex-col animate-in zoom-in-95 slide-in-from-bottom-8 duration-500 border border-blue-100">
            <div className="bg-white border-b border-blue-100 p-4 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-sm flex items-center justify-center text-xl font-black shadow-inner border border-blue-100">
                  ✉️
                </div>
                <div>
                  <h3 className="text-lg font-black text-slate-800 uppercase">Compose Email</h3>
                  <p className="text-[10px] font-bold text-slate-600 uppercase">Recipient: {customer.email}</p>
                </div>
              </div>
              <button onClick={() => setIsEmailOpen(false)} className="w-10 h-10 rounded-full bg-slate-100 text-slate-600 hover:text-slate-800 hover:bg-slate-200 transition-all flex items-center justify-center">✕</button>
            </div>

            <div className="p-4 space-y-3 overflow-y-auto custom-scrollbar bg-slate-50/30">
              <div className="space-y-2">
                <label className="text-[11px] font-black text-slate-600 uppercase ml-1">Subject Line</label>
                <input 
                  type="text" 
                  placeholder="Enter email subject..." 
                  className="w-full px-4 py-4 bg-slate-100 border border-blue-100 rounded-sm text-[11px] font-black text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400 transition-all uppercase"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-black text-slate-600 uppercase ml-1">Message Body</label>
                <textarea 
                  rows={8}
                  placeholder="Write your professional message here..." 
                  className="w-full px-4 py-4 bg-slate-100 border border-blue-100 rounded-sm text-[11px] font-black text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400 transition-all uppercase resize-none custom-scrollbar"
                ></textarea>
              </div>

              <div className="flex items-center space-x-3 pt-2">
                <button className="flex items-center space-x-2 px-4 py-2 bg-slate-100 border border-blue-100 rounded-full text-[10px] font-black text-slate-600 uppercase hover:text-blue-900 transition-all">
                  <span>📎</span> <span>Attach Files</span>
                </button>
                <button className="flex items-center space-x-2 px-4 py-2 bg-slate-100 border border-gray-100 rounded-full text-[10px] font-black text-slate-600 uppercase hover:text-blue-900 transition-all">
                  <span>🖼️</span> <span>Insert Image</span>
                </button>
              </div>
            </div>

            <div className="p-4 bg-white border-t border-blue-100 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
                <p className="text-[10px] font-black text-slate-700">Enterprise SMTP Gateway Active</p>
              </div>
              <button className="px-10 py-4 bg-linear-to-l from-blue-800 to-blue-950 text-white rounded-sm flex items-center space-x-3 shadow-xl shadow-blue-900/20 hover:bg-blue-800 transition-all active:scale-95 group">
                <span className="text-[10px] font-black uppercase">Send Email</span>
                <span className="group-hover:translate-x-1 transition-transform"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg></span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Messaging Modal */}
      {isMessageOpen && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-3">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300"
            onClick={() => setIsMessageOpen(false)}
          />
          
          {/* Modal Content */}
          <div className="relative w-full max-w-xl bg-white rounded-sm shadow-sm overflow-hidden flex flex-col animate-in zoom-in-95 slide-in-from-bottom-8 duration-500 border border-blue-100">
            {/* Header */}
            <div className="bg-white border-b border-blue-100 p-4 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <div className="w-12 h-12 bg-blue-50 text-blue-900 rounded-sm flex items-center justify-center text-xl font-black shadow-inner border border-blue-100">
                    {customer.initials}
                  </div>
                  <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></span>
                </div>
                <div>
                  <h3 className="text-lg font-black text-slate-800 uppercase">{customer.name}</h3>
                  <div className="flex items-center text-[10px] font-bold text-slate-600 uppercase">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1.5"></span>
                    Connected • Direct Message
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setIsMessageOpen(false)}
                className="w-10 h-10 rounded-full bg-slate-100 text-slate-600 hover:text-slate-700 hover:bg-slate-200 transition-all flex items-center justify-center"
              >
                ✕
              </button>
            </div>

            {/* Message Body */}
            <div className="h-[400px] overflow-y-auto p-4 bg-slate-50/50 space-y-4 custom-scrollbar">
              <div className="flex flex-col items-center">
                <div className="px-4 py-1.5 bg-white border border-blue-100 rounded-full text-[10px] font-black text-slate-600 uppercase mb-4">
                  End-to-end encrypted
                </div>
              </div>

              {/* Incoming Message Example */}
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-blue-50 text-blue-900 rounded-lg shrink-0 flex items-center justify-center text-[10px] font-black border border-blue-100">
                  {customer.initials}
                </div>
                <div className="space-y-1.5 max-w-[80%]">
                  <div className="bg-white p-3 rounded-2xl rounded-tl-none shadow-sm border border-blue-100">
                    <p className="text-xs font-bold text-slate-700 uppercase">
                      Hi, I was checking on my overdue invoice #INV-8690. Can I pay via M-Pesa today?
                    </p>
                  </div>
                  <p className="text-[10px] font-black text-slate-600 uppercase ml-1">9:14 AM</p>
                </div>
              </div>
            </div>

            {/* Input Area */}
            <div className="p-3 bg-white border-t border-blue-100">
              <div className="flex items-center space-x-3">
                <div className="flex-1 relative">
                  <input 
                    type="text" 
                    placeholder="Type your message here..." 
                    className="w-full px-5 py-4 bg-slate-100 border border-blue-100 rounded-sm text-[11px] font-black text-gray-800 focus:outline-none focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500/20 transition-all duration-300 uppercase"
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center space-x-2">
                    <button className="text-gray-400 hover:text-blue-900 transition-colors">📎</button>
                    <button className="text-gray-400 hover:text-blue-900 transition-colors">😊</button>
                  </div>
                </div>
                <button className="w-12 h-12 bg-linear-to-l from-blue-800 to-blue-950 text-white rounded-sm flex items-center justify-center shadow-xl shadow-blue-900/20 hover:bg-blue-900 transition-all active:scale-95">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </button>
              </div>
              <div className="mt-4 flex justify-center">
                <p className="text-[10px] font-black text-slate-700 uppercase">Enterprise Messaging Protocol Active</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Profile Modal */}
      <EditProfile 
        isOpen={isEditProfileOpen} 
        onClose={() => setIsEditProfileOpen(false)} 
        customer={customer} 
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-4">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-4 md:space-y-4">
          {/* Contact Information */}
          <div className="bg-white p-4 md:p-4 rounded-sm md:rounded-sm border border-blue-100 shadow-xl">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-blue-100">
              <h3 className="text-sm font-black text-blue-800 uppercase">Detailed Information</h3>
              <button 
                onClick={() => setIsEditProfileOpen(true)}
                className="text-[10px] font-black text-blue-900 uppercase hover:underline"
              >
                Edit
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-4">
              {[
                { label: 'Full Name', value: customer.name },
                { label: 'Email Address', value: customer.email },
                { label: 'Phone Number', value: customer.phone },
                { label: 'Date of Birth', value: customer.dob },
                { label: 'Physical Address', value: customer.address },
                { label: 'Member Since', value: customer.since },
                { label: 'Assigned Branch', value: customer.branch },
              ].map((info) => (
                <div key={info.label} className="space-y-1.5">
                  <p className="text-[10px] font-black text-slate-600 uppercase">{info.label}</p>
                  <p className="text-sm font-bold text-slate-900 uppercase">{info.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Purchase History */}
          <div className="bg-white rounded-sm md:rounded-sm border border-blue-100 shadow-xl overflow-hidden flex flex-col">
            <div className="p-4 md:p-4 border-b border-blue-50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-sm font-black text-blue-800 uppercase">Transaction History</h3>
                <p className="text-[10px] font-bold text-slate-600 uppercase">
                  {customer.purchases} sales · KSh {customer.totalValue.toLocaleString()} LTV
                </p>
              </div>
              <button className="text-[10px] font-black text-blue-900 uppercase hover:underline text-left sm:text-right">
                View Reports
              </button>
            </div>
            <div className="overflow-x-auto no-scrollbar custom-scrollbar">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/50">
                    <th className="px-4 md:px-4 py-3 text-[10px] font-black text-slate-900 uppercase whitespace-nowrap">Invoice</th>
                    <th className="px-4 md:px-4 py-3 text-[10px] font-black text-slate-900 uppercase whitespace-nowrap">Date</th>
                    <th className="px-4 md:px-4 py-3 text-[10px] font-black text-slate-900 uppercase hidden sm:table-cell">Items</th>
                    <th className="px-4 md:px-4 py-3 text-[10px] font-black text-slate-900 uppercase">Amount</th>
                    <th className="px-4 md:px-4 py-3 text-[10px] font-black text-slate-900 uppercase">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {history.map((inv, i) => (
                    <tr key={i} className="hover:bg-slate-50/30 transition-colors">
                      <td className="px-4 md:px-4 py-3 text-xs font-black text-blue-900 uppercase whitespace-nowrap">{inv.id}</td>
                      <td className="px-4 md:px-4 py-3 text-[11px] font-bold text-slate-600 uppercase whitespace-nowrap">{inv.date || '—'}</td>
                      <td className="px-4 md:px-4 py-3 text-xs font-bold text-slate-600 uppercase hidden sm:table-cell">{inv.items} items</td>
                      <td className="px-4 md:px-4 py-3 text-sm font-black text-slate-800 whitespace-nowrap">KSh {inv.amount.toLocaleString()}</td>
                      <td className="px-4 md:px-4 py-3">
                        <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase border ${
                          inv.status === 'Paid' ? 'bg-green-100 text-green-700 border-green-200' : 'bg-red-100 text-red-700 border-red-200'
                        }`}>
                          {inv.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-3 md:space-y-4">
          {/* Loyalty & Rewards */}
          <div className="bg-linear-to-t from-blue-800 to-blue-950 p-4 md:p-4 rounded-sm md:rounded-sm shadow-sm text-white relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none group-hover:scale-125 transition-transform duration-1000">
              <span className="text-6xl text-green-600">⭐</span>
            </div>
            <h3 className="text-sm font-black uppercase mb-4 border-b border-white/10 pb-5">Loyalty Rewards</h3>
            
            <div className="space-y-3 relative z-10">
              <div className="text-center">
                <p className="text-2xl font-black">{customer.loyaltyPoints.toLocaleString()}</p>
                <p className="text-[10px] font-bold text-white/50 uppercase">Accumulated Points</p>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center text-[10px] font-black uppercase">
                  <span className="text-blue-300">Progress to Next Tier</span>
                  <span>{Math.round((customer.loyaltyPoints / customer.nextTierPoints) * 100)}%</span>
                </div>
                <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-green-600 rounded-full shadow-lg shadow-yellow-400/50"
                    style={{ width: `${(customer.loyaltyPoints / customer.nextTierPoints) * 100}%` }}
                  />
                </div>
                <p className="text-[10px] font-bold text-slate-300 text-center uppercase">
                  Only {customer.nextTierPoints - customer.loyaltyPoints} points left for Platinum upgrade
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white/5 p-3 rounded-sm border border-white/5 text-center">
                  <p className="text-[10px] font-black text-slate-200 uppercase">Value</p>
                  <p className="text-xs font-black text-green-600">KSh {customer.redeemable.toLocaleString()}</p>
                </div>
                <div className="bg-white/5 p-3 rounded-sm border border-white/5 text-center">
                  <p className="text-[10px] font-black text-slate-200 uppercase">Status</p>
                  <p className="text-xs font-black text-blue-400 uppercase">{customer.status}</p>
                </div>
              </div>

              <button className="w-full py-5 bg-linear-to-l from-blue-500 to-blue-700 hover:bg-blue-950 rounded-sm text-[10px] font-black uppercase tracking-[0.3em] transition-all shadow-xl shadow-orange-950/20 active:scale-95">
                Redeem Rewards
              </button>
            </div>
          </div>

          {/* Monthly Spend */}
          <div className="bg-white p-4 md:p-4 rounded-sm md:rounded-sm border border-blue-100 shadow-sm">
            <h3 className="text-sm font-black text-slate-800 uppercase mb-1">Spending Trends</h3>
            <p className="text-[10px] font-bold text-gray-400 uppercase">Historical analytics</p>
            
            <div className="flex items-end justify-between h-30 gap-3 md:gap-3 px-2">
              {[
                { m: 'Dec', v: 40 }, { m: 'Jan', v: 30 }, { m: 'Feb', v: 60 },
                { m: 'Mar', v: 45 }, { m: 'Apr', v: 70 }, { m: 'May', v: 85 }
              ].map((d) => (
                <div key={d.m} className="flex-1 flex flex-col items-center group">
                  <div 
                    className={`w-full rounded-t-sm transition-all duration-500 relative ${d.m === 'May' ? '#1e40af shadow-lg shadow-blue-200' : 'bg-gray-100 hover:bg-blue-100'}`}
                    style={{ height: `${d.v}%` }}
                  >
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-[8px] font-black py-1 px-1.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      {d.v}%
                    </div>
                  </div>
                  <span className="text-[9px] font-black text-gray-400 uppercase mt-3">{d.m}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Credit Account */}
          <div className="bg-white p-4 md:p-4 rounded-sm md:rounded-sm border border-blue-100 shadow-xl space-y-3">
            <h3 className="text-sm font-black text-blue-800 uppercase border-b border-blue-50">Credit Status</h3>
            
            <div className="space-y-3">
              <div className="flex justify-between items-end">
                <span className="text-[10px] font-bold text-slate-700 uppercase">Allowed Limit</span>
                <span className="text-base font-black text-slate-800">KSh {customer.creditLimit.toLocaleString()}</span>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center text-[10px] font-black uppercase">
                  <span className="text-blue-500">Used: {Math.round((customer.creditUsed / customer.creditLimit) * 100)}%</span>
                  <span className="text-green-600">KSh {(customer.creditLimit - customer.creditUsed).toLocaleString()} Free</span>
                </div>
                <div className="w-full h-2 bg-slate-50 rounded-full overflow-hidden border border-blue-100">
                  <div 
                    className="h-full bg-blue-400 rounded-full"
                    style={{ width: `${(customer.creditUsed / customer.creditLimit) * 100}%` }}
                  />
                </div>
              </div>

              <div className="bg-red-50 p-4 rounded-sm border border-red-100 flex items-start space-x-4">
                <span className="text-xl">⚠️</span>
                <div>
                  <p className="text-[10px] font-black text-red-700 uppercase">
                    Payment Overdue
                  </p>
                  <p className="text-[11px] font-bold text-red-500 uppercase">
                    KSh {customer.overdueAmount.toLocaleString()} since {customer.overdueDate}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerDetails;
