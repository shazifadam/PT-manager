/**
 * FitTrack Pro Design Tokens
 * Typography: Minor Third Scale (1.2 ratio) - Base 16px
 */

// Brand Colors (use sparingly - Apple Health style)
export const brand = {
  burgundy: '#3a061a',
  pink: '#9a375b',
  coralRed: '#e6434c',
  warmSun: '#f7a36b',
  navyOcean: '#182137',
  armyGreen: '#2f2b20',
  skin: '#88412c',
  sand: '#f6ddcd',
} as const;

// Gray Scale (primary UI palette)
export const gray = {
  900: '#171619',
  800: '#241f1f',
  700: '#3d3936',
  600: '#666666',
  500: '#847369',
  400: '#9e918a',
  300: '#d0bfb1',
  200: '#e8ddd3',
  100: '#f2e9e2',
  50: '#f8f8f8',
  white: '#ffffff',
} as const;

// Gradient Colors (for header - optional)
export const gradient = {
  start: '#fad0c4',
  mid1: '#ffd1a9',
  mid2: '#ffecd2',
  end: '#f5f5f5',
} as const;

// Program/Tag Colors
export const programColors = {
  strength: '#E3F2FD',      // Light blue
  bodyTrans: '#FCE4EC',     // Light pink
  rehab: '#FFF3E0',         // Light orange
  athlete: '#E8F5E9',       // Light green
  netbees: '#F3E5F5',       // Light purple
  volley: '#FFF9C4',        // Light yellow
  weightLoss: '#FFEBEE',    // Light red
} as const;

// Semantic Colors (Apple Health style - minimal usage)
export const semantic = {
  // Backgrounds - Light gray page, white surfaces
  bg: '#f5f5f5',           // Page background (light gray)
  surface: '#ffffff',       // Card/modal surfaces (white)
  surfaceAlt: '#fafafa',   // Alternative surface
  
  // Text
  text: gray[900],
  textMuted: gray[500],
  textLight: gray[600],
  
  // Borders - Subtle
  border: '#e0e0e0',
  borderStrong: '#d0d0d0',
  
  // Status (use sparingly)
  success: brand.armyGreen,
  warning: brand.warmSun,
  danger: brand.coralRed,
  
  // Success states with backgrounds
  successBg: '#E5F8EA',
  warningBg: '#FFF4E5',
  dangerBg: '#FFE5E5',
  
  // Primary action
  primary: brand.coralRed,
  primaryHover: brand.pink,
  
  // Focus ring
  focus: brand.coralRed,
  focusRing: 'rgba(230, 67, 76, 0.2)',
} as const;

// Spacing Scale (px) - Apple-like generous spacing
export const spacing = {
  '0': '0px',
  '1': '4px',
  '2': '8px',
  '3': '12px',
  '4': '16px',
  '5': '20px',
  '6': '24px',
  '8': '32px',
  '10': '40px',
  '12': '48px',
} as const;

export type SpacingKey = keyof typeof spacing;

// Border Radius (Apple-like softness)
export const radius = {
  sm: '10px',
  md: '14px',
  lg: '18px',
  xl: '22px',
  full: '9999px',
} as const;

/**
 * Typography Scale - Minor Third (1.2 ratio)
 * Base: 16px
 * Formula: size = base * (ratio ^ step)
 * 
 * Scale:
 * -2: 11.11px (16 / 1.2^2)
 * -1: 13.33px (16 / 1.2)
 *  0: 16px    (base)
 *  1: 19.2px  (16 * 1.2)
 *  2: 23.04px (16 * 1.2^2)
 *  3: 27.65px (16 * 1.2^3)
 *  4: 33.18px (16 * 1.2^4)
 *  5: 39.81px (16 * 1.2^5)
 *  6: 47.78px (16 * 1.2^6)
 */
export const typeScale = {
  '-2': '0.694rem',   // 11.11px - Micro text, timestamps
  '-1': '0.833rem',   // 13.33px - Small labels, captions
  '0': '1rem',        // 16px    - Base body text
  '1': '1.2rem',      // 19.2px  - Emphasized body, large labels
  '2': '1.44rem',     // 23.04px - H4, small headings
  '3': '1.728rem',    // 27.65px - H3, section titles
  '4': '2.074rem',    // 33.18px - H2, page titles
  '5': '2.488rem',    // 39.81px - H1, hero text
  '6': '2.986rem',    // 47.78px - Display, hero large
} as const;

export type TypeScaleKey = keyof typeof typeScale;

// Deprecated: Use typeScale instead
// Keeping for backward compatibility during migration
export const fontSize = typeScale;

export const fontWeight = {
  normal: '400',    // Figtree Regular - body, paragraphs, subheadings
  medium: '500',    // Figtree Medium - headings, labels
  semibold: '600',
  bold: '700',
} as const;

export const lineHeight = {
  tight: '1.2',     // Headlines (scale 3+)
  snug: '1.3',      // Subheadings (scale 1-2)
  normal: '1.4',    // UI text (scale 0)
  relaxed: '1.5',   // Body text (scale 0)
  loose: '1.6',     // Long form (scale 0)
} as const;

// Font Families - Figtree throughout
export const fontFamily = {
  heading: 'Figtree, -apple-system, system-ui, sans-serif',  // Figtree Medium for headings
  body: 'Figtree, -apple-system, system-ui, sans-serif',     // Figtree Regular for body
  system: '-apple-system, system-ui, sans-serif',
} as const;

// Shadows (minimal - Apple Health prefers borders)
export const shadow = {
  none: 'none',
  subtle: '0 1px 3px rgba(0, 0, 0, 0.04)',
  soft: '0 2px 8px rgba(0, 0, 0, 0.06)',
  medium: '0 4px 12px rgba(0, 0, 0, 0.08)',
} as const;

// Borders
export const border = {
  width: {
    default: '1px',
    thick: '2px',
  },
  style: 'solid',
} as const;

// Layout
export const layout = {
  maxWidth: '1200px',
  pageHorizontalPadding: spacing['4'],
  pageVerticalPadding: spacing['6'],
  sectionSpacing: spacing['8'],
  cardPadding: spacing['5'],
} as const;

// Transitions (subtle, quick)
export const transition = {
  fast: '150ms ease',
  base: '200ms ease',
  slow: '300ms ease',
} as const;

// Z-index Scale
export const zIndex = {
  base: 1,
  dropdown: 1000,
  sticky: 1100,
  modal: 1200,
  popover: 1300,
  toast: 1400,
} as const;

/**
 * Typography Usage Guide:
 * 
 * typeScale['-2'] - Micro text, timestamps, helper text (11.11px)
 * typeScale['-1'] - Small labels, captions, metadata (13.33px)
 * typeScale['0']  - Body text, paragraphs, standard UI (16px)
 * typeScale['1']  - Emphasized text, large labels, card titles (19.2px)
 * typeScale['2']  - Small headings, subsection titles (23.04px)
 * typeScale['3']  - Section headings, modal titles (27.65px)
 * typeScale['4']  - Page titles, main headings (33.18px)
 * typeScale['5']  - Hero text, marketing headlines (39.81px)
 * typeScale['6']  - Display text, splash screens (47.78px)
 * 
 * Font Weights:
 * - fontWeight.normal (400) - All body text, paragraphs, descriptions
 * - fontWeight.medium (500) - All headings, labels, emphasized text
 */