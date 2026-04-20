import React from 'react';
import { Box, Heading, HStack, Pressable, ScrollView, Text, VStack } from 'native-base';
import { GlyphChevronRight } from '../components/GlyphIcons';
import { ScreenContent } from '../components/ScreenContent';
import { useHeroTopPadding, useTabBarBottomPadding } from '../hooks/useTabBarInset';

const TILES = [
  {
    emoji: '🔥',
    title: 'Trending',
    caption: 'What shoppers love this week',
    strip: 'rose.500',
    iconBg: 'rose.50',
    iconRing: 'rose.100',
  },
  {
    emoji: '✨',
    title: 'New in',
    caption: 'Fresh arrivals daily',
    strip: 'primary.500',
    iconBg: 'primary.50',
    iconRing: 'primary.100',
  },
  {
    emoji: '🏷️',
    title: 'Deals',
    caption: 'Save on bundles',
    strip: 'amber.500',
    iconBg: 'amber.50',
    iconRing: 'amber.100',
  },
] as const;

export function ExploreScreen() {
  const heroTop = useHeroTopPadding(12);
  const tabBottomPad = useTabBarBottomPadding();
  return (
    <Box flex={1} bg="app.canvas">
      <Box bg="primary.600" pt={heroTop} pb={24} borderBottomRadius="3xl">
        <ScreenContent>
          <VStack space={2} alignItems="stretch">
            <Text fontSize="sm" color="primary.100" fontWeight="medium">
              Explore
            </Text>
            <Heading size="xl" color="white" fontWeight="800">
              Collections
            </Heading>
            <Text fontSize="sm" color="primary.100" opacity={0.95}>
              Tap a tile — wire these to real category routes later.
            </Text>
          </VStack>
        </ScreenContent>
      </Box>

      <Box flex={1} mt={-10} zIndex={2} minH={0}>
        <ScreenContent fill>
          <Box
            flex={1}
            minH={0}
            w="100%"
            bg="white"
            rounded="3xl"
            shadow={6}
            borderWidth={1}
            borderColor="primary.100"
            p={4}
            pb={5}>
            <VStack flex={1} minH={0} alignItems="stretch">
              <HStack justifyContent="space-between" alignItems="center" mb={3} minW={0}>
                <Heading size="md" color="app.text" flexShrink={1} mr={2}>
                  Browse
                </Heading>
                <Text fontSize="xs" color="app.muted" fontWeight="medium" flexShrink={0}>
                  {TILES.length} collections
                </Text>
              </HStack>

              <ScrollView
                flex={1}
                w="100%"
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                  width: '100%',
                  alignSelf: 'stretch',
                  paddingBottom: tabBottomPad + 8,
                  flexGrow: 1,
                }}>
                <VStack space={4} w="100%" alignItems="stretch" alignSelf="stretch">
                  {TILES.map(tile => (
                    <Box key={tile.title} w="100%" alignSelf="stretch">
                      <Pressable
                        w="100%"
                        accessibilityRole="button"
                        accessibilityLabel={tile.title}>
                        {({ isPressed }) => (
                          <Box
                            w="100%"
                            rounded="2xl"
                            overflow="hidden"
                            bg="white"
                            borderWidth={1}
                            borderColor="coolGray.100"
                            shadow={isPressed ? 2 : 4}
                            style={{
                              transform: [{ scale: isPressed ? 0.985 : 1 }],
                            }}>
                            <HStack alignItems="stretch">
                              <Box w={1.5} bg={tile.strip} />
                              <HStack
                                flex={1}
                                alignItems="center"
                                space={3}
                                px={4}
                                py={4}
                                pl={3.5}>
                                <Box
                                  size={14}
                                  rounded="2xl"
                                  bg={tile.iconBg}
                                  borderWidth={1}
                                  borderColor={tile.iconRing}
                                  alignItems="center"
                                  justifyContent="center"
                                  flexShrink={0}>
                                  <Text fontSize="2xl" lineHeight={28}>
                                    {tile.emoji}
                                  </Text>
                                </Box>
                                <VStack flex={1} space={1} minW={0}>
                                  <Text
                                    fontWeight="800"
                                    color="app.text"
                                    fontSize="md"
                                    letterSpacing={-0.2}>
                                    {tile.title}
                                  </Text>
                                  <Text
                                    fontSize="xs"
                                    color="app.muted"
                                    lineHeight={18}
                                    numberOfLines={2}>
                                    {tile.caption}
                                  </Text>
                                </VStack>
                                <Box flexShrink={0} opacity={isPressed ? 0.7 : 1}>
                                  <GlyphChevronRight size={22} color="coolGray.400" />
                                </Box>
                              </HStack>
                            </HStack>
                          </Box>
                        )}
                      </Pressable>
                    </Box>
                  ))}
                </VStack>
              </ScrollView>
            </VStack>
          </Box>
        </ScreenContent>
      </Box>
    </Box>
  );
}
