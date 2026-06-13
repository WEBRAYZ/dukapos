'use client';

import React, { useState, useEffect } from 'react';
import { api } from '@/lib/api';

interface Product {
  id: number;
  name: string;
  sku: string;
}

interface Branch {
  id: number;
  name: string;
}

interface Movement {
  product_name: string;
  quantity: string;
  reason: string;
  reference: string;
  created_at: string;
  type: string;
}

const StockAdjustments = () => {
  const [formData, setFormData] = useState({
    product: '',
    branch: '',
    type: 'Add Stock (+)',
    quantity: '',
    reason: 'Receiving new stock',
    reference: '',
    notes: '',
  });

  const [products, setProducts] = useState<Product[]>([]);
  const [branches, setBranches] = useState<Branch[]>([]);
  const [recentAdjustments, setRecentAdjustments] = useState<Movement[]>([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  const fetchData = async () => {
    try {
      setFetching(true);
      const [prodData, branchData, moveData] = await Promise.all([
        api.get<Product[]>('/products/'),
        api.get<Branch[]>('/inventory/branches/'),
        api.get<Movement[]>('/inventory/movements/?limit=5')
      ]);
      setProducts(prodData);
      setBranches(branchData);
      setRecentAdjustments(moveData);
    } catch (err) {
      console.error('Failed to fetch adjustment data:', err);
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.product || !formData.branch || !formData.quantity) return;

    setLoading(true);
    try {
      await api.post('/inventory/levels/adjust_stock/', {
        ...formData,
        product: parseInt(formData.product),
        branch: parseInt(formData.branch),
        quantity: parseFloat(formData.quantity)
      });
      // Reset form and refresh list
      setFormData({
        ...formData,
        product: '',
        quantity: '',
        reference: '',
        notes: ''
      });
      fetchData();
    } catch (err) {
      console.error('Failed to apply adjustment:', err);
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
      return (
          <div className="flex flex-col items-center justify-center p-12 space-y-4">
            <div className="w-10 h-10 border-4 border-blue-900 border-t-transparent rounded-full animate-spin" />
            <p className="text-[10px] font-black text-blue-900 uppercase tracking-widest animate-pulse">Loading adjustment tools...</p>
          </div>
      );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
      {/* New Adjustment Form */}
      <div className="lg:col-span-2 space-y-3">
        <div className="bg-white rounded-sm border border-blue-100 shadow-xl overflow-hidden">
          <div className="p-3 border-b border-blue-50 flex items-center space-x-3">
            <div className="w-8 h-8 rounded-sm bg-blue-50 flex items-center justify-center text-xl shadow-inner">
              ⚙️
            </div>
            <div>
              <h3 className="text-sm font-black text-blue-800 uppercase">New Stock Adjustment</h3>
              <p className="text-[10px] font-bold text-gray-600 uppercase">Manually correct stock levels · all changes are logged</p>
            </div>
          </div>

          <form className="p-3 space-y-3" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {/* Product Select */}
              <div className="space-y-2">
                <label className="text-[11px] font-black text-gray-800 uppercase">Product</label>
                <select 
                  className="w-full bg-gray-100 border border-blue-100 rounded-sm px-3 py-3 text-sm font-bold text-gray-700 focus:outline-none focus:bg-white focus:ring-1 focus:ring-blue-900 transition-all"
                  value={formData.product}
                  onChange={(e) => setFormData({...formData, product: e.target.value})}
                  required
                >
                  <option value="">— Select product —</option>
                  {products.map(p => (
                    <option key={p.id} value={p.id}>{p.name} ({p.sku})</option>
                  ))}
                </select>
              </div>

              {/* Branch Select */}
              <div className="space-y-2">
                <label className="text-[11px] font-black text-gray-800 uppercase">Branch / Location</label>
                <select 
                  className="w-full bg-gray-100 border border-blue-100 rounded-sm px-3 py-3 text-sm font-bold text-gray-700 focus:outline-none focus:bg-white focus:ring-1 focus:ring-blue-900 transition-all"
                  value={formData.branch}
                  onChange={(e) => setFormData({...formData, branch: e.target.value})}
                  required
                >
                  <option value="">— Select branch —</option>
                  {branches.map(b => (
                    <option key={b.id} value={b.id}>{b.name}</option>
                  ))}
                </select>
              </div>

              {/* Adjustment Type */}
              <div className="space-y-2">
                <label className="text-[11px] font-black text-gray-800 uppercase">Adjustment Type</label>
                <select 
                  className="w-full bg-gray-100 border border-blue-100 rounded-sm px-3 py-3 text-xs font-bold text-blue-900 uppercase  focus:outline-none focus:bg-white focus:ring-1 focus:ring-blue-900 transition-all"
                  value={formData.type}
                  onChange={(e) => setFormData({...formData, type: e.target.value})}
                >
                  <option>Add Stock (+)</option>
                  <option>Subtract Stock (-)</option>
                  <option>Set New Level (=)</option>
                </select>
              </div>

              {/* Quantity */}
              <div className="space-y-2">
                <label className="text-[11px] font-black text-gray-800 uppercase">Quantity</label>
                <input 
                  type="number" 
                  step="0.01"
                  placeholder="e.g. 25"
                  className="w-full bg-gray-100 border border-blue-100 rounded-sm px-3 py-3 text-sm font-bold placeholder:text-slate-300 focus:outline-none focus:bg-white focus:ring-1 focus:ring-blue-900 transition-all"
                  value={formData.quantity}
                  onChange={(e) => setFormData({...formData, quantity: e.target.value})}
                  required
                />
              </div>

              {/* Reason */}
              <div className="space-y-2">
                <label className="text-[11px] font-black text-gray-800 uppercase">Reason</label>
                <select 
                  className="w-full bg-gray-100 border border-blue-100 rounded-sm px-3 py-3 text-sm font-bold text-gray-600 focus:outline-none focus:bg-white focus:ring-1 focus:ring-blue-900 transition-all"
                  value={formData.reason}
                  onChange={(e) => setFormData({...formData, reason: e.target.value})}
                >
                  <option>Receiving new stock</option>
                  <option>Damaged goods</option>
                  <option>Stock count correction</option>
                  <option>Theft / Loss</option>
                  <option>Return to supplier</option>
                </select>
              </div>
            </div>

            {/* Reference */}
            <div className="space-y-2">
              <label className="text-[11px] font-black text-gray-800 uppercase">Reference / PO No.</label>
              <input 
                type="text" 
                placeholder="e.g. PO-2024-0041"
                className="w-full bg-gray-100 border border-blue-100 rounded-sm px-3 py-3 text-sm font-bold placeholder:text-slate-300 focus:outline-none focus:bg-white focus:ring-1 focus:ring-blue-900 transition-all"
                value={formData.reference}
                onChange={(e) => setFormData({...formData, reference: e.target.value})}
              />
            </div>

            {/* Notes */}
            <div className="space-y-2">
              <label className="text-[11px] font-black text-gray-800 uppercase">Notes</label>
              <textarea 
                rows={3}
                placeholder="Optional notes about this adjustment…"
                className="w-full bg-gray-100 border border-blue-100 rounded-sm px-3 py-3 text-sm font-bold placeholder:text-slate-300 focus:outline-none focus:bg-white focus:ring-1 focus:ring-blue-900 transition-all resize-none"
                value={formData.notes}
                onChange={(e) => setFormData({...formData, notes: e.target.value})}
              />
            </div>

            {/* Form Actions */}
            <div className="pt-4 border-t border-gray-50 flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center space-x-2 text-gray-600">
                <span className="text-xs">🔒</span>
                <span className="text-[10px] font-bold text-slate-700 uppercase">Changes are permanent and audited</span>
              </div>
              <div className="flex items-center space-x-3 w-full md:w-auto">
                <button 
                  type="button"
                  onClick={() => setFormData({...formData, product: '', quantity: '', reference: '', notes: ''})}
                  className="flex-1 md:flex-none px-8 py-3 bg-slate-100 text-blue-800 hover:text-gray-600 rounded-sm text-[10px] font-black uppercase transition-all"
                >
                  Reset
                </button>
                <button 
                  type="submit"
                  disabled={loading}
                  className="flex-1 md:flex-none px-8 py-3 bg-linear-to-l from-blue-800 to-blue-950 text-white rounded-sm text-[10px] font-black uppercase shadow-lg shadow-green-900/10 hover:bg-blue-950 transition-all disabled:opacity-50"
                >
                  {loading ? 'Applying...' : 'Apply Adjustment'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Recent History Sidebar */}
      <div className="space-y-3">
        <div className="bg-white p-4 rounded-sm border border-blue-100 shadow-xs flex flex-col h-full">
          <div className="flex items-center justify-between mb-3 border-b border-blue-50 pb-3">
            <div>
              <h3 className="text-sm font-black text-blue-900 uppercase">Recent Adjustments</h3>
              <p className="text-[10px] font-bold text-gray-700 uppercase">Latest logs</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-lg">
              📜
            </div>
          </div>

          <div className="flex-1 space-y-3">
            {recentAdjustments.map((adj, i) => (
              <div key={i} className="group cursor-pointer border-b border-slate-50 pb-2 last:border-0">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-xs font-black text-gray-800 uppercase group-hover:text-blue-900 transition-colors">{adj.product_name}</p>
                    <p className="text-[9px] font-bold text-gray-600 uppercase">
                      {adj.reason} {adj.reference && `· ${adj.reference}`}
                    </p>
                    <p className="text-[9px] font-bold text-blue-900/70 uppercase">{new Date(adj.created_at).toLocaleString()}</p>
                  </div>
                  <div className={`ml-4 px-2 py-1 rounded-full text-xs font-black tabular-nums shadow-sm ${
                    adj.type === 'IN' ? 'bg-green-50 text-green-600' : 
                    adj.type === 'OUT' ? 'bg-red-50 text-red-600' : 
                    'bg-blue-50 text-blue-600'
                  }`}>
                    {adj.type === 'IN' ? '+' : adj.type === 'OUT' ? '-' : '='} {Math.abs(parseFloat(adj.quantity))}
                  </div>
                </div>
              </div>
            ))}
            {recentAdjustments.length === 0 && (
                <p className="text-[10px] font-bold text-slate-400 uppercase text-center py-8">No recent activity</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StockAdjustments;


export default StockAdjustments;
