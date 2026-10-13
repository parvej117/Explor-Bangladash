import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { UtensilsCrossed, ChevronRight, MapPin, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { HERO_IMAGE } from '../data/bangladeshData';

interface RegionalFood {
  id: string;
  nameBn: string;
  nameEn: string;
  districtBn: string;
  districtEn: string;
  typeBn: string;
  typeEn: string;
  descBn: string;
  descEn: string;
  tasteProfileBn: string;
  tasteProfileEn: string;
}

const FOODS: RegionalFood[] = [
  {
    id: 'kachchi',
    nameBn: 'পুরান ঢাকার কাচ্চি বিরিয়ানি',
    nameEn: 'Old Dhaka Kachchi Biryani',
    districtBn: 'ঢাকা',
    districtEn: 'Dhaka',
    typeBn: 'প্রধান খাবার / মেইন কোর্স',
    typeEn: 'Main Course / Royal Rice',
    descBn: 'খাসির নরম রসালো মাংস, জাফরানি সুগন্ধি বাসমতী বা চিনিগুঁড়া চাল এবং ঘিয়ে ভাজা আলুর অনন্য দম বিরিয়ানি।',
    descEn: 'Slow-cooked royal aromatic rice dum biryani with tender marinated mutton and saffron potatoes.',
    tasteProfileBn: 'সুগন্ধি, মসলাদার ও রাজকীয় ঘি-এর স্বাদ',
    tasteProfileEn: 'Rich, aromatic, mildly spiced with pure ghee aroma'
  },
  {
    id: 'hilsa',
    nameBn: 'পদ্মা-মেঘনার রূপালী ইলিশ',
    nameEn: 'Padma & Meghna River Hilsa',
    districtBn: 'চাঁদপুর ও বরিশাল',
    districtEn: 'Chandpur & Barishal',
    typeBn: 'জাতীয় মাছ ও ঐতিহ্য',
    typeEn: 'National Fish / Seafood Specialty',
    descBn: 'সরিষা ইলিশ, ভাপা ইলিশ, ইলিশ পাতুড়ি ও মুচমুচে লেজভাজা বাঙালির রসনার অনন্য চূড়া।',
    descEn: 'The pride of Bengal gastronomy: Shorshe Ilish (mustard gravy), smoked Paturi, and crispy fries.',
    tasteProfileBn: 'তৈলাক্ত, সুস্বাদু ও তীব্র খাঁটি নদীর ঘ্রাণ',
    tasteProfileEn: 'Richly oily, delicate, buttery river-fresh texture'
  },
  {
    id: 'bogura_doi',
    nameBn: 'বগুড়ার ঐতিহ্যবাহী লাল দই',
    nameEn: 'Bogura Traditional Sweet Curd (Doi)',
    districtBn: 'বগুড়া',
    districtEn: 'Bogura',
    typeBn: 'ঐতিহ্যবাহী মিষ্টান্ন',
    typeEn: 'Heritage Dessert',
    descBn: 'মাটির সরায় দীর্ঘক্ষণ জ্বাল দেওয়া ঘন দুধের লালচে মিষ্টি দই। এর জিআই স্বীকৃতি রয়েছে।',
    descEn: 'Legendary thick caramel-sweetened curd fermented in unglazed earthen clay pots with GI status.',
    tasteProfileBn: 'ঘন, কৃমির মতো মসৃণ ও অনন্য পোড়া মাটির মিষ্টি স্বাদ',
    tasteProfileEn: 'Creamy, thick, velvety with earthy sweetness'
  },
  {
    id: 'mezbani',
    nameBn: 'চট্টগ্রামের ঐতিহ্যবাহী মেজবানি মাংস',
    nameEn: 'Chattogram Authentic Mezbani Beef',
    districtBn: 'চট্টগ্রাম',
    districtEn: 'Chattogram',
    typeBn: 'ঐতিহ্যবাহী ভোজের খাবার',
    typeEn: 'Traditional Feast Dish',
    descBn: 'সরিষার তেল, সাদা তিল, মৌরি ও খাঁটি মেজবানি মসলায় রান্না করা ঘন মশলাযুক্ত গরুর মাংস।',
    descEn: 'Slow-simmered beef cooked with mustard oil, fenugreek, and secret 14-spice blends for grand feasts.',
    tasteProfileBn: 'তীব্র ঝাল ও ঝাঁজালো সুগন্ধযুক্ত',
    tasteProfileEn: 'Fiery, rich, pungent mustard-infused heat'
  },
  {
    id: 'chui_jhal',
    nameBn: 'খুলনার চুইঝাল মাংস',
    nameEn: 'Khulna Chui Jhal (Piper Chaba) Stew',
    districtBn: 'খুলনা ও সাতক্ষীরা',
    districtEn: 'Khulna & Satkhira',
    typeBn: 'আঞ্চলিক মসলাযুক্ত খাবার',
    typeEn: 'Regional Herbal Delicacy',
    descBn: 'চুই গাছের ডাটা বা মূল দিয়ে রান্না করা তীব্র সুগন্ধি ও স্বাস্থ্যকর খাসি বা গরুর মাংস।',
    descEn: 'Meat stew slow-simmered with aromatic wild Chui root stems providing an extraordinary warm flavor.',
    tasteProfileBn: 'অনন্য উষ্ণ ঝাল ও ঔষধি ঘ্রাণ',
    tasteProfileEn: 'Pungent herbal heat that warms without heartburn'
  },
  {
    id: 'porabari_chomchom',
    nameBn: 'টাঙ্গাইলের পোড়াবাড়ির চমচম',
    nameEn: 'Tangail Porabari Chomchom',
    districtBn: 'টাঙ্গাইল',
    districtEn: 'Tangail',
    typeBn: 'ঐতিহ্যবাহী মিষ্টির রাজা',
    typeEn: 'The King of Sweets',
    descBn: 'ধলেশ্বরীর মিষ্টি পানিতে তৈরি ছানার দীর্ঘ সময়ের জারণে প্রস্তুত পোড়াবাড়ির বিশ্বখ্যাত চমচম।',
    descEn: 'Centuries-old caramel sweet coated with dried mawa granules, celebrated across the subcontinent.',
    tasteProfileBn: 'উপরে মাওয়ার দানাদার আস্তরণ, ভেতরে নরম রসে টইটম্বুর',
    tasteProfileEn: 'Caramel crust encasing succulent juicy curd interior'
  }
];

export const FoodPage: React.FC = () => {
  const { language, t } = useLanguage();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center gap-2 text-xs text-slate-400 mb-6">
          <Link to="/" className="hover:text-emerald-400 transition-colors">
            {t('geo.bangladesh')}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
          <span className="text-emerald-400 font-medium">
            {language === 'bn' ? 'ঐতিহ্যবাহী খাবার' : 'Local Gastronomy'}
          </span>
        </nav>

        <div className="max-w-3xl mb-12">
          <div className="text-xs uppercase tracking-widest text-emerald-400 font-semibold mb-2">
            {language === 'bn' ? 'স্বাদের বাংলাদেশ' : 'Flavors of Bengal'}
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            {language === 'bn' ? 'ঐতিহ্যবাহী খাবার ও সুস্বাদু ব্যঞ্জন' : 'Iconic Traditional Foods & Delicacies'}
          </h1>
          <p className="mt-3 text-slate-300 text-sm sm:text-base leading-relaxed">
            {language === 'bn'
              ? 'পুরান ঢাকার কাচ্চি বিরিয়ানি থেকে শুরু করে পদ্মার রূপালী ইলিশ, বগুড়ার দই আর খুলনার চুইঝাল—আঞ্চলিক খাদ্য সংস্কৃতির অতুলনীয় সম্ভার।'
              : 'Explore the culinary diversity of Bangladesh, where each river and region contributes signature spices, sweets, and slow-cooked masterworks.'}
          </p>
        </div>

        {/* Food Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {FOODS.map(f => (
            <div
              key={f.id}
              className="bg-slate-900 rounded-3xl p-6 sm:p-7 border border-slate-800/80 hover:border-emerald-500/50 transition-all duration-200 hover:-translate-y-1 hover:shadow-xl flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3 text-xs">
                  <span className="text-emerald-400 font-semibold flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{language === 'bn' ? `${f.districtBn} জেলা` : `${f.districtEn} District`}</span>
                  </span>
                  <span className="text-slate-400 bg-slate-800/80 px-2 py-0.5 rounded">
                    {language === 'bn' ? f.typeBn : f.typeEn}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white mb-2.5">
                  {language === 'bn' ? f.nameBn : f.nameEn}
                </h3>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                  {language === 'bn' ? f.descBn : f.descEn}
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 text-xs">
                <span className="font-semibold text-emerald-400 block mb-0.5">
                  {language === 'bn' ? 'স্বাদের বিশেষত্ব:' : 'Taste Profile:'}
                </span>
                <span className="text-slate-300">
                  {language === 'bn' ? f.tasteProfileBn : f.tasteProfileEn}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
