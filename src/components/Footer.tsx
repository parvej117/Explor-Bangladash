import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Compass,
  Mail,
  Send,
  CheckCircle2,
  Phone,
  MapPin,
  Facebook,
  Instagram,
  Github,
  Linkedin,
  Code2,
  ExternalLink
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { DIVISIONS } from '../data/bangladeshData';

// Developer Profile Configuration
const DEVELOPER_NAME = 'Masum Parvej';
const DEVELOPER_EMAIL = 'masumparvej117@gmail.com';
const DEVELOPER_PORTFOLIO_URL = 'https://github.com/parvej117';

export interface SocialProfile {
  id: string;
  name: string;
  url: string;
  ariaLabel: string;
  icon: React.ComponentType<{ className?: string }>;
}

// Organized Social Media Configuration
export const SOCIAL_PROFILES: SocialProfile[] = [
  {
    id: 'facebook',
    name: 'Facebook',
    url: 'https://www.facebook.com/share/1C9LxpMSGn/',
    ariaLabel: 'Facebook profile of Masum Parvej',
    icon: Facebook,
  },
  {
    id: 'github',
    name: 'GitHub',
    url: 'https://github.com/parvej117',
    ariaLabel: 'GitHub profile of Masum Parvej',
    icon: Github,
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/md-masum-parvej-7091343b4',
    ariaLabel: 'LinkedIn profile of Masum Parvej',
    icon: Linkedin,
  },
  {
    id: 'instagram',
    name: 'Instagram',
    url: 'https://www.instagram.com/ma.sum_parvej?obrf=MThzdHI3d24weHJuaw==',
    ariaLabel: 'Instagram profile of Masum Parvej',
    icon: Instagram,
  },
];

