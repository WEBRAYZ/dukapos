'use client';

import React from 'react';

interface IncidentLogModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const IncidentLogModal: React.FC<IncidentLogModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const incidents = [
    { id: 'INC-2026-001', severity: 'Critical', event: 'Database Connection Timeout', status: 'Resolved', time: 'Jun 10, 2026 08:45', duration: '12m', resolution: 'Auto-scaled DB cluster' },
    { id: 'INC-2026-002', severity: 'High', event: 'Regional API Latency Spikes', status: 'Investigating', time: 'Jun 10, 2026 10:12', duration: 'Running', resolution: 'Triage in progress' },
    { id: 'INC-2026-003', severity: 'Medium', event: 'Cache Invalidation Failure', status: 'Mitigated', time: 'Jun 09, 2026 14:20', duration: '45m', resolution: 'Manual cache purge' },
    { id: 'INC-2026-004', severity: 'Low', event: 'Email Delivery Delay', status: 'Resolved', time: 'Jun 08, 2026 09:10', duration: '1h 20m', resolution: 'Upstream provider issue' },
    { id: 'INC-2026-005', severity: 'High', event: 'Storage Cluster Near Capacity', status: 'Open', time: 'Jun 07, 2026 16:30', duration: 'Running', resolution: 'Pending expansion' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-12 md:pt-20 overflow-y-auto custom-scrollbar">
      {/* Dimmed Background Overlay */}
      <div 
        className="fixed inset-0 bg-blue-950/40 backdrop-blur-sm transition-opacity duration-300" 
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="bg-white w-full max-w-3xl rounded-[2.5rem] shadow-2xl border border-blue-100 overflow-hidden relative z-10 animate-in fade-in slide-in-from-top-8 duration-500">
        <div className="bg-linear-to-l from-blue-800 to-blue-950 p-8 text-white relative overflow-hidden">
          <div className="relative z-10">
            <h3 className="text-2xl font-black uppercase tracking-tight">System Incident Log</h3>
            <p className="text-xs font-bold text-blue-200 uppercase mt-1">Audit trail of critical infrastructure events</p>
          </div>
          <div className="absolute right-0 bottom-0 p-8 opacity-10 pointer-events-none translate-x-4 translate-y-4">
             <span className="text-8xl">📋</span>
          </div>
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-xl transition-all"
          >
            ✕
          </button>
        </div>

        <div className="p-8">
          <div className="overflow-x-auto no-scrollbar max-h-[50vh]">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-50">
                  <th className="py-3 text-[10px] font-black text-blue-900 uppercase tracking-widest">Incident ID</th>
                  <th className="py-3 text-[10px] font-black text-blue-900 uppercase tracking-widest">Event</th>
                  <th className="py-3 text-[10px] font-black text-blue-900 uppercase tracking-widest">Severity</th>
                  <th className="py-3 text-[10px] font-black text-blue-900 uppercase tracking-widest">Status</th>
                  <th className="py-3 text-[10px] font-black text-blue-900 uppercase tracking-widest text-right">Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {incidents.map((inc) => (
                  <tr key={inc.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="py-4">
                       <span className="text-[10px] font-black text-gray-400 uppercase tracking-tighter group-hover:text-blue-900 transition-colors">{inc.id}</span>
                    </td>
                    <td className="py-4">
                       <div className="flex flex-col">
                          <span className="text-xs font-black text-gray-800 uppercase">{inc.event}</span>
                          <span className="text-[9px] font-bold text-gray-500 uppercase">{inc.resolution}</span>
                       </div>
                    </td>
                    <td className="py-4">
                       <span className={`px-2 py-1 rounded text-[9px] font-black uppercase ${
                         inc.severity === 'Critical' ? 'bg-red-100 text-red-700' :
                         inc.severity === 'High' ? 'bg-orange-100 text-orange-700' :
                         inc.severity === 'Medium' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'
                       }`}>
                         {inc.severity}
                       </span>
                    </td>
                    <td className="py-4">
                       <div className="flex items-center space-x-2">
                          <span className={`w-1.5 h-1.5 rounded-full ${
                            inc.status === 'Investigating' ? 'bg-orange-500 animate-pulse' :
                            inc.status === 'Open' ? 'bg-red-500 animate-pulse' :
                            inc.status === 'Mitigated' ? 'bg-blue-500' : 'bg-green-500'
                          }`} />
                          <span className="text-[10px] font-black text-gray-800 uppercase">{inc.status}</span>
                       </div>
                    </td>
                    <td className="py-4 text-right">
                       <div className="flex flex-col">
                          <span className="text-[10px] font-black text-gray-800 uppercase">{inc.time}</span>
                          <span className="text-[9px] font-bold text-gray-400 uppercase">Duration: {inc.duration}</span>
                       </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="pt-8 border-t border-slate-50 flex justify-between items-center">
            <div className="flex items-center space-x-2">
               <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
               <span className="text-[10px] font-black text-gray-500 uppercase">Real-time update active</span>
            </div>
            <button 
              onClick={onClose}
              className="px-8 py-3 bg-slate-100 text-gray-600 rounded-sm text-[10px] font-black uppercase hover:bg-slate-200 transition-all"
            >
              Close Log
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IncidentLogModal;
