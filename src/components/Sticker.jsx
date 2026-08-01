import React, { useEffect } from 'react';

export default function Sticker() {
  useEffect(() => {
    // Load the sticker-forge script if it's not already loaded
    if (!document.querySelector('script[src="https://sticker.oooo.so/embed/sticker-forge.es.js"]')) {
      const script = document.createElement('script');
      script.type = 'module';
      script.src = 'https://sticker.oooo.so/embed/sticker-forge.es.js';
      document.head.appendChild(script);
    }

    const initSticker = async () => {
      await customElements.whenDefined('sticker-forge');
      const sticker = document.querySelector('#my-sticker');
      if (sticker) {
        // IL BASE64 È STATO TAGLIATO DALLA CHAT. 
        // Inseriamo un URL temporaneo di un'immagine trasparente o vuota
        await sticker.setSource({
          type: "image",
          src: "" 
        });
      }
    };
    initSticker();
  }, []);

  return (
    <div className="fixed bottom-6 left-4 z-40 pointer-events-auto" style={{ transform: 'scale(0.5)', transformOrigin: 'bottom left' }}>
      <sticker-forge id="my-sticker" style={{ display: 'block', width: '640px', height: '420px' }}></sticker-forge>
    </div>
  );
}
