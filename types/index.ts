export type TransactionType = 'income' | 'expense';

export interface Transaction {
  id: string;
  type: TransactionType;
  amount: number;
  category: string;
  note: string;
  date: string;
}

export type SubscriptionTier = 'free' | 'premium' | 'delux' | 'super_premium';

export interface Subscription {
  tier: SubscriptionTier;
  name: string;
  activeSince: string | null;
}

export interface Profile {
  name: string;
  avatarId: string;
  frameId: string;
}

export interface AvatarItem {
  id: string;
  name: string;
  vip: boolean;
  tierRequired?: SubscriptionTier;
  desc?: string;
  svg: string;
}

export interface FrameItem {
  id: string;
  name: string;
  icon: string;
  vip: boolean;
  tierRequired?: SubscriptionTier;
  desc?: string;
  requiresGoogleAuth?: boolean;
}

export interface AppIconItem {
  id: number;
  name: string;
  svg: string;
  favicon: string;
}

export type Language = 'uk' | 'en' | 'pl' | 'ru' | 'sv' | 'ro';

export interface CurrencyConfig {
  code: string;
  symbol: string;
  locale: string;
  name: string;
  flag: string;
  premiumPrice: number;
  deluxPrice: number;
  superPremiumPrice: number;
}

export interface User {
  isLoggedIn: boolean;
  email: string | null;
  name: string | null;
  avatarUrl?: string;
  provider?: 'google' | 'guest';
}

export interface PlannedPayment {
  id: string;
  title: string;
  amount: number;
  category: string;
  dueDate: string; // YYYY-MM-DD
  note?: string;
  isPaid: boolean;
  paidAt?: string;
  createdAt: string;
}

export type UtilityCategory =
  | 'electricity'
  | 'cold_water'
  | 'hot_water'
  | 'gas'
  | 'gas_distribution'
  | 'heating'
  | 'osbb'
  | 'trash'
  | 'internet'
  | 'other';

export interface UtilityBill {
  id: string;
  title: string;
  category: UtilityCategory;
  period: string; // YYYY-MM
  accountNumber?: string;
  hasMeter: boolean;
  meterPrev?: number;
  meterCurrent?: number;
  unit?: string;
  tariff?: number;
  amount: number;
  dueDate: string; // YYYY-MM-DD
  note?: string;
  isPaid: boolean;
  paidAt?: string;
  createdAt: string;
}

export type DebtType = 'i_owe' | 'they_owe_me';

export interface DebtItem {
  id: string;
  type: DebtType;
  person: string;
  amount: number;
  paidAmount: number;
  dueDate?: string;
  note?: string;
  isClosed: boolean;
  closedAt?: string;
  createdAt: string;
}


