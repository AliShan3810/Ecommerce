import React from 'react';
import Svg, { Path } from 'react-native-svg';

export type TabIconProps = {
  color: string;
  size?: number;
  strokeWidth?: number;
};

/**
 * Minimal outline icons (24×24) for the curved tab bar — consistent stroke caps for a polished look.
 */
export function TabIconHome({ color, size = 22, strokeWidth = 1.75 }: TabIconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="m2.25 12 8.954-8.955c.302-.302.793-.302 1.095 0L21.75 12M4.5 9.75V19.5c0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75v-4.875a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V19.5a.75.75 0 0 0 .75.75h4.5a.75.75 0 0 0 .75-.75V9.75M8.25 21h8.25"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

/** Search / explore — common for storefront browse. */
export function TabIconExplore({ color, size = 22, strokeWidth = 1.75 }: TabIconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM21 21l-4.3-4.3"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function TabIconCart({ color, size = 22, strokeWidth = 1.75 }: TabIconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M9 8.25V6a3 3 0 0 1 3-3v0a3 3 0 0 1 3 3v2.25M4.5 8.25h15l-1.28 8.55a1.5 1.5 0 0 1-1.48 1.27H7.26a1.5 1.5 0 0 1-1.48-1.27L4.5 8.25Z"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function TabIconOrders({ color, size = 22, strokeWidth = 1.75 }: TabIconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function TabIconProfile({ color, size = 22, strokeWidth = 1.75 }: TabIconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M15.75 7.5a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.5 19.125a7.125 7.125 0 0 1 14.25 0"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
