'use client';

import React from 'react';
import NewPO from './newpo';
import EditVendor from './editvendor';
import ComposeEmail from './composeemail';

interface SupplierDetailsProps {
  onBack: () => void;
}

const SupplierDetails: React.FC<SupplierDetailsProps> = ({ onBack }) => {
  const [isNewPOOpen, setIsNewPOOpen] = React.useState(false);
  const [isEditVendorOpen, setIsEditVendorOpen] = React.useState(false);
  const [isEmailOpen, setIsEmailOpen] = React.useState(false);

  React.useEffect(() => {
    if (isNewPOOpen || isEditVendorOpen || isEmailOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isNewPOOpen, isEditVendorOpen, isEmailOpen]);

  const supplier = {
    initials: 'AW',
    name: 'Apex Wholesale Co.',
    email: 'orders@apexwholesale.com',
    phone: '+254 721 440 000',
    website: 'apexwholesale.co.ke',
    category: 'Food & Beverage',
    contactPerson: 'James Okafor',
    address: '1200 Commerce Blvd, Nairobi',
    taxId: 'P051234567A',
    terms: 'Net 30',
    currency: 'KES',
    leadTime: '3–5 business days',
    minOrder: 50000,
    rating: 4.9,
    orderCount: 47,
    ytdSpend: 4210000,
  };

  const performance = [
    { label: 'On-time Delivery', value: 96, color: 'bg-green-500' },
    { label: 'Order Accuracy', value: 98, color: 'bg-green-500' },
    { label: 'Quality Score', value: 88, color: 'bg-yellow-500' },
    { label: 'Response Time', value: 94, color: 'bg-green-500' },
  ];

  const history = [
    { id: 'PO-2026-0036', date: 'May 17', items: '11 SKUs', total: 820000, received: '100%', status: 'Received' },
    { id: 'PO-2026-0029', date: 'Apr 22', items: '18 SKUs', total: 1345000, received: '100%', status: 'Received' },
    { id: 'PO-2026-0022', date: 'Mar 15', items: '9 SKUs', total: 688000, received: '100%', status: 'Received' },
    { id: 'PO-2026-0014', date: 'Feb 08', items: '14 SKUs', total: 910000, received: '100%', status: 'Received' },
    { id: 'PO-2026-0041', date: 'May 26', items: '15 SKUs', total: 1165000, received: '0%', status: 'Pending' },
  ];

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((s) => (
          <span key={s} className={`text-xl ${s <= Math.floor(rating) ? 'text-yellow-400' : 'text-gray-200'}`}>★</span>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-4 md:space-y-4">
      {/* Header Actions */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center space-x-3">
          <button 
            onClick={onBack}
            className="w-10 h-10 md:w-12 md:h-12 bg-linear-to-l from-blue-800 to-blue-950 border border-blue-100 rounded-sm flex items-center justify-center text-gray-100 hover:text-blue-900 transition-all shadow-sm active:scale-95"
          >
            ←
          </button>
          <div>
            <h2 className="text-lg md:text-xl font-black text-blue-800 uppercase line-clamp-1">{supplier.name}</h2>
            <p className="text-[10px] md:text-xs font-bold text-slate-600 uppercase">Vendor profile & performance</p>
          </div>
        </div>
        <div className="flex items-center space-x-3 w-full md:w-auto">
          <button 
            onClick={() => setIsNewPOOpen(true)}
            className="flex-1 md:flex-none px-4 md:px-6 py-3 bg-slate-300 border border-blue-100 text-blue-800 hover:text-slate-800 rounded-sm font-black text-[9px] md:text-[10px] uppercase transition-all shadow-sm"
          >
            New PO
          </button>
          <button 
            onClick={() => setIsEditVendorOpen(true)}
            className="flex-1 md:flex-none px-6 md:px-8 py-3 bg-linear-to-l from-blue-800 to-blue-950 text-white rounded-sm font-black text-[9px] md:text-[10px] uppercase hover:bg-blue-800 transition-all shadow-lg shadow-blue-900/20"
          >
            Edit Vendor
          </button>
        </div>
      </div>

      {/* Profile Overview Card */}
      <div className="bg-white p-3 md:p-3 rounded-sm md:rounded-sm border border-blue-100 shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left space-y-4 sm:space-y-0 sm:space-x-8">
            <div className="w-13 h-13 md:w-15 md:h-15 rounded-sm bg-slate-50 text-blue-500 flex items-center justify-center text-3xl font-black shadow-inner">
              {supplier.initials}
            </div>
            <div className="space-y-2">
              <h3 className="text-lg md:text-xl font-black text-blue-950 uppercase">{supplier.name}</h3>
              <div className="flex flex-wrap justify-center sm:justify-start items-center gap-x-3 gap-y-1 text-xs font-bold text-slate-600 uppercase">
                <span>{supplier.email}</span>
                <span className="hidden sm:inline w-1 h-1 bg-slate-300 rounded-full"></span>
                <span>{supplier.phone}</span>
                <span className="hidden sm:inline w-1 h-1 bg-slate-300 rounded-full"></span>
                <span className="text-blue-900">{supplier.website}</span>
              </div>
              <div className="flex flex-wrap justify-center sm:justify-start items-center gap-3">
                <span className="px-4 py-1 bg-green-100 text-green-700 rounded-full text-[10px] font-black uppercase flex items-center border border-green-200 shadow-sm">
                  <span className="w-1.5 h-1 bg-green-500 rounded-full mr-2"></span>
                  Active Vendor
                </span>
                <span className="px-4 py-1 bg-yellow-100 text-yellow-700 rounded-full text-[10px] font-black uppercase flex items-center border border-yellow-200 shadow-sm">
                  <span className="mr-1 text-xs">⭐</span> Preferred
                </span>
              </div>
            </div>
          </div>
          
          <div className="flex flex-wrap justify-center lg:justify-end items-center gap-3 md:gap-4">
            <button 
              onClick={() => setIsNewPOOpen(true)}
              className="flex-1 sm:flex-none px-6 py-4 bg-linear-to-l from-blue-800 to-blue-950 text-white rounded-sm text-[10px] font-black uppercase transition-all shadow-xl shadow-blue-900/20 flex items-center justify-center"
            >
              New Purchase Order
            </button>
            <button 
              onClick={() => setIsEmailOpen(true)}
              className="flex-1 sm:flex-none px-6 py-4 bg-slate-200 hover:bg-slate-100 text-blue-900 rounded-sm text-[10px] font-black uppercase transition-all border border-blue-100"
            >
              Email
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-4">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-4 md:space-y-4">
          {/* Supplier Information */}
          <div className="bg-white p-4 md:p-4 rounded-sm md:rounded-sm border border-blue-100 shadow-xl">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-blue-50">
              <h3 className="text-sm font-black text-blue-800 uppercase">Vendor Details</h3>
              <button 
                onClick={() => setIsEditVendorOpen(true)}
                className="text-[10px] font-black text-blue-900 uppercase hover:underline"
              >
                Edit
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-4 gap-x-4">
              {[
                { label: 'Company Name', value: supplier.name },
                { label: 'Primary Contact', value: supplier.contactPerson },
                { label: 'Email Address', value: supplier.email },
                { label: 'Phone Number', value: supplier.phone },
                { label: 'Postal Address', value: supplier.address },
                { label: 'Tax / VAT No.', value: supplier.taxId },
                { label: 'Payment Terms', value: supplier.terms },
                { label: 'Currency', value: supplier.currency },
                { label: 'Lead Time', value: supplier.leadTime },
                { label: 'Min. Order Value', value: `KSh ${supplier.minOrder.toLocaleString()}` },
              ].map((info) => (
                <div key={info.label} className="space-y-1">
                  <p className="text-[10px] font-black text-blue-950 uppercase">{info.label}</p>
                  <p className="text-[10px] font-bold text-slate-800 uppercase">{info.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Purchase History */}
          <div className="bg-white rounded-sm md:rounded-sm border border-blue-100 shadow-xl overflow-hidden flex flex-col">
            <div className="p-4 md:p-4 border-b border-blue-50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-sm font-black text-blue-800 uppercase">Order History</h3>
                <p className="text-[10px] font-bold text-slate-600 uppercase">All purchases with this vendor</p>
              </div>
              <button className="text-[10px] font-black text-blue-900 uppercase hover:underline text-left sm:text-right">
                Full History
              </button>
            </div>
            <div className="overflow-x-auto no-scrollbar custom-scrollbar">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/50">
                    <th className="px-4 md:px-4 py-3 text-[10px] font-black text-blue-900 uppercase whitespace-nowrap">PO Number</th>
                    <th className="px-4 md:px-4 py-3 text-[10px] font-black text-blue-900 uppercase whitespace-nowrap">Date</th>
                    <th className="px-4 md:px-4 py-3 text-[10px] font-black text-blue-900 uppercase hidden sm:table-cell">Items</th>
                    <th className="px-4 md:px-4 py-3 text-[10px] font-black text-blue-900 uppercase">Total</th>
                    <th className="px-4 md:px-4 py-3 text-[10px] font-black text-blue-900 uppercase text-center">Received</th>
                    <th className="px-4 md:px-4 py-3 text-[10px] font-black text-blue-900 uppercase text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {history.map((po, i) => (
                    <tr key={i} className="hover:bg-slate-50/30 transition-colors">
                      <td className="px-4 md:px-4 py-3 text-xs font-black text-blue-900 uppercase whitespace-nowrap">{po.id}</td>
                      <td className="px-4 md:px-4 py-3 text-[11px] font-bold text-slate-600 uppercase whitespace-nowrap">{po.date}</td>
                      <td className="px-4 md:px-4 py-3 text-xs font-bold text-slate-600 uppercase hidden sm:table-cell">{po.items}</td>
                      <td className="px-4 md:px-4 py-3 text-sm font-black text-slate-800 whitespace-nowrap">KSh {po.total.toLocaleString()}</td>
                      <td className="px-4 md:px-4 py-3 text-center">
                        <span className="text-[10px] font-black text-slate-700">{po.received}</span>
                      </td>
                      <td className="px-4 md:px-4 py-3">
                        <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase border ${
                          po.status === 'Received' ? 'bg-green-100 text-green-700 border-green-200' : 'bg-orange-100 text-orange-700 border-orange-200'
                        }`}>
                          {po.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-4 md:space-y-4">
          {/* Performance Score */}
          <div className="bg-linear-to-t from-blue-800 to-blue-950 p-4 md:p-4 rounded-sm md:rounded-sm shadow-sm text-white relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-5 opacity-10 pointer-events-none group-hover:scale-125 transition-transform duration-1000">
              <span className="text-5xl text-orange-400">📊</span>
            </div>
            <h3 className="text-sm font-black uppercase mb-4 border-b border-white/10 pb-5">Performance analytics</h3>
            
            <div className="space-y-5 relative z-10">
              <div className="flex items-end justify-center space-x-3">
                <p className="text-3xl font-black leading-none">{supplier.rating}</p>
                <div className="flex flex-col mb-1">
                  {renderStars(supplier.rating)}
                  <p className="text-[9px] font-bold text-white/40 uppercase mt-1">From {supplier.orderCount} orders</p>
                </div>
              </div>

              <div className="space-y-3">
                {performance.map((item) => (
                  <div key={item.label} className="space-y-2">
                    <div className="flex justify-between items-center text-[10px] font-black uppercase">
                      <span className="text-blue-300">{item.label}</span>
                      <span>{item.value}%</span>
                    </div>
                    <div className="w-full h-2 bg-black/20 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${item.color} rounded-full transition-all duration-1000 shadow-lg`}
                        style={{ width: `${item.value}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Monthly Spend */}
          <div className="bg-white p-4 md:p-4 rounded-sm md:rounded-sm border border-blue-100 shadow-xl">
            <h3 className="text-sm font-black text-gray-800 uppercase mb-2">Spending Trends</h3>
            <p className="text-[10px] font-bold text-slate-600 uppercase mb-4">KSh {supplier.ytdSpend.toLocaleString()} YTD</p>
            
            <div className="flex items-end justify-between h-40 gap-3 md:gap-4 px-2">
              {[
                { m: 'Jan', v: 40 }, { m: 'Feb', v: 30 }, { m: 'Mar', v: 60 },
                { m: 'Apr', v: 75 }, { m: 'May', v: 90 }
              ].map((d) => (
                <div key={d.m} className="flex-1 flex flex-col items-center group">
                  <div 
                    className={`w-full rounded-t-xl transition-all duration-500 relative ${d.m === 'May' ? 'bg-orange-500 shadow-lg shadow-orange-100' : 'bg-gray-100 hover:bg-orange-50'}`}
                    style={{ height: `${d.v}%` }}
                  />
                  <span className="text-[9px] font-black text-gray-400 uppercase mt-4">{d.m}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Outstanding Bills */}
          <div className="bg-white p-4 md:p-4 rounded-sm md:rounded-sm border border-gray-100 shadow-xl space-y-4">
            <h3 className="text-sm font-black text-blue-800 uppercase border-b border-blue-50 pb-3">Accounts Payable</h3>
            
            <div className="space-y-3">
              <div className="bg-blue-50 p-5 rounded-sm border border-blue-100 shadow-inner">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-[10px] font-black text-blue-700 uppercase">PO-2026-0041</span>
                  <span className="text-sm font-black text-blue-700">KSh 1.1M</span>
                </div>
                <p className="text-[9px] font-bold text-blue-500 uppercaser">Due in 18 days (Jun 25)</p>
              </div>

              <div className="pt-2 flex justify-between items-end px-1">
                <span className="text-[10px] font-black text-slate-400 uppercase">Grand Total Due</span>
                <span className="text-2xl font-black text-blue-600">KSh 1.1M</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <NewPO 
        isOpen={isNewPOOpen} 
        onClose={() => setIsNewPOOpen(false)} 
        supplier={supplier} 
      />

      <EditVendor 
        isOpen={isEditVendorOpen} 
        onClose={() => setIsEditVendorOpen(false)} 
        supplier={supplier} 
      />

      <ComposeEmail 
        isOpen={isEmailOpen} 
        onClose={() => setIsEmailOpen(false)} 
        recipient={{ name: supplier.name, email: supplier.email }} 
      />
    </div>
  );
};

export default SupplierDetails;
