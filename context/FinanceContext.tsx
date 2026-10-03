'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  Transaction,
  Subscription,
  Profile,
  SubscriptionTier,
  Language,
  CurrencyConfig,
  User,
  PlannedPayment,
  UtilityBill,
  DebtItem
} from '@/types';
import { DEFAULT_TRANSACTIONS } from '@/constants/categories';
import { AVATARS } from '@/constants/avatars';
import { FRAMES } from '@/constants/frames';
import { APP_ICONS } from '@/constants/icons';
import { LANGUAGES } from '@/constants/languages';
import { TRANSLATIONS } from '@/constants/translations';
import confetti from 'canvas-confetti';

interface ToastState {
  message: string;
  visible: boolean;
}

interface FinanceContextType {
  isMounted: boolean;
  transactions: Transaction[];
  subscription: Subscription;
  profile: Profile;
  theme: string;
  iconVariant: number;
  filter: 'all' | 'expense' | 'income';
  
  // Language & Currency
  language: Language;
  currency: CurrencyConfig;
  t: (typeof TRANSLATIONS)['uk'];
  setLanguage: (lang: Language) => void;

  // Auth & User
  user: User;
  isAuthModalOpen: boolean;
  isGoogleChooserOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  setIsGoogleChooserOpen: (open: boolean) => void;
  continueAsGuest: () => void;
  loginWithGoogle: (email: string, name?: string) => void;
  logout: () => void;

  // Modals
  isDrawerOpen: boolean;
  isSubModalOpen: boolean;
  isCheckoutModalOpen: boolean;
  checkoutTier: 'premium' | 'delux' | 'super_premium';
  isProfileModalOpen: boolean;
  isTxModalOpen: boolean;
  isPlannedModalOpen: boolean;
  isUtilityModalOpen: boolean;
  isDebtModalOpen: boolean;
  
  toast: ToastState;
  
  // Planned Payments
  plannedPayments: PlannedPayment[];
  addPlannedPayment: (payment: Omit<PlannedPayment, 'id' | 'isPaid' | 'createdAt'>) => void;
  togglePaidPlannedPayment: (id: string, executeAsTransaction?: boolean) => void;
  deletePlannedPayment: (id: string) => void;
  clearAllPlannedPayments: () => void;
  setIsPlannedModalOpen: (open: boolean) => void;
  
  // Utility Bills
  utilityBills: UtilityBill[];
  setIsUtilityModalOpen: (open: boolean) => void;
  addUtilityBill: (bill: Omit<UtilityBill, 'id' | 'isPaid' | 'createdAt'>) => void;
  togglePaidUtilityBill: (id: string, executeAsTransaction?: boolean) => void;
  deleteUtilityBill: (id: string) => void;
  clearAllUtilityBills: () => void;

  // Debts
  debts: DebtItem[];
  setIsDebtModalOpen: (open: boolean) => void;
  addDebt: (debt: Omit<DebtItem, 'id' | 'paidAmount' | 'isClosed' | 'closedAt' | 'createdAt'>) => void;
  repayDebt: (id: string, paymentAmount: number, executeAsTransaction?: boolean) => void;
  deleteDebt: (id: string) => void;
  clearAllDebts: () => void;
  
  // Methods
  setFilter: (filter: 'all' | 'expense' | 'income') => void;
  setIsDrawerOpen: (open: boolean) => void;
  setIsSubModalOpen: (open: boolean) => void;
  setIsCheckoutModalOpen: (open: boolean) => void;
  setIsProfileModalOpen: (open: boolean) => void;
  setIsTxModalOpen: (open: boolean) => void;
  
  addTransaction: (tx: Omit<Transaction, 'id'>) => void;
  deleteTransaction: (id: string) => void;
  clearAllTransactions: () => void;
  toggleTheme: () => void;
  toggleIconVariant: () => void;
  openCheckout: (tier: 'premium' | 'delux' | 'super_premium') => void;
  completePayment: (tier: 'premium' | 'delux' | 'super_premium') => void;
  purchasedTiers: SubscriptionTier[];
  hasPurchasedTier: (tier: SubscriptionTier) => boolean;
  switchSubscription: (tier: SubscriptionTier) => void;
  selectAvatar: (avatarId: string) => boolean;
  selectFrame: (frameId: string) => boolean;
  updateProfileName: (name: string) => void;
  resetData: () => void;
  showToast: (msg: string) => void;
  triggerCelebration: () => void;
}

const DEFAULT_PLANNED_PAYMENTS: PlannedPayment[] = [];

const FinanceContext = createContext<FinanceContextType | undefined>(undefined);

