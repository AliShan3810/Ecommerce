import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { CartStackParamList } from './types';
import { CartScreen } from '../screens/CartScreen';
import { CheckoutReviewScreen } from '../screens/CheckoutReviewScreen';
import { CheckoutPaymentScreen } from '../screens/CheckoutPaymentScreen';
import { OrderConfirmationScreen } from '../screens/OrderConfirmationScreen';

const Stack = createNativeStackNavigator<CartStackParamList>();

const headerScreenOpts = {
  headerShown: true as const,
  headerStyle: { backgroundColor: '#faf5ff' },
  headerTintColor: '#5b21b6',
  headerShadowVisible: false,
  headerTitleStyle: { fontWeight: '800' as const },
};

export function CartStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="CartMain" component={CartScreen} />
      <Stack.Screen
        name="CheckoutReview"
        component={CheckoutReviewScreen}
        options={{
          ...headerScreenOpts,
          title: 'Review order',
          headerBackTitle: 'Cart',
        }}
      />
      <Stack.Screen
        name="CheckoutPayment"
        component={CheckoutPaymentScreen}
        options={{
          ...headerScreenOpts,
          title: 'Payment',
          headerBackTitle: 'Review',
        }}
      />
      <Stack.Screen
        name="OrderConfirmation"
        component={OrderConfirmationScreen}
        options={{
          ...headerScreenOpts,
          title: 'Thank you',
          headerBackVisible: false,
        }}
      />
    </Stack.Navigator>
  );
}
