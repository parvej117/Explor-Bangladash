import React from 'react';
import { Hero } from '../components/Hero';
import { DestinationShowcaseSlider } from '../components/DestinationShowcaseSlider';
import { CategoriesSection } from '../components/CategoriesSection';
import { FeaturedArticles } from '../components/FeaturedArticles';
import { GeographicExplorer } from '../components/GeographicExplorer';
import { TopDestinations } from '../components/TopDestinations';
import { Showcase3DSection } from '../components/Showcase3DSection';
import { CommunitySection } from '../components/community/CommunitySection';
import { useLanguage } from '../context/LanguageContext';
import { useNavigate } from 'react-router-dom';
import { Compass, ShieldCheck, Heart, Sparkles, ArrowRight } from 'lucide-react';
import { SMRITI_SHOUDHO_IMAGE } from '../data/bangladeshData';

export const HomePage: React.FC = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();

  return (
    <div className="space-y-0">
      {/* 1. Hero Section (3D River & Sunset Boat) */}
      <Hero />

      {/* 2. Animated Bangladesh Tourist Destination Showcase Section */}
      <DestinationShowcaseSlider />

      {/* 3. Popular Categories (8 Cards) */}
      <CategoriesSection />

      {/* 3. Latest Articles (Light Background) */}
      <FeaturedArticles />

      {/* 4. Geographic Navigation (with 3D Globe & Divisions) */}
      <GeographicExplorer />

      {/* 5. 3D Interactive Landmarks & Heritage */}
      <Showcase3DSection />

      {/* 6. Top Tourist Destinations */}
      <TopDestinations />

      {/* 7. Interactive Community Section: ভ্রমণ অভিজ্ঞতা ও মতামত */}
      <CommunitySection />

      {/* 8. Bangladesh National Pride & Heritage Banner */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-emerald-950 via-slate-950 to-slate-900 border-t border-emerald-900/40 text-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl overflow-hidden border border-emerald-500/30 p-8 sm:p-12 lg:p-16 bg-slate-900/90 shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{language === 'bn' ? 'সোনার বাংলাদেশ' : 'Golden Bangladesh'}</span>
                </div>
                <h3 className="text-2xl sm:text-4xl font-black text-white leading-tight">
                  {language === 'bn'
                    ? 'হাজার নদীর দেশ, অবারিত সবুজ আর চিরভাস্বর ইতিহাস'
                    : 'Land of a Thousand Rivers, Endless Greenery & Resilient Spirit'}
                </h3>
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl">
                  {language === 'bn'
                    ? 'পদ্মা, মেঘনা, যমুনার পলিমাটিতে জন্ম নেওয়া এই দেশে রয়েছে সমৃদ্ধ ভাষা আন্দোলনের গৌরব, ১৯৭১ সালের মুক্তিযুদ্ধের বীরত্ব এবং বিশ্বের অন্যতম প্রাচীন সভ্যতার পদচিহ্ন।'
                    : 'Carved by the silt of the Padma, Meghna, and Jamuna, Bangladesh preserves the monumental 1952 Language Movement, the supreme sacrifice of the 1971 Liberation War, and prehistoric civilizational landmarks.'}
                </p>
                <div className="pt-2 flex flex-wrap gap-4">
                  <button
                    onClick={() => navigate('/historical-places')}
                    className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm transition-colors shadow-lg shadow-emerald-500/20 inline-flex items-center gap-2"
                  >
                    <span>{language === 'bn' ? 'ঐতিহাসিক নিদর্শন দেখুন' : 'Explore Historic Sites'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => navigate('/culture')}
                    className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-sm transition-colors border border-slate-700"
                  >
                    {language === 'bn' ? 'সংস্কৃতি ও উৎসব' : 'Culture & Festivals'}
                  </button>
                </div>
              </div>

              <div className="lg:col-span-4 relative h-64 sm:h-72 rounded-2xl overflow-hidden border border-slate-700 shadow-xl">
                <img
                  src={SMRITI_SHOUDHO_IMAGE}
                  alt="National Pride"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-xs font-semibold text-emerald-300">
                  {language === 'bn' ? 'জাতীয় স্মৃতিসৌধ, সাভার' : "National Martyrs' Memorial, Savar"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
