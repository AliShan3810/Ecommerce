import { extendTheme } from 'native-base';

/**
 * Boutique-style palette: violet primary, warm amber accents, cool slate surfaces.
 */
export const appTheme = extendTheme({
  config: {
    initialColorMode: 'light',
  },
  colors: {
    /** Ensures `useToken('colors', 'white')` resolves for SVG glyph fills. */
    white: '#ffffff',
    primary: {
      50: '#f5f3ff',
      100: '#ede9fe',
      200: '#ddd6fe',
      300: '#c4b5fd',
      400: '#a78bfa',
      500: '#8b5cf6',
      600: '#7c3aed',
      700: '#6d28d9',
      800: '#5b21b6',
      900: '#4c1d95',
    },
    secondary: {
      50: '#fffbeb',
      100: '#fef3c7',
      200: '#fde68a',
      300: '#fcd34d',
      400: '#fbbf24',
      500: '#f59e0b',
      600: '#d97706',
      700: '#b45309',
      800: '#92400e',
      900: '#78350f',
    },
    app: {
      canvas: '#f1f5f9',
      surface: '#ffffff',
      border: '#e2e8f0',
      text: '#0f172a',
      muted: '#64748b',
    },
  },
  radii: {
    xl: 16,
    '2xl': 20,
    '3xl': 24,
  },
  components: {
    Button: {
      defaultProps: {
        colorScheme: 'primary',
        borderRadius: 'xl',
        _pressed: { opacity: 0.9 },
      },
    },
  },
});
