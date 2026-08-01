import React, { useState, useEffect, useMemo } from 'react';
import confetti from 'canvas-confetti';
import officialCatalog from './data/officialCatalog.json';
import legacyCatalog from './data/movies.json';
import Header from './components/Header';
import MovieCard from './components/MovieCard';
import MovieDetailModal from './components/MovieDetailModal';
import StatsModal from './components/StatsModal';
import OlafSticker from './components/OlafSticker';

const LOCAL_STORAGE_KEY = 'disney_pixar_vault_movies_v5';

// The official list covers Disney's main banner. The original tracker adds
// localized Italian titles and fills older Pixar entries missing from that list.
const initialMoviesData = [...officialCatalog, ...legacyCatalog.filter(movie =>
  !officialCatalog.some(official =>
    official.year === movie.year &&
    official.studio === movie.studio &&
    official.title.toLocaleLowerCase() === movie.title.toLocaleLowerCase()
  )
)];

export default function App() {
  const [movies, setMovies] = useState(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        // Ignore stale/corrupt values so a bad localStorage entry cannot
        // prevent the whole tracker from rendering.
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (e) {
      console.error('Failed to load movies from localStorage', e);
    }
    return initialMoviesData;
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('tutti'); // tutti, disney, pixar, animazione, liveaction, visti, davedere, preferiti
  const [sortBy, setSortBy] = useState('anno-asc'); // anno-asc, anno-desc, titolo, voto
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [showStats, setShowStats] = useState(false);
  const [sparkles, setSparkles] = useState([]);

  // Save to localStorage on change
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(movies));
    } catch (e) {
      console.error('Failed to save to localStorage', e);
    }
  }, [movies]);

  // Magic wand sparkle emitter effect on search focus/type
  const triggerSparkles = () => {
    const newSparkles = Array.from({ length: 6 }).map((_, i) => ({
      id: Date.now() + i,
      left: Math.random() * 60 - 30,
      top: Math.random() * 40 - 20,
      color: ['#b9003e', '#e9c400', '#54c7ff', '#ffffff'][Math.floor(Math.random() * 4)],
      size: Math.random() * 14 + 10
    }));
    setSparkles(newSparkles);
    setTimeout(() => setSparkles([]), 1200);
  };

  const handleUpdateMovie = (id, updates) => {
    setMovies(prev => prev.map(m => {
      if (m.id === id) {
        const updated = { ...m, ...updates };
        // Trigger confetti celebration if movie was marked seen
        if (updates.seen === true && !m.seen) {
          confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 }
          });
        }
        // Update currently selected modal view
        if (selectedMovie && selectedMovie.id === id) {
          setSelectedMovie(updated);
        }
        return updated;
      }
      return m;
    }));
  };

  const handleToggleSeen = (id) => {
    const target = movies.find(m => m.id === id);
    if (target) {
      handleUpdateMovie(id, { seen: !target.seen });
    }
  };

  const handleResetData = () => {
    if (window.confirm('Vuoi ripristinare tutti i film ai dati iniziali dell\'Excel?')) {
      setMovies(initialMoviesData);
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    }
  };

  // Filtered & Sorted Movies computation
  const filteredMovies = useMemo(() => {
    return movies.filter(m => {
      // Search filter
      const matchesSearch = searchQuery.trim() === '' || 
        m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.year.toString().includes(searchQuery);

      if (!matchesSearch) return false;

      // Studio & State filter
      if (activeFilter === 'disney') return m.studio.toLowerCase().includes('disney');
      if (activeFilter === 'pixar') return m.studio.toLowerCase().includes('pixar');
      if (activeFilter === 'animazione') return (m.category || '').toLowerCase().includes('animazione');
      if (activeFilter === 'liveaction') return (m.category || '').toLowerCase().includes('live');
      if (activeFilter === 'visti') return m.seen;
      if (activeFilter === 'davedere') return !m.seen;
      if (activeFilter === 'preferiti') return m.inWishlist;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'anno-asc') return parseInt(a.year || 0) - parseInt(b.year || 0);
      if (sortBy === 'anno-desc') return parseInt(b.year || 0) - parseInt(a.year || 0);
      if (sortBy === 'titolo') return a.title.localeCompare(b.title);
      if (sortBy === 'voto') return (b.rating || 0) - (a.rating || 0);
      return 0;
    });
  }, [movies, searchQuery, activeFilter, sortBy]);

  const seenCount = useMemo(() => movies.filter(m => m.seen).length, [movies]);

  return (
    <div className="min-h-screen pb-24 text-on-background">
      {/* Background Mickey Watermarks */}
      <div className="fixed top-24 left-6 opacity-10 mickey-float pointer-events-none z-0">
        <span className="material-symbols-filled text-[140px] text-primary">castle</span>
      </div>
      <div className="fixed bottom-24 right-6 opacity-10 mickey-float pointer-events-none z-0" style={{ animationDelay: '-3s' }}>
        <span className="material-symbols-filled text-[180px] text-secondary">stars</span>
      </div>

      {/* Olaf Sticker Mascot (sticker-forge web component) */}
      <OlafSticker />

      {/* Header */}
      <Header
        seenCount={seenCount}
        totalCount={movies.length}
        onOpenStats={() => setShowStats(true)}
        onResetData={handleResetData}
      />

      {/* Main Container */}
      <main className="relative z-10 px-4 md:px-12 max-w-7xl mx-auto mt-24">
        {/* Search & Filters Hero Section */}
        <section className="flex flex-col items-center mb-8">
          {/* Magic Search Bar */}
          <div className="relative w-full max-w-2xl group">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary via-amber-400 to-secondary rounded-full blur opacity-30 group-focus-within:opacity-70 transition duration-1000"></div>
            <div className="relative flex items-center bg-surface-container-lowest rounded-full border-4 border-on-surface p-2 shadow-[4px_4px_0_0_rgba(27,28,21,1)]">
              <input
                type="text"
                value={searchQuery}
                onFocus={triggerSparkles}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  triggerSparkles();
                }}
                placeholder="Cerca un film Disney o Pixar..."
                className="w-full bg-transparent border-none focus:ring-0 px-6 font-body-lg text-on-surface placeholder-on-surface/40 text-base md:text-lg focus:outline-none"
              />
              <div className="relative pr-4 flex items-center">
                <span className="material-symbols-filled text-primary text-3xl cursor-pointer magic-wand-wave">
                  magic_button
                </span>
                {/* Sparkle Emitter Container */}
                {sparkles.map(sp => (
                  <span
                    key={sp.id}
                    className="material-symbols-filled sparkle"
                    style={{
                      left: `${sp.left}px`,
                      top: `${sp.top}px`,
                      color: sp.color,
                      fontSize: `${sp.size}px`
                    }}
                  >
                    auto_awesome
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Candy Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-2.5 md:gap-3 mt-6">
            {[
              { id: 'tutti', label: 'Tutti i Film 🎬', bg: 'bg-primary-container text-white' },
              { id: 'disney', label: 'Disney 🏰', bg: 'bg-rose-500 text-white' },
              { id: 'pixar', label: 'Pixar 🚀', bg: 'bg-sky-500 text-white' },
              { id: 'animazione', label: 'Animazione 🎨', bg: 'bg-violet-500 text-white' },
              { id: 'liveaction', label: 'Live Action 🎭', bg: 'bg-orange-500 text-white' },
              { id: 'visti', label: 'Visti ✨', bg: 'bg-emerald-500 text-white' },
              { id: 'davedere', label: 'Da Vedere 🍿', bg: 'bg-amber-400 text-on-surface' },
              { id: 'preferiti', label: 'Preferiti ⭐', bg: 'bg-purple-500 text-white' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id)}
                className={`candy-button px-4 py-2 md:px-5 md:py-2.5 rounded-full font-label-bold border-3 border-on-surface text-xs md:text-sm min-h-[42px] transition-all ${
                  activeFilter === tab.id
                    ? `${tab.bg} scale-105 shadow-[0_4px_0_0_rgba(27,28,21,1)]`
                    : 'bg-surface-container-highest text-on-surface-variant opacity-80 hover:opacity-100'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Sorting Control */}
          <div className="flex items-center gap-2 mt-4 text-xs font-label-bold text-on-surface-variant">
            <span>Ordinamento:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-surface-container-lowest border-2 border-on-surface rounded-full px-3 py-1 text-on-surface font-label-bold focus:outline-none cursor-pointer"
            >
              <option value="anno-asc">Anno (Dal più vecchio)</option>
              <option value="anno-desc">Anno (Dal più recente)</option>
              <option value="titolo">Titolo (A-Z)</option>
              <option value="voto">Voto più alto</option>
            </select>
          </div>
        </section>

        {/* Movie Counter & Results Header */}
        <div className="flex justify-between items-center mb-4 px-2">
          <p className="text-xs md:text-sm font-label-bold text-on-surface-variant uppercase tracking-wider">
            {filteredMovies.length} {filteredMovies.length === 1 ? 'Film Trovato' : 'Film Trovati'}
          </p>
        </div>

        {/* Movie Grid */}
        {filteredMovies.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-5 pb-16">
            {filteredMovies.map(movie => (
              <MovieCard
                key={movie.id}
                movie={movie}
                onSelect={setSelectedMovie}
                onToggleSeen={handleToggleSeen}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-surface-container-lowest rounded-3xl border-3 border-on-surface p-8 max-w-md mx-auto paper-cutout">
            <span className="material-symbols-filled text-6xl text-amber-400 mb-3 animate-bounce">
              search_off
            </span>
            <h3 className="font-headline-md text-lg font-bold text-on-surface">
              Nessun film trovato!
            </h3>
            <p className="text-xs text-on-surface-variant mt-1">
              Prova a cambiare la ricerca o i filtri selezionati.
            </p>
          </div>
        )}
      </main>

      {/* Detail Modal */}
      {selectedMovie && (
        <MovieDetailModal
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
          onUpdateMovie={handleUpdateMovie}
        />
      )}

      {/* Stats Modal */}
      {showStats && (
        <StatsModal
          movies={movies}
          onClose={() => setShowStats(false)}
        />
      )}
    </div>
  );
}
