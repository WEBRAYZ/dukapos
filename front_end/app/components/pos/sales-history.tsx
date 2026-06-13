import React, { useState, useMemo, useEffect } from 'react';
import { api } from '@/lib/api';

interface SaleItem {
  id: number;
  product_name: string;
  quantity: string;
  unit_price: string;
  subtotal: string;
}

interface Sale {
  id: number;
  sale_number: string;
  customer: number | null;
  customer_name?: string;
  timestamp: string;
  total_amount: string;
  payment_mode: string;
  cashier_name: string;
  status: string;
  items: SaleItem[];
}

const SalesHistory = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [showDateRange, setShowDateRange] = useState(false);
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [sales, setSales] = useState<Sale[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filterDates, setFilterDates] = useState({ today: '', yesterday: '' });

  useEffect(() => {
    const fetchSales = async () => {
      try {
        setLoading(true);
        const response = await api.get<Sale[]>('/pos/sales/');
        setSales(response);
        setError(null);
      } catch (err: unknown) {
        console.error('Failed to fetch sales history:', err);
        const errorMessage = err instanceof Error ? err.message : 'Failed to load sales history';
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchSales();
    
    const today = new Date().toISOString().split('T')[0];
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
    setFilterDates({ today, yesterday });
  }, []);

  const stats = useMemo(() => {
    const todaySales = sales.filter(s => s.timestamp.startsWith(filterDates.today));
    const todayRevenue = todaySales.reduce((acc, s) => acc + parseFloat(s.total_amount), 0);
    const returns = todaySales.filter(s => s.status === 'REFUNDED').length;

    return [
      { label: "Today's Revenue", value: `KSh ${todayRevenue.toLocaleString()}`, trend: "+12.4% vs yesterday", trendColor: "text-green-600", icon: "💰" },
      { label: "Transactions", value: todaySales.length.toString(), subtext: "Today", icon: "🧾" },
      { label: "Avg. Sale Value", value: `KSh ${(todaySales.length ? todayRevenue / todaySales.length : 0).toLocaleString(undefined, {maximumFractionDigits: 0})}`, subtext: "Per transaction", icon: "📊" },
      { label: "Returns", value: returns.toString(), subtext: "Today", icon: "↩", isWarning: returns > 0 },
    ];
  }, [sales, filterDates.today]);

  const filteredTransactions = useMemo(() => {
    return sales.filter(txn => {
      const matchesSearch = txn.sale_number.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           (txn.customer_name && txn.customer_name.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const txnDate = txn.timestamp.split('T')[0];

      let matchesFilter = true;
      if (activeFilter === 'Today') matchesFilter = txnDate === filterDates.today;
      else if (activeFilter === 'Yesterday') matchesFilter = txnDate === filterDates.yesterday;
      else if (activeFilter === 'Range' && dateRange.start && dateRange.end) {
        matchesFilter = txnDate >= dateRange.start && txnDate <= dateRange.end;
      }

      return matchesSearch && matchesFilter;
    }).map(txn => ({
      id: txn.sale_number,
      customer: txn.customer_name || 'Walk-in',
      time: new Date(txn.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      date: txn.timestamp.split('T')[0] === filterDates.today ? 'Today' : txn.timestamp.split('T')[0],
      amount: parseFloat(txn.total_amount).toLocaleString(),
      method: txn.payment_mode === '01' ? 'Cash' : txn.payment_mode === '03' ? 'M-Pesa' : 'Credit',
      cashier: txn.cashier_name,
      items: txn.items.length,
      status: txn.status,
      color: txn.status === 'COMPLETED' ? 'bg-green-100 text-green-700' : txn.status === 'REFUNDED' ? 'bg-orange-100 text-orange-700' : 'bg-red-100 text-red-700'
    }));
  }, [searchQuery, activeFilter, dateRange, sales, filterDates]);

  const handleExport = () => {
    const headers = ['Receipt ID', 'Customer', 'Amount', 'Method', 'Cashier', 'Items', 'Status', 'Date'];
    const csvContent = [
      headers.join(','),
      ...filteredTransactions.map(txn => [
        txn.id,
        txn.customer,
        txn.amount.replace(',', ''),
        txn.method,
        txn.cashier,
        txn.items,
        txn.status,
        txn.date
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    const fileName = activeFilter === 'Range' && dateRange.start
      ? `sales_history_${dateRange.start}_to_${dateRange.end}.csv`
      : `sales_history_${activeFilter.toLowerCase()}_${new Date().toISOString().split('T')[0]}.csv`;
    link.setAttribute('download', fileName);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center bg-slate-100 p-8 space-y-4">
        <div className="w-10 h-10 border-4 border-blue-900 border-t-transparent rounded-full animate-spin" />
        <p className="text-[10px] font-black text-blue-900 uppercase tracking-widest">Loading Sales Records...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center bg-slate-100 p-8 space-y-4 text-center">
        <div className="text-4xl">❌</div>
        <h2 className="text-sm font-black text-red-700 uppercase">Load Failure</h2>
        <p className="text-[10px] text-slate-600 font-bold uppercase max-w-xs">{error}</p>
        <button onClick={() => window.location.reload()} className="px-6 py-2 bg-blue-900 text-white text-[10px] font-black uppercase rounded-sm">Retry Sync</button>
      </div>
    );
  }

  return (
    <div className="flex bg-slate-100 flex-col space-y-3 h-full overflow-hidden">
      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-3 items-center justify-between bg-white p-3 rounded-md border border-blue-100 shadow-sm shrink-0">
        <div className="relative flex-1 max-w-md">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-600">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </span>
          <input
            type="text"
            placeholder="Search by ID or customer…"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="block w-full pl-12 pr-4 py-2.5 bg-gray-100 border border-blue-100 rounded-sm placeholder-gray-400 focus:outline-none focus:bg-white focus:ring-1 focus:ring-olive focus:border-transparent transition-all font-bold text-sm"
          />
        </div>
        
        <div className="flex items-center space-x-2">
          {['Today', 'Yesterday', 'All'].map(filter => (
            <button
              key={filter}
              onClick={() => {
                setActiveFilter(filter);
                setShowDateRange(false);
              }}
              className={`px-4 py-1 rounded-full text-xs font-black uppercase transition-all ${
                activeFilter === filter 
                  ? 'bg-linear-to-l from-blue-800 to-blue-950 text-white shadow-md' 
                  : 'bg-gray-100 text-blue-800 hover:bg-gray-200 border border-blue-100'
              }`}
            >
              {filter}
            </button>
          ))}
          <div className="h-6 w-px bg-gray-200 mx-2"></div>
          
          <div className="relative">
            <button 
              onClick={() => setShowDateRange(!showDateRange)}
              className={`flex items-center space-x-2 px-4 py-2 bg-white border border-blue-200 rounded-sm hover:bg-slate-100 transition-all text-xs font-black text-gray-800 uppercase ${activeFilter === 'Range' ? 'ring-2 ring-blue-500' : ''}`}
            >
              <span>📅</span>
              <span>{activeFilter === 'Range' && dateRange.start ? `${dateRange.start} - ${dateRange.end}` : 'Date Range'}</span>
            </button>
            
            {showDateRange && (
              <div className="absolute top-full right-0 mt-2 p-4 bg-white border border-blue-100 shadow-xl rounded-sm z-50 flex flex-col space-y-3 min-w-[300px]">
                <div className="flex flex-col space-y-1">
                  <label className="text-[10px] font-black text-gray-500 uppercase">Start Date</label>
                  <input 
                    type="date" 
                    value={dateRange.start}
                    onChange={(e) => setDateRange({...dateRange, start: e.target.value})}
                    className="p-2 border border-blue-50 text-xs font-bold outline-none focus:ring-1 focus:ring-blue-500" 
                  />
                </div>
                <div className="flex flex-col space-y-1">
                  <label className="text-[10px] font-black text-gray-500 uppercase">End Date</label>
                  <input 
                    type="date" 
                    value={dateRange.end}
                    onChange={(e) => setDateRange({...dateRange, end: e.target.value})}
                    className="p-2 border border-blue-50 text-xs font-bold outline-none focus:ring-1 focus:ring-blue-500" 
                  />
                </div>
                <button 
                  onClick={() => {
                    setActiveFilter('Range');
                    setShowDateRange(false);
                  }}
                  disabled={!dateRange.start || !dateRange.end}
                  className="w-full py-2 bg-blue-900 text-white text-[10px] font-black uppercase tracking-widest hover:bg-blue-800 disabled:opacity-50"
                >
                  Apply Range
                </button>
              </div>
            )}
          </div>

          <button 
            onClick={handleExport}
            className="flex items-center space-x-2 px-4 py-2 bg-white border border-blue-200 rounded-sm hover:bg-slate-100 transition-all text-xs font-black text-gray-800 uppercase"
          >
            <span>⬇</span>
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 shrink-0">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white p-3 rounded-sm border border-blue-100 shadow-sm flex items-center space-x-4">
            <div className={`w-12 h-12 rounded-sm flex items-center justify-center text-2xl ${stat.isWarning ? 'bg-blue-50 text-blue-600' : 'bg-green-50 text-olive'}`}>
              {stat.icon}
            </div>
            <div>
              <p className="text-[10px] font-black text-gray-600 uppercase">{stat.label}</p>
              <h4 className="text-xl font-black text-gray-800">{stat.value}</h4>
              <p className={`text-[11px] font-bold mt-1 ${stat.trendColor || 'text-gray-700'}`}>
                {stat.trend || stat.subtext}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Transactions Table */}
      <div className="flex-1 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="px-3 py-3 text-[11px] font-black text-blue-800 uppercase">Receipt ID</th>
                <th className="px-3 py-3 text-[11px] font-black text-blue-800 uppercase">Customer</th>
                <th className="px-3 py-3 text-[11px] font-black text-blue-800 uppercase">Amount</th>
                <th className="px-3 py-3 text-[11px] font-black text-blue-800 uppercase">Method</th>
                <th className="px-3 py-3 text-[11px] font-black text-blue-800 uppercase">Cashier</th>
                <th className="px-3 py-3 text-[11px] font-black text-blue-800 uppercase text-center">Items</th>
                <th className="px-3 py-3 text-[11px] font-black text-blue-800 uppercase text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredTransactions.map((txn) => (
                <tr key={txn.id} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="px-3 py-3">
                    <span className="text-xs font-black text-olive bg-blue-50 px-2 py-1 rounded-full">{txn.id}</span>
                  </td>
                  <td className="px-3 py-3">
                    <div className="flex flex-col">
                      <span className="text-xs font-black text-gray-800 uppercase">{txn.customer}</span>
                      <span className="text-[10px] font-bold text-gray-700 uppercase">{txn.time} · {txn.date}</span>
                    </div>
                  </td>
                  <td className="px-3 py-3">
                    <span className="text-sm font-black text-gray-800">KSh {txn.amount}</span>
                  </td>
                  <td className="px-3 py-3">
                    <div className="flex items-center space-x-2">
                      <span className={`w-2 h-2 rounded-full ${txn.method === 'M-Pesa' ? 'bg-green-500' : 'bg-blue-500'}`}></span>
                      <span className="text-xs font-bold text-gray-600">{txn.method}</span>
                    </div>
                  </td>
                  <td className="px-3 py-3">
                    <span className="text-xs font-black text-gray-500 uppercase">{txn.cashier}</span>
                  </td>
                  <td className="px-3 py-3 text-center">
                    <span className="text-xs font-black text-gray-800">{txn.items}</span>
                  </td>
                  <td className="px-3 py-3 text-right">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black uppercase ${txn.color}`}>
                      {txn.status === 'REFUNDED' ? '↩ Returned' : txn.status === 'COMPLETED' ? '✓ Done' : txn.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredTransactions.length === 0 && (
            <div className="p-10 text-center">
              <p className="text-xs font-black text-gray-400 uppercase tracking-widest">No transactions found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SalesHistory;
