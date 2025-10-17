'use client';
import { useEffect, useState } from 'react';

type Lang = 'en' | 'es';
const STORAGE_KEY = 'ccu-lang';

export default function LanguageToggle() {
  const [lang, setLang] = useState<Lang>('en');

  useEffect(() => {
    if (typeof document === 'undefined') return;
    let initial: Lang = 'en';
    if (typeof window !== 'undefined') {
      const stored = window.localStorage?.getItem(STORAGE_KEY) as Lang | null;
      if (stored === 'es' || stored === 'en') {
        initial = stored;
      }
    }
    const docLang = document.documentElement.lang;
    if (docLang === 'es') {
      initial = 'es';
    }
    setLang(initial);
    document.documentElement.lang = initial;
  }, []);

  function toggle() {
    setLang(prev => {
      const next: Lang = prev === 'en' ? 'es' : 'en';
      if (typeof document !== 'undefined') {
        document.documentElement.lang = next;
      }
      try {
        if (typeof window !== 'undefined') {
          window.localStorage.setItem(STORAGE_KEY, next);
        }
      } catch {
        // ignore storage errors
      }
      return next;
    });
  }

  return (
    <button
      type="button"
      onClick={toggle}
      className="inline-flex min-h-[44px] items-center justify-center rounded-full border border-[color:#0E7DB6]/30 px-4 py-2 text-sm font-medium text-[color:#0E7DB6] hover:bg-[rgb(14,125,182,0.06)]"
      aria-label={`Switch language to ${lang === 'en' ? 'Español' : 'English'}`}
    >
      {lang === 'en' ? 'ES' : 'EN'}
    </button>
  );
}
