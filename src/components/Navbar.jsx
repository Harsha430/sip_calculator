import { Calculator } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="bg-white shadow-sm border-b border-slate-200 sticky top-0 z-10 w-full dark:bg-slate-900 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 p-2 rounded-lg">
              <Calculator className="h-6 w-6 text-white" />
            </div>
            <span className="font-bold text-xl tracking-tight text-slate-900 dark:text-white">
              SIP <span className="text-blue-600">Calculator</span>
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
}
