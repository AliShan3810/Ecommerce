import React from 'react';
import { Avatar, Box, Heading, HStack, Pressable, Text, VStack } from 'native-base';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { GlyphChevronRight } from '../components/GlyphIcons';
import { ScreenContent } from '../components/ScreenContent';
import { useHeroTopPadding, useTabBarBottomPadding } from '../hooks/useTabBarInset';

const ROWS = [
  { label: 'Shipping addresses', emoji: '📍' },
  { label: 'Payment methods', emoji: '💳' },
  { label: 'Help & support', emoji: '💬' },
];

export function ProfileScreen() {
  const heroTop = useHeroTopPadding(16);
  const tabBottomPad = useTabBarBottomPadding();
  const navigation = useNavigation();

  const openNotifications = () => {
    navigation.dispatch(
      CommonActions.navigate({
        name: 'Notifications',
      }),
    );
  };

  return (
    <Box flex={1} bg="app.canvas">
      <Box bg="primary.600" pt={heroTop} pb={20} borderBottomRadius="3xl">
        <ScreenContent>
          <HStack space={4} alignItems="center" minW={0}>
            <Avatar
              bg="primary.400"
              size="xl"
              borderWidth={3}
              borderColor="white"
              flexShrink={0}>
              AJ
            </Avatar>
            <VStack flex={1} minW={0} justifyContent="center">
              <Heading color="white" size="md" fontWeight="800" numberOfLines={1}>
                Alex Jordan
              </Heading>
              <Text color="primary.100" fontSize="sm" numberOfLines={1}>
                demo@example.com
              </Text>
            </VStack>
          </HStack>
        </ScreenContent>
      </Box>

      <Box flex={1} mt={-14} minH={0}>
        <ScreenContent fill>
          <VStack
            space={4}
            flex={1}
            pb={tabBottomPad}
            alignItems="stretch"
            justifyContent="flex-start">
            <Box
              bg="white"
              rounded="3xl"
              borderWidth={1}
              borderColor="app.border"
              shadow={5}
              overflow="hidden"
              w="100%"
              alignSelf="stretch">
              <Pressable onPress={openNotifications} accessibilityLabel="Notifications">
                {({ isPressed }) => (
                  <HStack
                    justifyContent="space-between"
                    alignItems="center"
                    py={4}
                    px={4}
                    bg={isPressed ? 'primary.50' : 'white'}
                    minW={0}>
                    <HStack space={3} alignItems="center" flex={1} minW={0}>
                      <Text fontSize="2xl">🔔</Text>
                      <Text fontWeight="700" color="app.text" flexShrink={1}>
                        Notifications
                      </Text>
                    </HStack>
                    <GlyphChevronRight size={22} color="primary.400" />
                  </HStack>
                )}
              </Pressable>
              {ROWS.map(row => (
                <Box key={row.label} borderTopWidth={1} borderColor="app.border">
                  <Pressable accessibilityLabel={row.label}>
                    {({ isPressed }) => (
                      <HStack
                        alignItems="center"
                        py={4}
                        px={4}
                        bg={isPressed ? 'coolGray.50' : 'white'}
                        minW={0}>
                        <Text fontSize="xl" mr={3} flexShrink={0}>
                          {row.emoji}
                        </Text>
                        <Text
                          fontWeight="600"
                          color="app.text"
                          flex={1}
                          minW={0}>
                          {row.label}
                        </Text>
                      </HStack>
                    )}
                  </Pressable>
                </Box>
              ))}
            </Box>

            <Text fontSize="xs" color="app.muted" textAlign="center" px={2} pt={2}>
              Profile rows are static for layout demo — connect your account
              screens here.
            </Text>
          </VStack>
        </ScreenContent>
      </Box>
    </Box>
  );
}
