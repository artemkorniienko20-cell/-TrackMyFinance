'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useFinance } from '@/context/FinanceContext';
import { APP_ICONS } from '@/constants/icons';
import { AVATARS } from '@/constants/avatars';
import { LANGUAGES } from '@/constants/languages';
import { Language } from '@/types';

export const Header: React.FC = () => {
  const pathname = usePathname();
  const {
    isMounted,
    theme,
    iconVariant,
    subscription,
    profile,
    toggleTheme,
    toggleIconVariant,
    setIsDrawerOpen,
    setIsSubModalOpen,
    setIsProfileModalOpen,
    language,
    setLanguage,
    user,
    setIsGoogleChooserOpen,
    plannedPayments,
    utilityBills,
    debts,
    t
  } = useFinance();

  const currentIcon = APP_ICONS[iconVariant] || APP_ICONS[2];
  const curAvatar = AVATARS.find(a => a.id === profile.avatarId) || AVATARS[0];

  const badgeClass = subscription.tier === 'super_premium'
    ? 'header-badge badge-super-premium'
    : subscription.tier === 'delux'
    ? 'header-badge badge-delux'
    : subscription.tier === 'premium'
    ? 'header-badge badge-premium'
    : 'header-badge badge-free';

  const badgeLabel = subscription.tier === 'super_premium'
    ? '💎 SuperPremium'
    : subscription.tier === 'delux'
    ? '👑 FinanseDelux'
    : subscription.tier === 'premium'
    ? '⭐ FinansePremium'
    : 'Базовий';

  const hasDeluxNickBadge = subscription.tier === 'delux' || subscription.tier === 'super_premium';

  const pendingCount = plannedPayments.filter(p => !p.isPaid).length;
  const unpaidUtilitiesCount = utilityBills.filter(b => !b.isPaid).length;
  const openDebtsCount = debts.filter(d => !d.isClosed).length;

  return (
    <header className="header">
      <div className="header-container">
        <Link href="/" className="logo">
          <div
            className="logo-icon"
            dangerouslySetInnerHTML={{ __html: isMounted ? currentIcon.svg : APP_ICONS[2].svg }}
          />
          <div className="logo-text">Track<span>MyFinance</span></div>
        </Link>

        {/* Навігація між сторінками */}
        <nav className="header-nav">
          <Link
            href="/"
            className={`header-nav-btn ${pathname === '/' ? 'active' : ''}`}
            title="Головна сторінка балансу"
          >
            <span>🏠</span>
            <span className="nav-btn-text">{t.navHome}</span>
          </Link>

          <Link
            href="/planned"
            className={`header-nav-btn ${pathname === '/planned' ? 'active' : ''}`}
            title="Платежі на потім та рахунки"
          >
            <span>📅</span>
            <span className="nav-btn-text">{t.navPlanned}</span>
            {pendingCount > 0 && (
              <span className="header-nav-badge">{pendingCount}</span>
            )}
          </Link>

          <Link
            href="/utilities"
            className={`header-nav-btn ${pathname === '/utilities' ? 'active' : ''}`}
            title={t.navUtilities}
          >
            <span>💡</span>
            <span className="nav-btn-text">{t.navUtilities}</span>
            {unpaidUtilitiesCount > 0 && (
              <span className="header-nav-badge">{unpaidUtilitiesCount}</span>
            )}
          </Link>

          <Link
            href="/debts"
            className={`header-nav-btn ${pathname === '/debts' ? 'active' : ''}`}
            title={t.navDebts}
          >
            <span>🤝</span>
            <span className="nav-btn-text">{t.navDebts}</span>
            {openDebtsCount > 0 && (
              <span className="header-nav-badge" style={{ background: '#6366f1' }}>{openDebtsCount}</span>
            )}
          </Link>
        </nav>

        <div className="header-actions">
          {/* Language & Currency Selector */}
          <div className="lang-selector" title="Оберіть мову та валюту">
            <span style={{ fontSize: '1.05rem' }}>{LANGUAGES[language].flag}</span>
            <select
              className="lang-select-native"
              value={language}
              onChange={(e) => setLanguage(e.target.value as Language)}
              aria-label="Вибір мови та валюти"
            >
              <option value="uk">UA (₴)</option>
              <option value="en">EN ($)</option>
              <option value="pl">PL (zł)</option>
              <option value="ru">RU (₽)</option>
              <option value="sv">SE (kr)</option>
              <option value="ro">RO (lei)</option>
            </select>
          </div>

          {/* Theme switcher */}
          <button
            className="btn-toggle-tool"
            onClick={toggleTheme}
            title="Перемкнути інтерфейс (Світлий / Темний)"
          >
            <span>{theme === 'light' ? '🌙' : '☀️'}</span>
            <span>{theme === 'light' ? t.themeToggleDark : t.themeToggleLight}</span>
          </button>

          {/* App icon switcher */}
          <button
            className="btn-toggle-tool"
            onClick={toggleIconVariant}
            title="Перемкнути іконку сайту (Щит / Діамант)"
          >
            <span>🎨</span>
            <span>{t.iconToggle} {iconVariant}</span>
          </button>

          {/* Google Auth Status / Login CTA */}
          {user.isLoggedIn ? (
            <div
              className="user-status-pill"
              onClick={() => setIsProfileModalOpen(true)}
              title={`Авторизовано через Google: ${user.email}`}
              style={{ borderColor: 'rgba(66, 133, 244, 0.4)', background: 'rgba(66, 133, 244, 0.1)' }}
            >
              <span style={{ fontSize: '0.85rem' }}>🌐</span>
              <span style={{ fontSize: '0.82rem', fontWeight: 600, color: '#93c5fd', display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                <span>{profile.name || user.name || user.email?.split('@')[0]}</span>
                {isMounted && hasDeluxNickBadge && (
                  <span className="delux-nick-badge" title="Delux VIP">
                    {subscription.tier === 'super_premium' ? '💎 Delux' : '👑 Delux'}
                  </span>
                )}
              </span>
            </div>
          ) : (
            <button
              className="btn-toggle-tool"
              style={{ background: 'rgba(66, 133, 244, 0.15)', borderColor: 'rgba(66, 133, 244, 0.35)', color: '#93c5fd' }}
              onClick={() => setIsGoogleChooserOpen(true)}
              title="Увійти через Google та отримати рамку"
            >
              <span>🌐</span>
              <span>Вхід Google</span>
            </button>
          )}

          {/* User profile pill */}
          <div
            className="user-status-pill"
            onClick={() => setIsProfileModalOpen(true)}
            title={`Профіль: ${isMounted ? profile.name : 'Фінансовий Лідер'}`}
          >
            <div className="header-avatar-wrapper">
              <div className={`avatar-container ${isMounted ? profile.frameId : 'frame-none'}`}>
                <div
                  className="avatar-image-box"
                  dangerouslySetInnerHTML={{ __html: isMounted ? curAvatar.svg : AVATARS[0].svg }}
                />
              </div>
            </div>
            <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-main)', maxWidth: '170px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
              <span>{isMounted ? profile.name : 'Фінансовий Лідер'}</span>
              {isMounted && hasDeluxNickBadge && (
                <span className="delux-nick-badge" title="Delux VIP">
                  {subscription.tier === 'super_premium' ? '💎 Delux' : '👑 Delux'}
                </span>
              )}
            </span>
            <span className={badgeClass}>
              <span>{isMounted ? badgeLabel : 'Базовий'}</span>
            </span>
          </div>

          {/* Subscriptions CTA button */}
          <button className="btn-premium-cta" onClick={() => setIsSubModalOpen(true)}>
            <span>⭐</span> <span>{t.btnSubscriptions}</span>
          </button>

          {/* Hamburger menu */}
          <button className="btn-menu" onClick={() => setIsDrawerOpen(true)} aria-label="Відкрити меню">
            <span>☰</span> <span>Меню</span>
          </button>
        </div>
      </div>
    </header>
  );
};
