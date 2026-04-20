import React, { useLayoutEffect, useMemo } from 'react';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ScrollView } from 'react-native';
import { Box, Button, Heading, HStack, Image, Text, useToast, VStack } from 'native-base';
import { PRODUCTS } from '../data/dummyData';
import type { HomeStackParamList } from '../navigation/types';
import { useCart } from '../context/CartContext';
import { GlyphPlus } from '../components/GlyphIcons';
import { ScreenContent } from '../components/ScreenContent';
import { useTabBarBottomPadding } from '../hooks/useTabBarInset';

function formatPrice(n: number) {
  return n.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
}

type Props = NativeStackScreenProps<HomeStackParamList, 'ProductDetail'>;

export function ProductDetailScreen({ route, navigation }: Props) {
  const tabBottomPad = useTabBarBottomPadding();
  const toast = useToast();
  const { addToCart } = useCart();

  const product = useMemo(
    () => PRODUCTS.find(p => p.id === route.params.productId),
    [route.params.productId],
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      title: product?.name ?? 'Product',
      headerStyle: { backgroundColor: '#faf5ff' },
      headerTintColor: '#5b21b6',
      headerShadowVisible: false,
    });
  }, [navigation, product?.name]);

  if (!product) {
    return (
      <Box flex={1} justifyContent="center" bg="app.canvas">
        <ScreenContent>
          <VStack space={4} alignItems="center" py={8}>
            <Text color="app.muted">Product not found.</Text>
            <Button onPress={() => navigation.goBack()} colorScheme="primary">
              Go back
            </Button>
          </VStack>
        </ScreenContent>
      </Box>
    );
  }

  const onAdd = () => {
    addToCart(product);
    toast.show({
      placement: 'top',
      duration: 2000,
      render: () => (
        <Box bg="primary.700" px={4} py={3} rounded="xl" mx={3} shadow={6}>
          <Text color="white" fontWeight="800">
            Added to cart
          </Text>
          <Text color="primary.100" fontSize="sm" mt={1} numberOfLines={2}>
            {product.name}
          </Text>
        </Box>
      ),
    });
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };

  return (
    <Box flex={1} bg="app.canvas">
      <ScrollView
        contentContainerStyle={{
          paddingBottom: tabBottomPad + 16,
        }}
        showsVerticalScrollIndicator={false}>
        <ScreenContent>
          <VStack space={4} pt={3} alignItems="stretch">
            <Box
              rounded="3xl"
              overflow="hidden"
              borderWidth={1}
              borderColor="primary.100"
              bg="white"
              shadow={4}
              alignSelf="stretch">
              <Image
                source={{ uri: product.imageUrl }}
                alt={product.name}
                w="100%"
                h={280}
                bg="coolGray.100"
              />
            </Box>

            <VStack space={3} alignItems="stretch">
              <HStack
                justifyContent="space-between"
                alignItems="flex-start"
                space={3}
                minW={0}>
                <Heading
                  flex={1}
                  minW={0}
                  size="xl"
                  color="app.text"
                  fontWeight="800"
                  pr={2}>
                  {product.name}
                </Heading>
                <Box
                  bg="secondary.100"
                  px={3}
                  py={1}
                  rounded="full"
                  flexShrink={0}
                  alignSelf="flex-start">
                  <HStack alignItems="center" space={1}>
                    <Text color="secondary.700">★</Text>
                    <Text fontWeight="800" color="secondary.800">
                      {product.rating.toFixed(1)}
                    </Text>
                  </HStack>
                </Box>
              </HStack>

              <Text fontSize="md" lineHeight={22} color="app.muted">
                {product.description}
              </Text>

              <Box
                bg="white"
                p={4}
                rounded="2xl"
                borderWidth={1}
                borderColor="app.border"
                shadow={1}
                alignSelf="stretch">
                <HStack justifyContent="space-between" alignItems="center" minW={0}>
                  <Text fontSize="sm" color="app.muted" fontWeight="600">
                    Price
                  </Text>
                  <Heading size="lg" color="primary.600" flexShrink={0} ml={2}>
                    {formatPrice(product.price)}
                  </Heading>
                </HStack>
              </Box>

              <Button
                size="lg"
                w="100%"
                alignSelf="stretch"
                leftIcon={<GlyphPlus size={20} color="#ffffff" />}
                colorScheme="primary"
                rounded="2xl"
                py={4}
                _text={{ fontWeight: '800', fontSize: 'md' }}
                onPress={onAdd}>
                Add to cart
              </Button>
            </VStack>
          </VStack>
        </ScreenContent>
      </ScrollView>
    </Box>
  );
}
