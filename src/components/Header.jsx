import React from 'react';

export default function Header({ seenCount, totalCount, onOpenStats, onResetData }) {
  const percentage = Math.round((seenCount / (totalCount || 1)) * 100);

  return (
    <header className="fixed top-0 left-0 w-full z-50 px-4 py-3 h-20 bg-primary flex justify-between items-center wavy-banner border-b-4 border-on-primary-fixed-variant shadow-[0_4px_0_0_rgba(64,0,16,1)]">
      {/* Brand Title */}
      <div className="flex items-center gap-3">
        <span className="material-symbols-filled text-on-primary text-3xl md:text-4xl text-amber-300 drop-shadow">
          castle
        </span>
        <div>
          <h1 className="text-base sm:text-lg md:text-2xl font-headline-md font-extrabold text-on-primary tracking-tight leading-none flex items-center gap-2">
            Disney & Pixar Vault
          </h1>
          <p className="text-[10px] md:text-xs text-amber-200 font-label-bold font-normal opacity-90 hidden sm:block">
            Il Tuo Tracciatore Magico dei Film
          </p>
        </div>
      </div>

      {/* Progress & Actions */}
      <div className="flex items-center gap-3 md:gap-5">
        {/* Vault Counter Pill */}
        <div 
          onClick={onOpenStats}
          className="cursor-pointer bg-on-primary-fixed-variant/40 hover:bg-on-primary-fixed-variant/60 transition-colors px-3 py-1.5 md:px-4 md:py-2 rounded-full border-2 border-amber-300/60 flex items-center gap-2 shadow-inner"
          title="Clicca per vedere le statistiche della tua collezione!"
        >
          <span className="material-symbols-filled text-tertiary-fixed text-xl animate-pulse">
            stars
          </span>
          <div className="flex flex-col">
            <span className="font-label-bold text-on-primary text-xs md:text-sm leading-tight">
              {seenCount} / {totalCount}
            </span>
            <span className="text-[9px] text-amber-200 uppercase font-semibold tracking-wider">
              {percentage}% Visti
            </span>
          </div>
        </div>

        {/* Action: Stats */}
        <button 
          onClick={onOpenStats}
          className="hidden sm:flex candy-button bg-amber-400 text-on-surface p-2 md:px-3 md:py-2 rounded-full border-2 border-on-surface font-label-bold text-xs md:text-sm items-center gap-1.5 min-h-[40px]"
          title="Statistiche Vault"
        >
          <span className="material-symbols-filled text-base">bar_chart</span>
          <span className="hidden md:inline">Statistiche</span>
        </button>

        {/* Action: Reset */}
        <button 
          onClick={onResetData}
          className="hover:scale-110 transition-transform p-2 text-on-primary/80 hover:text-on-primary text-xs"
          title="Ripristina Dati Originali Excel"
        >
          <span className="material-symbols-outlined text-xl">restart_alt</span>
        </button>
      </div>
    </header>
  );
}
