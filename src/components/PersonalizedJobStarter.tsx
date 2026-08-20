'use client';

import { FormEvent, useEffect, useState } from 'react';
import Link from 'next/link';
import { BellRing, Clock3, Sparkles } from 'lucide-react';
import styles from './PersonalizedJobStarter.module.css';

const RECENT_SEARCHES_KEY = 'abam_recent_job_searches';
const MAX_RECENT_SEARCHES = 5;

type Props = {
  query: string;
  onSearch: (query: string) => void;
};

export default function PersonalizedJobStarter({ query, onSearch }: Props) {
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(RECENT_SEARCHES_KEY) ?? '[]');
      // eslint-disable-next-line react-hooks/set-state-in-effect -- hydrate browser-only saved searches after mount.
      if (Array.isArray(saved)) setRecentSearches(saved.filter((item): item is string => typeof item === 'string'));
    } catch {
      localStorage.removeItem(RECENT_SEARCHES_KEY);
    }
  }, []);

  const saveAndSearch = (value: string) => {
    const normalized = value.trim();
    if (!normalized) {
      onSearch('');
      return;
    }

    const updated = [normalized, ...recentSearches.filter(item => item !== normalized)].slice(0, MAX_RECENT_SEARCHES);
    setRecentSearches(updated);
    localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(updated));
    onSearch(normalized);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    saveAndSearch(query);
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem(RECENT_SEARCHES_KEY);
  };

  return (
    <section className={styles.card} aria-label={'\uB9DE\uCDA4 \uAD6C\uC778 \uD0D0\uC0C9'}>
      <div className={styles.heading}>
        <span className={styles.icon}><Sparkles size={16} aria-hidden="true" /></span>
        <div>
          <strong>{'\uB0B4\uAC8C \uB9DE\uB294 \uACF5\uACE0, \uB354 \uBE60\uB974\uAC8C \uCC3E\uAE30'}</strong>
          <p>{'\uAC80\uC0C9\uC5B4\uB97C \uC800\uC7A5\uD558\uBA74 \uB2E4\uC74C \uBC29\uBB38\uC5D0\uB3C4 \uBC14\uB85C \uC774\uC5B4\uC11C \uBCFC \uC218 \uC788\uC5B4\uC694.'}</p>
        </div>
        <Link href="/alerts" className={styles.alertLink}><BellRing size={14} aria-hidden="true" />{'\uB9DE\uCDA4 \uC54C\uB9BC'}</Link>
      </div>

      <form className={styles.presets} onSubmit={handleSubmit}>
        {['\uAC15\uB0A8', '\uB2F9\uC77C\uC815\uC0B0', '\uC8FC\uB9D0', '\uCD08\uBCF4\uAC00\uB2A5'].map(preset => (
          <button key={preset} type="button" onClick={() => saveAndSearch(preset)}>{preset}</button>
        ))}
      </form>

      {recentSearches.length > 0 && (
        <div className={styles.recent}>
          <span><Clock3 size={13} aria-hidden="true" />{'\uCD5C\uADFC \uAC80\uC0C9'}</span>
          {recentSearches.map(term => <button key={term} type="button" onClick={() => saveAndSearch(term)}>{term}</button>)}
          <button type="button" onClick={clearRecentSearches} className={styles.clear}>{'\uC9C0\uC6B0\uAE30'}</button>
        </div>
      )}
    </section>
  );
}
