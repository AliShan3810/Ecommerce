export type PaymentMethodOption = {
  id: string;
  label: string;
  description: string;
  /** Shown on confirmation; empty when computed at checkout (e.g. entered card). */
  receiptLabel: string;
};

/** Dummy methods — no real charges. */
export const PAYMENT_METHODS: PaymentMethodOption[] = [
  {
    id: 'card_manual',
    label: 'Credit or debit card',
    description: 'Enter card details (demo — not processed)',
    receiptLabel: '',
  },
  {
    id: 'apple_pay',
    label: 'Apple Pay',
    description: 'Wallet on this device (demo)',
    receiptLabel: 'Apple Pay',
  },
  {
    id: 'paypal',
    label: 'PayPal',
    description: 'PayPal balance (demo)',
    receiptLabel: 'PayPal',
  },
];

export const CARD_MANUAL_ID = 'card_manual';
