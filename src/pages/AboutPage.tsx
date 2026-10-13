import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, ChevronRight, Award, Shield, Heart, Globe, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { SMRITI_SHOUDHO_IMAGE } from '../data/bangladeshData';

export const AboutPage: React.FC = () => {
  const { language, t } = useLanguage();

  const symbols = [
    { nameBn: 'জাতীয় ফুল: শাপলা (Water Lily)', nameEn: 'National Flower: Water Lily (Shapla)', descBn: 'পবিত্রতা ও সরলতার প্রতীক', descEn: 'Symbol of purity, serenity, and wetlands' },
    { nameBn: 'জাতীয় পশু: রয়েল বেঙ্গল টাইগার', nameEn: 'National Animal: Royal Bengal Tiger', descBn: 'বীরত্ব ও সুন্দরবনের অহংকার', descEn: 'Majestic monarch of the Sundarbans mangroves' },
    { nameBn: 'জাতীয় মাছ: রূপালী ইলিশ', nameEn: 'National Fish: Hilsa (Ilish)', descBn: 'বাঙালির রসনার শ্রেষ্ঠ উপহার', descEn: 'Culinary treasure from the Padma and Meghna delta' },
    { nameBn: 'জাতীয় পাখি: দোয়েল (Magpie Robin)', nameEn: 'National Bird: Oriental Magpie-Robin (Doel)', descBn: 'গ্রামবাংলার মিষ্টি সুরের গায়ক', descEn: 'Familiar melodic songbird found across Bengal' },
    { nameBn: 'জাতীয় ফল: কাঁঠাল (Jackfruit)', nameEn: 'National Fruit: Jackfruit (Kathal)', descBn: 'পুষ্টিগুণে ভরপুর চিরসবুজ ফল', descEn: 'Nutritious staple fruit native to Bangladesh soil' },
    { nameBn: 'জাতীয় বৃক্ষ: আম গাছ (Mango Tree)', nameEn: 'National Tree: Mango Tree', descBn: 'ফল ও ছায়ার শ্যামল প্রতীক', descEn: 'Designated as the national tree in 2010' }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10 sm:py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center gap-2 text-xs text-slate-400 mb-6">
          <Link to="/" className="hover:text-emerald-400 transition-colors">
            {t('geo.bangladesh')}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
          <span className="text-emerald-400 font-medium">
            {t('nav.about')}
          </span>
        </nav>

        {/* Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold mb-3">
            <Compass className="w-3.5 h-3.5 text-emerald-400" />
            <span>Explore Bangladesh Initiative</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            {language === 'bn' ? 'আমাদের লক্ষ্য ও পরিচিতি' : 'About Explore Bangladesh'}
          </h1>
          <p className="mt-4 text-slate-300 text-base leading-relaxed max-w-3xl">
            {language === 'bn'
              ? 'Explore Bangladesh হলো একটি আধুনিক, পূর্ণাঙ্গ ও উন্মুক্ত ডিজিটাল পর্যটন প্ল্যাটফর্ম—যার মূল লক্ষ্য বিশ্বের কাছে সবুজ ও ঐতিহাসিক বাংলাদেশের প্রকৃত রূপ ও সংস্কৃতি তুলে ধরা।'
              : 'Explore Bangladesh is a dedicated open digital platform documenting the 8 divisions, 64 districts, grassroots upazilas, natural wonders, and millennia of heritage.'}
          </p>
        </div>

        {/* Vision & Mission */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-3">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-emerald-400" />
              <span>{language === 'bn' ? 'আমাদের দর্শন' : 'Our Vision'}</span>
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              {language === 'bn'
                ? 'বাংলাদেশের প্রতিটি প্রত্যন্ত কোণ—পাহাড়, হাওর, নদী ও প্রত্নতাত্ত্বিক নিদর্শনের নির্ভুল ও সমৃদ্ধ তথ্য ভ্রমণপিপাসু ও শিক্ষার্থীদের কাছে সহজে পৌঁছে দেওয়া।'
                : 'To connect global travelers, researchers, and citizens with authentic geographic, historical, and cultural knowledge of Bangladesh.'}
            </p>
          </div>

          <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-3">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Shield className="w-5 h-5 text-emerald-400" />
              <span>{language === 'bn' ? 'দায়িত্বশীল পর্যটন' : 'Responsible Tourism'}</span>
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              {language === 'bn'
                ? 'পরিবেশ সংরক্ষণ, স্থানীয় জনগোষ্ঠীর সংস্কৃতি ও জীববৈচিত্র্য রক্ষার সাথে সামঞ্জস্য রেখে ইকো-ট্যুরিজম ও টেকসই ভ্রমণকে উৎসাহিত করা।'
                : 'Advocating sustainable eco-tourism, respecting local ethnic communities, and protecting fragile ecosystems like the Sundarbans and hill tracts.'}
            </p>
          </div>
        </div>

        {/* National Symbols of Bangladesh */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-10 mb-12">
          <h2 className="text-2xl font-bold text-white mb-2">
            {language === 'bn' ? 'বাংলাদেশের জাতীয় প্রতীকসমূহ' : 'National Symbols of Bangladesh'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mb-6">
            {language === 'bn'
              ? 'আমাদের প্রকৃতি, সংস্কৃতি ও ঐতিহ্যের প্রতিনিধিত্বকারী রাষ্ট্রীয় প্রতীক।'
              : 'Enduring emblems representing the soul, landscape, and identity of Bangladesh.'}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {symbols.map((sym, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800">
                <div className="text-sm font-bold text-emerald-400">
                  {language === 'bn' ? sym.nameBn : sym.nameEn}
                </div>
                <div className="text-xs text-slate-400 mt-1">
                  {language === 'bn' ? sym.descBn : sym.descEn}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
