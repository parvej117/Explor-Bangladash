import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { MapPin, Landmark, Compass, ChevronRight, Users, CheckCircle2, UtensilsCrossed, ArrowLeft } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { DISTRICTS, DIVISIONS, UPAZILAS, TOURIST_SPOTS } from '../data/bangladeshData';

export const DistrictDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { language, t } = useLanguage();
  const navigate = useNavigate();

  const district = DISTRICTS.find(d => d.id === id) || DISTRICTS[0];
  const division = DIVISIONS.find(div => div.id === district.divisionId) || DIVISIONS[0];
  const districtUpazilas = UPAZILAS.filter(u => u.districtId === district.id);
  const districtSpots = TOURIST_SPOTS.filter(s => s.districtId === district.id);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pb-20">
      {/* Header Banner */}
      <div className="relative h-64 sm:h-80 w-full overflow-hidden bg-slate-900">
        <img
          src={district.image}
          alt={district.nameEn}
          className="w-full h-full object-cover filter brightness-70"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />

        <div className="absolute bottom-0 inset-x-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-xs text-slate-300 mb-3 flex-wrap">
            <Link to="/" className="hover:text-emerald-400 transition-colors">
              {t('geo.bangladesh')}
            </Link>
            <ChevronRight className="w-3 h-3 text-slate-500" />
            <Link to={`/divisions/${division.id}`} className="hover:text-emerald-400 transition-colors">
              {language === 'bn' ? `${division.nameBn} বিভাগ` : `${division.nameEn} Division`}
            </Link>
            <ChevronRight className="w-3 h-3 text-slate-500" />
            <span className="text-emerald-400 font-semibold">
              {language === 'bn' ? `${district.nameBn} জেলা` : `${district.nameEn} District`}
            </span>
          </nav>

          <h1 className="text-3xl sm:text-5xl font-black text-white">
            {language === 'bn' ? `${district.nameBn} জেলা` : `${district.nameEn} District`}
          </h1>
          <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm text-slate-300 mt-2">
            <span className="text-emerald-400 font-semibold">
              {language === 'bn' ? `${division.nameBn} বিভাগের অন্তর্ভুক্ত` : `Under ${division.nameEn} Division`}
            </span>
            <span>·</span>
            <span>
              {language === 'bn'
                ? `সদর দপ্তর: ${district.headquartersBn}`
                : `Headquarters: ${district.headquartersEn}`}
            </span>
            <span>·</span>
            <span>{district.upazilaCount} {language === 'bn' ? 'টি উপজেলা' : 'Upazilas'}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 space-y-12">
        {/* District Overview & Fact Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8 bg-slate-900 border border-slate-800 p-6 sm:p-8 rounded-3xl space-y-6">
            <div>
              <h2 className="text-xl font-bold text-white mb-2">
                {language === 'bn' ? 'জেলা পরিচিতি ও বিবরণ' : 'About the District'}
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                {language === 'bn' ? district.descriptionBn : district.descriptionEn}
              </p>
            </div>

            {/* Specialties & Culture */}
            <div className="pt-4 border-t border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <UtensilsCrossed className="w-4 h-4" />
                <span>{language === 'bn' ? 'বিশেষ পরিচিতি ও বিখ্যাত উপাদান' : 'District Specialties'}</span>
              </h3>
              <div className="flex flex-wrap gap-2">
                {(language === 'bn' ? district.famousForBn : district.famousForEn).map((item, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 rounded-xl bg-slate-800 border border-slate-700 text-xs sm:text-sm font-medium text-slate-200"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 bg-slate-900 border border-slate-800 p-6 sm:p-8 rounded-3xl space-y-4">
            <h3 className="text-base font-bold text-white">
              {language === 'bn' ? 'ভৌগোলিক পরিসংখ্যান' : 'Geographic Statistics'}
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between py-2 border-b border-slate-800">
                <span className="text-slate-400">{t('geo.headquarters')}</span>
                <span className="font-semibold text-slate-200">
                  {language === 'bn' ? district.headquartersBn : district.headquartersEn}
                </span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-800">
                <span className="text-slate-400">{t('geo.area')}</span>
                <span className="font-semibold text-slate-200 tabular-nums">
                  {district.areaKm2.toLocaleString()} {language === 'bn' ? 'বর্গ কিমি' : 'km²'}
                </span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-800">
                <span className="text-slate-400">{t('geo.population')}</span>
                <span className="font-semibold text-emerald-400 tabular-nums">
                  {district.population}
                </span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-slate-400">{language === 'bn' ? 'উপজেলা সংখ্যা' : 'Upazilas Count'}</span>
                <span className="font-semibold text-slate-200 tabular-nums">{district.upazilaCount}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Upazilas of This District */}
        <div>
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white">
                {language === 'bn' ? 'উপজেলা ডিরেক্টরি' : 'Upazilas of this District'}
              </h2>
              <p className="text-slate-400 text-xs sm:text-sm mt-1">
                {language === 'bn'
                  ? `${district.nameBn} জেলায় মোট ${district.upazilaCount}টি উপজেলা রয়েছে।`
                  : `${district.nameEn} District comprises ${district.upazilaCount} administrative upazilas.`}
              </p>
            </div>
            <Link
              to="/upazilas"
              className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 transition-colors"
            >
              {language === 'bn' ? 'সকল উপজেলা দেখুন →' : 'All Upazilas Directory →'}
            </Link>
          </div>

          {districtUpazilas.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {districtUpazilas.map(u => (
                <div
                  key={u.id}
                  onClick={() => navigate(`/upazilas/${u.id}`)}
                  className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-emerald-500/50 cursor-pointer transition-all hover:-translate-y-0.5"
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-base font-bold text-white">
                      {language === 'bn' ? `${u.nameBn} উপজেলা` : `${u.nameEn} Upazila`}
                    </span>
                    <span className="text-xs text-slate-500">পোস্ট: {u.postCode}</span>
                  </div>
                  <p className="text-xs text-slate-400 line-clamp-2">{language === 'bn' ? u.descriptionBn : u.descriptionEn}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 text-xs text-slate-400">
              {language === 'bn'
                ? `এই জেলার উপজেলাসমূহের তালিকা শীঘ্রই বিস্তারিত তথ্যসহ ডিরেক্টরিতে হালনাগাদ করা হবে।`
                : `Upazila directory details for this district will be expanded in the registry.`}
            </div>
          )}
        </div>

        {/* Tourist Spots in this District */}
        {districtSpots.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">
              {language === 'bn' ? 'জেলার জনপ্রিয় দর্শনীয় স্থান' : 'Top Tourist Spots in this District'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {districtSpots.map(spot => (
                <div
                  key={spot.id}
                  onClick={() => navigate(`/tourism/${spot.id}`)}
                  className="group bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden cursor-pointer hover:border-emerald-500/50 transition-all hover:-translate-y-1"
                >
                  <div className="h-44 overflow-hidden relative">
                    <img
                      src={spot.image}
                      alt={spot.nameEn}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent" />
                  </div>
                  <div className="p-4">
                    <div className="text-xs text-emerald-400 font-medium mb-1">
                      {language === 'bn' ? spot.locationBn : spot.locationEn}
                    </div>
                    <h3 className="text-base font-bold text-white group-hover:text-emerald-300">
                      {language === 'bn' ? spot.nameBn : spot.nameEn}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
