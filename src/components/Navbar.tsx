import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, User, Menu, X, Compass, Globe, LogOut, ChevronDown } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useModal } from '../context/ModalContext';

export const Navbar: React.FC = () => {
  const { language, toggleLanguage, t } = useLanguage();
  const { openSearch, openAuth, user, logoutUser } = useModal();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [userDropdown, setUserDropdown] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setUserDropdown(false);
  }, [location.pathname]);

  const navLinks = [
    { name: t('nav.home'), path: '/' },
    { name: t('nav.tourism'), path: '/tourism' },
    { name: t('nav.divisions'), path: '/divisions' },
    { name: t('nav.districts'), path: '/districts' },
    { name: t('nav.upazilas'), path: '/upazilas' },
    { name: t('nav.historical'), path: '/historical-places' },
    { name: t('nav.culture'), path: '/culture' },
    { name: language === 'bn' ? 'কমিউনিটি' : 'Community', path: '/community' },
    { name: t('nav.blog'), path: '/blog' },
  ];

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-200 ${
        isScrolled
          ? 'bg-slate-950/95 backdrop-blur-md shadow-lg shadow-black/30 border-b border-slate-800/80 py-2.5'
          : 'bg-slate-950/80 backdrop-blur-sm border-b border-slate-800/50 py-3.5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          {/* Brand Logo & Tagline */}
          <Link to="/" className="flex items-center gap-3 shrink-0 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center text-white shadow-md shadow-emerald-950/50 group-hover:scale-105 transition-transform">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <div className="text-lg sm:text-xl font-bold tracking-tight text-white flex items-center gap-1.5">
                Explore <span className="text-emerald-400">Bangladesh</span>
              </div>
              <div className="text-[11px] text-slate-400 font-normal leading-tight hidden sm:block">
                {t('nav.tagline')}
              </div>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden xl:flex items-center gap-1 lg:gap-2 text-sm font-medium">
            {navLinks.map(link => {
              const active = isActive(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
                    active
                      ? 'text-emerald-400 bg-emerald-950/60 font-semibold'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Controls */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Search Trigger */}
            <button
              onClick={openSearch}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-slate-300 text-xs transition-colors"
              title="Search (Ctrl+K)"
            >
              <Search className="w-4 h-4 text-emerald-400" />
              <span className="hidden sm:inline text-slate-400">{language === 'bn' ? 'অনুসন্ধান' : 'Search'}</span>
              <kbd className="hidden lg:inline px-1.5 py-0.5 text-[10px] font-mono text-slate-500 bg-slate-950 rounded border border-slate-800">
                ⌘K
              </kbd>
            </button>

            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-semibold transition-colors"
              title="Toggle Language"
            >
              <Globe className="w-3.5 h-3.5 text-emerald-400" />
              <span className={language === 'bn' ? 'text-emerald-400' : 'text-slate-400'}>বাংলা</span>
              <span className="text-slate-600">|</span>
              <span className={language === 'en' ? 'text-emerald-400' : 'text-slate-400'}>EN</span>
            </button>

            {/* User / Login */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdown(!userDropdown)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-950/50 border border-emerald-800/50 hover:bg-emerald-900/60 text-emerald-300 text-xs font-medium transition-colors"
                >
                  <div className="w-5 h-5 rounded-full bg-emerald-500 text-slate-950 font-bold flex items-center justify-center text-[10px]">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="max-w-[80px] truncate hidden sm:inline">{user.name}</span>
                  <ChevronDown className="w-3 h-3 text-emerald-400" />
                </button>
                {userDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-slate-900 border border-slate-800 rounded-xl shadow-xl py-2 z-50 text-xs">
                    <div className="px-3 py-1.5 text-slate-400 border-b border-slate-800">
                      <div className="font-semibold text-slate-200">{user.name}</div>
                      <div className="truncate text-[11px] text-slate-500">{user.email}</div>
                    </div>
                    <button
                      onClick={() => {
                        logoutUser();
                        setUserDropdown(false);
                      }}
                      className="w-full text-left px-3 py-2 text-rose-400 hover:bg-slate-800 flex items-center gap-2"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      {language === 'bn' ? 'লগআউট' : 'Sign Out'}
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => openAuth('login')}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-medium transition-colors shadow-sm shadow-emerald-950/50"
              >
                <User className="w-3.5 h-3.5" />
                <span>{t('nav.login')}</span>
              </button>
            )}

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 text-slate-300 hover:text-white bg-slate-900 rounded-xl border border-slate-800"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="xl:hidden pt-4 pb-3 border-t border-slate-800/80 mt-3 animate-in fade-in duration-150">
            <div className="grid grid-cols-2 gap-2 text-sm">
              {navLinks.map(link => {
                const active = isActive(link.path);
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`px-3 py-2 rounded-lg transition-colors ${
                      active
                        ? 'text-emerald-400 bg-emerald-950/70 font-semibold'
                        : 'text-slate-300 hover:text-white hover:bg-slate-900'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
