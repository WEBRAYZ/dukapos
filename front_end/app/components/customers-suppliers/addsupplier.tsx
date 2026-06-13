'use client';

import React, { useState } from 'react';
import { api } from '@/lib/api';

interface AddSupplierProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

const AddSupplier: React.FC<AddSupplierProps> = ({ isOpen, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    company_name: '',
    contact_person: '',
    email: '',
    phone: '',
    kra_pin: '',
    address: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Basic validation
    if (!formData.company_name || !formData.phone) {
      setError('Company Name and Phone Number are required');
      return;
    }

    setLoading(true);
    try {
      await api.post('/suppliers/', formData);
      setFormData({
        company_name: '',
        contact_person: '',
        email: '',
        phone: '',
        kra_pin: '',
        address: '',
      });
      if (onSuccess) onSuccess();
      onClose();
    } catch (err: any) {
      setError(err.message || 'Failed to create supplier');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-110 flex items-center justify-center p-3">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/50 backdrop-blur-lg animate-in fade-in duration-300"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative w-full max-w-2xl bg-white rounded-sm shadow-sm overflow-hidden flex flex-col animate-in zoom-in-95 slide-in-from-bottom-8 duration-500 border border-blue-100">
        {/* Header */}
        <div className="bg-white border-b border-blue-100 p-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-olive/10 text-olive rounded-sm flex items-center justify-center text-xl font-black shadow-inner border border-olive/10">
              🏬
            </div>
            <div>
              <h3 className="text-lg font-black text-slate-800 uppercase">Add New Supplier</h3>
              <p className="text-[10px] font-bold text-slate-600 uppercase">Register a new vendor to the supply chain</p>
            </div>
          </div>
          <button 
            type="button"
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-slate-100 text-slate-600 hover:text-slate-800 hover:bg-slate-200 transition-all flex items-center justify-center"
          >
            ✕
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex flex-col h-full overflow-hidden">
          <div className="p-4 space-y-3 overflow-y-auto custom-scrollbar bg-slate-50/30 max-h-[70vh]">
            {error && (
              <div className="p-3 bg-red-100 border border-red-200 text-red-700 text-[11px] font-bold uppercase rounded-sm">
                {error}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[11px] font-black text-slate-600 uppercase ml-1">Company Name *</label>
                <input 
                  type="text" 
                  name="company_name"
                  value={formData.company_name}
                  onChange={handleChange}
                  placeholder="Enter supplier company name..."
                  className="w-full px-4 py-4 bg-slate-100 border border-blue-100 rounded-sm text-[11px] font-black text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400 transition-all uppercase"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-[11px] font-black text-slate-600 uppercase ml-1">Email Address</label>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="orders@supplier.com"
                  className="w-full px-4 py-4 bg-slate-100 border border-blue-100 rounded-sm text-[11px] font-black text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400 transition-all uppercase"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[11px] font-black text-slate-600 uppercase ml-1">Contact Person</label>
                <input 
                  type="text" 
                  name="contact_person"
                  value={formData.contact_person}
                  onChange={handleChange}
                  placeholder="Enter contact name..."
                  className="w-full px-4 py-4 bg-slate-100 border border-blue-100 rounded-sm text-[11px] font-black text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400 transition-all uppercase"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[11px] font-black text-slate-600 uppercase ml-1">Phone Number *</label>
                <input 
                  type="text" 
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+254 7XX XXX XXX"
                  className="w-full px-4 py-4 bg-slate-100 border border-blue-100 rounded-sm text-[11px] font-black text-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400 transition-all uppercase"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[11px] font-black text-slate-600 uppercase ml-1">KRA PIN</label>
                <input 
                  type="text" 
                  name="kra_pin"
                  value={formData.kra_pin}
                  onChange={handleChange}
                  placeholder="Enter KRA PIN..."
                  className="w-full px-4 py-4 bg-slate-100 border border-blue-100 rounded-sm text-[11px] font-black text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400 transition-all uppercase"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[11px] font-black text-slate-600 uppercase ml-1">Lead Time (Days)</label>
                <input 
                  type="number" 
                  placeholder="Average delivery time..."
                  className="w-full px-4 py-4 bg-slate-100 border border-blue-100 rounded-sm text-[11px] font-black text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400 transition-all uppercase"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-black text-slate-600 uppercase ml-1">Physical Address / Warehouse</label>
              <input 
                type="text" 
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Building, Street, Area..."
                className="w-full px-4 py-4 bg-slate-100 border border-blue-100 rounded-sm text-[11px] font-black text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400 transition-all uppercase"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-600 uppercase tracking-widest ml-1">Payment Terms & Notes</label>
              <textarea 
                rows={3}
                placeholder="Enter credit limits, payment cycles, or special notes..."
                className="w-full px-6 py-4 bg-slate-100 border border-blue-100 rounded-sm text-[11px] font-black text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400 transition-all uppercase resize-none custom-scrollbar"
              ></textarea>
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 bg-white border-t border-blue-100 flex items-center justify-between">
            <button 
              type="button"
              onClick={onClose}
              className="px-8 py-4 bg-slate-100 text-blue-800 rounded-sm text-[10px] font-black uppercase hover:bg-gray-100 transition-all active:scale-95"
            >
              Cancel
            </button>
            <div className="flex items-center space-x-4">
              <button 
                type="submit"
                disabled={loading}
                className={`px-10 py-4 bg-linear-to-l from-blue-800 to-blue-950 text-white rounded-sm flex items-center space-x-3 shadow-xl shadow-olive/20 hover:bg-olive transition-all active:scale-95 group ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <span className="text-[10px] font-black uppercase tracking-[0.2em]">
                  {loading ? 'Creating...' : 'Create Supplier'}
                </span>
                {!loading && <span className="group-hover:translate-x-1 transition-transform">✓</span>}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddSupplier;

