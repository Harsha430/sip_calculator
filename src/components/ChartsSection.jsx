import { ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

export default function ChartsSection({ totalInvested, estimatedReturns, yearlyData }) {
  const pieData = [
    { name: 'Total Invested', value: totalInvested },
    { name: 'Estimated Returns', value: estimatedReturns }
  ];
  
  const COLORS = ['#94a3b8', '#3b82f6']; // slate-400 for Invested, blue-500 for Returns

  // format y-axis
  const formatYAxis = (tickItem) => {
    if (tickItem >= 10000000) return `₹${(tickItem / 10000000).toFixed(1)}Cr`;
    if (tickItem >= 100000) return `₹${(tickItem / 100000).toFixed(1)}L`;
    if (tickItem >= 1000) return `₹${(tickItem / 1000).toFixed(1)}K`;
    return `₹${tickItem}`;
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-xl">
          <p className="font-semibold text-slate-900 dark:text-white mb-3 text-sm">Year {label}</p>
          <div className="flex flex-col gap-2">
            {payload.map((entry, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }} />
                <p style={{ color: entry.color }} className="text-sm font-medium">
                  {entry.name}: {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(entry.value)}
                </p>
              </div>
            ))}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Pie Chart */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm flex flex-col items-center justify-center min-h-[400px]">
          <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-6 text-lg w-full text-left">Investment vs Returns</h3>
          <div className="w-full flex-1 min-h-[300px]" style={{ minHeight: '300px' }}>
            <ResponsiveContainer width="100%" height="100%" minHeight={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} className="stroke-white dark:stroke-slate-800 stroke-2" />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(value)}
                  contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', backgroundColor: 'var(--tw-colors-white, #fff)' }}
                />
                <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Line Chart */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm flex flex-col min-h-[400px]">
          <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-6 text-lg">Portfolio Growth Over Time</h3>
          <div className="w-full flex-1" style={{ minHeight: '300px' }}>
            <ResponsiveContainer width="100%" height="100%" minHeight={300}>
              <LineChart data={yearlyData} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} className="stroke-slate-200 dark:stroke-slate-700/50" />
                <XAxis dataKey="year" tickLine={false} axisLine={false} tickMargin={10} className="text-xs fill-slate-500 dark:fill-slate-400" />
                <YAxis tickFormatter={formatYAxis} tickLine={false} axisLine={false} tickMargin={10} className="text-xs fill-slate-500 dark:fill-slate-400" width={60} />
                <Tooltip content={<CustomTooltip />} />
                <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px' }} />
                <Line type="monotone" name="Total Value" dataKey="value" stroke="#3b82f6" strokeWidth={3} dot={false} activeDot={{ r: 6, strokeWidth: 0 }} />
                <Line type="monotone" name="Invested Amount" dataKey="invested" stroke="#94a3b8" strokeWidth={3} dot={false} activeDot={{ r: 6, strokeWidth: 0 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </div>
  );
}
