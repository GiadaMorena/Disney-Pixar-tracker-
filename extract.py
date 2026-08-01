import re

sticker_txt_path = r'C:\Users\giada\Documents\antigravity\splendid-nobel\disney-pixar-tracker\Materiali\sticker.txt'
with open(sticker_txt_path, 'r', encoding='utf-8') as f:
    content = f.read()

match = re.search(r'"src":\s*"(data:image/[^"]+)"', content)
if match:
    base64_src = match.group(1)
    sticker_jsx = f"""import React, {{ useEffect }} from 'react';

export default function Sticker() {{
  useEffect(() => {{
    if (!document.querySelector('script[src="https://sticker.oooo.so/embed/sticker-forge.es.js"]')) {{
      const script = document.createElement('script');
      script.type = 'module';
      script.src = 'https://sticker.oooo.so/embed/sticker-forge.es.js';
      document.head.appendChild(script);
    }}

    const initSticker = async () => {{
      await customElements.whenDefined('sticker-forge');
      const sticker = document.querySelector('#my-sticker');
      if (sticker) {{
        await sticker.setSource({{\n          type: "image",\n          src: "{base64_src}"\n        }});\n      }}
    }};
    initSticker();
  }}, []);

  return (
    <div className="fixed bottom-0 left-0 z-50 pointer-events-auto" style={{{{ transform: 'scale(0.35)', transformOrigin: 'bottom left' }}}}>
      <sticker-forge id="my-sticker" style={{{{ display: 'block', width: '640px', height: '420px' }}}}></sticker-forge>
    </div>
  );
}}
"""
    with open(r'C:\Users\giada\Documents\antigravity\splendid-nobel\disney-pixar-tracker\src\components\Sticker.jsx', 'w', encoding='utf-8') as sf:
        sf.write(sticker_jsx)
    print('Sticker.jsx updated successfully')
else:
    print('Base64 not found in sticker.txt')
