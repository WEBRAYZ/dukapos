'use client';

import React, { useState } from 'react';
import ReportsNavbar from '@/app/components/reports/navbar';
import ProfitsReports from '@/app/components/reports/profitsreports';
import InventoryReports from '@/app/components/reports/inventoryreports';
import CashierReports from '@/app/components/reports/cashierreports';
import FinancialReports from '@/app/components/reports/financialreports';
import ExportsReports from '@/app/components/reports/exportsreports';
import NewReportModal from '@/app/components/reports/new-report-modal';
import { 
  Bar, 
  BarChart, 
  ResponsiveContainer, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  Pie, 
  PieChart, 
  Cell,
  Sector,
  PieSectorDataItem
} from 'recharts';

// #region Sample data
const performanceData = [
  { name: 'Jan', revenue: 4000 },
  { name: 'Feb', revenue: 3000 },
  { name: 'Mar', revenue: 2000 },
  { name: 'Apr', revenue: 2780 },
  { name: 'May', revenue: 1890 },
  { name: 'Jun', revenue: 2390 },
  { name: 'Jul', revenue: 3490 },
  { name: 'Aug', revenue: 4200 },
  { name: 'Sep', revenue: 3100 },
  { name: 'Oct', revenue: 4800 },
  { name: 'Nov', revenue: 3900 },
  { name: 'Dec', revenue: 5200 },
];

const categoryData = [
  { name: 'Electronics', value: 35, color: '#F59E0B', bgColor: 'bg-amber-500' }, 
  { name: 'Clothing', value: 25, color: '#3B82F6', bgColor: 'bg-blue-500' },    
  { name: 'Food & Bev', value: 20, color: '#F97316', bgColor: 'bg-orange-500' },   
  { name: 'Home & Living', value: 12, color: '#10B981', bgColor: 'bg-green-500' }, 
  { name: 'Others', value: 8, color: '#9CA3AF', bgColor: 'bg-gray-400' },      
];
// #endregion

const renderActiveShape = (props: PieSectorDataItem) => {
  const RADIAN = Math.PI / 180;
  const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;
  const sin = Math.sin(-RADIAN * (midAngle ?? 0));
  const cos = Math.cos(-RADIAN * (midAngle ?? 0));
  const sx = (cx as number) + ((outerRadius as number) + 10) * cos;
  const sy = (cy as number) + ((outerRadius as number) + 10) * sin;
  const mx = (cx as number) + ((outerRadius as number) + 30) * cos;
  const my = (cy as number) + ((outerRadius as number) + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill} className="font-bold text-lg">
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={(outerRadius as number) + 6}
        outerRadius={(outerRadius as number) + 10}
        fill={fill}
      />
      <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#374151" className="text-xs font-bold">{`${value}% Share`}</text>
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#6B7280" className="text-[10px]">
        {`Growth: +${(value * 0.1).toFixed(1)}%`}
      </text>
    </g>
  );
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-4 border border-blue-50 shadow-xl rounded-lg">
        <p className="text-[10px] font-bold text-gray-400 uppercase mb-2">{label} 2026</p>
        <div className="space-y-1">
          <div className="flex items-center justify-between space-x-8">
            <span className="text-[10px] font-bold text-gray-600 uppercase">Revenue</span>
            <span className="text-sm font-black text-blue-900">KSh {payload[0].value.toLocaleString()}</span>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

