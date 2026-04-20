import React from 'react';
import { Box, Heading, Text, VStack } from 'native-base';
import { ScreenContent } from '../components/ScreenContent';

export function NotificationsScreen() {
  return (
    <Box flex={1} bg="app.canvas">
      <ScreenContent>
        <VStack space={4} py={4} alignItems="stretch">
          <Box
            bg="secondary.50"
            p={6}
            rounded="3xl"
            borderWidth={1}
            borderColor="secondary.200"
            alignItems="center"
            w="100%">
            <Text fontSize="5xl" mb={2}>
              🔔
            </Text>
            <Heading
              size="md"
              textAlign="center"
              color="app.text"
              mb={2}
              px={2}>
              You are all caught up
            </Heading>
            <Text color="app.muted" textAlign="center" fontSize="sm" px={1}>
              This screen is on the root stack so you can open it from anywhere
              (e.g. Profile). Push real notifications from your backend later.
            </Text>
          </Box>
        </VStack>
      </ScreenContent>
    </Box>
  );
}
