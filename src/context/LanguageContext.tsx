import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Language } from '../types';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const translations: Record<string, { bn: string; en: string }> = {
  // Navigation
  'nav.home': { bn: 'হোম', en: 'Home' },
  'nav.tourism': { bn: 'পর্যটন', en: 'Tourism' },
  'nav.divisions': { bn: 'বিভাগ', en: 'Divisions' },
  'nav.districts': { bn: 'জেলা', en: 'Districts' },
  'nav.upazilas': { bn: 'উপজেলা', en: 'Upazilas' },
  'nav.historical': { bn: 'ঐতিহাসিক স্থাপনা', en: 'Historical Places' },
  'nav.culture': { bn: 'সংস্কৃতি', en: 'Culture' },
  'nav.community': { bn: 'কমিউনিটি ও ভ্রমণ অভিজ্ঞতা', en: 'Community Stories' },
  'nav.food': { bn: 'খাবার', en: 'Local Food' },
  'nav.personalities': { bn: 'মনীষী', en: 'Personalities' },
  'nav.blog': { bn: 'নিবন্ধ ও ব্লগ', en: 'Articles & Blog' },
  'nav.about': { bn: 'আমাদের সম্পর্কে', en: 'About Us' },
  'nav.contact': { bn: 'যোগাযোগ', en: 'Contact' },
  'nav.login': { bn: 'লগইন', en: 'Sign In' },
  'nav.tagline': { bn: 'আপনার সম্পূর্ণ বাংলাদেশ গাইড', en: 'Your Complete Bangladesh Guide' },

  // Hero
  'hero.tagline': { bn: 'এক দেশ, হাজার গল্প', en: 'One Land, A Thousand Stories' },
  'hero.title': { bn: 'Explore Bangladesh', en: 'Explore Bangladesh' },
  'hero.subtitle': {
    bn: 'বাংলাদেশের প্রতিটি বিভাগ, জেলা, উপজেলা, ইতিহাস, সংস্কৃতি ও পর্যটন স্থান আবিষ্কার করুন।',
    en: "Discover Bangladesh's divisions, districts, upazilas, timeless history, culture, and travel destinations."
  },
  'hero.searchPlaceholder': {
    bn: 'কী খুঁজতে চান? (যেমন: কক্সবাজার, সুন্দরবন, ঢাকা...)',
    en: "What are you looking for? (e.g. Cox's Bazar, Sundarbans, Dhaka...)"
  },
  'hero.searchBtn': { bn: 'খুঁজুন', en: 'Search' },

  // Stats
  'stats.divisions': { bn: '৮ বিভাগ', en: '8 Divisions' },
  'stats.districts': { bn: '৬৪ জেলা', en: '64 Districts' },
  'stats.upazilas': { bn: '৪৯৫+ উপজেলা', en: '495+ Upazilas' },
  'stats.places': { bn: 'হাজারো স্থান ও ঐতিহ্য', en: 'Thousands of Heritage Sites' },

  // Sections
  'sec.categoriesTitle': { bn: 'জনপ্রিয় বিষয়শ্রেণী', en: 'Popular Categories' },
  'sec.categoriesSubtitle': {
    bn: 'বাংলাদেশের পর্যটন, ইতিহাস, ঐতিহ্য, সংস্কৃতি এবং জীবনযাত্রার গুরুত্বপূর্ণ ক্ষেত্রসমূহ',
    en: 'Key domains of tourism, historic landmarks, culture, and lifestyle across Bangladesh'
  },
  'sec.articlesTitle': { bn: 'সাম্প্রতিক নিবন্ধ', en: 'Latest Articles' },
  'sec.articlesSubtitle': {
    bn: 'বাংলাদেশের অপরূপ স্থান ও ঐতিহ্য নিয়ে প্রকাশিত বিশেষ তথ্যবহুল প্রবন্ধ',
    en: 'Featured in-depth essays highlighting the wonder, heritage, and stories of Bangladesh'
  },
  'sec.destinationsTitle': { bn: 'শীর্ষ দর্শনীয় স্থান', en: 'Top Tourist Destinations' },
  'sec.destinationsSubtitle': {
    bn: 'ভ্রমণপিপাসুদের পছন্দের তালিকায় শীর্ষে থাকা মনোমুগ্ধকর স্থানসমূহ',
    en: 'Must-visit breathtaking spots loved by travelers around the world'
  },
  'sec.divisionsTitle': { bn: '৮টি প্রশাসনিক বিভাগ', en: '8 Administrative Divisions' },
  'sec.divisionsSubtitle': {
    bn: 'বিভাগভিত্তিক জেলা, ভৌগোলিক তথ্য এবং ভ্রমণ গাইড',
    en: 'Division-wise districts, geographical context, and regional travel guides'
  },

  // Actions & Buttons
  'action.readMore': { bn: 'বিস্তারিত পড়ুন', en: 'Read Details' },
  'action.viewAll': { bn: 'সব দেখুন', en: 'View All' },
  'action.explore': { bn: 'অন্বেষণ করুন', en: 'Explore' },
  'action.exploreDivision': { bn: 'বিভাগ দেখুন', en: 'Explore Division' },
  'action.exploreDistrict': { bn: 'জেলা দেখুন', en: 'Explore District' },
  'action.searchPlaces': { bn: 'অনুসন্ধান করুন', en: 'Search Places' },
  'action.close': { bn: 'বন্ধ করুন', en: 'Close' },
  'action.back': { bn: 'ফিরে যান', en: 'Go Back' },
  'action.share': { bn: 'শেয়ার করুন', en: 'Share' },
  'action.subscribe': { bn: 'সাবস্ক্রাইব', en: 'Subscribe' },

  // Geographic breadcrumb
  'geo.bangladesh': { bn: 'বাংলাদেশ', en: 'Bangladesh' },
  'geo.division': { bn: 'বিভাগ', en: 'Division' },
  'geo.district': { bn: 'জেলা', en: 'District' },
  'geo.upazila': { bn: 'উপজেলা', en: 'Upazila' },
  'geo.allDistricts': { bn: 'সকল জেলা', en: 'All Districts' },
  'geo.headquarters': { bn: 'সদর দপ্তর', en: 'Headquarters' },
  'geo.area': { bn: 'আয়তন', en: 'Area' },
  'geo.population': { bn: 'জনসংখ্যা', en: 'Population' },
  'geo.popularSpots': { bn: 'জনপ্রিয় স্থানসমূহ', en: 'Popular Spots' },
  'geo.famousFor': { bn: 'যার জন্য বিখ্যাত', en: 'Famous For' },

  // Footer
  'footer.desc': {
    bn: 'Explore Bangladesh হলো একটি পূর্ণাঙ্গ ডিজিটাল গাইড, যা রূপসী বাংলাদেশের ৬৪ জেলা, ৮ বিভাগ, প্রকৃতি, ইতিহাস ও সংস্কৃতিকে বিশ্বমঞ্চে তুলে ধরে।',
    en: 'Explore Bangladesh is a premier digital guide showcasing the 64 districts, 8 divisions, nature, history, and vibrant culture of Bangladesh.'
  },
  'footer.quickLinks': { bn: 'দ্রুত লিংক', en: 'Quick Links' },
  'footer.divisions': { bn: 'বিভাগসমূহ', en: 'Divisions' },
  'footer.newsletterTitle': { bn: 'নিউজলেটার', en: 'Newsletter' },
  'footer.newsletterDesc': {
    bn: 'বাংলাদেশের নতুন ভ্রমণ স্থান ও সংস্কৃতির আপডেট পেতে আপনার ইমেইল দিন।',
    en: 'Subscribe with your email to receive weekly updates on travel spots and cultural heritage.'
  },
  'footer.newsletterPlaceholder': { bn: 'আপনার ইমেইল লিখুন', en: 'Enter your email address' },
  'footer.copyright': {
    bn: '© ২০২৬ Explore Bangladesh. সর্বস্বত্ব সংরক্ষিত। একটি তথ্যবহুল উন্মুক্ত ডিজিটাল উদ্যোগ।',
    en: '© 2026 Explore Bangladesh. All rights reserved. A public educational initiative.'
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('explore_bd_lang');
    return (saved === 'en' || saved === 'bn') ? saved : 'bn';
  });

  useEffect(() => {
    localStorage.setItem('explore_bd_lang', language);
    document.documentElement.lang = language;
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const toggleLanguage = () => {
    setLanguageState(prev => (prev === 'bn' ? 'en' : 'bn'));
  };

  const t = (key: string): string => {
    if (translations[key]) {
      return translations[key][language];
    }
    return key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
