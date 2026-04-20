export type CategoryId = 'all' | 'electronics' | 'fashion' | 'home' | 'sports';

export type Product = {
  id: string;
  name: string;
  price: number;
  category: Exclude<CategoryId, 'all'>;
  description: string;
  imageUrl: string;
  rating: number;
};

export const CATEGORIES: { id: CategoryId; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'electronics', label: 'Electronics' },
  { id: 'fashion', label: 'Fashion' },
  { id: 'home', label: 'Home' },
  { id: 'sports', label: 'Sports' },
];

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Noise-cancel headphones',
    price: 199.99,
    category: 'electronics',
    description:
      'Comfortable over-ear headphones with 30-hour battery and studio-grade clarity.',
    imageUrl:
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
    rating: 4.7,
  },
  {
    id: '2',
    name: 'Smart watch Pro',
    price: 249.0,
    category: 'electronics',
    description:
      'Health tracking, GPS, and always-on display in a slim aluminum case.',
    imageUrl:
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80',
    rating: 4.5,
  },
  {
    id: '3',
    name: 'Canvas sneakers',
    price: 89.0,
    category: 'fashion',
    description: 'Breathable canvas upper with cushioned sole for everyday wear.',
    imageUrl:
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80',
    rating: 4.3,
  },
  {
    id: '4',
    name: 'Leather tote',
    price: 129.5,
    category: 'fashion',
    description: 'Full-grain leather with magnetic closure and interior pockets.',
    imageUrl:
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=80',
    rating: 4.6,
  },
  {
    id: '5',
    name: 'Ceramic table lamp',
    price: 64.99,
    category: 'home',
    description: 'Warm ambient light with dimmer and linen shade.',
    imageUrl:
      'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80',
    rating: 4.4,
  },
  {
    id: '6',
    name: 'Linen throw blanket',
    price: 48.0,
    category: 'home',
    description: 'Soft washed linen, machine washable, 50x60 inches.',
    imageUrl:
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80',
    rating: 4.8,
  },
  {
    id: '7',
    name: 'Yoga mat premium',
    price: 42.0,
    category: 'sports',
    description: 'Non-slip surface, 5mm cushioning, carrying strap included.',
    imageUrl:
      'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?auto=format&fit=crop&w=800&q=80',
    rating: 4.6,
  },
  {
    id: '8',
    name: 'Steel water bottle',
    price: 28.99,
    category: 'sports',
    description: 'Double-wall insulation keeps drinks cold for 24 hours.',
    imageUrl:
      'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=800&q=80',
    rating: 4.2,
  },
];
