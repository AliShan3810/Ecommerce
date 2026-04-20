import React from 'react';
import { Animated, ScrollView, useWindowDimensions } from 'react-native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import {
  Badge,
  Box,
  Button,
  Divider,
  Fade,
  Heading,
  HStack,
  Image,
  Text,
  VStack,
} from 'native-base';
import { useCart } from '../context/CartContext';
import { GlyphMinus, GlyphPlus } from '../components/GlyphIcons';
import { ScalePressable } from '../components/ScalePressable';
import { ScreenContent } from '../components/ScreenContent';
import { useHeroTopPadding, useTabBarBottomPadding } from '../hooks/useTabBarInset';
import type { CartStackParamList } from '../navigation/types';
import { formatPrice } from '../utils/formatPrice';

const NARROW_BREAKPOINT = 420;

export function CartScreen() {
  const { width } = useWindowDimensions();
  const narrow = width < NARROW_BREAKPOINT;
  const tabBottomPad = useTabBarBottomPadding();
  const heroTop = useHeroTopPadding(12);
  const { cartLines, cartTotal, inc, dec, badgeScale, cartCount } = useCart();
  const navigation =
    useNavigation<NativeStackNavigationProp<CartStackParamList, 'CartMain'>>();

  const hasItems = cartLines.length > 0;

  const onCheckout = () => {
    navigation.navigate('CheckoutReview');
  };

  return (
    <Box flex={1} bg="app.canvas">
      <Box bg="primary.600" pt={heroTop} pb={24} borderBottomRadius="3xl">
        <ScreenContent>
          <VStack space={2} alignItems="stretch">
            <Text fontSize="sm" color="primary.100" fontWeight="medium">
              Shopping bag
            </Text>
            <Heading size="xl" color="white" fontWeight="800">
              Your cart
            </Heading>
            <Text fontSize="sm" color="primary.100" opacity={0.95}>
              {hasItems
                ? `${cartCount} item${cartCount === 1 ? '' : 's'} · review before checkout`
                : 'Add products from the home tab'}
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
              {hasItems ? (
                <HStack justifyContent="space-between" alignItems="center" mb={3} minW={0}>
                  <Heading size="md" color="app.text" flexShrink={1} mr={2}>
                    Items
                  </Heading>
                  <Text fontSize="xs" color="app.muted" fontWeight="medium" flexShrink={0}>
                    {cartLines.length} line{cartLines.length === 1 ? '' : 's'}
                  </Text>
                </HStack>
              ) : null}

              <ScrollView
                style={{ flex: 1 }}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                  flexGrow: 1,
                  paddingBottom: hasItems ? 8 : tabBottomPad + 8,
                  justifyContent: hasItems ? 'flex-start' : 'center',
                }}>
                <VStack space={4} alignItems="stretch">
                  {!hasItems ? (
                    <Fade in>
                      <Box
                        bg="secondary.50"
                        p={8}
                        rounded="2xl"
                        borderWidth={1}
                        borderColor="secondary.200"
                        alignItems="center"
                        w="100%">
                        <Box
                          w={16}
                          h={16}
                          rounded="full"
                          bg="primary.100"
                          alignItems="center"
                          justifyContent="center"
                          mb={3}>
                          <Text fontSize="3xl">🛒</Text>
                        </Box>
                        <Text
                          textAlign="center"
                          color="app.muted"
                          fontSize="md"
                          px={2}
                          lineHeight={22}>
                          Your cart is empty. Browse the home tab and tap &quot;Add to cart&quot; on
                          anything you like.
                        </Text>
                      </Box>
                    </Fade>
                  ) : (
                    cartLines.map(line => (
                      <Fade key={line.product.id} in>
                        <Box
                          bg="app.surface"
                          p={4}
                          rounded="2xl"
                          borderWidth={1}
                          borderColor="app.border"
                          shadow={3}
                          w="100%">
                          {narrow ? (
                            <VStack space={3} w="100%" alignItems="stretch">
                              <HStack space={3} alignItems="flex-start" w="100%" minW={0}>
                                <Image
                                  source={{ uri: line.product.imageUrl }}
                                  alt={line.product.name}
                                  width={88}
                                  height={88}
                                  rounded="xl"
                                  borderWidth={1}
                                  borderColor="primary.100"
                                  flexShrink={0}
                                />
                                <VStack flex={1} minW={0} space={1} alignItems="stretch">
                                  <Text
                                    fontWeight="bold"
                                    numberOfLines={3}
                                    color="app.text"
                                    fontSize="md">
                                    {line.product.name}
                                  </Text>
                                  <Text fontSize="sm" color="primary.600" fontWeight="800">
                                    {formatPrice(line.product.price)} each
                                  </Text>
                                </VStack>
                              </HStack>
                              <HStack
                                w="100%"
                                justifyContent="space-between"
                                alignItems="center"
                                flexWrap="wrap"
                                space={2}>
                                <HStack
                                  alignItems="center"
                                  space={2}
                                  bg="coolGray.100"
                                  rounded="full"
                                  px={1}
                                  py={1}
                                  flexShrink={0}>
                                  <ScalePressable
                                    onPress={() => dec(line.product.id)}
                                    accessibilityLabel="Decrease quantity">
                                    <Box
                                      w={9}
                                      h={9}
                                      rounded="full"
                                      bg="white"
                                      alignItems="center"
                                      justifyContent="center"
                                      shadow={1}>
                                      <GlyphMinus size={14} color="coolGray.600" />
                                    </Box>
                                  </ScalePressable>
                                  <Text
                                    fontWeight="800"
                                    minW={8}
                                    textAlign="center"
                                    color="app.text">
                                    {line.qty}
                                  </Text>
                                  <ScalePressable
                                    onPress={() => inc(line.product.id)}
                                    accessibilityLabel="Increase quantity">
                                    <Box
                                      w={9}
                                      h={9}
                                      rounded="full"
                                      bg="primary.600"
                                      alignItems="center"
                                      justifyContent="center"
                                      shadow={2}>
                                      <GlyphPlus size={14} color="white" />
                                    </Box>
                                  </ScalePressable>
                                </HStack>
                                <Text
                                  fontSize="sm"
                                  color="app.muted"
                                  fontWeight="700"
                                  textAlign="right"
                                  flexShrink={1}>
                                  Subtotal {formatPrice(line.product.price * line.qty)}
                                </Text>
                              </HStack>
                            </VStack>
                          ) : (
                            <HStack
                              space={3}
                              alignItems="center"
                              justifyContent="space-between"
                              minW={0}>
                              <Image
                                source={{ uri: line.product.imageUrl }}
                                alt={line.product.name}
                                size="lg"
                                rounded="xl"
                                borderWidth={1}
                                borderColor="primary.100"
                                flexShrink={0}
                              />
                              <VStack flex={1} minW={0} space={1} alignItems="stretch">
                                <Text
                                  fontWeight="bold"
                                  numberOfLines={2}
                                  color="app.text"
                                  fontSize="md">
                                  {line.product.name}
                                </Text>
                                <Text fontSize="sm" color="primary.600" fontWeight="800">
                                  {formatPrice(line.product.price)} each
                                </Text>
                              </VStack>
                              <VStack alignItems="flex-end" space={2} flexShrink={0}>
                                <HStack
                                  alignItems="center"
                                  space={2}
                                  bg="coolGray.100"
                                  rounded="full"
                                  px={1}
                                  py={1}>
                                  <ScalePressable
                                    onPress={() => dec(line.product.id)}
                                    accessibilityLabel="Decrease quantity">
                                    <Box
                                      w={9}
                                      h={9}
                                      rounded="full"
                                      bg="white"
                                      alignItems="center"
                                      justifyContent="center"
                                      shadow={1}>
                                      <GlyphMinus size={14} color="coolGray.600" />
                                    </Box>
                                  </ScalePressable>
                                  <Text
                                    fontWeight="800"
                                    minW={8}
                                    textAlign="center"
                                    color="app.text">
                                    {line.qty}
                                  </Text>
                                  <ScalePressable
                                    onPress={() => inc(line.product.id)}
                                    accessibilityLabel="Increase quantity">
                                    <Box
                                      w={9}
                                      h={9}
                                      rounded="full"
                                      bg="primary.600"
                                      alignItems="center"
                                      justifyContent="center"
                                      shadow={2}>
                                      <GlyphPlus size={14} color="white" />
                                    </Box>
                                  </ScalePressable>
                                </HStack>
                                <Text
                                  fontSize="xs"
                                  color="app.muted"
                                  fontWeight="600"
                                  textAlign="right">
                                  Subtotal {formatPrice(line.product.price * line.qty)}
                                </Text>
                              </VStack>
                            </HStack>
                          )}
                        </Box>
                      </Fade>
                    ))
                  )}
                </VStack>
              </ScrollView>

              {hasItems ? (
                <Box
                  borderTopWidth={1}
                  borderColor="app.border"
                  pt={4}
                  mt={2}
                  pb={tabBottomPad}>
                  <Fade in>
                    <VStack space={3}>
                      <HStack
                        justifyContent="space-between"
                        alignItems="center"
                        minW={0}
                        flexWrap="wrap">
                        <Text fontWeight="600" color="app.muted">
                          Items in bag
                        </Text>
                        <Animated.View style={{ transform: [{ scale: badgeScale }] }}>
                          <Badge
                            colorScheme="primary"
                            variant="solid"
                            rounded="full"
                            _text={{ fontSize: 12, fontWeight: '700' }}>
                            {cartCount > 99 ? '99+' : cartCount}
                          </Badge>
                        </Animated.View>
                      </HStack>
                      <Divider bg="app.border" />
                      <HStack
                        justifyContent="space-between"
                        alignItems="center"
                        minW={0}
                        flexWrap="wrap">
                        <Text fontSize="lg" fontWeight="700" color="app.text">
                          Total
                        </Text>
                        <Heading
                          size="lg"
                          color="primary.600"
                          flexShrink={0}
                          ml={2}
                          adjustsFontSizeToFit
                          maxW="60%">
                          {formatPrice(cartTotal)}
                        </Heading>
                      </HStack>
                      <Button
                        w="100%"
                        colorScheme="primary"
                        size="lg"
                        rounded="2xl"
                        onPress={onCheckout}
                        _pressed={{ bg: 'primary.700' }}
                        _text={{ fontWeight: '800' }}>
                        Checkout
                      </Button>
                    </VStack>
                  </Fade>
                </Box>
              ) : null}
            </VStack>
          </Box>
        </ScreenContent>
      </Box>
    </Box>
  );
}
