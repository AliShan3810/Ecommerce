import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { TAB_BAR_CLEARANCE } from '../constants/layout';

/** Bottom padding for scroll areas on tab screens (safe area + curved bar). */
export function useTabBarBottomPadding(): number {
  const insets = useSafeAreaInsets();
  return insets.bottom + TAB_BAR_CLEARANCE;
}

/** Top padding for screens with a full-bleed colored header under the status bar. */
export function useHeroTopPadding(extra = 12): number {
  const insets = useSafeAreaInsets();
  return insets.top + extra;
}
