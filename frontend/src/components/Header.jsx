import React, { useState } from 'react';

export default function Header() {
  const [theme, setTheme] = useState(() => (document.documentElement.classList.contains('theme-dark') ? 'dark' : 'light'));

  function toggleTheme() {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    localStorage.setItem('mh_theme', next);
    const root = document.documentElement;
    if (next === 'dark') root.classList.add('theme-dark'); else root.classList.remove('theme-dark');
  }

  return (
    <header className="site-header">
      <div className="brand">
        <h1>Mental Health Assistant</h1>
        <p className="tagline">Supportive, non-judgmental conversation</p>
      </div>

      <div className="auth-area">
        <button className="btn ghost" onClick={toggleTheme}>{theme === 'dark' ? '☀️ Light' : '🌙 Dark'}</button>
      </div>
    </header>
  );
}
