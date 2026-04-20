import React, { useId } from 'react';
import { View } from 'react-native';
import Svg, { Defs, LinearGradient, Path, Stop } from 'react-native-svg';
import { brand } from '../theme/designTokens';

type Props = {
  visible: boolean;
  /** 'tab' = soft dome behind side tabs; 'fab' = halo behind center cart */
  variant?: 'tab' | 'fab';
};

const TW = 76;
const TH = 24;
const FW = 84;
const FH = 40;

/**
 * Subtle curved highlight for the active tab — gradient fill + soft stroke.
 */
export function ActiveTabNotch({ visible, variant = 'tab' }: Props) {
  const gid = useId().replace(/:/g, '');

  if (!visible) {
    return null;
  }

  if (variant === 'fab') {
    const gradId = `fab${gid}`;
    return (
      <View
        pointerEvents="none"
        style={{
          position: 'absolute',
          top: -8,
          alignSelf: 'center',
          width: FW,
          height: FH,
        }}>
        <Svg width={FW} height={FH} viewBox={`0 0 ${FW} ${FH}`}>
          <Defs>
            <LinearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
              <Stop offset="0" stopColor={brand.primary} stopOpacity={0.32} />
              <Stop offset="0.5" stopColor={brand.primaryLight} stopOpacity={0.1} />
              <Stop offset="1" stopColor={brand.primary} stopOpacity={0} />
            </LinearGradient>
          </Defs>
          <Path d={`M0 ${FH} Q ${FW / 2} 0 ${FW} ${FH} Z`} fill={`url(#${gradId})`} />
          <Path
            d={`M0 ${FH} Q ${FW / 2} 2 ${FW} ${FH}`}
            fill="none"
            stroke={brand.primary}
            strokeWidth={1.2}
            strokeOpacity={0.25}
          />
        </Svg>
      </View>
    );
  }

  const gradId = `tab${gid}`;
  return (
    <View
      pointerEvents="none"
      style={{
        position: 'absolute',
        top: -20,
        left: 0,
        right: 0,
        alignItems: 'center',
        height: TH,
      }}>
      <Svg width={TW} height={TH} viewBox={`0 0 ${TW} ${TH}`}>
        <Defs>
          <LinearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0" stopColor={brand.primary} stopOpacity={0.16} />
            <Stop offset="0.55" stopColor={brand.primaryLight} stopOpacity={0.08} />
            <Stop offset="1" stopColor={brand.primary} stopOpacity={0} />
          </LinearGradient>
        </Defs>
        <Path d={`M0 ${TH} Q ${TW / 2} 0 ${TW} ${TH} Z`} fill={`url(#${gradId})`} />
        <Path
          d={`M0 ${TH} Q ${TW / 2} 1.5 ${TW} ${TH}`}
          fill="none"
          stroke={brand.primary}
          strokeWidth={1.2}
          strokeOpacity={0.3}
        />
      </Svg>
    </View>
  );
}
