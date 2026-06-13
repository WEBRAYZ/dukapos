'use client';

import React, { useState } from 'react';

const BackupScheduling = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    frequency: 'Daily',
    time: '02:00',
    priority: 'normal',
    storageTarget: 'AWS S3',
    destinationPath: 's3://my-bucket/backups/production',
    retention: '30 days',
    compression: 'GZIP',
    encryption: true,
    incremental: true,
    tags: '',
    emailAlerts: true,
    onSuccess: false,
    onFailure: true,
    recipients: 'admin@ndukapos.com'
  });

  const [schedules, setSchedules] = useState([
    { name: 'Full Backup', frequency: 'Daily 03:00', nextRun: '2026-06-02 03:00', retention: '30 days', status: 'Active', toggle: true },
    { name: 'Incremental', frequency: 'Every 6 hrs', nextRun: '2026-06-01 21:00', retention: '7 days', status: 'Active', toggle: true },
    { name: 'Differential', frequency: 'Every 12 hrs', nextRun: '2026-06-01 15:00', retention: '14 days', status: 'Paused', toggle: false },
    { name: 'Weekly Archive', frequency: 'Sunday 02:00', nextRun: '2026-06-07 02:00', retention: '1 year', status: 'Active', toggle: true },
  ]);

  const handleCreateSchedule = () => {
    const newSchedule = {
      name: formData.name || 'New Schedule',
      frequency: `${formData.frequency} ${formData.time}`,
      nextRun: 'Pending...',
      retention: formData.retention,
      status: 'Active',
      toggle: true
    };
    setSchedules([...schedules, newSchedule]);
    setIsModalOpen(false);
    setCurrentStep(1);
    // Reset transient fields
    setFormData({
      ...formData,
      name: '',
      description: '',
      tags: ''
    });
  };

  const timeline = [
    { time: '15:00', type: 'Diff', color: 'bg-orange-500' },
    { time: '21:00', type: 'Incr', color: 'bg-blue-500' },
    { time: '03:00', type: 'Full', color: 'bg-green-500' },
    { time: '09:00', type: 'Incr', color: 'bg-blue-500' },
    { time: '15:00', type: 'Diff', color: 'bg-orange-500' },
  ];

  return (
    <div className="flex flex-col lg:flex-row gap-4 h-full relative">
      {/* LEFT: BACKUP SCHEDULES TABLE */}
      <div className={`flex-1 bg-white rounded-sm border border-blue-100 shadow-sm flex flex-col overflow-hidden transition-all ${isModalOpen ? 'blur-[2px] pointer-events-none brightness-95' : ''}`}>
        <div className="p-3 border-b border-blue-50 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="text-xl">⏱</span>
            <h2 className="text-[11px] font-black uppercase text-blue-800">Backup Schedules</h2>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-[10px] font-bold text-blue-500 uppercase  bg-blue-50 px-2 py-1 rounded-full">Auto-running</span>
            <button className="bg-slate-100 hover:bg-gray-100 px-2 rounded-sm transition-colors">
              <span className="text-xs">⚙️</span>
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar">
          <table className="w-full text-left border-collapse">
            <thead className="sticky top-0 bg-white/95 backdrop-blur-sm z-10">
              <tr className="border-b border-gray-50 text-[10px] font-black text-blue-900 uppercase">
                <th className="px-4 py-4">Name</th>
                <th className="px-4 py-4">Frequency</th>
                <th className="px-4 py-4">Next Run</th>
                <th className="px-4 py-4">Retention</th>
                <th className="px-4 py-4 text-center">Status</th>
                <th className="px-4 py-4 text-right">Toggle</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {schedules.map((schedule) => (
                <tr key={schedule.name} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-4 py-4">
                    <span className="text-[12px] font-black text-slate-800">{schedule.name}</span>
                  </td>
                  <td className="px-4 py-4">
                    <span className="text-[10px] font-bold text-gray-500 uppercase">{schedule.frequency}</span>
                  </td>
                  <td className="px-4 py-4">
                    <span className="text-[10px] font-bold text-gray-600 font-mono">{schedule.nextRun}</span>
                  </td>
                  <td className="px-4 py-4">
                    <span className="text-[10px] font-bold text-gray-400 uppercase">{schedule.retention}</span>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <span className={`text-[10px] font-black px-2.5 py-1 rounded-full uppercase border ${
                      schedule.status === 'Active' 
                        ? 'bg-green-50 text-green-500 border-green-100' 
                        : 'bg-red-50 text-red-600 border-red-100'
                    }`}>
                      {schedule.status}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-right">
                    <button className={`w-8 h-4 rounded-full relative transition-colors ${schedule.toggle ? 'bg-linear-to-l from-blue-800 to-blue-950' : 'bg-slate-300'}`}>
                      <div className={`absolute top-0.5 w-3 h-3 bg-white rounded-full transition-all ${schedule.toggle ? 'right-0.5' : 'left-0.5'}`} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="p-3 bg-slate-50/50 border-t border-blue-50 flex items-center justify-between">
          <p className="text-[10px] font-bold text-slate-500 uppercase">4 Active Policies</p>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="text-[12px] font-black text-blue-900 uppercase hover:underline"
          >
            + Create New Schedule
          </button>
        </div>
      </div>

      {/* RIGHT: NEXT 24H SCHEDULE */}
      <div className={`w-full lg:w-80 bg-white rounded-sm border border-blue-100 shadow-sm p-3 flex flex-col transition-all ${isModalOpen ? 'blur-[2px] pointer-events-none brightness-95' : ''}`}>
        <div className="flex items-center space-x-3 mb-3">
          <span className="text-xl">📅</span>
          <h2 className="text-[11px] font-black uppercase text-blue-900 whitespace-nowrap">Next 24h Schedule</h2>
        </div>

        <div className="flex-1 relative">
          {/* VERTICAL LINE */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-slate-100 rounded-full" />

          <div className="space-y-4 relative">
            {timeline.map((item, idx) => (
              <div key={idx} className="flex items-center space-x-4 group cursor-default">
                <div className="flex flex-col items-center">
                  <div className={`w-4 h-4 rounded-full ${item.color} border-4 border-white ring-1 ring-slate-100 z-10`} />
                </div>
                <div className="flex flex-col">
                  <span className="text-[12px] font-black text-slate-800">{item.time}</span>
                  <div className="flex items-center space-x-2 mt-0.5">
                    <span className={`text-[10px] font-black px-1.5 py-0.5 text-white uppercase ${item.color}`}>
                      {item.type}
                    </span>
                    {idx === 0 && (
                      <span className="text-[8px] font-bold text-slate-600 uppercase animate-pulse">Running...</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-3 pt-3 border-t border-blue-100">
          <div className="bg-slate-100 rounded-sm p-3">
            <p className="text-[9px] font-black text-slate-600 uppercase mb-2">Resource Impact</p>
            <div className="flex items-center space-x-2">
              <div className="flex-1 h-1 bg-slate-200 rounded-full overflow-hidden">
                <div className="w-[15%] h-full bg-linear-to-l from-blue-800 to-blue-950 rounded-full" />
              </div>
              <span className="text-[10px] font-black text-slate-900">LOW</span>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL OVERLAY */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-blue-900/20 backdrop-blur-[2px] p-4">
          <div className="bg-white w-full max-w-lg shadow-2xl border border-blue-100 rounded-sm overflow-hidden animate-in fade-in zoom-in duration-200">
            {/* MODAL HEADER */}
            <div className="bg-slate-50 p-4 border-b border-blue-50 flex items-center justify-between">
              <div>
                <p className="text-[10px] font-black text-blue-500 uppercase">Backup Manager</p>
                <h3 className="text-[13px] font-black text-blue-900 uppercase">New Schedule</h3>
              </div>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-slate-200 transition-colors"
              >
                <span className="text-xs text-slate-600 font-bold">✕</span>
              </button>
            </div>

            {/* PROGRESS BAR */}
            <div className="p-4 bg-white">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-black text-blue-900 uppercase">Step {currentStep}/4</span>
                <div className="flex space-x-1">
                  {[1, 2, 3, 4].map((step) => (
                    <div 
                      key={step} 
                      className={`h-1 w-8 rounded-full ${step <= currentStep ? 'bg-blue-600' : 'bg-slate-100'}`}
                    />
                  ))}
                </div>
              </div>
              
              {/* TABS INDICATOR */}
              <div className="flex border-b border-blue-100 mb-4">
                {['Schedule', 'Storage', 'Options', 'Alerts'].map((tab, idx) => (
                  <div 
                    key={tab}
                    className={`px-4 py-2 text-[10px] font-black uppercase transition-colors ${
                      idx + 1 === currentStep 
                        ? 'text-blue-600 border-b-2 border-blue-600' 
                        : 'text-slate-400'
                    }`}
                  >
                    {tab}
                  </div>
                ))}
              </div>

              {/* FORM CONTENT (STEP 1) */}
              {currentStep === 1 && (
                <div className="space-y-4 animate-in slide-in-from-right-2 duration-300">
                  <div>
                    <label className="block text-[10px] font-black text-slate-600 uppercase mb-1">Schedule Name</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Daily Web Assets"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full px-3 py-2 bg-slate-100 border border-blue-200 rounded-sm text-[12px] font-bold text-slate-800 focus:outline-hidden focus:border-blue-400 transition-colors"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-[10px] font-black text-slate-600 uppercase mb-1">Description (optional)</label>
                    <textarea 
                      rows={2}
                      placeholder="What is this schedule for?"
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                      className="w-full px-3 py-2 bg-slate-100 border border-blue-200 rounded-sm text-[12px] font-bold text-slate-800 focus:outline-hidden focus:border-blue-400 transition-colors resize-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-black text-slate-600 uppercase mb-1">Frequency</label>
                      <select 
                        value={formData.frequency}
                        onChange={(e) => setFormData({...formData, frequency: e.target.value})}
                        className="w-full px-3 py-2 bg-slate-100 border border-blue-200 rounded-sm text-[12px] font-bold text-slate-800 focus:outline-hidden focus:border-blue-400 transition-colors appearance-none"
                      >
                        <option>Daily</option>
                        <option>Weekly</option>
                        <option>Monthly</option>
                        <option>Hourly</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-slate-600 uppercase mb-1">Time (UTC)</label>
                      <input 
                        type="time" 
                        value={formData.time}
                        onChange={(e) => setFormData({...formData, time: e.target.value})}
                        className="w-full px-3 py-2 bg-slate-100 border border-blue-200 rounded-sm text-[12px] font-bold text-slate-800 focus:outline-hidden focus:border-blue-400 transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-black text-slate-600 uppercase mb-2">Priority</label>
                    <div className="flex space-x-3">
                      {['low', 'normal', 'high'].map((p) => (
                        <button
                          key={p}
                          onClick={() => setFormData({...formData, priority: p})}
                          className={`flex-1 py-1.5 rounded-sm text-[10px] font-black uppercase transition-all ${
                            formData.priority === p 
                              ? 'bg-linear-to-l from-blue-500 to-blue-800 text-white shadow-sm' 
                              : 'bg-slate-100 text-slate-500 border border-blue-100 hover:bg-blue-100'
                          }`}
                        >
                          {p}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* FORM CONTENT (STEP 2) */}
              {currentStep === 2 && (
                <div className="space-y-4 animate-in slide-in-from-right-2 duration-300">
                  <div>
                    <label className="block text-[10px] font-black text-slate-600 uppercase mb-2">Storage Target</label>
                    <div className="grid grid-cols-3 gap-2">
                      {['AWS S3', 'Google Cloud Storage', 'Azure Blob', 'Local Disk', 'FTP/SFTP', 'Backblaze B2'].map((target) => (
                        <button
                          key={target}
                          onClick={() => setFormData({...formData, storageTarget: target})}
                          className={`py-2 px-1 rounded-sm text-[9px] font-black uppercase border transition-all ${
                            formData.storageTarget === target 
                              ? 'bg-blue-50 border-blue-200 text-blue-700 ring-1 ring-blue-200' 
                              : 'bg-white border-blue-100 text-slate-500 hover:border-blue-300'
                          }`}
                        >
                          {target}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-black text-slate-700 uppercase mb-1">Destination Path</label>
                    <input 
                      type="text" 
                      placeholder="s3://my-bucket/backups/production"
                      value={formData.destinationPath}
                      onChange={(e) => setFormData({...formData, destinationPath: e.target.value})}
                      className="w-full px-3 py-2 bg-slate-100 border border-blue-200 rounded-sm text-[12px] font-bold text-slate-800 focus:outline-hidden focus:border-blue-400 transition-colors"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-black text-slate-600 uppercase mb-1">Retention</label>
                      <select 
                        value={formData.retention}
                        onChange={(e) => setFormData({...formData, retention: e.target.value})}
                        className="w-full px-3 py-2 bg-slate-100 border border-blue-200 rounded-sm text-[12px] font-bold text-slate-800 focus:outline-hidden focus:border-blue-400 transition-colors appearance-none"
                      >
                        <option>7 days</option>
                        <option>30 days</option>
                        <option>90 days</option>
                        <option>1 year</option>
                        <option>Indefinite</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-slate-600 uppercase mb-1">Compression</label>
                      <select 
                        value={formData.compression}
                        onChange={(e) => setFormData({...formData, compression: e.target.value})}
                        className="w-full px-3 py-2 bg-slate-100 border border-blue-200 rounded-sm text-[12px] font-bold text-slate-800 focus:outline-hidden focus:border-blue-400 transition-colors appearance-none"
                      >
                        <option>GZIP</option>
                        <option>BZIP2</option>
                        <option>XZ</option>
                        <option>None</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* FORM CONTENT (STEP 3) */}
              {currentStep === 3 && (
                <div className="space-y-6 animate-in slide-in-from-right-2 duration-300">
                  <div className="flex items-center justify-between p-3 bg-slate-100 border border-blue-100 rounded-sm">
                    <div>
                      <p className="text-[11px] font-black text-slate-800 uppercase">AES-256 Encryption</p>
                      <p className="text-[10px] font-bold text-slate-500">Encrypt backup data at rest</p>
                    </div>
                    <button 
                      onClick={() => setFormData({...formData, encryption: !formData.encryption})}
                      className={`w-10 h-5 rounded-full relative transition-colors ${formData.encryption ? 'bg-blue-600' : 'bg-slate-300'}`}
                    >
                      <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition-all ${formData.encryption ? 'right-0.5' : 'left-0.5'}`} />
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-slate-100 border border-blue-100 rounded-sm">
                    <div>
                      <p className="text-[11px] font-black text-slate-800 uppercase">Incremental Backup</p>
                      <p className="text-[10px] font-bold text-slate-600">Only backup changed files</p>
                    </div>
                    <button 
                      onClick={() => setFormData({...formData, incremental: !formData.incremental})}
                      className={`w-10 h-5 rounded-full relative transition-colors ${formData.incremental ? 'bg-blue-600' : 'bg-slate-300'}`}
                    >
                      <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition-all ${formData.incremental ? 'right-0.5' : 'left-0.5'}`} />
                    </button>
                  </div>

                  <div>
                    <label className="block text-[10px] font-black text-slate-500 uppercase mb-1">Tags (optional)</label>
                    <input 
                      type="text" 
                      placeholder="production, database, critical"
                      value={formData.tags}
                      onChange={(e) => setFormData({...formData, tags: e.target.value})}
                      className="w-full px-3 py-2 bg-slate-100 border border-blue-200 rounded-sm text-[12px] font-bold text-slate-800 focus:outline-hidden focus:border-blue-400 transition-colors"
                    />
                    <p className="mt-1 text-[10px] font-bold text-slate-600 italic">Comma-separated</p>
                  </div>
                </div>
              )}

              {/* FORM CONTENT (STEP 4) */}
              {currentStep === 4 && (
                <div className="space-y-4 animate-in slide-in-from-right-2 duration-300">
                  <div className="flex items-center justify-between p-3 bg-slate-100 border border-blue-100 rounded-sm">
                    <div>
                      <p className="text-[11px] font-black text-slate-800 uppercase">Email Notifications</p>
                      <p className="text-[10px] font-bold text-slate-600">Receive status alerts via email</p>
                    </div>
                    <button 
                      onClick={() => setFormData({...formData, emailAlerts: !formData.emailAlerts})}
                      className={`w-10 h-5 rounded-full relative transition-colors ${formData.emailAlerts ? 'bg-blue-600' : 'bg-slate-300'}`}
                    >
                      <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition-all ${formData.emailAlerts ? 'right-0.5' : 'left-0.5'}`} />
                    </button>
                  </div>

                  <div className={`space-y-4 transition-all duration-300 ${formData.emailAlerts ? 'opacity-100 translate-y-0' : 'opacity-40 pointer-events-none -translate-y-2'}`}>
                    <div className="grid grid-cols-2 gap-4">
                      <label className="flex items-center space-x-3 p-3 bg-slate-50 rounded-sm border border-blue-100 cursor-pointer hover:bg-slate-100 transition-colors">
                        <input 
                          type="checkbox" 
                          checked={formData.onSuccess}
                          onChange={(e) => setFormData({...formData, onSuccess: e.target.checked})}
                          className="w-4 h-4 border-blue-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-[10px] font-black text-slate-700 uppercase">On Success</span>
                      </label>
                      <label className="flex items-center space-x-3 p-3 bg-slate-100 rounded-sm border border-blue-100 cursor-pointer hover:bg-slate-100 transition-colors">
                        <input 
                          type="checkbox" 
                          checked={formData.onFailure}
                          onChange={(e) => setFormData({...formData, onFailure: e.target.checked})}
                          className="w-4 h-4 border-slate-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-[10px] font-black text-slate-700 uppercase">On Failure</span>
                      </label>
                    </div>

                    <div>
                      <label className="block text-[10px] font-black text-slate-600 uppercase mb-1">Recipient Emails</label>
                      <input 
                        type="email" 
                        placeholder="admin@ndukapos.com"
                        value={formData.recipients}
                        onChange={(e) => setFormData({...formData, recipients: e.target.value})}
                        className="w-full px-3 py-2 bg-slate-100 border border-blue-200 rounded-sm text-[12px] font-bold text-slate-800 focus:outline-hidden focus:border-blue-400 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="p-4 bg-blue-50 rounded-sm border border-blue-100">
                    <div className="flex items-start space-x-3">
                      <span className="text-blue-500 text-sm">ℹ️</span>
                      <p className="text-[10px] font-bold text-blue-800">
                        By default, critical system errors will always be sent to the primary system administrator regardless of these settings.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* MODAL FOOTER */}
            <div className="p-4 bg-slate-50 border-t border-blue-50 flex justify-between items-center">
              {currentStep > 1 ? (
                <button 
                  onClick={() => setCurrentStep(currentStep - 1)}
                  className="text-[11px] font-black text-slate-600 uppercase hover:text-slate-600 transition-colors flex items-center space-x-1"
                >
                  <span>← Back</span>
                </button>
              ) : <div />}
              
              <button 
                onClick={() => currentStep === 4 ? handleCreateSchedule() : setCurrentStep(currentStep + 1)}
                className="bg-linear-to-l from-blue-800 to-blue-950 hover:bg-blue-800 text-white px-6 py-2 rounded-sm text-[11px] font-black uppercase tracking-wider transition-all flex items-center space-x-2 shadow-md shadow-blue-900/10"
              >
                <span>
                  {currentStep === 1 ? 'Next · Storage' : 
                   currentStep === 2 ? 'Next · Options' : 
                   currentStep === 3 ? 'Next · Alerts' : 'Create Schedule'}
                </span>
                <span className="text-xs">{currentStep === 4 ? '✓' : '→'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BackupScheduling;
