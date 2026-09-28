---
name: Athletic Excellence
colors:
  surface: '#f7fafd'
  surface-dim: '#d7dadd'
  surface-bright: '#f7fafd'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f1f4f7'
  surface-container: '#ebeef1'
  surface-container-high: '#e5e8eb'
  surface-container-highest: '#e0e3e6'
  on-surface: '#181c1e'
  on-surface-variant: '#434653'
  inverse-surface: '#2d3133'
  inverse-on-surface: '#eef1f4'
  outline: '#747685'
  outline-variant: '#c4c6d6'
  surface-tint: '#2856c7'
  primary: '#0041b3'
  on-primary: '#ffffff'
  primary-container: '#2e5bcc'
  on-primary-container: '#d7dfff'
  inverse-primary: '#b4c5ff'
  secondary: '#825500'
  on-secondary: '#ffffff'
  secondary-container: '#feb23d'
  on-secondary-container: '#6e4700'
  tertiary: '#4c4b4b'
  on-tertiary: '#ffffff'
  tertiary-container: '#646363'
  on-tertiary-container: '#e2e0df'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dbe1ff'
  primary-fixed-dim: '#b4c5ff'
  on-primary-fixed: '#00174c'
  on-primary-fixed-variant: '#003da9'
  secondary-fixed: '#ffddb4'
  secondary-fixed-dim: '#ffb953'
  on-secondary-fixed: '#291800'
  on-secondary-fixed-variant: '#633f00'
  tertiary-fixed: '#e5e2e1'
  tertiary-fixed-dim: '#c8c6c5'
  on-tertiary-fixed: '#1c1b1b'
  on-tertiary-fixed-variant: '#474746'
  background: '#f7fafd'
  on-background: '#181c1e'
  surface-variant: '#e0e3e6'
typography:
  display-lg:
    fontFamily: Anybody
    fontSize: 64px
    fontWeight: '800'
    lineHeight: 72px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Anybody
    fontSize: 40px
    fontWeight: '700'
    lineHeight: 48px
  headline-lg-mobile:
    fontFamily: Anybody
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
  headline-md:
    fontFamily: Anybody
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Hanken Grotesk
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Hanken Grotesk
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-md:
    fontFamily: JetBrains Mono
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
    letterSpacing: 0.05em
  button-text:
    fontFamily: Anybody
    fontSize: 16px
    fontWeight: '700'
    lineHeight: 16px
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  base: 8px
  xs: 4px
  sm: 12px
  md: 24px
  lg: 48px
  xl: 80px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 64px
---

## Brand & Style

This design system is engineered for high-performance sports organizations and educational institutions. It translates the kinetic energy of the reference image—characterized by synchronized movement and bold team colors—into a digital experience that feels disciplined, energetic, and professional.

The visual style is a blend of **Corporate Modern** and **High-Contrast Bold**. It prioritizes clarity and impact, using strong structural lines, intentional whitespace, and a "team-first" aesthetic. The goal is to evoke a sense of pride, momentum, and institutional reliability. 

Key principles:
- **Kinetic Structure:** Use of diagonal accents or "speed lines" in backgrounds to mimic the jersey patterns.
- **Precision:** Tight alignment and consistent geometry to reflect the discipline of a marching or athletic unit.
- **Authority:** Bold typographic scales that command attention and communicate leadership.

## Colors

The palette is derived directly from the athletic uniforms in the reference image, optimized for digital accessibility.

- **Athletic Blue (Primary):** A vibrant, deep royal blue that serves as the foundation for action items, headers, and primary branding. It represents stability and professional excellence.
- **Golden Yellow (Secondary):** A bright, high-energy gold used sparingly for highlights, secondary call-to-actions, and status indicators. It provides a sharp contrast that draws the eye to critical information.
- **Deep Onyx (Tertiary):** Used for primary text and high-contrast UI elements. It ensures readability and adds a grounded, serious tone.
- **Cool Slate (Neutral):** A range of cool greys used for backgrounds, borders, and subtle containment, maintaining a clean and modern workspace.

## Typography

The typography strategy focuses on the "Power-Utility" duo. 

**Anybody** is used for headlines. Its variable width and bold weights feel flexible and athletic, reminiscent of collegiate jersey numbering. It should be used in all-caps for high-impact sections.

**Hanken Grotesk** handles the body copy. It is a sharp, contemporary sans-serif that maintains a professional and highly readable tone even in data-heavy layouts.

**JetBrains Mono** is utilized for labels, technical data, and metadata. This monospaced choice introduces a "technical/coaching" feel, suggesting precision and data-driven performance.

## Layout & Spacing

The design system utilizes a **Fluid Grid** with an 8px base unit to ensure a mathematical, "coached" rhythm.

- **Desktop (1440px+):** 12-column grid, 64px side margins, 24px gutters.
- **Tablet (768px - 1439px):** 8-column grid, 32px side margins, 20px gutters.
- **Mobile (Up to 767px):** 4-column grid, 16px side margins, 16px gutters.

