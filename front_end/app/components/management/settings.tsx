'use client';

import React, { useState } from 'react';

const Toggle = ({ enabled, label, description }: { enabled: boolean; label: string; description?: string }) => (
  <div className="flex items-center justify-between py-3 group gap-3">
    <div className="flex flex-col flex-1">
      <span className="text-[11px] font-black text-slate-800 uppercase line-clamp-1">{label}</span>
      {description && <span className="text-[10px] font-bold text-slate-600 uppercase mt-0.5 line-clamp-2">{description}</span>}
    </div>
    <button className={`w-11 h-6 shrink-0 rounded-full transition-all relative ${enabled ? 'bg-blue-600 shadow-[0_0_10px_rgba(37,99,235,0.3)]' : 'bg-slate-200'}`}>
      <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all shadow-sm ${enabled ? 'right-1' : 'left-1'}`} />
    </button>
  </div>
);

const SettingField = ({ label, description, value, setter, type = "text", placeholder, disabled }: {
  label: string;
  description: string;
  value: string | number;
  setter: (v: any) => void;
  type?: string;
  placeholder?: string;
  disabled?: boolean;
}) => (
  <div className="space-y-2 group">
    <div className="flex flex-col">
      <label className="text-[11px] font-black text-slate-800 uppercase">{label}</label>
      <p className="text-[10px] font-bold text-slate-600 uppercase mt-0.5">{description}</p>
    </div>
    <div className="flex flex-col sm:flex-row gap-2">
      <input 
        type={type}
        value={value}
        placeholder={placeholder}
        disabled={disabled}
        onChange={(e) => setter(e.target.value)}
        className={`flex-1 px-4 py-3 bg-slate-100 border border-blue-200 rounded-sm text-xs font-black text-slate-800 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500/30 transition-all duration-300 ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      />
      {!disabled && (
        <button className="px-3 py-2 bg-linear-to-l from-blue-800 to-blue-950 text-white rounded-sm text-[10px] font-black uppercase hover:bg-blue-700 transition-all shadow-md active:scale-95 whitespace-nowrap">
          Save Changes
        </button>
      )}
    </div>
  </div>
);

const SectionHeader = ({ icon, title, description }: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) => (
  <div className="flex items-center space-x-3 mb-3 pb-3 border-b border-slate-100">
    <div className="w-10 h-10 bg-blue-50 rounded-sm flex items-center justify-center text-xl shadow-inner border border-blue-100">
      {icon}
    </div>
    <div>
      <h3 className="text-lg font-black text-slate-900 uppercase">{title}</h3>
      <p className="text-[10px] font-bold text-slate-600 uppercase">{description}</p>
    </div>
  </div>
);

