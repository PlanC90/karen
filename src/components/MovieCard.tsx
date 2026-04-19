import { useState } from 'react';
import { Play, Star, Clock, X } from 'lucide-react';
import { Movie } from '../types';

interface MovieCardProps {
  movie: Movie;
  onPlay: (movie: Movie) => void;
  onInfo: (movie: Movie) => void;
  showRemove?: boolean;
  onRemove?: (movieId: string) => void;
}

export default function MovieCard({ movie, onPlay, onInfo, showRemove, onRemove }: MovieCardProps) {
  const [imgFailed, setImgFailed] = useState(false);

  return (
    <div className="group relative flex-shrink-0 w-36 sm:w-44 md:w-48 cursor-pointer">
      <div
        className="relative w-full aspect-[2/3] rounded-xl overflow-hidden transition-all duration-300 group-hover:scale-105 group-hover:shadow-2xl group-hover:z-10"
        onClick={() => onInfo(movie)}
      >
        {movie.posterPath && !imgFailed ? (
          <img
            src={movie.posterPath}
            alt={movie.title}
            className="absolute inset-0 w-full h-full object-cover"
            onError={() => setImgFailed(true)}
            loading="lazy"
          />
        ) : (
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(160deg, ${movie.gradientFrom} 0%, ${movie.gradientTo} 100%)`,
            }}
          />
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

        <div className="absolute top-2 left-2 flex items-center gap-1 bg-black/60 rounded px-1.5 py-0.5 backdrop-blur-sm">
          <Star className="w-2.5 h-2.5 text-yellow-400 fill-yellow-400" />
          <span className="text-yellow-300 text-xs font-bold">{movie.imdb}</span>
        </div>

        {showRemove && onRemove && (
          <button
            onClick={(e) => { e.stopPropagation(); onRemove(movie.id); }}
            className="absolute top-2 right-2 bg-black/60 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm hover:bg-red-600/80"
          >
            <X className="w-3 h-3 text-white" />
          </button>
        )}

        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <div className="bg-white/20 backdrop-blur-sm rounded-full p-4 border-2 border-white/50">
            <Play className="w-6 h-6 text-white fill-white" />
          </div>
        </div>

        {movie.quality && (
          <div className="absolute bottom-2 left-2 right-2">
            <span className="text-white/70 text-[9px] bg-black/50 px-1.5 py-0.5 rounded backdrop-blur-sm">
              {movie.quality}
            </span>
          </div>
        )}
      </div>

      <div className="mt-2 px-0.5">
        <p className="text-white text-xs sm:text-sm font-semibold leading-tight line-clamp-2 group-hover:text-red-400 transition-colors">
          {movie.title}
        </p>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-gray-400 text-xs">{movie.year}</span>
          <span className="text-gray-500 text-xs flex items-center gap-1">
            <Clock className="w-2.5 h-2.5" />
            {movie.duration}
          </span>
        </div>
      </div>

      <div className="absolute bottom-14 left-0 right-0 flex gap-1.5 px-1 opacity-0 group-hover:opacity-100 transition-all duration-200 translate-y-1 group-hover:translate-y-0">
        <button
          onClick={(e) => { e.stopPropagation(); onPlay(movie); }}
          className="flex-1 bg-white text-black text-xs font-bold py-1.5 rounded-lg hover:bg-gray-100 transition-colors flex items-center justify-center gap-1"
        >
          <Play className="w-3 h-3 fill-black" />
          Oynat
        </button>
      </div>
    </div>
  );
}
