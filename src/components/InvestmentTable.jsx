export default function InvestmentTable({ yearlyData }) {
  const formatCurrency = (val) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(val);
  
  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm overflow-hidden mt-6">
      <div className="p-6 border-b border-slate-100 dark:border-slate-700">
        <h3 className="font-semibold text-slate-800 dark:text-slate-200 text-lg">Yearly Breakdown</h3>
      </div>
      <div className="overflow-x-auto max-h-[600px] overflow-y-auto">
        <table className="w-full text-left text-sm relative">
          <thead className="bg-slate-50/90 dark:bg-slate-900/90 text-slate-500 dark:text-slate-400 sticky top-0 backdrop-blur z-10 shadow-sm">
            <tr>
              <th className="px-6 py-4 font-medium whitespace-nowrap">Year</th>
              <th className="px-6 py-4 font-medium whitespace-nowrap">Amount Invested</th>
              <th className="px-6 py-4 font-medium whitespace-nowrap">Total Returns</th>
              <th className="px-6 py-4 font-medium whitespace-nowrap">Balance Value</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-700/50 text-slate-700 dark:text-slate-300">
            {yearlyData.map((row) => (
              <tr key={row.year} className="hover:bg-slate-50/50 dark:hover:bg-slate-700/30 transition-colors">
                <td className="px-6 py-4 font-medium">{row.year}</td>
                <td className="px-6 py-4">{formatCurrency(row.invested)}</td>
                <td className="px-6 py-4 text-emerald-600 dark:text-emerald-400">{formatCurrency(row.value - row.invested)}</td>
                <td className="px-6 py-4 font-semibold text-blue-600 dark:text-blue-400">{formatCurrency(row.value)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
