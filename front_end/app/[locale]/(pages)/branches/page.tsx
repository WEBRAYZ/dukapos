'use client';

import React, { useState, useEffect } from 'react';
import BaseNavbar from '@/app/components/shared/BaseNavbar';
import { api } from '@/lib/api';

interface Branch {
  id: number;
  name: string;
  location: string;
  is_active: boolean;
  revenue?: string;
  revenueFull?: number;
  staff?: number;
  share?: number;
  avgSale?: number;
}

const BranchesPage = () => {
  const [branches, setBranches] = useState<Branch[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBranches = async () => {
      try {
        setLoading(true);
        const data = await api.get<Branch[]>('/superadmin/branches/');
        // Add some mock metrics for visualization since they aren't in the DB yet
        const enrichedData = data.map(b => ({
          ...b,
          revenue: '0K',
          revenueFull: 0,
          staff: 0,
          share: 0,
          avgSale: 0
        }));
        setBranches(enrichedData);
      } catch (err: any) {
        console.error('Failed to fetch branches:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchBranches();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col h-full bg-blue-50 items-center justify-center">
        <div className="w-12 h-12 border-4 border-blue-900 border-t-transparent rounded-full animate-spin" />
        <p className="mt-4 text-xs font-black text-blue-900 uppercase tracking-widest">Loading Locations...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-blue-50 overflow-hidden">
      <BaseNavbar 
        title="Branches" 
        subtitle="Location Management" 
        icon="🏪" 
      />
      
      <div className="flex-1 overflow-y-auto custom-scrollbar p-4 md:p-6 lg:p-8">
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl md:text-2xl font-extrabold text-blue-900 uppercase tracking-tight">Active Branches</h2>
              <p className="text-[11px] font-semibold text-slate-500 uppercase mt-1 tracking-wider">Monitor performance across all locations</p>
            </div>
            <button className="px-6 py-3 bg-blue-900 text-white rounded-sm font-black text-xs uppercase hover:bg-blue-800 transition-all shadow-lg shadow-blue-900/20">
              + New Branch
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {branches.map((branch) => (
              <div key={branch.id} className="bg-white p-5 rounded-sm border border-blue-100 shadow-sm hover:shadow-md transition-all group relative overflow-hidden">
                <div className={`absolute top-0 left-0 w-1 h-full ${branch.is_active ? 'bg-green-500' : 'bg-red-500'}`}></div>
                <div className="flex flex-col space-y-4">
                  <div className="flex justify-between items-start">
                    <div className="w-10 h-10 rounded-sm bg-blue-50 flex items-center justify-center text-xl shadow-inner">🏪</div>
                    <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest ${
                      branch.is_active ? 'bg-green-50 text-green-600 border border-green-100' : 'bg-red-50 text-red-600 border border-red-100'
                    }`}>
                      {branch.is_active ? 'Open' : 'Closed'}
                    </span>
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-blue-900 uppercase tracking-tight">{branch.name}</h4>
                    <p className="text-[10px] font-bold text-slate-500 uppercase mt-0.5">{branch.location}</p>
                  </div>
                  <div className="pt-4 border-t border-slate-50 grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Revenue</p>
                      <p className="text-sm font-black text-blue-900">KSh {branch.revenue}</p>
                    </div>
                    <div>
                      <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Avg Sale</p>
                      <p className="text-sm font-black text-blue-900">KSh {branch.avgSale}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {branches.length === 0 && (
              <div className="col-span-full py-12 bg-white border border-dashed border-blue-200 rounded-sm flex flex-col items-center justify-center text-slate-400">
                <span className="text-4xl mb-3">📍</span>
                <p className="text-xs font-black uppercase tracking-widest">No branches found</p>
              </div>
            )}
          </div>

          <div className="bg-white rounded-sm border border-blue-100 shadow-sm overflow-hidden">
            <div className="p-5 border-b border-blue-50 flex items-center justify-between bg-slate-50/50">
              <h3 className="text-xs font-black text-blue-900 uppercase tracking-widest">Performance Matrix</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/30 border-b border-blue-50">
                    <th className="px-6 py-4 text-[10px] font-black text-blue-900 uppercase tracking-widest">Branch</th>
                    <th className="px-6 py-4 text-[10px] font-black text-blue-900 uppercase tracking-widest">Daily Revenue</th>
                    <th className="px-6 py-4 text-[10px] font-black text-blue-900 uppercase tracking-widest">Share</th>
                    <th className="px-6 py-4 text-[10px] font-black text-blue-900 uppercase tracking-widest text-center">Staff</th>
                    <th className="px-6 py-4 text-[10px] font-black text-blue-900 uppercase tracking-widest text-right">Avg Transaction</th>
                    <th className="px-6 py-4 text-[10px] font-black text-blue-900 uppercase tracking-widest text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {branches.map((branch) => (
                    <tr key={branch.id} className="hover:bg-blue-50/30 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="text-xs font-black text-blue-900 uppercase tracking-tight">{branch.name}</span>
                          <span className="text-[9px] font-bold text-slate-400 uppercase">{branch.location}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm font-black text-slate-700">KSh {branch.revenueFull?.toLocaleString() || 0}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="w-full bg-slate-100 rounded-full h-1.5 max-w-[100px]">
                          <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: `${branch.share || 0}%` }}></div>
                        </div>
                        <span className="text-[10px] font-bold text-slate-500 mt-1 block">{branch.share || 0}% of total</span>
                      </td>
                      <td className="px-6 py-4 text-sm font-bold text-slate-600 text-center">
                        {branch.staff || 0}
                      </td>
                      <td className="px-6 py-4 text-sm font-black text-blue-900 text-right">
                        KSh {branch.avgSale?.toLocaleString() || 0}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest ${
                          branch.is_active ? 'bg-green-50 text-green-700 border border-green-100' : 'bg-red-50 text-red-600 border border-red-100'
                        }`}>
                          {branch.is_active ? 'Open' : 'Closed'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BranchesPage;
