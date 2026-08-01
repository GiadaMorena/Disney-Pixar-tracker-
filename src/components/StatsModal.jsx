import React from 'react';

export default function StatsModal({ movies, onClose }) {
  if (!movies) return null;

  const total = movies.length;
  const seen = movies.filter(m => m.seen).length;
  const percentage = Math.round((seen / (total || 1)) * 100);

  const disneyMovies = movies.filter(m => m.studio.toLowerCase().includes('disney'));
  const disneySeen = disneyMovies.filter(m => m.seen).length;
  const disneyPerc = Math.round((disneySeen / (disneyMovies.length || 1)) * 100);

  const pixarMovies = movies.filter(m => m.studio.toLowerCase().includes('pixar'));
  const pixarSeen = pixarMovies.filter(m => m.seen).length;
  const pixarPerc = Math.round((pixarSeen / (pixarMovies.length || 1)) * 100);

  const wishlistCount = movies.filter(m => m.inWishlist).length;

  const ratedMovies = movies.filter(m => m.rating > 0);
  const avgRating = ratedMovies.length > 0 
    ? (ratedMovies.reduce((acc, m) => acc + m.rating, 0) / ratedMovies.length).toFixed(1)
    : '0.0';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-on-surface/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-surface-container-lowest border-4 border-on-surface rounded-3xl p-6 md:p-8 storybook-page shadow-2xl my-auto">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-10 h-10 bg-primary-container text-white rounded-full border-2 border-on-surface shadow-md flex items-center justify-center candy-button"
        >
          <span className="material-symbols-outlined text-2xl font-bold">close</span>
        </button>

        {/* Title */}
        <div className="flex items-center gap-3 mb-6">
          <span className="material-symbols-filled text-4xl text-amber-400">emoji_events</span>
          <div>
            <h2 className="font-display-lg text-2xl md:text-3xl text-primary font-extrabold">
              Statistiche della Vault
            </h2>
            <p className="text-xs text-on-surface-variant font-body-md">
              Il tuo viaggio attraverso il mondo Disney & Pixar
            </p>
          </div>
        </div>

        {/* Main Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          <div className="bg-rose-50 border-2 border-rose-200 rounded-2xl p-3 text-center">
            <span className="material-symbols-filled text-rose-500 text-2xl">movie</span>
            <div className="text-2xl font-extrabold text-on-surface mt-1">{seen}/{total}</div>
            <div className="text-[10px] text-on-surface-variant font-label-bold uppercase">Film Visti</div>
          </div>

          <div className="bg-sky-50 border-2 border-sky-200 rounded-2xl p-3 text-center">
            <span className="material-symbols-filled text-sky-500 text-2xl">pie_chart</span>
            <div className="text-2xl font-extrabold text-on-surface mt-1">{percentage}%</div>
            <div className="text-[10px] text-on-surface-variant font-label-bold uppercase">Completato</div>
          </div>

          <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-3 text-center">
            <span className="material-symbols-filled text-amber-500 text-2xl">star</span>
            <div className="text-2xl font-extrabold text-on-surface mt-1">{avgRating}</div>
            <div className="text-[10px] text-on-surface-variant font-label-bold uppercase">Voto Medio</div>
          </div>

          <div className="bg-purple-50 border-2 border-purple-200 rounded-2xl p-3 text-center">
            <span className="material-symbols-filled text-purple-500 text-2xl">auto_awesome</span>
            <div className="text-2xl font-extrabold text-on-surface mt-1">{wishlistCount}</div>
            <div className="text-[10px] text-on-surface-variant font-label-bold uppercase">Nei Preferiti</div>
          </div>
        </div>

        {/* Breakdown Bars */}
        <div className="space-y-4 bg-surface-container rounded-2xl p-4 border-2 border-on-surface/10">
          {/* Disney Bar */}
          <div>
            <div className="flex justify-between text-xs font-label-bold mb-1">
              <span className="text-rose-700 flex items-center gap-1">
                <span className="material-symbols-filled text-sm">castle</span>
                Classici Disney ({disneySeen}/{disneyMovies.length})
              </span>
              <span className="text-rose-700 font-bold">{disneyPerc}%</span>
            </div>
            <div className="w-full bg-white h-4 rounded-full border border-on-surface/20 overflow-hidden p-0.5">
              <div 
                className="bg-gradient-to-r from-rose-500 to-rose-400 h-full rounded-full transition-all duration-1000"
                style={{ width: `${disneyPerc}%` }}
              ></div>
            </div>
          </div>

          {/* Pixar Bar */}
          <div>
            <div className="flex justify-between text-xs font-label-bold mb-1">
              <span className="text-sky-700 flex items-center gap-1">
                <span className="material-symbols-filled text-sm">rocket_launch</span>
                Capolavori Pixar ({pixarSeen}/{pixarMovies.length})
              </span>
              <span className="text-sky-700 font-bold">{pixarPerc}%</span>
            </div>
            <div className="w-full bg-white h-4 rounded-full border border-on-surface/20 overflow-hidden p-0.5">
              <div 
                className="bg-gradient-to-r from-sky-500 to-sky-400 h-full rounded-full transition-all duration-1000"
                style={{ width: `${pixarPerc}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Motivational Quote */}
        <div className="mt-6 text-center italic text-xs text-on-surface-variant border-t border-dashed border-on-surface/10 pt-4">
          "Se puoi sognarlo, puoi farlo." — Walt Disney ✨
        </div>
      </div>
    </div>
  );
}
