import React, { useMemo } from 'react';
import { CurvedBottomBar } from 'react-native-curved-bottom-bar';
import { useCart } from '../context/CartContext';
import { HomeStackNavigator } from './HomeStackNavigator';
import { ExploreScreen } from '../screens/ExploreScreen';
import { CartStackNavigator } from './CartStackNavigator';
import { OrdersScreen } from '../screens/OrdersScreen';
import { ProfileScreen } from '../screens/ProfileScreen';
import {
  createCurvedTabBarRenderers,
  defaultCurvedTabTheme,
  type CurvedTabBarTheme,
} from './customCurvedTabBar';

type Props = {
  /** Override any theme field without copying the whole object */
  curvedTheme?: Partial<CurvedTabBarTheme>;
  /**
   * Curved bar geometry from `react-native-curved-bottom-bar`:
   * - **DOWN** — center notch cuts downward into the bar (classic “bite” for the FAB).
   * - **UP** — bar rises toward the center (taller bump under the FAB).
   */
  curveType?: CurvedTabBarTheme['curveType'];
};

export function CurvedMainTabs({ curvedTheme, curveType }: Props) {
  const { cartCount, badgeScale } = useCart();

  const theme = useMemo(
    () => ({
      ...defaultCurvedTabTheme,
      ...curvedTheme,
      ...(curveType != null ? { curveType } : {}),
    }),
    [curvedTheme, curveType],
  );

  const { tabBar, renderCircle } = useMemo(
    () =>
      createCurvedTabBarRenderers(theme, {
        cartCount,
        badgeScale,
      }),
    [theme, cartCount, badgeScale],
  );

  return (
    <CurvedBottomBar.Navigator
      type={theme.curveType ?? 'DOWN'}
      height={theme.barHeight}
      circleWidth={theme.circleWidth}
      circlePosition="CENTER"
      bgColor={theme.barBgColor}
      borderTopLeftRight
      shadowStyle={theme.shadowStyle}
      initialRouteName="Home"
      tabBar={tabBar}
      renderCircle={renderCircle}
      screenOptions={{ headerShown: false }}>
      <CurvedBottomBar.Screen
        name="Home"
        position="LEFT"
        component={HomeStackNavigator}
      />
      <CurvedBottomBar.Screen
        name="Explore"
        position="LEFT"
        component={ExploreScreen}
      />
      <CurvedBottomBar.Screen
        name="Cart"
        position="CIRCLE"
        component={CartStackNavigator}
      />
      <CurvedBottomBar.Screen
        name="Orders"
        position="RIGHT"
        component={OrdersScreen}
      />
      <CurvedBottomBar.Screen
        name="Profile"
        position="RIGHT"
        component={ProfileScreen}
      />
    </CurvedBottomBar.Navigator>
  );
}
