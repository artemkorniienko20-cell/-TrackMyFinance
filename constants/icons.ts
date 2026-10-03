import { AppIconItem } from '@/types';

export const APP_ICONS: Record<number, AppIconItem> = {
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
