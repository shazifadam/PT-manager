/**
 * FitTrack Pro Design Tokens
 * Single source of truth for all design values
 * Mobile app style with Figtree headings and Inter body
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
  500: '#847369',
  400: '#9e918a',
  300: '#d0bfb1',
  200: '#e8ddd3',
  100: '#f2e9e2',
  white: '#ffffff',
} as const;

// Gradient Colors (for header)
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

// Typography Scale - Mobile app style
export const fontSize = {
  xs: '11px',       // Micro text
  sm: '13px',       // Small labels
  base: '15px',     // Body text
  lg: '17px',       // Emphasized text
  xl: '20px',       // Section headers
  '2xl': '24px',    // Card titles
  '3xl': '28px',    // Page titles
  '4xl': '34px',    // Large display
  '5xl': '40px',    // Hero text
} as const;

export const fontWeight = {
  normal: '400',    // Figtree/Inter Regular
  medium: '500',
  semibold: '600',
  bold: '700',
} as const;

export const lineHeight = {
  tight: '1.2',     // Headlines
  snug: '1.3',      // Subheadings
  normal: '1.4',    // UI text
  relaxed: '1.5',   // Body text
  loose: '1.6',     // Long form
} as const;

// Font Families
export const fontFamily = {
  heading: 'Figtree, -apple-system, system-ui, sans-serif',  // Headings - Figtree 400
  body: 'Inter, -apple-system, system-ui, sans-serif',       // Body - Inter 400
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
