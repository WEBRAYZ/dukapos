'use client';

import React from 'react';

interface ComposeEmailProps {
  isOpen: boolean;
  onClose: () => void;
  recipient: {
    name: string;
    email: string;
  };
}

const ComposeEmail: React.FC<ComposeEmailProps> = ({ isOpen, onClose, recipient }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-110 flex items-center justify-center p-3">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative w-full max-w-2xl bg-white rounded-sm shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 slide-in-from-bottom-8 duration-500 border border-blue-100">
        {/* Header */}
        <div className="bg-white border-b border-blue-100 p-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-blue-50 text-blue-900 rounded-sm flex items-center justify-center text-xl font-black shadow-inner border border-blue-100">
              ✉️
            </div>
            <div>
              <h3 className="text-lg font-black text-blue-800 uppercase">Compose Email</h3>
              <p className="text-[10px] font-bold text-slate-600 uppercase">To: {recipient.name} ({recipient.email})</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-slate-100 text-slate-600 hover:text-slate-800 hover:bg-slate-200 transition-all flex items-center justify-center"
          >
            ✕
          </button>
        </div>

        {/* Form Body */}
        <div className="p-4 space-y-4 overflow-y-auto custom-scrollbar bg-slate-50/30 max-h-[70vh]">
          <div className="space-y-2">
            <label className="text-[11px] font-black text-slate-600 uppercase ml-1">Subject Line</label>
            <input 
              type="text" 
              placeholder="Enter email subject..." 
              className="w-full px-4 py-4 bg-slate-100 border border-blue-100 text-[11px] font-black text-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500/10 focus:border-blue-500/20 transition-all uppercase"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[11px] font-black text-slate-600 uppercase">Message Body</label>
            <textarea 
              rows={10}
              placeholder="Write your professional message here..." 
              className="w-full px-4 py-4 bg-slate-100 border border-blue-100 text-[11px] font-black text-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500/10 focus:border-blue-500/20 transition-all uppercase resize-none custom-scrollbar"
            ></textarea>
          </div>

          <div className="flex items-center space-x-4 pt-2">
            <button className="flex items-center space-x-2 px-4 py-2 bg-slate-100 border border-blue-100 rounded-sm text-[9px] font-black text-slate-600 uppercase hover:text-blue-900 transition-all">
              <span>📎</span> <span>Attach Files</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 bg-white border border-blue-100 rounded-sm text-[9px] font-black text-slate-600 uppercase hover:text-blue-900 transition-all">
              <span>🖼️</span> <span>Insert Image</span>
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-white border-t border-gray-100 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
            <p className="text-[10px] font-black text-slate-700 uppercase">Enterprise SMTP Gateway Active</p>
          </div>
          <div className="flex items-center space-x-4">
            <button 
              onClick={onClose}
              className="px-8 py-4 bg-slate-200 text-blue-800 rounded-sm text-[10px] font-black uppercase hover:bg-gray-300 transition-all active:scale-95"
            >
              Cancel
            </button>
            <button className="px-10 py-3 bg-linear-to-l from-blue-800 to-blue-950 text-white rounded-sm flex items-center space-x-3 shadow-xl shadow-blue-900/20 hover:bg-blue-800 transition-all active:scale-95 group">
              <span className="text-[10px] font-black uppercase tracking-[0.2em]">Send Email</span>
              <span className="group-hover:translate-x-1 transition-transform">🚀</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComposeEmail;
