import React, { useMemo } from 'react';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { CommonActions } from '@react-navigation/native';
import { Box, Button, Heading, Text, VStack } from 'native-base';
import type { CartStackParamList } from '../navigation/types';
import { useCart } from '../context/CartContext';
import { ScreenContent } from '../components/ScreenContent';
import { useHeroTopPadding, useTabBarBottomPadding } from '../hooks/useTabBarInset';
import { formatPrice } from '../utils/formatPrice';

type Props = NativeStackScreenProps<CartStackParamList, 'OrderConfirmation'>;

export function OrderConfirmationScreen({ navigation, route }: Props) {
  const tabBottomPad = useTabBarBottomPadding();
  const heroTop = useHeroTopPadding(12);
  const { orders } = useCart();
  const { orderId } = route.params;

  const order = useMemo(
    () => orders.find(o => o.id === orderId),
    [orders, orderId],
  );

  const goCartRootThen = (tab: 'Orders' | 'Cart') => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'CartMain' }],
      }),
    );
    if (tab === 'Orders') {
      navigation.getParent()?.navigate('Orders');
    }
  };

  return (
    <Box flex={1} bg="app.canvas">
      <Box bg="primary.600" pt={heroTop} pb={10} borderBottomRadius="3xl">
        <ScreenContent>
          <VStack space={2} alignItems="center">
            <Box
              w={16}
              h={16}
              rounded="full"
              bg="white"
              alignItems="center"
              justifyContent="center">
              <Text fontSize="3xl">✓</Text>
            </Box>
            <Heading size="lg" color="white" fontWeight="800" textAlign="center">
              Order placed
            </Heading>
            <Text color="primary.100" textAlign="center" px={2}>
              {order
                ? `We received your order ${order.id}. You’ll get a confirmation email in a real app.`
                : 'Your order was submitted.'}
            </Text>
          </VStack>
        </ScreenContent>
      </Box>

      <Box flex={1} mt={-6}>
        <ScreenContent fill>
          <VStack
            bg="white"
            rounded="3xl"
            borderWidth={1}
            borderColor="app.border"
            p={5}
            space={4}
            shadow={4}
            pb={tabBottomPad + 6}>
            {order ? (
              <>
                <VStack space={1}>
                  <Text fontSize="xs" color="app.muted" fontWeight="600">
                    Order reference
                  </Text>
                  <Text fontSize="xl" fontWeight="800" color="app.text">
                    {order.id}
                  </Text>
                </VStack>
                <VStack space={1}>
                  <Text fontSize="xs" color="app.muted" fontWeight="600">
                    Paid with
                  </Text>
                  <Text fontSize="md" color="app.text" fontWeight="600">
                    {order.paymentMethodLabel}
                  </Text>
                </VStack>
                <VStack space={1}>
                  <Text fontSize="xs" color="app.muted" fontWeight="600">
                    Total
                  </Text>
                  <Text fontSize="2xl" fontWeight="800" color="primary.600">
                    {formatPrice(order.total)}
                  </Text>
                </VStack>
              </>
            ) : null}

            <VStack space={3} mt={2}>
              <Button
                colorScheme="primary"
                rounded="2xl"
                onPress={() => goCartRootThen('Orders')}
                _text={{ fontWeight: '800' }}>
                View my orders
              </Button>
              <Button
                variant="outline"
                borderColor="primary.600"
                _text={{ color: 'primary.600', fontWeight: '700' }}
                rounded="2xl"
                onPress={() => goCartRootThen('Cart')}>
                Back to cart
              </Button>
            </VStack>
          </VStack>
        </ScreenContent>
      </Box>
    </Box>
  );
}
