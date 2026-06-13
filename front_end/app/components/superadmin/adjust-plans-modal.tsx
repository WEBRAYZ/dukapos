'use client';

import React from 'react';

interface AdjustPlansModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AdjustPlansModal: React.FC<AdjustPlansModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const currentPlans = [
    { name: 'Starter', price: '5,000', members: '2', skus: '100', branches: '1' },
    { name: 'Professional', price: '12,000', members: '10', skus: '1,000', branches: '3' },
    { name: 'Enterprise', price: '35,000', members: 'Unlimited', skus: 'Unlimited', branches: 'Unlimited' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-12 md:pt-20 overflow-y-auto custom-scrollbar">
      {/* Dimmed Background Overlay */}
      <div 
        className="fixed inset-0 bg-blue-950/40 backdrop-blur-sm transition-opacity duration-300" 
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="bg-white w-full max-w-4xl rounded-[2.5rem] shadow-2xl border border-blue-100 overflow-hidden relative z-10 animate-in fade-in slide-in-from-top-8 duration-500">
        <div className="bg-linear-to-l from-blue-800 to-blue-950 p-8 text-white relative overflow-hidden">
          <div className="relative z-10">
            <h3 className="text-2xl font-black uppercase tracking-tight">Adjust Revenue Tiers</h3>
            <p className="text-xs font-bold text-blue-200 uppercase mt-1">Modify global subscription pricing and feature sets</p>
          </div>
          <div className="absolute right-0 bottom-0 p-8 opacity-10 pointer-events-none translate-x-4 translate-y-4">
             <span className="text-8xl">💳</span>
          </div>
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-xl transition-all"
          >
            ✕
          </button>
        </div>

        <div className="p-8 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {currentPlans.map((plan) => (
              <div key={plan.name} className="p-5 rounded-sm bg-slate-50 border border-blue-100 space-y-4">
                <div className="flex justify-between items-center">
                  <h4 className="text-sm font-black text-blue-900 uppercase">{plan.name}</h4>
                  <span className="text-[10px] font-black text-blue-100 bg-blue-900 px-2 py-0.5 rounded uppercase">Active Tier</span>
                </div>
                
                <div className="space-y-3">
                  <div className="space-y-1">
                    <label className="text-[9px] font-black text-gray-500 uppercase tracking-widest">Monthly Price (KSh)</label>
                    <input 
                      type="text" 
                      defaultValue={plan.price}
                      className="w-full px-4 py-2 bg-white border border-blue-50 rounded-sm text-xs font-black text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-800/20 transition-all shadow-inner"
                    />
                  </div>
                  
                  <div className="space-y-1">
                    <label className="text-[9px] font-black text-gray-500 uppercase tracking-widest">Member Limit</label>
                    <input 
                      type="text" 
                      defaultValue={plan.members}
                      className="w-full px-4 py-2 bg-white border border-blue-50 rounded-sm text-xs font-black text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-800/20 transition-all shadow-inner"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[9px] font-black text-gray-500 uppercase tracking-widest">SKU Capacity</label>
                    <input 
                      type="text" 
                      defaultValue={plan.skus}
                      className="w-full px-4 py-2 bg-white border border-blue-50 rounded-sm text-xs font-black text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-800/20 transition-all shadow-inner"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[9px] font-black text-gray-500 uppercase tracking-widest">Branch Limit</label>
                    <input 
                      type="text" 
                      defaultValue={plan.branches}
                      className="w-full px-4 py-2 bg-white border border-blue-50 rounded-sm text-xs font-black text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-800/20 transition-all shadow-inner"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-yellow-50 p-4 rounded-sm border border-yellow-100 flex items-start space-x-3">
             <span className="text-xl">⚠️</span>
             <div className="space-y-1">
                <p className="text-[10px] font-black text-yellow-900 uppercase">Warning: Structural Revenue Change</p>
                <p className="text-[9px] font-bold text-yellow-700 uppercase">Updating these values will affect all future billing cycles. Current subscribers will remain on their legacy plans until their next renewal date or manual migration.</p>
             </div>
          </div>

          <div className="pt-6 border-t border-slate-50 flex gap-4">
            <button 
              onClick={onClose}
              className="flex-1 py-4 bg-slate-100 text-gray-600 rounded-sm text-[10px] font-black uppercase hover:bg-slate-200 transition-all"
            >
              Discard Changes
            </button>
            <button className="flex-2 py-4 bg-linear-to-l from-blue-800 to-blue-950 text-white rounded-sm text-[10px] font-black uppercase shadow-xl shadow-blue-900/20 hover:scale-[1.02] active:scale-95 transition-all">
              Update Subscription Schema →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdjustPlansModal;
