import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ChevronRight, MapPin, Star, Clock, DollarSign, Navigation, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { TOURIST_SPOTS, DIVISIONS, DISTRICTS } from '../data/bangladeshData';

export const TourismDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { language, t } = useLanguage();
  const navigate = useNavigate();

  const spot = TOURIST_SPOTS.find(s => s.id === id) || TOURIST_SPOTS[0];
  const division = DIVISIONS.find(d => d.id === spot.divisionId);
  const district = DISTRICTS.find(d => d.id === spot.districtId);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pb-20">
      {/* Banner */}
      <div className="relative h-80 sm:h-[460px] w-full overflow-hidden">
        <img
          src={spot.image}
          alt={spot.nameEn}
          className="w-full h-full object-cover filter brightness-85"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />

        <div className="absolute bottom-0 inset-x-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-slate-300 mb-3 flex-wrap">
            <Link to="/" className="hover:text-emerald-400 transition-colors">
              {t('geo.bangladesh')}
            </Link>
            <ChevronRight className="w-3 h-3 text-slate-500" />
            <Link to="/tourism" className="hover:text-emerald-400 transition-colors">
              {t('nav.tourism')}
            </Link>
            <ChevronRight className="w-3 h-3 text-slate-500" />
            <span className="text-emerald-400 font-semibold">
              {language === 'bn' ? spot.nameBn : spot.nameEn}
            </span>
          </nav>

          <div className="flex items-center gap-2 mb-2">
            <div className="flex items-center gap-1 px-2.5 py-0.5 rounded-lg bg-emerald-950/80 border border-emerald-500/50 text-xs font-semibold text-emerald-300">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{spot.rating} ({spot.reviewsCount.toLocaleString()} {language === 'bn' ? 'পর্যালোচক' : 'reviews'})</span>
            </div>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white">
            {language === 'bn' ? spot.nameBn : spot.nameEn}
          </h1>
          <div className="flex items-center gap-1.5 text-xs sm:text-sm text-slate-300 mt-2">
            <MapPin className="w-4 h-4 text-emerald-400" />
            <span>{language === 'bn' ? spot.locationBn : spot.locationEn}</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Details */}
          <div className="lg:col-span-8 space-y-8">
            {/* Overview */}
            <div className="bg-slate-900 border border-slate-800 p-6 sm:p-8 rounded-3xl space-y-4">
              <h2 className="text-xl font-bold text-white">
                {language === 'bn' ? 'স্থান পরিচিতি ও সৌন্দর্য' : 'About the Destination'}
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                {language === 'bn' ? spot.descriptionBn : spot.descriptionEn}
              </p>

              <div className="pt-4 border-t border-slate-800">
                <h3 className="text-sm font-bold text-emerald-400 mb-3">
                  {language === 'bn' ? 'প্রধান প্রধান আকর্ষণসমূহ' : 'Key Highlights & Activities'}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {(language === 'bn' ? spot.highlightsBn : spot.highlightsEn).map((hl, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs sm:text-sm text-slate-200">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>{hl}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* How to Reach Guide */}
            <div className="bg-slate-900 border border-slate-800 p-6 sm:p-8 rounded-3xl space-y-4">
              <div className="flex items-center gap-2 text-emerald-400">
                <Navigation className="w-5 h-5" />
                <h3 className="text-lg font-bold text-white">
                  {language === 'bn' ? 'কীভাবে পৌঁছাবেন (যাতায়াত গাইড)' : 'How to Reach'}
                </h3>
              </div>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                {language === 'bn' ? spot.howToReachBn : spot.howToReachEn}
              </p>
            </div>
          </div>

          {/* Right Column: Travel Quick Card */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-5">
              <h3 className="text-base font-bold text-white">
                {language === 'bn' ? 'ভ্রমণ সহায়িকা' : 'Travel Essentials'}
              </h3>

              <div className="space-y-4 text-xs sm:text-sm">
                <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                  <Clock className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-slate-400 font-medium">
                      {language === 'bn' ? 'ভ্রমণের সেরা সময়' : 'Best Time to Visit'}
                    </div>
                    <div className="text-slate-200 font-semibold mt-0.5">
                      {language === 'bn' ? spot.bestTimeBn : spot.bestTimeEn}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                  <DollarSign className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-slate-400 font-medium">
                      {language === 'bn' ? 'প্রবেশ ফি ও খরচ' : 'Entry Fee / Cost'}
                    </div>
                    <div className="text-slate-200 font-semibold mt-0.5">
                      {language === 'bn' ? spot.entryFeeBn : spot.entryFeeEn}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                  <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-slate-400 font-medium">
                      {language === 'bn' ? 'প্রশাসনিক এলাকা' : 'Administrative District'}
                    </div>
                    <div className="text-slate-200 font-semibold mt-0.5">
                      {language === 'bn' ? `${district?.nameBn} জেলা, ${division?.nameBn} বিভাগ` : `${district?.nameEn}, ${division?.nameEn}`}
                    </div>
                  </div>
                </div>
              </div>

              {district && (
                <div className="pt-2">
                  <button
                    onClick={() => navigate(`/districts/${district.id}`)}
                    className="w-full py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors flex items-center justify-center gap-2"
                  >
                    <span>{language === 'bn' ? `${district.nameBn} জেলার সম্পূর্ণ তথ্য` : `Explore ${district.nameEn} District`}</span>
                    <span>→</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
