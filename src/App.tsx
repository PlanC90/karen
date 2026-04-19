import { useState } from 'react';
import { Movie } from './types';
import { movies, movieCategories, getMovieById } from './data/movies';
import { useWatchHistory } from './hooks/useWatchHistory';
import Navbar from './components/Navbar';
import HeroBanner from './components/HeroBanner';
import MovieRow from './components/MovieRow';
import MoviePlayer from './components/MoviePlayer';
import MovieModal from './components/MovieModal';

export default function App() {
  const [playerMovie, setPlayerMovie] = useState<Movie | null>(null);
  const [modalMovie, setModalMovie] = useState<Movie | null>(null);
  const { history, addToHistory, removeFromHistory } = useWatchHistory();

  const featuredMovie = movies.find((m) => m.featured) ?? movies[0];

  const handlePlay = (movie: Movie) => {
    addToHistory(movie.id);
    setModalMovie(null);
    setPlayerMovie(movie);
  };

  const handleInfo = (movie: Movie) => {
    setModalMovie(movie);
  };

  const continueWatchingMovies = history
    .map((e) => getMovieById(e.movieId))
    .filter((m): m is Movie => !!m);

  const getCategoryMovies = (ids: string[]) =>
    ids.map((id) => getMovieById(id)).filter((m): m is Movie => !!m);

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <Navbar onMovieSelect={handleInfo} />

      <HeroBanner
        movie={featuredMovie}
        onPlay={handlePlay}
        onInfo={handleInfo}
      />

      <div className="relative z-10 -mt-16 pb-16">
        {continueWatchingMovies.length > 0 && (
          <MovieRow
            title="Kaldığım Yerden Devam Et"
            movies={continueWatchingMovies}
            onPlay={handlePlay}
            onInfo={handleInfo}
            showRemove
            onRemove={removeFromHistory}
          />
        )}

        {movieCategories.map((cat) => {
          const catMovies = getCategoryMovies(cat.movieIds);
          return (
            <MovieRow
              key={cat.id}
              title={cat.title}
              movies={catMovies}
              onPlay={handlePlay}
              onInfo={handleInfo}
            />
          );
        })}

        <MovieRow
          title="Tüm Animasyon Filmler"
          movies={movies}
          onPlay={handlePlay}
          onInfo={handleInfo}
        />
      </div>

      <footer className="border-t border-white/5 py-8 text-center">
        <p className="text-gray-600 text-xs">
          KarenFlix — İçerikler{' '}
          <a
            href="https://jetfilmizle.net/tur/animasyon"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-gray-300 transition-colors underline"
          >
            jetfilmizle.net
          </a>{' '}
          üzerinden sunulmaktadır.
        </p>
      </footer>

      {modalMovie && (
        <MovieModal
          movie={modalMovie}
          onPlay={handlePlay}
          onClose={() => setModalMovie(null)}
        />
      )}

      {playerMovie && (
        <MoviePlayer
          movie={playerMovie}
          onClose={() => setPlayerMovie(null)}
        />
      )}
    </div>
  );
}
