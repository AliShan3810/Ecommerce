import React from 'react';
import { Box, Divider, Fade, Heading, HStack, Image, ScrollView, Text, VStack } from 'native-base';
import { ScreenContent } from '../components/ScreenContent';
import { useCart } from '../context/CartContext';
import { useHeroTopPadding, useTabBarBottomPadding } from '../hooks/useTabBarInset';
import { formatPrice } from '../utils/formatPrice';

function formatOrderDate(iso: string) {
  try {
    return new Date(iso).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  } catch {
    return iso;
  }
}

export function OrdersScreen() {
  const heroTop = useHeroTopPadding(16);
  const tabBottomPad = useTabBarBottomPadding();
  const { orders } = useCart();

  return (
    <Box flex={1} bg="app.canvas">
      <Box bg="primary.700" pt={heroTop} pb={12} borderBottomRadius="3xl">
        <ScreenContent>
          <VStack space={1} alignItems="stretch">
            <Heading size="xl" color="white" fontWeight="800">
              Orders
            </Heading>
            <Text color="primary.200" fontSize="sm">
              {orders.length > 0
                ? 'Placed from checkout in this session.'
                : 'Complete a purchase to see orders here.'}
            </Text>
          </VStack>
        </ScreenContent>
      </Box>

      <Box flex={1} mt={-6} minH={0}>
        <ScreenContent fill>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingBottom: tabBottomPad,
              flexGrow: 1,
            }}>
            {orders.length === 0 ? (
              <Fade in>
                <Box
                  bg="white"
                  rounded="3xl"
                  borderWidth={1}
                  borderColor="app.border"
                  p={8}
                  alignItems="center"
                  shadow={2}>
                  <Text fontSize="4xl" mb={3}>
                    📦
                  </Text>
                  <Text textAlign="center" color="app.muted" fontSize="md" lineHeight={22}>
                    No orders yet. Add items in the cart tab and run through checkout — your
                    confirmation will show up here.
                  </Text>
                </Box>
              </Fade>
            ) : (
              <VStack space={4} alignItems="stretch" w="100%">
                {orders.map(order => (
                  <Fade key={order.id} in>
                    <Box
                      bg="white"
                      rounded="3xl"
                      borderWidth={1}
                      borderColor="app.border"
                      shadow={4}
                      overflow="hidden"
                      w="100%">
                      <HStack
                        px={4}
                        py={4}
                        justifyContent="space-between"
                        alignItems="flex-start"
                        minW={0}
                        flexWrap="wrap">
                        <VStack space={1} flex={1} minW={0} mr={3}>
                          <Text fontWeight="800" color="app.text" fontSize="md">
                            #{order.id}
                          </Text>
                          <Text fontSize="xs" color="app.muted">
                            {formatOrderDate(order.placedAt)}
                          </Text>
                          <Text fontSize="xs" color="app.muted" mt={1}>
                            Paid with {order.paymentMethodLabel}
                          </Text>
                        </VStack>
                        <VStack alignItems="flex-end" space={2} flexShrink={0}>
                          <Text fontWeight="800" color="primary.600" fontSize="lg">
                            {formatPrice(order.total)}
                          </Text>
                          <Box bg="secondary.100" px={2} py={0.5} rounded="md">
                            <Text fontSize="xs" fontWeight="700" color="secondary.800">
                              {order.status}
                            </Text>
                          </Box>
                        </VStack>
                      </HStack>
                      <Divider bg="app.border" />
                      <VStack px={4} py={3} space={3}>
                        {order.lines.map(line => (
                          <HStack key={line.productId} space={3} minW={0}>
                            <Image
                              source={{ uri: line.imageUrl }}
                              alt={line.name}
                              w={12}
                              h={12}
                              rounded="md"
                              borderWidth={1}
                              borderColor="app.border"
                              flexShrink={0}
                            />
                            <VStack flex={1} minW={0} space={0.5}>
                              <Text fontWeight="600" color="app.text" numberOfLines={2}>
                                {line.name}
                              </Text>
                              <Text fontSize="xs" color="app.muted">
                                Qty {line.qty} · {formatPrice(line.unitPrice)} each
                              </Text>
                            </VStack>
                            <Text fontWeight="700" color="app.text" flexShrink={0}>
                              {formatPrice(line.unitPrice * line.qty)}
                            </Text>
                          </HStack>
                        ))}
                      </VStack>
                    </Box>
                  </Fade>
                ))}
              </VStack>
            )}
          </ScrollView>
        </ScreenContent>
      </Box>
    </Box>
  );
}
