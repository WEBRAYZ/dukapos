'use client';

import React from 'react';

interface TierDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  plan: {
    name: string;
    price: string;
    tenants: number;
    features: string[];
  } | null;
}

const TierDetailsModal: React.FC<TierDetailsModalProps> = ({ isOpen, onClose, plan }) => {
  if (!isOpen || !plan) return null;

  const technicalSpecs = {
    'Starter': {
      storage: '5 GB Shared',
      apiCalls: '10,000 / day',
      support: 'Email Only',
      uptime: '99.5%',
      backup: 'Weekly'
    },
    'Professional': {
      storage: '50 GB Dedicated',
      apiCalls: '100,000 / day',
      support: 'Priority Email & Chat',
      uptime: '99.9%',
      backup: 'Daily'
    },
    'Enterprise': {
      storage: '1 TB Dedicated',
      apiCalls: 'Unlimited',
      support: '24/7 Dedicated Account Manager',
      uptime: '99.99% SLA',
      backup: 'Real-time Redundancy'
    }
  }[plan.name as 'Starter' | 'Professional' | 'Enterprise'] || technicalSpecs['Starter'];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-12 md:pt-20 overflow-y-auto custom-scrollbar">
      {/* Dimmed Background Overlay */}
      <div 
        className="fixed inset-0 bg-blue-950/40 backdrop-blur-sm transition-opacity duration-300" 
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl border border-blue-100 overflow-hidden relative z-10 animate-in fade-in slide-in-from-top-8 duration-500">
        <div className="bg-linear-to-l from-blue-800 to-blue-950 p-8 text-white relative overflow-hidden">
          <div className="relative z-10">
            <h3 className="text-2xl font-black uppercase tracking-tight">{plan.name} Tier Blueprint</h3>
            <p className="text-xs font-bold text-blue-200 uppercase mt-1">Comprehensive service specifications and resource limits</p>
          </div>
          <div className="absolute right-0 bottom-0 p-8 opacity-10 pointer-events-none translate-x-4 translate-y-4">
             <span className="text-8xl">📊</span>
          </div>
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-xl transition-all"
          >
            ✕
          </button>
        </div>

        <div className="p-8 space-y-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-3 bg-slate-50 border border-blue-50 rounded-sm">
               <p className="text-[9px] font-black text-gray-400 uppercase">Monthly Cost</p>
               <p className="text-sm font-black text-blue-900 uppercase">{plan.price}</p>
            </div>
            <div className="p-3 bg-slate-50 border border-blue-50 rounded-sm">
               <p className="text-[9px] font-black text-gray-400 uppercase">Active Base</p>
               <p className="text-sm font-black text-blue-900 uppercase">{plan.tenants} Tenants</p>
            </div>
            <div className="p-3 bg-slate-50 border border-blue-50 rounded-sm">
               <p className="text-[9px] font-black text-gray-400 uppercase">Uptime SLA</p>
               <p className="text-sm font-black text-green-600 uppercase">{technicalSpecs.uptime}</p>
            </div>
            <div className="p-3 bg-slate-50 border border-blue-50 rounded-sm">
               <p className="text-[9px] font-black text-gray-400 uppercase">Data Sync</p>
               <p className="text-sm font-black text-blue-900 uppercase">{technicalSpecs.backup}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
               <h4 className="text-[10px] font-black text-blue-900 uppercase tracking-widest border-b border-blue-50 pb-2">Core Entitlements</h4>
               <ul className="space-y-3">
                 {plan.features.map((feature, i) => (
                   <li key={i} className="flex items-center space-x-3">
                      <span className="w-5 h-5 bg-blue-50 rounded-full flex items-center justify-center text-blue-900 text-[10px] font-black">✓</span>
                      <span className="text-[11px] font-bold text-gray-700 uppercase">{feature}</span>
                   </li>
                 ))}
                 <li className="flex items-center space-x-3">
                    <span className="w-5 h-5 bg-blue-50 rounded-full flex items-center justify-center text-blue-900 text-[10px] font-black">✓</span>
                    <span className="text-[11px] font-bold text-gray-700 uppercase">Standard Security Suite</span>
                 </li>
               </ul>
            </div>

            <div className="space-y-4">
               <h4 className="text-[10px] font-black text-blue-900 uppercase tracking-widest border-b border-blue-50 pb-2">Technical Constraints</h4>
               <div className="space-y-4">
                  <div className="flex justify-between items-center">
                     <span className="text-[10px] font-bold text-gray-500 uppercase">Storage Limit</span>
                     <span className="text-[10px] font-black text-gray-800 uppercase">{technicalSpecs.storage}</span>
                  </div>
                  <div className="flex justify-between items-center">
                     <span className="text-[10px] font-bold text-gray-500 uppercase">API Rate Limit</span>
                     <span className="text-[10px] font-black text-gray-800 uppercase">{technicalSpecs.apiCalls}</span>
                  </div>
                  <div className="flex justify-between items-center">
                     <span className="text-[10px] font-bold text-gray-500 uppercase">Support Tier</span>
                     <span className="text-[10px] font-black text-gray-800 uppercase">{technicalSpecs.support}</span>
                  </div>
               </div>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-50">
            <button 
              onClick={onClose}
              className="w-full py-4 bg-slate-100 text-gray-600 rounded-sm text-[10px] font-black uppercase hover:bg-slate-200 transition-all"
            >
              Close Blueprint
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TierDetailsModal;
