/**
 * TrackMyFinance - Core Application Logic
 * Supports personal finance tracking, FinansePremium (40 ₴) & FinanseDelux (100 ₴) subscriptions,
 * VIP custom avatars, 5 VIP animated frames, and interactive checkout flow.
 */

// ==========================================
// 1. ASSETS: APP ICONS (ІКОНКА 1 ТА ІКОНКА 2)
// ==========================================
const APP_ICONS = {
  1: {
    id: 1,
    name: 'Іконка 1: Смарагдовий Щит (₴)',
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="shieldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#10b981"/>
          <stop offset="100%" stop-color="#059669"/>
        </linearGradient>
        <linearGradient id="goldCoin" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#fef08a"/>
          <stop offset="50%" stop-color="#f59e0b"/>
          <stop offset="100%" stop-color="#d97706"/>
        </linearGradient>
      </defs>
      <rect x="4" y="4" width="92" height="92" rx="24" fill="url(#shieldGrad)"/>
      <path d="M50 18 L78 32 V54 C78 72 50 84 50 84 C50 84 22 72 22 54 V32 Z" fill="rgba(255,255,255,0.2)"/>
      <circle cx="50" cy="50" r="20" fill="url(#goldCoin)" stroke="#ffffff" stroke-width="2.5"/>
      <text x="50" y="58" font-size="22" font-weight="900" text-anchor="middle" fill="#78350f" font-family="system-ui, -apple-system, sans-serif">₴</text>
      <path d="M60 28 L76 28 L76 44" fill="none" stroke="#fef08a" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M76 28 L54 50" fill="none" stroke="#fef08a" stroke-width="4.5" stroke-linecap="round"/>
    </svg>`,
    favicon: `data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' rx='25' fill='%2310b981'/><text x='50' y='68' font-size='60' text-anchor='middle' fill='%23ffffff'>₴</text></svg>`
  },
  2: {
    id: 2,
    name: 'Іконка 2: Королівський Нео-Діамант (VIP)',
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="diamondGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#4f46e5"/>
          <stop offset="50%" stop-color="#9333ea"/>
          <stop offset="100%" stop-color="#ec4899"/>
        </linearGradient>
      </defs>
      <rect x="4" y="4" width="92" height="92" rx="24" fill="url(#diamondGrad2)"/>
      <polygon points="50,16 80,36 50,84 20,36" fill="rgba(255,255,255,0.22)"/>
      <polygon points="32,36 50,16 68,36 50,84" fill="rgba(255,255,255,0.45)"/>
      <polygon points="20,36 32,36 50,84" fill="rgba(255,255,255,0.3)"/>
      <polygon points="80,36 68,36 50,84" fill="rgba(0,0,0,0.18)"/>
      <polygon points="32,36 50,16 68,36" fill="#ffffff" fill-opacity="0.8"/>
      <circle cx="26" cy="22" r="3" fill="#ffffff"/>
      <circle cx="75" cy="24" r="3.5" fill="#fef08a"/>
      <circle cx="76" cy="62" r="2.5" fill="#ffffff"/>
    </svg>`,
    favicon: `data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' rx='25' fill='%239333ea'/><text x='50' y='70' font-size='60' text-anchor='middle' fill='%23ffffff'>💎</text></svg>`
  }
};

