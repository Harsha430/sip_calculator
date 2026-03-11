import { useState, useEffect } from 'react';

export default function CalculatorForm({ mode, onCalculate }) {
  const [investment, setInvestment] = useState(5000);
  const [rate, setRate] = useState(12);
  const [years, setYears] = useState(10);
  const [stepUp, setStepUp] = useState(10);

  // We will call handleCalculate on form submit.
  // We'll also call it when mode changes to update the defaults if necessary.
  useEffect(() => {
    // only trigger once per mode change to initialize data without infinite looping with onCalculate
    handleCalculate();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode]); 

  const handleCalculate = () => {
    if (onCalculate) {
      onCalculate({
        investment: Number(investment),
        rate: Number(rate),
        years: Number(years),
        stepUpRate: mode === 'stepUp' ? Number(stepUp) : 0,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleCalculate();
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm flex flex-col gap-5">
      
      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
          {mode === 'stepUp' ? 'Initial Monthly Investment (₹)' : 'Monthly Investment Amount (₹)'}
        </label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 font-medium">₹</span>
          <input 
            type="number" 
            min="100" 
            required
            value={investment}
            onChange={(e) => setInvestment(e.target.value)}
            className="w-full pl-8 pr-4 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 dark:text-white transition-all text-base"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
          Expected Annual Return Rate (%)
        </label>
        <div className="relative">
          <input 
            type="number" 
            min="1" 
            max="30"
            step="0.1"
            required
            value={rate}
            onChange={(e) => setRate(e.target.value)}
            className="w-full pl-4 pr-8 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 dark:text-white transition-all text-base"
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 font-medium">%</span>
        </div>
        <div className="flex justify-between text-xs text-slate-400 mt-1">
          <span>Min: 1%</span>
          <span>Max: 30%</span>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
          Investment Duration (Years)
        </label>
        <div className="relative">
          <input 
            type="number" 
            min="1" 
            max="40"
            required
            value={years}
            onChange={(e) => setYears(e.target.value)}
            className="w-full pl-4 pr-12 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 dark:text-white transition-all text-base"
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 font-medium pb-px">Yr</span>
        </div>
        <div className="flex justify-between text-xs text-slate-400 mt-1">
          <span>Min: 1 Yr</span>
          <span>Max: 40 Yrs</span>
        </div>
      </div>

      {mode === 'stepUp' && (
        <div className="animate-in fade-in slide-in-from-top-2 duration-300">
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            Annual Step-Up Percentage (%)
          </label>
          <div className="relative">
            <input 
              type="number" 
              min="1" 
              max="100"
              required
              value={stepUp}
              onChange={(e) => setStepUp(e.target.value)}
              className="w-full pl-4 pr-8 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 dark:text-white transition-all text-base"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 font-medium pb-px">%</span>
          </div>
        </div>
      )}

      <button 
        type="submit"
        className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-xl transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-slate-800 active:scale-[0.98]"
      >
        Calculate Returns
      </button>

    </form>
  );
}