const isValidHttpUrl = (url?: string | null): boolean => {
  if (!url || typeof url !== 'string') return false;
  try {
    const parsed = new URL(url);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch {
    return false;
  }
};

export const Footer: React.FC = () => {
  const { language, t } = useLanguage();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const hasValidPortfolio = isValidHttpUrl(DEVELOPER_PORTFOLIO_URL);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() && email.includes('@')) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800/80 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 mb-12">
          {/* Col 1: Brand & Description & Socials + Email */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-3 group inline-block">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center text-white shadow-md shadow-emerald-950/50">
                <Compass className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xl font-bold tracking-tight text-white">
                  Explore <span className="text-emerald-400">Bangladesh</span>
                </div>
                <div className="text-xs text-slate-400">{t('nav.tagline')}</div>
              </div>
            </Link>

            <p className="text-sm text-slate-400 leading-relaxed pr-4">
              {t('footer.desc')}
            </p>

            {/* Social Media Links & Direct Email Contact */}
            <div className="pt-2 space-y-3">
              {/* 4 Rounded-Square Buttons with Emerald Glow */}
              <div className="flex flex-wrap items-center gap-3">
                {SOCIAL_PROFILES.map((profile) => {
                  const IconComponent = profile.icon;
                  return (
                    <a
                      key={profile.id}
                      href={profile.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={profile.ariaLabel}
                      title={profile.name}
                      className="w-10 h-10 rounded-xl bg-slate-900/90 hover:bg-emerald-600 text-slate-300 hover:text-white border border-slate-800 hover:border-emerald-400/80 flex items-center justify-center transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-emerald-500/25 hover:-translate-y-0.5 active:scale-95 group cursor-pointer"
                    >
                      <IconComponent className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
                    </a>
                  );
                })}
              </div>

              {/* Clickable Developer Contact Email */}
              <div className="pt-1">
                <a
                  href={`mailto:${DEVELOPER_EMAIL}`}
                  aria-label={`Email ${DEVELOPER_NAME}`}
                  title={`Email ${DEVELOPER_NAME}`}
                  className="inline-flex items-center gap-2 text-xs text-slate-400 hover:text-emerald-400 transition-colors group cursor-pointer outline-none focus:outline-none"
                >
                  <Mail className="w-4 h-4 text-emerald-400 shrink-0 group-hover:scale-110 transition-transform" />
                  <span className="font-mono text-slate-300 group-hover:text-emerald-400 transition-colors">
                    {DEVELOPER_EMAIL}
                  </span>
                </a>
              </div>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              {t('footer.quickLinks')}
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/" className="text-slate-400 hover:text-emerald-400 transition-colors">
                  {t('nav.home')}
                </Link>
              </li>
              <li>
                <Link to="/tourism" className="text-slate-400 hover:text-emerald-400 transition-colors">
                  {t('nav.tourism')}
                </Link>
              </li>
              <li>
                <Link to="/historical-places" className="text-slate-400 hover:text-emerald-400 transition-colors">
                  {t('nav.historical')}
                </Link>
              </li>
              <li>
                <Link to="/culture" className="text-slate-400 hover:text-emerald-400 transition-colors">
                  {t('nav.culture')}
                </Link>
              </li>
              <li>
                <Link to="/food" className="text-slate-400 hover:text-emerald-400 transition-colors">
                  {t('nav.food')}
                </Link>
              </li>
              <li>
                <Link to="/personalities" className="text-slate-400 hover:text-emerald-400 transition-colors">
                  {t('nav.personalities')}
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-slate-400 hover:text-emerald-400 transition-colors">
                  {t('nav.blog')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Divisions */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              {t('footer.divisions')}
            </h4>
            <ul className="space-y-2.5 text-sm">
              {DIVISIONS.map(d => (
                <li key={d.id}>
                  <Link
                    to={`/divisions/${d.id}`}
                    className="text-slate-400 hover:text-emerald-400 transition-colors"
                  >
                    {language === 'bn' ? `${d.nameBn} বিভাগ` : `${d.nameEn} Division`}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Newsletter & Contact */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              {t('footer.newsletterTitle')}
            </h4>
            <p className="text-xs text-slate-400 mb-4 leading-relaxed">
              {t('footer.newsletterDesc')}
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder={t('footer.newsletterPlaceholder')}
                  className="w-full pl-3 pr-9 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-emerald-500"
                />
                <button
                  type="submit"
                  aria-label="Subscribe to newsletter"
                  className="absolute right-1.5 top-1.5 p-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg transition-colors cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
              {subscribed && (
                <div className="flex items-center gap-1.5 text-xs text-emerald-400 pt-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>
                    {language === 'bn' ? 'ধন্যবাদ! আপনি যুক্ত হয়েছেন।' : 'Subscribed successfully!'}
                  </span>
                </div>
              )}
            </form>

            <div className="mt-6 pt-4 border-t border-slate-900 space-y-2.5 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>{language === 'bn' ? 'ঢাকা, বাংলাদেশ' : 'Dhaka, Bangladesh'}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>{language === 'bn' ? 'ট্যুরিস্ট পুলিশ: ০১৩২০০১০১০০' : 'Tourist Police: 01320010100'}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <a
                  href={`mailto:${DEVELOPER_EMAIL}`}
                  aria-label={`Email ${DEVELOPER_NAME}`}
                  title={`Email ${DEVELOPER_NAME}`}
                  className="hover:text-emerald-300 transition-colors underline-offset-2 hover:underline"
                >
                  {DEVELOPER_EMAIL}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Developer Credit & Copyright Row */}
        <div className="pt-8 mt-10 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          {/* Developer Credit & Direct Email - Clean & Minimal without unnecessary borders or boxes */}
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 sm:gap-6">
            {/* Developer Credit */}
            <div className="flex items-center gap-2">
              <Code2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>
                {language === 'bn' ? 'ওয়েবসাইটটি তৈরি করেছেন' : 'Developed by'}{' '}
                {hasValidPortfolio ? (
                  <a
                    href={DEVELOPER_PORTFOLIO_URL!}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-400 font-semibold hover:text-emerald-300 transition-colors inline-flex items-center gap-1 cursor-pointer outline-none focus:outline-none"
                    title="View Masum Parvej Profile"
                  >
                    <span>{DEVELOPER_NAME}</span>
                    <ExternalLink className="w-3 h-3 text-emerald-400" />
                  </a>
                ) : (
                  <span className="text-emerald-400 font-semibold">
                    {DEVELOPER_NAME}
                  </span>
                )}
              </span>
            </div>

            <span className="hidden sm:inline text-slate-800">|</span>

            {/* Email Contact */}
            <a
              href={`mailto:${DEVELOPER_EMAIL}`}
              aria-label={`Email ${DEVELOPER_NAME}`}
              title={`Email ${DEVELOPER_NAME}`}
              className="flex items-center gap-2 text-slate-400 hover:text-emerald-400 transition-colors cursor-pointer outline-none focus:outline-none"
            >
              <Mail className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span className="font-mono text-slate-300 hover:text-emerald-400 transition-colors">{DEVELOPER_EMAIL}</span>
            </a>
          </div>

          {/* Copyright Notice */}
          <div className="text-slate-500 text-center sm:text-right font-normal">
            © 2026 Explore Bangladesh. All rights reserved.
          </div>
        </div>

        {/* Secondary Links & Legal Notice */}
        <div className="pt-4 flex flex-wrap items-center justify-center md:justify-end gap-4 text-xs text-slate-500">
          <Link to="/about" className="hover:text-emerald-400 transition-colors">
            {t('nav.about')}
          </Link>
          <span>·</span>
          <Link to="/contact" className="hover:text-emerald-400 transition-colors">
            {t('nav.contact')}
          </Link>
          <span>·</span>
          <Link to="/tourism" className="hover:text-emerald-400 transition-colors">
            {t('nav.tourism')}
          </Link>
          <span>·</span>
          <span className="hover:text-slate-400 transition-colors cursor-pointer">
            {language === 'bn' ? 'গোপনীয়তা নীতি' : 'Privacy Policy'}
          </span>
        </div>
      </div>
    </footer>
  );
};
