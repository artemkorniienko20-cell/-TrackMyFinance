'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useFinance } from '@/context/FinanceContext';
import { APP_ICONS } from '@/constants/icons';
import { LANGUAGES } from '@/constants/languages';
import { Language } from '@/types';

export const SideDrawer: React.FC = () => {
  const pathname = usePathname();
  const {
    isMounted,
    iconVariant,
    theme,
    isDrawerOpen,
    setIsDrawerOpen,
    setIsSubModalOpen,
    setIsProfileModalOpen,
    toggleTheme,
    toggleIconVariant,
    resetData,
    language,
    setLanguage,
    subscription,
    profile,
    user,
    setIsGoogleChooserOpen,
    logout,
    plannedPayments,
    utilityBills,
    debts,
    t
  } = useFinance();

  const currentIcon = APP_ICONS[iconVariant] || APP_ICONS[2];
  const nextVariant = iconVariant === 1 ? 2 : 1;
  const pendingCount = plannedPayments.filter(p => !p.isPaid).length;
  const unpaidUtilitiesCount = utilityBills.filter(b => !b.isPaid).length;
  const openDebtsCount = debts.filter(d => !d.isClosed).length;

  if (!isDrawerOpen) return null;

  return (
    <>
      <div
        className={`drawer-overlay ${isDrawerOpen ? 'active' : ''}`}
        onClick={() => setIsDrawerOpen(false)}
      />
      <aside className={`side-drawer ${isDrawerOpen ? 'active' : ''}`}>
        <div className="drawer-header">
          <div className="logo" style={{ fontSize: '1.15rem' }}>
            <div
              className="logo-icon"
              style={{ width: '34px', height: '34px' }}
              dangerouslySetInnerHTML={{ __html: isMounted ? currentIcon.svg : APP_ICONS[2].svg }}
            />
            <div>Track<span>MyFinance</span></div>
          </div>
          <button className="modal-close" onClick={() => setIsDrawerOpen(false)}>&times;</button>
        </div>

        {/* User Google State */}
        {user.isLoggedIn ? (
          <div
            style={{
              background: 'rgba(66, 133, 244, 0.1)',
              border: '1px solid rgba(66, 133, 244, 0.3)',
              borderRadius: '10px',
              padding: '0.75rem',
              marginBottom: '1rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <div>
              <div style={{ fontSize: '0.85rem', fontWeight: 'bold', color: '#93c5fd', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <span>{profile.name || user.name}</span>
                {(subscription.tier === 'delux' || subscription.tier === 'super_premium') && (
                  <span className="delux-nick-badge" style={{ fontSize: '0.62rem', padding: '0.1rem 0.35rem' }}>
                    {subscription.tier === 'super_premium' ? '💎 Delux' : '👑 Delux'}
                  </span>
                )}
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                {user.email}
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                logout();
                setIsDrawerOpen(false);
              }}
              style={{
                background: 'rgba(239, 68, 68, 0.2)',
                border: '1px solid rgba(239, 68, 68, 0.4)',
                color: '#fca5a5',
                fontSize: '0.75rem',
                padding: '0.25rem 0.5rem',
                borderRadius: '6px',
                cursor: 'pointer'
              }}
            >
              Вийти
            </button>
          </div>
        ) : (
          <button
            type="button"
            className="btn-google-sign-in"
            style={{ marginBottom: '1rem', padding: '0.65rem' }}
            onClick={() => {
              setIsDrawerOpen(false);
              setIsGoogleChooserOpen(true);
            }}
          >
            <span>🌐</span>
            <span>{t.btnSignInGoogle}</span>
          </button>
        )}

        <nav className="drawer-nav">
          <Link
            href="/"
            className={`drawer-link ${pathname === '/' ? 'active' : ''}`}
            onClick={() => setIsDrawerOpen(false)}
          >
            <span className="drawer-link-icon">🏠</span>
            <span>{t.navHome} (Баланс)</span>
          </Link>

          <Link
            href="/planned"
            className={`drawer-link ${pathname === '/planned' ? 'active' : ''}`}
            onClick={() => setIsDrawerOpen(false)}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <span className="drawer-link-icon">📅</span>
              <span>{t.navPlanned}</span>
            </div>
            {pendingCount > 0 && (
              <span className="header-nav-badge" style={{ position: 'static' }}>
                {pendingCount}
              </span>
            )}
          </Link>

          <Link
            href="/utilities"
            className={`drawer-link ${pathname === '/utilities' ? 'active' : ''}`}
            onClick={() => setIsDrawerOpen(false)}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <span className="drawer-link-icon">💡</span>
              <span>{t.navUtilities}</span>
            </div>
            {unpaidUtilitiesCount > 0 && (
              <span className="header-nav-badge" style={{ position: 'static' }}>
                {unpaidUtilitiesCount}
              </span>
            )}
          </Link>

          <Link
            href="/debts"
            className={`drawer-link ${pathname === '/debts' ? 'active' : ''}`}
            onClick={() => setIsDrawerOpen(false)}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <span className="drawer-link-icon">🤝</span>
              <span>{t.navDebts}</span>
            </div>
            {openDebtsCount > 0 && (
              <span className="header-nav-badge" style={{ position: 'static', background: '#6366f1' }}>
                {openDebtsCount}
              </span>
            )}
          </Link>

          <button
            className="drawer-link"
            onClick={() => {
              setIsDrawerOpen(false);
              setIsSubModalOpen(true);
            }}
          >
            <span className="drawer-link-icon">⭐</span>
            <span>Тарифи та підписки</span>
          </button>

          <button
            className="drawer-link"
            onClick={() => {
              setIsDrawerOpen(false);
              setIsProfileModalOpen(true);
            }}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <span className="drawer-link-icon">👤</span>
              <span>{t.profileTitle}</span>
            </div>
            <span style={{ fontSize: '0.8rem', color: 'var(--accent)', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
              <span>{isMounted ? profile.name : 'Фінансовий Лідер'}</span>
              {(subscription.tier === 'delux' || subscription.tier === 'super_premium') && (
                <span className="delux-nick-badge" style={{ fontSize: '0.6rem', padding: '0.1rem 0.35rem' }}>
                  {subscription.tier === 'super_premium' ? '💎 Delux' : '👑 Delux'}
                </span>
              )}
            </span>
          </button>

          {/* Language Switchers in Drawer */}
          <div style={{ padding: '0.5rem 1rem', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)', margin: '0.5rem 0' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)', display: 'block', marginBottom: '0.4rem' }}>
              Мова та валюта:
            </span>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.4rem' }}>
              {(['uk', 'en', 'pl', 'ru', 'sv', 'ro'] as Language[]).map(l => (
                <button
                  key={l}
                  type="button"
                  onClick={() => setLanguage(l)}
                  style={{
                    background: language === l ? 'var(--accent)' : 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid var(--border-color)',
                    color: '#fff',
                    padding: '0.35rem 0.2rem',
                    borderRadius: '6px',
                    fontSize: '0.8rem',
                    cursor: 'pointer',
                    textAlign: 'center'
                  }}
                >
                  {LANGUAGES[l].flag} {LANGUAGES[l].symbol}
                </button>
              ))}
            </div>
          </div>

          <button
            className="drawer-link"
            onClick={() => {
              toggleTheme();
              setIsDrawerOpen(false);
            }}
          >
            <span className="drawer-link-icon">{theme === 'light' ? '🌙' : '☀️'}</span>
            <span>{theme === 'light' ? 'Перемкнути на Темний інтерфейс' : 'Перемкнути на Світлий необанк'}</span>
          </button>

          <button
            className="drawer-link"
            onClick={() => {
              toggleIconVariant();
              setIsDrawerOpen(false);
            }}
          >
            <span className="drawer-link-icon">🎨</span>
            <span>Перемкнути на Іконку {nextVariant}</span>
          </button>

          <button
            className="drawer-link"
            onClick={() => {
              setIsDrawerOpen(false);
              if (confirm('Скинути всі дані та підписку до початкового стану?')) {
                resetData();
              }
            }}
          >
            <span className="drawer-link-icon">🔄</span>
            <span>Скинути дані</span>
          </button>
        </nav>

        <div className="drawer-footer">
          <p><strong>TrackMyFinance (Next.js)</strong> v2.2</p>
          <p>Всі права захищено © 2026</p>
        </div>
      </aside>
    </>
  );
};
