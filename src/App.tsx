import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { LanguageProvider } from './i18n/LanguageContext';
import { CollectorMobileLayout } from './components/CollectorMobileLayout';
import { RecyclerDesktopLayout } from './components/RecyclerDesktopLayout';

// Collector Screens
import { HomeScreen } from './screens/HomeScreen';
import { AddEWasteScreen } from './screens/AddEWasteScreen';
import { MaterialCategoryScreen } from './screens/MaterialCategoryScreen';
import { DeclaredWeightScreen } from './screens/DeclaredWeightScreen';
import { SahiValueEstimateScreen } from './screens/SahiValueEstimateScreen';
import { RecyclerListScreen } from './screens/RecyclerListScreen';
import { LotDetailsScreen } from './screens/LotDetailsScreen';
import { DigitalHandoverScreen } from './screens/DigitalHandoverScreen';
import { PriceBoardScreen } from './screens/collector/PriceBoardScreen';
import { MyLotsScreen } from './screens/collector/MyLotsScreen';
import { EarningsScreen } from './screens/EarningsScreen';
import { SafetyScreen } from './screens/collector/SafetyScreen';
import { CollectorProfileScreen } from './screens/collector/CollectorProfileScreen';

// Recycler Screens
import { RecyclerHomeScreen } from './screens/recycler/RecyclerHomeScreen';
import { RecyclerLotsScreen } from './screens/recycler/RecyclerLotsScreen';
import { RecyclerVerifyScreen } from './screens/recycler/RecyclerVerifyScreen';
import { RecyclerTransactionsScreen } from './screens/recycler/RecyclerTransactionsScreen';
import { RecyclerPricesScreen } from './screens/recycler/RecyclerPricesScreen';
import { RecyclerProfileScreen } from './screens/recycler/RecyclerProfileScreen';

const CollectorLayoutWrapper: React.FC = () => (
  <CollectorMobileLayout>
    <Outlet />
  </CollectorMobileLayout>
);

const RecyclerLayoutWrapper: React.FC = () => (
  <RecyclerDesktopLayout>
    <Outlet />
  </RecyclerDesktopLayout>
);

export const App: React.FC = () => {
  return (
    <LanguageProvider>
      <AppProvider>
        <BrowserRouter>
          <Routes>
            {/* Default Root Redirects to Collector Mobile App */}
            <Route path="/" element={<Navigate to="/collector/home" replace />} />
            <Route path="/collector" element={<Navigate to="/collector/home" replace />} />
            <Route path="/recycler" element={<Navigate to="/recycler/home" replace />} />

            {/* Collector Mobile Application Routes */}
            <Route element={<CollectorLayoutWrapper />}>
              <Route path="/collector/home" element={<HomeScreen />} />
              <Route path="/collector/add-ewaste" element={<AddEWasteScreen />} />
              <Route path="/collector/material-category" element={<MaterialCategoryScreen />} />
              <Route path="/collector/declared-weight" element={<DeclaredWeightScreen />} />
              <Route path="/collector/sahi-estimate" element={<SahiValueEstimateScreen />} />
              <Route path="/collector/recyclers" element={<RecyclerListScreen />} />
              <Route path="/collector/lot-details/:id" element={<LotDetailsScreen />} />
              <Route path="/collector/handover/:id" element={<DigitalHandoverScreen />} />
              <Route path="/collector/price-board" element={<PriceBoardScreen />} />
              <Route path="/collector/my-lots" element={<MyLotsScreen />} />
              <Route path="/collector/earnings" element={<EarningsScreen />} />
              <Route path="/collector/safety" element={<SafetyScreen />} />
              <Route path="/collector/profile" element={<CollectorProfileScreen />} />
            </Route>

            {/* Recycler Operations Dashboard Routes */}
            <Route element={<RecyclerLayoutWrapper />}>
              <Route path="/recycler/home" element={<RecyclerHomeScreen />} />
              <Route path="/recycler/lots" element={<RecyclerLotsScreen />} />
              <Route path="/recycler/verify-queue" element={<RecyclerVerifyScreen />} />
              <Route path="/recycler/verify/:id" element={<RecyclerVerifyScreen />} />
              <Route path="/recycler/transactions" element={<RecyclerTransactionsScreen />} />
              <Route path="/recycler/prices" element={<RecyclerPricesScreen />} />
              <Route path="/recycler/profile" element={<RecyclerProfileScreen />} />
            </Route>

            {/* Catch-all Fallback */}
            <Route path="*" element={<Navigate to="/collector/home" replace />} />
          </Routes>
        </BrowserRouter>
      </AppProvider>
    </LanguageProvider>
  );
};

export default App;
