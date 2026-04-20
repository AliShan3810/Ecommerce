import React, { useCallback, useMemo, useState } from 'react';
import { FlatList, Pressable } from 'react-native';
import type { ListRenderItem } from 'react-native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import {
  Box,
  Fade,
  Heading,
  HStack,
  Image,
  Input,
  Text,
  useBreakpointValue,
  VStack,
} from 'native-base';
import {
  CategoryId,
  CATEGORIES,
  Product,
  PRODUCTS,
} from '../data/dummyData';
import { GlyphPlus, GlyphSearch } from '../components/GlyphIcons';
import { ScalePressable } from '../components/ScalePressable';
import { ScreenContent } from '../components/ScreenContent';
import { useSimpleTopToast } from '../components/SimpleTopToast';
import type { HomeStackParamList } from '../navigation/types';
import { useCart } from '../context/CartContext';
import { useHeroTopPadding, useTabBarBottomPadding } from '../hooks/useTabBarInset';

function formatPrice(n: number) {
  return n.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
}

export function HomeScreen() {
  const tabBottomPad = useTabBarBottomPadding();
  const heroTop = useHeroTopPadding(12);
  const { show: showTopToast } = useSimpleTopToast();
  const { addToCart } = useCart();
  const navigation =
    useNavigation<NativeStackNavigationProp<HomeStackParamList>>();

  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<CategoryId>('all');

  const gridColumns = useBreakpointValue({ base: 1, md: 2 });
  const imageHeight = useBreakpointValue({ base: 148, md: 168 });

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return PRODUCTS.filter(p => {
      const catOk = category === 'all' ? true : p.category === category;
      const textOk =
        q.length === 0 ||
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q);
      return catOk && textOk;
    });
  }, [category, query]);

  const onAdd = useCallback(
    (product: Product) => {
      addToCart(product);
      // NativeBase Toast mutates internal state in ways that break with React 19 / overlays over FlatList.
      showTopToast('Added to cart', product.name);
    },
    [addToCart, showTopToast],
  );

  const columns = gridColumns ?? 1;

  const renderProduct: ListRenderItem<Product> = useCallback(
    ({ item: product }) => (
      <Box flex={1} minW={0} px={1.5} mb={3}>
        <Box
          w="100%"
          bg="app.surface"
          borderRadius="2xl"
          overflow="hidden"
          borderWidth={1}
          borderColor="app.border"
          shadow={3}>
          <ScalePressable
            onPress={() =>
              navigation.navigate('ProductDetail', {
                productId: product.id,
              })
            }
            accessibilityLabel={product.name}>
            <Box>
              <Image
                source={{ uri: product.imageUrl }}
                alt={product.name}
                w="100%"
                h={imageHeight ?? 148}
                bg="coolGray.100"
              />
              <VStack p={3} space={2} alignItems="stretch">
                <Text
                  fontWeight="bold"
                  numberOfLines={2}
                  fontSize="md"
                  color="app.text">
                  {product.name}
                </Text>
                <HStack
                  justifyContent="space-between"
                  alignItems="center"
                  minW={0}>
                  <Text
                    color="primary.600"
                    fontWeight="800"
                    fontSize="md"
                    flexShrink={1}
                    mr={2}>
                    {formatPrice(product.price)}
                  </Text>
                  <HStack
                    alignItems="center"
                    space={1}
                    bg="secondary.100"
                    px={2}
                    py={0.5}
                    rounded="full"
                    flexShrink={0}>
                    <Text fontSize="xs" color="secondary.700">
                      ★
                    </Text>
                    <Text
                      fontSize="xs"
                      fontWeight="bold"
                      color="secondary.800">
                      {product.rating.toFixed(1)}
                    </Text>
                  </HStack>
                </HStack>
              </VStack>
            </Box>
          </ScalePressable>
          <Box px={3} pb={3} pt={0} alignSelf="stretch" zIndex={2}>
            {/*
              RN Pressable here (not NativeBase Button): NB Button often misses presses
              inside FlatList cells on Android (touch clipping / responder conflicts).
            */}
            <Pressable
              collapsable={false}
              accessibilityRole="button"
              accessibilityLabel={`Add ${product.name} to cart`}
              onPress={() => onAdd(product)}
              android_ripple={{ color: 'rgba(255,255,255,0.25)', borderless: false }}
              style={({ pressed }) => ({ opacity: pressed ? 0.88 : 1 })}>
              <HStack
                w="100%"
                bg="primary.600"
                rounded="xl"
                py={2.5}
                px={3}
                alignItems="center"
                justifyContent="center"
                space={2}
                minH={10}>
                <GlyphPlus size={18} color="#ffffff" />
                <Text color="white" fontWeight="800" fontSize="sm">
                  Add to cart
                </Text>
              </HStack>
            </Pressable>
          </Box>
        </Box>
      </Box>
    ),
    [imageHeight, navigation, onAdd],
  );

  const listEmpty = useCallback(
    () => (
      <Fade in>
        <Box
          bg="secondary.50"
          p={8}
          rounded="2xl"
          borderWidth={1}
          borderColor="secondary.200"
          alignItems="center"
          w="100%">
          <Text fontSize="4xl" mb={2}>
            🔍
          </Text>
          <Text textAlign="center" color="app.muted" fontSize="md" px={2}>
            Nothing matches that search. Try another category or keyword.
          </Text>
        </Box>
      </Fade>
    ),
    [],
  );

  return (
    <Box flex={1} bg="app.canvas">
      <Box bg="primary.600" pt={heroTop} pb={24} borderBottomRadius="3xl">
        <ScreenContent>
          <VStack space={2} alignItems="stretch">
            <Text fontSize="sm" color="primary.100" fontWeight="medium">
              Welcome back
            </Text>
            <Heading size="xl" color="white" fontWeight="800">
              Discover products
            </Heading>
            <Text fontSize="sm" color="primary.100" opacity={0.95}>
              Curated picks · dummy data for demo
            </Text>
            <Input
              placeholder="Search brands, items…"
              value={query}
              onChangeText={setQuery}
              bg="white"
              borderRadius="2xl"
              py={3.5}
              mt={2}
              shadow={5}
              borderWidth={0}
              fontSize="md"
              w="100%"
              _focus={{
                borderColor: 'secondary.400',
                borderWidth: 2,
                bg: 'white',
              }}
              InputLeftElement={
                <Box pl={4} justifyContent="center">
                  <GlyphSearch size={18} color="primary.400" />
                </Box>
              }
            />
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
            <HStack
              justifyContent="space-between"
              alignItems="center"
              mb={3}
              minW={0}>
              <Heading size="md" color="app.text" flexShrink={1} mr={2}>
                Browse
              </Heading>
              <Text
                fontSize="xs"
                color="app.muted"
                fontWeight="medium"
                flexShrink={0}>
                {filtered.length} result{filtered.length === 1 ? '' : 's'}
              </Text>
            </HStack>

            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={CATEGORIES}
              keyExtractor={item => item.id}
              style={{ flexGrow: 0 }}
              contentContainerStyle={{
                alignItems: 'center',
                paddingVertical: 4,
              }}
              ItemSeparatorComponent={() => <Box w={2.5} />}
              renderItem={({ item }) => {
                const active = category === item.id;
                return (
                  <ScalePressable
                    onPress={() => setCategory(item.id)}
                    accessibilityLabel={item.label}>
                    <Box
                      px={4}
                      py={2.5}
                      rounded="full"
                      bg={active ? 'primary.600' : 'coolGray.100'}
                      borderWidth={active ? 0 : 1}
                      borderColor="coolGray.200"
                      shadow={active ? 4 : 0}>
                      <Text
                        fontSize="sm"
                        fontWeight="semibold"
                        color={active ? 'white' : 'coolGray.700'}>
                        {item.label}
                      </Text>
                    </Box>
                  </ScalePressable>
                );
              }}
            />

            <FlatList<Product>
              data={filtered}
              renderItem={renderProduct}
              keyExtractor={item => item.id}
              numColumns={columns}
              key={columns}
              extraData={{ category, query, columns }}
              ListEmptyComponent={listEmpty}
              style={{ flex: 1 }}
              removeClippedSubviews={false}
              keyboardShouldPersistTaps="handled"
              columnWrapperStyle={
                columns > 1 ? { gap: 12, marginBottom: 4 } : undefined
              }
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                flexGrow: 1,
                paddingTop: 16,
                paddingBottom: tabBottomPad + 8,
              }}
            />
          </Box>
        </ScreenContent>
      </Box>
    </Box>
  );
}
