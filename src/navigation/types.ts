export type HomeStackParamList = {
  HomeFeed: undefined;
  ProductDetail: { productId: string };
};

export type CartStackParamList = {
  CartMain: undefined;
  CheckoutReview: undefined;
  CheckoutPayment: undefined;
  OrderConfirmation: { orderId: string };
};

export type MainTabParamList = {
  Home: undefined;
  Explore: undefined;
  Cart: undefined;
  Orders: undefined;
  Profile: undefined;
};

export type RootStackParamList = {
  MainTabs: undefined;
  Notifications: undefined;
};
