---
name: Wonderland Chronicles
colors:
  surface: '#fcfaed'
  surface-dim: '#dcdace'
  surface-bright: '#fcfaed'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f6f4e7'
  surface-container: '#f0eee1'
  surface-container-high: '#eae9dc'
  surface-container-highest: '#e4e3d6'
  on-surface: '#1b1c15'
  on-surface-variant: '#5b3f42'
  inverse-surface: '#303129'
  inverse-on-surface: '#f3f1e4'
  outline: '#8f6f71'
  outline-variant: '#e4bdc0'
  surface-tint: '#bd0040'
  primary: '#b9003e'
  on-primary: '#ffffff'
  primary-container: '#e02254'
  on-primary-container: '#fffbff'
  inverse-primary: '#ffb2b9'
  secondary: '#00668a'
  on-secondary: '#ffffff'
  secondary-container: '#54c7ff'
  on-secondary-container: '#00516f'
  tertiary: '#705d00'
  on-tertiary: '#ffffff'
  tertiary-container: '#c9a900'
  on-tertiary-container: '#4c3f00'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdadc'
  primary-fixed-dim: '#ffb2b9'
  on-primary-fixed: '#400010'
  on-primary-fixed-variant: '#91002f'
  secondary-fixed: '#c4e7ff'
  secondary-fixed-dim: '#7bd0ff'
  on-secondary-fixed: '#001e2c'
  on-secondary-fixed-variant: '#004c69'
  tertiary-fixed: '#ffe16d'
  tertiary-fixed-dim: '#e9c400'
  on-tertiary-fixed: '#221b00'
  on-tertiary-fixed-variant: '#544600'
  background: '#fcfaed'
  on-background: '#1b1c15'
  surface-variant: '#e4e3d6'
typography:
  display-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 48px
    fontWeight: '800'
    lineHeight: 56px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '800'
    lineHeight: 38px
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
  body-lg:
    fontFamily: Quicksand
    fontSize: 18px
    fontWeight: '500'
    lineHeight: 28px
  body-md:
    fontFamily: Quicksand
    fontSize: 16px
    fontWeight: '500'
    lineHeight: 24px
  label-bold:
    fontFamily: Rubik
    fontSize: 14px
    fontWeight: '700'
    lineHeight: 20px
rounded:
  sm: 0.5rem
  DEFAULT: 1rem
  md: 1.5rem
  lg: 2rem
  xl: 3rem
  full: 9999px
spacing:
  base: 8px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 64px
  section-gap: 48px
---

## Brand & Style
The brand personality is exuberant, nostalgic, and hyper-kinetic. It targets families, collectors, and animation enthusiasts who view movie-watching as an event. The design narrative mimics the physical sensation of a theme park: every interaction should feel like "pressing a button on a ride" or "unfolding a park map."

The style is **Tactile/Skeuomorphic with a Modern Cartoon twist**. It utilizes high-energy visuals, paper-cutout depth, and "squishy" physics. The UI avoids sterile minimalism in favor of a maximalist, immersive "scrapbook" aesthetic that feels alive with glowing sparkles and iconic silhouettes.

## Colors
The palette is rooted in a "Pastel Cream" (`#FFFDF0`) base to mimic aged park tickets or parchment, providing a warm, inviting backdrop. 

- **Primary (Magic Red):** Used for high-action call-to-actions and brand iconography.
- **Secondary (Sky Blue):** Used for interactive elements, progress bars, and navigation.
- **Tertiary (Pixie Gold):** Reserved for "Premium" moments, star ratings, and achievement badges.
- **Deep Navy (#1A2B4C):** Used exclusively for text and high-contrast borders to maintain legibility against vibrant backgrounds.

Backgrounds should feature subtle, low-opacity repeating patterns of four-pointed stars or confetti to maintain visual energy without distracting from content.

## Typography
Typography is treated as a graphic element. **Plus Jakarta Sans** provides the "Disney-esque" weight and roundness required for headlines, while **Quicksand** offers a soft, legible experience for descriptions and cast lists. **Rubik** is used for UI labels to ensure structural clarity.

- **Headlines:** Should always use "Extra Bold" weights to feel "inflated" and bouncy.
- **Body:** Uses medium weights to prevent the rounded terminals from appearing too thin on bright backgrounds.
- **Letter Spacing:** Headlines utilize tight tracking to emphasize the "bubbly" interconnected nature of the letterforms.

## Layout & Spacing
The layout follows a **Fluid Grid** with exaggerated generous spacing to avoid a "cramped" feeling. 

- **The "Wavy" Rule:** Major section dividers should not be straight lines; use CSS masks or SVG dividers to create rolling hills or cloud-like waves between sections.
- **Floating Containers:** Content is housed in "Ticket Stubs" or "Cloud" containers that do not touch the edges of the viewport on desktop.
- **Mobile:** Elements stack vertically with high-contrast 4px borders to maintain a "sticker book" appearance.

## Elevation & Depth
This design system rejects traditional soft shadows in favor of **Layered Paper Cutouts** and **Outer Glows**.

- **Depth:** Achieved through "Hard Shadows" (offset 4px-8px, 100% opacity) using a darker shade of the background color or deep navy. This creates a 2.5D physical effect.
- **Magic Glows:** High-importance items (like a "Currently Watching" card) should have a soft, pulsing outer glow in Primary or Tertiary colors to simulate "Pixie Dust."
- **Press State:** When an element is pressed, it should shift 4px down and right, and its shadow should disappear, simulating a physical button being pushed into a surface.

## Shapes
The shape language is **Extremely Rounded/Organic**. There are no sharp corners in this design system.

- **Pill Shapes:** Default for buttons, search bars, and tags.
- **The "Squircle":** Used for movie posters and avatars to make them feel friendly and "huggable."
- **Iconic Containers:** Use Mickey-ear silhouettes for circular avatars or profile icons. Use a "Luxo Lamp" style curve for headers or "Spotlight" effects.

## Components

- **Candy Buttons:** Buttons use a "glossy" gradient overlay (top-down white-to-transparent) to look like hard candy. They feature a thick 3px navy border.
- **Magic Wand Search Bar:** A pill-shaped input field where the search icon is a magic wand. On focus, "sparkle" particles (CSS animations) should emit from the cursor.
- **Ticket Stub Cards:** Movie cards use a "perforated" edge texture on the bottom. The "Genre" chips inside are small pill shapes in Secondary colors.
- **Wavy Banners:** Featured movie headers should use a "Flag" or "Wave" shape rather than a rectangle.
- **Checkboxes & Radios:** Designed as "Stars." When checked, the star fills with Gold and plays a small "scaling" animation.
- **Lists:** List items are separated by "dashed" lines that look like treasure map paths.
- **Loading State:** A spinning silhouette of a classic animation icon (e.g., a spinning film reel with ears).