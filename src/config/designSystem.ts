/**
 * FitTrack Pro Design System
 * Consistent spacing, sizing, and layout values
 */

export const spacing = {
  xs: '4px',
  sm: '8px',
  md: '12px',
  base: '16px',
  lg: '20px',
  xl: '24px',
  '2xl': '32px',
  '3xl': '40px',
  '4xl': '48px',
  '5xl': '64px',
} as const;

export const borderRadius = {
  none: '0',
  sm: '4px',
  base: '8px',
  md: '12px',
  lg: '16px',
  xl: '20px',
  full: '9999px',
} as const;

export const fontSize = {
  xs: '12px',
  sm: '14px',
  base: '16px',
  lg: '18px',
  xl: '20px',
  '2xl': '24px',
  '3xl': '28px',
  '4xl': '32px',
  '5xl': '36px',
  '6xl': '40px',
} as const;

export const fontWeight = {
  normal: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
} as const;

export const lineHeight = {
  tight: '1.25',
  snug: '1.375',
  normal: '1.5',
  relaxed: '1.625',
  loose: '2',
} as const;

export const shadows = {
  none: 'none',
  sm: '0 1px 2px rgba(0, 0, 0, 0.05)',
  base: '0 2px 4px rgba(0, 0, 0, 0.08)',
  md: '0 2px 8px rgba(0, 0, 0, 0.1)',
  lg: '0 4px 12px rgba(0, 0, 0, 0.12)',
  xl: '0 8px 16px rgba(0, 0, 0, 0.15)',
} as const;

export const breakpoints = {
  mobile: '320px',
  tablet: '768px',
  desktop: '1024px',
  wide: '1280px',
} as const;

export const layout = {
  // Container max widths
  maxWidth: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    full: '100%',
  },
  
  // Page padding
  pagePadding: {
    mobile: spacing.base,    // 16px
    tablet: spacing.xl,      // 24px
    desktop: spacing['2xl'], // 32px
  },
  
  // Card padding
  cardPadding: {
    sm: spacing.md,    // 12px
    base: spacing.base, // 16px
    lg: spacing.xl,    // 24px
  },
  
  // Section spacing (between major sections)
  sectionGap: {
    sm: spacing.lg,     // 20px
    base: spacing.xl,   // 24px
    lg: spacing['2xl'], // 32px
  },
  
  // Item spacing (between items in a list/grid)
  itemGap: {
    sm: spacing.sm,   // 8px
    base: spacing.md, // 12px
    lg: spacing.base, // 16px
  },
  
  // Header heights
  headerHeight: {
    mobile: '56px',
    desktop: '64px',
  },
  
  // Bottom navigation height
  bottomNavHeight: '64px',
  
  // Content area (accounts for header + bottom nav)
  contentMinHeight: 'calc(100vh - 64px - 64px)',
} as const;

export const colors = {
  brand: {
    burgundy: '#3a061a',
    pink: '#9a375b',
    coralRed: '#e6434c',
    warmSun: '#f7a36b',
    navyOcean: '#182137',
    armyGreen: '#2f2b20',
    skin: '#88412c',
    sand: '#f6ddcd',
  },
  gray: {
    900: '#171619',
    800: '#241f1f',
    500: '#847369',
    400: '#9e918a',
    300: '#d0bfb1',
    200: '#e8ddd3',
    100: '#f2e9e2',
  },
  semantic: {
    success: '#2f2b20',
    warning: '#f7a36b',
    error: '#e6434c',
    info: '#182137',
  },
  background: {
    primary: '#f2e9e2',
    secondary: '#f6ddcd',
    surface: '#ffffff',
  },
} as const;

// Helper function to get responsive padding
export const getResponsivePadding = () => ({
  paddingLeft: layout.pagePadding.mobile,
  paddingRight: layout.pagePadding.mobile,
  '@media (min-width: 768px)': {
    paddingLeft: layout.pagePadding.tablet,
    paddingRight: layout.pagePadding.tablet,
  },
  '@media (min-width: 1024px)': {
    paddingLeft: layout.pagePadding.desktop,
    paddingRight: layout.pagePadding.desktop,
  },
});

// Helper for consistent card styles
export const getCardStyles = () => ({
  backgroundColor: colors.background.surface,
  borderRadius: borderRadius.md,
  boxShadow: shadows.md,
  padding: layout.cardPadding.base,
});

// Helper for section spacing
export const getSectionSpacing = () => ({
  marginBottom: layout.sectionGap.base,
});
