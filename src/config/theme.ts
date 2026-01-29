import { createTheme } from 'baseui';

export const customTheme = createTheme({
  colors: {
    // Primary colors
    buttonPrimaryFill: '#e6434c',
    buttonPrimaryHover: '#9a375b',
    buttonPrimaryActive: '#3a061a',
    buttonPrimaryText: '#ffffff',
    buttonPrimarySelectedFill: '#9a375b',
    buttonPrimarySelectedText: '#ffffff',
    buttonPrimarySpinnerForeground: '#ffffff',
    buttonPrimarySpinnerBackground: '#9a375b',
    
    // Input colors
    inputBorder: '#d0bfb1',
    inputFill: '#f2e9e2',
    inputFillActive: '#ffffff',
    inputFillPositive: '#ffffff',
    inputFillError: '#ffffff',
    inputTextDisabled: '#9e918a',
    
    // Background colors
    backgroundPrimary: '#f2e9e2',
    backgroundSecondary: '#f6ddcd',
    backgroundTertiary: '#ffffff',
    
    // Content colors
    contentPrimary: '#171619',
    contentSecondary: '#847369',
    contentTertiary: '#9e918a',
    
    // Border colors
    borderOpaque: '#d0bfb1',
    borderSelected: '#e6434c',
    
    // Accent colors
    accent: '#e6434c',
    accent50: '#f6ddcd',
    accent100: '#f7a36b',
    accent200: '#9a375b',
    accent300: '#e6434c',
    accent400: '#3a061a',
    accent500: '#3a061a',
    accent600: '#3a061a',
    accent700: '#3a061a',
    
    // Negative (error) colors
    negative: '#e6434c',
    negative50: '#fee',
    negative400: '#e6434c',
    
    // Warning colors
    warning: '#f7a36b',
    warning400: '#f7a36b',
    
    // Positive (success) colors  
    positive: '#2f2b20',
    positive400: '#2f2b20',
  },
  typography: {
    font100: {
      fontFamily: 'Inter, sans-serif',
      fontSize: '12px',
      fontWeight: 400,
      lineHeight: '16px',
    },
    font150: {
      fontFamily: 'Inter, sans-serif',
      fontSize: '12px',
      fontWeight: 500,
      lineHeight: '16px',
    },
    font200: {
      fontFamily: 'Inter, sans-serif',
      fontSize: '14px',
      fontWeight: 400,
      lineHeight: '20px',
    },
    font250: {
      fontFamily: 'Inter, sans-serif',
      fontSize: '14px',
      fontWeight: 500,
      lineHeight: '20px',
    },
    font300: {
      fontFamily: 'Inter, sans-serif',
      fontSize: '16px',
      fontWeight: 400,
      lineHeight: '24px',
    },
    font350: {
      fontFamily: 'Inter, sans-serif',
      fontSize: '16px',
      fontWeight: 500,
      lineHeight: '24px',
    },
    font400: {
      fontFamily: 'Inter, sans-serif',
      fontSize: '18px',
      fontWeight: 400,
      lineHeight: '28px',
    },
    font450: {
      fontFamily: 'Inter, sans-serif',
      fontSize: '18px',
      fontWeight: 500,
      lineHeight: '28px',
    },
    font550: {
      fontFamily: 'Ubuntu, sans-serif',
      fontSize: '20px',
      fontWeight: 400,
      lineHeight: '28px',
    },
    font650: {
      fontFamily: 'Ubuntu, sans-serif',
      fontSize: '24px',
      fontWeight: 400,
      lineHeight: '32px',
    },
    font750: {
      fontFamily: 'Ubuntu, sans-serif',
      fontSize: '28px',
      fontWeight: 400,
      lineHeight: '36px',
    },
    font850: {
      fontFamily: 'Ubuntu, sans-serif',
      fontSize: '32px',
      fontWeight: 400,
      lineHeight: '40px',
    },
    font950: {
      fontFamily: 'Ubuntu, sans-serif',
      fontSize: '36px',
      fontWeight: 400,
      lineHeight: '44px',
    },
    font1050: {
      fontFamily: 'Ubuntu, sans-serif',
      fontSize: '40px',
      fontWeight: 400,
      lineHeight: '52px',
    },
    ParagraphXSmall: {
      fontFamily: 'Inter, sans-serif',
      fontSize: '12px',
      fontWeight: 400,
      lineHeight: '16px',
    },
    ParagraphSmall: {
      fontFamily: 'Inter, sans-serif',
      fontSize: '14px',
      fontWeight: 400,
      lineHeight: '20px',
    },
    ParagraphMedium: {
      fontFamily: 'Inter, sans-serif',
      fontSize: '16px',
      fontWeight: 400,
      lineHeight: '24px',
    },
    ParagraphLarge: {
      fontFamily: 'Inter, sans-serif',
      fontSize: '18px',
      fontWeight: 400,
      lineHeight: '28px',
    },
    HeadingXSmall: {
      fontFamily: 'Ubuntu, sans-serif',
      fontSize: '20px',
      fontWeight: 400,
      lineHeight: '28px',
    },
    HeadingSmall: {
      fontFamily: 'Ubuntu, sans-serif',
      fontSize: '24px',
      fontWeight: 400,
      lineHeight: '32px',
    },
    HeadingMedium: {
      fontFamily: 'Ubuntu, sans-serif',
      fontSize: '28px',
      fontWeight: 400,
      lineHeight: '36px',
    },
    HeadingLarge: {
      fontFamily: 'Ubuntu, sans-serif',
      fontSize: '32px',
      fontWeight: 400,
      lineHeight: '40px',
    },
    HeadingXLarge: {
      fontFamily: 'Ubuntu, sans-serif',
      fontSize: '36px',
      fontWeight: 400,
      lineHeight: '44px',
    },
    HeadingXXLarge: {
      fontFamily: 'Ubuntu, sans-serif',
      fontSize: '40px',
      fontWeight: 400,
      lineHeight: '52px',
    },
  },
  primaryFontFamily: 'Inter, sans-serif',
});
