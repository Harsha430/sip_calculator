import { useState } from 'react';
import Navbar from './components/Navbar';
import CalculatorForm from './components/CalculatorForm';
import ResultsCard from './components/ResultsCard';
import ChartsSection from './components/ChartsSection';
import InvestmentTable from './components/InvestmentTable';
import { calculateSIP } from './utils/sipCalculator';
import { calculateStepUpSIP } from './utils/stepUpSipCalculator';

export default function App() {
  const [activeTab, setActiveTab] = useState('sip'); // 'sip' or 'stepUp'
  const [results, setResults] = useState(null);

  const handleCalculate = (data) => {
    let result;
    if (activeTab === 'sip') {
      result = calculateSIP(data.investment, data.rate, data.years);
    } else {
      result = calculateStepUpSIP(data.investment, data.rate, data.years, data.stepUpRate);
    }
    setResults(result);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-sans pb-12 selection:bg-blue-200 dark:selection:bg-blue-900">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {/* Header & Tabs */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-6">
          <div className="max-w-2xl">
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl text-balance">
              Investment Planner
            </h1>
            <p className="mt-2 text-lg text-slate-600 dark:text-slate-400 text-balance">
              Plan your future wealth creation journey with our advanced calculators. Let compound interest work for you.
            </p>
          </div>
          
          <div className="flex p-1 space-x-1 bg-slate-200/60 dark:bg-slate-800 rounded-xl shrink-0 w-full sm:w-auto">
            <button
              onClick={() => { setActiveTab('sip'); setResults(null); }}
              className={`flex-1 sm:flex-none px-6 py-2.5 text-sm font-semibold rounded-lg transition-all ${
                activeTab === 'sip' 
                  ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm' 
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-700/50'
              }`}
            >
              Standard SIP
            </button>
            <button
              onClick={() => { setActiveTab('stepUp'); setResults(null); }}
              className={`flex-1 sm:flex-none px-6 py-2.5 text-sm font-semibold rounded-lg transition-all ${
                activeTab === 'stepUp' 
                  ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm' 
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-700/50'
              }`}
            >
              Step-Up SIP
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Form */}
          <div className="xl:col-span-4 sticky top-24">
            <CalculatorForm mode={activeTab} onCalculate={handleCalculate} />
          </div>
          
          {/* Right Column: Results */}
          <div className="xl:col-span-8 space-y-8 min-h-[400px]">
            {results ? (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-8">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <ResultsCard title="Total Invested Amount" amount={results.totalInvested} />
                  <ResultsCard title="Est. Returns" amount={results.estimatedReturns} />
                  <ResultsCard title="Total Value" amount={results.finalValue} highlight={true} />
                </div>

                <ChartsSection 
                  totalInvested={results.totalInvested} 
                  estimatedReturns={results.estimatedReturns} 
                  yearlyData={results.yearlyData} 
                />

                <InvestmentTable yearlyData={results.yearlyData} />
              </div>
            ) : (
              <div className="h-full min-h-[400px] flex flex-col items-center justify-center text-slate-400 dark:text-slate-500 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-2xl p-8 text-center bg-white/50 dark:bg-slate-800/20">
                <div className="p-4 bg-slate-100 dark:bg-slate-800 rounded-full mb-4 shadow-sm">
                  <svg className="w-8 h-8 text-slate-500 dark:text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-slate-900 dark:text-slate-300 mb-1">Awaiting Details</h3>
                <p className="max-w-xs">Enter your investment details and click Calculate to view projections.</p>
              </div>
            )}
          </div>

        </div>
      </main>
    </div>
  );
}
