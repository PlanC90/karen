export interface Movie {
  id: string;
  title: string;
  year: number;
  imdb: number;
  genre: string[];
  description: string;
  duration: string;
  url: string;
  posterPath?: string;
  gradientFrom: string;
  gradientTo: string;
  gradientVia?: string;
  featured?: boolean;
  quality?: string;
}

export interface WatchHistoryEntry {
  movieId: string;
  watchedAt: number;
}
