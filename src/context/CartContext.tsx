import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Animated } from 'react-native';
import { Product, PRODUCTS } from '../data/dummyData';

type CartState = Record<string, number>;

export type OrderLineSnapshot = {
  productId: string;
  name: string;
  imageUrl: string;
  unitPrice: number;
  qty: number;
};

export type OrderRecord = {
  id: string;
  placedAt: string;
  lines: OrderLineSnapshot[];
  total: number;
  paymentMethodLabel: string;
  status: 'Processing' | 'Shipped' | 'Delivered';
};

type CartContextValue = {
  cart: CartState;
  cartCount: number;
  badgeScale: Animated.Value;
  orders: OrderRecord[];
  addToCart: (product: Product) => void;
  inc: (productId: string) => void;
  dec: (productId: string) => void;
  cartLines: { product: Product; qty: number }[];
  cartTotal: number;
  placeOrder: (paymentMethodLabel: string) => OrderRecord | null;
};

const CartContext = createContext<CartContextValue | null>(null);

function makeOrderId() {
  const t = Date.now().toString(36).toUpperCase();
  const r = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `A${t.slice(-4)}${r}`;
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartState>({});
  const [orders, setOrders] = useState<OrderRecord[]>([]);
  const badgeScale = useRef(new Animated.Value(1)).current;

  const bumpBadge = useCallback(() => {
    Animated.sequence([
      Animated.spring(badgeScale, {
        toValue: 1.28,
        friction: 4,
        useNativeDriver: true,
      }),
      Animated.spring(badgeScale, {
        toValue: 1,
        friction: 6,
        useNativeDriver: true,
      }),
    ]).start();
  }, [badgeScale]);

  const addToCart = useCallback(
    (product: Product) => {
      setCart(c => ({ ...c, [product.id]: (c[product.id] ?? 0) + 1 }));
      bumpBadge();
    },
    [bumpBadge],
  );

  const inc = useCallback(
    (productId: string) => {
      setCart(c => ({ ...c, [productId]: (c[productId] ?? 0) + 1 }));
      bumpBadge();
    },
    [bumpBadge],
  );

  const dec = useCallback((productId: string) => {
    setCart(c => {
      const next = { ...c };
      const n = (next[productId] ?? 0) - 1;
      if (n <= 0) {
        delete next[productId];
      } else {
        next[productId] = n;
      }
      return next;
    });
  }, []);

  const cartCount = useMemo(
    () => Object.values(cart).reduce((a, b) => a + b, 0),
    [cart],
  );

  const cartLines = useMemo(() => {
    return Object.entries(cart)
      .map(([id, qty]) => {
        const p = PRODUCTS.find(x => x.id === id);
        return p ? { product: p, qty } : null;
      })
      .filter(Boolean) as { product: Product; qty: number }[];
  }, [cart]);

  const cartTotal = useMemo(
    () =>
      cartLines.reduce((sum, line) => sum + line.product.price * line.qty, 0),
    [cartLines],
  );

  const placeOrder = useCallback(
    (paymentMethodLabel: string): OrderRecord | null => {
      if (cartLines.length === 0) {
        return null;
      }
      const lines: OrderLineSnapshot[] = cartLines.map(({ product, qty }) => ({
        productId: product.id,
        name: product.name,
        imageUrl: product.imageUrl,
        unitPrice: product.price,
        qty,
      }));
      const total = lines.reduce((s, l) => s + l.unitPrice * l.qty, 0);
      const order: OrderRecord = {
        id: makeOrderId(),
        placedAt: new Date().toISOString(),
        lines,
        total,
        paymentMethodLabel,
        status: 'Processing',
      };
      setOrders(prev => [order, ...prev]);
      setCart({});
      return order;
    },
    [cartLines],
  );

  const value = useMemo(
    () => ({
      cart,
      cartCount,
      badgeScale,
      orders,
      addToCart,
      inc,
      dec,
      cartLines,
      cartTotal,
      placeOrder,
    }),
    [
      cart,
      cartCount,
      badgeScale,
      orders,
      addToCart,
      inc,
      dec,
      cartLines,
      cartTotal,
      placeOrder,
    ],
  );

  return (
    <CartContext.Provider value={value}>{children}</CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error('useCart must be used within CartProvider');
  }
  return ctx;
}
