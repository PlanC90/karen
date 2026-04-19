import { useState, useEffect } from 'react';
import { Play, X, Star, Clock, Calendar } from 'lucide-react';
import { Movie } from '../types';

interface MovieModalProps {
  movie: Movie;
  onPlay: (movie: Movie) => void;
  onClose: () => void;
}

export default function MovieModal({ movie, onPlay, onClose }: MovieModalProps) {
  const [imgFailed, setImgFailed] = useState(false);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handler);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handler);
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[90] bg-black/80 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4"
      onClick={onClose}
    >
      <div
        className="bg-[#141414] rounded-t-3xl sm:rounded-2xl w-full sm:max-w-2xl overflow-hidden shadow-2xl border border-white/10"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="relative h-52 sm:h-72 overflow-hidden"
          style={imgFailed || !movie.posterPath ? {
            background: `linear-gradient(135deg, ${movie.gradientFrom} 0%, ${movie.gradientTo} 100%)`,
          } : {}}
        >
          {movie.posterPath && !imgFailed && (
            <img
              src={movie.posterPath.replace('w500', 'w780')}
              alt={movie.title}
              className="absolute inset-0 w-full h-full object-cover object-top"
              onError={() => setImgFailed(true)}
            />
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-[#141414]/20 to-transparent" />

          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-black/60 hover:bg-black/80 text-white rounded-full p-2 transition-colors backdrop-blur-sm z-10"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-4 left-5 right-5 z-10">
            <h2 className="text-white text-2xl sm:text-3xl font-black drop-shadow-lg leading-tight">
              {movie.title}
            </h2>
          </div>
        </div>

        <div className="px-6 py-5">
          <div className="flex items-center gap-4 mb-4 flex-wrap">
            <div className="flex items-center gap-1.5">
              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              <span className="text-yellow-400 font-bold">{movie.imdb}</span>
              <span className="text-gray-500 text-sm">IMDB</span>
            </div>
            <div className="flex items-center gap-1.5 text-gray-400">
              <Calendar className="w-4 h-4" />
              <span className="text-sm">{movie.year}</span>
            </div>
            <div className="flex items-center gap-1.5 text-gray-400">
              <Clock className="w-4 h-4" />
              <span className="text-sm">{movie.duration}</span>
            </div>
            {movie.quality && (
              <span className="text-xs text-gray-400 bg-white/5 border border-white/10 px-2 py-0.5 rounded">
                {movie.quality}
              </span>
            )}
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            {movie.genre.map((g) => (
              <span
                key={g}
                className="text-xs font-medium px-2.5 py-1 rounded-full border border-white/20 text-gray-300 bg-white/5"
              >
                {g}
              </span>
            ))}
          </div>

          <p className="text-gray-300 text-sm leading-relaxed mb-6">{movie.description}</p>

          <div className="flex gap-3">
            <button
              onClick={() => { onPlay(movie); onClose(); }}
              className="flex-1 flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-xl transition-all duration-200 active:scale-95"
            >
              <Play className="w-5 h-5 fill-white" />
              Şimdi İzle
            </button>
            <button
              onClick={onClose}
              className="px-5 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-all duration-200 border border-white/10"
            >
              Kapat
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
