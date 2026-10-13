import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ModalContextType {
  isSearchOpen: boolean;
  openSearch: () => void;
  closeSearch: () => void;
  isAuthOpen: boolean;
  openAuth: (initialMode?: 'login' | 'register') => void;
  closeAuth: () => void;
  authMode: 'login' | 'register';
  setAuthMode: (mode: 'login' | 'register') => void;
  user: { name: string; email: string } | null;
  loginUser: (name: string, email: string) => void;
  logoutUser: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [user, setUser] = useState<{ name: string; email: string } | null>(() => {
    const saved = localStorage.getItem('explore_bd_demo_user');
    return saved ? JSON.parse(saved) : null;
  });

  const openSearch = () => setIsSearchOpen(true);
  const closeSearch = () => setIsSearchOpen(false);

  const openAuth = (initialMode: 'login' | 'register' = 'login') => {
    setAuthMode(initialMode);
    setIsAuthOpen(true);
  };
  const closeAuth = () => setIsAuthOpen(false);

  const loginUser = (name: string, email: string) => {
    const u = { name, email };
    setUser(u);
    localStorage.setItem('explore_bd_demo_user', JSON.stringify(u));
    setIsAuthOpen(false);
  };

  const logoutUser = () => {
    setUser(null);
    localStorage.removeItem('explore_bd_demo_user');
  };

  return (
    <ModalContext.Provider
      value={{
        isSearchOpen,
        openSearch,
        closeSearch,
        isAuthOpen,
        openAuth,
        closeAuth,
        authMode,
        setAuthMode,
        user,
        loginUser,
        logoutUser,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = (): ModalContextType => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};
