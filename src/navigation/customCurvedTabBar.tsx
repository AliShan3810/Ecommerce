import React from 'react';
import {
  Animated,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import { scale } from 'react-native-size-scaling';
import { brand } from '../theme/designTokens';
import { ActiveTabNotch } from './ActiveTabNotch';
import {
  TabIconCart,
  TabIconExplore,
  TabIconHome,
  TabIconOrders,
  TabIconProfile,
  type TabIconProps,
} from './TabBarIcons';

/**
 * Do not set a solid `backgroundColor` here — it would fill the SVG notch. Strong shadow /
 * elevation still lift the bar off the content (Android uses elevation; iOS uses shadow*).
 */
const defaultShadowStyle: StyleProp<ViewStyle> = {
  shadowColor: '#0f172a',
  shadowOffset: { width: 0, height: -8 },
  shadowOpacity: 0.18,
  shadowRadius: 28,
  elevation: 32,
  borderTopWidth: StyleSheet.hairlineWidth,
  borderTopColor: 'rgba(15, 23, 42, 0.12)',
};

/** Route → icon (side tabs only; Cart uses center FAB). */
const SIDE_TAB_ICONS: Record<string, React.FC<TabIconProps>> = {
  Home: TabIconHome,
  Explore: TabIconExplore,
  Orders: TabIconOrders,
  Profile: TabIconProfile,
};

/**
 * Central place to tweak curved bottom bar visuals and behavior.
 * Colors stay aligned with `src/theme/designTokens.ts`.
 */
export type CurvedTabBarTheme = {
  barBgColor: string;
  curveType: 'DOWN' | 'UP';
  barHeight: number;
  circleWidth: number;
  activeTint: string;
  inactiveTint: string;
  circleBg: string;
  circleIcon: string;
  shadowStyle?: StyleProp<ViewStyle>;
  showLabels: boolean;
};

export const defaultCurvedTabTheme: CurvedTabBarTheme = {
  barBgColor: '#ffffff',
  curveType: 'DOWN',
  barHeight: 76,
  circleWidth: 56,
  activeTint: brand.primary,
  inactiveTint: '#94a3b8',
  circleBg: brand.primary,
  circleIcon: '#ffffff',
  showLabels: true,
  shadowStyle: defaultShadowStyle,
};

type TabBarArgs = {
  routeName: string;
  selectedTab: string;
  navigate: (name: string) => void;
};

type CreateOptions = {
  cartCount: number;
  badgeScale: Animated.Value;
};

export function createCurvedTabBarRenderers(theme: CurvedTabBarTheme, options: CreateOptions) {
  const { cartCount, badgeScale } = options;
  const circleSize = scale(theme.circleWidth < 50 ? 50 : theme.circleWidth > 60 ? 60 : theme.circleWidth);
  /** Library uses extra vertical space for `UP`; lift FAB slightly more so it sits on the bump. */
  const fabLift = theme.curveType === 'UP' ? scale(-30) : scale(-24);

  const tabBar = ({ routeName, selectedTab, navigate }: TabBarArgs) => {
    const focused = routeName === selectedTab;
    const color = focused ? theme.activeTint : theme.inactiveTint;
    const Icon = SIDE_TAB_ICONS[routeName];
    const iconSize = focused ? scale(23) : scale(21);

    return (
      <TouchableOpacity
        accessibilityRole="button"
        accessibilityState={{ selected: focused }}
        activeOpacity={0.85}
        onPress={() => navigate(routeName)}
        style={styles.tabTouchable}>
        <View style={styles.tabInner}>
          {/* <ActiveTabNotch visible={focused} variant="tab" /> */}
          <View style={[styles.iconWrap, focused && styles.iconWrapFocused]}>
            {Icon ? <Icon color={color} size={iconSize} strokeWidth={focused ? 2 : 1.65} /> : null}
          </View>
          {theme.showLabels ? (
            <Text style={[styles.label, focused ? styles.labelActive : styles.labelInactive]} numberOfLines={1}>
              {routeName}
            </Text>
          ) : null}
        </View>
      </TouchableOpacity>
    );
  };

  const renderCircle = ({ routeName, selectedTab, navigate }: TabBarArgs) => {
    const focused = routeName != null && selectedTab === routeName;
    const bg = focused ? theme.circleBg : '#e2e8f0';
    const iconColor = focused ? theme.circleIcon : '#64748b';

    return (
      <View style={styles.circleColumn}>
        <View style={[styles.circleStack, { marginTop: fabLift }]}>
          {/* <ActiveTabNotch visible={focused} variant="fab" /> */}
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={{ selected: focused }}
            activeOpacity={0.9}
            onPress={() => navigate(routeName)}
            style={[
              styles.circleBtn,
              focused ? styles.circleBtnFocused : styles.circleBtnIdle,  
              {
                width: circleSize,
                height: circleSize,
                borderRadius: circleSize / 2,
                backgroundColor: bg,
              },
            ]}>
            <TabIconCart color={iconColor} size={scale(24)} strokeWidth={focused ? 2 : 1.75} />
            {cartCount > 0 ? (
              <Animated.View style={[styles.badge, { transform: [{ scale: badgeScale }] }]}>
                <Text style={styles.badgeText}>{cartCount > 9 ? '9+' : String(cartCount)}</Text>
              </Animated.View>
            ) : null}
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return { tabBar, renderCircle };
}

const styles = StyleSheet.create({
  tabTouchable: {
    flex: 1,
    justifyContent: 'center',
    paddingBottom: 8,
  },
  tabInner: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'flex-end',
    overflow: 'visible',
    width: '100%',
    minHeight: 54,
    paddingBottom: 4,
  },
  iconWrap: {
    marginBottom: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconWrapFocused: {
    transform: [{ scale: 1.02 }],
  },
  label: {
    fontSize: 10,
    letterSpacing: 0.35,
    maxWidth: '100%',
  },
  labelActive: {
    color: brand.primary,
    fontWeight: '700',
  },
  labelInactive: {
    color: '#94a3b8',
    fontWeight: '600',
  },
  circleColumn: {
    alignItems: 'center',
    justifyContent: 'center',
    width: scale(76),
  },
  circleStack: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  circleBtn: {
    marginBottom: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  circleBtnFocused: {
    shadowColor: brand.primary,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.38,
    shadowRadius: 14,
    elevation: 12,
    borderWidth: 3,
    borderColor: 'rgba(255, 255, 255, 0.95)',
  },
  circleBtnIdle: {
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 6,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.7)',
  },
  badge: {
    position: 'absolute',
    top: -2,
    right: -2,
    minWidth: 20,
    height: 20,
    borderRadius: 10,
    paddingHorizontal: 5,
    backgroundColor: brand.danger,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 2,
  },
  badgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '800',
  },
});
