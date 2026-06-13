"use client";


import { useOnboarding } from "../../OnboardingContext";

const StoreInfo = () => {
  const { data, updateData } = useOnboarding();

  return (
    <div className="animate-in bg-white p-4 fade-in slide-in-from-bottom-4 duration-700">
      <div className="mb-4">
        <h1 className="text-2xl font-black text-build-950 mb-1">Store Information</h1>
        <p className="text-slate-500 font-bold text-xs text-balance">
          Set up your store profile. This information appears on your receipts, reports, and customer-facing documents.
        </p>
      </div>

      <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Business Name */}
          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase text-slate-700 ml-1">Business / Store Name</label>
            <input
              type="text"
              value={data.businessName}
              onChange={(e) => updateData({ businessName: e.target.value })}
              className="w-full h-14 px-6 bg-slate-100 border border-blue-100 rounded-sm text-[11px] font-bold text-blue-950 shadow-xs focus:border-blue-100 focus:ring-[1px] focus:ring-blue-500/5 transition-all outline-none uppercase"
            />
          </div>

          {/* Business Type */}
          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase text-slate-700 ml-1">Business Type</label>
            <select
              value={data.businessType}
              onChange={(e) => updateData({ businessType: e.target.value })}
              className="w-full h-14 px-6 bg-slate-100 border border-blue-100 rounded-sm text-[12px] font-bold text-blue-950 shadow-xs focus:border-blue-100 focus:ring-[1px] focus:ring-blue-500/5 transition-all outline-none appearance-none cursor-pointer"
            >
              <option value="pharmacy">Pharmacy</option>
              <option value="retail">Retail Shop / Supermarket</option>
              <option value="wholesale">Wholesale</option>
              <option value="restaurant">Restaurant / Cafe</option>
            </select>
          </div>

          {/* County / City */}
          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase text-slate-700 ml-1">County / City</label>
            <select
              value={data.county}
              onChange={(e) => updateData({ county: e.target.value })}
              className="w-full h-14 px-6 bg-slate-100 border border-blue-100 rounded-sm text-[12px] font-bold text-blue-950 shadow-sm focus:border-blue-500 focus:ring-[1px] focus:ring-blue-500/5 transition-all outline-none appearance-none cursor-pointer"
            >
              <option value="nairobi">Nairobi</option>
              <option value="mombasa">Mombasa</option>
              <option value="kisumu">Kisumu</option>
              <option value="nakuru">Nakuru</option>
            </select>
          </div>

          {/* Phone Number */}
          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase text-slate-700 ml-1">Phone Number</label>
            <input
              type="tel"
              value={data.phone}
              onChange={(e) => updateData({ phone: e.target.value })}
              className="w-full h-14 px-6 bg-slate-100 border border-blue-100 rounded-sm text-[12px] font-bold text-blue-950 shadow-xs focus:border-blue-500 focus:ring-[1px] focus:ring-blue-500/5 transition-all outline-none"
            />
          </div>
        </div>

        {/* Email Address */}
        <div className="space-y-3">
          <label className="text-[10px] font-black uppercase  text-slate-700 ml-1">Email Address</label>
          <input
            type="email"
            value={data.email}
            onChange={(e) => updateData({ email: e.target.value })}
            className="w-full h-14 px-6 bg-slate-50 border border-blue-100 rounded-lg text-[12px] font-bold text-blue-950 shadow-sm focus:border-blue-500 focus:ring-[1px] focus:ring-blue-500/5 transition-all outline-none"
          />
        </div>

        {/* Physical Address */}
        <div className="space-y-3">
          <label className="text-[10px] font-black uppercase text-slate-700 ml-1">Physical Address</label>
          <input
            type="text"
            value={data.address}
            onChange={(e) => updateData({ address: e.target.value })}
            className="w-full h-14 px-6 bg-slate-50 border border-blue-100 rounded-lg text-[12px] font-bold text-blue-950 shadow-xs focus:border-blue-500 focus:ring-[1px] focus:ring-blue-500/5 transition-all outline-none uppercase"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-blue-100 pt-3">
          {/* KRA PIN */}
          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase text-gray-700 ml-1">KRA PIN</label>
            <input
              type="text"
              value={data.kraPin}
              onChange={(e) => updateData({ kraPin: e.target.value })}
              className="w-full h-16 px-6 bg-slate-50 border border-blue-100 rounded-lg text-[12px] font-bold text-blue-950 shadow-sm focus:border-blue-500 focus:ring-[1px] focus:ring-blue-500/5 transition-all outline-none uppercase"
            />blue
          </div>

          {/* Registration No */}
          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase text-gray-700 ml-1">Business Registration No.</label>
            <input
              type="text"
              value={data.registrationNo}
              onChange={(e) => updateData({ registrationNo: e.target.value })}
              className="w-full h-14 px-6 bg-slate-100 border border-blue-100 rounded-sm text-[12px] font-bold text-blue-950 shadow-sm focus:border-blue-500 focus:ring-[1px] focus:ring-blue-500/5 transition-all outline-none uppercase"
            />
          </div>
        </div>

        {/* Logo & Branding Section */}
        <div className="space-y-3 pt-3">
          <h3 className="text-xs font-black uppercase text-blue-950">Logo & Branding</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 items-start">
            <div className="border-2 bg-slate-50 border-dashed border-blue-100 rounded-sm p-3 flex flex-col items-center justify-center text-center group hover:border-blue-200 transition-colors cursor-pointer shadow-sm">
              <span className="text-3xl mb-3 group-hover:scale-110 transition-transform">🖼️</span>
              <p className="text-sm font-bold text-blue-950 mb-1">Click to upload or drag & drop</p>
              <p className="text-[10px] font-bold text-slate-600 uppercase leading-relaxed">
                PNG, JPG, SVG · Max 2MB <br />
                Recommended: 200×200px
              </p>
            </div>

            <div className="space-y-4">
              <label className="text-[10px] font-black uppercase mb-3 text-slate-700 ml-1">Brand Colour (on receipts)</label>
              <div className="flex items-center space-x-4">
                <div 
                  className="w-12 h-12 transition-colors duration-500"
                  style={{ backgroundColor: data.brandColor }}
                />
                <div className="flex-1 relative">
                  <input
                    type="color"
                    value={data.brandColor}
                    onChange={(e) => updateData({ brandColor: e.target.value })}
                    className="w-full h-14  border border-transparent text-[15px] font-black text-blue-950 shadow-sm transition-all outline-none uppercase"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default StoreInfo;
