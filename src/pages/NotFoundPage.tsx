import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, Home, Search, ArrowLeft } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useModal } from '../context/ModalContext';

export const NotFoundPage: React.FC = () => {
  const { language } = useLanguage();
  const { openSearch } = useModal();

  return (
    <div className="min-h-[70vh] bg-slate-950 text-slate-100 flex items-center justify-center py-20 px-4">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="w-20 h-20 rounded-3xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto">
          <Compass className="w-10 h-10 animate-spin-slow" />
        </div>

        <div>
          <span className="text-5xl sm:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-200 tabular-nums">
            ৪০৪
          </span>
          <h1 className="text-2xl font-bold text-white mt-2">
            {language === 'bn' ? 'পৃষ্ঠাটি খুঁজে পাওয়া যায়নি' : 'Page Not Found'}
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm mt-2 leading-relaxed">
            {language === 'bn'
              ? 'আপনি যে পৃষ্ঠাটি খুঁজছেন তা স্থানান্তরিত হয়েছে অথবা মুছে ফেলা হয়েছে।'
              : 'The destination or resource you are looking for may have been moved or does not exist.'}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link
            to="/"
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-2"
          >
            <Home className="w-4 h-4" />
            <span>{language === 'bn' ? 'হোমে ফিরে যান' : 'Back to Home'}</span>
          </Link>
          <button
            onClick={openSearch}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-200 border border-slate-700 font-semibold text-xs transition-colors flex items-center justify-center gap-2"
          >
            <Search className="w-4 h-4 text-emerald-400" />
            <span>{language === 'bn' ? 'অনুসন্ধান করুন' : 'Search Guide'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
