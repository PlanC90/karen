import { useState } from 'react';
import { Play, Info, Star } from 'lucide-react';
import { Movie } from '../types';

interface HeroBannerProps {
  movie: Movie;
  onPlay: (movie: Movie) => void;
  onInfo: (movie: Movie) => void;
}

export default function HeroBanner({ movie, onPlay, onInfo }: HeroBannerProps) {
  const [imgFailed, setImgFailed] = useState(false);
  const backdropPath = movie.posterPath
    ? movie.posterPath.replace('w500', 'w1280')
    : null;

  return (
    <div className="relative w-full h-[56vw] min-h-[420px] max-h-[750px] overflow-hidden">
      {backdropPath && !imgFailed ? (
        <>
          <img
            src={backdropPath}
            alt={movie.title}
            className="absolute inset-0 w-full h-full object-cover object-center scale-105"
            onError={() => setImgFailed(true)}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/50 to-[#0a0a0a]/20" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a]/90 via-[#0a0a0a]/30 to-transparent" />
        </>
      ) : (
        <>
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(135deg, ${movie.gradientFrom} 0%, ${movie.gradientVia ?? movie.gradientTo} 50%, ${movie.gradientTo} 100%)`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a]/80 via-transparent to-transparent" />
        </>
      )}

      <div className="absolute bottom-[15%] left-0 right-0 px-6 sm:px-10 lg:px-16 max-w-3xl">
        <div className="flex items-center gap-2 mb-3 flex-wrap">
          <span className="text-xs font-bold uppercase tracking-widest text-red-400 bg-red-900/30 border border-red-700/40 px-2 py-0.5 rounded">
            Öne Çıkan
          </span>
          {movie.genre.slice(0, 2).map((g) => (
            <span key={g} className="text-xs text-gray-300 bg-white/10 px-2 py-0.5 rounded">
              {g}
            </span>
          ))}
          {movie.quality && (
            <span className="text-xs text-gray-400 bg-white/5 border border-white/10 px-2 py-0.5 rounded">
              {movie.quality}
            </span>
          )}
        </div>

        <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-white leading-tight mb-3 drop-shadow-2xl">
          {movie.title}
        </h1>

        <div className="flex items-center gap-3 mb-4 flex-wrap">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            <span className="text-yellow-400 font-bold text-sm">{movie.imdb}</span>
            <span className="text-gray-500 text-xs ml-0.5">IMDB</span>
          </div>
          <span className="text-gray-400 text-sm">{movie.year}</span>
          <span className="text-gray-400 text-sm">{movie.duration}</span>
        </div>

        <p className="text-gray-200 text-sm sm:text-base leading-relaxed max-w-xl mb-6 line-clamp-3 drop-shadow-md">
          {movie.description}
        </p>

        <div className="flex items-center gap-3 flex-wrap">
          <button
            onClick={() => onPlay(movie)}
            className="flex items-center gap-2 bg-white text-black font-bold px-6 py-3 rounded-lg hover:bg-gray-200 transition-all duration-200 text-sm sm:text-base active:scale-95 shadow-lg"
          >
            <Play className="w-5 h-5 fill-black" />
            Oynat
          </button>
          <button
            onClick={() => onInfo(movie)}
            className="flex items-center gap-2 bg-white/20 text-white font-semibold px-6 py-3 rounded-lg hover:bg-white/30 transition-all duration-200 text-sm sm:text-base backdrop-blur-sm border border-white/20 active:scale-95"
          >
            <Info className="w-5 h-5" />
            Daha Fazla
          </button>
        </div>
      </div>
    </div>
  );
}
