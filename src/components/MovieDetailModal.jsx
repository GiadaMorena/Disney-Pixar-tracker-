import React, { useState, useEffect } from 'react';
import { getPosterUrl } from '../utils/posters';

export default function MovieDetailModal({ movie, onClose, onUpdateMovie }) {
  if (!movie) return null;

  const [seen, setSeen] = useState(movie.seen || false);
  const [rating, setRating] = useState(movie.rating || 0);
  const [hoverRating, setHoverRating] = useState(0);
  const [review, setReview] = useState(movie.review || '');
  const [inWishlist, setInWishlist] = useState(movie.inWishlist || false);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    setSeen(movie.seen || false);
    setRating(movie.rating || 0);
    setReview(movie.review || '');
    setInWishlist(movie.inWishlist || false);
    setImgError(false);
  }, [movie]);

  const handleSeenToggle = () => {
    const nextSeen = !seen;
    setSeen(nextSeen);
    onUpdateMovie(movie.id, { seen: nextSeen });
  };

  const handleRatingClick = (newRating) => {
    setRating(newRating);
    onUpdateMovie(movie.id, { rating: newRating });
  };

  const handleReviewChange = (e) => {
    const val = e.target.value;
    setReview(val);
    onUpdateMovie(movie.id, { review: val });
  };

  const handleWishlistToggle = () => {
    const nextWish = !inWishlist;
    setInWishlist(nextWish);
    onUpdateMovie(movie.id, { inWishlist: nextWish });
  };

  const isDisney = movie.studio.toLowerCase().includes('disney');
  const posterUrl = getPosterUrl(movie);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 bg-on-surface/60 backdrop-blur-sm overflow-y-auto animate-fadeIn">
      <div 
        className="relative w-full max-w-4xl bg-surface-container-lowest border-4 border-on-surface rounded-3xl p-4 md:p-8 storybook-page shadow-2xl my-auto max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-10 h-10 bg-primary-container text-white rounded-full border-2 border-on-surface shadow-md flex items-center justify-center candy-button active:scale-95 transition-transform"
          title="Chiudi"
        >
          <span className="material-symbols-outlined text-2xl font-bold">close</span>
        </button>

        {/* Storybook Content Container */}
        <div className="flex flex-col md:flex-row gap-6 md:gap-10 pt-2">
          {/* Left Column: Poster & Details */}
          <div className="w-full md:w-1/3 flex flex-col items-center">
            <div className="relative w-full max-w-[260px] group">
              <div className={`absolute inset-0 ${isDisney ? 'bg-rose-400' : 'bg-sky-400'} translate-x-3 translate-y-3 rounded-2xl -z-10 border-2 border-on-surface`}></div>
              <div className="rounded-2xl overflow-hidden border-3 border-on-surface shadow-xl bg-surface-container-high aspect-[2/3]">
                {posterUrl && !imgError ? (
                  <img
                    src={posterUrl}
                    alt={movie.title}
                    onError={() => setImgError(true)}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div style={{
                    background: isDisney
                      ? 'linear-gradient(135deg,#b9003e,#7b0099,#3700b3)'
                      : 'linear-gradient(135deg,#006994,#0044aa,#001d6e)',
                    width: '100%', height: '100%', display: 'flex', flexDirection: 'column',
                    alignItems: 'center', justifyContent: 'center',
                    padding: '16px', textAlign: 'center', color: '#fff',
                  }}>
                    <div style={{ fontSize: '3rem', marginBottom: '8px' }}>{isDisney ? '🏰' : '🚀'}</div>
                    <div style={{ fontSize: '14px', fontWeight: 800, lineHeight: '1.3', fontFamily: 'Plus Jakarta Sans, sans-serif', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>{movie.title}</div>
                    <div style={{ fontSize: '12px', color: 'rgba(255,225,109,0.9)', marginTop: '6px', fontFamily: 'Rubik, sans-serif', fontWeight: 700 }}>{movie.year}</div>
                  </div>
                )}
              </div>
            </div>

            {/* Movie Technical Card */}
            <div className="w-full max-w-[260px] mt-6 bg-surface-container rounded-xl p-4 border-2 border-dashed border-outline/40 space-y-2 text-sm">
              <div className="flex justify-between items-center border-b border-on-surface/10 pb-1.5">
                <span className="font-label-bold text-on-surface-variant uppercase text-xs">Studio</span>
                <span className={`font-bold px-2 py-0.5 rounded-full text-xs ${
                  isDisney ? 'bg-rose-100 text-rose-800' : 'bg-sky-100 text-sky-800'
                }`}>
                  {movie.studio}
                </span>
              </div>
              <div className="flex justify-between items-center border-b border-on-surface/10 pb-1.5">
                <span className="font-label-bold text-on-surface-variant uppercase text-xs">Anno Uscita</span>
                <span className="font-bold text-on-surface">{movie.year}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-label-bold text-on-surface-variant uppercase text-xs">Stato</span>
                <span className={`font-bold text-xs px-2 py-0.5 rounded-full ${
                  seen ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                }`}>
                  {seen ? 'Visto ✨' : 'Da Vedere 🍿'}
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Title & Interactive Elements */}
          <div className="w-full md:w-2/3 space-y-6">
            <div>
              <div className="flex items-center justify-between gap-4">
                <h2 className="font-display-lg text-2xl md:text-4xl text-primary font-extrabold leading-tight">
                  {movie.title}
                </h2>
                <button
                  onClick={handleWishlistToggle}
                  className={`p-2.5 rounded-full border-2 border-on-surface candy-button transition-transform ${
                    inWishlist ? 'bg-amber-300 text-amber-900' : 'bg-surface-container-high text-on-surface-variant'
                  }`}
                  title={inWishlist ? "Rimuovi dai preferiti" : "Aggiungi ai preferiti"}
                >
                  <span className={`material-symbols-${inWishlist ? 'filled' : 'outlined'} text-2xl`}>
                    star
                  </span>
                </button>
              </div>
              <p className="text-on-surface-variant text-sm font-body-md italic mt-1">
                Classico {movie.studio} ({movie.year})
              </p>
            </div>

            {/* Toggle: Magicamente Visto! */}
            <div 
              onClick={handleSeenToggle}
              className={`rounded-2xl border-3 border-on-surface p-4 flex items-center justify-between cursor-pointer transition-all ${
                seen ? 'bg-emerald-100/70 border-emerald-800 shadow-md' : 'bg-rose-50/70 border-rose-800'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className={`material-symbols-filled text-3xl ${seen ? 'text-emerald-600' : 'text-rose-500'}`}>
                  {seen ? 'check_circle' : 'visibility'}
                </span>
                <div>
                  <h3 className="font-headline-md text-base md:text-lg font-bold text-on-surface">
                    Magicamente Visto!
                  </h3>
                  <p className="text-xs text-on-surface-variant">
                    {seen ? "Hai già vissuto questa magia!" : "Clicca per segnarlo come visto"}
                  </p>
                </div>
              </div>

              {/* Custom Switch Toggle */}
              <div className={`w-16 h-9 rounded-full border-3 border-on-surface p-1 transition-colors relative ${
                seen ? 'bg-emerald-500' : 'bg-rose-400'
              }`}>
                <div className={`w-6 h-6 rounded-full bg-white border border-on-surface shadow-md transition-transform flex items-center justify-center ${
                  seen ? 'translate-x-7' : 'translate-x-0'
                }`}>
                  <span className="material-symbols-filled text-xs text-on-surface">
                    {seen ? 'sparkles' : 'lock'}
                  </span>
                </div>
              </div>
            </div>

            {/* Rating: Glowing Stars */}
            <div className="space-y-2 bg-amber-50/50 p-4 rounded-2xl border-2 border-amber-200 text-center">
              <p className="font-label-bold text-xs text-amber-900 uppercase tracking-widest">
                Valutazione Mágica
              </p>
              <div className="flex justify-center gap-2 py-1">
                {[1, 2, 3, 4, 5].map((starIndex) => {
                  const active = starIndex <= (hoverRating || rating);
                  return (
                    <button
                      key={starIndex}
                      type="button"
                      onMouseEnter={() => setHoverRating(starIndex)}
                      onMouseLeave={() => setHoverRating(0)}
                      onClick={() => handleRatingClick(starIndex)}
                      className="transition-transform hover:scale-125 focus:outline-none"
                    >
                      <span className={`material-symbols-${active ? 'filled' : 'outlined'} text-3xl md:text-4xl ${
                        active ? 'text-amber-400 star-glow' : 'text-on-surface-variant/30'
                      }`}>
                        star
                      </span>
                    </button>
                  );
                })}
              </div>
              <p className="text-xs text-amber-800 font-label-bold">
                {rating > 0 ? `${rating} Stelle Mágiche su 5` : 'Tocca una stella per votare!'}
              </p>
            </div>

            {/* Review Area: Parchment */}
            <div className="relative">
              <div className="absolute -top-3 left-4 bg-surface-container-lowest px-2.5 flex items-center gap-1.5 z-10 border border-on-surface rounded-full shadow-sm">
                <span className="material-symbols-filled text-primary text-sm">edit_note</span>
                <span className="font-label-bold text-xs text-on-surface">Le Tue Note & Recensione</span>
              </div>
              <textarea
                value={review}
                onChange={handleReviewChange}
                placeholder="Scrivi qui i tuoi ricordi, la scena preferita o le tue impressioni su questo film..."
                rows={4}
                className="w-full bg-[#fdfcf0] border-3 border-on-surface rounded-2xl p-4 pt-5 font-body-md text-on-surface placeholder-on-surface-variant/40 focus:ring-2 focus:ring-primary focus:outline-none shadow-inner resize-none text-sm md:text-base"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
