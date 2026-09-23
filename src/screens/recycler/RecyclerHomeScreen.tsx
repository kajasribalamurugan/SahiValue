import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { useLanguage } from '../../i18n/LanguageContext';
import { StatusBadge } from '../../components/StatusBadge';
import { 
  Scale, 
  ShieldCheck
} from 'lucide-react';

export const RecyclerHomeScreen: React.FC = () => {
  const navigate = useNavigate();
  const { totalEarnings, totalVerifiedWeight, lots } = useApp();
  const { t, getTranslatedMaterialName } = useLanguage();

  const pendingLots = lots.filter((l) => l.status === 'PENDING_HANDOVER');

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-amber-900 uppercase tracking-wider flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-amber-700" />
            {t('recycler.title')}
          </span>
          <h1 className="text-xl font-bold text-slate-900 mt-1">{t('recycler.facilityName')}</h1>
          <p className="text-xs text-slate-600">{t('recycler.facilitySub')}</p>
        </div>

        {pendingLots.length > 0 && (
          <button
            onClick={() => navigate(`/recycler/verify/${pendingLots[0].id}`)}
            className="px-4 py-2.5 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-xl text-xs shadow-xs transition-colors flex items-center gap-1.5"
          >
            <Scale className="w-4 h-4" />
            <span>{t('recycler.weighActiveBtn')} ({pendingLots[0].id}) &rarr;</span>
          </button>
        )}
      </div>

      {/* Recycler KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="fintech-card p-4 space-y-1">
          <span className="text-xs text-slate-500 font-semibold block uppercase">{t('recycler.pendingQueue')}</span>
          <p className="text-2xl font-black text-slate-900">{pendingLots.length} {t('earnings.records')}</p>
          <span className="text-[11px] text-amber-700 font-medium">{t('recycler.awaitingScale')}</span>
        </div>

        <div className="fintech-card p-4 space-y-1">
          <span className="text-xs text-slate-500 font-semibold block uppercase">{t('recycler.todayPurchases')}</span>
          <p className="text-2xl font-black text-slate-900">₹{totalEarnings > 0 ? totalEarnings.toLocaleString('en-IN') : '5,040'}</p>
          <span className="text-[11px] text-emerald-700 font-medium">{t('recycler.upiReleased')}</span>
        </div>

        <div className="fintech-card p-4 space-y-1">
          <span className="text-xs text-slate-500 font-semibold block uppercase">{t('recycler.eWasteReceived')}</span>
          <p className="text-2xl font-black text-slate-900">{totalVerifiedWeight > 0 ? totalVerifiedWeight.toFixed(1) : '15.0'} {t('common.kg')}</p>
          <span className="text-[11px] text-slate-500">{t('recycler.chainAudited')}</span>
        </div>

        <div className="fintech-card p-4 space-y-1">
          <span className="text-xs text-slate-500 font-semibold block uppercase">{t('recycler.activeCollectors')}</span>
          <p className="text-2xl font-black text-slate-900">12 {t('profile.batches')}</p>
          <span className="text-[11px] text-slate-500">{t('recycler.localNetwork')}</span>
        </div>
      </div>

      {/* Verification Queue Section */}
      <div className="fintech-card p-5 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <h2 className="text-base font-bold text-slate-900">{t('recycler.incomingQueueTitle')}</h2>
            <p className="text-xs text-slate-500">{t('recycler.incomingQueueSub')}</p>
          </div>
          <button
            onClick={() => navigate('/recycler/lots')}
            className="text-xs font-semibold text-emerald-700 hover:text-emerald-800"
          >
            {t('recycler.viewAllLots')}
          </button>
        </div>

        {pendingLots.length === 0 ? (
          <div className="p-8 text-center text-slate-500 text-xs">
            {t('recycler.noIncoming')}
          </div>
        ) : (
          <div className="space-y-3">
            {pendingLots.map((lot) => (
              <div
                key={lot.id}
                className="p-4 rounded-xl border border-amber-200 bg-amber-50/40 flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="space-y-1 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-slate-900 text-sm">{lot.id}</span>
                    <StatusBadge status={lot.status} />
                  </div>
                  <p className="text-slate-700">{t('material.selectedCat')} <strong className="text-slate-900">{getTranslatedMaterialName(lot.material.id, lot.material.name)}</strong></p>
                  <p className="text-slate-700">{t('lot.declaredWeight')} <strong className="text-amber-800">{lot.declaredWeight} {t('common.kg')}</strong></p>
                  <p className="text-slate-700">{t('material.benchmarkRate')} <span className="font-semibold text-emerald-700">₹{lot.material.pricePerKg}/{t('common.kg')}</span></p>
                </div>

                <button
                  onClick={() => navigate(`/recycler/verify/${lot.id}`)}
                  className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center gap-1.5"
                >
                  <Scale className="w-4 h-4" />
                  <span>{t('recycler.enterScaleBtn')} &rarr;</span>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

