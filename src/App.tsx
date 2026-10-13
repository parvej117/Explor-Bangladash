/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { ModalProvider } from './context/ModalContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { SearchModal } from './components/SearchModal';
import { AuthModal } from './components/AuthModal';

// Pages
import { HomePage } from './pages/HomePage';
import { DivisionsPage } from './pages/DivisionsPage';
import { DivisionDetailPage } from './pages/DivisionDetailPage';
import { DistrictsPage } from './pages/DistrictsPage';
import { DistrictDetailPage } from './pages/DistrictDetailPage';
import { UpazilasPage } from './pages/UpazilasPage';
import { UpazilaDetailPage } from './pages/UpazilaDetailPage';
import { TourismPage } from './pages/TourismPage';
import { TourismDetailPage } from './pages/TourismDetailPage';
import { HistoricalPlacesPage } from './pages/HistoricalPlacesPage';
import { CulturePage } from './pages/CulturePage';
import { FoodPage } from './pages/FoodPage';
import { PersonalitiesPage } from './pages/PersonalitiesPage';
import { BlogPage } from './pages/BlogPage';
import { ArticleDetailPage } from './pages/ArticleDetailPage';
import { CommunityPage } from './pages/CommunityPage';
import { CommunityStoryDetailPage } from './pages/CommunityStoryDetailPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { NotFoundPage } from './pages/NotFoundPage';

// ScrollToTop component
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default function App() {
  return (
    <LanguageProvider>
      <ModalProvider>
        <BrowserRouter>
          <ScrollToTop />
          <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 font-sans selection:bg-emerald-500 selection:text-white">
            <Navbar />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/divisions" element={<DivisionsPage />} />
                <Route path="/divisions/:id" element={<DivisionDetailPage />} />
                <Route path="/districts" element={<DistrictsPage />} />
                <Route path="/districts/:id" element={<DistrictDetailPage />} />
                <Route path="/upazilas" element={<UpazilasPage />} />
                <Route path="/upazilas/:id" element={<UpazilaDetailPage />} />
                <Route path="/tourism" element={<TourismPage />} />
                <Route path="/tourism/:id" element={<TourismDetailPage />} />
                <Route path="/historical-places" element={<HistoricalPlacesPage />} />
                <Route path="/culture" element={<CulturePage />} />
                <Route path="/food" element={<FoodPage />} />
                <Route path="/personalities" element={<PersonalitiesPage />} />
                <Route path="/blog" element={<BlogPage />} />
                <Route path="/blog/:slug" element={<ArticleDetailPage />} />
                <Route path="/community" element={<CommunityPage />} />
                <Route path="/community/:id" element={<CommunityStoryDetailPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </main>
            <Footer />
            <SearchModal />
            <AuthModal />
          </div>
        </BrowserRouter>
      </ModalProvider>
    </LanguageProvider>
  );
}
