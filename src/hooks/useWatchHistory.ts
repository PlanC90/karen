import { useState, useEffect } from 'react';
import { WatchHistoryEntry } from '../types';

const STORAGE_KEY = 'karenflix_watch_history';

export function useWatchHistory() {
  const [history, setHistory] = useState<WatchHistoryEntry[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setHistory(JSON.parse(stored));
      } catch {
        setHistory([]);
      }
    }
  }, []);

  const addToHistory = (movieId: string) => {
    setHistory((prev) => {
      const filtered = prev.filter((e) => e.movieId !== movieId);
      const updated = [{ movieId, watchedAt: Date.now() }, ...filtered].slice(0, 20);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  const removeFromHistory = (movieId: string) => {
    setHistory((prev) => {
      const updated = prev.filter((e) => e.movieId !== movieId);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  return { history, addToHistory, removeFromHistory };
}
