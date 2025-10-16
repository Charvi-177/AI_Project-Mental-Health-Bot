import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles.css';

const savedTheme = (typeof localStorage !== 'undefined' && localStorage.getItem('mh_theme')) || 'light';
const rootEl = document.documentElement;
if (savedTheme === 'dark') {
  rootEl.classList.add('theme-dark');
} else {
  rootEl.classList.remove('theme-dark');
}

createRoot(document.getElementById('root')).render(<App />);
