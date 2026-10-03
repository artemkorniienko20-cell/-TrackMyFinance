import { Language, CurrencyConfig } from '@/types';

export const LANGUAGES: Record<Language, CurrencyConfig> = {
  uk: {
    code: 'UAH',
    symbol: '₴',
    locale: 'uk-UA',
    name: 'Українська',
    flag: '🇺🇦',
    premiumPrice: 40,
    deluxPrice: 100,
    superPremiumPrice: 500
  },
  en: {
    code: 'USD',
    symbol: '$',
    locale: 'en-US',
    name: 'English',
    flag: '🇺🇸',
    premiumPrice: 1.99,
    deluxPrice: 4.99,
    superPremiumPrice: 12.99
  },
  pl: {
    code: 'PLN',
    symbol: 'zł',
    locale: 'pl-PL',
    name: 'Polski',
    flag: '🇵🇱',
    premiumPrice: 7,
    deluxPrice: 18,
    superPremiumPrice: 55
  },
  ru: {
    code: 'RUB',
    symbol: '₽',
    locale: 'ru-RU',
    name: 'Русский',
    flag: '🇷🇺',
    premiumPrice: 199,
    deluxPrice: 499,
    superPremiumPrice: 1290
  },
  sv: {
    code: 'SEK',
    symbol: 'kr',
    locale: 'sv-SE',
    name: 'Svenska',
    flag: '🇸🇪',
    premiumPrice: 25,
    deluxPrice: 59,
    superPremiumPrice: 139
  },
  ro: {
    code: 'RON',
    symbol: 'lei',
    locale: 'ro-RO',
    name: 'Română',
    flag: '🇷🇴',
    premiumPrice: 10,
    deluxPrice: 25,
    superPremiumPrice: 60
  }
};
