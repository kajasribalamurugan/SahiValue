import React from 'react';
import { useApp } from '../context/AppContext';
import { useLanguage } from '../i18n/LanguageContext';
import { UserCheck, ShieldCheck, Info } from 'lucide-react';

export const RoleSimulatorBar: React.FC = () => {
  const { activeRole, setActiveRole } = useApp();
  const { t } = useLanguage();

  return (
    <div className="bg-slate-900 text-slate-200 border-b border-slate-800 px-4 py-2 text-xs select-none sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="font-bold text-white tracking-wide">SAHI VALUE</span>
          <span className="text-[11px] text-slate-400 hidden sm:inline">| Hackathon Prototype Simulator</span>
        </div>

        <div className="flex items-center bg-slate-950 p-1 rounded-lg border border-slate-800">
          <button
            onClick={() => setActiveRole('collector')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-md transition-all font-medium text-xs ${
              activeRole === 'collector'
                ? 'bg-emerald-600 text-white shadow-sm font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <UserCheck className="w-3.5 h-3.5" />
            <span>{t('nav.collectorPortal')}</span>
          </button>

          <button
            onClick={() => setActiveRole('recycler')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-md transition-all font-medium text-xs ${
              activeRole === 'recycler'
                ? 'bg-amber-600 text-white shadow-sm font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>{t('recyclerNav.facilityProfile')}</span>
          </button>
        </div>

        <div className="hidden lg:flex items-center gap-1 text-[11px] text-amber-300 bg-amber-950/40 px-2.5 py-1 rounded border border-amber-800/40">
          <Info className="w-3.5 h-3.5 shrink-0 text-amber-400" />
          <span>{t('simulator.demoNotice')}</span>
        </div>
      </div>
    </div>
  );
};