const ReportsPage = () => {
  const [activeTab, setActiveTab] = useState('Sales Reports');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index);
  };

  const stats = [
    { label: 'Total Revenue', value: 'KSh 8.4M', change: '▲ 12.4%', meta: 'vs last month', icon: '💰', color: 'bg-green-50 text-green-600', borderColor: 'border-green-100' },
    { label: 'Transactions', value: '2,841', change: '▲ 8.1%', meta: 'vs last month', icon: '🧾', color: 'bg-blue-50 text-blue-600', borderColor: 'border-blue-100' },
    { label: 'Avg. Order', value: 'KSh 2,968', change: '▲ 3.9%', meta: 'vs last month', icon: '⚖️', color: 'bg-blue-50 text-blue-600', borderColor: 'border-blue-100' },
    { label: 'Returns', value: 'KSh 120K', change: '▼ 1.2%', meta: 'return rate', icon: '↩️', color: 'bg-blue-50 text-blue-600', borderColor: 'border-blue-100' },
  ];

  const renderSalesReports = () => (
    <div className="space-y-4">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {stats.map((stat) => (
          <div key={stat.label} className={`bg-white p-2 rounded-sm border ${stat.borderColor} shadow-sm hover:shadow-md transition-all group cursor-default relative overflow-hidden`}>
            <div className="flex items-center justify-between mb-3">
              <div className={`w-8 h-8 rounded-sm flex items-center justify-center text-xl shadow-inner group-hover:scale-110 transition-transform ${stat.color}`}>
                {stat.icon}
              </div>
              <div className={`flex items-center space-x-1 text-[10px] font-black px-2.5 py-1 rounded-full ${
                stat.label === 'Returns' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
              }`}>
                <span>{stat.change}</span>
              </div>
            </div>
            <div className="relative z-10">
              <p className="text-[10px] font-black text-gray-600 uppercase">{stat.label}</p>
              <h4 className="text-xl font-black text-blue-900 mt-1">{stat.value}</h4>
              <p className="text-[10px] font-bold text-gray-600 uppercase mt-1 flex items-center">
                <span className="w-1.5 h-1.5 rounded-full bg-gray-300 mr-2" />
                {stat.meta}
              </p>
            </div>
            <div className={`absolute -right-4 -bottom-4 w-24 h-24 rounded-full opacity-5 group-hover:scale-150 transition-transform duration-700 ${stat.color}`} />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
        {/* Daily Sales Revenue Chart */}
        <div className="lg:col-span-2 bg-white p-3 rounded-sm border border-blue-100 shadow-sm overflow-hidden flex flex-col">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
            <div>
              <h3 className="text-lg font-black text-blue-900 uppercase">Performance History</h3>
              <p className="text-[10px] font-black text-gray-600 uppercase">2026 Annual Analytics · Monthly View</p>
            </div>
            <div className="flex bg-blue-50 p-1 rounded-md border border-blue-100">
              <button className="px-6 py-2 bg-linear-to-l from-blue-800 to-blue-950 text-white text-[10px] font-black uppercase rounded-md shadow-lg shadow-blue-900/20 transition-all">Monthly</button>
              <button className="px-6 py-2 text-gray-400 text-[10px] font-black uppercase rounded-md hover:text-blue-900 transition-colors">Quarterly</button>
            </div>
          </div>

          <div className="h-[300px] w-full flex-1">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={performanceData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#9CA3AF', fontSize: 13, fontWeight: 900 }}
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#9CA3AF', fontSize: 13, fontWeight: 900 }}
                />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: '#F9FAFB' }} />
                <Bar 
                  dataKey="revenue" 
                  name="Revenue"
                  fill="#1E3A8A" 
                  radius={[0, 0, 0, 0]} 
                  barSize={48}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Sales by Category */}
        <div className="bg-white p-3 rounded-sm border border-blue-100 shadow-sm flex flex-col">
          <h3 className="text-lg font-black text-blue-900 uppercase">Category Split</h3>
          <p className="text-[10px] font-black text-gray-600 uppercase">Top Performing 2026</p>
          
          <div className="flex-1 flex flex-col justify-center">
            <div className="h-[275px] w-full relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    activeIndex={activeIndex}
                    // activeShape={renderActiveShape}
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={95}
                    dataKey="value"
                    onMouseEnter={onPieEnter}
                    paddingAngle={5}
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="space-y-4">
              {categoryData.map((cat) => (
                <div key={cat.name} className="space-y-2 group">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-md ${cat.bgColor} shadow-sm group-hover:scale-125 transition-transform`} />
                      <span className="text-[10px] font-black text-gray-700 uppercase ">{cat.name}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-[10px] font-black text-blue-900 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-100">{cat.value}%</span>
                    </div>
                  </div>
                  <div className="w-full h-2 bg-gray-50 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${cat.bgColor} transition-all duration-1000 shadow-sm`}
                      style={{ width: `${cat.value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'Sales Reports':
        return renderSalesReports();
      case 'Profit Reports':
        return <ProfitsReports />;
      case 'Inventory Reports':
        return <InventoryReports />;
      case 'Cashier Reports':
        return <CashierReports />;
      case 'Financial Reports':
        return <FinancialReports />;
      case 'Export Reports':
        return <ExportsReports />;
      default:
        return (
          <div className="h-full flex items-center justify-center py-12 px-4">
            <div className="text-center space-y-4 bg-white p-12 rounded-3xl shadow-sm border border-blue-50 max-w-md w-full">
              <div className="text-6xl mb-6">📊</div>
              <h3 className="text-xl font-black text-gray-900 uppercase">Coming Soon</h3>
              <p className="text-[10px] font-black text-gray-400 uppercase leading-relaxed tracking-widest">We are preparing advanced analytics for {activeTab}. Stay tuned.</p>
              <button 
                onClick={() => setActiveTab('Sales Reports')} 
                className="w-full mt-8 py-4 bg-blue-900 text-white rounded-2xl text-[10px] font-black uppercase shadow-lg shadow-blue-900/20 hover:bg-blue-950 active:scale-95 transition-all tracking-widest"
              >
                Return to Dashboard
              </button>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col space-y-4 bg-slate-50/50">
      <ReportsNavbar 
        activeTab={activeTab} 
        onTabChange={setActiveTab} 
        onNewReport={() => setIsModalOpen(true)}
      />
      
      <div className="flex-1 p-4 md:p-6 lg:p-8 pt-0 md:pt-0 lg:pt-0">
        {renderContent()}
      </div>

      <NewReportModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default ReportsPage;
