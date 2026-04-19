import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Movie } from '../types';
import MovieCard from './MovieCard';

interface MovieRowProps {
  title: string;
  movies: Movie[];
  onPlay: (movie: Movie) => void;
  onInfo: (movie: Movie) => void;
  showRemove?: boolean;
  onRemove?: (movieId: string) => void;
}

export default function MovieRow({ title, movies, onPlay, onInfo, showRemove, onRemove }: MovieRowProps) {
  const rowRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: 'left' | 'right') => {
    if (!rowRef.current) return;
    const scrollAmount = rowRef.current.clientWidth * 0.75;
    rowRef.current.scrollBy({ left: dir === 'right' ? scrollAmount : -scrollAmount, behavior: 'smooth' });
  };

  if (movies.length === 0) return null;

  return (
    <div className="relative group/row mb-8 md:mb-10">
      <h2 className="text-white text-lg sm:text-xl font-bold mb-3 px-4 sm:px-6 lg:px-8">
        {title}
      </h2>

      <div className="relative">
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-black/70 hover:bg-black/90 text-white rounded-r-lg p-2 opacity-0 group-hover/row:opacity-100 transition-all duration-200 backdrop-blur-sm border-r border-t border-b border-white/10 hidden sm:flex items-center justify-center"
          style={{ marginTop: '-20px' }}
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <div
          ref={rowRef}
          className="flex gap-3 sm:gap-4 overflow-x-auto scrollbar-hide px-4 sm:px-6 lg:px-8 pb-4"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onPlay={onPlay}
              onInfo={onInfo}
              showRemove={showRemove}
              onRemove={onRemove}
            />
          ))}
        </div>

        <button
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-black/70 hover:bg-black/90 text-white rounded-l-lg p-2 opacity-0 group-hover/row:opacity-100 transition-all duration-200 backdrop-blur-sm border-l border-t border-b border-white/10 hidden sm:flex items-center justify-center"
          style={{ marginTop: '-20px' }}
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
