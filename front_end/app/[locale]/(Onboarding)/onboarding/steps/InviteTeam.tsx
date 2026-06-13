"use client";

import React, { useState } from "react";
import { useOnboarding } from "../../OnboardingContext";
import AddMemberModal from "./components/AddMemberModal";

const InviteTeam = () => {
  const { data } = useOnboarding();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const teamMembers = [
    { name: "Admin User", identifier: data.email, role: "Tenant Admin", status: "Active", isOwner: true },
    { name: "Sarah Otieno", identifier: "sarah@medicare.co.ke", role: "Cashier", status: "Invited" },
    { name: "James Mwangi", identifier: "james@medicare.co.ke", role: "Manager", status: "Invited" },
    { name: "Grace Achieng", identifier: "grace@medicare.co.ke", role: "Cashier", status: "Invited" },
  ];

  return (
    <div className="animate-in fade-in bg-white p-4 slide-in-from-bottom-4 duration-700">
      <div className="mb-4 text-center lg:text-left">
        <h1 className="text-2xl font-black text-blue-950 mb-2">Invite your team</h1>
        <p className="text-slate-600 font-bold text-xs">
          Add staff members now or skip and do it later. Each person gets a role-based account with the right level of access.
        </p>
      </div>

      {/* Team Members Table */}
      <div className="bg-white border border-blue-100 rounded-sm overflow-hidden shadow-sm mb-4">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-blue-100">
              <th className="px-4 py-2 text-[10px] font-black uppercase text-blue-900">Name</th>
              <th className="px-4 py-2 text-[10px] font-black uppercase  text-blue-900">Email / Phone</th>
              <th className="px-4 py-2 text-[10px] font-black uppercase text-blue-900">Role</th>
              <th className="px-4 py-2 text-[10px] font-black uppercase  text-blue-900">Status</th>
              <th className="px-4 py-2"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {teamMembers.map((member, idx) => (
              <tr key={idx} className="group hover:bg-blue-50/30 transition-colors">
                <td className="px-4 py-3">
                  <p className="text-xs font-black text-blue-950 uppercase">{member.name}</p>
                  {member.isOwner && <span className="text-[10px] font-bold text-blue-600 uppercase">Account Owner</span>}
                </td>
                <td className="px-8 py-2 text-xs font-bold text-slate-500">{member.identifier}</td>
                <td className="px-8 py-2">
                  <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-lg text-[10px] font-black uppercase">
                    {member.role}
                  </span>
                </td>
                <td className="px-8 py-2">
                  <span className={`flex items-center space-x-1.5 text-[10px] font-black uppercase ${member.status === 'Active' ? 'text-green-600' : 'text-blue-500'}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${member.status === 'Active' ? 'bg-green-500' : 'bg-blue-400 animate-pulse'}`} />
                    <span>{member.status}</span>
                  </span>
                </td>
                <td className="px-8 py-2 text-right">
                  {!member.isOwner && member.status === 'Invited' && (
                    <button className="text-[10px] font-black text-blue-600 hover:text-blue-700 uppercase">
                      Resend
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="w-full py-4 text-center text-xs font-black text-slate-600 hover:text-blue-950 transition-colors border-t border-gray-50 bg-gray-50/30"
        >
          + Add Team Member
        </button>
      </div>

      {/* Role Permissions Reference */}
      <div className="space-y-3">
        <h3 className="text-xs font-black uppercase tracking-widest text-blue-950 ml-1">Role Permissions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            { title: "Tenant Admin", desc: "Full CRUD access · Reports · Settings · User management", icon: "👑" },
            { title: "Manager", desc: "Reports · Stock alerts · Purchase orders · View all sales", icon: "📊" },
            { title: "Cashier", desc: "POS terminal · Apply discounts · View own sales only", icon: "🖥️" },
            { title: "Super Admin", desc: "Platform-wide access · All tenants · Revenue analytics", icon: "🏢" },
          ].map((role, idx) => (
            <div key={idx} className="flex items-start p-3 bg-slate-100 border border-blue-100 rounded-sm space-x-4">
              <span className="text-xl">{role.icon}</span>
              <div>
                <p className="text-xs font-black text-blue-950 mb-1">{role.title}</p>
                <p className="text-[10px] font-bold text-slate-600">{role.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Member Modal */}
      <AddMemberModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
};

export default InviteTeam;
