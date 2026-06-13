'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

interface ConnectionState {
  label: string;
  status: 'connected' | 'connecting' | 'error' | 'disconnected';
  icon: string;
}

const SystemStatus: React.FC = () => {
  const pathname = usePathname();
  
  const [connections, setConnections] = useState<ConnectionState[]>([
    { label: 'Cloud API', status: 'connecting', icon: '☁️' },
    { label: 'Database', status: 'connecting', icon: '🗄️' },
    { label: 'Terminal', status: 'connected', icon: '💻' },
    { label: 'USB Scanner', status: 'disconnected', icon: '🔌' },
    { label: 'M-Pesa Sync', status: 'connecting', icon: '📲' },
  ]);

  const [usbStatus, setUsbStatus] = useState<'connected' | 'disconnected'>('disconnected');

  const updateStatus = React.useCallback((label: string, status: ConnectionState['status']) => {
    setConnections(prev => prev.map(conn => 
      conn.label === label ? { ...conn, status } : conn
    ));
  }, []);

  // Hide on public landing pages
  const isPublicPage = !pathname || 
                      pathname === '/' || 
                      pathname.endsWith('/en') || 
                      pathname.endsWith('/en/') ||
                      pathname.includes('/how-works') ||
                      pathname.includes('/request-demo');

  useEffect(() => {
    if (isPublicPage) return;

    // Simulate initial connection sequence
    const timers = [
      setTimeout(() => updateStatus('Cloud API', 'connected'), 1500),
      setTimeout(() => updateStatus('Database', 'connected'), 2500),
      setTimeout(() => updateStatus('M-Pesa Sync', 'connected'), 4000),
    ];

    if ('usb' in navigator) {
      navigator.usb.getDevices().then(devices => {
        if (devices.length > 0) setUsbStatus('connected');
      });

      const handleConnect = () => setUsbStatus('connected');
      const handleDisconnect = () => setUsbStatus('disconnected');

      navigator.usb.addEventListener('connect', handleConnect);
      navigator.usb.addEventListener('disconnect', handleDisconnect);

      return () => {
        timers.forEach(clearTimeout);
        navigator.usb.removeEventListener('connect', handleConnect);
        navigator.usb.removeEventListener('disconnect', handleDisconnect);
      };
    }
  }, [isPublicPage, updateStatus]);

  const displayedConnections = React.useMemo(() => {
    return connections.map(conn => 
      conn.label === 'USB Scanner' ? { ...conn, status: usbStatus } : conn
    );
  }, [connections, usbStatus]);

  if (isPublicPage) return null;

  return (
    <div className="bg-blue-950 text-white p-2 flex items-center justify-between px-4 text-[10px] font-black uppercase tracking-widest border-b border-blue-900 shadow-lg">
      <div className="flex items-center space-x-6 overflow-x-auto no-scrollbar">
        {displayedConnections.map((conn) => (
          <div key={conn.label} className="flex items-center space-x-2 whitespace-nowrap group cursor-help">
            <span className="opacity-70 group-hover:opacity-100 transition-opacity">{conn.icon}</span>
            <span className="text-slate-400 group-hover:text-white transition-colors">{conn.label}:</span>
            <div className="flex items-center space-x-1.5">
              <div className={`w-1.5 h-1.5 rounded-full ${
                conn.status === 'connected' ? 'bg-emerald-400 animate-pulse' :
                conn.status === 'connecting' ? 'bg-amber-400 animate-bounce' :
                conn.status === 'error' ? 'bg-rose-500' : 'bg-slate-600'
              }`} />
              <span className={`${
                conn.status === 'connected' ? 'text-emerald-400' :
                conn.status === 'connecting' ? 'text-amber-400' :
                conn.status === 'error' ? 'text-rose-400' : 'text-slate-500'
              }`}>
                {conn.status}
              </span>
            </div>
          </div>
        ))}
      </div>
      
      <div className="hidden md:flex items-center space-x-3 ml-4 pl-4 border-l border-blue-900">
        <div className="flex flex-col items-end">
          <span className="text-[8px] text-slate-500 leading-none">System Load</span>
          <div className="w-16 h-1 bg-blue-900 mt-1 rounded-full overflow-hidden">
            <div className="h-full bg-blue-400 w-1/3 animate-[shimmer_2s_infinite]" />
          </div>
        </div>
      </div>

      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
};

export default SystemStatus;
