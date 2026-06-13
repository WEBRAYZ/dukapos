'use client';

import { useRouter } from 'next/navigation';
import Settings from '@/app/components/management/settings';

const SettingsPage = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans">
      {/* HEADER */}
      <header className="h-16 bg-white border-b border-blue-100 px-6 flex items-center justify-between shrink-0 shadow-sm z-30">
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-900 rounded flex items-center justify-center font-black text-white text-lg shadow-md">
              ⚙️
            </div>
            <div>
              <h1 className="text-sm font-black uppercase text-blue-900">System Configuration</h1>
              <p className="text-[10px] font-bold text-slate-400 uppercase mt-1">Terminal #042 • Environment: Production</p>
            </div>
          </div>
        </div>

        <button 
          onClick={() => router.back()}
          className="px-6 py-2 bg-linear-to-l from-blue-800 to-blue-950 text-white text-[10px] font-black uppercase rounded-sm hover:bg-blue-800 transition-all shadow-xl active:scale-95"
        >
          Close Settings
        </button>
      </header>

      <main className="flex-1 overflow-y-auto p-2 custom-scrollbar">
        <div className="max-w-4xl mx-auto">
          <div className="mb-4 animate-in fade-in slide-in-from-top-4 duration-500">
            <h2 className="text-xl font-black text-blue-950 uppercase mb-2">Enterprise Settings</h2>
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <p className="text-[10px] font-black text-slate-600 uppercase ">Global Synchronization Active</p>
            </div>
          </div>
          
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
            <Settings />
          </div>
        </div>
      </main>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e2e8f0;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #cbd5e1;
        }
      `}</style>
    </div>
  );
};

export default SettingsPage;
