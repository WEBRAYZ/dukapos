'use client';

import React from 'react';

interface AddDeviceProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddDevice: React.FC<AddDeviceProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-110 flex items-center justify-center p-3">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative w-full max-w-2xl bg-white rounded-sm shadow-sm overflow-hidden flex flex-col animate-in zoom-in-95 slide-in-from-bottom-8 duration-500 border border-blue-100">
        {/* Header */}
        <div className="bg-white border-b border-blue-100 p-3 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-blue-50 text-blue-900 rounded-sm flex items-center justify-center text-xl font-black shadow-inner border border-blue-100">
              ⊞
            </div>
            <div>
              <h3 className="text-lg font-black text-blue-800 uppercase">Add New Device</h3>
              <p className="text-[10px] font-bold text-gray-600 uppercase">Integrate new hardware into your POS system</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-slate-100 text-gray-600 hover:text-gray-600 hover:bg-slate-200 transition-all flex items-center justify-center"
          >
            ✕
          </button>
        </div>

        {/* Form Body */}
        <div className="p-4 space-y-4 overflow-y-auto custom-scrollbar bg-slate-50/30 max-h-[70vh]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="space-y-2">
              <label className="text-[11px] font-black text-gray-800 uppercase">Device Name</label>
              <input 
                type="text" 
                placeholder="e.g. Receipt Printer 2"
                className="w-full px-4 py-4 bg-slate-100 border border-blue-100 rounded-sm text-[11px] font-black text-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500/10 focus:border-blue-500/20 transition-all uppercase"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[11px] font-black text-gray-800 uppercase">Device Model</label>
              <input 
                type="text" 
                placeholder="e.g. Epson TM-T88VI"
                className="w-full px-4 py-4 bg-slate-100 border border-blue-100 rounded-sm text-[11px] font-black text-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500/10 focus:border-blue-500/20 transition-all uppercase"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[11px] font-black text-gray-800 uppercase">Interface / Connection</label>
              <div className="relative">
                <select className="w-full px-4 py-4 bg-slate-100 border border-blue-100 rounded-sm text-[11px] font-black text-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500/10 focus:border-blue-500/20 transition-all uppercase appearance-none cursor-pointer">
                  <option value="">Select Connection</option>
                  <option>USB</option>
                  <option>Ethernet / LAN</option>
                  <option>Bluetooth</option>
                  <option>Serial / COM</option>
                  <option>Wi-Fi</option>
                </select>
                <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-gray-700 text-xs">▼</div>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[11px] font-black text-gray-800 uppercase">Port / IP Address</label>
              <input 
                type="text" 
                placeholder="e.g. COM3 or 192.168.1.100"
                className="w-full px-4 py-4 bg-slate-100 border border-blue-100 rounded-sm text-[11px] font-black text-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500/10 focus:border-blue-500/20 transition-all uppercase"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-800 uppercase">Device Category</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {['Printer', 'Scanner', 'Cash Drawer', 'Scale', 'Display', 'Card Reader'].map((cat) => (
                <button 
                  key={cat}
                  className="px-4 py-3  bg-slate-100 border border-blue-100 rounded-sm text-[9px] font-black text-gray-900 uppercase hover:text-blue-900 hover:border-blue-200 transition-all"
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-800 uppercase">Configuration Notes</label>
            <textarea 
              rows={3}
              placeholder="Enter baud rate, parity, or other driver specific settings..."
              className="w-full px-6 py-4 bg-slate-100 border border-blue-100 rounded-sm text-[11px] font-black text-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500/10 focus:border-blue-500/20 transition-all uppercase resize-none custom-scrollbar"
            ></textarea>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-white border-t border-blue-100 flex items-center justify-between">
          <button 
            onClick={onClose}
            className="px-6 py-4 bg-slate-200 text-blue-800 rounded-sm text-[10px] font-black uppercase hover:bg-slate-300 transition-all active:scale-95"
          >
            Cancel
          </button>
          <div className="flex items-center space-x-4">
            <button 
              className="px-6 py-4  bg-linear-to-l from-blue-800 to-blue-950 text-white rounded-sm flex items-center space-x-3 hover:bg-blue-800 transition-all active:scale-95 group"
            >
              <span className="text-[10px] font-black uppercase">Add & Initialize</span>
              <span className="group-hover:translate-x-1 transition-transform">✓</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddDevice;
