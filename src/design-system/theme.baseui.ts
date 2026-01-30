/**
 * Base UI Theme Configuration
 * Following Uber's Base UI design system standards
 * Light gray background with white cards
 * Figtree 400 for headings, Inter 400 for body
 */

import { createTheme, lightThemePrimitives } from 'baseui';
import { semantic, gray, brand } from './tokens';

export const fittrackTheme = createTheme({
  ...lightThemePrimitives,
  
  // Primary Colors
  primary: semantic.primary,
  primary50: '#FFE5E7',
  primary100: '#FFCCCE',
  primary200: '#FF999D',
  primary300: '#FF666C',
  primary400: '#FF333B',
  primary500: semantic.primary,
  primary600: '#B8363D',
  primary700: '#8A282E',
  
  // Accent
  accent: semantic.primary,
  accent50: '#FFE5E7',
  accent100: '#FFCCCE',
  accent200: '#FF999D',
  accent300: '#FF666C',
  accent400: '#FF333B',
  accent500: semantic.primary,
  accent600: '#B8363D',
  accent700: '#8A282E',
  
  // Negative (Errors)
  negative: semantic.danger,
  negative50: semantic.dangerBg,
  negative100: semantic.dangerBg,
  negative200: '#FFB3B3',
  negative300: '#FF8080',
  negative400: '#FF4D4D',
  negative500: semantic.danger,
  negative600: '#CC1A1A',
  negative700: '#990000',
  
  // Warning
  warning: semantic.warning,
  warning50: semantic.warningBg,
  warning100: semantic.warningBg,
  warning200: '#FFD699',
  warning300: '#FFC266',
  warning400: '#FFAD33',
  warning500: semantic.warning,
  warning600: '#CC8656',
  warning700: '#996541',
  
  // Positive (Success)
  positive: semantic.success,
  positive50: semantic.successBg,
  positive100: semantic.successBg,
  positive200: '#8FD9A0',
  positive300: '#6BC97F',
  positive400: '#47B95E',
  positive500: semantic.success,
  positive600: '#257520',
  positive700: '#1C5818',
  
  // Mono (Grays)
  mono100: '#ffffff',
  mono200: '#f5f5f5',
  mono300: '#e0e0e0',
  mono400: '#bdbdbd',
  mono500: '#9e9e9e',
  mono600: '#757575',
  mono700: '#616161',
  mono800: '#424242',
  mono900: '#212121',
  mono1000: '#000000',
  
  // Primary Font - Figtree for headings
  primaryFontFamily: 'Figtree, -apple-system, system-ui, sans-serif',
  
  // Backgrounds
  backgroundPrimary: '#f5f5f5',
  backgroundSecondary: '#ffffff',
  backgroundTertiary: '#fafafa',
  
  // Content/Text
  contentPrimary: semantic.text,
  contentSecondary: semantic.textMuted,
  contentTertiary: gray[400],
  
  // Borders
  borderOpaque: '#e0e0e0',
  borderSelected: semantic.primary,
} as any);
