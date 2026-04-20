import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { brand } from '../theme/designTokens';

/**
 * Pure color resolution — no hooks. NativeBase `Button` clones `leftIcon`; using
 * `useToken` inside icon components can trigger invalid hook / context errors.
 */
const GLYPH_COLORS: Record<string, string> = {
  white: '#ffffff',
  black: '#000000',
  'primary.100': '#ede9fe',
  'primary.400': '#a78bfa',
  'primary.600': brand.primary,
  'primary.700': '#6d28d9',
  'coolGray.400': '#9ca3af',
  'coolGray.600': '#52525b',
  'app.text': brand.text,
  'app.muted': brand.textMuted,
};

function resolveGlyphFill(color: string): string {
  if (color.startsWith('#')) {
    return color;
  }
  return GLYPH_COLORS[color] ?? color;
}

type GlyphProps = {
  size?: number;
  /** Theme token key (see GLYPH_COLORS) or hex `#rrggbb` */
  color?: string;
};

/** Matches NativeBase AddIcon path — explicit pixel size so SVG always lays out. */
export function GlyphPlus({ size = 20, color = 'primary.600' }: GlyphProps) {
  const fill = resolveGlyphFill(color);
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M13.25 10.75V2H10.75V10.75H2V13.25H10.75V22H13.25V13.25H22V10.75H13.25Z"
        fill={fill}
      />
    </Svg>
  );
}

export function GlyphMinus({ size = 20, color = 'coolGray.600' }: GlyphProps) {
  const fill = resolveGlyphFill(color);
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M22 10.5H2V13H22V10.5Z" fill={fill} />
    </Svg>
  );
}

export function GlyphSearch({ size = 20, color = 'primary.400' }: GlyphProps) {
  const fill = resolveGlyphFill(color);
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M21.9399 20.5624L15.4474 14.0699C16.4549 12.7675 16.9999 11.175 16.9999 9.49997C16.9999 7.49498 16.2174 5.61498 14.8024 4.19749C13.3874 2.78 11.5025 2 9.49997 2C7.49748 2 5.61248 2.7825 4.19749 4.19749C2.78 5.61248 2 7.49498 2 9.49997C2 11.5025 2.7825 13.3874 4.19749 14.8024C5.61248 16.2199 7.49498 16.9999 9.49997 16.9999C11.175 16.9999 12.765 16.4549 14.0674 15.4499L20.5599 21.9399C20.579 21.959 20.6016 21.9741 20.6264 21.9844C20.6513 21.9947 20.678 22 20.7049 22C20.7318 22 20.7585 21.9947 20.7834 21.9844C20.8083 21.9741 20.8309 21.959 20.8499 21.9399L21.9399 20.8524C21.959 20.8334 21.9741 20.8108 21.9844 20.7859C21.9947 20.761 22 20.7343 22 20.7074C22 20.6805 21.9947 20.6538 21.9844 20.6289C21.9741 20.6041 21.959 20.5815 21.9399 20.5624ZM13.46 13.46C12.4 14.5174 10.995 15.0999 9.49997 15.0999C8.00497 15.0999 6.59998 14.5174 5.53998 13.46C4.48249 12.4 3.89999 10.995 3.89999 9.49997C3.89999 8.00497 4.48249 6.59748 5.53998 5.53998C6.59998 4.48249 8.00497 3.89999 9.49997 3.89999C10.995 3.89999 12.4025 4.47999 13.46 5.53998C14.5174 6.59998 15.0999 8.00497 15.0999 9.49997C15.0999 10.995 14.5174 12.4025 13.46 13.46Z"
        fill={fill}
      />
    </Svg>
  );
}

export function GlyphChevronRight({ size = 20, color = 'coolGray.400' }: GlyphProps) {
  const fill = resolveGlyphFill(color);
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M6 3.77141L14.3785 12.0027L6.00268 20.2314L7.80293 22L18 12L7.80293 2L6 3.77141Z"
        fill={fill}
      />
    </Svg>
  );
}
