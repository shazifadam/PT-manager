/**
 * FitTrack Pro Design System - Apple Health Inspired
 * Clean, modern, iOS-style design
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
  sm: '6px',
  base: '10px',
  md: '14px',
  lg: '18px',
  xl: '22px',
  full: '9999px',
} as const;

export const fontSize = {
  xs: '11px',
  sm: '13px',
  base: '15px',
  lg: '17px',
  xl: '20px',
  '2xl': '24px',
  '3xl': '28px',
  '4xl': '34px',
  '5xl': '40px',
  '6xl': '48px',
} as const;

export const fontWeight = {
  normal: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
} as const;

export const lineHeight = {
  tight: '1.2',
  snug: '1.3',
  normal: '1.4',
  relaxed: '1.5',
  loose: '1.6',
} as const;

// Apple-style shadows - softer and more subtle
export const shadows = {
  none: 'none',
  sm: '0 1px 3px rgba(0, 0, 0, 0.04)',
  base: '0 2px 8px rgba(0, 0, 0, 0.06)',
  md: '0 4px 12px rgba(0, 0, 0, 0.08)',
  lg: '0 8px 20px rgba(0, 0, 0, 0.10)',
  xl: '0 12px 28px rgba(0, 0, 0, 0.12)',
} as const;

export const breakpoints = {
  mobile: '320px',
  tablet: '768px',
  desktop: '1024px',
  wide: '1280px',
} as const;

export const layout = {
  maxWidth: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    full: '100%',
  },
  
  pagePadding: {
    mobile: spacing.base,
    tablet: spacing.xl,
    desktop: spacing['2xl'],
  },
  
  cardPadding: {
    sm: spacing.base,
    base: spacing.lg,
    lg: spacing.xl,
  },
  
  sectionGap: {
    sm: spacing.base,
    base: spacing.lg,
    lg: spacing.xl,
  },
  
  itemGap: {
    sm: spacing.sm,
    base: spacing.md,
    lg: spacing.base,
  },
  
  headerHeight: {
    mobile: '56px',
    desktop: '64px',
  },
  
  bottomNavHeight: '64px',
  
  contentMinHeight: 'calc(100vh - 64px - 64px)',
} as const;

// Apple Health inspired color palette
export const colors = {
  brand: {
    burgundy: '#3a061a',
    pink: '#FF2D55',        // Apple Health pink
    coralRed: '#FF3B30',    // Apple red
    warmSun: '#FF9500',     // Apple orange
    navyOcean: '#007AFF',   // Apple blue
    armyGreen: '#34C759',   // Apple green
    skin: '#88412c',
    sand: '#f6ddcd',
  },
  gray: {
    900: '#1C1C1E',         // Apple dark
    800: '#2C2C2E',
    700: '#3A3A3C',
    600: '#48484A',
    500: '#8E8E93',
    400: '#AEAEB2',
    300: '#C7C7CC',
    200: '#D1D1D6',
    100: '#F2F2F7',         // Apple light gray
  },
  // Apple Health semantic colors
  semantic: {
    success: '#34C759',      // Apple green
    successLight: '#E5F8EA',
    warning: '#FF9500',      // Apple orange
    warningLight: '#FFF4E5',
    error: '#FF3B30',        // Apple red
    errorLight: '#FFE5E5',
    info: '#007AFF',         // Apple blue
    infoLight: '#E5F1FF',
  },
  background: {
    primary: '#F2F2F7',      // Apple light background
    secondary: '#FFFFFF',
    tertiary: '#E5E5EA',
    surface: '#FFFFFF',
    overlay: 'rgba(0, 0, 0, 0.4)',
  },
  // Apple Health activity ring colors
  rings: {
    move: '#FF2D55',         // Pink
    exercise: '#A0FF2D',     // Green
    stand: '#00FFD9',        // Cyan
  },
  // Softer pastel colors for tags (Apple Health style)
  softPastels: {
    lavender: '#E8E1FF',
    mint: '#D4F4DD',
    peach: '#FFE4D9',
    sky: '#D9EEFF',
    rose: '#FFE0EB',
    cream: '#FFF4E0',
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

// Apple-style card with subtle shadow and border
export const getCardStyles = () => ({
  backgroundColor: colors.background.surface,
  borderRadius: borderRadius.md,
  boxShadow: shadows.base,
  border: `0.5px solid ${colors.gray[200]}`,
  padding: layout.cardPadding.base,
});

// Helper for section spacing
export const getSectionSpacing = () => ({
  marginBottom: layout.sectionGap.base,
});
