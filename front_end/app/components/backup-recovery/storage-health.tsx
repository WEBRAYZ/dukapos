'use client';

import React, { useState } from 'react';

const StorageHealth = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    nodeName: '',
    nodeCode: '',
    locationZone: '',
    storageType: '',
    status: 'Active',
    tags: '',
    totalCapacity: 0,
    capacityUnit: 'pallets',
    rackConfig: '',
    aisles: 0,
    levels: 0,
    maxWeight: 0,
    minTemp: '',
    maxTemp: '',
    minHumidity: '',
    maxHumidity: '',
    safetyFeatures: {
      fire: false,
      cctv: false,
      access: false,
      rfid: false,
      motion: false
    },
    supervisor: '',
    contact: '',
    notes: ''
  });

  const stats = [
    { label: 'Total Capacity', value: '12.5 TB', sub: 'Across 3 locations', color: 'text-gray-800' },
    { label: 'Used', value: '3.36 TB', sub: '26.8% utilized', color: 'text-olive' },
    { label: 'Free', value: '9.14 TB', sub: 'Available for backups', color: 'text-yellow-500' },
    { label: 'Health Score', value: '98/100', sub: 'All systems nominal', color: 'text-green-500' },
  ];

  const [locations, setLocations] = useState([
    { name: 'Cloud (S3)', used: '340 GB', total: '500 GB', percent: 68, status: 'Healthy', icon: '☁️' },
    { name: 'Local NVMe', used: '820 GB', total: '2 TB', percent: 41, status: 'Healthy', icon: '💾' },
    { name: 'Off-site Tape', used: '2.2 TB', total: '10 TB', percent: 22, status: 'Healthy', icon: '📼' },
  ]);

  const handleCreateNode = () => {
    const newNode = {
      name: formData.nodeName || 'New Node',
      used: '0 GB',
      total: `${formData.totalCapacity} ${formData.capacityUnit}`,
      percent: 0,
      status: 'Healthy',
      icon: formData.storageType === 'rack' ? '📦' : '💾'
    };
    setLocations([...locations, newNode]);
    setIsModalOpen(false);
    setCurrentStep(1);
    // Partial reset
    setFormData({
      ...formData,
      nodeName: '',
      nodeCode: '',
      tags: '',
      supervisor: '',
      contact: '',
      notes: ''
    });
  };

  const integrityChecks = [
    { label: 'Last integrity check', value: '2026-06-01 03:48', status: 'normal' },
    { label: 'Checksum verification', value: 'Passed (SHA-256)', status: 'success' },
    { label: 'Encryption status', value: 'AES-256-GCM Active', status: 'success' },
    { label: 'Replication sync', value: '2 of 3 nodes in sync', status: 'warning' },
    { label: 'Backup chain integrity', value: 'Intact — 28 consecutive', status: 'success' },
    { label: 'Storage redundancy', value: 'RAID-6 (N+2)', status: 'normal' },
  ];

  return (
    <div className="flex flex-col space-y-6 h-full overflow-y-auto custom-scrollbar pb-3 relative">
      
      {/* BACKGROUND CONTENT */}
      <div className={`flex flex-col space-y-6 transition-all duration-300 ${isModalOpen ? 'blur-[2px] pointer-events-none brightness-90' : ''}`}>
        {/* TOP STATS */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-white p-3 rounded-sm border border-blue-100 shadow-sm flex flex-col justify-center transition-transform hover:scale-[1.02] cursor-default">
              <p className="text-[10px] font-black text-slate-600 uppercase mb-1">{stat.label}</p>
              <p className={`text-2xl font-black ${stat.color}`}>{stat.value}</p>
              <p className="text-[9px] font-bold text-slate-600 uppercase mt-1">{stat.sub}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-col lg:flex-row gap-3">
          
          {/* STORAGE LOCATIONS */}
          <div className="flex-1 bg-white rounded-sm border border-blue-100 shadow-sm flex flex-col overflow-hidden">
            <div className="p-4 border-b border-blue-50 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <span className="text-xl">💾</span>
                <h2 className="text-[11px] font-black uppercase text-blue-900">Storage Locations</h2>
              </div>
              <button className="text-[10px] font-black text-blue-700 uppercase hover:text-olive flex items-center space-x-1.5 transition-colors">
                <span>↓</span>
                <span>Export Backup</span>
              </button>
            </div>

            <div className="p-4 space-y-3">
              {locations.map((loc) => (
                <div key={loc.name} className="group cursor-default">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center space-x-3">
                      <span className="text-lg group-hover:grayscale-0 transition-all">{loc.icon}</span>
                      <span className="text-[11px] font-black text-slate-900 uppercase">{loc.name}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-[10px] font-bold text-slate-600">{loc.used} / {loc.total}</span>
                      <span className="text-[10px] font-black text-green-600 uppercase flex items-center">
                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1.5" />
                        {loc.status}
                      </span>
                    </div>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden border border-blue-100">
                    <div 
                      className={`h-full rounded-full transition-all duration-1000 ${
                        loc.percent > 80 ? 'bg-blue-500' : 'bg-linear-to-l from-blue-800 to-blue-950'
                      }`}
                      style={{ width: `${loc.percent}%` }}
                    />
                  </div>
                  <div className="mt-1 flex justify-end">
                    <span className="text-[10px] font-black text-slate-600">{loc.percent}% USED</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-auto p-3 bg-slate-50/50 border-t border-blue-50 text-center">
              <button 
                onClick={() => setIsModalOpen(true)}
                className="text-[12px] font-black text-blue-900 uppercase hover:underline"
              >
                + Add Storage Node
              </button>
            </div>
          </div>

          {/* INTEGRITY CHECKS */}
          <div className="w-full lg:w-100 bg-white rounded-sm border border-blue-100 shadow-sm flex flex-col overflow-hidden">
            <div className="p-3 border-b border-blue-50 flex items-center space-x-3">
              <span className="text-xl">🔍</span>
              <h2 className="text-[11px] font-black uppercase text-blue-800 whitespace-nowrap">Integrity Checks</h2>
            </div>

            <div className="p-3 space-y-3">
              {integrityChecks.map((check) => (
                <div key={check.label} className="flex flex-col border-b border-blue-100 pb-3 last:border-0 last:pb-0 group">
                  <span className="text-[9px] font-black text-slate-600 uppercase mb-1.5 group-hover:text-slate-500 transition-colors">
                    {check.label}
                  </span>
                  <div className="flex items-center justify-between">
                    <span className={`text-[11px] font-black tracking-tight ${
                      check.status === 'success' ? 'text-slate-800' : 
                      check.status === 'warning' ? 'text-blue-600' : 'text-slate-600'
                    }`}>
                      {check.value}
                    </span>
                    {check.status === 'success' && (
                      <span className="text-[9px] font-black text-green-500 bg-green-50 px-2 py-0.5 rounded uppercase">Verified</span>
                    )}
                    {check.status === 'warning' && (
                      <span className="text-[9px] font-black text-red-500 bg-orange-50 px-2 py-0.5 rounded uppercase">Syncing</span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-auto p-4 bg-olive/5 border-t border-olive/10">
              <button className="w-full py-3 bg-linear-to-l from-blue-700 to-blue-950 text-white  text-[10px] font-black uppercase hover:bg-blue-800 transition-all shadow-md active:scale-[0.98]">
                Run Full Validation
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL OVERLAY */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-blue-950/20 backdrop-blur-[2px] p-4">
          <div className="bg-white w-full max-w-2xl shadow-2xl border border-blue-100 rounded-sm overflow-hidden animate-in fade-in zoom-in duration-200 flex flex-col max-h-[90vh]">
            
            {/* MODAL HEADER */}
            <div className="bg-slate-50 p-6 border-b border-blue-50">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-[16px] font-black text-blue-950 uppercase tracking-tight">Add Storage Node</h3>
                  <p className="text-[11px] font-bold text-slate-500 mt-1">Configure a new storage location node with capacity, environment, and safety parameters.</p>
                </div>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-200 transition-colors"
                >
                  <span className="text-sm text-slate-500 font-bold">✕</span>
                </button>
              </div>

              {/* STEPS INDICATOR */}
              <div className="flex items-center justify-between max-w-md mx-auto">
                {['IDENTITY', 'DIMENSIONS', 'ENVIRONMENT', 'SAFETY & TECH', 'PERSONNEL'].map((step, idx) => (
                  <div key={step} className="flex flex-col items-center group cursor-pointer" onClick={() => setCurrentStep(idx + 1)}>
                    <div className={`w-2.5 h-2.5 rounded-full mb-2 transition-all ${idx + 1 <= currentStep ? 'bg-blue-600 ring-4 ring-blue-100' : 'bg-slate-200'}`} />
                    <span className={`text-[8px] font-black tracking-tighter uppercase ${idx + 1 === currentStep ? 'text-blue-600' : 'text-slate-400'}`}>
                      {step}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* MODAL CONTENT */}
            <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
              {currentStep === 1 && (
                <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
                  <div className="flex items-center space-x-4 mb-8">
                    <div className="w-12 h-12 bg-blue-50 rounded-sm flex items-center justify-center border border-blue-100">
                      <span className="text-2xl">🏷️</span>
                    </div>
                    <div>
                      <h4 className="text-[13px] font-black text-blue-950 uppercase">Node Identity</h4>
                      <p className="text-[10px] font-bold text-slate-400 uppercase">Basic Identification & Zone Assignment</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[10px] font-black text-slate-500 uppercase mb-1.5">Node Name *</label>
                      <input 
                        type="text" 
                        placeholder="e.g. Aisle 3 – Bay 12"
                        value={formData.nodeName}
                        onChange={(e) => setFormData({...formData, nodeName: e.target.value})}
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-sm text-[12px] font-bold text-slate-800 focus:outline-hidden focus:border-blue-400 transition-colors placeholder:text-slate-300"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-slate-500 uppercase mb-1.5">Node Code *</label>
                      <input 
                        type="text" 
                        placeholder="e.g. SL-A3-B12"
                        value={formData.nodeCode}
                        onChange={(e) => setFormData({...formData, nodeCode: e.target.value})}
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-sm text-[12px] font-bold text-slate-800 focus:outline-hidden focus:border-blue-400 transition-colors placeholder:text-slate-300"
                      />
                      <p className="mt-1.5 text-[9px] font-bold text-slate-400 italic">Unique identifier used in barcodes & RFID</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[10px] font-black text-slate-500 uppercase mb-1.5">Location Zone *</label>
                      <select 
                        value={formData.locationZone}
                        onChange={(e) => setFormData({...formData, locationZone: e.target.value})}
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-sm text-[12px] font-bold text-slate-800 focus:outline-hidden focus:border-blue-400 transition-colors appearance-none"
                      >
                        <option value="">Select…</option>
                        <option value="zone-a">Zone A (Dry Storage)</option>
                        <option value="zone-b">Zone B (Cold Chain)</option>
                        <option value="zone-c">Zone C (Hazardous)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-slate-500 uppercase mb-1.5">Storage Type *</label>
                      <select 
                        value={formData.storageType}
                        onChange={(e) => setFormData({...formData, storageType: e.target.value})}
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-sm text-[12px] font-bold text-slate-800 focus:outline-hidden focus:border-blue-400 transition-colors appearance-none"
                      >
                        <option value="">Select…</option>
                        <option value="rack">Pallet Rack</option>
                        <option value="shelf">Shelving Unit</option>
                        <option value="floor">Floor Stack</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[10px] font-black text-slate-500 uppercase mb-1.5">Status</label>
                      <div className="flex space-x-2">
                        {['Active', 'Inactive', 'Maintenance'].map((s) => (
                          <button
                            key={s}
                            onClick={() => setFormData({...formData, status: s})}
                            className={`flex-1 py-2 rounded-sm text-[10px] font-black uppercase transition-all ${
                              formData.status === s 
                                ? 'bg-blue-600 text-white shadow-md' 
                                : 'bg-slate-50 text-slate-400 border border-slate-100 hover:bg-slate-100'
                            }`}
                          >
                            {s}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-slate-500 uppercase mb-1.5">Tags / Labels</label>
                      <input 
                        type="text" 
                        placeholder="e.g. bonded, high-value, cold-chain"
                        value={formData.tags}
                        onChange={(e) => setFormData({...formData, tags: e.target.value})}
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-sm text-[12px] font-bold text-slate-800 focus:outline-hidden focus:border-blue-400 transition-colors placeholder:text-slate-300"
                      />
                      <p className="mt-1.5 text-[9px] font-bold text-slate-400 italic">Comma-separated, e.g. perishable, priority, bonded</p>
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
                  <div className="flex items-center space-x-4 mb-8">
                    <div className="w-12 h-12 bg-blue-50 rounded-sm flex items-center justify-center border border-blue-100">
                      <span className="text-2xl">📐</span>
                    </div>
                    <div>
                      <h4 className="text-[13px] font-black text-blue-950 uppercase">Capacity & Dimensions</h4>
                      <p className="text-[10px] font-bold text-slate-400 uppercase">Physical capacity limits & layout configuration</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[10px] font-black text-slate-500 uppercase mb-1.5">Total Capacity *</label>
                      <input 
                        type="number" 
                        value={formData.totalCapacity}
                        onChange={(e) => setFormData({...formData, totalCapacity: parseInt(e.target.value) || 0})}
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-sm text-[12px] font-bold text-slate-800 focus:outline-hidden focus:border-blue-400 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-slate-500 uppercase mb-1.5">Capacity Unit</label>
                      <select 
                        value={formData.capacityUnit}
                        onChange={(e) => setFormData({...formData, capacityUnit: e.target.value})}
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-sm text-[12px] font-bold text-slate-800 focus:outline-hidden focus:border-blue-400 transition-colors appearance-none"
                      >
                        <option value="pallets">pallets</option>
                        <option value="bins">bins</option>
                        <option value="cubic-meters">cubic meters (m³)</option>
                        <option value="kilograms">kilograms (kg)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-black text-slate-500 uppercase mb-1.5">Rack Configuration</label>
                    <select 
                      value={formData.rackConfig}
                      onChange={(e) => setFormData({...formData, rackConfig: e.target.value})}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-sm text-[12px] font-bold text-slate-800 focus:outline-hidden focus:border-blue-400 transition-colors appearance-none"
                    >
                      <option value="">Select…</option>
                      <option value="selective">Selective Racking</option>
                      <option value="drive-in">Drive-In Racking</option>
                      <option value="push-back">Push-Back Racking</option>
                      <option value="cantilever">Cantilever Racking</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-3 gap-6">
                    <div>
                      <label className="block text-[10px] font-black text-slate-500 uppercase mb-1.5">Number of Aisles</label>
                      <input 
                        type="number" 
                        value={formData.aisles}
                        onChange={(e) => setFormData({...formData, aisles: parseInt(e.target.value) || 0})}
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-sm text-[12px] font-bold text-slate-800 focus:outline-hidden focus:border-blue-400 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-slate-500 uppercase mb-1.5">Number of Levels</label>
                      <input 
                        type="number" 
                        value={formData.levels}
                        onChange={(e) => setFormData({...formData, levels: parseInt(e.target.value) || 0})}
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-sm text-[12px] font-bold text-slate-800 focus:outline-hidden focus:border-blue-400 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-slate-500 uppercase mb-1.5">Max Weight per Unit (kg)</label>
                      <input 
                        type="number" 
                        value={formData.maxWeight}
                        onChange={(e) => setFormData({...formData, maxWeight: parseInt(e.target.value) || 0})}
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-sm text-[12px] font-bold text-slate-800 focus:outline-hidden focus:border-blue-400 transition-colors"
                      />
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
                  <div className="flex items-center space-x-4 mb-8">
                    <div className="w-12 h-12 bg-blue-50 rounded-sm flex items-center justify-center border border-blue-100">
                      <span className="text-2xl">🌡️</span>
                    </div>
                    <div>
                      <h4 className="text-[13px] font-black text-blue-950 uppercase">Environmental Parameters</h4>
                      <p className="text-[10px] font-bold text-slate-400 uppercase">Climate & Atmospheric control settings</p>
                    </div>
                  </div>

                  <p className="text-[10px] font-bold text-blue-600 bg-blue-50/50 p-2 rounded-sm border border-blue-100 inline-block">
                    Leave blank if not climate-controlled
                  </p>

                  <div className="grid grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <h5 className="text-[10px] font-black text-slate-800 uppercase border-b border-slate-100 pb-1">Temperature Control</h5>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[10px] font-black text-slate-500 uppercase mb-1.5">Min Temp (°C)</label>
                          <input 
                            type="number" 
                            placeholder="e.g. 2"
                            value={formData.minTemp}
                            onChange={(e) => setFormData({...formData, minTemp: e.target.value})}
                            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-sm text-[12px] font-bold text-slate-800 focus:outline-hidden focus:border-blue-400 transition-colors"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-black text-slate-500 uppercase mb-1.5">Max Temp (°C)</label>
                          <input 
                            type="number" 
                            placeholder="e.g. 8"
                            value={formData.maxTemp}
                            onChange={(e) => setFormData({...formData, maxTemp: e.target.value})}
                            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-sm text-[12px] font-bold text-slate-800 focus:outline-hidden focus:border-blue-400 transition-colors"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h5 className="text-[10px] font-black text-slate-800 uppercase border-b border-slate-100 pb-1">Humidity Control</h5>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[10px] font-black text-slate-500 uppercase mb-1.5">Min Humidity (%RH)</label>
                          <input 
                            type="number" 
                            placeholder="e.g. 40"
                            value={formData.minHumidity}
                            onChange={(e) => setFormData({...formData, minHumidity: e.target.value})}
                            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-sm text-[12px] font-bold text-slate-800 focus:outline-hidden focus:border-blue-400 transition-colors"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-black text-slate-500 uppercase mb-1.5">Max Humidity (%RH)</label>
                          <input 
                            type="number" 
                            placeholder="e.g. 65"
                            value={formData.maxHumidity}
                            onChange={(e) => setFormData({...formData, maxHumidity: e.target.value})}
                            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-sm text-[12px] font-bold text-slate-800 focus:outline-hidden focus:border-blue-400 transition-colors"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 4 && (
                <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
                  <div className="flex items-center space-x-4 mb-8">
                    <div className="w-12 h-12 bg-blue-50 rounded-sm flex items-center justify-center border border-blue-100">
                      <span className="text-2xl">🔒</span>
                    </div>
                    <div>
                      <h4 className="text-[13px] font-black text-blue-950 uppercase">Safety & Technology Features</h4>
                      <p className="text-[10px] font-bold text-slate-400 uppercase">Security, Protection & Tracking systems</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {[
                      { id: 'fire', label: 'Fire Suppression System', icon: '🔥' },
                      { id: 'cctv', label: '24/7 CCTV Monitoring', icon: '📹' },
                      { id: 'access', label: 'Biometric Access Control', icon: '🔑' },
                      { id: 'rfid', label: 'RFID Inventory Tracking', icon: '📡' },
                      { id: 'motion', label: 'Motion Detection Sensors', icon: '🚶' },
                    ].map((feature) => (
                      <div key={feature.id} className="flex items-center justify-between p-4 bg-slate-50 border border-slate-100 rounded-sm hover:bg-slate-100 transition-colors">
                        <div className="flex items-center space-x-3">
                          <span className="text-lg">{feature.icon}</span>
                          <span className="text-[11px] font-black text-slate-800 uppercase">{feature.label}</span>
                        </div>
                        <button 
                          onClick={() => setFormData({
                            ...formData, 
                            safetyFeatures: {
                              ...formData.safetyFeatures, 
                              // @ts-ignore
                              [feature.id]: !formData.safetyFeatures[feature.id]
                            }
                          })}
                          className={`w-10 h-5 rounded-full relative transition-colors ${
                            // @ts-ignore
                            formData.safetyFeatures[feature.id] ? 'bg-blue-600' : 'bg-slate-300'
                          }`}
                        >
                          <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition-all ${
                            // @ts-ignore
                            formData.safetyFeatures[feature.id] ? 'right-0.5' : 'left-0.5'
                          }`} />
                        </button>
                      </div>
                    ))}
                  </div>
                  
                  {Object.values(formData.safetyFeatures).every(v => !v) && (
                    <div className="py-12 flex flex-col items-center justify-center border-2 border-dashed border-slate-100 rounded-sm">
                       <span className="text-2xl mb-2 opacity-20">🔒</span>
                       <p className="text-[11px] font-black text-slate-400 uppercase">No features enabled yet</p>
                    </div>
                  )}
                </div>
              )}

              {currentStep === 5 && (
                <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
                  <div className="flex items-center space-x-4 mb-8">
                    <div className="w-12 h-12 bg-blue-50 rounded-sm flex items-center justify-center border border-blue-100">
                      <span className="text-2xl">👤</span>
                    </div>
                    <div>
                      <h4 className="text-[13px] font-black text-blue-950 uppercase">Personnel & Responsibility</h4>
                      <p className="text-[10px] font-bold text-slate-400 uppercase">Management & Accountability Assignment</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[10px] font-black text-slate-500 uppercase mb-1.5">Node Supervisor</label>
                      <input 
                        type="text" 
                        placeholder="Full name"
                        value={formData.supervisor}
                        onChange={(e) => setFormData({...formData, supervisor: e.target.value})}
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-sm text-[12px] font-bold text-slate-800 focus:outline-hidden focus:border-blue-400 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-slate-500 uppercase mb-1.5">Supervisor Contact</label>
                      <input 
                        type="text" 
                        placeholder="+254 7XX XXX XXX"
                        value={formData.contact}
                        onChange={(e) => setFormData({...formData, contact: e.target.value})}
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-sm text-[12px] font-bold text-slate-800 focus:outline-hidden focus:border-blue-400 transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-black text-slate-500 uppercase mb-1.5 flex items-center space-x-2">
                      <span>📝</span>
                      <span>Additional Notes</span>
                    </label>
                    <textarea 
                      rows={3}
                      placeholder="Special handling instructions, access restrictions, regulatory notes, etc."
                      value={formData.notes}
                      onChange={(e) => setFormData({...formData, notes: e.target.value})}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-sm text-[12px] font-bold text-slate-800 focus:outline-hidden focus:border-blue-400 transition-colors resize-none"
                    />
                  </div>

                  <div className="mt-8 p-6 bg-slate-900 rounded-sm border border-slate-800 shadow-xl">
                    <h5 className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-4 flex items-center">
                      <span className="w-4 h-[1px] bg-blue-400 mr-2" />
                      Node Summary
                      <span className="w-4 h-[1px] bg-blue-400 ml-2" />
                    </h5>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-y-4 gap-x-8">
                      <div>
                        <p className="text-[9px] font-black text-slate-500 uppercase">Node</p>
                        <p className="text-[12px] font-bold text-white uppercase">{formData.nodeName || '—'}</p>
                      </div>
                      <div>
                        <p className="text-[9px] font-black text-slate-500 uppercase">Code</p>
                        <p className="text-[12px] font-bold text-white uppercase">{formData.nodeCode || '—'}</p>
                      </div>
                      <div>
                        <p className="text-[9px] font-black text-slate-500 uppercase">Zone</p>
                        <p className="text-[12px] font-bold text-white uppercase">{formData.locationZone || '—'}</p>
                      </div>
                      <div>
                        <p className="text-[9px] font-black text-slate-500 uppercase">Type</p>
                        <p className="text-[12px] font-bold text-white uppercase">{formData.storageType || '—'}</p>
                      </div>
                      <div>
                        <p className="text-[9px] font-black text-slate-500 uppercase">Capacity</p>
                        <p className="text-[12px] font-bold text-white uppercase">{formData.totalCapacity ? `${formData.totalCapacity} ${formData.capacityUnit}` : '—'}</p>
                      </div>
                      <div>
                        <p className="text-[9px] font-black text-slate-500 uppercase">Status</p>
                        <p className="text-[12px] font-bold text-green-400 uppercase">{formData.status}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* MODAL FOOTER */}
            <div className="p-6 bg-slate-50 border-t border-blue-50 flex justify-between items-center">
              <button 
                onClick={() => currentStep > 1 && setCurrentStep(currentStep - 1)}
                className={`text-[11px] font-black uppercase flex items-center space-x-2 transition-colors ${
                  currentStep > 1 ? 'text-blue-900 hover:text-blue-700' : 'text-slate-300 pointer-events-none'
                }`}
              >
                <span>← Previous</span>
              </button>
              
              <button 
                onClick={() => currentStep === 5 ? handleCreateNode() : setCurrentStep(currentStep + 1)}
                className="bg-blue-900 hover:bg-blue-800 text-white px-8 py-3 rounded-sm text-[11px] font-black uppercase tracking-wider transition-all flex items-center space-x-2 shadow-lg shadow-blue-900/10"
              >
                <span>{currentStep === 5 ? '✓ Create Node' : 'Next →'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StorageHealth;
