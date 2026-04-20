import React from 'react';
import { Box, useBreakpointValue } from 'native-base';

type Props = {
  children: React.ReactNode;
  /**
   * When the parent is a flex column and this block should grow (e.g. fill between header and bottom).
   */
  fill?: boolean;
};

/**
 * Centers content on large screens, consistent horizontal gutters, full-width children.
 */
export function ScreenContent({ children, fill }: Props) {
  const maxW = useBreakpointValue({
    base: '100%',
    md: 720,
    lg: 900,
  });
  const px = useBreakpointValue({ base: 4, md: 6, lg: 8 });

  return (
    <Box
      w="100%"
      maxW={maxW}
      alignSelf="center"
      px={px}
      minW={0}
      alignItems="stretch"
      flex={fill ? 1 : undefined}>
      {children}
    </Box>
  );
}
