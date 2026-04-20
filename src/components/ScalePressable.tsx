import React, { useRef } from 'react';
import { Animated, Pressable, PressableProps, StyleProp, ViewStyle } from 'react-native';

type Props = PressableProps & {
  children: React.ReactNode;
  scaleTo?: number;
  style?: StyleProp<ViewStyle>;
};

export function ScalePressable({
  children,
  scaleTo = 0.97,
  style,
  onPressIn,
  onPressOut,
  ...rest
}: Props) {
  const scale = useRef(new Animated.Value(1)).current;
  const opacity = useRef(new Animated.Value(1)).current;

  const handleIn: PressableProps['onPressIn'] = e => {
    Animated.parallel([
      Animated.spring(scale, {
        toValue: scaleTo,
        friction: 6,
        tension: 140,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 0.92,
        duration: 90,
        useNativeDriver: true,
      }),
    ]).start();
    onPressIn?.(e);
  };

  const handleOut: PressableProps['onPressOut'] = e => {
    Animated.parallel([
      Animated.spring(scale, {
        toValue: 1,
        friction: 5,
        tension: 160,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 120,
        useNativeDriver: true,
      }),
    ]).start();
    onPressOut?.(e);
  };

  return (
    <Pressable
      onPressIn={handleIn}
      onPressOut={handleOut}
      android_ripple={{ color: 'rgba(124, 58, 237, 0.12)', borderless: false }}
      {...rest}>
      <Animated.View style={[style, { transform: [{ scale }], opacity }]}>
        {children}
      </Animated.View>
    </Pressable>
  );
}
