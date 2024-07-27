"use client";

import React, { useState, useEffect } from 'react';

const ThemeToggle = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark';
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    const root = document.documentElement;

    if (theme === 'dark') {
      root.style.setProperty('--custom-primary', '#FFF8F3');
      root.style.setProperty('--custom-secondary', '#120032');
    } else {
      root.style.setProperty('--custom-primary', '#120032');
      root.style.setProperty('--custom-secondary', '#FFF8F3');
    }

    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
      <input type="checkbox" className='toggle' onChange={toggleTheme} checked={theme === 'light'} />
  );
};

export default ThemeToggle;
