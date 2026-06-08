'use client';

import React, { useEffect, useState } from 'react';
import { SpotlightCursor, ThemeToggle } from './Shared';

const LandingShell: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const saved = typeof window !== 'undefined' ? localStorage.getItem('cq-landing-theme') : null;
    if (saved === 'dark' || saved === 'light') {
      setTheme(saved);
    } else if (typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark');
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('cq-landing-theme', theme);
    }
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'));

  return (
    <div className={`cq2-root ${theme === 'dark' ? 'cq2-dark' : ''}`}>
      <SpotlightCursor />
      <ThemeToggle theme={theme} onToggle={toggleTheme} />
      {children}
    </div>
  );
};

export default LandingShell;
