"use client";

import React, { useState } from "react";

interface NewReportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const NewReportModal: React.FC<NewReportModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    reportName: "",
    reportType: "Sales",
    dateRange: "Last 30 Days",
    format: "PDF",
    includeCharts: true,
    recipients: "",
  });

  if (!isOpen) return null;

  const reportTypes = ["Sales", "Profit", "Inventory", "Cashier", "Financial", "Custom"];
  const dateRanges = ["Today", "Yesterday", "Last 7 Days", "Last 30 Days", "This Month", "Last Month", "Custom Range"];
  const formats = ["PDF", "Excel (XLSX)", "CSV", "Google Sheets"];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Generating New Report:", formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative bg-white w-full max-w-2xl rounded-sm shadow-sm overflow-hidden animate-in zoom-in-95 duration-300 flex flex-col border border-gray-100">
        {/* Header */}
        <div className="px-10 py-8 border-b border-blue-50 flex justify-between items-center bg-gray-50/30">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-blue-900 rounded-sm flex items-center justify-center text-white text-2xl shadow-lg shadow-blue-900/20">
              📊
            </div>
            <div>
              <h2 className="text-xl font-black text-blue-900 uppercase">Configure New Report</h2>
              <p className="text-[10px] font-bold text-gray-800 uppercase">
                Customize your analytics data and export parameters.
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-600 hover:text-gray-800 shadow-sm transition-all active:scale-90"
          >
            <span className="text-xl">×</span>
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="p-4 overflow-y-auto custom-scrollbar space-y-4 max-h-[75vh]">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Report Name */}
            <div className="md:col-span-2 space-y-1.5">
              <label className="text-[11px] font-bold text-gray-600 uppercase">Report Title</label>
              <input 
                type="text" 
                placeholder="e.g. Monthly Performance Summary - May 2026"
                required
                value={formData.reportName}
                onChange={(e) => setFormData({...formData, reportName: e.target.value})}
                className="w-full px-5 py-3.5 bg-gray-100 border border-blue-200 rounded-sm text-xs font-bold focus:outline-none focus:ring-1 focus:ring-blue-500/10 focus:border-blue-500/30 transition-all"
              />
            </div>

            {/* Report Type */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-black text-gray-600 uppercase">Primary Dataset</label>
              <select 
                required
                value={formData.reportType}
                onChange={(e) => setFormData({...formData, reportType: e.target.value})}
                className="w-full px-5 py-3.5 bg-gray-100 border border-blue-200 rounded-sm text-xs font-bold focus:outline-none focus:ring-1 focus:ring-blue-500/10 focus:border-blue-500/30 transition-all appearance-none cursor-pointer"
              >
                {reportTypes.map(t => <option key={t} value={t}>{t} Analytics</option>)}
              </select>
            </div>

            {/* Date Range */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-black text-gray-600 uppercase">Temporal Scope</label>
              <select 
                required
                value={formData.dateRange}
                onChange={(e) => setFormData({...formData, dateRange: e.target.value})}
                className="w-full px-5 py-3.5 bg-gray-100 border border-blue-200 rounded-sm text-xs font-bold focus:outline-none focus:ring-1 focus:ring-blue-500/10 focus:border-blue-500/30 transition-all appearance-none cursor-pointer"
              >
                {dateRanges.map(r => <option key={r} value={r}>{r}</option>)}
              </select>
            </div>

            {/* Export Format */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-black text-gray-600 uppercase">Export Format</label>
              <div className="grid grid-cols-2 gap-2">
                {formats.map(f => (
                  <button
                    key={f}
                    type="button"
                    onClick={() => setFormData({...formData, format: f})}
                    className={`px-3 py-2.5 rounded-sm text-[9px] font-bold uppercase transition-all border ${
                      formData.format === f 
                      ? "bg-linear-to-l from-blue-800 to-blue-950 text-white border-blue-200 shadow-md shadow-blue-900/10" 
                      : "bg-slate-100 text-gray-600 border-blue-200 hover:border-blue-500/30"
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

            {/* Include Charts Toggle */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-gray-600 uppercase">Visualizations</label>
              <div 
                onClick={() => setFormData({...formData, includeCharts: !formData.includeCharts})}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-sm border border-blue-200 cursor-pointer hover:bg-gray-100/50 transition-colors"
              >
                <div className="space-y-0.5">
                  <p className="text-[10px] font-bold text-gray-800 uppercase">Include Visual Data</p>
                  <p className="text-[8px] font-bold text-gray-600 uppercase">Charts, Graphs & Heatmaps</p>
                </div>
                <div className={`w-10 h-5 rounded-full transition-all relative ${formData.includeCharts ? 'bg-blue-700' : 'bg-gray-200'}`}>
                  <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${formData.includeCharts ? 'right-1' : 'left-1'}`} />
                </div>
              </div>
            </div>

            {/* Email Recipients */}
            <div className="md:col-span-2 space-y-1.5">
              <label className="text-[11px] font-bold text-gray-600 uppercase">Auto-Distribute (Optional)</label>
              <input 
                type="text" 
                placeholder="Separate emails with commas..."
                value={formData.recipients}
                onChange={(e) => setFormData({...formData, recipients: e.target.value})}
                className="w-full px-5 py-3.5 bg-gray-100 border border-blue-200 rounded-sm text-xs font-bold focus:outline-none focus:ring-1 focus:ring-blue-500/10 focus:border-blue-500/30 transition-all"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-3 flex space-x-3">
            <button 
              type="button"
              onClick={onClose}
              className="flex-1 py-4 bg-slate-200 border border-blue-200 text-blue-800 rounded-sm text-[10px] font-black uppercase hover:text-gray-800 transition-all active:scale-95 shadow-sm"
            >
              Cancel
            </button>
            <button 
              type="submit"
              className="flex-2 py-4 bg-linear-to-l from-blue-800 to-blue-950 text-white rounded-sm text-[10px] font-black uppercase hover:from-blue-600 transition-all shadow-sm shadow-blue-900/20 active:scale-95"
            >
              Generate Report
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewReportModal;