// ==========================================
// 2. ASSETS & DEFINITIONS: VIP AVATARS (SVG)
// ==========================================
const AVATARS = [
  // Free Starter Avatars
  {
    id: 'fox',
    name: 'Лис Фінансист',
    vip: false,
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="50" fill="#1e293b"/>
      <polygon points="25,20 40,45 15,45" fill="#f97316"/>
      <polygon points="75,20 60,45 85,45" fill="#f97316"/>
      <polygon points="28,26 38,44 18,44" fill="#ffedd5"/>
      <polygon points="72,26 62,44 82,44" fill="#ffedd5"/>
      <ellipse cx="50" cy="58" rx="34" ry="28" fill="#ea580c"/>
      <polygon points="35,60 65,60 50,82" fill="#fff"/>
      <circle cx="38" cy="52" r="5" fill="#0f172a"/>
      <circle cx="62" cy="52" r="5" fill="#0f172a"/>
      <circle cx="39" cy="50" r="1.5" fill="#fff"/>
      <circle cx="63" cy="50" r="1.5" fill="#fff"/>
      <circle cx="50" cy="70" r="4.5" fill="#0f172a"/>
    </svg>`
  },
  {
    id: 'owl',
    name: 'Мудра Сова',
    vip: false,
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="50" fill="#1e1b4b"/>
      <ellipse cx="50" cy="55" rx="36" ry="32" fill="#4338ca"/>
      <polygon points="22,25 35,42 16,42" fill="#3730a3"/>
      <polygon points="78,25 65,42 84,42" fill="#3730a3"/>
      <circle cx="36" cy="50" r="14" fill="#fef08a"/>
      <circle cx="64" cy="50" r="14" fill="#fef08a"/>
      <circle cx="36" cy="50" r="7" fill="#0f172a"/>
      <circle cx="64" cy="50" r="7" fill="#0f172a"/>
      <circle cx="38" cy="48" r="2.5" fill="#fff"/>
      <circle cx="66" cy="48" r="2.5" fill="#fff"/>
      <polygon points="45,55 55,55 50,68" fill="#f59e0b"/>
      <ellipse cx="50" cy="74" rx="20" ry="12" fill="#6366f1"/>
    </svg>`
  },
  {
    id: 'panda',
    name: 'Спокійна Панда',
    vip: false,
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="50" fill="#0f172a"/>
      <circle cx="24" cy="28" r="12" fill="#1e293b"/>
      <circle cx="76" cy="28" r="12" fill="#1e293b"/>
      <circle cx="50" cy="55" rx="35" ry="32" fill="#f8fafc"/>
      <ellipse cx="34" cy="50" rx="10" ry="13" fill="#1e293b" transform="rotate(-15 34 50)"/>
      <ellipse cx="66" cy="50" rx="10" ry="13" fill="#1e293b" transform="rotate(15 66 50)"/>
      <circle cx="34" cy="48" r="4" fill="#fff"/>
      <circle cx="66" cy="48" r="4" fill="#fff"/>
      <circle cx="34" cy="48" r="2" fill="#000"/>
      <circle cx="66" cy="48" r="2" fill="#000"/>
      <ellipse cx="50" cy="65" rx="6" ry="4" fill="#0f172a"/>
      <path d="M 45,71 Q 50,75 55,71" stroke="#0f172a" stroke-width="2" fill="none"/>
    </svg>`
  },
  // 6 VIP Avatars (Unlocked with FinansePremium / FinanseDelux)
  {
    id: 'lion',
    name: 'Золотий Лев',
    vip: true,
    desc: 'Королівський інвестор із золотою гривою',
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="goldMane" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#f59e0b"/>
          <stop offset="50%" stop-color="#fbbf24"/>
          <stop offset="100%" stop-color="#d97706"/>
        </linearGradient>
      </defs>
      <circle cx="50" cy="50" r="50" fill="#451a03"/>
      <!-- Mane spikes -->
      <circle cx="50" cy="50" r="38" fill="url(#goldMane)"/>
      <!-- Ears -->
      <circle cx="28" cy="26" r="10" fill="#b45309"/>
      <circle cx="72" cy="26" r="10" fill="#b45309"/>
      <circle cx="28" cy="26" r="5" fill="#fef3c7"/>
      <circle cx="72" cy="26" r="5" fill="#fef3c7"/>
      <!-- Face -->
      <ellipse cx="50" cy="56" rx="26" ry="24" fill="#fef3c7"/>
      <!-- Sunglasses -->
      <rect x="26" y="44" width="20" height="14" rx="4" fill="#111827"/>
      <rect x="54" y="44" width="20" height="14" rx="4" fill="#111827"/>
      <rect x="44" y="48" width="12" height="4" fill="#fbbf24"/>
      <!-- Nose & Mouth -->
      <polygon points="45,64 55,64 50,70" fill="#92400e"/>
      <path d="M 45,74 Q 50,78 55,74" stroke="#92400e" stroke-width="2.5" fill="none"/>
      <!-- Crown on top -->
      <polygon points="36,22 42,10 50,18 58,10 64,22" fill="#fbbf24" stroke="#d97706" stroke-width="1.5"/>
    </svg>`
  },
  {
    id: 'cybercat',
    name: 'Кібер-Кіт',
    vip: true,
    desc: 'Неоновий хакер криптовалют та фінансів',
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="cyberBg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#0f172a"/>
          <stop offset="100%" stop-color="#020617"/>
        </linearGradient>
      </defs>
      <circle cx="50" cy="50" r="50" fill="url(#cyberBg)"/>
      <!-- Ears -->
      <polygon points="20,18 42,42 16,46" fill="#3b82f6"/>
      <polygon points="80,18 58,42 84,46" fill="#ec4899"/>
      <polygon points="25,24 38,40 20,43" fill="#00f2fe"/>
      <polygon points="75,24 62,40 80,43" fill="#f43f5e"/>
      <!-- Head -->
      <ellipse cx="50" cy="56" rx="32" ry="26" fill="#1e293b"/>
      <!-- Cyber Visor / Eyes -->
      <rect x="24" y="44" width="52" height="15" rx="6" fill="#00f2fe" opacity="0.9"/>
      <line x1="28" y1="51" x2="72" y2="51" stroke="#ec4899" stroke-width="3"/>
      <!-- Cyber Nose & Mouth -->
      <polygon points="47,65 53,65 50,69" fill="#00f2fe"/>
      <path d="M 44,72 L 50,70 L 56,72" stroke="#00f2fe" stroke-width="2" fill="none"/>
      <!-- Whiskers -->
      <line x1="16" y1="62" x2="32" y2="65" stroke="#ec4899" stroke-width="2"/>
      <line x1="18" y1="70" x2="32" y2="70" stroke="#ec4899" stroke-width="2"/>
      <line x1="84" y1="62" x2="68" y2="65" stroke="#00f2fe" stroke-width="2"/>
      <line x1="82" y1="70" x2="68" y2="70" stroke="#00f2fe" stroke-width="2"/>
    </svg>`
  },
  {
    id: 'diamond',
    name: 'Діамантовий Магнат',
    vip: true,
    desc: 'Власник незліченних багатств та інвестицій',
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="diamondGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#e0e7ff"/>
          <stop offset="40%" stop-color="#38bdf8"/>
          <stop offset="70%" stop-color="#818cf8"/>
          <stop offset="100%" stop-color="#c084fc"/>
        </linearGradient>
      </defs>
      <circle cx="50" cy="50" r="50" fill="#090d16"/>
      <!-- Diamond Shape -->
      <polygon points="20,38 50,12 80,38 50,88" fill="url(#diamondGrad)"/>
      <polygon points="20,38 50,12 50,88" fill="#bae6fd" opacity="0.4"/>
      <polygon points="34,38 50,12 66,38 50,88" fill="#e0f2fe" opacity="0.6"/>
      <line x1="20" y1="38" x2="80" y2="38" stroke="#ffffff" stroke-width="2"/>
      <!-- Monocle -->
      <circle cx="60" cy="46" r="10" fill="none" stroke="#fbbf24" stroke-width="3"/>
      <line x1="68" y1="52" x2="78" y2="75" stroke="#fbbf24" stroke-width="2"/>
      <!-- Sparkle -->
      <circle cx="30" cy="26" r="3" fill="#ffffff"/>
      <line x1="30" y1="20" x2="30" y2="32" stroke="#ffffff" stroke-width="1.5"/>
      <line x1="24" y1="26" x2="36" y2="26" stroke="#ffffff" stroke-width="1.5"/>
    </svg>`
  },
  {
    id: 'phoenix',
    name: 'Неоновий Фенікс',
    vip: true,
    desc: 'Символ нескінченного фінансового зростання',
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="phoenixAura" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#ff007f"/>
          <stop offset="70%" stop-color="#7928ca"/>
          <stop offset="100%" stop-color="#11052c"/>
        </radialGradient>
      </defs>
      <circle cx="50" cy="50" r="50" fill="url(#phoenixAura)"/>
      <!-- Flame feathers / wings -->
      <path d="M 50,20 Q 20,40 10,65 Q 35,60 50,75 Q 65,60 90,65 Q 80,40 50,20 Z" fill="#ff4d4d"/>
      <path d="M 50,26 Q 30,44 24,65 Q 40,62 50,72 Q 60,62 76,65 Q 70,44 50,26 Z" fill="#ff9900"/>
      <path d="M 50,32 Q 38,48 35,64 Q 45,62 50,68 Q 55,62 65,64 Q 62,48 50,32 Z" fill="#ffea00"/>
      <!-- Eyes -->
      <circle cx="43" cy="46" r="3.5" fill="#00f2fe"/>
      <circle cx="57" cy="46" r="3.5" fill="#00f2fe"/>
      <!-- Beak -->
      <polygon points="46,50 54,50 50,60" fill="#fff"/>
    </svg>`
  },
  {
    id: 'astro',
    name: 'Космічний Трейдер',
    vip: true,
    desc: 'Інвестор, що прямує «To The Moon» 🚀',
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="spaceVisor" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#f59e0b"/>
          <stop offset="50%" stop-color="#10b981"/>
          <stop offset="100%" stop-color="#3b82f6"/>
        </linearGradient>
      </defs>
      <circle cx="50" cy="50" r="50" fill="#0b0f19"/>
      <!-- Stars -->
      <circle cx="20" cy="20" r="1.5" fill="#fff"/>
      <circle cx="80" cy="18" r="1" fill="#fff"/>
      <circle cx="82" cy="78" r="1.5" fill="#fff"/>
      <circle cx="15" cy="80" r="1" fill="#fff"/>
      <!-- Helmet Outer -->
      <circle cx="50" cy="52" r="34" fill="#e2e8f0"/>
      <circle cx="50" cy="52" r="30" fill="#1e293b"/>
      <!-- Golden / Green Visor -->
      <ellipse cx="50" cy="52" rx="24" ry="18" fill="url(#spaceVisor)"/>
      <!-- Chart line reflection inside visor -->
      <path d="M 32,58 L 40,50 L 48,54 L 60,42 L 68,40" stroke="#ffffff" stroke-width="2.5" fill="none" stroke-linecap="round"/>
      <circle cx="68" cy="40" r="3" fill="#34d399"/>
    </svg>`
  },
  {
    id: 'crown',
    name: 'Король Фінансів',
    vip: true,
    desc: 'Абсолютна фінансова незалежність та влада',
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="50" fill="#2e1065"/>
      <polygon points="15,48 28,18 42,34 50,12 58,34 72,18 85,48 78,75 22,75" fill="#fbbf24" stroke="#d97706" stroke-width="2"/>
      <!-- Jewels -->
      <circle cx="50" cy="14" r="5" fill="#ef4444"/>
      <circle cx="28" cy="20" r="4" fill="#3b82f6"/>
      <circle cx="72" cy="20" r="4" fill="#10b981"/>
      <circle cx="50" cy="45" r="7" fill="#8b5cf6"/>
      <rect x="30" y="62" width="40" height="6" rx="3" fill="#f59e0b"/>
      <circle cx="38" cy="65" r="2" fill="#ef4444"/>
      <circle cx="50" cy="65" r="2" fill="#10b981"/>
      <circle cx="62" cy="65" r="2" fill="#3b82f6"/>
    </svg>`
  }
];

// ==========================================
// 2. ASSETS: 5 VIP FRAMES (Unlocked with FinanseDelux - 100 ₴)
// ==========================================
const FRAMES = [
  { id: 'frame-none', name: 'Без рамки', icon: '⚪', vip: false },
  { id: 'frame-royal-gold', name: 'Золоте Сяйво', icon: '👑', vip: true, desc: 'Королівське золоте обертове сяйво' },
  { id: 'frame-cyber-neon', name: 'Кібер Неон', icon: '⚡', vip: true, desc: 'Пульсуючий бірюзово-фіолетовий неон' },
  { id: 'frame-diamond-shimmer', name: 'Діамант', icon: '💎', vip: true, desc: 'Призматичний кришталевий перелив' },
  { id: 'frame-flame-aura', name: 'Вогняна Аура', icon: '🔥', vip: true, desc: 'Динамічне полум’яне дихання' },
  { id: 'frame-cosmic-nebula', name: 'Галактика', icon: '🌌', vip: true, desc: 'Глибокий космічний вихор туманності' }
];

// Initial Demo Transactions for immediate visual appeal
const DEFAULT_TRANSACTIONS = [
  { id: 't1', type: 'income', amount: 32000, category: 'Зарплата', note: 'Основна зарплата за місяць', date: '2026-10-01' },
  { id: 't2', type: 'expense', amount: 1450, category: 'Продукти', note: 'Супермаркет Silpo', date: '2026-10-01' },
  { id: 't3', type: 'expense', amount: 480, category: 'Транспорт', note: 'Пальне та Uber', date: '2026-10-02' },
  { id: 't4', type: 'expense', amount: 850, category: 'Кафе та ресторани', note: 'Обід з друзями', date: '2026-10-02' },
  { id: 't5', type: 'expense', amount: 1200, category: 'Комунальні', note: 'Оплата інтернету та послуг', date: '2026-09-28' },
  { id: 't6', type: 'income', amount: 4500, category: 'Фріланс', note: 'Проєкт з дизайну', date: '2026-09-29' }
];

const CATEGORY_COLORS = {
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

const CATEGORY_ICONS = {
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

// ==========================================
// 3. APPLICATION STATE MANAGEMENT
// ==========================================
class TrackMyFinanceApp {
  constructor() {
    window.app = this;
    this.transactions = this.loadTransactions();
    this.subscription = this.loadSubscription();
    this.profile = this.loadProfile();
    this.theme = localStorage.getItem('tmf_theme') || 'dark';
    this.appIconVariant = parseInt(localStorage.getItem('tmf_icon') || '2', 10);
    this.quickTxType = 'expense';
    this.currentFilter = 'all';
    this.pendingCheckoutPlan = null;

    this.initElements();
    this.applyTheme(this.theme);
    this.applyAppIcon(this.appIconVariant);
    this.bindEvents();
    this.renderAll();
  }

  loadTransactions() {
    const saved = localStorage.getItem('tmf_transactions');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Error parsing transactions:', e);
      }
    }
    return [...DEFAULT_TRANSACTIONS];
  }

  saveTransactions() {
    localStorage.setItem('tmf_transactions', JSON.stringify(this.transactions));
  }

  loadSubscription() {
    const saved = localStorage.getItem('tmf_subscription');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Error parsing subscription:', e);
      }
    }
    return { tier: 'free', name: 'Базовий', activeSince: null };
  }

  saveSubscription() {
    localStorage.setItem('tmf_subscription', JSON.stringify(this.subscription));
  }

  loadProfile() {
    const saved = localStorage.getItem('tmf_profile');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Error parsing profile:', e);
      }
    }
    return { name: 'Фінансовий Лідер', avatarId: 'fox', frameId: 'frame-none' };
  }

  saveProfile() {
    localStorage.setItem('tmf_profile', JSON.stringify(this.profile));
  }

  // ==========================================
  // 4. ELEMENT CACHING
  // ==========================================
  initElements() {
    // Stats Elements
    this.totalBalanceEl = document.getElementById('totalBalance');
    this.totalIncomeEl = document.getElementById('totalIncome');
    this.totalExpenseEl = document.getElementById('totalExpense');
    this.totalCountEl = document.getElementById('totalCount');

    // Avatar & Header
    this.headerUserPill = document.getElementById('headerUserPill');
    this.headerAvatarBox = document.getElementById('headerAvatarBox');
    this.headerFrameBox = document.getElementById('headerFrameBox');
    this.headerBadge = document.getElementById('headerBadge');
    this.headerBadgeText = document.getElementById('headerBadgeText');

    // Transaction list & Chart
    this.transactionsList = document.getElementById('transactionsList');
    this.categoryChartCanvas = document.getElementById('categoryChartCanvas');
    this.chartCenterAmount = document.getElementById('chartCenterAmount');
    this.categoryLegend = document.getElementById('categoryLegend');

    // Modals
    this.menuDrawer = document.getElementById('menuDrawer');
    this.drawerOverlay = document.getElementById('drawerOverlay');

    this.subscriptionModal = document.getElementById('subscriptionModal');
    this.checkoutModal = document.getElementById('checkoutModal');
    this.profileModal = document.getElementById('profileModal');
    this.txModal = document.getElementById('txModal');

    // Checkout Modal elements
    this.checkoutTitle = document.getElementById('checkoutTitle');
    this.checkoutDesc = document.getElementById('checkoutDesc');
    this.checkoutPrice = document.getElementById('checkoutPrice');
    this.checkoutBtnText = document.getElementById('checkoutBtnText');
    this.checkoutForm = document.getElementById('checkoutForm');
    this.checkoutLoader = document.getElementById('checkoutLoader');
    this.checkoutSuccess = document.getElementById('checkoutSuccess');
    this.successPlanName = document.getElementById('successPlanName');

    // Card Input Elements
    this.cardNumberInput = document.getElementById('cardNumber');
    this.cardExpiryInput = document.getElementById('cardExpiry');
    this.cardCvvInput = document.getElementById('cardCvv');
    this.cardHolderInput = document.getElementById('cardHolder');

    // Profile elements
    this.profilePreviewBox = document.getElementById('profilePreviewBox');
    this.profileFrameContainer = document.getElementById('profileFrameContainer');
    this.avatarSelectionGrid = document.getElementById('avatarSelectionGrid');
    this.frameSelectionGrid = document.getElementById('frameSelectionGrid');
    this.profileVipBanner = document.getElementById('profileVipBanner');
    this.btnTestTierFree = document.getElementById('btnTestTierFree');
    this.btnTestTierPremium = document.getElementById('btnTestTierPremium');
    this.btnTestTierDelux = document.getElementById('btnTestTierDelux');

    // Quick Add Inline Elements
    this.quickTypeExpense = document.getElementById('quickTypeExpense');
    this.quickTypeIncome = document.getElementById('quickTypeIncome');
    this.quickAmountInput = document.getElementById('quickAmount');
    this.quickCategoryInput = document.getElementById('quickCategory');
    this.quickNoteInput = document.getElementById('quickNote');
    this.btnQuickAdd = document.getElementById('btnQuickAdd');

    // Theme & Icon Toggles
    this.btnToggleTheme = document.getElementById('btnToggleTheme');
    this.btnToggleIcon = document.getElementById('btnToggleIcon');

    // Toast & Confetti
    this.toastEl = document.getElementById('toast');
    this.toastMessage = document.getElementById('toastMessage');
    this.confettiContainer = document.getElementById('confettiContainer');
  }

  // ==========================================
  // 5. EVENT BINDING
  // ==========================================
  bindEvents() {
    // Header Menu & Profile Buttons
    document.getElementById('btnOpenMenu').addEventListener('click', () => this.openDrawer());
    document.getElementById('btnCloseDrawer').addEventListener('click', () => this.closeDrawer());
    this.drawerOverlay.addEventListener('click', () => this.closeDrawer());

    this.headerUserPill.addEventListener('click', () => this.openProfileModal());

    // Drawer Links
    document.getElementById('drawerLinkHome').addEventListener('click', () => {
      this.closeDrawer();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    document.getElementById('drawerLinkPlans').addEventListener('click', () => {
      this.closeDrawer();
      this.openSubscriptionModal();
    });
    document.getElementById('drawerLinkProfile').addEventListener('click', () => {
      this.closeDrawer();
      this.openProfileModal();
    });
    document.getElementById('drawerLinkTheme')?.addEventListener('click', () => {
      this.toggleTheme();
      this.closeDrawer();
    });
    document.getElementById('drawerLinkIcon')?.addEventListener('click', () => {
      this.toggleAppIcon();
      this.closeDrawer();
    });
    document.getElementById('drawerLinkReset').addEventListener('click', () => {
      this.closeDrawer();
      this.resetData();
    });

    // Theme & Icon Header Toggles
    this.btnToggleTheme?.addEventListener('click', () => this.toggleTheme());
    this.btnToggleIcon?.addEventListener('click', () => this.toggleAppIcon());

    // Quick Add Inline Form Handlers
    this.quickTypeExpense?.addEventListener('click', () => this.setQuickType('expense'));
    this.quickTypeIncome?.addEventListener('click', () => this.setQuickType('income'));
    this.btnQuickAdd?.addEventListener('click', () => this.handleQuickAddTransaction());
    this.quickAmountInput?.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') this.handleQuickAddTransaction();
    });
    this.quickNoteInput?.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') this.handleQuickAddTransaction();
    });

    // Profile Test Tier Toggles
    this.btnTestTierFree?.addEventListener('click', () => this.setTestTier('free'));
    this.btnTestTierPremium?.addEventListener('click', () => this.setTestTier('premium'));
    this.btnTestTierDelux?.addEventListener('click', () => this.setTestTier('delux'));

    // Top CTA to Premium
    const btnTopPremium = document.getElementById('btnTopPremium');
    if (btnTopPremium) {
      btnTopPremium.addEventListener('click', () => this.openSubscriptionModal());
    }

    // Modal Close buttons
    document.querySelectorAll('.modal-close').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const modal = e.target.closest('.modal-overlay');
        if (modal) modal.classList.remove('active');
      });
    });

    // Click outside modal box to close
    document.querySelectorAll('.modal-overlay').forEach(modal => {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.classList.remove('active');
      });
    });

    // Quick Add Transaction Button
    document.getElementById('btnOpenAddTx').addEventListener('click', () => this.openTxModal());
    document.getElementById('btnBannerAdd').addEventListener('click', () => this.openTxModal());

    // Transaction Form submit
    document.getElementById('addTxForm').addEventListener('submit', (e) => {
      e.preventDefault();
      this.handleAddTransaction();
    });

    // Filters row
    document.querySelectorAll('.filter-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        e.currentTarget.classList.add('active');
        this.currentFilter = e.currentTarget.dataset.filter;
        this.renderTransactionsList();
      });
    });

    // Pricing Buy Buttons
    document.getElementById('btnBuyPremium').addEventListener('click', (e) => {
      if (e.currentTarget.disabled) return;
      this.closeModal(this.subscriptionModal);
      this.openCheckoutModal('premium');
    });
    document.getElementById('btnBuyDelux').addEventListener('click', (e) => {
      if (e.currentTarget.disabled) return;
      this.closeModal(this.subscriptionModal);
      this.openCheckoutModal('delux');
    });

    // Card Input Auto-formatting
    this.cardNumberInput.addEventListener('input', (e) => {
      let value = e.target.value.replace(/\D/g, '').substring(0, 16);
      let formatted = value.match(/.{1,4}/g)?.join(' ') || value;
      e.target.value = formatted;
    });

    this.cardExpiryInput.addEventListener('input', (e) => {
      let value = e.target.value.replace(/\D/g, '').substring(0, 4);
      if (value.length >= 3) {
        e.target.value = value.substring(0, 2) + '/' + value.substring(2, 4);
      } else {
        e.target.value = value;
      }
    });

    this.cardCvvInput.addEventListener('input', (e) => {
      e.target.value = e.target.value.replace(/\D/g, '').substring(0, 3);
    });

    // Fast Demo Card Fill
    document.getElementById('btnFillDemoCard').addEventListener('click', () => {
      this.cardNumberInput.value = '4149 4992 8821 7734';
      this.cardExpiryInput.value = '08/29';
      this.cardCvvInput.value = '739';
      this.cardHolderInput.value = 'VOLODYMYR ZELENSKYI';
    });

    // Payment Methods Tabs
    document.querySelectorAll('.payment-tab').forEach(tab => {
      tab.addEventListener('click', (e) => {
        document.querySelectorAll('.payment-tab').forEach(t => t.classList.remove('active'));
        e.currentTarget.classList.add('active');
      });
    });

    // Confirm Payment
    this.checkoutForm.addEventListener('submit', (e) => {
      e.preventDefault();
      this.handleProcessPayment();
    });

    // Go to profile after success
    document.getElementById('btnSuccessToProfile').addEventListener('click', () => {
      this.closeModal(this.checkoutModal);
      this.openProfileModal();
    });
  }

  // ==========================================
  // 6. RENDER LOGIC
  // ==========================================
  renderAll() {
    this.renderStats();
    this.renderHeaderProfile();
    this.renderTransactionsList();
    this.renderCategoryChart();
    this.renderPricingButtons();
  }

  renderStats() {
    let income = 0;
    let expense = 0;

    this.transactions.forEach(t => {
      if (t.type === 'income') income += Number(t.amount);
      if (t.type === 'expense') expense += Number(t.amount);
    });

    const balance = income - expense;

    this.totalBalanceEl.textContent = `${balance.toLocaleString('uk-UA')} ₴`;
    this.totalIncomeEl.textContent = `+${income.toLocaleString('uk-UA')} ₴`;
    this.totalExpenseEl.textContent = `-${expense.toLocaleString('uk-UA')} ₴`;
    this.totalCountEl.textContent = this.transactions.length;

    if (balance < 0) {
      this.totalBalanceEl.classList.remove('text-green');
      this.totalBalanceEl.classList.add('text-red');
    } else {
      this.totalBalanceEl.classList.remove('text-red');
      this.totalBalanceEl.classList.add('text-green');
    }
  }

  renderHeaderProfile() {
    const curAvatar = AVATARS.find(a => a.id === this.profile.avatarId) || AVATARS[0];
    this.headerAvatarBox.innerHTML = curAvatar.svg;

    // Apply frame class
    this.headerFrameBox.className = 'avatar-container ' + (this.profile.frameId || 'frame-none');

    // Update Header Badge
    this.headerBadge.className = 'header-badge';
    if (this.subscription.tier === 'delux') {
      this.headerBadge.classList.add('badge-delux');
      this.headerBadgeText.textContent = '👑 FinanseDelux';
    } else if (this.subscription.tier === 'premium') {
      this.headerBadge.classList.add('badge-premium');
      this.headerBadgeText.textContent = '⭐ FinansePremium';
    } else {
      this.headerBadge.classList.add('badge-free');
      this.headerBadgeText.textContent = 'Базовий';
    }
  }

  renderTransactionsList() {
    let filtered = this.transactions;
    if (this.currentFilter === 'expense') {
      filtered = this.transactions.filter(t => t.type === 'expense');
    } else if (this.currentFilter === 'income') {
      filtered = this.transactions.filter(t => t.type === 'income');
    }

    if (filtered.length === 0) {
      this.transactionsList.innerHTML = `
        <div class="empty-state">
          <div class="empty-state-icon">📂</div>
          <p>Не знайдено жодної транзакції у цій категорії.</p>
        </div>
      `;
      return;
    }

    this.transactionsList.innerHTML = filtered.map(t => {
      const isIncome = t.type === 'income';
      const icon = CATEGORY_ICONS[t.category] || '💰';
      const color = CATEGORY_COLORS[t.category] || '#6366f1';
      const sign = isIncome ? '+' : '-';
      const amountClass = isIncome ? 'income' : 'expense';

      return `
        <div class="transaction-item" data-id="${t.id}">
          <div class="tx-left">
            <div class="tx-icon-badge" style="background: ${color}20; color: ${color};">
              ${icon}
            </div>
            <div class="tx-details">
              <h4>${this.escapeHtml(t.note || t.category)}</h4>
              <div class="tx-meta">
                <span class="tx-category-tag">${this.escapeHtml(t.category)}</span>
                <span>•</span>
                <span>${t.date}</span>
              </div>
            </div>
          </div>
          <div class="tx-right">
            <div class="tx-amount ${amountClass}">
              ${sign}${Number(t.amount).toLocaleString('uk-UA')} ₴
            </div>
            <button class="tx-delete-btn" title="Видалити" onclick="app.handleDeleteTransaction('${t.id}')">
              🗑️
            </button>
          </div>
        </div>
      `;
    }).join('');
  }

  renderCategoryChart() {
    const expenses = this.transactions.filter(t => t.type === 'expense');
    const categoryTotals = {};
    let totalExpenseAmount = 0;

    expenses.forEach(t => {
      const amt = Number(t.amount);
      categoryTotals[t.category] = (categoryTotals[t.category] || 0) + amt;
      totalExpenseAmount += amt;
    });

    this.chartCenterAmount.textContent = `${totalExpenseAmount.toLocaleString('uk-UA')} ₴`;

    const canvas = this.categoryChartCanvas;
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const size = 240;

    canvas.width = size * dpr;
    canvas.height = size * dpr;
    canvas.style.width = `${size}px`;
    canvas.style.height = `${size}px`;
    ctx.scale(dpr, dpr);

    const centerX = size / 2;
    const centerY = size / 2;
    const outerRadius = 100;
    const innerRadius = 68;

    ctx.clearRect(0, 0, size, size);

    const categories = Object.keys(categoryTotals);

    if (categories.length === 0 || totalExpenseAmount === 0) {
      // Draw placeholder circle
      ctx.beginPath();
      ctx.arc(centerX, centerY, outerRadius, 0, Math.PI * 2);
      ctx.arc(centerX, centerY, innerRadius, Math.PI * 2, 0, true);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
      ctx.fill();

      this.categoryLegend.innerHTML = `
        <div style="text-align: center; color: var(--text-dim); font-size: 0.85rem; padding: 0.5rem;">
          Немає витрат для формування графіку
        </div>
      `;
      return;
    }

    let startAngle = -Math.PI / 2;

    const legendHtml = [];

    categories.sort((a, b) => categoryTotals[b] - categoryTotals[a]).forEach(cat => {
      const amount = categoryTotals[cat];
      const sliceAngle = (amount / totalExpenseAmount) * (Math.PI * 2);
      const color = CATEGORY_COLORS[cat] || '#8b5cf6';
      const pct = Math.round((amount / totalExpenseAmount) * 100);

      // Draw Slice
      ctx.beginPath();
      ctx.arc(centerX, centerY, outerRadius, startAngle, startAngle + sliceAngle);
      ctx.arc(centerX, centerY, innerRadius, startAngle + sliceAngle, startAngle, true);
      ctx.closePath();
      ctx.fillStyle = color;
      ctx.shadowColor = color + '66';
      ctx.shadowBlur = 8;
      ctx.fill();

      startAngle += sliceAngle;

      legendHtml.push(`
        <div class="legend-item">
          <div class="legend-info">
            <span class="legend-color-dot" style="background: ${color};"></span>
            <span>${this.escapeHtml(cat)}</span>
          </div>
          <div>
            <span style="font-weight: 700;">${amount.toLocaleString('uk-UA')} ₴</span>
            <span class="legend-pct">(${pct}%)</span>
          </div>
        </div>
      `);
    });

    this.categoryLegend.innerHTML = legendHtml.join('');
  }

  renderPricingButtons() {
    const btnPrem = document.getElementById('btnBuyPremium');
    const btnDelux = document.getElementById('btnBuyDelux');
    if (!btnPrem || !btnDelux) return;

    if (this.subscription.tier === 'delux') {
      btnPrem.className = 'btn-current-plan';
      btnPrem.disabled = true;
      btnPrem.textContent = 'Включено в Delux';

      btnDelux.className = 'btn-current-plan';
      btnDelux.disabled = true;
      btnDelux.textContent = '👑 Ваш поточний план';
    } else if (this.subscription.tier === 'premium') {
      btnPrem.className = 'btn-current-plan';
      btnPrem.disabled = true;
      btnPrem.textContent = '⭐ Ваш поточний план';

      btnDelux.className = 'btn-buy-delux';
      btnDelux.disabled = false;
      btnDelux.textContent = 'Оновити до Delux за 100 ₴';
    } else {
      btnPrem.className = 'btn-buy-premium';
      btnPrem.disabled = false;
      btnPrem.textContent = 'Купити за 40 ₴';

      btnDelux.className = 'btn-buy-delux';
      btnDelux.disabled = false;
      btnDelux.textContent = 'Купити за 100 ₴';
    }
  }

  // ==========================================
  // 7. TRANSACTION HANDLERS
  // ==========================================
  openTxModal() {
    const today = new Date().toISOString().split('T')[0];
    const dateInput = document.getElementById('txDate');
    if (dateInput) dateInput.value = today;

    const amountInput = document.getElementById('txAmount');
    if (amountInput) amountInput.value = '';

    const noteInput = document.getElementById('txNote');
    if (noteInput) noteInput.value = '';

    this.openModal(this.txModal);
    setTimeout(() => {
      if (amountInput) amountInput.focus();
    }, 150);
  }

  handleAddTransaction() {
    const type = document.getElementById('txType').value;
    const rawAmount = document.getElementById('txAmount').value;
    const cleanAmount = String(rawAmount || '').trim().replace(',', '.');
    const amount = parseFloat(cleanAmount);
    const category = document.getElementById('txCategory').value;
    const note = document.getElementById('txNote').value.trim();
    let date = document.getElementById('txDate').value;
    if (!date) {
      date = new Date().toISOString().split('T')[0];
    }

    if (isNaN(amount) || amount <= 0) {
      this.showToast('⚠️ Введіть дійсну суму (наприклад, 250 або 250.50)!');
      document.getElementById('txAmount').focus();
      return;
    }

    const newTx = {
      id: 'tx_' + Date.now(),
      type,
      amount,
      category,
      note: note || category,
      date
    };

    this.transactions.unshift(newTx);
    this.saveTransactions();
    this.renderAll();
    this.closeModal(this.txModal);
    this.showToast(`✅ Операцію додано: ${type === 'income' ? '+' : '-'}${amount.toLocaleString('uk-UA')} ₴`);
  }

  setQuickType(type) {
    this.quickTxType = type;
    if (type === 'expense') {
      this.quickTypeExpense?.classList.add('active');
      this.quickTypeIncome?.classList.remove('active');
    } else {
      this.quickTypeIncome?.classList.add('active');
      this.quickTypeExpense?.classList.remove('active');
    }
  }

  handleQuickAddTransaction() {
    const type = this.quickTxType || 'expense';
    const amountInput = this.quickAmountInput;
    const categoryInput = this.quickCategoryInput;
    const noteInput = this.quickNoteInput;

    const rawAmount = amountInput ? amountInput.value : '';
    const cleanAmount = String(rawAmount || '').trim().replace(',', '.');
    const amount = parseFloat(cleanAmount);

    if (isNaN(amount) || amount <= 0) {
      this.showToast('⚠️ Вкажіть суму для швидкого додавання!');
      if (amountInput) amountInput.focus();
      return;
    }

    const category = categoryInput ? categoryInput.value : 'Продукти';
    const note = noteInput ? noteInput.value.trim() : '';
    const date = new Date().toISOString().split('T')[0];

    const newTx = {
      id: 'tx_' + Date.now(),
      type,
      amount,
      category,
      note: note || category,
      date
    };

    this.transactions.unshift(newTx);
    this.saveTransactions();
    this.renderAll();

    if (amountInput) amountInput.value = '';
    if (noteInput) noteInput.value = '';

    this.showToast(`✅ Додано операцію: ${type === 'income' ? '+' : '-'}${amount.toLocaleString('uk-UA')} ₴ (${category})`);
  }

  handleDeleteTransaction(id) {
    if (confirm('Видалити цю транзакцію?')) {
      this.transactions = this.transactions.filter(t => t.id !== id);
      this.saveTransactions();
      this.renderAll();
      this.showToast('Транзакцію видалено');
    }
  }

  // ==========================================
  // ТЕМА (ДРУГИЙ ІНТЕРФЕЙС) ТА ІКОНКА
  // ==========================================
  applyTheme(theme) {
    this.theme = theme;
    localStorage.setItem('tmf_theme', theme);
    document.documentElement.setAttribute('data-theme', theme);

    const themeBtnIcon = document.getElementById('themeBtnIcon');
    const themeBtnText = document.getElementById('themeBtnText');
    const drawerThemeIcon = document.getElementById('drawerThemeIcon');
    const drawerThemeText = document.getElementById('drawerThemeText');

    if (theme === 'light') {
      if (themeBtnIcon) themeBtnIcon.textContent = '🌙';
      if (themeBtnText) themeBtnText.textContent = 'Темний';
      if (drawerThemeIcon) drawerThemeIcon.textContent = '🌙';
      if (drawerThemeText) drawerThemeText.textContent = 'Змінити на Темний інтерфейс';
    } else {
      if (themeBtnIcon) themeBtnIcon.textContent = '☀️';
      if (themeBtnText) themeBtnText.textContent = 'Світлий';
      if (drawerThemeIcon) drawerThemeIcon.textContent = '☀️';
      if (drawerThemeText) drawerThemeText.textContent = 'Змінити на Світлий необанк';
    }
    this.renderCategoryChart();
  }

  toggleTheme() {
    const nextTheme = this.theme === 'light' ? 'dark' : 'light';
    this.applyTheme(nextTheme);
    this.showToast(`Інтерфейс змінено: ${nextTheme === 'light' ? '☀️ Світлий Необанк' : '🌙 Темний Преміум'}`);
  }

  applyAppIcon(variant) {
    this.appIconVariant = variant;
    localStorage.setItem('tmf_icon', variant.toString());

    const iconData = APP_ICONS[variant] || APP_ICONS[2];
    const headerLogoIcon = document.getElementById('headerLogoIcon');
    const drawerLogoIcon = document.getElementById('drawerLogoIcon');
    const iconBtnText = document.getElementById('iconBtnText');
    const drawerIconText = document.getElementById('drawerIconText');

    if (headerLogoIcon) headerLogoIcon.innerHTML = iconData.svg;
    if (drawerLogoIcon) drawerLogoIcon.innerHTML = iconData.svg;

    const nextVariant = variant === 1 ? 2 : 1;
    if (iconBtnText) iconBtnText.textContent = `Іконка ${variant}`;
    if (drawerIconText) drawerIconText.textContent = `Перемкнути на Іконку ${nextVariant}`;

    // Update favicon
    let favicon = document.querySelector("link[rel*='icon']");
    if (favicon) {
      favicon.href = iconData.favicon;
    }
  }

  toggleAppIcon() {
    const next = this.appIconVariant === 1 ? 2 : 1;
    this.applyAppIcon(next);
    const iconData = APP_ICONS[next];
    this.showToast(`Встановлено: ${iconData.name}`);
  }

  // ==========================================
  // 8. CHECKOUT & PAYMENT FLOW
  // ==========================================
  openCheckoutModal(tier) {
    this.pendingCheckoutPlan = tier;

    if (tier === 'delux') {
      this.checkoutTitle.textContent = 'Оформлення FinanseDelux';
      this.checkoutDesc.textContent = 'Всі VIP-аватарки + 5 анімованих рамок та королівський бейдж';
      this.checkoutPrice.textContent = '100 ₴';
      this.checkoutBtnText.textContent = 'Оплатити 100 ₴';
      this.successPlanName.textContent = 'FinanseDelux';
    } else {
      this.checkoutTitle.textContent = 'Оформлення FinansePremium';
      this.checkoutDesc.textContent = '6 ексклюзивних VIP-аватарок та статус Premium';
      this.checkoutPrice.textContent = '40 ₴';
      this.checkoutBtnText.textContent = 'Оплатити 40 ₴';
      this.successPlanName.textContent = 'FinansePremium';
    }

    // Reset checkout states
    this.checkoutForm.style.display = 'block';
    this.checkoutLoader.style.display = 'none';
    this.checkoutSuccess.style.display = 'none';

    this.openModal(this.checkoutModal);
  }

  handleProcessPayment() {
    const cardNum = this.cardNumberInput.value.replace(/\s/g, '');
    const expiry = this.cardExpiryInput.value;
    const cvv = this.cardCvvInput.value;

    if (cardNum.length < 16) {
      this.showToast('Введіть повний 16-значний номер картки!');
      return;
    }
    if (expiry.length < 5) {
      this.showToast('Введіть термін дії картки у форматі MM/YY');
      return;
    }
    if (cvv.length < 3) {
      this.showToast('Введіть 3 цифри CVV коду');
      return;
    }

    // Show processing spinner
    this.checkoutForm.style.display = 'none';
    this.checkoutLoader.style.display = 'block';

    setTimeout(() => {
      // Complete payment
      this.checkoutLoader.style.display = 'none';
      this.checkoutSuccess.style.display = 'block';

      this.subscription = {
        tier: this.pendingCheckoutPlan,
        name: this.pendingCheckoutPlan === 'delux' ? 'FinanseDelux' : 'FinansePremium',
        activeSince: new Date().toISOString()
      };
      this.saveSubscription();

      // Automatically assign the first VIP avatar and Delux frame if eligible!
      if (this.pendingCheckoutPlan === 'delux') {
        this.profile.frameId = 'frame-royal-gold';
        this.profile.avatarId = 'lion';
      } else if (this.pendingCheckoutPlan === 'premium') {
        this.profile.avatarId = 'lion';
      }
      this.saveProfile();

      this.renderAll();
      this.launchConfetti();
      this.showToast(`🎉 Вітаємо! Підписку ${this.subscription.name} активовано!`);
    }, 1400);
  }

  // ==========================================
  // 9. PROFILE & AVATAR/FRAME CUSTOMIZATION
  // ==========================================
  openProfileModal() {
    const curAvatar = AVATARS.find(a => a.id === this.profile.avatarId) || AVATARS[0];
    this.profilePreviewBox.innerHTML = curAvatar.svg;
    this.profileFrameContainer.className = 'avatar-container profile-avatar-large ' + (this.profile.frameId || 'frame-none');
    
    const badgeEl = document.getElementById('profileTierBadge');
    if (badgeEl) {
      badgeEl.textContent = this.subscription.name;
      badgeEl.className = 'header-badge ' + (this.subscription.tier === 'delux' ? 'badge-delux' : (this.subscription.tier === 'premium' ? 'badge-premium' : 'badge-free'));
    }

    // Оновлення активного стану кнопок швидкого тесту підписок
    this.btnTestTierFree?.classList.toggle('active', this.subscription.tier === 'free');
    this.btnTestTierPremium?.classList.toggle('active', this.subscription.tier === 'premium');
    this.btnTestTierDelux?.classList.toggle('active', this.subscription.tier === 'delux');

    if (this.profileVipBanner) {
      this.profileVipBanner.style.display = 'none';
    }

    this.renderAvatarSelection();
    this.renderFrameSelection();

    this.openModal(this.profileModal);
  }

  renderAvatarSelection() {
    const isPremiumOrDelux = this.subscription.tier === 'premium' || this.subscription.tier === 'delux';

    this.avatarSelectionGrid.innerHTML = '';
    AVATARS.forEach(avatar => {
      const isSelected = this.profile.avatarId === avatar.id;
      const isLocked = avatar.vip && !isPremiumOrDelux;

      const item = document.createElement('div');
      item.className = `selectable-item ${isSelected ? 'selected' : ''} ${isLocked ? 'locked' : ''}`;
      item.dataset.id = avatar.id;
      item.title = avatar.name + (avatar.vip ? ' (VIP)' : '');
      item.innerHTML = `
        ${isLocked ? '<div class="lock-overlay" title="Потрібна підписка FinansePremium">🔒</div>' : ''}
        <div style="width: 44px; height: 44px; pointer-events: none;">
          ${avatar.svg}
        </div>
        <span class="item-label">${avatar.name}</span>
      `;
      item.addEventListener('click', (e) => {
        e.stopPropagation();
        this.selectAvatar(avatar.id, avatar.vip);
      });
      this.avatarSelectionGrid.appendChild(item);
    });
  }

  renderFrameSelection() {
    const isDelux = this.subscription.tier === 'delux';

    this.frameSelectionGrid.innerHTML = '';
    FRAMES.forEach(frame => {
      const isSelected = this.profile.frameId === frame.id;
      const isLocked = frame.vip && !isDelux;

      const item = document.createElement('div');
      item.className = `selectable-item ${isSelected ? 'selected' : ''} ${isLocked ? 'locked' : ''}`;
      item.dataset.id = frame.id;
      item.title = frame.name + (frame.vip ? ' (Delux)' : '');
      item.innerHTML = `
        ${isLocked ? '<div class="lock-overlay" title="Потрібна підписка FinanseDelux">🔒</div>' : ''}
        <div class="avatar-container ${frame.id}" style="width: 44px; height: 44px; pointer-events: none;">
          <div class="avatar-image-box" style="font-size: 1.1rem;">
            ${frame.icon}
          </div>
        </div>
        <span class="item-label">${frame.name}</span>
      `;
      item.addEventListener('click', (e) => {
        e.stopPropagation();
        this.selectFrame(frame.id, frame.vip);
      });
      this.frameSelectionGrid.appendChild(item);
    });
  }

  selectAvatar(avatarId, isVip) {
    const isPremiumOrDelux = this.subscription.tier === 'premium' || this.subscription.tier === 'delux';
    const targetAvatar = AVATARS.find(a => a.id === avatarId) || AVATARS[0];

    // 1. Миттєво оновлюємо прев'ю аватара у вікні
    this.profilePreviewBox.innerHTML = targetAvatar.svg;

    // 2. Якщо аватарка VIP і користувач ще без підписки — показуємо примірку та пропозицію
    if (isVip && !isPremiumOrDelux) {
      if (this.profileVipBanner) {
        this.profileVipBanner.style.display = 'flex';
        this.profileVipBanner.className = 'profile-vip-banner';
        this.profileVipBanner.innerHTML = `
          <div class="profile-vip-banner-text">
            🦁 Аватарка <strong>«${targetAvatar.name}»</strong> входить до підписки <strong>FinansePremium</strong>.
          </div>
          <button type="button" class="btn-banner-unlock" onclick="app.closeModal(app.profileModal); app.openCheckoutModal('premium');">
            Купити за 40 ₴
          </button>
        `;
      }
      this.highlightAvatarSelection(avatarId);
      this.showToast(`🦁 Приміряно «${targetAvatar.name}». Для збереження потрібна підписка FinansePremium.`);
      return;
    }

    if (this.profileVipBanner) {
      this.profileVipBanner.style.display = 'none';
    }

    // 3. Зберігаємо вибір
    this.profile.avatarId = avatarId;
    this.saveProfile();
    this.renderHeaderProfile();
    this.highlightAvatarSelection(avatarId);
    this.showToast(`✅ Аватарку «${targetAvatar.name}» успішно встановлено!`);
  }

  selectFrame(frameId, isVip) {
    const isDelux = this.subscription.tier === 'delux';
    const targetFrame = FRAMES.find(f => f.id === frameId) || FRAMES[0];

    // 1. Миттєво вмикаємо анімовану рамку на прев'ю у вікні
    this.profileFrameContainer.className = 'avatar-container profile-avatar-large ' + (frameId || 'frame-none');

    // 2. Якщо рамка VIP і користувач ще не має тарифу Delux — показуємо примірку
    if (isVip && !isDelux) {
      if (this.profileVipBanner) {
        this.profileVipBanner.style.display = 'flex';
        this.profileVipBanner.className = 'profile-vip-banner';
        this.profileVipBanner.innerHTML = `
          <div class="profile-vip-banner-text">
            👑 VIP-рамка <strong>«${targetFrame.name}»</strong> доступна в тарифі <strong>FinanseDelux</strong>.
          </div>
          <button type="button" class="btn-banner-unlock" onclick="app.closeModal(app.profileModal); app.openCheckoutModal('delux');">
            Купити за 100 ₴
          </button>
        `;
      }
      this.highlightFrameSelection(frameId);
      this.showToast(`✨ Приміряно рамку «${targetFrame.name}». Для збереження потрібен FinanseDelux.`);
      return;
    }

    if (this.profileVipBanner) {
      this.profileVipBanner.style.display = 'none';
    }

    // 3. Зберігаємо рамку
    this.profile.frameId = frameId;
    this.saveProfile();
    this.renderHeaderProfile();
    this.highlightFrameSelection(frameId);
    this.showToast(`✅ VIP-рамку «${targetFrame.name}» успішно застосовано!`);
  }

  highlightAvatarSelection(avatarId) {
    const items = this.avatarSelectionGrid.querySelectorAll('.selectable-item');
    items.forEach(el => {
      if (el.dataset.id === avatarId) {
        el.classList.add('selected');
      } else {
        el.classList.remove('selected');
      }
    });
  }

  highlightFrameSelection(frameId) {
    const items = this.frameSelectionGrid.querySelectorAll('.selectable-item');
    items.forEach(el => {
      if (el.dataset.id === frameId) {
        el.classList.add('selected');
      } else {
        el.classList.remove('selected');
      }
    });
  }

  setTestTier(tier) {
    this.subscription = {
      tier,
      name: tier === 'delux' ? 'FinanseDelux' : (tier === 'premium' ? 'FinansePremium' : 'Базовий'),
      activeSince: tier === 'free' ? null : new Date().toISOString()
    };
    this.saveSubscription();
    this.renderAll();
    this.openProfileModal();
    this.showToast(`⚡ Тариф перемкнуто на: ${this.subscription.name}`);
  }

  // ==========================================
  // 10. MODAL & DRAWER HELPERS
  // ==========================================
  openDrawer() {
    this.menuDrawer.classList.add('active');
    this.drawerOverlay.classList.add('active');
  }

  closeDrawer() {
    this.menuDrawer.classList.remove('active');
    this.drawerOverlay.classList.remove('active');
  }

  openModal(modal) {
    modal.classList.add('active');
  }

  closeModal(modal) {
    modal.classList.remove('active');
  }

  openSubscriptionModal() {
    this.openModal(this.subscriptionModal);
  }

  showToast(message) {
    this.toastMessage.textContent = message;
    this.toastEl.classList.add('show');
    clearTimeout(this.toastTimeout);
    this.toastTimeout = setTimeout(() => {
      this.toastEl.classList.remove('show');
    }, 3000);
  }

  launchConfetti() {
    this.confettiContainer.innerHTML = '';
    const colors = ['#f59e0b', '#ec4899', '#8b5cf6', '#10b981', '#3b82f6', '#fef08a'];

    for (let i = 0; i < 70; i++) {
      const piece = document.createElement('div');
      piece.className = 'confetti-piece';
      piece.style.left = Math.random() * 100 + 'vw';
      piece.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      piece.style.animationDelay = (Math.random() * 1.5) + 's';
      piece.style.width = (Math.random() * 8 + 6) + 'px';
      piece.style.height = (Math.random() * 14 + 8) + 'px';
      this.confettiContainer.appendChild(piece);
    }

    setTimeout(() => {
      this.confettiContainer.innerHTML = '';
    }, 4500);
  }

  resetData() {
    if (confirm('Скинути всі дані та підписку до початкового стану?')) {
      localStorage.clear();
      this.transactions = [...DEFAULT_TRANSACTIONS];
      this.subscription = { tier: 'free', name: 'Базовий', activeSince: null };
      this.profile = { name: 'Фінансовий Лідер', avatarId: 'fox', frameId: 'frame-none' };
      this.saveTransactions();
      this.saveSubscription();
      this.saveProfile();
      this.renderAll();
      this.showToast('Дані успішно скинуто');
    }
  }

  escapeHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }
}

// Global App instance
let app;
window.addEventListener('DOMContentLoaded', () => {
  window.app = app = new TrackMyFinanceApp();
});
