import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Sparkles, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { Interactive3DCard } from './3d/Interactive3DCard';
import {
  SMRITI_SHOUDHO_IMAGE,
  HERO_IMAGE,
  MAHASTHANGARH_IMAGE,
  SYLHET_TEA_IMAGE,
} from '../data/bangladeshData';

export const Showcase3DSection: React.FC = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();

  const showcaseItems = [
    {
      id: 'smriti',
      modelType: 'memorial' as const,
      title: language === 'bn' ? 'জাতীয় স্মৃতিসৌধ' : "National Martyrs' Memorial",
      subtitle:
        language === 'bn'
          ? 'সাভারে অবস্থিত স্বাধীনতা সংগ্রামের অমর প্রতীক, ৭ জোড়া ত্রিভুজাকার প্রিজম দেয়াল।'
          : 'Iconic 150-ft soaring memorial in Savar honoring 1971 Liberation War martyrs.',
      imageUrl: SMRITI_SHOUDHO_IMAGE,
      link: '/tourism/smriti_soudho',
    },
    {
      id: 'boat',
      modelType: 'boat' as const,
      title: language === 'bn' ? 'ঐতিহ্যবাহী পালতোলা নৌকা' : 'Traditional Country Boat',
      subtitle:
        language === 'bn'
          ? 'পদ্মা, মেঘনা ও যমুনার বুকে চিরচেনা বাঁশের ছই ও কাপড়ের পালের রূপসী প্রতীক।'
          : 'The timeless symbol of riverine Bengal sailing gracefully across our waters.',
      imageUrl: HERO_IMAGE,
      link: '/tourism',
    },
    {
      id: 'citadel',
      modelType: 'citadel' as const,
      title: language === 'bn' ? 'মহাস্থানগড় প্রাচীন দুর্গনগরী' : 'Mahasthangarh Ancient Citadel',
      subtitle:
        language === 'bn'
          ? 'খ্রিস্টপূর্ব ৩য় শতকের পুণ্ড্রনগরের প্রাচীন পোড়ামাটির রামপার্ট ও স্তূপ।'
          : '3rd-century BCE fortified citadel and terracotta archaeological ramparts.',
      imageUrl: MAHASTHANGARH_IMAGE,
      link: '/tourism/mahasthangarh_ruins',
    },
    {
      id: 'tea',
      modelType: 'tea' as const,
      title: language === 'bn' ? 'শ্রীমঙ্গল চা বাগান টিলা' : 'Sreemangal Tea Terraces',
      subtitle:
        language === 'bn'
          ? 'সিলেটের সবুজ ঢেউ খেলানো চিরহরিৎ চা বাগান ও ছায়া বৃক্ষের মনোরম দৃশ্য।'
          : 'Rolling emerald green hills and rainforest trails in the tea capital.',
      imageUrl: SYLHET_TEA_IMAGE,
      link: '/tourism/sreemangal_gardens',
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-slate-950 border-t border-slate-900 text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold mb-3">
              <Box className="w-3.5 h-3.5 text-emerald-400" />
              <span>{language === 'bn' ? 'ইন্টারেক্টিভ ৩ডি গ্যালারি' : '3D Interactive Gallery'}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              {language === 'bn' ? '৩ডি স্পেশাল ল্যান্ডমার্কস' : 'Explore Bangladesh in 3D'}
            </h2>
            <p className="mt-2 text-slate-400 text-sm sm:text-base max-w-xl">
              {language === 'bn'
                ? 'কার্ডের "৩ডি দেখুন" বাটনে ক্লিক করে ঐতিহ্যবাহী স্থাপত্য ও প্রকৃতির ৩ডি মডেল ৩৬০ ডিগ্রিতে ঘোরান ও আবিষ্কার করুন।'
                : 'Click "3D View" on any card to rotate and inspect genuine 3D models of national heritage in real time.'}
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-medium text-emerald-400 bg-emerald-950/60 border border-emerald-800/40 px-3 py-1.5 rounded-xl self-start md:self-end">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{language === 'bn' ? 'মাউস বা স্পর্শ দিয়ে ৩৬০° ঘোরানো যায়' : 'Drag or swipe to rotate 360°'}</span>
          </div>
        </div>

        {/* 4 Interactive 3D Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {showcaseItems.map(item => (
            <Interactive3DCard
              key={item.id}
              modelType={item.modelType}
              title={item.title}
              subtitle={item.subtitle}
              imageUrl={item.imageUrl}
              onClickDetails={() => navigate(item.link)}
              language={language}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
