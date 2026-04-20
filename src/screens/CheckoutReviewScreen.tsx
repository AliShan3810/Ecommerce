import React, { useEffect } from 'react';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ScrollView } from 'react-native';
import { Box, Button, Divider, Heading, HStack, Image, Text, VStack } from 'native-base';
import type { CartStackParamList } from '../navigation/types';
import { useCart } from '../context/CartContext';
import { ScreenContent } from '../components/ScreenContent';
import { useTabBarBottomPadding } from '../hooks/useTabBarInset';
import { formatPrice } from '../utils/formatPrice';

type Props = NativeStackScreenProps<CartStackParamList, 'CheckoutReview'>;

export function CheckoutReviewScreen({ navigation }: Props) {
  const tabBottomPad = useTabBarBottomPadding();
  const { cartLines, cartTotal } = useCart();

  useEffect(() => {
    if (cartLines.length === 0) {
      navigation.replace('CartMain');
    }
  }, [cartLines.length, navigation]);

  if (cartLines.length === 0) {
    return null;
  }

  return (
    <Box flex={1} bg="app.canvas">
      <ScreenContent fill>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingBottom: tabBottomPad + 24,
              flexGrow: 1,
            }}>
            <VStack space={4} w="100%">
              <Box
                bg="white"
                rounded="2xl"
                borderWidth={1}
                borderColor="app.border"
                p={4}
                shadow={3}>
                <Text fontWeight="800" color="app.text" mb={2}>
                  Ship to (demo)
                </Text>
                <Text color="app.muted" fontSize="sm" lineHeight={20}>
                  Alex Morgan{'\n'}
                  1200 Market Street{'\n'}
                  San Francisco, CA 94102{'\n'}
                  United States
                </Text>
              </Box>

              <Box
                bg="white"
                rounded="2xl"
                borderWidth={1}
                borderColor="app.border"
                overflow="hidden"
                shadow={3}>
                <Box px={4} py={3} bg="coolGray.50">
                  <Text fontWeight="800" color="app.text">
                    Items
                  </Text>
                </Box>
                <Divider bg="app.border" />
                {cartLines.map((line, i) => (
                  <Box key={line.product.id}>
                    {i > 0 ? <Divider bg="app.border" /> : null}
                    <HStack px={4} py={3} space={3} alignItems="center" minW={0}>
                      <Image
                        source={{ uri: line.product.imageUrl }}
                        alt={line.product.name}
                        w={16}
                        h={16}
                        rounded="lg"
                        borderWidth={1}
                        borderColor="primary.100"
                        flexShrink={0}
                      />
                      <VStack flex={1} minW={0} space={0.5}>
                        <Text fontWeight="700" color="app.text" numberOfLines={2}>
                          {line.product.name}
                        </Text>
                        <Text fontSize="xs" color="app.muted">
                          Qty {line.qty} · {formatPrice(line.product.price)} each
                        </Text>
                      </VStack>
                      <Text fontWeight="800" color="primary.600" flexShrink={0}>
                        {formatPrice(line.product.price * line.qty)}
                      </Text>
                    </HStack>
                  </Box>
                ))}
                <Divider bg="app.border" />
                <HStack px={4} py={3} justifyContent="space-between" alignItems="center">
                  <Text fontSize="md" fontWeight="700" color="app.text">
                    Total
                  </Text>
                  <Heading size="md" color="primary.600">
                    {formatPrice(cartTotal)}
                  </Heading>
                </HStack>
              </Box>

              <Button
                colorScheme="primary"
                size="lg"
                rounded="2xl"
                onPress={() => navigation.navigate('CheckoutPayment')}
                _text={{ fontWeight: '800' }}>
                Continue to payment
              </Button>
            </VStack>
          </ScrollView>
      </ScreenContent>
    </Box>
  );
}
