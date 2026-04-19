import { useEffect, useRef, useState } from 'react';
import { X, ExternalLink, ArrowLeft, RefreshCw } from 'lucide-react';
import { Movie } from '../types';

interface MoviePlayerProps {
  movie: Movie;
  onClose: () => void;
}

// Multiple embed sources to try in order
const getSources = (imdbId: string) => [
  `https://vidsrc.mov/embed/movie/${imdbId}`,
  `https://www.2embed.cc/embed/${imdbId}`,
  `https://multiembed.mov/directstream.php?video_id=${imdbId}&tmdb=0`,
  `https://player.videasy.net/movie/${imdbId}`,
];

// Extract IMDB id from vidsrc.mov URL
const getImdbId = (url: string): string | null => {
  const match = url.match(/tt\d+/);
  return match ? match[0] : null;
};

export default function MoviePlayer({ movie, onClose }: MoviePlayerProps) {
  const isEmbed = movie.url.includes('vidsrc.mov');
  const openedRef = useRef(false);
  const imdbId = getImdbId(movie.url);
  const sources = imdbId ? getSources(imdbId) : [];
  const [sourceIndex, setSourceIndex] = useState(1);

  useEffect(() => {
    if (!isEmbed) {
      if (!openedRef.current) {
        openedRef.current = true;
        window.open(movie.url, '_blank', 'noopener,noreferrer');
        onClose();
      }
      return;
    }

    document.body.style.overflow = 'hidden';
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handler);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handler);
    };
  }, [onClose, isEmbed, movie.url]);

  if (!isEmbed) return null;

  const currentSrc = sources[sourceIndex] ?? movie.url;
  const hasNext = sourceIndex < sources.length - 1;

  const tryNext = () => {
    if (hasNext) setSourceIndex((i) => i + 1);
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black flex flex-col">
      {/* Navbar */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#0a0a0a] border-b border-white/10 flex-shrink-0">
        <div className="flex items-center gap-3 min-w-0">
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors flex items-center gap-1.5 shrink-0"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm hidden sm:inline">Geri</span>
          </button>
          <div className="w-px h-5 bg-white/20 hidden sm:block" />
          <div className="min-w-0">
            <p className="text-white font-semibold text-sm truncate">{movie.title}</p>
            <p className="text-gray-400 text-xs">{movie.year} · {movie.duration}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          {/* Source switcher */}
          {sources.length > 1 && (
            <div className="flex items-center gap-1">
              {sources.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setSourceIndex(i)}
                  className={`text-xs px-2 py-1 rounded transition-all border ${
                    i === sourceIndex
                      ? 'bg-red-600 border-red-500 text-white'
                      : 'bg-white/10 border-white/10 text-gray-400 hover:text-white hover:bg-white/20'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          )}
          {hasNext && (
            <button
              onClick={tryNext}
              title="Farklı kaynak dene"
              className="flex items-center gap-1.5 text-xs text-gray-300 hover:text-white bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg transition-all border border-white/10"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Kaynak Değiştir</span>
            </button>
          )}
          <a
            href={currentSrc}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs text-gray-300 hover:text-white bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg transition-all border border-white/10"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Yeni Sekmede Aç</span>
          </a>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors bg-white/10 hover:bg-red-600/80 p-1.5 rounded-lg"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Player area */}
      <div className="flex-1 relative overflow-hidden">
        <iframe
          key={currentSrc}
          src={currentSrc}
          title={movie.title}
          className="w-full h-full border-0"
          allowFullScreen
          allow="autoplay; fullscreen; picture-in-picture"
        />


      </div>
    </div>
  );
}
