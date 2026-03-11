export default function ResultsCard({ title, amount, highlight }) {
  // Utility to format currency nicely as INR
  const formattedAmount = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount || 0);

  return (
    <div className={`p-4 sm:p-6 rounded-2xl border ${
      highlight 
        ? 'bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-900/50' 
        : 'bg-white border-slate-100 dark:bg-slate-800 dark:border-slate-700'
    } shadow-sm flex flex-col items-start gap-1 sm:gap-2 transition-all duration-300 hover:shadow-md`}>
      <h3 className="text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300">
        {title}
      </h3>
      <p className={`text-xl sm:text-3xl font-bold break-all ${
        highlight ? 'text-blue-700 dark:text-blue-400' : 'text-slate-900 dark:text-white'
      }`}>
        {formattedAmount}
      </p>
    </div>
  );
}
