import { Transaction } from '@/types';

export const CATEGORY_COLORS: Record<string, string> = {
  'Продукти': '#10b981',
  'Транспорт': '#3b82f6',
  'Кафе та ресторани': '#f59e0b',
  'Комунальні': '#8b5cf6',
  'Розваги': '#ec4899',
  'Покупки': '#06b6d4',
  'Здоровʼя': '#ef4444',
  'Зарплата': '#10b981',
  'Фріланс': '#6366f1',
  'Інше': '#9ca3af'
};

export const CATEGORY_ICONS: Record<string, string> = {
  'Продукти': '🛒',
  'Транспорт': '🚗',
  'Кафе та ресторани': '☕',
  'Комунальні': '🏠',
  'Розваги': '🎮',
  'Покупки': '🛍️',
  'Здоровʼя': '💊',
  'Зарплата': '💰',
  'Фріланс': '💻',
  'Інше': '📦'
};

export const DEFAULT_TRANSACTIONS: Transaction[] = [];

