# KEMET AI Website Redesign Plan
## Dark-to-Light Manus-Inspired Transformation

> Generated: 2026-04-13
> Inspiration: [manus.im](https://manus.im/?index=1)
> Stack: React 18 + TypeScript + Vite + Tailwind CSS + i18next (FR/EN)

---

## Codebase Summary

- **Framework:** React 18.2.0 + TypeScript + Vite 5.0.8
- **Styling:** Tailwind CSS 3.3.6 with custom config
- **Routing:** React Router 6.20.0
- **i18n:** i18next 23.7.6 — bilingual FR/EN
- **Current aesthetic:** Dark theme (#0A0A0A bg), gold (#D4A017) accents, glassmorphism cards, floating particles
- **Target aesthetic:** White background, clean SaaS, adapted gold + blue CTAs (#0066CC)

---

## Implementation Sequence (Recommended Order)

1. Install Remotion packages
2. Update `tailwind.config.js` — new palette, fonts, shadows, keyframes
3. Replace `src/index.css` — light-theme global styles
4. Update `index.html` — remove unused fonts, keep Inter + Space Grotesk
5. Rewrite `Header.tsx` — light theme (affects all pages)
6. Rewrite `Footer.tsx` — static light-theme footer (affects all pages)
7. Rewrite `Card.tsx` — white bg
8. Rewrite `Gallery.tsx` — replace with Stats section component
9. Delete `AnimatedBackground.tsx`, `ConnectionsCounter.tsx`, `LanguageToggle.tsx`
10. Create Remotion files: `src/remotion/compositions/HeroAnimation.tsx`, `src/components/RemotionHeroPlayer.tsx`
11. Rewrite `Home.tsx` — new sections, Remotion hero, stats, CTA
12. Rewrite `Solutions.tsx` — light theme conversion
13. Rewrite `Formations.tsx` — light theme conversion
14. Rewrite `Outils.tsx` — light theme conversion
15. Rewrite `About.tsx` — light theme conversion
16. Rewrite `Chatbot.tsx` — light theme conversion
17. Update `Immobilier.tsx` and `AchatVente.tsx` — light theme conversion
18. Update locale files (`fr.json`, `en.json`) with new i18n keys
19. Test bilingual flow — verify all new text renders in both FR and EN
20. Performance pass — lazy-load Remotion, verify Lighthouse scores

---

## Phase 1: Design System Transformation

### 1.1 Color Palette

**File:** `tailwind.config.js`

| Token | Hex | Usage |
|---|---|---|
| `white` | `#FFFFFF` | Primary background |
| `gray-50` | `#F9FAFB` | Alternating section background |
| `gray-100` | `#F3F4F6` | Card background / subtle fills |
| `gray-200` | `#E5E7EB` | Borders, dividers |
| `gray-400` | `#9CA3AF` | Secondary text |
| `gray-600` | `#4B5563` | Body text |
| `gray-900` | `#111827` | Headings |
| `gold` | `#B8860B` | Primary brand accent (darkened from #D4A017) |
| `gold-light` | `#D4A017` | Hover state, decorative |
| `gold-dark` | `#8B6914` | Active state, deep emphasis |
| `gold-50` | `#FDF8E8` | Light gold tint for backgrounds |
| `gold-100` | `#F9EDCC` | Gold-tinted card backgrounds |
| `accent` | `#0066CC` | CTA buttons, links (Manus-inspired blue) |
| `accent-light` | `#3388DD` | Hover for accent blue |
| `accent-dark` | `#004D99` | Active for accent blue |

**Remove:** `rich-black`, `gold-glow`, `ivory`, `black` (as custom #0A0A0A)

**New `tailwind.config.js` theme block:**

```js
theme: {
  fontFamily: {
    sans: ['Inter', 'system-ui', 'sans-serif'],
    heading: ['Space Grotesk', 'system-ui', 'sans-serif'],
    display: ['Space Grotesk', 'system-ui', 'sans-serif'],
  },
  extend: {
    colors: {
      gold: '#B8860B',
      'gold-light': '#D4A017',
      'gold-dark': '#8B6914',
      'gold-50': '#FDF8E8',
      'gold-100': '#F9EDCC',
      accent: '#0066CC',
      'accent-light': '#3388DD',
      'accent-dark': '#004D99',
    },
    boxShadow: {
      'card': '0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.06)',
      'card-hover': '0 10px 25px rgba(0,0,0,0.08), 0 4px 10px rgba(0,0,0,0.04)',
      'elevated': '0 20px 40px rgba(0,0,0,0.06)',
    },
    keyframes: {
      'fade-in-up': {
        '0%': { opacity: '0', transform: 'translateY(20px)' },
        '100%': { opacity: '1', transform: 'translateY(0)' },
      },
      'slide-up': {
        '0%': { opacity: '0', transform: 'translateY(10px)' },
        '100%': { opacity: '1', transform: 'translateY(0)' },
      },
      'fade-in': {
        '0%': { opacity: '0' },
        '100%': { opacity: '1' },
      },
    },
    animation: {
      'fade-in-up': 'fade-in-up 0.6s ease-out',
      'slide-up': 'slide-up 0.4s ease-out',
      'fade-in': 'fade-in 0.4s ease-out',
    },
  },
},
```

**Remove keyframes:** `shimmer`, `float`, `pulse-gold`, `pulse-slow`

### 1.2 Typography

**Font pairing:** Inter (body) + Space Grotesk (headings)

**Update `index.html`:**
```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&display=swap" rel="stylesheet">
```
Remove: Outfit, Playfair Display, DM Sans, Raleway, Sora imports.

**Type scale:**

| Element | Classes | Size | Weight |
|---|---|---|---|
| Hero headline | `text-5xl md:text-6xl lg:text-7xl font-heading font-bold` | 48–72px | 700 |
| Section headline | `text-3xl md:text-4xl font-heading font-bold` | 30–36px | 700 |
| Card title | `text-xl font-heading font-semibold` | 20px | 600 |
| Body large | `text-lg text-gray-600` | 18px | 400 |
| Body | `text-base text-gray-600` | 16px | 400 |
| Caption / label | `text-sm text-gray-400` | 14px | 500 |

### 1.3 Global CSS (`src/index.css`)

Replace entire file. Remove: `shimmer-text`, `btn-primary`, `btn-secondary`, `glass-card`, `float`, `gradient-text`, `hero-overlay`, `particle`, `particle-float`.

```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  margin: 0;
  font-family: 'Inter', system-ui, sans-serif;
  -webkit-font-smoothing: antialiased;
  background-color: #FFFFFF;
  color: #4B5563;
}

html { scroll-behavior: smooth; }

.reveal {
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.7s cubic-bezier(0.16, 1, 0.3, 1);
}
.reveal.visible {
  opacity: 1;
  transform: translateY(0);
}

.btn-primary {
  padding: 0.875rem 2rem;
  background-color: #0066CC;
  color: #FFFFFF;
  font-weight: 600;
  border-radius: 0.75rem;
  transition: all 0.2s ease;
  font-size: 0.9375rem;
}
.btn-primary:hover {
  background-color: #004D99;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 102, 204, 0.3);
}

.btn-secondary {
  padding: 0.875rem 2rem;
  border: 1.5px solid #E5E7EB;
  color: #111827;
  font-weight: 600;
  border-radius: 0.75rem;
  transition: all 0.2s ease;
  font-size: 0.9375rem;
  background: #FFFFFF;
}
.btn-secondary:hover {
  border-color: #B8860B;
  color: #B8860B;
  background: #FDF8E8;
}

.text-gold-accent { color: #B8860B; }
```

### 1.4 Component Redesign

#### `Card.tsx`
- Remove `glass-card`. Replace with: `bg-white rounded-2xl p-8 border border-gray-200 shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1`
- Icon container: `bg-gold-50 text-gold`
- Title: `text-gray-900`, hover: `hover:text-gold`
- Description: `text-gray-600`

#### `Header.tsx`
- Default theme: `light`
- Scrolled: `bg-white/95 backdrop-blur-lg border-b border-gray-100 shadow-sm`
- Unscrolled: `bg-transparent`
- Logo: `Kemet` in `text-gold font-bold`, `AI` in `text-gray-900`
- Nav links: `text-gray-600 hover:text-gold`
- Mobile menu: `bg-white border-b border-gray-100 shadow-lg`

#### `Footer.tsx`
- Remove `fixed bottom-0` and slide-up mechanism
- New: `<footer className="bg-gray-50 border-t border-gray-200 mt-auto">`
- Headings: `text-gray-900`, body: `text-gray-600`, links: `hover:text-gold`

#### `Gallery.tsx`
- Section heading: `text-gray-900`
- Card borders: `border-gray-200 hover:border-gold/40`
- Bottom bar: `bg-white/90 backdrop-blur-sm`, text: `text-gray-700`

#### Delete these files entirely:
- `src/components/AnimatedBackground.tsx`
- `src/components/ConnectionsCounter.tsx`
- `src/components/LanguageToggle.tsx` (unused — Header has inline toggle)

### 1.5 Animation Philosophy

**Old:** Heavy decorative — particles, shimmer, pulse glows on every page.

**New — purposeful only:**
- Scroll reveals: keep IntersectionObserver, reduce translateY to 30px, use `cubic-bezier(0.16, 1, 0.3, 1)`
- Hover feedback: `hover:-translate-y-1` to `hover:-translate-y-2` on cards, 200–300ms
- Remotion: only in high-impact hero + feature areas (not ambient background)

---

## Phase 2: Landing Page (`src/pages/Home.tsx`)

### 2.1 New Page Structure

```
[Header — transparent → white on scroll]
[Hero Section — white bg]
[Logos/Trust Bar — gray-50 bg]          ← NEW
[Services/Features Section — white bg]
[How It Works — gray-50 bg]             ← NEW
[Training Spotlight — white bg]         ← NEW
[Stats/Social Proof — gray-50 bg]       ← NEW
[CTA Section — gold-50 bg]              ← NEW
[Footer — gray-50 bg]
```

### 2.2 Hero Section

**Remove:** `hero-africa.png` background image, dark overlay, 20 floating particles, shimmer gradient text, scroll indicator chevron.

**New hero:**
```tsx
<section className="relative pt-32 pb-20 md:pt-40 md:pb-28 bg-white overflow-hidden">
  {/* Subtle bg: large blurred gold circle, top-right, very faint */}
  <div className="absolute top-[-200px] right-[-200px] w-[600px] h-[600px] bg-gold-50 rounded-full blur-[120px] pointer-events-none" />

  <div className="relative max-w-5xl mx-auto px-6 text-center">
    {/* Eyebrow tag */}
    <div className="inline-flex items-center gap-2 px-4 py-2 bg-gold-50 border border-gold-100 rounded-full mb-8">
      <span className="w-2 h-2 bg-gold rounded-full" />
      <span className="text-sm font-medium text-gold">
        {t('hero_eyebrow')}
      </span>
    </div>

    {/* Main headline */}
    <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-[1.1] tracking-tight">
      {t('hero_headline_1')}
      <br />
      <span className="text-gold">{t('hero_headline_2')}</span>
    </h1>

    {/* Subheadline */}
    <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed">
      {t('hero_tagline')}
    </p>

    {/* CTAs */}
    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
      <Link to="/solutions" className="btn-primary">{t('hero_cta_primary')}</Link>
      <Link to="/outils" className="btn-secondary">{t('hero_cta_secondary')}</Link>
    </div>
  </div>

  {/* Remotion Player below CTAs */}
  <div className="max-w-4xl mx-auto mt-16 px-6">
    <RemotionHeroPlayer />
  </div>
</section>
```

### 2.3 Remotion Integration

**Install:**
```bash
npm install remotion @remotion/player
npm install -D @remotion/cli
```

**New files:**
```
src/
  remotion/
    Root.tsx                          ← Remotion composition registry
    compositions/
      HeroAnimation.tsx               ← Hero chat demo (10s loop)
      FeatureCards.tsx                ← Animated feature cards
  components/
    RemotionHeroPlayer.tsx            ← <Player> wrapper for hero
    RemotionFeaturePlayer.tsx         ← <Player> wrapper for features
```

**`RemotionHeroPlayer.tsx`:**
```tsx
import { lazy, Suspense } from 'react';
const Player = lazy(() => import('@remotion/player').then(m => ({ default: m.Player })));
import { HeroAnimation } from '../remotion/compositions/HeroAnimation';

export function RemotionHeroPlayer() {
  return (
    <Suspense fallback={<div className="aspect-video bg-gray-50 rounded-2xl border border-gray-100 animate-pulse" />}>
      <div className="rounded-2xl overflow-hidden shadow-elevated border border-gray-100">
        <Player
          component={HeroAnimation}
          durationInFrames={300}
          fps={30}
          compositionWidth={1280}
          compositionHeight={720}
          style={{ width: '100%', height: 'auto' }}
          loop
          autoPlay
          controls={false}
          numberOfSharedAudioTags={0}
        />
      </div>
    </Suspense>
  );
}
```

**`HeroAnimation.tsx` — 10s loop (300 frames @ 30fps):**
- Frames 0–30: Fade in rounded browser-window chrome (white bg, gray-100 toolbar)
- Frames 30–90: Chat input types question character by character: "How can AI improve my customer service?"
- Frames 90–120: Gold-accented thinking indicator (3 pulsing dots)
- Frames 120–240: Answer text streams in line by line, gold sparkle icon next to AI avatar
- Frames 240–270: Two source citation chips slide in from below
- Frames 270–300: Soft fade to loop reset

Colors within animation: white bg, gold accents, `accent` blue for interactive elements, gray-900 for text.

### 2.4 "How It Works" Section

3-step visual flow with staggered reveal:

```
[1. Describe Your Challenge] ——→ [2. We Build Your Solution] ——→ [3. Launch & Scale]
```

Each step: gold-bordered numbered circle + heading + 1–2 line description. Connected by dashed line on desktop.

### 2.5 Stats / Social Proof Section

Replaces the Gallery:

```tsx
<section className="bg-gray-50 py-20">
  <div className="max-w-7xl mx-auto px-6">
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center mb-16">
      <div>
        <p className="text-4xl font-heading font-bold text-gray-900">50+</p>
        <p className="text-sm text-gray-500 mt-1">{t('stats_businesses')}</p>
      </div>
      {/* ... other stats */}
    </div>

    <div className="max-w-3xl mx-auto bg-white rounded-2xl p-8 shadow-card border border-gray-100">
      <blockquote className="text-lg text-gray-700 italic mb-4">"{t('testimonial')}"</blockquote>
      <cite className="text-sm text-gray-500">— Client Name, Company</cite>
    </div>
  </div>
</section>
```

### 2.6 CTA Section

```tsx
<section className="bg-gold-50 py-20">
  <div className="max-w-3xl mx-auto px-6 text-center">
    <h2 className="font-heading text-3xl md:text-4xl font-bold text-gray-900 mb-4">
      {t('cta_title')}
    </h2>
    <p className="text-gray-600 mb-8">{t('cta_subtitle')}</p>
    <Link to="/solutions#contact" className="btn-primary">{t('cta_button')}</Link>
  </div>
</section>
```

### 2.7 Remove from Home.tsx
- `AnimatedBackground` import and usage
- `Gallery` component (replaced by stats)
- Secondary links section for Immobilier/AchatVente (move to footer)
- All particle generation code

---

## Phase 3: Supporting Pages

### Solutions (`src/pages/Solutions.tsx`)
- Remove `AnimatedBackground`, dark gradients
- Page wrapper: `<div className="min-h-screen bg-white font-sans">`
- `h1`: `text-gray-900`, subtitle: `text-gray-600`
- Emphasis box: `bg-gold-50 border-gold-100 rounded-xl text-gold-dark`
- Service cards: `bg-white border border-gray-200 rounded-xl shadow-card hover:shadow-card-hover hover:border-gold/30`
- Form inputs: `bg-white border-gray-200 text-gray-900 focus:border-accent`
- Submit button: `bg-accent text-white hover:bg-accent-dark`

### Formations (`src/pages/Formations.tsx`)
- Remove `AnimatedBackground`, dark gradients
- Upcoming cards: `bg-white border-2 border-gold/40 rounded-2xl shadow-card`
- Coming soon cards: `bg-gray-50 border border-gray-200 rounded-2xl`
- Status badges: upcoming = `bg-gold-50 text-gold`, coming soon = `bg-gray-100 text-gray-500`
- Modal content: `bg-white border-gray-200`, all text dark equivalents

### Outils (`src/pages/Outils.tsx`)
- Remove `AnimatedBackground`, dark gradients
- Tool cards: `bg-white border border-gray-200 rounded-2xl shadow-card hover:shadow-card-hover`
- Title: `text-gray-900`, description: `text-gray-600`
- CTA button: `bg-accent text-white hover:bg-accent-dark`

### About (`src/pages/About.tsx`)
- Remove `AnimatedBackground`, dark gradients, Sora inline font-family
- Page wrapper: `<div className="min-h-screen bg-white font-sans">`
- Add `<h1 className="font-heading text-4xl font-bold text-gray-900 mb-8 text-center">`
- Paragraphs: `text-gray-600 leading-relaxed text-lg`
- Name: `text-gray-900 font-semibold`, title: `text-gold text-sm`

### Chatbot (`src/pages/Chatbot.tsx`)
- Remove all inline background blobs and particles
- Page wrapper: `<div className="min-h-screen bg-gray-50 font-sans flex flex-col">`
- Empty state icon: `bg-gold-50 border border-gold-100 rounded-2xl text-gold`
- Assistant bubbles: `bg-white text-gray-700 border border-gray-200 shadow-sm rounded-2xl`
- User bubbles: `bg-accent text-white rounded-2xl`
- Input container: `bg-white rounded-2xl border border-gray-200 focus-within:border-accent`
- Send button active: `bg-accent text-white`

### Immobilier + AchatVente
- Wrapper: `<div className="min-h-screen bg-white font-sans">`
- Title: `text-gray-900`, body: `text-gray-600`
- Link: `text-gold hover:text-gold-dark`

---

## Phase 4: Technical Implementation

### Remotion Architecture
No changes to `vite.config.ts` needed — `@remotion/player` is a standard React component.

**Performance:**
- Lazy-load all Remotion Players: `React.lazy()` + `<Suspense>`
- `numberOfSharedAudioTags={0}` (no audio)
- `renderLoading` prop: show static placeholder while initializing
- Keep compositions simple — avoid heavy SVG paths or large images inside

**Dev script addition:**
```json
"remotion:preview": "remotion preview src/remotion/Root.tsx"
```

### i18n New Keys (`fr.json` + `en.json`)

```json
{
  "hero_eyebrow": "IA de confiance pour l'Afrique",
  "hero_headline_1": "L'Intelligence Artificielle",
  "hero_headline_2": "au service de votre entreprise",
  "how_it_works_title": "Comment ça marche",
  "how_step_1_title": "Décrivez votre défi",
  "how_step_2_title": "Nous construisons votre solution",
  "how_step_3_title": "Lancez et évoluez",
  "stats_businesses": "Entreprises accompagnées",
  "stats_tools": "Outils déployés",
  "stats_trainings": "Formations dispensées",
  "stats_countries": "Pays",
  "cta_title": "Prêt à transformer votre entreprise?",
  "cta_button": "Commencer maintenant"
}
```

### Cleanup
- Remove `hero-africa.png` from `/public/` (or move to About page)
- Delete 3 unused components (AnimatedBackground, ConnectionsCounter, LanguageToggle)
- Tailwind purge already configured correctly — no changes needed

---

## Phase 5: Deployment

### Vercel (`vercel.json`)

Current config is already correct for Vite SPA. Add caching headers:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }],
  "headers": [
    {
      "source": "/assets/(.*)",
      "headers": [
        { "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }
      ]
    }
  ]
}
```

### Environment Variables
- `VITE_RAG_BACKEND_URL` — unchanged, keep pointing to Railway chatbot backend
- `VITE_CONTACT_API_URL` — add when contact form backend is ready

### Access Needed
| Platform | Required |
|---|---|
| GitHub | Repo URL + Personal Access Token (push access) |
| Vercel | Project name + team slug (or GitHub OAuth) |
| Railway | Project ID + `RAILWAY_TOKEN` (only if backend changes) |

---

## Critical Files

| File | Change Type |
|---|---|
| `tailwind.config.js` | Full replacement |
| `src/index.css` | Full replacement |
| `index.html` | Font imports cleanup |
| `src/pages/Home.tsx` | Full rewrite |
| `src/components/Header.tsx` | Light theme conversion |
| `src/components/Footer.tsx` | Light theme, static layout |
| `src/components/Card.tsx` | Remove glassmorphism |
| `src/components/Gallery.tsx` | Replace with Stats component |
| `src/pages/Solutions.tsx` | Light theme conversion |
| `src/pages/Formations.tsx` | Light theme conversion |
| `src/pages/Outils.tsx` | Light theme conversion |
| `src/pages/About.tsx` | Light theme conversion |
| `src/pages/Chatbot.tsx` | Light theme conversion |
| `src/locales/fr.json` | Add new i18n keys |
| `src/locales/en.json` | Add new i18n keys |
| `src/remotion/compositions/HeroAnimation.tsx` | NEW |
| `src/components/RemotionHeroPlayer.tsx` | NEW |
| `vercel.json` | Add caching headers |
