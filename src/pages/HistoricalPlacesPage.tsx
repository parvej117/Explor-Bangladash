import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Landmark, ChevronRight, Calendar, MapPin, ArrowRight, BookOpen } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { MAHASTHANGARH_IMAGE, SMRITI_SHOUDHO_IMAGE, HERO_IMAGE } from '../data/bangladeshData';

interface HistoricalSite {
  id: string;
  nameBn: string;
  nameEn: string;
  locationBn: string;
  locationEn: string;
  eraBn: string;
  eraEn: string;
  period: 'ancient' | 'sultanate' | 'zamindari' | 'modern';
  image: string;
  descBn: string;
  descEn: string;
  unesco?: boolean;
}

const HISTORICAL_SITES: HistoricalSite[] = [
  {
    id: 'mahasthangarh',
    nameBn: 'মহাস্থানগড় (পুণ্ড্রনগর)',
    nameEn: 'Mahasthangarh (Pundranagara)',
    locationBn: 'বগুড়া',
    locationEn: 'Bogura',
    eraBn: 'খ্রিস্টপূর্ব ৩য় শতক (মৌর্য ও গুপ্ত যুগ)',
    eraEn: '3rd Century BCE (Maurya & Gupta Eras)',
    period: 'ancient',
    image: MAHASTHANGARH_IMAGE,
    descBn: 'বাংলাদেশের প্রাচীনতম আবিষ্কৃত দুর্গনগরী। করতোয়া নদীর তীরে পুণ্ড্রবর্ধনের সমৃদ্ধ রাজধানী।',
    descEn: 'The earliest fortified archaeological citadel discovered in Bangladesh along the Karatoya River.'
  },
  {
    id: 'sixty_dome_mosque',
    nameBn: 'ষাট গম্বুজ মসজিদ',
    nameEn: 'Sixty Dome Mosque (Shat Gombuj Masjid)',
    locationBn: 'বাগেরহাট',
    locationEn: 'Bagerhat',
    eraBn: '১৫শ শতক (সুলতানি আমল - হযরত খান জাহান আলী)',
    eraEn: '15th Century (Sultanate Era - Saint Khan Jahan Ali)',
    period: 'sultanate',
    image: HERO_IMAGE,
    descBn: 'ইউনেস্কো বিশ্ব ঐতিহ্যবাহী স্থান। ৭৭টি নিপুণ গম্বুজ বিশিষ্ট মধ্যযুগীয় বাংলার সর্ববৃহৎ ঐতিহাসিক মসজিদ।',
    descEn: 'UNESCO World Heritage Site; the largest historic brick mosque in medieval Bengal with 77 domes.',
    unesco: true
  },
  {
    id: 'paharpur',
    nameBn: 'পাহাড়পুর সোমপুর বৌদ্ধবিহার',
    nameEn: 'Somapura Mahavihara',
    locationBn: 'নওগাঁ',
    locationEn: 'Naogaon',
    eraBn: '৮ম শতক (পাল রাজবংশ - ধর্মপাল)',
    eraEn: '8th Century CE (Pala Dynasty - King Dharmapala)',
    period: 'ancient',
    image: MAHASTHANGARH_IMAGE,
    descBn: 'ইউনেস্কো বিশ্ব ঐতিহ্য। প্রাচীন বিশ্বের অন্যতম শ্রেষ্ঠ মহাবিহার ও জ্ঞানের পাদপীঠ।',
    descEn: 'UNESCO World Heritage Site; one of the largest and most prestigious Buddhist monastic universities.',
    unesco: true
  },
  {
    id: 'lalbagh_fort',
    nameBn: 'লালবাগ কেল্লা (কেল্লা আওরঙ্গবাদ)',
    nameEn: 'Lalbagh Fort (Fort Aurangabad)',
    locationBn: 'পুরান ঢাকা',
    locationEn: 'Old Dhaka',
    eraBn: '১৬৭৮ খ্রিষ্টাব্দ (মুঘল সুবাদার মুহাম্মদ আজম শাহ)',
    eraEn: '1678 CE (Mughal Prince Muhammad Azam)',
    period: 'sultanate',
    image: HERO_IMAGE,
    descBn: 'বুড়িগঙ্গার তীরে অসমাপ্ত মুঘল দুর্গ। পরীবিবির সমাধি, দরবার হল ও হাম্মামখানার অপূর্ব নিদর্শন।',
    descEn: 'Iconic 17th-century Mughal fort complex featuring the Tomb of Pari Bibi and the historic Hammam.'
  },
  {
    id: 'panam_nagar',
    nameBn: 'পানাম নগর (হারানো শহর)',
    nameEn: 'Panam City (The Lost City)',
    locationBn: 'সোনারগাঁও, নারায়ণগঞ্জ',
    locationEn: 'Sonargaon, Narayanganj',
    eraBn: '১৯শ শতক (ঔপনিবেশিক ও সুবর্ণ যুগ)',
    eraEn: '19th Century (Colonial Merchant Era)',
    period: 'zamindari',
    image: MAHASTHANGARH_IMAGE,
    descBn: 'ইউরোপীয় ও মুঘল স্থাপত্যের মিশেলে গড়ে ওঠা প্রাচীন ধনী মসলিন বণিকদের এক কিলোমিটার বিস্তৃত সুরক্ষিত নগর।',
    descEn: 'A preserved ghost city showcasing 52 ornate heritage merchant mansions along a single historic street.'
  },
  {
    id: 'jatiya_smriti_soudho',
    nameBn: 'জাতীয় স্মৃতিসৌধ',
    nameEn: "National Martyrs' Memorial",
    locationBn: 'সাভার, ঢাকা',
    locationEn: 'Savar, Dhaka',
    eraBn: '১৯৭২ – ১৯৮২ খ্রিষ্টাব্দ (মহান মুক্তিযুদ্ধ স্মারক)',
    eraEn: '1972 - 1982 CE (1971 Liberation War Tribute)',
    period: 'modern',
    image: SMRITI_SHOUDHO_IMAGE,
    descBn: '১৯৭১ সালের স্বাধীনতা যুদ্ধের লাখো শহীদের অমর স্মরণে নির্মিত সাত জোড়া ত্রিভুজাকৃতির অনন্য স্থাপত্য।',
    descEn: 'A soaring 150-ft concrete masterpiece designed with seven wall tiers honoring Bangladesh’s freedom.'
  }
];

