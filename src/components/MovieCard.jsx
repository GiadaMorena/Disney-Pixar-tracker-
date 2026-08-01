import React, { useState } from 'react';
import { getPosterUrl } from '../utils/posters';

function FallbackPoster({ movie, isDisney }) {
  const decade = Math.floor(parseInt(movie.year || 1990) / 10) * 10;
  const style = {
    background: isDisney
      ? 'linear-gradient(135deg,#b9003e,#7b0099,#3700b3)'
      : 'linear-gradient(135deg,#006994,#0044aa,#001d6e)',
    width: '100%', height: '100%', display: 'flex', flexDirection: 'column',
    alignItems: 'center', justifyContent: 'center', padding: '12px',
    textAlign: 'center', position: 'relative', overflow: 'hidden',
  };
  return (
    <div style={style}>
      <div style={{ position:'absolute',top:'-20%',right:'-20%',width:'70%',height:'70%',background:'rgba(255,255,255,0.07)',borderRadius:'50%' }} />
      <div style={{ position:'absolute',bottom:'-15%',left:'-15%',width:'50%',height:'50%',background:'rgba(255,225,109,0.08)',borderRadius:'50%' }} />
      <div style={{ fontSize:'2rem', marginBottom:'6px', lineHeight:1 }}>
        {isDisney ? '🏰' : '🚀'}
      </div>
      <div style={{ fontSize:'11px',fontWeight:800,color:'#fff',fontFamily:'Plus Jakarta Sans,sans-serif',lineHeight:'1.2',textShadow:'0 2px 4px rgba(0,0,0,0.5)',letterSpacing:'-0.01em' }}>
        {movie.title}
      </div>
      <div style={{ fontSize:'10px',color:'rgba(255,225,109,0.9)',fontWeight:700,marginTop:'4px',fontFamily:'Rubik,sans-serif',letterSpacing:'0.05em' }}>
        {movie.year} · {decade}s
      </div>
    </div>
  );
}

export default function MovieCard({ movie, onSelect, onToggleSeen }) {
  const [imgError, setImgError] = useState(false);
  const posterUrl = getPosterUrl(movie);
  const isDisney = movie.studio.toLowerCase().includes('disney');

  return (
    <div
      onClick={() => onSelect(movie)}
      className={'paper-cutout bg-surface-container-lowest rounded-2xl border-2 border-on-surface p-2 flex flex-col items-center relative overflow-hidden group cursor-pointer ' + (movie.seen ? 'ring-2 ring-emerald-400' : '')}
    >
      <div className="absolute top-2 left-2 z-10 flex flex-col gap-0.5">
        <span className={'text-[9px] font-label-bold px-1.5 py-0.5 rounded-full border uppercase tracking-wide shadow-sm ' + (isDisney ? 'bg-rose-100 text-rose-800 border-rose-300' : 'bg-sky-100 text-sky-800 border-sky-300')}>
          {movie.studio}
        </span>
        {movie.category === 'Live Action' && (
          <span className="text-[8px] font-label-bold px-1.5 py-0.5 rounded-full border uppercase tracking-wide shadow-sm bg-orange-100 text-orange-800 border-orange-300">
            Live Action
          </span>
        )}
      </div>

      <div className="absolute top-2 right-2 z-10">
        <button
          onClick={(e) => { e.stopPropagation(); onToggleSeen(movie.id); }}
          className={'rounded-full p-0.5 shadow flex items-center justify-center border transition-all ' + (movie.seen ? 'bg-emerald-500 border-emerald-700 text-white hover:bg-emerald-600' : 'bg-white/80 border-on-surface/30 text-on-surface-variant hover:bg-emerald-100')}
          title={movie.seen ? 'Segna come Non Visto' : 'Segna come Visto'}
        >
          <span className={'text-base ' + (movie.seen ? 'material-symbols-filled' : 'material-symbols-outlined')}>
            {movie.seen ? 'check_circle' : 'visibility'}
          </span>
        </button>
      </div>

      <div className={'w-full mb-2 bg-surface-container-high ' + (isDisney ? 'border-rose-200' : 'border-sky-200')}
        style={{ aspectRatio: '2/3', borderRadius: '50% / 8%', overflow: 'hidden', border: '2px solid currentColor' }}
      >
        {posterUrl && !imgError ? (
          <img
            src={posterUrl} alt={movie.title}
            onError={() => setImgError(true)}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        ) : (
          <FallbackPoster movie={movie} isDisney={isDisney} />
        )}
      </div>

      <div className="text-center w-full px-1 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-label-bold text-on-surface text-xs leading-tight line-clamp-2 group-hover:text-primary transition-colors">
            {movie.title}
          </h3>
          <p className="text-[10px] text-on-surface-variant mt-0.5">{movie.year}</p>
        </div>
        <div className="flex justify-center gap-0.5 mt-1 pt-1 border-t border-dashed border-on-surface/10">
          {[1,2,3,4,5].map((s) => (
            <span key={s} className={'text-xs ' + (s <= movie.rating ? 'material-symbols-filled text-amber-400' : 'material-symbols-outlined text-on-surface-variant/20')}>
              star
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
