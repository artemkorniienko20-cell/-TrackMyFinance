/**
 * Валідатор банківських карток за алгоритмом Луна (Luhn Algorithm)
 * та перевірка терміну дії (Expiry) і CVV
 */

export interface CardValidationResult {
  isValid: boolean;
  brand: 'visa' | 'mastercard' | 'amex' | 'unknown';
  error?: string;
}

export function validateCardNumber(cardNumber: string): CardValidationResult {
  const digits = cardNumber.replace(/\D/g, '');

  if (!digits) {
    return { isValid: false, brand: 'unknown', error: 'Введіть номер картки' };
  }

  if (digits.length < 13 || digits.length > 19) {
    return { isValid: false, brand: 'unknown', error: 'Номер картки повинен містити від 13 до 19 цифр' };
  }

  // Визначення бренду
  let brand: 'visa' | 'mastercard' | 'amex' | 'unknown' = 'unknown';
  if (/^4/.test(digits)) {
    brand = 'visa';
  } else if (/^(5[1-5]|2[2-7])/.test(digits)) {
    brand = 'mastercard';
  } else if (/^3[47]/.test(digits)) {
    brand = 'amex';
  }

  // Алгоритм Луна (Mod 10 Checksum)
  let sum = 0;
  let alternate = false;

  for (let i = digits.length - 1; i >= 0; i--) {
    let n = parseInt(digits.charAt(i), 10);
    if (alternate) {
      n *= 2;
      if (n > 9) n -= 9;
    }
    sum += n;
    alternate = !alternate;
  }

  if (sum % 10 !== 0) {
    return {
      isValid: false,
      brand,
      error: 'Недійсний номер картки (помилка контрольної суми алгоритму Луна)'
    };
  }

  return { isValid: true, brand };
}

export function validateCardExpiry(expiry: string): { isValid: boolean; error?: string } {
  const clean = expiry.trim();
  const match = clean.match(/^(\d{2})\/(\d{2})$/);

  if (!match) {
    return { isValid: false, error: 'Формат терміну дії має бути MM/YY (наприклад 08/28)' };
  }

  const month = parseInt(match[1], 10);
  const yearTwoDigits = parseInt(match[2], 10);

  if (month < 1 || month > 12) {
    return { isValid: false, error: 'Місяць має бути в діапазоні від 01 до 12' };
  }

  const now = new Date();
  const currentYearTwoDigits = now.getFullYear() % 100;
  const currentMonth = now.getMonth() + 1;

  if (yearTwoDigits < currentYearTwoDigits || (yearTwoDigits === currentYearTwoDigits && month < currentMonth)) {
    return { isValid: false, error: 'Термін дії картки вже минув' };
  }

  if (yearTwoDigits > currentYearTwoDigits + 15) {
    return { isValid: false, error: 'Вказано занадто далекий рік дії' };
  }

  return { isValid: true };
}

export function validateCardCvv(cvv: string): { isValid: boolean; error?: string } {
  const digits = cvv.replace(/\D/g, '');
  if (digits.length !== 3 && digits.length !== 4) {
    return { isValid: false, error: 'CVV повинен містити 3 або 4 цифри' };
  }
  return { isValid: true };
}