export const HistoricalPlacesPage: React.FC = () => {
  const { language, t } = useLanguage();
  const navigate = useNavigate();
  const [filterPeriod, setFilterPeriod] = useState<string>('all');

  const filtered = HISTORICAL_SITES.filter(s => filterPeriod === 'all' || s.period === filterPeriod);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center gap-2 text-xs text-slate-400 mb-6">
          <Link to="/" className="hover:text-emerald-400 transition-colors">
            {t('geo.bangladesh')}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
          <span className="text-emerald-400 font-medium">
            {language === 'bn' ? 'ঐতিহাসিক স্থাপনা ও প্রত্নতত্ত্ব' : 'Historical Landmarks'}
          </span>
        </nav>

        <div className="max-w-3xl mb-10">
          <div className="text-xs uppercase tracking-widest text-emerald-400 font-semibold mb-2">
            {language === 'bn' ? 'হাজার বছরের ইতিহাস' : 'Millennia of Heritage'}
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            {language === 'bn' ? 'ঐতিহাসিক স্থাপনা ও প্রত্নতত্ত্ব' : 'Historical Landmarks & Monuments'}
          </h1>
          <p className="mt-3 text-slate-300 text-sm sm:text-base leading-relaxed">
            {language === 'bn'
              ? 'মৌর্য, গুপ্ত, পাল, সুলতানি ও মুঘল আমল থেকে শুরু করে মহান মুক্তিযুদ্ধের অমর স্মারকসমূহের সমৃদ্ধ স্থাপত্য নিদর্শন।'
              : 'Chronicle of two thousand years of architectural brilliance from ancient Buddhist monasteries to Mughal fortifications and national memorials.'}
          </p>
        </div>

        {/* Filter Period */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-8 scrollbar-none">
          {[
            { id: 'all', labelBn: 'সকল যুগ', labelEn: 'All Eras' },
            { id: 'ancient', labelBn: 'প্রাচীন ও বৌদ্ধ যুগ', labelEn: 'Ancient & Buddhist Era' },
            { id: 'sultanate', labelBn: 'সুলতানি ও মুঘল যুগ', labelEn: 'Sultanate & Mughal Era' },
            { id: 'zamindari', labelBn: 'জমিদারি ও ঔপনিবেশিক', labelEn: 'Zamindari & Colonial Era' },
            { id: 'modern', labelBn: 'মুক্তিযুদ্ধ ও আধুনিক স্মৃতিসৌধ', labelEn: 'Liberation War & Modern' }
          ].map(p => (
            <button
              key={p.id}
              onClick={() => setFilterPeriod(p.id)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                filterPeriod === p.id
                  ? 'bg-emerald-500 text-slate-950 font-bold'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {language === 'bn' ? p.labelBn : p.labelEn}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filtered.map(site => (
            <div
              key={site.id}
              className="bg-slate-900 rounded-2xl overflow-hidden border border-slate-800/80 hover:border-emerald-500/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl flex flex-col justify-between group"
            >
              <div>
                <div className="relative h-52 w-full overflow-hidden bg-slate-800">
                  <img
                    src={site.image}
                    alt={site.nameEn}
                    className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
                  {site.unesco && (
                    <div className="absolute top-3 left-3 bg-blue-600/90 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded">
                      UNESCO Heritage
                    </div>
                  )}
                </div>

                <div className="p-5">
                  <div className="flex items-center gap-2 text-xs text-slate-400 mb-1.5">
                    <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>{language === 'bn' ? site.locationBn : site.locationEn}</span>
                    <span>·</span>
                    <span className="text-emerald-400 font-medium">
                      {language === 'bn' ? site.eraBn : site.eraEn}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white group-hover:text-emerald-300 transition-colors">
                    {language === 'bn' ? site.nameBn : site.nameEn}
                  </h3>

                  <p className="mt-2 text-xs text-slate-400 leading-relaxed line-clamp-3">
                    {language === 'bn' ? site.descBn : site.descEn}
                  </p>
                </div>
              </div>

              <div className="px-5 pb-5 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-emerald-400 font-semibold">
                <span>{language === 'bn' ? 'বিস্তারিত গাইড' : 'Explore History'}</span>
                <span>→</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
