import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, MapPin, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { TOURIST_SPOTS } from '../data/bangladeshData';

export const TopDestinations: React.FC = () => {
  const { language, t } = useLanguage();
  const navigate = useNavigate();

  return (
    <section className="py-16 sm:py-24 bg-slate-900 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-4">
          <div>
            <div className="text-xs uppercase tracking-widest text-emerald-400 font-semibold mb-2">
              {language === 'bn' ? 'শ্রেষ্ঠ দর্শনীয় স্থান' : 'Signature Experiences'}
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              {t('sec.destinationsTitle')}
            </h2>
            <p className="mt-2 text-slate-400 text-sm sm:text-base max-w-xl">
              {t('sec.destinationsSubtitle')}
            </p>
          </div>
          <button
            onClick={() => navigate('/tourism')}
            className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-400 hover:text-emerald-300 transition-colors self-start md:self-end"
          >
            <span>{t('action.viewAll')}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Tourist Spots Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {TOURIST_SPOTS.map(spot => (
            <div
              key={spot.id}
              onClick={() => navigate(`/tourism/${spot.id}`)}
              className="group bg-slate-950 rounded-2xl overflow-hidden border border-slate-800/80 hover:border-emerald-500/50 cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-emerald-950/20 flex flex-col justify-between"
            >
              <div>
                {/* Image */}
                <div className="relative h-52 sm:h-56 w-full overflow-hidden">
                  <img
                    src={spot.image}
                    alt={language === 'bn' ? spot.nameBn : spot.nameEn}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-106 filter brightness-90 group-hover:brightness-100"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                  
                  {/* Rating Badge */}
                  <div className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-950/80 backdrop-blur-md border border-slate-700 text-xs font-semibold text-amber-300">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{spot.rating}</span>
                  </div>

                  {/* Best time tag */}
                  <div className="absolute bottom-3 left-3 text-[11px] font-medium text-slate-200 bg-slate-950/70 backdrop-blur-sm px-2.5 py-0.5 rounded-md border border-slate-800">
                    {language === 'bn' ? spot.bestTimeBn : spot.bestTimeEn}
                  </div>
                </div>

                {/* Details */}
                <div className="p-5">
                  <div className="flex items-center gap-1.5 text-xs text-emerald-400 mb-2 font-medium">
                    <MapPin className="w-3.5 h-3.5 shrink-0" />
                    <span className="truncate">{language === 'bn' ? spot.locationBn : spot.locationEn}</span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-100 group-hover:text-emerald-300 transition-colors">
                    {language === 'bn' ? spot.nameBn : spot.nameEn}
                  </h3>

                  <p className="mt-2 text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    {language === 'bn' ? spot.descriptionBn : spot.descriptionEn}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {(language === 'bn' ? spot.highlightsBn : spot.highlightsEn).slice(0, 3).map((hl, i) => (
                      <span key={i} className="text-[11px] px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300">
                        {hl}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="px-5 pb-5 pt-3 border-t border-slate-850 flex items-center justify-between text-xs font-semibold">
                <span className="text-slate-400">
                  {language === 'bn' ? spot.entryFeeBn : spot.entryFeeEn}
                </span>
                <span className="text-emerald-400 group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                  <span>{t('action.explore')}</span>
                  <span>→</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