const Settings = () => {
  const [activeTab, setActiveTab] = useState('Store');
  const [storeName, setStoreName] = useState('MedPharm Retail');
  const [taxRate] = useState(16);
  const [receiptFooter, setReceiptFooter] = useState('Thank you for choosing MedPharm!');
  const [lowStockAlert, setLowStockAlert] = useState(15);

  const tabs = [
    { id: 'Store', icon: '🏪', label: 'Store Profile' },
    { id: 'Receipts', icon: '🧾', label: 'Receipts & Invoices' },
    { id: 'System', icon: '⚙️', label: 'System Preferences' },
    { id: 'Security', icon: '🛡️', label: 'Security & Privacy' },
  ];

  return (
    <div className="flex flex-col lg:flex-row gap-1 min-h-[600px]">
...
      
      {/* SIDEBAR NAVIGATION */}
      <aside className="shrink-0">
        <div className="bg-white rounded-sm border border-blue-100 shadow-sm overflow-hidden p-3 space-y-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-sm transition-all duration-300 group ${
                activeTab === tab.id 
                  ? 'bg-linear-to-l from-blue-800 to-blue-950 text-white shadow-sm shadow-blue-600/20 active:scale-95' 
                  : 'text-slate-600 hover:bg-blue-50 hover:text-blue-700'
              }`}
            >
              <span className={`text-xl transition-transform duration-300 ${activeTab === tab.id ? 'scale-110' : 'group-hover:scale-110'}`}>
                {tab.icon}
              </span>
              <span className="text-[11px] font-black uppercase">
                {tab.label}
              </span>
            </button>
          ))}
        </div>
      </aside>

      {/* CONTENT AREA */}
      <div className="flex-1 bg-white rounded-sm border border-blue-100 shadow-xl p-2 lg:p-2 animate-in fade-in slide-in-from-right-4 duration-500">
        
        {activeTab === 'Store' && (
          <div className="space-y-3 animate-in fade-in duration-500">
            <SectionHeader 
              icon="🏪" 
              title="Store Profile" 
              description="Configure your primary business identity" 
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <SettingField 
                label="Store Legal Name" 
                description="This will appear on invoices and reports" 
                value={storeName} 
                setter={setStoreName} 
              />
              <SettingField 
                label="Store Branch ID" 
                description="Unique identifier for this location" 
                value="HQ-NRB-001" 
                setter={() => {}} 
                disabled
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="space-y-2">
                <label className="text-[11px] font-black text-slate-800 uppercase">Base Currency</label>
                <select className="w-full px-2 py-3 bg-slate-100 border border-blue-200 rounded-sm text-xs font-black text-slate-800 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500/30 transition-all appearance-none cursor-pointer">
                  <option>KSh — Kenyan Shilling</option>
                  <option>USD — US Dollar</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[11px] font-black text-slate-800 uppercase">Business Timezone</label>
                <select className="w-full px-2 py-3 bg-slate-100 border border-blue-200 rounded-sm text-xs font-black text-slate-800 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500/30 transition-all appearance-none cursor-pointer">
                  <option>UTC+3 — Nairobi (EAT)</option>
                  <option>UTC+0 — London (GMT)</option>
                </select>
              </div>
            </div>

            <div className="pt-6 border-t border-blue-200">
               <SettingField 
                label="VAT Registration Number" 
                description="P051234567Z (Optional for receipts)" 
                value="" 
                setter={() => {}} 
                placeholder="Enter PIN / VAT No."
              />
            </div>
          </div>
        )}

        {activeTab === 'Receipts' && (
          <div className="space-y-8 animate-in fade-in duration-500">
            <SectionHeader 
              icon="🧾" 
              title="Receipts & Invoices" 
              description="Customize the look and content of your bills" 
            />

            <SettingField 
              label="Default Footer Text" 
              description="Maximum 150 characters" 
              value={receiptFooter} 
              setter={setReceiptFooter} 
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2">
              <Toggle label="Print Company Logo" description="Include stylized logo on thermal header" enabled={true} />
              <Toggle label="Auto-Email Receipts" description="Send digital copy to customer on checkout" enabled={false} />
              <Toggle label="Show Stock Levels" description="Display remaining stock on receipt items" enabled={true} />
              <Toggle label="Print Tax Breakdown" description="Include KRA / VAT individual lines" enabled={true} />
            </div>

            <div className="mt-8 p-6 bg-blue-50/50 rounded-sm border border-blue-100 flex items-center justify-between">
              <div>
                <h4 className="text-[11px] font-black text-blue-900 uppercase">Receipt Template</h4>
                <p className="text-[10px] font-bold text-blue-400 uppercase  mt-1">Standard 80mm Thermal Paper</p>
              </div>
              <button className="px-5 py-2.5 bg-white border border-blue-200 rounded-sm text-[10px] font-black uppercase text-blue-600 hover:bg-blue-600 hover:text-white transition-all shadow-sm">
                Preview Layout
              </button>
            </div>
          </div>
        )}

        {activeTab === 'System' && (
          <div className="space-y-8 animate-in fade-in duration-500">
            <SectionHeader 
              icon="⚙️" 
              title="System Preferences" 
              description="Operational thresholds and engine settings" 
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <SettingField 
                label="Low Stock Threshold" 
                description="Global alert trigger value" 
                value={lowStockAlert} 
                setter={setLowStockAlert}
                type="number"
              />
              <div className="space-y-2">
                <label className="text-[11px] font-black text-slate-800 uppercase ">Session Lifecycle</label>
                <select className="w-full px-2 py-3 bg-slate-100 border border-blue-200 rounded-sm text-xs font-black text-slate-800 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500/30 transition-all appearance-none cursor-pointer">
                  <option>15 Minutes</option>
                  <option selected>30 Minutes</option>
                  <option>1 Hour</option>
                  <option>Persistent (24h)</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12">
                 <Toggle label="Hardware Acceleration" description="Improve scanner render performance" enabled={true} />
                 <Toggle label="Offline Syncing" description="Cache transactions when network drops" enabled={true} />
                 <Toggle label="Debug Overlays" description="Show performance metrics on scanner" enabled={false} />
                 <Toggle label="Auto-Update Engine" description="Keep core system binaries up to date" enabled={true} />
               </div>
            </div>
          </div>
        )}

        {activeTab === 'Security' && (
          <div className="space-y-8 animate-in fade-in duration-500">
            <SectionHeader 
              icon="🛡️" 
              title="Security & Privacy" 
              description="Protect your business data and user access" 
            />

            <div className="p-6 bg-slate-900 rounded-3xl text-white flex items-center justify-between">
               <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center text-xl shadow-lg">🔑</div>
                  <div>
                    <h4 className="text-[11px] font-black uppercase">Two-Factor Authentication</h4>
                    <p className="text-[10px] font-bold text-slate-400 uppercase mt-1">Highly recommended for admins</p>
                  </div>
               </div>
               <button className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 rounded-xl text-[10px] font-black uppercase transition-all shadow-xl shadow-blue-500/20 active:scale-95">
                 Enable Now
               </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 pt-4">
              <Toggle label="Force Password Change" description="Require change every 90 days" enabled={false} />
              <Toggle label="IP Restriction" description="Only allow access from specific networks" enabled={false} />
              <Toggle label="Biometric Checkout" description="Require fingerprint for large sales" enabled={true} />
              <Toggle label="Activity Auditing" description="Detailed logging of every transaction" enabled={true} />
            </div>

            <div className="mt-8 border-t border-red-50 pt-8">
               <button className="flex items-center space-x-3 text-red-500 hover:text-red-600 group transition-all">
                  <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center group-hover:bg-red-100 transition-all">🗑️</div>
                  <div className="text-left">
                     <p className="text-[11px] font-black uppercase">Wipe Local Storage</p>
                     <p className="text-[10px] font-bold uppercase opacity-60">Clears cached data and saved cart</p>
                  </div>
               </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default Settings;
