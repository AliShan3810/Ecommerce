import React, { useEffect, useRef } from 'react';
import { Animated, StyleProp, ViewStyle } from 'react-native';

type Props = {
  children: React.ReactNode;
  visible: boolean;
  style?: StyleProp<ViewStyle>;
  duration?: number;
};

export function FadeView({ children, visible, style, duration = 220 }: Props) {
  const opacity = useRef(new Animated.Value(visible ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: visible ? 1 : 0,
      duration,
      useNativeDriver: true,
    }).start();
  }, [visible, duration, opacity]);

  return (
    <Animated.View style={[style, { opacity }]} pointerEvents={visible ? 'auto' : 'none'}>
      {children}
    </Animated.View>
  );
}
