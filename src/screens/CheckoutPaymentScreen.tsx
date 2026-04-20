import React, { useEffect, useMemo, useState } from 'react';
import cardValidator from 'card-validator';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView } from 'react-native';
import { Box, Button, FormControl, HStack, Input, Text, VStack } from 'native-base';
import type { CartStackParamList } from '../navigation/types';
import { useCart } from '../context/CartContext';
import { CARD_MANUAL_ID, PAYMENT_METHODS } from '../data/paymentMethods';
import { ScreenContent } from '../components/ScreenContent';
import { useTabBarBottomPadding } from '../hooks/useTabBarInset';
import { formatPrice } from '../utils/formatPrice';
import { useSimpleTopToast } from '../components/SimpleTopToast';
import {
  cardNumberInputMaxLength,
  cvvMaxLengthForPan,
  digitsOnly,
  formatCardNumberForDisplay,
  formatExpiryInput,
  receiptLabelFromEnteredCard,
  validateDummyCardFields,
  type CardFieldErrors,
} from '../utils/dummyCard';

type Props = NativeStackScreenProps<CartStackParamList, 'CheckoutPayment'>;

export function CheckoutPaymentScreen({ navigation }: Props) {
  const tabBottomPad = useTabBarBottomPadding();
  const { cartLines, cartTotal, placeOrder } = useCart();
  const { show: showToast } = useSimpleTopToast();
  const [selectedId, setSelectedId] = useState(PAYMENT_METHODS[0]?.id ?? '');

  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [nameOnCard, setNameOnCard] = useState('');
  const [cardErrors, setCardErrors] = useState<CardFieldErrors>({});

  useEffect(() => {
    if (cartLines.length === 0) {
      navigation.replace('CartMain');
    }
  }, [cartLines.length, navigation]);

  if (cartLines.length === 0) {
    return null;
  }

  const selected = PAYMENT_METHODS.find(m => m.id === selectedId);
  const showCardForm = selectedId === CARD_MANUAL_ID;

  const panDigits = useMemo(() => digitsOnly(cardNumber), [cardNumber]);
  const cvvMax = useMemo(() => cvvMaxLengthForPan(panDigits), [panDigits]);
  const cardInputMaxLen = useMemo(() => cardNumberInputMaxLength(panDigits), [panDigits]);
  const securityCodeLabel = useMemo(() => {
    const code = cardValidator.number(panDigits).card?.code;
    return code?.name ?? 'CVV';
  }, [panDigits]);

  useEffect(() => {
    setCvv(c => digitsOnly(c, cvvMax));
  }, [cvvMax]);

  const applyTestCard = () => {
    const future = new Date();
    future.setFullYear(future.getFullYear() + 2);
    const mm = String(future.getMonth() + 1).padStart(2, '0');
    const yy = String(future.getFullYear()).slice(-2);
    setCardNumber(formatCardNumberForDisplay('4242424242424242'));
    setExpiry(`${mm}/${yy}`);
    setCvv('123');
    setNameOnCard('Jordan Demo');
    setCardErrors({});
  };

  const onCardNumberChange = (t: string) => {
    setCardNumber(formatCardNumberForDisplay(t));
  };

  const onExpiryChange = (t: string) => {
    setExpiry(formatExpiryInput(t));
  };

  const selectMethod = (id: string) => {
    setSelectedId(id);
    setCardErrors({});
  };

  const onPay = () => {
    if (!selected) {
      return;
    }
    let receiptLabel = selected.receiptLabel;
    if (selected.id === CARD_MANUAL_ID) {
      const pan = digitsOnly(cardNumber);
      const errors = validateDummyCardFields({
        cardDigits: pan,
        expiryDisplay: expiry,
        cvv,
        nameOnCard,
      });
      if (Object.keys(errors).length > 0) {
        setCardErrors(errors);
        return;
      }
      setCardErrors({});
      receiptLabel = receiptLabelFromEnteredCard(pan);
    }
    const order = placeOrder(receiptLabel);
    if (!order) {
      showToast('Cart empty', 'Add items before paying.');
      navigation.navigate('CartMain');
      return;
    }
    navigation.replace('OrderConfirmation', { orderId: order.id });
  };

  return (
    <Box flex={1} bg="app.canvas">
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 88 : 0}>
        <ScreenContent fill>
          <ScrollView
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              flexGrow: 1,
              paddingBottom: tabBottomPad + 16,
            }}>
            <VStack flex={1} space={4}>
              <Box
                bg="secondary.50"
                rounded="xl"
                borderWidth={1}
                borderColor="secondary.200"
                px={3}
                py={2}>
                <Text fontSize="xs" color="secondary.800" fontWeight="600">
                  Demo checkout — no real charges. Total {formatPrice(cartTotal)}
                </Text>
              </Box>

              <VStack space={3}>
                {PAYMENT_METHODS.map(method => {
                  const active = method.id === selectedId;
                  return (
                    <Pressable
                      key={method.id}
                      onPress={() => selectMethod(method.id)}
                      accessibilityRole="radio"
                      accessibilityState={{ selected: active }}>
                      <Box
                        bg="white"
                        rounded="2xl"
                        borderWidth={2}
                        borderColor={active ? 'primary.600' : 'app.border'}
                        p={4}
                        shadow={active ? 4 : 1}>
                        <Text fontWeight="800" color="app.text">
                          {method.label}
                        </Text>
                        <Text fontSize="sm" color="app.muted" mt={1}>
                          {method.description}
                        </Text>
                      </Box>
                    </Pressable>
                  );
                })}
              </VStack>

              {showCardForm ? (
                <VStack
                  space={3}
                  bg="white"
                  p={4}
                  rounded="2xl"
                  borderWidth={1}
                  borderColor="app.border"
                  shadow={2}>
                  <HStack justifyContent="space-between" alignItems="center" flexWrap="wrap">
                    <Text fontWeight="800" color="app.text">
                      Card details
                    </Text>
                    <Pressable onPress={applyTestCard} accessibilityRole="button">
                      <Text fontSize="sm" fontWeight="700" color="primary.600">
                        Use test card
                      </Text>
                    </Pressable>
                  </HStack>

                  <FormControl isInvalid={!!cardErrors.nameOnCard}>
                    <FormControl.Label>Name on card</FormControl.Label>
                    <Input
                      value={nameOnCard}
                      onChangeText={setNameOnCard}
                      placeholder="Jordan Demo"
                      autoComplete="name"
                      rounded="xl"
                      bg="coolGray.50"
                      borderWidth={0}
                      _focus={{ bg: 'white', borderWidth: 2, borderColor: 'primary.500' }}
                    />
                    <FormControl.ErrorMessage>{cardErrors.nameOnCard}</FormControl.ErrorMessage>
                  </FormControl>

                  <FormControl isInvalid={!!cardErrors.cardNumber}>
                    <FormControl.Label>Card number</FormControl.Label>
                    <Input
                      value={cardNumber}
                      onChangeText={onCardNumberChange}
                      placeholder="4242 4242 4242 4242"
                      keyboardType="number-pad"
                      maxLength={cardInputMaxLen}
                      rounded="xl"
                      bg="coolGray.50"
                      borderWidth={0}
                      _focus={{ bg: 'white', borderWidth: 2, borderColor: 'primary.500' }}
                    />
                    <FormControl.ErrorMessage>{cardErrors.cardNumber}</FormControl.ErrorMessage>
                  </FormControl>

                  <HStack space={3} w="100%">
                    <FormControl flex={1} isInvalid={!!cardErrors.expiry}>
                      <FormControl.Label>Expires</FormControl.Label>
                      <Input
                        value={expiry}
                        onChangeText={onExpiryChange}
                        placeholder="MM/YY"
                        keyboardType="number-pad"
                        maxLength={5}
                        rounded="xl"
                        bg="coolGray.50"
                        borderWidth={0}
                        _focus={{ bg: 'white', borderWidth: 2, borderColor: 'primary.500' }}
                      />
                      <FormControl.ErrorMessage>{cardErrors.expiry}</FormControl.ErrorMessage>
                    </FormControl>
                    <FormControl w="32" isInvalid={!!cardErrors.cvv}>
                      <FormControl.Label>{securityCodeLabel}</FormControl.Label>
                      <Input
                        value={cvv}
                        onChangeText={t => setCvv(digitsOnly(t, cvvMax))}
                        placeholder={cvvMax === 4 ? '1234' : '123'}
                        keyboardType="number-pad"
                        maxLength={cvvMax}
                        secureTextEntry
                        rounded="xl"
                        bg="coolGray.50"
                        borderWidth={0}
                        _focus={{ bg: 'white', borderWidth: 2, borderColor: 'primary.500' }}
                      />
                      <FormControl.ErrorMessage>{cardErrors.cvv}</FormControl.ErrorMessage>
                    </FormControl>
                  </HStack>

                  <Text fontSize="xs" color="app.muted">
                    Card checks use the card-validator package (Luhn, lengths, CVV rules). Nothing is
                    sent to a payment processor in this demo.
                  </Text>
                </VStack>
              ) : null}

              <Button
                mt={2}
                colorScheme="primary"
                size="lg"
                rounded="2xl"
                onPress={onPay}
                isDisabled={!selected}
                _text={{ fontWeight: '800' }}>
                Pay {formatPrice(cartTotal)}
              </Button>
            </VStack>
          </ScrollView>
        </ScreenContent>
      </KeyboardAvoidingView>
    </Box>
  );
}
