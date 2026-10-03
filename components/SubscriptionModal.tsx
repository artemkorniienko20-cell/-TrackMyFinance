'use client';

import React from 'react';
import { useFinance } from '@/context/FinanceContext';

export const SubscriptionModal: React.FC = () => {
  const {
    isSubModalOpen,
    setIsSubModalOpen,
    subscription,
    openCheckout,
    switchSubscription,
    hasPurchasedTier,
    currency
  } = useFinance();

  if (!isSubModalOpen) return null;

  return (
    <div
      className="modal-overlay active"
      onClick={(e) => {
        if (e.target === e.currentTarget) setIsSubModalOpen(false);
      }}
    >
      <div className="modal-box" style={{ maxWidth: '920px' }}>
        <div className="modal-header">
          <h3 className="modal-title">
            <span>⭐</span> Оберіть свій преміум тариф
          </h3>
          <button className="modal-close" onClick={() => setIsSubModalOpen(false)}>
            &times;
          </button>
        </div>

        <div className="modal-body">
          {/* Quick Subscription Switcher Bar */}
          <div className="sub-switcher-container" style={{ marginBottom: '1.25rem', marginTop: 0 }}>
            <div className="sub-switcher-label">
              <span>🔄</span> <span>Перемикання підписки:</span>
            </div>
            <div className="sub-switcher-pills">
              <button
                type="button"
                className={`sub-switch-btn ${subscription.tier === 'free' ? 'active' : ''}`}
                onClick={() => switchSubscription('free')}
              >
                ⚪ Базовий
              </button>
              <button
                type="button"
                className={`sub-switch-btn premium ${subscription.tier === 'premium' ? 'active' : ''} ${!hasPurchasedTier('premium') ? 'locked' : ''}`}
                onClick={() => switchSubscription('premium')}
                title={!hasPurchasedTier('premium') ? 'Підписка ще не куплена. Натисніть, щоб оформити.' : 'Перемкнутися на FinansePremium'}
              >
                {!hasPurchasedTier('premium') ? '🔒 ⭐ Premium' : '⭐ FinansePremium'}
              </button>
              <button
                type="button"
                className={`sub-switch-btn delux ${subscription.tier === 'delux' ? 'active' : ''} ${!hasPurchasedTier('delux') ? 'locked' : ''}`}
                onClick={() => switchSubscription('delux')}
                title={!hasPurchasedTier('delux') ? 'Підписка ще не куплена. Натисніть, щоб оформити.' : 'Перемкнутися на FinanseDelux'}
              >
                {!hasPurchasedTier('delux') ? '🔒 👑 Delux' : '👑 FinanseDelux'}
              </button>
              <button
                type="button"
                className={`sub-switch-btn super-premium ${subscription.tier === 'super_premium' ? 'active' : ''} ${!hasPurchasedTier('super_premium') ? 'locked' : ''}`}
                onClick={() => switchSubscription('super_premium')}
                title={!hasPurchasedTier('super_premium') ? 'Підписка ще не куплена. Натисніть, щоб оформити.' : 'Перемкнутися на FinanseSuperPremium'}
                style={{
                  background: subscription.tier === 'super_premium' ? 'linear-gradient(135deg, #00f2fe, #4facfe, #7000ff)' : undefined,
                  color: '#fff',
                  border: '1px solid rgba(255, 255, 255, 0.2)'
                }}
              >
                {!hasPurchasedTier('super_premium') ? '🔒 💎 Super' : '💎 SuperPremium'}
              </button>
            </div>
          </div>

          <p
            style={{
              color: 'var(--text-muted)',
              fontSize: '0.92rem',
              marginBottom: '1.25rem',
              textAlign: 'center'
            }}
          >
            Отримайте ексклюзивні авторські VIP-аватарки та розкішні анімовані рамки для профілю!
          </p>

          <div className="pricing-grid">
            {/* Plan 1: FinansePremium */}
            <div className={`pricing-card premium-card ${subscription.tier === 'premium' ? 'selected-card' : ''}`}>
              <div className="pricing-card-header">
                <span style={{ fontSize: '1.8rem' }}>⭐</span>
                <h3>FinansePremium</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                  Для цілеспрямованих інвесторів
                </p>
              </div>

              <div className="pricing-price">
                <span className="price-num">{currency.premiumPrice}</span>
                <span className="price-currency">{currency.symbol}</span>
                <span className="price-period">/ міс</span>
              </div>

              <ul className="pricing-features">
                <li>
                  <span className="check-icon">✓</span>
                  <span>
                    <strong>6 ексклюзивних VIP-аватарок</strong> (Золотий Лев, Кібер-Кіт тощо)
                  </span>
                </li>
                <li>
                  <span className="check-icon">✓</span>
                  <span>
                    Преміальний статус та золотий значок ⭐ <strong>FinansePremium</strong>
                  </span>
                </li>
                <li>
                  <span className="check-icon">✓</span>
                  <span>Необмежене додавання операцій</span>
                </li>
                <li>
                  <span className="check-icon">✓</span>
                  <span>Миттєва активація після оплати</span>
                </li>
              </ul>

              <div className="pricing-card-footer">
                {subscription.tier === 'premium' ? (
                  <button className="btn-current-plan" disabled>
                    ✓ Ваш активний план
                  </button>
                ) : hasPurchasedTier('premium') ? (
                  <button
                    type="button"
                    className="btn-buy-premium"
                    onClick={() => switchSubscription('premium')}
                  >
                    ⚡ Перемкнутися на Premium
                  </button>
                ) : (
                  <button
                    type="button"
                    className="btn-buy-premium"
                    onClick={() => openCheckout('premium')}
                  >
                    Купити за {currency.premiumPrice} {currency.symbol}
                  </button>
                )}
              </div>
            </div>

            {/* Plan 2: FinanseDelux */}
            <div className={`pricing-card delux-card ${subscription.tier === 'delux' ? 'selected-card' : ''}`}>
              <div className="pricing-badge-popular">Топ Вибір</div>

              <div className="pricing-card-header">
                <span style={{ fontSize: '1.8rem' }}>👑</span>
                <h3>FinanseDelux</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                  Максимальний статус та розкіш
                </p>
              </div>

              <div className="pricing-price">
                <span className="price-num">{currency.deluxPrice}</span>
                <span className="price-currency">{currency.symbol}</span>
                <span className="price-period">/ міс</span>
              </div>

              <ul className="pricing-features">
                <li>
                  <span className="check-icon">✓</span>
                  <span>
                    <strong>Всі переваги FinansePremium</strong> + 6 VIP-аватарок
                  </span>
                </li>
                <li>
                  <span className="check-icon">✓</span>
                  <span>
                    <strong>5 унікальних анімованих VIP-рамок</strong> (Золото, Неон, Діамант тощо)
                  </span>
                </li>
                <li>
                  <span className="check-icon">✓</span>
                  <span>
                    Королівський значок 👑 <strong>FinanseDelux</strong>
                  </span>
                </li>
                <li>
                  <span className="check-icon">✓</span>
                  <span>Пріоритетна підтримка 24/7</span>
                </li>
              </ul>

              <div className="pricing-card-footer">
                {subscription.tier === 'delux' ? (
                  <button className="btn-current-plan" disabled>
                    ✓ Ваш активний план
                  </button>
                ) : hasPurchasedTier('delux') ? (
                  <button
                    type="button"
                    className="btn-buy-delux"
                    onClick={() => switchSubscription('delux')}
                  >
                    ⚡ Перемкнутися на Delux
                  </button>
                ) : (
                  <button
                    type="button"
                    className="btn-buy-delux"
                    onClick={() => openCheckout('delux')}
                  >
                    Купити за {currency.deluxPrice} {currency.symbol}
                  </button>
                )}
              </div>
            </div>

            {/* Plan 3: FinanseSuperPremium */}
            <div className={`pricing-card super-premium-card ${subscription.tier === 'super_premium' ? 'selected-card' : ''}`} style={{ borderColor: 'rgba(56, 189, 248, 0.4)', background: 'linear-gradient(180deg, rgba(56, 189, 248, 0.08) 0%, rgba(139, 92, 246, 0.08) 100%)' }}>
              <div className="pricing-badge-popular" style={{ background: 'linear-gradient(135deg, #00f2fe, #4facfe, #7000ff)' }}>Ультиматум</div>

              <div className="pricing-card-header">
                <span style={{ fontSize: '1.8rem' }}>💎</span>
                <h3>FinanseSuperPremium</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                  Абсолютний статус & все включено
                </p>
              </div>

              <div className="pricing-price">
                <span className="price-num">{currency.superPremiumPrice}</span>
                <span className="price-currency">{currency.symbol}</span>
                <span className="price-period">/ міс</span>
              </div>

              <ul className="pricing-features">
                <li>
                  <span className="check-icon">✓</span>
                  <span>
                    <strong>Значок Delux</strong> у нікнеймі назавжди! 👑
                  </span>
                </li>
                <li>
                  <span className="check-icon">✓</span>
                  <span>
                    <strong>20 нових ексклюзивних аватарок</strong> (разом 29)
                  </span>
                </li>
                <li>
                  <span className="check-icon">✓</span>
                  <span>
                    <strong>20 нових VIP-рамок</strong> (разом 27 стилів)
                  </span>
                </li>
                <li>
                  <span className="check-icon">✓</span>
                  <span>
                    Всі можливості <strong>FinansePremium</strong> та <strong>FinanseDelux</strong>
                  </span>
                </li>
              </ul>

              <div className="pricing-card-footer">
                {subscription.tier === 'super_premium' ? (
                  <button className="btn-current-plan" disabled>
                    ✓ Ваш активний план
                  </button>
                ) : hasPurchasedTier('super_premium') ? (
                  <button
                    type="button"
                    className="btn-buy-delux"
                    style={{ background: 'linear-gradient(135deg, #00f2fe, #4facfe, #7000ff)' }}
                    onClick={() => switchSubscription('super_premium')}
                  >
                    ⚡ Перемкнутися на Super
                  </button>
                ) : (
                  <button
                    type="button"
                    className="btn-buy-delux"
                    style={{ background: 'linear-gradient(135deg, #00f2fe, #4facfe, #7000ff)' }}
                    onClick={() => openCheckout('super_premium')}
                  >
                    Купити за {currency.superPremiumPrice} {currency.symbol}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
