import { FrameItem } from '@/types';

export const FRAMES: FrameItem[] = [
  { id: 'frame-none', name: 'Без рамки', icon: '⚪', vip: false, desc: 'Стандартний вигляд аватара' },
  { id: 'frame-google-vip', name: 'Google Titan Aura', icon: '🌐', vip: true, desc: 'Фірмове райдужне сяйво Google для авторизованих користувачів', requiresGoogleAuth: true },
  { id: 'frame-royal-gold', name: 'Золоте Сяйво', icon: '👑', vip: true, desc: 'Королівське золоте обертове сяйво' },
  { id: 'frame-cyber-neon', name: 'Кібер Неон', icon: '⚡', vip: true, desc: 'Пульсуючий бірюзово-фіолетовий неон' },
  { id: 'frame-diamond-shimmer', name: 'Діамант', icon: '💎', vip: true, desc: 'Призматичний кришталевий перелив' },
  { id: 'frame-flame-aura', name: 'Вогняна Аура', icon: '🔥', vip: true, desc: 'Динамічне полум’яне дихання' },
  { id: 'frame-cosmic-nebula', name: 'Галактика', icon: '🌌', vip: true, desc: 'Глибокий космічний вихор туманності' },
  // 20 Нових Рамок (FinanseSuperPremium & VIP)
  { id: 'frame-super-delux', name: 'Super Delux Prism', icon: '✨', vip: true, tierRequired: 'super_premium', desc: 'Ультимативне райдужне призматичне сяйво вищого класу' },
  { id: 'frame-neon-laser', name: 'Неоновий Лазер', icon: '🟢', vip: true, tierRequired: 'super_premium', desc: 'Яскраве лазерне неонове кільце з пульсацією' },
  { id: 'frame-emerald-pulse', name: 'Смарагдовий Імпульс', icon: '❇️', vip: true, tierRequired: 'super_premium', desc: 'Глибоке хвильове зелене світіння грошової енергії' },
  { id: 'frame-ruby-fire', name: 'Рубіновий Вихор', icon: '🔴', vip: true, tierRequired: 'super_premium', desc: 'Багряно-червоні рубінові спалахи активності' },
  { id: 'frame-sapphire-ocean', name: 'Сапфіровий Океан', icon: '🌊', vip: true, tierRequired: 'super_premium', desc: 'Глибоководний перелив синіх кристалів' },
  { id: 'frame-amethyst-spark', name: 'Аметистова Магія', icon: '🔮', vip: true, tierRequired: 'super_premium', desc: 'Фіолетові містичні іскри достатку' },
  { id: 'frame-quantum-matrix', name: 'Квантова Матриця', icon: '🧬', vip: true, tierRequired: 'super_premium', desc: 'Кібернетичні потоки бінарного коду' },
  { id: 'frame-golden-crown', name: 'Імперська Корона', icon: '👑', vip: true, tierRequired: 'super_premium', desc: 'Подвійне золоте кільце монарха фінансів' },
  { id: 'frame-lightning-storm', name: 'Блискавичний Шторм', icon: '⚡', vip: true, tierRequired: 'super_premium', desc: 'Електричні дуги та миттєва реакція' },
  { id: 'frame-solar-eclipse', name: 'Сонячна Корона', icon: '☀️', vip: true, tierRequired: 'super_premium', desc: 'Вогняне сонячне затемнення з променями' },
  { id: 'frame-frost-glacier', name: 'Крижаний Неоліт', icon: '❄️', vip: true, tierRequired: 'super_premium', desc: 'Холодний та непохитний розрахунок' },
  { id: 'frame-toxic-slime', name: 'Кіберпанк Драйв', icon: '🧪', vip: true, tierRequired: 'super_premium', desc: 'Отруйно-зелений флуоресцентний неон' },
  { id: 'frame-plasma-orb', name: 'Плазмова Сфера', icon: '🟣', vip: true, tierRequired: 'super_premium', desc: 'Високочастотна плазмова куля' },
  { id: 'frame-rainbow-hyper', name: 'Гіпервеселка VIP', icon: '🌈', vip: true, tierRequired: 'super_premium', desc: 'Безперервне обертання всього спектру кольорів' },
  { id: 'frame-shadow-void', name: 'Тіньовий Вакуум', icon: '🖤', vip: true, tierRequired: 'super_premium', desc: 'Загадкова темна матерія та стильний мінімалізм' },
  { id: 'frame-starlight-halo', name: 'Зоряне Гало', icon: '⭐', vip: true, tierRequired: 'super_premium', desc: 'Мерехтливе сузірʼя успішних операцій' },
  { id: 'frame-magma-lava', name: 'Вулканічна Лава', icon: '🌋', vip: true, tierRequired: 'super_premium', desc: 'Розпечена лава максимального прибутку' },
  { id: 'frame-hologram-cyan', name: 'Голограма 3D', icon: '🥽', vip: true, tierRequired: 'super_premium', desc: 'Футуристична проекція цифрового банку' },
  { id: 'frame-celestial-god', name: 'Селестіал Сяйво', icon: '👼', vip: true, tierRequired: 'super_premium', desc: 'Неземне біло-золоте благословення балансу' },
  { id: 'frame-infinity-mirror', name: 'Дзеркало Нескінченності', icon: '♾️', vip: true, tierRequired: 'super_premium', desc: 'Нескінченна глибина примноження заощаджень' }
];
