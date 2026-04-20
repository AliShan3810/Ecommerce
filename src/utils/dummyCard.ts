/**
 * Demo checkout helpers. Validation via `card-validator` (Luhn, lengths, CVV rules).
 * No card data is transmitted to a processor in this app.
 */

import cardValidator from 'card-validator';

const DIGITS_ONLY = /\D/g;

export function digitsOnly(s: string, maxLen?: number) {
  const d = s.replace(DIGITS_ONLY, '');
  return maxLen != null ? d.slice(0, maxLen) : d;
}

/** Uses issuer gap positions when the number can be identified; otherwise groups of 4. */
export function formatCardNumberForDisplay(raw: string) {
  const inferred = cardValidator.number(digitsOnly(raw));
  const maxLen = inferred.card?.lengths?.length
    ? Math.max(...inferred.card.lengths)
    : 19;
  const d = digitsOnly(raw, maxLen);
  const { card } = cardValidator.number(d);
  const gaps = card?.gaps;
  if (!gaps?.length) {
    return d.replace(/(\d{4})(?=\d)/g, '$1 ').trim();
  }
  const parts: string[] = [];
  let prev = 0;
  for (const g of gaps) {
    if (prev >= d.length) {
      break;
    }
    parts.push(d.slice(prev, g));
    prev = g;
  }
  if (prev < d.length) {
    parts.push(d.slice(prev));
  }
  return parts.filter(Boolean).join(' ').trim();
}

export function formatExpiryInput(raw: string) {
  const d = digitsOnly(raw, 4);
  if (d.length <= 2) {
    return d;
  }
  return `${d.slice(0, 2)}/${d.slice(2, 4)}`;
}

export type CardFieldErrors = Partial<{
  cardNumber: string;
  expiry: string;
  cvv: string;
  nameOnCard: string;
}>;

export function validateDummyCardFields(input: {
  cardDigits: string;
  expiryDisplay: string;
  cvv: string;
  nameOnCard: string;
}): CardFieldErrors {
  const errors: CardFieldErrors = {};

  const numberValidation = cardValidator.number(input.cardDigits);
  if (!numberValidation.isValid) {
    errors.cardNumber = numberValidation.isPotentiallyValid
      ? 'Enter the full card number.'
      : 'This card number does not look valid.';
  }

  const exp = cardValidator.expirationDate(input.expiryDisplay);
  if (!exp.isValid) {
    errors.expiry = exp.isPotentiallyValid
      ? 'Enter expiry as MM/YY.'
      : 'Expiry date is not valid or is in the past.';
  }

  const cvvSize = numberValidation.card?.code?.size ?? 3;
  const cvvDigits = digitsOnly(input.cvv);
  const cvvCheck = cardValidator.cvv(cvvDigits, cvvSize);
  if (!cvvCheck.isValid) {
    errors.cvv =
      cvvSize === 4
        ? `Enter the ${numberValidation.card?.code.name ?? 'CID'} (4 digits).`
        : 'Enter the 3-digit security code.';
  }

  const nameCheck = cardValidator.cardholderName(input.nameOnCard);
  if (!nameCheck.isValid) {
    errors.nameOnCard = nameCheck.isPotentiallyValid
      ? 'Enter the name shown on the card.'
      : 'Use your name as printed on the card (not only numbers).';
  }

  return errors;
}

export function receiptLabelFromEnteredCard(cardDigits: string) {
  const num = cardValidator.number(cardDigits);
  const label = num.card?.niceType ?? 'Card';
  const d = digitsOnly(cardDigits);
  const last4 = d.slice(-4).padStart(4, '0').slice(-4);
  return `${label} ···· ${last4}`;
}

export function cvvMaxLengthForPan(cardDigits: string) {
  return cardValidator.number(cardDigits).card?.code?.size ?? 4;
}

export function cardNumberInputMaxLength(cardDigits: string) {
  const lengths = cardValidator.number(cardDigits).card?.lengths;
  const max = lengths?.length ? Math.max(...lengths) : 19;
  const { card } = cardValidator.number(cardDigits.slice(0, Math.min(6, cardDigits.length)));
  const gaps = card?.gaps ?? [4, 8, 12];
  const spaceCount = gaps.filter(g => g <= max).length;
  return max + spaceCount;
}