export const FinanceProvider = ({ children }: { children: ReactNode }) => {
  const [isMounted, setIsMounted] = useState(false);
  const [transactions, setTransactions] = useState<Transaction[]>(DEFAULT_TRANSACTIONS);
  const [plannedPayments, setPlannedPayments] = useState<PlannedPayment[]>(DEFAULT_PLANNED_PAYMENTS);
  const [isPlannedModalOpen, setIsPlannedModalOpen] = useState(false);
  const [utilityBills, setUtilityBills] = useState<UtilityBill[]>([]);
  const [isUtilityModalOpen, setIsUtilityModalOpen] = useState(false);
  const [debts, setDebts] = useState<DebtItem[]>([]);
  const [isDebtModalOpen, setIsDebtModalOpen] = useState(false);
  const [subscription, setSubscription] = useState<Subscription>({ tier: 'free', name: 'Базовий', activeSince: null });
  const [purchasedTiers, setPurchasedTiers] = useState<SubscriptionTier[]>(['free']);
  const [profile, setProfile] = useState<Profile>({ name: 'Фінансовий Лідер', avatarId: 'fox', frameId: 'frame-none' });
  const [theme, setTheme] = useState<string>('dark');
  const [iconVariant, setIconVariant] = useState<number>(2);
  const [filter, setFilter] = useState<'all' | 'expense' | 'income'>('all');

  // Language & Currency
  const [language, setLanguageState] = useState<Language>('uk');

  // User & Auth State
  const [user, setUser] = useState<User>({
    isLoggedIn: false,
    email: null,
    name: null,
    provider: 'guest'
  });
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isGoogleChooserOpen, setIsGoogleChooserOpen] = useState(false);

  // Modals
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isSubModalOpen, setIsSubModalOpen] = useState(false);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [checkoutTier, setCheckoutTier] = useState<'premium' | 'delux' | 'super_premium'>('premium');
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isTxModalOpen, setIsTxModalOpen] = useState(false);

  const [toast, setToast] = useState<ToastState>({ message: '', visible: false });

  // Initial client load
  useEffect(() => {
    setIsMounted(true);
    try {
      const savedTx = localStorage.getItem('tmf_transactions');
      if (savedTx) {
        try {
          const parsed = JSON.parse(savedTx);
          if (Array.isArray(parsed)) {
            const testIds = new Set(['t1', 't2', 't3', 't4', 't5', 't6']);
            const cleaned = parsed.filter((t: Transaction) => !testIds.has(t.id));
            setTransactions(cleaned);
            localStorage.setItem('tmf_transactions', JSON.stringify(cleaned));
          } else {
            setTransactions([]);
            localStorage.setItem('tmf_transactions', JSON.stringify([]));
          }
        } catch {
          setTransactions([]);
        }
      } else {
        setTransactions([]);
      }

      const savedPlanned = localStorage.getItem('tmf_planned_payments');
      if (savedPlanned) {
        try {
          const parsed = JSON.parse(savedPlanned);
          if (Array.isArray(parsed)) {
            const testPlanIds = new Set(['plan-1', 'plan-2', 'plan-3']);
            const cleaned = parsed.filter((p: PlannedPayment) => !testPlanIds.has(p.id));
            setPlannedPayments(cleaned);
            localStorage.setItem('tmf_planned_payments', JSON.stringify(cleaned));
          } else {
            setPlannedPayments([]);
            localStorage.setItem('tmf_planned_payments', JSON.stringify([]));
          }
        } catch {
          setPlannedPayments([]);
        }
      } else {
        setPlannedPayments([]);
      }

      const savedUtilities = localStorage.getItem('tmf_utility_bills');
      if (savedUtilities) {
        try {
          const parsed = JSON.parse(savedUtilities);
          if (Array.isArray(parsed)) {
            setUtilityBills(parsed);
          } else {
            setUtilityBills([]);
          }
        } catch {
          setUtilityBills([]);
        }
      } else {
        setUtilityBills([]);
      }

      const savedDebts = localStorage.getItem('tmf_debts');
      if (savedDebts) {
        try {
          const parsed = JSON.parse(savedDebts);
          if (Array.isArray(parsed)) {
            setDebts(parsed);
          } else {
            setDebts([]);
          }
        } catch {
          setDebts([]);
        }
      } else {
        setDebts([]);
      }

      // 1. Спочатку читаємо стан користувача
      const savedUserStr = localStorage.getItem('tmf_user');
      let currentUser: User = {
        isLoggedIn: false,
        email: null,
        name: null,
        provider: 'guest'
      };

      if (savedUserStr) {
        try {
          const parsed = JSON.parse(savedUserStr);
          if (parsed && typeof parsed === 'object') {
            currentUser = parsed;
          }
        } catch {}
      }
      setUser(currentUser);

      const isKakaoVip = currentUser.isLoggedIn && currentUser.email?.trim().toLowerCase() === 'kakao6767676767@gmail.com';

      // 2. Підписки, тарифи та профіль відповідно до акаунта
      if (isKakaoVip) {
        const allTiers: SubscriptionTier[] = ['free', 'premium', 'delux', 'super_premium'];
        setPurchasedTiers(allTiers);
        localStorage.setItem('tmf_purchased_tiers', JSON.stringify(allTiers));

        const savedSub = localStorage.getItem('tmf_subscription');
        if (savedSub) {
          try {
            setSubscription(JSON.parse(savedSub));
          } catch {
            setSubscription({ tier: 'delux', name: 'FinanseDelux (VIP)', activeSince: new Date().toISOString() });
          }
        } else {
          setSubscription({ tier: 'delux', name: 'FinanseDelux (VIP)', activeSince: new Date().toISOString() });
        }

        const savedProfile = localStorage.getItem('tmf_profile');
        if (savedProfile) {
          try { setProfile(JSON.parse(savedProfile)); } catch {}
        } else {
          setProfile({ name: 'Kakao VIP', avatarId: 'dragon', frameId: 'frame-google-vip' });
        }
      } else if (currentUser.isLoggedIn) {
        // Інший авторизований Google користувач
        const savedSub = localStorage.getItem('tmf_subscription');
        if (savedSub) {
          try { setSubscription(JSON.parse(savedSub)); } catch {}
        }
        const savedTiers = localStorage.getItem('tmf_purchased_tiers');
        if (savedTiers) {
          try { setPurchasedTiers(JSON.parse(savedTiers)); } catch {}
        }
        const savedProfile = localStorage.getItem('tmf_profile');
        if (savedProfile) {
          try { setProfile(JSON.parse(savedProfile)); } catch {}
        }
      } else {
        // КОРИСТУВАЧ НЕ ВХОДИВ (Гість) - Kakao VIP дані суворо заблоковані!
        const savedProfile = localStorage.getItem('tmf_profile');
        if (savedProfile) {
          try {
            const p: Profile = JSON.parse(savedProfile);
            if (p.name === 'Kakao VIP' || p.frameId === 'frame-google-vip') {
              const guestProfile: Profile = { name: 'Фінансовий Лідер', avatarId: 'fox', frameId: 'frame-none' };
              setProfile(guestProfile);
              localStorage.setItem('tmf_profile', JSON.stringify(guestProfile));
            } else {
              setProfile(p);
            }
          } catch {
            setProfile({ name: 'Фінансовий Лідер', avatarId: 'fox', frameId: 'frame-none' });
          }
        } else {
          setProfile({ name: 'Фінансовий Лідер', avatarId: 'fox', frameId: 'frame-none' });
        }

        const savedSub = localStorage.getItem('tmf_subscription');
        if (savedSub) {
          try {
            const s: Subscription = JSON.parse(savedSub);
            if (s.name?.includes('VIP') || s.tier !== 'free') {
              const guestSub: Subscription = { tier: 'free', name: 'Базовий', activeSince: null };
              setSubscription(guestSub);
              localStorage.setItem('tmf_subscription', JSON.stringify(guestSub));
              setPurchasedTiers(['free']);
              localStorage.setItem('tmf_purchased_tiers', JSON.stringify(['free']));
            } else {
              setSubscription(s);
              const savedTiers = localStorage.getItem('tmf_purchased_tiers');
              if (savedTiers) {
                try { setPurchasedTiers(JSON.parse(savedTiers)); } catch {}
              }
            }
          } catch {
            setSubscription({ tier: 'free', name: 'Базовий', activeSince: null });
            setPurchasedTiers(['free']);
          }
        } else {
          setSubscription({ tier: 'free', name: 'Базовий', activeSince: null });
          setPurchasedTiers(['free']);
        }

        const authSeen = localStorage.getItem('tmf_auth_seen');
        if (!authSeen) {
          setIsAuthModalOpen(true);
        }
      }

      // 3. Тема, мова, іконка
      const savedTheme = localStorage.getItem('tmf_theme') || 'dark';
      setTheme(savedTheme);
      document.documentElement.setAttribute('data-theme', savedTheme);

      const savedIcon = parseInt(localStorage.getItem('tmf_icon') || '2', 10);
      setIconVariant(savedIcon);
      updateFavicon(savedIcon);

      const savedLang = (localStorage.getItem('tmf_lang') as Language) || 'uk';
      if (LANGUAGES[savedLang]) {
        setLanguageState(savedLang);
      }
    } catch (e) {
      console.error('Error loading localStorage:', e);
    }
  }, []);

  const updateFavicon = (variant: number) => {
    try {
      const icon = APP_ICONS[variant] || APP_ICONS[2];
      let link: HTMLLinkElement | null = document.querySelector("link[rel*='icon']");
      if (!link) {
        link = document.createElement('link');
        link.rel = 'shortcut icon';
        document.getElementsByTagName('head')[0].appendChild(link);
      }
      link.href = icon.favicon;
    } catch (e) {
      console.error('Favicon update error:', e);
    }
  };

  const showToast = (message: string) => {
    setToast({ message, visible: true });
    setTimeout(() => {
      setToast(prev => ({ ...prev, visible: false }));
    }, 3200);
  };

  const triggerCelebration = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {
      console.error('Confetti error:', e);
    }
  };

  const setLanguage = (lang: Language) => {
    if (LANGUAGES[lang]) {
      setLanguageState(lang);
      localStorage.setItem('tmf_lang', lang);
      showToast(`Мову змінено: ${LANGUAGES[lang].flag} ${LANGUAGES[lang].name} (${LANGUAGES[lang].symbol})`);
    }
  };

  // Google Login Logic
  const loginWithGoogle = (email: string, name?: string) => {
    const cleanEmail = email.trim().toLowerCase();
    const isVipSpecial = cleanEmail === 'kakao6767676767@gmail.com';
    const userName = name || (isVipSpecial ? 'Kakao VIP' : email.split('@')[0]);

    const newUser: User = {
      isLoggedIn: true,
      email: email.trim(),
      name: userName,
      provider: 'google'
    };

    setUser(newUser);
    localStorage.setItem('tmf_user', JSON.stringify(newUser));
    localStorage.setItem('tmf_auth_seen', 'true');
    setIsAuthModalOpen(false);
    setIsGoogleChooserOpen(false);

    if (isVipSpecial) {
      // Автоматично надаємо FinansePremium та FinanseDelux назавжди!
      const vipSub: Subscription = {
        tier: 'delux',
        name: 'FinanseDelux (VIP)',
        activeSince: new Date().toISOString()
      };
      setSubscription(vipSub);
      localStorage.setItem('tmf_subscription', JSON.stringify(vipSub));

      const allTiers: SubscriptionTier[] = ['free', 'premium', 'delux'];
      setPurchasedTiers(allTiers);
      localStorage.setItem('tmf_purchased_tiers', JSON.stringify(allTiers));

      const updatedProfile: Profile = {
        name: 'Kakao VIP',
        avatarId: 'dragon',
        frameId: 'frame-google-vip'
      };
      setProfile(updatedProfile);
      localStorage.setItem('tmf_profile', JSON.stringify(updatedProfile));

      triggerCelebration();
      showToast('👑 Вітаємо, kakao6767676767@gmail.com! FinansePremium та FinanseDelux активовано назавжди!');
    } else {
      // Для будь-якого авторизованого користувача надаємо ексклюзивну рамку Google
      setProfile(prev => {
        const p = { ...prev, name: userName, frameId: 'frame-google-vip' };
        localStorage.setItem('tmf_profile', JSON.stringify(p));
        return p;
      });
      triggerCelebration();
      showToast(`✅ Успішний вхід (${email.trim()})! Рамку Google Titan Aura активовано!`);
    }
  };

  const continueAsGuest = () => {
    localStorage.setItem('tmf_auth_seen', 'true');
    setIsAuthModalOpen(false);
    showToast('👋 Ви увійшли як гість. Дані зберігаються локально.');
  };

  const logout = () => {
    setUser({
      isLoggedIn: false,
      email: null,
      name: null,
      provider: 'guest'
    });
    localStorage.removeItem('tmf_user');

    const cleanProfile: Profile = {
      name: 'Фінансовий Лідер',
      avatarId: 'fox',
      frameId: 'frame-none'
    };
    setProfile(cleanProfile);
    localStorage.setItem('tmf_profile', JSON.stringify(cleanProfile));

    const freeSub: Subscription = {
      tier: 'free',
      name: 'Базовий',
      activeSince: null
    };
    setSubscription(freeSub);
    localStorage.setItem('tmf_subscription', JSON.stringify(freeSub));

    const freeTiers: SubscriptionTier[] = ['free'];
    setPurchasedTiers(freeTiers);
    localStorage.setItem('tmf_purchased_tiers', JSON.stringify(freeTiers));

    setIsGoogleChooserOpen(false);
    setIsProfileModalOpen(false);
    showToast('🚪 Ви успішно вийшли з акаунта');
  };

  const addTransaction = (data: Omit<Transaction, 'id'>) => {
    const newTx: Transaction = {
      ...data,
      id: 'tx_' + Date.now()
    };
    const updated = [newTx, ...transactions];
    setTransactions(updated);
    localStorage.setItem('tmf_transactions', JSON.stringify(updated));
    showToast(`✅ Операцію додано: ${data.type === 'income' ? '+' : '-'}${data.amount.toLocaleString(LANGUAGES[language].locale)} ${LANGUAGES[language].symbol}`);
  };

  const deleteTransaction = (id: string) => {
    const updated = transactions.filter(t => t.id !== id);
    setTransactions(updated);
    localStorage.setItem('tmf_transactions', JSON.stringify(updated));
    showToast('🗑️ Транзакцію видалено');
  };

  const clearAllTransactions = () => {
    setTransactions([]);
    localStorage.setItem('tmf_transactions', JSON.stringify([]));
    showToast('🗑️ Всю історію операцій очищено');
  };

  const addPlannedPayment = (data: Omit<PlannedPayment, 'id' | 'isPaid' | 'createdAt'>) => {
    const newPayment: PlannedPayment = {
      ...data,
      id: 'plan_' + Date.now(),
      isPaid: false,
      createdAt: new Date().toISOString()
    };
    const updated = [newPayment, ...plannedPayments];
    setPlannedPayments(updated);
    localStorage.setItem('tmf_planned_payments', JSON.stringify(updated));
    showToast(`📅 Платіж на потім додано: «${data.title}» (${data.amount.toLocaleString(LANGUAGES[language].locale)} ${LANGUAGES[language].symbol})`);
  };

  const togglePaidPlannedPayment = (id: string, executeAsTransaction: boolean = true) => {
    setPlannedPayments(prev => {
      const target = prev.find(p => p.id === id);
      if (!target) return prev;

      const willBePaid = !target.isPaid;
      const updated = prev.map(p => {
        if (p.id === id) {
          return {
            ...p,
            isPaid: willBePaid,
            paidAt: willBePaid ? new Date().toISOString() : undefined
          };
        }
        return p;
      });

      localStorage.setItem('tmf_planned_payments', JSON.stringify(updated));

      if (willBePaid) {
        if (executeAsTransaction) {
          // Автоматично списуємо з балансу як витрату!
          addTransaction({
            type: 'expense',
            amount: target.amount,
            category: target.category,
            note: `Сплачено платіж: ${target.title}`,
            date: new Date().toISOString().split('T')[0]
          });
        }
        triggerCelebration();
        showToast(`✅ Платіж «${target.title}» сплачено${executeAsTransaction ? ' та додано до витрат!' : '!'}`);
      } else {
        showToast(`ℹ️ Платіж «${target.title}» повернуто до очікування.`);
      }

      return updated;
    });
  };

  const deletePlannedPayment = (id: string) => {
    const updated = plannedPayments.filter(p => p.id !== id);
    setPlannedPayments(updated);
    localStorage.setItem('tmf_planned_payments', JSON.stringify(updated));
    showToast('🗑️ Платіж видалено');
  };

  const clearAllPlannedPayments = () => {
    setPlannedPayments([]);
    localStorage.setItem('tmf_planned_payments', JSON.stringify([]));
    showToast('🗑️ Всі плановані платежі видалено');
  };

  const addUtilityBill = (data: Omit<UtilityBill, 'id' | 'isPaid' | 'createdAt'>) => {
    const newBill: UtilityBill = {
      ...data,
      id: 'util_' + Date.now(),
      isPaid: false,
      createdAt: new Date().toISOString()
    };
    const updated = [newBill, ...utilityBills];
    setUtilityBills(updated);
    localStorage.setItem('tmf_utility_bills', JSON.stringify(updated));
    showToast(`💡 Комунальний платіж додано: «${data.title}» (${data.amount.toLocaleString(LANGUAGES[language].locale)} ${LANGUAGES[language].symbol})`);
  };

  const togglePaidUtilityBill = (id: string, executeAsTransaction: boolean = true) => {
    setUtilityBills(prev => {
      const target = prev.find(b => b.id === id);
      if (!target) return prev;

      const willBePaid = !target.isPaid;
      const updated = prev.map(b => {
        if (b.id === id) {
          return {
            ...b,
            isPaid: willBePaid,
            paidAt: willBePaid ? new Date().toISOString() : undefined
          };
        }
        return b;
      });

      localStorage.setItem('tmf_utility_bills', JSON.stringify(updated));

      if (willBePaid) {
        if (executeAsTransaction) {
          addTransaction({
            type: 'expense',
            amount: target.amount,
            category: 'Комунальні',
            note: `Сплачено комуналку: ${target.title} (${target.period})`,
            date: new Date().toISOString().split('T')[0]
          });
        }
        triggerCelebration();
        showToast(`✅ Рахунок «${target.title}» сплачено${executeAsTransaction ? ' та додано до витрат!' : '!'}`);
      } else {
        showToast(`ℹ️ Рахунок «${target.title}» повернуто до очікування.`);
      }

      return updated;
    });
  };

  const deleteUtilityBill = (id: string) => {
    const updated = utilityBills.filter(b => b.id !== id);
    setUtilityBills(updated);
    localStorage.setItem('tmf_utility_bills', JSON.stringify(updated));
    showToast('🗑️ Комунальний платіж видалено');
  };

  const clearAllUtilityBills = () => {
    setUtilityBills([]);
    localStorage.setItem('tmf_utility_bills', JSON.stringify([]));
    showToast('🗑️ Всі комунальні платежі видалено');
  };

  const addDebt = (data: Omit<DebtItem, 'id' | 'paidAmount' | 'isClosed' | 'closedAt' | 'createdAt'>) => {
    const newDebt: DebtItem = {
      ...data,
      id: 'debt_' + Date.now(),
      paidAmount: 0,
      isClosed: false,
      createdAt: new Date().toISOString()
    };
    const updated = [newDebt, ...debts];
    setDebts(updated);
    localStorage.setItem('tmf_debts', JSON.stringify(updated));
    showToast(`🤝 Борг додано: «${data.person}» (${data.amount.toLocaleString(LANGUAGES[language].locale)} ${LANGUAGES[language].symbol})`);
  };

  const repayDebt = (id: string, paymentAmount: number, executeAsTransaction: boolean = true) => {
    setDebts(prev => {
      const target = prev.find(d => d.id === id);
      if (!target) return prev;

      const newPaid = Math.min(target.amount, target.paidAmount + paymentAmount);
      const isNowClosed = newPaid >= target.amount;

      const updated = prev.map(d => {
        if (d.id === id) {
          return {
            ...d,
            paidAmount: newPaid,
            isClosed: isNowClosed,
            closedAt: isNowClosed ? new Date().toISOString() : d.closedAt
          };
        }
        return d;
      });

      localStorage.setItem('tmf_debts', JSON.stringify(updated));

      if (executeAsTransaction && paymentAmount > 0) {
        if (target.type === 'they_owe_me') {
          // Мені повернули борг -> Дохід на баланс
          addTransaction({
            type: 'income',
            amount: paymentAmount,
            category: 'Інше',
            note: `Повернення боргу від: ${target.person}`,
            date: new Date().toISOString().split('T')[0]
          });
        } else {
          // Я повернув борг -> Витрата з балансу
          addTransaction({
            type: 'expense',
            amount: paymentAmount,
            category: 'Інше',
            note: `Погашення боргу перед: ${target.person}`,
            date: new Date().toISOString().split('T')[0]
          });
        }
      }

      if (isNowClosed) {
        triggerCelebration();
        showToast(`🎉 Борг з «${target.person}» повністю закрито!`);
      } else {
        showToast(`💳 Внесено платіж ${paymentAmount.toLocaleString(LANGUAGES[language].locale)} ${LANGUAGES[language].symbol}. Залишок: ${(target.amount - newPaid).toLocaleString(LANGUAGES[language].locale)} ${LANGUAGES[language].symbol}`);
      }

      return updated;
    });
  };

  const deleteDebt = (id: string) => {
    const updated = debts.filter(d => d.id !== id);
    setDebts(updated);
    localStorage.setItem('tmf_debts', JSON.stringify(updated));
    showToast('🗑️ Запис боргу видалено');
  };

  const clearAllDebts = () => {
    setDebts([]);
    localStorage.setItem('tmf_debts', JSON.stringify([]));
    showToast('🗑️ Всі записи боргів видалено');
  };

  const toggleTheme = () => {
    const next = theme === 'light' ? 'dark' : 'light';
    setTheme(next);
    localStorage.setItem('tmf_theme', next);
    document.documentElement.setAttribute('data-theme', next);
    showToast(`Інтерфейс змінено на: ${next === 'light' ? '☀️ Світлий Необанк' : '🌙 Темний Преміум'}`);
  };

  const toggleIconVariant = () => {
    const next = iconVariant === 1 ? 2 : 1;
    setIconVariant(next);
    localStorage.setItem('tmf_icon', next.toString());
    updateFavicon(next);
    showToast(`Встановлено: ${APP_ICONS[next].name}`);
  };

  const openCheckout = (tier: 'premium' | 'delux' | 'super_premium') => {
    setCheckoutTier(tier);
    setIsSubModalOpen(false);
    setIsProfileModalOpen(false);
    setIsCheckoutModalOpen(true);
  };

  const completePayment = (tier: 'premium' | 'delux' | 'super_premium') => {
    const subName = tier === 'super_premium'
      ? 'FinanseSuperPremium'
      : (tier === 'delux' ? 'FinanseDelux' : 'FinansePremium');

    const newSub: Subscription = {
      tier,
      name: subName,
      activeSince: new Date().toISOString()
    };
    setSubscription(newSub);
    localStorage.setItem('tmf_subscription', JSON.stringify(newSub));

    // Додаємо придбані підписки
    const newPurchased: SubscriptionTier[] = tier === 'super_premium'
      ? ['free', 'premium', 'delux', 'super_premium']
      : tier === 'delux'
      ? ['free', 'premium', 'delux']
      : Array.from(new Set([...purchasedTiers, 'premium' as SubscriptionTier]));
    setPurchasedTiers(newPurchased);
    localStorage.setItem('tmf_purchased_tiers', JSON.stringify(newPurchased));

    if (tier === 'super_premium') {
      setProfile(prev => {
        const p = { ...prev, frameId: 'frame-super-delux', avatarId: 'tiger' };
        localStorage.setItem('tmf_profile', JSON.stringify(p));
        return p;
      });
    } else if (tier === 'delux') {
      setProfile(prev => {
        const p = { ...prev, frameId: 'frame-royal-gold', avatarId: 'lion' };
        localStorage.setItem('tmf_profile', JSON.stringify(p));
        return p;
      });
    } else if (tier === 'premium') {
      setProfile(prev => {
        const p = { ...prev, avatarId: 'cat' };
        localStorage.setItem('tmf_profile', JSON.stringify(p));
        return p;
      });
    }

    triggerCelebration();
    showToast(`🎉 Вітаємо з підключенням ${newSub.name}! Усі переваги активовано.`);
  };

  const hasPurchasedTier = (tier: SubscriptionTier): boolean => {
    if (tier === 'free') return true;
    if (user.isLoggedIn && user.email?.trim().toLowerCase() === 'kakao6767676767@gmail.com') return true;
    if (subscription.tier === 'super_premium' || purchasedTiers.includes('super_premium')) return true;
    if (tier === 'delux') {
      return subscription.tier === 'delux' || purchasedTiers.includes('delux');
    }
    if (tier === 'premium') {
      return subscription.tier !== 'free' || purchasedTiers.includes('premium') || purchasedTiers.includes('delux');
    }
    return purchasedTiers.includes(tier);
  };

  const switchSubscription = (tier: SubscriptionTier) => {
    if (!hasPurchasedTier(tier)) {
      const planName = tier === 'super_premium' ? 'FinanseSuperPremium' : (tier === 'delux' ? 'FinanseDelux' : 'FinansePremium');
      showToast(`🔒 Підписка «${planName}» ще не придбана! Оформіть її для перемикання.`);
      setIsProfileModalOpen(false);
      openCheckout(tier as 'premium' | 'delux' | 'super_premium');
      return;
    }

    const subName = tier === 'super_premium'
      ? 'FinanseSuperPremium'
      : (tier === 'delux' ? 'FinanseDelux' : (tier === 'premium' ? 'FinansePremium' : 'Базовий'));
    const newSub: Subscription = {
      tier,
      name: subName,
      activeSince: tier === 'free' ? null : new Date().toISOString()
    };
    setSubscription(newSub);
    localStorage.setItem('tmf_subscription', JSON.stringify(newSub));

    if (tier !== 'free') {
      triggerCelebration();
    }
    showToast(`🔄 Підписку перемкнуто на: ${subName}`);
  };

  const updateProfileName = (newName: string) => {
    const trimmed = newName.trim();
    if (!trimmed) {
      showToast('⚠️ Нікнейм не може бути порожнім!');
      return;
    }
    if (trimmed.length > 30) {
      showToast('⚠️ Нікнейм не може бути довшим за 30 символів!');
      return;
    }

    setProfile(prev => {
      const updated = { ...prev, name: trimmed };
      localStorage.setItem('tmf_profile', JSON.stringify(updated));
      return updated;
    });

    if (user.isLoggedIn) {
      setUser(prev => {
        const updated = { ...prev, name: trimmed };
        localStorage.setItem('tmf_user', JSON.stringify(updated));
        return updated;
      });
    }

    showToast(`✅ Нікнейм змінено на: «${trimmed}»`);
  };

  const selectAvatar = (avatarId: string): boolean => {
    const avatar = AVATARS.find(a => a.id === avatarId);
    if (!avatar) return false;

    if (avatar.tierRequired) {
      const hasReq = hasPurchasedTier(avatar.tierRequired) || subscription.tier === avatar.tierRequired || subscription.tier === 'super_premium';
      if (!hasReq) {
        const reqName = avatar.tierRequired === 'super_premium' ? 'FinanseSuperPremium' : 'FinanseDelux';
        showToast(`🔒 Аватарка «${avatar.name}» входить до підписки ${reqName}!`);
        return false;
      }
    } else if (avatar.vip) {
      const canUseVip = hasPurchasedTier('premium') || hasPurchasedTier('delux') || hasPurchasedTier('super_premium') || subscription.tier !== 'free';
      if (!canUseVip) {
        showToast(`🔒 Аватарка «${avatar.name}» доступна тільки з підпискою FinansePremium або вище!`);
        return false;
      }
    }

    const updated = { ...profile, avatarId };
    setProfile(updated);
    localStorage.setItem('tmf_profile', JSON.stringify(updated));
    showToast(`✅ Встановлено аватарку: ${avatar.name}`);
    return true;
  };

  const selectFrame = (frameId: string): boolean => {
    const frame = FRAMES.find(f => f.id === frameId);
    if (!frame) return false;

    if (frame.requiresGoogleAuth && !user.isLoggedIn) {
      showToast(`🌐 Рамка «${frame.name}» доступна для користувачів, які увійшли через Google!`);
      setIsGoogleChooserOpen(true);
      return false;
    }

    if (frame.tierRequired) {
      const hasTier = hasPurchasedTier(frame.tierRequired) || subscription.tier === 'super_premium' || subscription.tier === frame.tierRequired;
      if (!hasTier) {
        const reqName = frame.tierRequired === 'super_premium' ? 'FinanseSuperPremium' : 'FinanseDelux';
        showToast(`👑 Рамка «${frame.name}» доступна тільки з підпискою ${reqName}!`);
        return false;
      }
    } else if (frame.vip && !frame.requiresGoogleAuth) {
      const canUseDelux = hasPurchasedTier('delux') || hasPurchasedTier('super_premium') || subscription.tier === 'delux' || subscription.tier === 'super_premium';
      if (!canUseDelux) {
        showToast(`👑 Рамка «${frame.name}» доступна тільки з підпискою FinanseDelux або вище!`);
        return false;
      }
    }

    const updated = { ...profile, frameId };
    setProfile(updated);
    localStorage.setItem('tmf_profile', JSON.stringify(updated));
    showToast(`✅ Встановлено рамку: ${frame.name}`);
    return true;
  };

  const resetData = () => {
    localStorage.clear();
    setTransactions(DEFAULT_TRANSACTIONS);
    setPlannedPayments(DEFAULT_PLANNED_PAYMENTS);
    setUtilityBills([]);
    setDebts([]);
    setSubscription({ tier: 'free', name: 'Базовий', activeSince: null });
    setPurchasedTiers(['free']);
    setProfile({ name: 'Фінансовий Лідер', avatarId: 'fox', frameId: 'frame-none' });
    setUser({ isLoggedIn: false, email: null, name: null, provider: 'guest' });
    setTheme('dark');
    setIconVariant(2);
    setLanguageState('uk');
    document.documentElement.setAttribute('data-theme', 'dark');
    showToast('Всі дані успішно скинуто до початкових');
  };

  return (
    <FinanceContext.Provider
      value={{
        isMounted,
        transactions,
        plannedPayments,
        utilityBills,
        debts,
        subscription,
        profile,
        theme,
        iconVariant,
        filter,
        language,
        currency: LANGUAGES[language],
        t: TRANSLATIONS[language],
        setLanguage,
        user,
        isAuthModalOpen,
        isGoogleChooserOpen,
        setIsAuthModalOpen,
        setIsGoogleChooserOpen,
        continueAsGuest,
        loginWithGoogle,
        logout,
        isDrawerOpen,
        isSubModalOpen,
        isCheckoutModalOpen,
        checkoutTier,
        isProfileModalOpen,
        isTxModalOpen,
        isPlannedModalOpen,
        isUtilityModalOpen,
        isDebtModalOpen,
        toast,
        setFilter,
        setIsDrawerOpen,
        setIsSubModalOpen,
        setIsCheckoutModalOpen,
        setIsProfileModalOpen,
        setIsTxModalOpen,
        setIsPlannedModalOpen,
        setIsUtilityModalOpen,
        setIsDebtModalOpen,
        addTransaction,
        deleteTransaction,
        clearAllTransactions,
        addPlannedPayment,
        togglePaidPlannedPayment,
        deletePlannedPayment,
        clearAllPlannedPayments,
        addUtilityBill,
        togglePaidUtilityBill,
        deleteUtilityBill,
        clearAllUtilityBills,
        addDebt,
        repayDebt,
        deleteDebt,
        clearAllDebts,
        toggleTheme,
        toggleIconVariant,
        openCheckout,
        completePayment,
        purchasedTiers,
        hasPurchasedTier,
        switchSubscription,
        selectAvatar,
        selectFrame,
        updateProfileName,
        resetData,
        showToast,
        triggerCelebration
      }}
    >
      {children}
    </FinanceContext.Provider>
  );
};

export const useFinance = () => {
  const context = useContext(FinanceContext);
  if (!context) {
    throw new Error('useFinance must be used within a FinanceProvider');
  }
  return context;
};
