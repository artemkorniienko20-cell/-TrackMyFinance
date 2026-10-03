import { AvatarItem } from '@/types';

export const AVATARS: AvatarItem[] = [
  // Free Starter Avatars
  {
    id: 'fox',
    name: 'Лис Фінансист',
    vip: false,
    desc: 'Базовий аватар: кмітливий стратег бюджету',
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
    desc: 'Базовий аватар: символ збереження заощаджень',
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
    desc: 'Базовий аватар: дзен фінансового спокою',
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
  // 6 VIP Avatars (FinansePremium / FinanseDelux)
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
      <circle cx="50" cy="50" r="38" fill="url(#goldMane)"/>
      <circle cx="28" cy="26" r="10" fill="#b45309"/>
      <circle cx="72" cy="26" r="10" fill="#b45309"/>
      <circle cx="28" cy="26" r="5" fill="#fef3c7"/>
      <circle cx="72" cy="26" r="5" fill="#fef3c7"/>
      <ellipse cx="50" cy="56" rx="26" ry="24" fill="#fef3c7"/>
      <rect x="26" y="44" width="20" height="14" rx="4" fill="#111827"/>
      <rect x="54" y="44" width="20" height="14" rx="4" fill="#111827"/>
      <rect x="44" y="48" width="12" height="4" fill="#fbbf24"/>
      <polygon points="45,64 55,64 50,70" fill="#92400e"/>
      <path d="M 45,74 Q 50,78 55,74" stroke="#92400e" stroke-width="2.5" fill="none"/>
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
      <polygon points="20,18 42,42 16,46" fill="#3b82f6"/>
      <polygon points="80,18 58,42 84,46" fill="#ec4899"/>
      <polygon points="25,24 38,40 20,43" fill="#00f2fe"/>
      <polygon points="75,24 62,40 80,43" fill="#f43f5e"/>
      <ellipse cx="50" cy="56" rx="32" ry="26" fill="#1e293b"/>
      <rect x="24" y="44" width="52" height="15" rx="6" fill="#00f2fe" opacity="0.9"/>
      <line x1="28" y1="51" x2="72" y2="51" stroke="#ec4899" stroke-width="3"/>
      <polygon points="47,65 53,65 50,69" fill="#00f2fe"/>
      <path d="M 44,72 L 50,70 L 56,72" stroke="#00f2fe" stroke-width="2" fill="none"/>
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
      <polygon points="20,38 50,12 80,38 50,88" fill="url(#diamondGrad)"/>
      <polygon points="20,38 50,12 50,88" fill="#bae6fd" opacity="0.4"/>
      <polygon points="34,38 50,12 66,38 50,88" fill="#e0f2fe" opacity="0.6"/>
      <line x1="20" y1="38" x2="80" y2="38" stroke="#ffffff" stroke-width="2"/>
      <circle cx="60" cy="46" r="10" fill="none" stroke="#fbbf24" stroke-width="3"/>
      <line x1="68" y1="52" x2="78" y2="75" stroke="#fbbf24" stroke-width="2"/>
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
      <path d="M 50,20 Q 20,40 10,65 Q 35,60 50,75 Q 65,60 90,65 Q 80,40 50,20 Z" fill="#ff4d4d"/>
      <path d="M 50,26 Q 30,44 24,65 Q 40,62 50,72 Q 60,62 76,65 Q 70,44 50,26 Z" fill="#ff9900"/>
      <path d="M 50,32 Q 38,48 35,64 Q 45,62 50,68 Q 55,62 65,64 Q 62,48 50,32 Z" fill="#ffea00"/>
      <circle cx="43" cy="46" r="3.5" fill="#00f2fe"/>
      <circle cx="57" cy="46" r="3.5" fill="#00f2fe"/>
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
      <circle cx="20" cy="20" r="1.5" fill="#fff"/>
      <circle cx="80" cy="18" r="1" fill="#fff"/>
      <circle cx="82" cy="78" r="1.5" fill="#fff"/>
      <circle cx="15" cy="80" r="1" fill="#fff"/>
      <circle cx="50" cy="52" r="34" fill="#e2e8f0"/>
      <circle cx="50" cy="52" r="30" fill="#1e293b"/>
      <ellipse cx="50" cy="52" rx="24" ry="18" fill="url(#spaceVisor)"/>
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
      <circle cx="50" cy="14" r="5" fill="#ef4444"/>
      <circle cx="28" cy="20" r="4" fill="#3b82f6"/>
      <circle cx="72" cy="20" r="4" fill="#10b981"/>
      <circle cx="50" cy="45" r="7" fill="#8b5cf6"/>
      <rect x="30" y="62" width="40" height="6" rx="3" fill="#f59e0b"/>
      <circle cx="38" cy="65" r="2" fill="#ef4444"/>
      <circle cx="50" cy="65" r="2" fill="#10b981"/>
      <circle cx="62" cy="65" r="2" fill="#3b82f6"/>
    </svg>`
  },
  // 20 Нових Ексклюзивних Аватарок
  {
    id: 'tiger',
    name: 'Тигр Волл-стріт',
    vip: true,
    tierRequired: 'super_premium',
    desc: 'Хижий та безпомилковий інстинкт примноження капіталу',
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="50" fill="#451a03"/>
      <ellipse cx="50" cy="54" rx="35" ry="30" fill="#f97316"/>
      <polygon points="20,24 38,45 16,46" fill="#ea580c"/>
      <polygon points="80,24 62,45 84,46" fill="#ea580c"/>
      <polygon points="25,28 35,44 19,45" fill="#fef08a"/>
      <polygon points="75,28 65,44 81,45" fill="#fef08a"/>
      <ellipse cx="50" cy="66" rx="20" ry="14" fill="#ffedd5"/>
      <polygon points="46,58 54,58 50,65" fill="#1c1917"/>
      <polygon points="50,26 47,38 53,38" fill="#1c1917"/>
      <polygon points="36,32 35,42 42,39" fill="#1c1917"/>
      <polygon points="64,32 65,42 58,39" fill="#1c1917"/>
      <ellipse cx="36" cy="48" rx="6" ry="4" fill="#10b981"/>
      <ellipse cx="64" cy="48" rx="6" ry="4" fill="#10b981"/>
      <circle cx="36" cy="48" r="2.5" fill="#022c22"/>
      <circle cx="64" cy="48" r="2.5" fill="#022c22"/>
    </svg>`
  },
  {
    id: 'wolf',
    name: 'Вовк Інвестицій',
    vip: true,
    tierRequired: 'super_premium',
    desc: 'Лідер фінансової зграї, що веде до перемоги',
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="50" fill="#0f172a"/>
      <circle cx="50" cy="50" r="42" fill="#1e293b"/>
      <polygon points="24,20 38,42 16,42" fill="#334155"/>
      <polygon points="76,20 62,42 84,42" fill="#334155"/>
      <polygon points="26,24 35,40 20,40" fill="#94a3b8"/>
      <polygon points="74,24 65,40 80,40" fill="#94a3b8"/>
      <polygon points="30,42 70,42 50,78" fill="#64748b"/>
      <polygon points="42,65 58,65 50,76" fill="#0f172a"/>
      <polygon points="32,46 44,48 38,42" fill="#38bdf8"/>
      <polygon points="68,46 56,48 62,42" fill="#38bdf8"/>
      <circle cx="38" cy="45" r="1.5" fill="#fff"/>
      <circle cx="62" cy="45" r="1.5" fill="#fff"/>
    </svg>`
  },
  {
    id: 'bull',
    name: 'Бик Бичачого Ринку',
    vip: true,
    tierRequired: 'super_premium',
    desc: 'Символ нестримного росту котирувань та активів 📈',
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="50" fill="#7f1d1d"/>
      <path d="M 22,25 Q 15,10 5,20 Q 18,35 28,38 Z" fill="#fbbf24"/>
      <path d="M 78,25 Q 85,10 95,20 Q 82,35 72,38 Z" fill="#fbbf24"/>
      <ellipse cx="50" cy="54" rx="34" ry="28" fill="#991b1b"/>
      <ellipse cx="50" cy="68" rx="22" ry="14" fill="#dc2626"/>
      <circle cx="42" cy="70" r="3" fill="#450a0a"/>
      <circle cx="58" cy="70" r="3" fill="#450a0a"/>
      <ellipse cx="36" cy="48" rx="5" ry="6" fill="#fef08a"/>
      <ellipse cx="64" cy="48" rx="5" ry="6" fill="#fef08a"/>
      <circle cx="36" cy="48" r="2.5" fill="#000"/>
      <circle cx="64" cy="48" r="2.5" fill="#000"/>
    </svg>`
  },
  {
    id: 'bear',
    name: 'Стратегічний Ведмідь',
    vip: true,
    tierRequired: 'super_premium',
    desc: 'Стриманість, дисципліна та купівля активів на «дні»',
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="50" fill="#14532d"/>
      <circle cx="25" cy="30" r="12" fill="#15803d"/>
      <circle cx="75" cy="30" r="12" fill="#15803d"/>
      <circle cx="25" cy="30" r="7" fill="#86efac"/>
      <circle cx="75" cy="30" r="7" fill="#86efac"/>
      <ellipse cx="50" cy="56" rx="34" ry="30" fill="#166534"/>
      <ellipse cx="50" cy="68" rx="20" ry="14" fill="#bbf7d0"/>
      <polygon points="46,62 54,62 50,68" fill="#052e16"/>
      <circle cx="37" cy="48" r="4.5" fill="#052e16"/>
      <circle cx="63" cy="48" r="4.5" fill="#052e16"/>
      <circle cx="38" cy="46" r="1.5" fill="#fff"/>
      <circle cx="64" cy="46" r="1.5" fill="#fff"/>
    </svg>`
  },
  {
    id: 'eagle',
    name: 'Золотий Орел',
    vip: true,
    tierRequired: 'super_premium',
    desc: 'Високий політ стратегічного бачення фінансів',
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="50" fill="#1e1b4b"/>
      <circle cx="50" cy="50" r="44" fill="#312e81"/>
      <polygon points="50,22 66,45 34,45" fill="#f8fafc"/>
      <path d="M 32,45 Q 50,30 68,45 L 62,70 Q 50,60 38,70 Z" fill="#e2e8f0"/>
      <polygon points="44,52 68,52 50,78" fill="#f59e0b"/>
      <circle cx="42" cy="42" r="4" fill="#ef4444"/>
      <circle cx="42" cy="42" r="2" fill="#000"/>
      <circle cx="43" cy="41" r="1" fill="#fff"/>
    </svg>`
  },
  {
    id: 'cyber_samurai',
    name: 'Кібер Самурай',
    vip: true,
    tierRequired: 'super_premium',
    desc: 'Кодекс фінансової честі та лазерна концентрація',
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="50" fill="#030712"/>
      <path d="M 22,35 Q 50,15 78,35 L 74,65 L 26,65 Z" fill="#1f2937"/>
      <polygon points="50,12 56,30 44,30" fill="#06b6d4"/>
      <polygon points="50,18 72,25 60,35" fill="#e11d48"/>
      <polygon points="50,18 28,25 40,35" fill="#e11d48"/>
      <rect x="30" y="44" width="40" height="8" rx="4" fill="#06b6d4"/>
      <path d="M 32,58 L 68,58 L 50,78 Z" fill="#374151"/>
      <circle cx="50" cy="48" r="2" fill="#fff"/>
    </svg>`
  },
  {
    id: 'crypto_whale',
    name: 'Крипто Кит',
    vip: true,
    tierRequired: 'super_premium',
    desc: 'Масштабні операції та гігантські капітали',
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="50" fill="#082f49"/>
      <ellipse cx="48" cy="54" rx="36" ry="24" fill="#0284c7"/>
      <polygon points="80,54 94,40 92,68" fill="#0369a1"/>
      <ellipse cx="48" cy="62" rx="28" ry="12" fill="#bae6fd"/>
      <circle cx="28" cy="48" r="4" fill="#0c4a6e"/>
      <circle cx="29" cy="47" r="1.5" fill="#fff"/>
      <path d="M 40,30 Q 42,20 48,22 Q 44,28 42,32" stroke="#38bdf8" stroke-width="2.5" fill="none"/>
    </svg>`
  },
  {
    id: 'golden_dragon',
    name: 'Імператорський Дракон',
    vip: true,
    tierRequired: 'super_premium',
    desc: 'Вічне золото, багатство та драконяча могутність',
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="50" fill="#78350f"/>
      <path d="M 25,25 Q 40,10 50,22 Q 60,10 75,25 Q 70,45 50,78 Q 30,45 25,25 Z" fill="#d97706"/>
      <path d="M 35,32 Q 50,22 65,32 L 50,68 Z" fill="#fbbf24"/>
      <polygon points="50,15 54,28 46,28" fill="#ef4444"/>
      <circle cx="40" cy="42" r="4.5" fill="#ef4444"/>
      <circle cx="60" cy="42" r="4.5" fill="#ef4444"/>
      <circle cx="40" cy="42" r="2" fill="#000"/>
      <circle cx="60" cy="42" r="2" fill="#000"/>
      <circle cx="50" cy="74" r="6" fill="#10b981"/>
    </svg>`
  },
  {
    id: 'robot_ai',
    name: 'AI Архітектор',
    vip: true,
    tierRequired: 'super_premium',
    desc: 'Штучний інтелект для оптимізації кожного цента',
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="50" fill="#18181b"/>
      <rect x="25" y="28" width="50" height="42" rx="10" fill="#27272a" stroke="#a855f7" stroke-width="2"/>
      <rect x="32" y="38" width="36" height="14" rx="4" fill="#581c87"/>
      <circle cx="40" cy="45" r="4" fill="#c084fc"/>
      <circle cx="60" cy="45" r="4" fill="#c084fc"/>
      <line x1="50" y1="28" x2="50" y2="16" stroke="#a855f7" stroke-width="3"/>
      <circle cx="50" cy="14" r="4" fill="#e879f9"/>
      <line x1="38" y1="60" x2="62" y2="60" stroke="#a855f7" stroke-width="2"/>
    </svg>`
  },
  {
    id: 'spartan',
    name: 'Спартанець Бюджету',
    vip: true,
    tierRequired: 'super_premium',
    desc: 'Залізна воля, ані копійки на зайві забаганки',
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="50" fill="#4c0519"/>
      <path d="M 46,12 Q 50,4 54,12 L 56,38 L 44,38 Z" fill="#e11d48"/>
      <path d="M 28,34 Q 50,22 72,34 L 70,68 Q 50,82 30,68 Z" fill="#b45309"/>
      <path d="M 38,46 L 62,46 L 60,54 L 40,54 Z" fill="#000"/>
      <line x1="50" y1="54" x2="50" y2="76" stroke="#000" stroke-width="4"/>
      <circle cx="44" cy="50" r="1.5" fill="#fde047"/>
      <circle cx="56" cy="50" r="1.5" fill="#fde047"/>
    </svg>`
  },
  {
    id: 'wizard',
    name: 'Маг Капіталу',
    vip: true,
    tierRequired: 'super_premium',
    desc: 'Чарівне перетворення заощаджень на великі статки',
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="50" fill="#2e1065"/>
      <polygon points="50,14 74,48 26,48" fill="#581c87"/>
      <ellipse cx="50" cy="48" rx="30" ry="8" fill="#7e22ce"/>
      <polygon points="50,26 53,34 62,34 55,39 58,47 50,42 42,47 45,39 38,34 47,34" fill="#facc15"/>
      <circle cx="50" cy="62" r="16" fill="#fbcfe8"/>
      <circle cx="44" cy="60" r="2.5" fill="#4a044e"/>
      <circle cx="56" cy="60" r="2.5" fill="#4a044e"/>
      <polygon points="34,68 66,68 50,86" fill="#e2e8f0"/>
    </svg>`
  },
  {
    id: 'astronaut_gold',
    name: 'Золотий Астронавт',
    vip: true,
    tierRequired: 'super_premium',
    desc: 'Міжзоряна фінансова експансія до нових вершин',
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="50" fill="#020617"/>
      <circle cx="50" cy="52" r="34" fill="#e2e8f0"/>
      <circle cx="50" cy="52" r="29" fill="#1e293b"/>
      <ellipse cx="50" cy="52" rx="24" ry="18" fill="#eab308"/>
      <path d="M 34,48 Q 50,40 66,48 Q 58,60 34,48" fill="#fef08a"/>
      <circle cx="74" cy="30" r="1" fill="#fff"/>
      <circle cx="26" cy="24" r="1.5" fill="#fff"/>
    </svg>`
  },
  {
    id: 'diamond_hands',
    name: 'Діамантові Руки',
    vip: true,
    tierRequired: 'super_premium',
    desc: 'HODL легенда, що ніколи не продає в паніці',
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="50" fill="#0f172a"/>
      <polygon points="50,22 72,42 50,78 28,42" fill="#38bdf8"/>
      <polygon points="50,22 62,42 50,78 38,42" fill="#7dd3fc"/>
      <polygon points="50,22 72,42 62,42" fill="#0284c7"/>
      <polygon points="50,22 28,42 38,42" fill="#0284c7"/>
      <circle cx="50" cy="42" r="4" fill="#fff"/>
    </svg>`
  },
  {
    id: 'cyber_ninja',
    name: 'Тіньовий Ніндзя',
    vip: true,
    tierRequired: 'super_premium',
    desc: 'Тихий, непомітний та блискавичний прибуток',
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="50" fill="#111827"/>
      <ellipse cx="50" cy="52" rx="30" ry="28" fill="#1f2937"/>
      <rect x="24" y="44" width="52" height="12" rx="4" fill="#030712"/>
      <polygon points="34,48 44,52 36,54" fill="#ef4444"/>
      <polygon points="66,48 56,52 64,54" fill="#ef4444"/>
      <line x1="20" y1="36" x2="80" y2="36" stroke="#dc2626" stroke-width="3"/>
    </svg>`
  },
  {
    id: 'superhero',
    name: 'Супергерой Балансу',
    vip: true,
    tierRequired: 'super_premium',
    desc: 'Рятує гаманець від будь-яких непередбачуваних витрат',
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="50" fill="#1e3a8a"/>
      <ellipse cx="50" cy="54" rx="28" ry="28" fill="#fed7aa"/>
      <path d="M 26,44 Q 50,38 74,44 L 70,56 Q 50,50 30,56 Z" fill="#dc2626"/>
      <circle cx="40" cy="50" r="3" fill="#fff"/>
      <circle cx="60" cy="50" r="3" fill="#fff"/>
      <circle cx="40" cy="50" r="1.5" fill="#000"/>
      <circle cx="60" cy="50" r="1.5" fill="#000"/>
      <polygon points="50,68 58,78 42,78" fill="#facc15"/>
    </svg>`
  },
  {
    id: 'phoenix_gold',
    name: 'Золотий Фенікс',
    vip: true,
    tierRequired: 'super_premium',
    desc: 'Відродження та колосальний ріст за будь-яких криз',
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="50" fill="#451a03"/>
      <path d="M 50,18 Q 20,38 12,62 Q 35,58 50,72 Q 65,58 88,62 Q 80,38 50,18 Z" fill="#d97706"/>
      <path d="M 50,24 Q 30,42 24,60 Q 40,58 50,68 Q 60,58 76,60 Q 70,42 50,24 Z" fill="#fbbf24"/>
      <circle cx="44" cy="44" r="3" fill="#ef4444"/>
      <circle cx="56" cy="44" r="3" fill="#ef4444"/>
      <polygon points="46,48 54,48 50,58" fill="#fff"/>
    </svg>`
  },
  {
    id: 'galaxy_alien',
    name: 'Галактичний Інвестор',
    vip: true,
    tierRequired: 'super_premium',
    desc: 'Знає таємниці економіки далеких світів',
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="50" fill="#052e16"/>
      <ellipse cx="50" cy="52" rx="30" ry="34" fill="#22c55e"/>
      <ellipse cx="36" cy="48" rx="8" ry="12" fill="#000" transform="rotate(-15 36 48)"/>
      <ellipse cx="64" cy="48" rx="8" ry="12" fill="#000" transform="rotate(15 64 48)"/>
      <circle cx="35" cy="44" r="2.5" fill="#a7f3d0"/>
      <circle cx="63" cy="44" r="2.5" fill="#a7f3d0"/>
      <ellipse cx="50" cy="70" rx="4" ry="2" fill="#14532d"/>
    </svg>`
  },
  {
    id: 'lion_king',
    name: 'Лев Імператор VIP',
    vip: true,
    tierRequired: 'super_premium',
    desc: 'Верховна влада у світі інвестицій та фінансів',
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="50" fill="#3b0764"/>
      <circle cx="50" cy="54" r="36" fill="#ca8a04"/>
      <ellipse cx="50" cy="56" rx="26" ry="24" fill="#facc15"/>
      <polygon points="32,24 40,14 50,22 60,14 68,24" fill="#fbbf24" stroke="#a16207" stroke-width="2"/>
      <circle cx="50" cy="18" r="2" fill="#ef4444"/>
      <ellipse cx="40" cy="50" rx="4" ry="5" fill="#451a03"/>
      <ellipse cx="60" cy="50" rx="4" ry="5" fill="#451a03"/>
      <polygon points="46,58 54,58 50,64" fill="#713f12"/>
    </svg>`
  },
  {
    id: 'pegasus',
    name: 'Зоряний Пегас',
    vip: true,
    tierRequired: 'super_premium',
    desc: 'Крилатий розмах фінансового благополуччя',
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="50" fill="#0c4a6e"/>
      <path d="M 18,35 Q 38,20 54,42 Q 74,20 86,48 Q 58,62 50,80 Q 42,62 18,35 Z" fill="#e0f2fe"/>
      <polygon points="50,14 54,28 46,28" fill="#38bdf8"/>
      <ellipse cx="50" cy="54" rx="22" ry="24" fill="#f8fafc"/>
      <circle cx="42" cy="48" r="3.5" fill="#0284c7"/>
      <circle cx="58" cy="48" r="3.5" fill="#0284c7"/>
    </svg>`
  },
  {
    id: 'valkyrie',
    name: 'Валькірія Перемоги',
    vip: true,
    tierRequired: 'super_premium',
    desc: 'Щит та меч для захисту сімейного бюджету',
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="50" fill="#4a044e"/>
      <ellipse cx="50" cy="55" rx="24" ry="26" fill="#fed7aa"/>
      <path d="M 22,26 L 36,44 L 28,48 Z" fill="#e2e8f0"/>
      <path d="M 78,26 L 64,44 L 72,48 Z" fill="#e2e8f0"/>
      <rect x="34" y="32" width="32" height="8" rx="3" fill="#cbd5e1"/>
      <circle cx="42" cy="52" r="3" fill="#065f46"/>
      <circle cx="58" cy="52" r="3" fill="#065f46"/>
      <polygon points="46,60 54,60 50,65" fill="#f43f5e"/>
    </svg>`
  }
];
