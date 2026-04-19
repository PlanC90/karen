import { useState, useEffect } from 'react';
import { Search, X, Film } from 'lucide-react';
import { movies } from '../data/movies';
import { Movie } from '../types';

interface NavbarProps {
  onMovieSelect: (movie: Movie) => void;
}

export default function Navbar({ onMovieSelect }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Movie[]>([]);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }
    const q = query.toLowerCase();
    setResults(
      movies.filter(
        (m) =>
          m.title.toLowerCase().includes(q) ||
          m.genre.some((g) => g.toLowerCase().includes(q)) ||
          String(m.year).includes(q)
      )
    );
  }, [query]);

  const handleSelect = (movie: Movie) => {
    setSearchOpen(false);
    setQuery('');
    onMovieSelect(movie);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-[#0a0a0a] shadow-2xl' : 'bg-gradient-to-b from-black/80 to-transparent'
      }`}
    >
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <div className="flex items-center gap-2 md:gap-3">
            <div className="flex items-center gap-2">
              <div className="bg-red-600 rounded p-1.5">
                <Film className="w-5 h-5 text-white" />
              </div>
              <span className="text-white font-black text-xl md:text-2xl tracking-tight">
                KAREN<span className="text-red-500">FLIX</span>
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {searchOpen ? (
              <div className="relative flex items-center">
                <div className="flex items-center bg-black/80 border border-white/30 rounded-lg overflow-hidden">
                  <Search className="w-4 h-4 text-gray-400 ml-3 flex-shrink-0" />
                  <input
                    autoFocus
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Film ara..."
                    className="bg-transparent text-white text-sm px-3 py-2 w-48 md:w-64 outline-none placeholder-gray-500"
                  />
                  <button
                    onClick={() => { setSearchOpen(false); setQuery(''); }}
                    className="p-2 text-gray-400 hover:text-white transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                {results.length > 0 && (
                  <div className="absolute top-full mt-2 left-0 right-0 bg-[#141414] border border-white/10 rounded-xl shadow-2xl overflow-hidden">
                    {results.slice(0, 6).map((movie) => (
                      <button
                        key={movie.id}
                        onClick={() => handleSelect(movie)}
                        className="w-full flex items-center gap-3 px-4 py-3 hover:bg-white/10 transition-colors text-left"
                      >
                        <div
                          className="w-10 h-14 rounded-md flex-shrink-0"
                          style={{
                            background: `linear-gradient(135deg, ${movie.gradientFrom}, ${movie.gradientTo})`,
                          }}
                        />
                        <div>
                          <p className="text-white text-sm font-medium leading-tight">{movie.title}</p>
                          <p className="text-gray-400 text-xs mt-0.5">{movie.year} · IMDB {movie.imdb}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => setSearchOpen(true)}
                className="text-gray-300 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/10"
              >
                <Search className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
