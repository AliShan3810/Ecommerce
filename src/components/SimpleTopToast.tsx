import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Animated, StyleSheet, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { brand } from '../theme/designTokens';

type ToastPayload = { title: string; subtitle?: string };

type SimpleTopToastContextValue = {
  show: (title: string, subtitle?: string) => void;
};

const SimpleTopToastContext = createContext<SimpleTopToastContextValue | null>(
  null,
);

export function SimpleTopToastProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const insets = useSafeAreaInsets();
  const [payload, setPayload] = useState<ToastPayload | null>(null);
  const opacity = useRef(new Animated.Value(0)).current;
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const show = useCallback((title: string, subtitle?: string) => {
    if (hideTimer.current) {
      clearTimeout(hideTimer.current);
      hideTimer.current = null;
    }
    setPayload({ title, subtitle });
  }, []);

  useEffect(() => {
    if (!payload) {
      return;
    }
    opacity.setValue(0);
    Animated.timing(opacity, {
      toValue: 1,
      duration: 180,
      useNativeDriver: true,
    }).start();

    hideTimer.current = setTimeout(() => {
      Animated.timing(opacity, {
        toValue: 0,
        duration: 220,
        useNativeDriver: true,
      }).start(({ finished }) => {
        if (finished) {
          setPayload(null);
        }
      });
      hideTimer.current = null;
    }, 2000);

    return () => {
      if (hideTimer.current) {
        clearTimeout(hideTimer.current);
        hideTimer.current = null;
      }
    };
  }, [payload, opacity]);

  return (
    <SimpleTopToastContext.Provider value={{ show }}>
      {children}
      {payload ? (
        <Animated.View
          pointerEvents="none"
          style={[
            styles.box,
            { top: insets.top + 12, opacity },
          ]}>
          <Text style={styles.title}>{payload.title}</Text>
          {payload.subtitle ? (
            <Text style={styles.subtitle} numberOfLines={2}>
              {payload.subtitle}
            </Text>
          ) : null}
        </Animated.View>
      ) : null}
    </SimpleTopToastContext.Provider>
  );
}

export function useSimpleTopToast() {
  const ctx = useContext(SimpleTopToastContext);
  if (!ctx) {
    throw new Error('useSimpleTopToast must be used within SimpleTopToastProvider');
  }
  return ctx;
}

const styles = StyleSheet.create({
  box: {
    position: 'absolute',
    left: 16,
    right: 16,
    zIndex: 9999,
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 16,
    borderWidth: StyleSheet.hairlineWidth * 2,
    borderColor: brand.border,
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 20,
    elevation: 10,
  },
  title: {
    color: brand.text,
    fontWeight: '800',
    fontSize: 15,
  },
  subtitle: {
    color: brand.textMuted,
    fontSize: 13,
    marginTop: 4,
  },
});
