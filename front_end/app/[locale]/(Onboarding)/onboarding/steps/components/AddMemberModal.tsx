"use client";

import React, { useState } from "react";
import SmartImageUpload from "@/app/components/shared/SmartImageUpload";

interface AddMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddMemberModal: React.FC<AddMemberModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    jobTitle: "",
    role: "",
    department: "",
    internalNotes: "",
    accessLevel: "Custom",
    modules: ["Dashboard", "Reports"],
    sendInvite: true,
    require2FA: false,
    photo: null as string | null,
  });

  if (!isOpen) return null;

  const steps = [
    { id: 1, name: "Identity" },
    { id: 2, name: "Role & Dept" },
    { id: 3, name: "Permissions" },
    { id: 4, name: "Review" },
  ];

  const roles = ["Tenant Admin", "Manager", "Cashier", "Inventory"];
  const departments = ["Operations", "Sales", "Management", "Support"];
  
  const accessLevels = [
    { id: "Full Access", desc: "Read, write, delete across all modules", icon: "◈" },
    { id: "Standard", desc: "Read and write, no delete privileges", icon: "◇" },
    { id: "Read Only", desc: "View-only access to assigned areas", icon: "○" },
    { id: "Custom", desc: "Define granular permissions manually", icon: "◉" },
  ];

  const availableModules = [
    "Dashboard", "Reports", "Members", "Billing", 
    "Integrations", "Settings", "Analytics", "Support"
  ];

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    } else if (step === 4) {
      // Transition to success state
      setStep(5);
    }
  };

  const handleBack = () => {
    if (step > 1 && step <= 4) {
      setStep(step - 1);
    }
  };

  const resetAndAddAnother = () => {
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      jobTitle: "",
      role: "",
      department: "",
      internalNotes: "",
      accessLevel: "Custom",
      modules: ["Dashboard", "Reports"],
      sendInvite: true,
      require2FA: false,
    });
    setStep(1);
  };

  const toggleModule = (mod: string) => {
    if (formData.modules.includes(mod)) {
      setFormData({ ...formData, modules: formData.modules.filter(m => m !== mod) });
    } else {
      setFormData({ ...formData, modules: [...formData.modules, mod] });
    }
  };

  const getInitials = () => {
    const f = formData.firstName.charAt(0).toUpperCase();
    const l = formData.lastName.charAt(0).toUpperCase();
    return f && l ? f + l : "IM";
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative bg-white w-full max-w-2xl rounded-sm shadow-sm overflow-hidden animate-in zoom-in-95 duration-300 max-h-[90vh] flex flex-col">
        {/* Header - Hidden on success */}
        {step <= 4 && (
          <div className="px-4 py-6 border-b border-slate-100 flex justify-between items-start shrink-0">
            <div>
              <h2 className="text-xl font-black text-blue-950">Add New Member</h2>
              <p className="text-xs font-bold text-slate-500 mt-1">
                Invite a team member and configure their access permissions.
              </p>
            </div>
            <button 
              onClick={onClose}
              className="text-slate-400 hover:text-slate-600 transition-colors"
            >
              <span className="text-sm font-black uppercase">Cancel</span>
            </button>
          </div>
        )}

        {/* Stepper - Hidden on success */}
        {step <= 4 && (
          <div className="bg-slate-100 px-8 py-4 flex items-center justify-between border-b border-slate-100 overflow-x-auto shrink-0">
            {steps.map((s, idx) => (
              <React.Fragment key={s.id}>
                <div className="flex items-center space-x-2 shrink-0">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black ${
                    step === s.id 
                      ? "bg-linear-to-l from-blue-800 to-blue-950 text-white" 
                      : step > s.id 
                        ? "bg-green-500 text-white" 
                        : "bg-slate-200 text-slate-500"
                  }`}>
                    {step > s.id ? "✓" : s.id}
                  </div>
                  <span className={`text-[10px] font-black uppercase tracking-wider ${
                    step === s.id ? "text-blue-950" : "text-slate-400"
                  }`}>
                    {s.name}
                  </span>
                </div>
                {idx < steps.length - 1 && <div className="w-8 h-px bg-slate-200 mx-2 shrink-0" />}
              </React.Fragment>
            ))}
          </div>
        )}

        {/* Body */}
        <div className="p-8 overflow-y-auto custom-scrollbar flex-1">
          {step === 1 && (
            <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="flex items-center space-x-2 text-blue-950">
                <span className="text-lg">◈</span>
                <h3 className="text-xs font-black uppercase">Personal Information</h3>
              </div>

              <div className="flex flex-col md:flex-row items-start space-y-4 md:space-y-0 md:space-x-8">
                <div className="w-32 shrink-0">
                  <SmartImageUpload 
                    onImageChange={(img) => setFormData({...formData, photo: img})}
                    currentImage={formData.photo}
                    label="Member Photo"
                  />
                </div>

                <div className="flex-1 w-full grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-slate-700 uppercase ml-1">First Name</label>
                    <input 
                      type="text" 
                      placeholder="Elena"
                      value={formData.firstName}
                      onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                      className="w-full px-4 py-2.5 bg-slate-100 border border-blue-100 rounded-sm text-xs font-bold focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-slate-700 uppercase ml-1">Last Name</label>
                    <input 
                      type="text" 
                      placeholder="Vasquez"
                      value={formData.lastName}
                      onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                      className="w-full px-4 py-2.5 bg-slate-100 border border-blue-100 rounded-sm text-xs font-bold focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                    />
                  </div>
                  <div className="md:col-span-2 space-y-1.5">
                    <label className="text-[10px] font-black text-slate-700 uppercase ml-1">Email Address</label>
                    <input 
                      type="email" 
                      placeholder="elena@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full px-4 py-2.5 bg-slate-100 border border-blue-100 rounded-sm text-xs font-bold focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                    />
                  </div>
                  <div className="md:col-span-2 space-y-1.5">
                    <label className="text-[10px] font-black text-slate-700 uppercase ml-1">Phone Number (optional)</label>
                    <input 
                      type="tel" 
                      placeholder="+1 (555) 000-0000"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="w-full px-4 py-2.5 bg-slate-100 border border-blue-100 rounded-sm text-xs font-bold focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-3 animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="flex items-center space-x-2 text-blue-950">
                <span className="text-lg">◇</span>
                <h3 className="text-xs font-black uppercase">Role & Department</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5 md:col-span-2">
                  <label className="text-[10px] font-black text-slate-700 uppercase ml-1">Job Title (optional)</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Senior Engineer"
                    value={formData.jobTitle}
                    onChange={(e) => setFormData({...formData, jobTitle: e.target.value})}
                    className="w-full px-4 py-2.5 bg-slate-100 border border-blue-100 rounded-sm text-xs font-bold focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-700 uppercase ml-1">Role</label>
                  <select 
                    value={formData.role}
                    onChange={(e) => setFormData({...formData, role: e.target.value})}
                    className="w-full px-4 py-2.5 bg-slate-100 border border-blue-100 rounded-sm text-xs font-bold focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all appearance-none cursor-pointer"
                  >
                    <option value="" disabled>Select role…</option>
                    {roles.map(role => (
                      <option key={role} value={role}>{role}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-700 uppercase ml-1">Department</label>
                  <select 
                    value={formData.department}
                    onChange={(e) => setFormData({...formData, department: e.target.value})}
                    className="w-full px-4 py-2.5 bg-slate-100 border border-blue-100 rounded-sm text-xs font-bold focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all appearance-none cursor-pointer"
                  >
                    <option value="" disabled>Select dept…</option>
                    {departments.map(dept => (
                      <option key={dept} value={dept}>{dept}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5 md:col-span-2">
                  <label className="text-[10px] font-black text-slate-700 uppercase ml-1">Internal Notes (optional)</label>
                  <textarea 
                    placeholder="Context for this member's role…"
                    rows={3}
                    value={formData.internalNotes}
                    onChange={(e) => setFormData({...formData, internalNotes: e.target.value})}
                    className="w-full px-4 py-2.5 bg-slate-100 border border-blue-100 rounded-sm text-xs font-bold focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all resize-none"
                  />
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="flex items-center space-x-2 text-blue-950">
                <span className="text-lg text-blue-600">◉</span>
                <h3 className="text-xs font-black uppercase">Access & Permissions</h3>
              </div>

              {/* Access Level */}
              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-700 uppercase ml-1">Access Level</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {accessLevels.map((level) => (
                    <div 
                      key={level.id}
                      onClick={() => setFormData({ ...formData, accessLevel: level.id })}
                      className={`p-4 rounded-sm border-2 cursor-pointer transition-all flex items-start space-x-4 ${
                        formData.accessLevel === level.id 
                          ? "border-blue-600 bg-blue-50/30 ring-4 ring-blue-500/5" 
                          : "border-slate-100 bg-slate-50 hover:border-slate-200"
                      }`}
                    >
                      <div className={`w-10 h-10 rounded-sm flex items-center justify-center text-2xl shrink-0 ${
                        formData.accessLevel === level.id ? "bg-linear-to-l from-blue-800 to-blue-950 text-white" : "bg-white text-slate-600 border border-blue-100"
                      }`}>
                        {level.icon}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-center">
                          <p className={`text-xs font-black uppercase ${formData.accessLevel === level.id ? "text-blue-950" : "text-slate-700"}`}>
                            {level.id}
                          </p>
                          {formData.accessLevel === level.id && (
                            <div className="w-4 h-4 rounded-full bg-blue-800 flex items-center justify-center">
                              <span className="text-[8px] text-white">✓</span>
                            </div>
                          )}
                        </div>
                        <p className="text-[10px] font-bold text-slate-600 mt-0.5">{level.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Module Access */}
              <div className="space-y-4">
                <label className="text-[10px] font-black text-slate-700 uppercase ml-1">Module Access</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {availableModules.map((mod) => (
                    <div 
                      key={mod}
                      onClick={() => toggleModule(mod)}
                      className={`px-4 py-3 rounded-sm border cursor-pointer transition-all flex items-center space-x-3 ${
                        formData.modules.includes(mod)
                          ? "border-blue-200 bg-blue-50/50 text-blue-600"
                          : "border-slate-100 bg-white text-slate-500 hover:bg-slate-100"
                      }`}
                    >
                      <div className={`w-4 h-4 rounded flex items-center justify-center border transition-all ${
                        formData.modules.includes(mod) ? "bg-linear-to-l from-blue-800 to-blue-950 border-blue-600 text-white" : "bg-white border-blue-200"
                      }`}>
                        {formData.modules.includes(mod) && <span className="text-[8px]">✓</span>}
                      </div>
                      <span className="text-[10px] font-black uppercase">{mod}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Toggles */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-blue-100">
                <div className="flex items-center justify-between p-4 bg-slate-100 rounded-sm border border-blue-100">
                  <div className="space-y-0.5">
                    <p className="text-[10px] font-black text-blue-950 uppercase">Send Invitation Email</p>
                    <p className="text-[8px] font-bold text-slate-700 uppercase">Login instructions will be sent</p>
                  </div>
                  <button 
                    onClick={() => setFormData({ ...formData, sendInvite: !formData.sendInvite })}
                    className={`w-10 h-5 rounded-full transition-all relative ${formData.sendInvite ? 'bg-linear-to-l from-blue-800 to-blue-950' : 'bg-slate-400'}`}
                  >
                    <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${formData.sendInvite ? 'right-1' : 'left-1'}`} />
                  </button>
                </div>

                <div className="flex items-center justify-between p-4 bg-slate-100 rounded-sm border border-blue-100">
                  <div className="space-y-0.5">
                    <p className="text-[10px] font-black text-blue-950 uppercase">Require Two-Factor Auth</p>
                    <p className="text-[8px] font-bold text-slate-700 uppercase">Setup 2FA on first login</p>
                  </div>
                  <button 
                    onClick={() => setFormData({ ...formData, require2FA: !formData.require2FA })}
                    className={`w-10 h-5 rounded-full transition-all relative ${formData.require2FA ? 'bg-linear-to-l from-blue-800 to-blue-950' : 'bg-slate-400'}`}
                  >
                    <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${formData.require2FA ? 'right-1' : 'left-1'}`} />
                  </button>
                </div>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="flex items-center space-x-2 text-blue-950">
                <span className="text-lg text-blue-600">○</span>
                <h3 className="text-xs font-black uppercase">Review & Confirm</h3>
              </div>

              {/* Summary Card */}
              <div className="bg-slate-100 rounded-sm border border-slate-100 p-4 space-y-4">
                {/* User Header */}
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-sm bg-linear-to-l from-blue-800 to-blue-950 flex items-center justify-center text-2xl font-black text-white shadow-xl shadow-blue-500/20">
                    {getInitials()}
                  </div>
                  <div>
                    <h4 className="text-lg font-black text-blue-950 uppercase">
                      {formData.firstName || "Isaac"} {formData.lastName || "mutinda"}
                    </h4>
                    <p className="text-xs font-bold text-slate-600 lowercase">{formData.email || "isaac@gmail.com"}</p>
                  </div>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-6 pt-4 border-t border-slate-200/60">
                  {[
                    { label: "Role", value: formData.role || "Developer" },
                    { label: "Department", value: formData.department || "Product" },
                    { label: "Title", value: formData.jobTitle || "cashier" },
                    { label: "Phone", value: formData.phone || "0704089840" },
                    { label: "Access Level", value: formData.accessLevel || "standard" },
                    { label: "2FA Required", value: formData.require2FA ? "Yes" : "No" },
                    { label: "Send Invite", value: formData.sendInvite ? "Yes" : "No" },
                    { label: "Modules", value: formData.modules.join(", ") || "Dashboard, Reports, Members" },
                  ].map((item, idx) => (
                    <div key={idx} className="space-y-1">
                      <p className="text-[10px] font-black text-slate-600 uppercase">{item.label}</p>
                      <p className="text-xs font-bold text-blue-950 uppercase">{item.value}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 bg-blue-50/50 rounded-sm border border-blue-100 flex items-start space-x-3">
                <span className="text-blue-600 text-lg">ℹ️</span>
                <p className="text-[10px] font-bold text-blue-900/60 uppercase">
                  Double check all information before sending the invite. You can always modify permissions later in the team management settings.
                </p>
              </div>
            </div>
          )}

          {step === 5 && (
            <div className="py-6 flex flex-col items-center justify-center space-y-4 animate-in zoom-in-95 duration-500">
              <div className="w-16 h-16 bg-white rounded-full border-3 border-green-700 flex items-center justify-center text-green-700 text-5xl">
                ✓
              </div>
              
              <div className="text-center space-y-2">
                <h3 className="text-xl font-black text-blue-950 uppercase tracking-tight">Member Added</h3>
                <p className="text-xs font-bold text-slate-500 max-w-sm mx-auto ">
                  <span className="text-blue-800 uppercase">{formData.firstName || "Isaac"} {formData.lastName || "mutinda"}</span> has been added to your organization. An invitation email is on its way.
                </p>
              </div>

              <div className="w-full max-w-xs bg-slate-100 rounded-sm border border-blue-100 p-4 flex flex-col items-center space-y-3">
                <div className="grid grid-cols-3 gap-4 w-full">
                  {[
                    { label: "Role", value: formData.role || "Developer" },
                    { label: "Dept", value: formData.department || "Product" },
                    { label: "Access", value: formData.accessLevel || "standard" },
                  ].map((item, idx) => (
                    <div key={idx} className="text-center space-y-1">
                      <p className="text-[9px] font-black text-slate-600 uppercase">{item.label}</p>
                      <p className="text-[10px] font-black text-blue-950 uppercase truncate">{item.value}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col w-full max-w-xs space-y-3 pt-4">
                <button 
                  onClick={resetAndAddAnother}
                  className="w-full py-4 bg-linear-to-l from-blue-800 to-blue-950 hover:bg-blue-700 text-white rounded-sm text-xs font-black uppercase transition-all active:scale-95"
                >
                  Add Another Member
                </button>
                <button 
                  onClick={onClose}
                  className="w-full py-4 bg-slate-200 hover:bg-slate-300 text-blue-900 rounded-sm text-xs font-black uppercase transition-all active:scale-95"
                >
                  Done
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        {step <= 4 && (
          <div className="px-8 py-6 bg-slate-100 border-t border-blue-100 flex justify-between items-center shrink-0">
            <button 
              onClick={handleBack}
              disabled={step === 1}
              className={`px-6 py-3 rounded-sm text-[10px] font-black uppercase transition-all ${
                step === 1 ? "opacity-0 pointer-events-none" : "text-slate-500 hover:text-blue-950 hover:bg-slate-100"
              }`}
            >
              ← Back
            </button>
            
            <button 
              onClick={handleNext}
              className="px-8 py-4 bg-linear-to-l from-blue-800 to-blue-950 hover:bg-blue-700 text-white rounded-sm text-[10px] font-black uppercase transition-all shadow-lg shadow-blue-500/20 flex items-center space-x-2 active:scale-95"
            >
              <span>{step === 4 ? "Add Member" : "Continue →"}</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddMemberModal;