Spacing should be generous to maintain a premium, professional feel. Avoid overcrowding elements; instead, use the `lg` (48px) and `xl` (80px) units to create distinct sections of content, mimicking the "lanes" of an athletic track.

## Elevation & Depth

To maintain a crisp, athletic look, this system avoids heavy shadows. Instead, it uses **Tonal Layers** and **Low-Contrast Outlines**.

- **Surface 0 (Background):** Neutral cool grey (#F4F7FA).
- **Surface 1 (Cards/Sections):** Pure White (#FFFFFF) with a 1px solid border in a light neutral.
- **Surface 2 (Interactive):** When hovered, elements should not lift with shadows but rather shift in color (Primary Blue) or gain a subtle, sharp secondary-colored accent border.

If depth is required for modals, use a "Hard Shadow" style: a 4px offset with 0 blur and 100% opacity in a muted blue tint, creating a 2D-stacked effect rather than a realistic 3D one.

## Motion

Motion here is athletic: deliberate, synchronised, and over before it draws attention to itself. Nothing bounces, nothing floats, and nothing loops fast enough to be noticed twice.

### The scale

One easing curve and three speeds. There are no other durations — a value that is not on this scale is a bug.

- `--ease-athletic` — `cubic-bezier(0.2, 0, 0, 1)`. Fast out of the gate, settling gently. The only curve in the system.
- **Fast (150ms)** — colour and border state changes. Hovers, focus rings, chips.
- **Base (300ms)** — transforms, popups, disclosure, scroll reveals.
- **Slow (450ms)** — full-width surfaces: the drawer, page slides.

These live as `--transition-duration-fast|base|slow` in `globals.css` (Tailwind reads `duration-*` from that namespace) and are mirrored in seconds in `src/lib/motion.ts` for the JavaScript layer. Change one, change the other.

### Hover never lifts

Restating the rule from **Elevation & Depth** because it is the one most often broken: an interactive element responds by **shifting colour or gaining a sharp accent**, never by rising on a shadow. `hover:shadow-lg` and `hover:-translate-y-1` are out of bounds. On a card the response is the border going Athletic Blue and the Team Stripe wiping in Golden Yellow from the left.

### Entrances

Content fades up 24px as it first scrolls into view, and only the first time — a section that has arrived stays arrived. Grids and lists stagger their cells 70ms apart, which is close enough to read as one unit moving together rather than a wave passing through it. Only blocks that start below the viewport on load are hidden; anything already on screen — including an anchor-nav target — shows as-is, never faded from opacity 0.

Above-the-fold imagery never animates. The hero photograph is the largest contentful paint and has to be there on the first frame.

### What may move

Only `opacity`, `translate`, `scale`, `filter`, and colour. Anything else — height, width, margin, `background-position` — forces layout or a repaint every frame and is not permitted in a keyframe. `will-change` is not applied speculatively.

### Reduced motion

Every animation is decoration over content that is already there, and it degrades in three directions:

- **`prefers-reduced-motion: reduce`** collapses durations to `0.01ms` rather than removing animations, because Base UI's drawer and navigation menu wait on animation events before they unmount. The JavaScript layer is governed separately by `MotionConfig reducedMotion="user"`, which keeps the fade and drops the movement.
- **No JavaScript** — reveal blocks are server-rendered visible; nothing is hidden until the client decides to hide what's off-screen, so there's nothing for a no-JS visitor to miss.
- **No View Transitions support** — the page simply cuts, as it did before.

Content must never be permanently invisible because an animation did not run.

## Shapes

The shape language is **Soft (0.25rem)**. This slight rounding provides a professional, modern feel without the "friendliness" of fully rounded corners. It maintains a sharp, disciplined silhouette.

- **Standard Elements:** 4px radius (Buttons, Inputs, small components).
- **Containers:** 8px radius (Cards, Modals).
- **Feature Elements:** Use 0px (Sharp) for decorative accents or "speed line" background graphics to emphasize speed and precision.

## Components

### Buttons
Primary buttons use the Athletic Blue background with White text in `button-text` style (Bold, Uppercase). They feature a sharp 4px radius. Secondary buttons should use an Athletic Blue outline with a Golden Yellow hover state.

### Chips & Tags
Used for player status or categories. Use JetBrains Mono for the font. For "Active" or "Highlighted" states, use the Golden Yellow background with black text to ensure high visibility.

### Input Fields
Clean, 1px bordered boxes using the `body-md` font. The focus state should be a 2px Athletic Blue border. Error states should avoid red if possible, instead using a high-contrast version of the brand palette with a dedicated error icon.

### Cards
Cards are white with a subtle 1px border. A 4px thick "Team Stripe" (using the Primary or Secondary color) should be placed at the top or left edge of the card to create visual categorization.

### Progress Bars
Utilize the Golden Yellow for the progress fill against a light blue background. This mimics the high-visibility gear used in sports training.