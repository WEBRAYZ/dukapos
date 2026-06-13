'use client';

import React from 'react';

interface SiteLogsModalProps {
  isOpen: boolean;
  onClose: () => void;
  site: {
    id: string;
    name: string;
    region: string;
  } | null;
}

const SiteLogsModal: React.FC<SiteLogsModalProps> = ({ isOpen, onClose, site }) => {
  if (!isOpen || !site) return null;

  // Mock logs data
  const logs = [
    { id: 1, type: 'System', event: 'Node Synchronized', time: '2m ago', status: 'Success', detail: 'Primary state machine handshake complete' },
    { id: 2, type: 'Auth', event: 'Admin Login', time: '15m ago', status: 'Info', detail: 'User root@ndukapos.com accessed via SSH' },
    { id: 3, type: 'Traffic', event: 'Peak Bandwidth', time: '1h ago', status: 'Warning', detail: 'Egress traffic reached 85% of node capacity' },
    { id: 4, type: 'System', event: 'Backup Completed', time: '3h ago', status: 'Success', detail: 'Site database snapshot stored in Region Redundant Storage' },
    { id: 5, type: 'Security', event: 'Firewall Block', time: '5h ago', status: 'Danger', detail: 'Blocked 12 failed login attempts from 103.21.244.11' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Dimmed Background Overlay */}
      <div 
        className="absolute inset-0 bg-blue-950/40 backdrop-blur-sm transition-opacity duration-300" 
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="bg-white w-full max-w-3xl rounded-[2rem] shadow-2xl border border-blue-100 overflow-hidden relative z-10 animate-in fade-in zoom-in duration-300">
        <div className="bg-linear-to-l from-blue-800 to-blue-950 p-6 md:p-8 text-white relative overflow-hidden">
          <div className="relative z-10 flex justify-between items-center">
            <div>
              <h3 className="text-xl md:text-2xl font-black uppercase tracking-tight">{site.name} Activity Logs</h3>
              <p className="text-[10px] md:text-xs font-bold text-blue-200 uppercase mt-1">Real-time operational journal • {site.id}</p>
            </div>
            <button 
              onClick={onClose}
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-xl transition-all"
            >
              ✕
            </button>
          </div>
          <div className="absolute right-0 bottom-0 p-8 opacity-10 pointer-events-none translate-x-4 translate-y-4">
             <span className="text-8xl">📜</span>
          </div>
        </div>

        <div className="p-4 md:p-8 space-y-6">
          {/* Logs Container */}
          <div className="bg-slate-50 rounded-2xl border border-blue-50 overflow-hidden flex flex-col max-h-[400px]">
             <div className="overflow-y-auto custom-scrollbar p-4 space-y-3">
                {logs.map((log) => (
                  <div key={log.id} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all flex items-start space-x-4 group">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-lg shrink-0 ${
                      log.status === 'Success' ? 'bg-green-50 text-green-600' :
                      log.status === 'Warning' ? 'bg-yellow-50 text-yellow-600' :
                      log.status === 'Danger' ? 'bg-red-50 text-red-600' : 'bg-blue-50 text-blue-600'
                    }`}>
                      {log.type === 'System' ? '⚙️' : log.type === 'Auth' ? '🔑' : log.type === 'Traffic' ? '📊' : '🛡️'}
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <h4 className="text-[11px] font-black text-gray-800 uppercase tracking-tight">{log.event}</h4>
                        <span className="text-[9px] font-bold text-gray-400 uppercase">{log.time}</span>
                      </div>
                      <p className="text-[10px] font-bold text-gray-600 uppercase tracking-wide leading-relaxed">{log.detail}</p>
                      <div className="pt-1">
                         <span className={`text-[8px] font-black uppercase px-2 py-0.5 rounded-full ${
                            log.status === 'Success' ? 'bg-green-100 text-green-700' :
                            log.status === 'Warning' ? 'bg-yellow-100 text-yellow-700' :
                            log.status === 'Danger' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'
                         }`}>
                            {log.status}
                         </span>
                      </div>
                    </div>
                  </div>
                ))}
             </div>
          </div>

          <div className="pt-4 flex flex-col md:flex-row gap-4 items-center justify-between">
            <p className="text-[10px] font-bold text-gray-400 uppercase italic">
              * Log retention policy: 30 days global node history.
            </p>
            <div className="flex gap-3 w-full md:w-auto">
                <button 
                  onClick={onClose}
                  className="flex-1 md:flex-none px-8 py-3 bg-slate-100 text-gray-600 rounded-sm text-[10px] font-black uppercase hover:bg-slate-200 transition-all"
                >
                  Close
                </button>
                <button className="flex-1 md:flex-none px-8 py-3 bg-linear-to-l from-blue-800 to-blue-950 text-white rounded-sm text-[10px] font-black uppercase shadow-xl shadow-blue-900/20 hover:scale-[1.02] transition-all">
                  Download Full Archive
                </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SiteLogsModal;
