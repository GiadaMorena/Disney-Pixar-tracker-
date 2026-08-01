import React, { useRef, useEffect, useState } from 'react';

export default function OlafSticker() {
  const containerRef = useRef(null);
  useEffect(() => {
    let cancelled = false;

    const init = async () => {
      if (!containerRef.current) return;

      // Build sticker-forge element programmatically (avoids JSX custom-element issues)
      const el = document.createElement('sticker-forge');
      el.id = 'olaf-sticker-forge';
      el.style.cssText = 'display:block;width:160px;height:220px;';
      containerRef.current.appendChild(el);

      try {
        // The external component is optional. Do not leave an empty space
        // forever when its CDN is unavailable or blocked.
        await Promise.race([
          customElements.whenDefined('sticker-forge'),
          new Promise((_, reject) => setTimeout(() => reject(new Error('Sticker Forge timed out')), 3000)),
        ]);
        if (cancelled) return;

        // Fetch the local Olaf PNG and convert to base64
        const resp = await fetch('/olaf.png');
        if (!resp.ok) throw new Error('Fetch failed: ' + resp.status);
        const blob = await resp.blob();

        const base64 = await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.onerror = reject;
          reader.readAsDataURL(blob);
        });

        if (cancelled) return;
        await el.setSource({ type: 'image', src: base64 });
      } catch (err) {
        console.warn('[OlafSticker] Could not initialise sticker-forge:', err);
        // Graceful fallback: show the plain image
        if (containerRef.current && !cancelled) {
          el.remove();
          const img = document.createElement('img');
          img.src = '/olaf.png';
          img.alt = 'Olaf';
          img.style.cssText = 'width:80px;filter:drop-shadow(0 4px 12px rgba(0,102,138,0.4));';
          containerRef.current.appendChild(img);
        }
      }
    };

    init();
    return () => {
      cancelled = true;
      // React StrictMode mounts effects twice in development; clear the
      // first placeholder so Olaf is never rendered twice.
      containerRef.current?.replaceChildren();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed bottom-6 left-4 z-40 pointer-events-none"
      style={{ animation: 'float 5s ease-in-out infinite', animationDelay: '-1.5s' }}
      title="Ciao! Sono Olaf! ⛄"
    />
  );
}
