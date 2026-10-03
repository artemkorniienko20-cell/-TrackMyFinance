'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useFinance } from '@/context/FinanceContext';
import { Header } from '@/components/Header';
import { SideDrawer } from '@/components/SideDrawer';
import { AddUtilityModal } from '@/components/AddUtilityModal';
import { SubscriptionModal } from '@/components/SubscriptionModal';
import { CheckoutModal } from '@/components/CheckoutModal';
import { ProfileModal } from '@/components/ProfileModal';
import { WelcomeAuthModal } from '@/components/WelcomeAuthModal';
import { GoogleChooserModal } from '@/components/GoogleChooserModal';
import { UTILITY_CATEGORIES, getUtilityCategoryName } from '@/constants/utilities';

export default function UtilitiesPage() {
  const {
    utilityBills,
    togglePaidUtilityBill,
    deleteUtilityBill,
    clearAllUtilityBills,
    setIsUtilityModalOpen,
    currency,
    language,
    t
  } = useFinance();

  const [activeFilter, setActiveFilter] = useState<'all' | 'pending' | 'paid'>('all');
  const [selectedPeriod, setSelectedPeriod] = useState<string>('all');

  const todayStr = new Date().toISOString().split('T')[0];
  const todayMs = new Date(todayStr).getTime();

  // Усі унікальні періоди з наявних рахунків
  const availablePeriods = Array.from(new Set(utilityBills.map(b => b.period))).sort().reverse();

  // Фільтрація списку
  const filteredList = utilityBills.filter(item => {
    if (selectedPeriod !== 'all' && item.period !== selectedPeriod) return false;
    if (activeFilter === 'pending') return !item.isPaid;
    if (activeFilter === 'paid') return item.isPaid;
    return true;
  });

  // Обчислення статистики
  const periodBills = selectedPeriod === 'all'
    ? utilityBills
    : utilityBills.filter(b => b.period === selectedPeriod);

  const pendingBills = periodBills.filter(b => !b.isPaid);
  const paidBills = periodBills.filter(b => b.isPaid);

  const pendingSum = pendingBills.reduce((sum, b) => sum + b.amount, 0);
  const paidSum = paidBills.reduce((sum, b) => sum + b.amount, 0);
  const totalSum = periodBills.reduce((sum, b) => sum + b.amount, 0);

  const getDueBadge = (dueDateStr: string, isPaid: boolean) => {
    if (isPaid) {
      return <span className="status-badge paid">🟢 Сплачено</span>;
    }

    const dueMs = new Date(dueDateStr).getTime();
    const diffDays = Math.ceil((dueMs - todayMs) / (1000 * 60 * 60 * 24));

    if (diffDays < 0) {
      return (
        <span className="status-badge overdue">
          🔴 Прострочено на {Math.abs(diffDays)} дн.
        </span>
      );
    } else if (diffDays === 0) {
      return <span className="status-badge today">🟡 Дедлайн сьогодні!</span>;
    } else if (diffDays <= 3) {
      return (
        <span className="status-badge soon">
          ⚠️ Дедлайн через {diffDays} дн.
        </span>
      );
    } else {
      return (
        <span className="status-badge normal">
          ⏳ До {dueDateStr}
        </span>
      );
    }
  };

  return (
    <>
      <Header />
      <SideDrawer />

      <main className="main-content">
        {/* Банер 3-ї сторінки */}
        <div className="action-banner" style={{ marginBottom: '1.8rem' }}>
          <div className="action-banner-text">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.4rem' }}>
              <span style={{ fontSize: '1.8rem' }}>💡</span>
              <h2 style={{ margin: 0, fontSize: '1.6rem', fontWeight: 800 }}>
                {t.utilitiesTitle}
              </h2>
            </div>
            <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.95rem' }}>
              {t.utilitiesDesc}
            </p>
          </div>
          <div className="banner-buttons">
            <button
              className="btn-primary"
              onClick={() => setIsUtilityModalOpen(true)}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
            >
              <span>➕</span> <span>{t.btnAddUtility}</span>
            </button>
            <Link href="/planned" className="btn-secondary" style={{ textDecoration: 'none' }}>
              <span>📅</span> <span>{t.navPlanned}</span>
            </Link>
            <Link href="/debts" className="btn-secondary" style={{ textDecoration: 'none' }}>
              <span>🤝</span> <span>{t.navDebts}</span>
            </Link>
            <Link href="/" className="btn-secondary" style={{ textDecoration: 'none' }}>
              <span>🏠</span> <span>{t.navHome}</span>
            </Link>
          </div>
        </div>

        {/* 3 Статистичні картки комуналки */}
        <div className="stats-grid" style={{ marginBottom: '2rem' }}>
          <div className="stat-card">
            <div className="stat-header">
              <span className="stat-title">{t.utilityPendingTotal}</span>
              <span className="stat-icon icon-expense">⏳</span>
            </div>
            <div className="stat-value expense">
              {pendingSum.toLocaleString(currency.locale)} {currency.symbol}
            </div>
            <div className="stat-sub">
              {pendingBills.length} комунальних рахунків очікують на оплату
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-header">
              <span className="stat-title">{t.utilityPaidTotal}</span>
              <span className="stat-icon icon-income">✅</span>
            </div>
            <div className="stat-value income">
              {paidSum.toLocaleString(currency.locale)} {currency.symbol}
            </div>
            <div className="stat-sub">
              {paidBills.length} рахунків успішно закрито
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-header">
              <span className="stat-title">{t.utilityTotalSum}</span>
              <span className="stat-icon" style={{ background: 'rgba(99, 102, 241, 0.15)', color: '#818cf8' }}>📊</span>
            </div>
            <div className="stat-value" style={{ color: 'var(--text-main)' }}>
              {totalSum.toLocaleString(currency.locale)} {currency.symbol}
            </div>
            <div className="stat-sub">
              {selectedPeriod === 'all' ? 'За весь період спостереження' : `За період ${selectedPeriod}`}
            </div>
          </div>
        </div>

        {/* Картка списку комунальних рахунків */}
        <div className="card">
          <div className="card-header" style={{ flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}>
            <div>
              <h3 className="card-title">Список комунальних платежів & рахунків</h3>
              <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                Фіксуйте показники лічильників та відмічайте рахунки як сплачені з автоматичним списанням у баланс.
              </p>
            </div>

            {/* Фільтрація за періодом і статусом */}
            <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'center', flexWrap: 'wrap' }}>
              {/* Селектор періоду */}
              {availablePeriods.length > 0 && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Період:</span>
                  <select
                    className="lang-select-native"
                    value={selectedPeriod}
                    onChange={(e) => setSelectedPeriod(e.target.value)}
                    style={{ padding: '0.35rem 0.6rem', fontSize: '0.82rem', borderRadius: 'var(--radius-sm)' }}
                  >
                    <option value="all">Всі місяці</option>
                    {availablePeriods.map(p => (
                      <option key={p} value={p}>{p}</option>
                    ))}
                  </select>
                </div>
              )}

              {/* Таби фільтра */}
              <div className="filter-tabs">
                <button
                  className={`filter-btn ${activeFilter === 'all' ? 'active' : ''}`}
                  onClick={() => setActiveFilter('all')}
                >
                  Всі ({periodBills.length})
                </button>
                <button
                  className={`filter-btn ${activeFilter === 'pending' ? 'active' : ''}`}
                  onClick={() => setActiveFilter('pending')}
                >
                  До сплати ({pendingBills.length})
                </button>
                <button
                  className={`filter-btn ${activeFilter === 'paid' ? 'active' : ''}`}
                  onClick={() => setActiveFilter('paid')}
                >
                  Сплачені ({paidBills.length})
                </button>
              </div>

              {/* Кнопка очищення */}
              {utilityBills.length > 0 && (
                <button
                  type="button"
                  className="btn-secondary"
                  style={{
                    padding: '0.45rem 0.8rem',
                    fontSize: '0.82rem',
                    color: '#f87171',
                    borderColor: 'rgba(239, 68, 68, 0.3)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.35rem'
                  }}
                  title={t.confirmClearUtilities}
                  onClick={() => {
                    if (confirm(t.confirmClearUtilities)) {
                      clearAllUtilityBills();
                    }
                  }}
                >
                  <span>🗑️</span> <span>{t.clearAll}</span>
                </button>
              )}
            </div>
          </div>

          {filteredList.length === 0 ? (
            <div className="empty-state" style={{ padding: '3.5rem 1rem', textAlign: 'center' }}>
              <div style={{ fontSize: '3rem', marginBottom: '0.8rem' }}>💡</div>
              <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1.2rem' }}>
                Немає комунальних рахунків
              </h4>
              <p style={{ color: 'var(--text-muted)', marginBottom: '1.2rem', maxWidth: '420px', margin: '0 auto 1.2rem' }}>
                Додайте першу послугу (світло, воду, газ, ОСББ або інтернет), щоб контролювати комунальні витрати та лічильники в одному місці!
              </p>
              <button
                className="btn-primary"
                onClick={() => setIsUtilityModalOpen(true)}
              >
                <span>➕</span> {t.btnAddUtility}
              </button>
            </div>
          ) : (
            <div className="planned-list" style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem', marginTop: '1rem' }}>
              {filteredList.map((item) => {
                const meta = UTILITY_CATEGORIES[item.category] || UTILITY_CATEGORIES.other;
                const consumed = item.hasMeter && item.meterCurrent !== undefined && item.meterPrev !== undefined
                  ? Math.max(0, item.meterCurrent - item.meterPrev)
                  : null;

                return (
                  <div
                    key={item.id}
                    className={`planned-item-card ${item.isPaid ? 'is-paid' : ''}`}
                    style={{ borderLeft: `4px solid ${meta.color}` }}
                  >
                    <div className="planned-item-main">
                      <div className="planned-item-info">
                        <div className="planned-item-header-row" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
                          <span
                            className="planned-category-pill"
                            style={{ background: `${meta.color}20`, color: meta.color, display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}
                          >
                            <span>{meta.icon}</span> <span>{getUtilityCategoryName(meta, language)}</span>
                          </span>
                          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                            Місяць: <strong>{item.period}</strong>
                          </span>
                          {getDueBadge(item.dueDate, item.isPaid)}
                        </div>

                        <h4 className="planned-item-title" style={{ marginTop: '0.35rem', marginBottom: '0.3rem', fontSize: '1.15rem' }}>
                          {item.title}
                        </h4>

                        {item.accountNumber && (
                          <div style={{ fontSize: '0.82rem', color: 'var(--text-dim)', marginBottom: '0.35rem' }}>
                            🔢 Особовий рахунок: <code>{item.accountNumber}</code>
                          </div>
                        )}

                        {/* Показники лічильника */}
                        {item.hasMeter && (
                          <div
                            style={{
                              background: 'rgba(255, 255, 255, 0.04)',
                              border: '1px solid var(--border-color)',
                              borderRadius: '8px',
                              padding: '0.45rem 0.75rem',
                              fontSize: '0.82rem',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '0.8rem',
                              flexWrap: 'wrap',
                              margin: '0.35rem 0'
                            }}
                          >
                            <span>🎛️ Показники: <strong>{item.meterPrev}</strong> → <strong>{item.meterCurrent}</strong> {item.unit}</span>
                            {consumed !== null && (
                              <span style={{ color: meta.color, fontWeight: 700 }}>
                                📊 Спожито: {consumed} {item.unit}
                              </span>
                            )}
                            {item.tariff && (
                              <span style={{ color: 'var(--text-muted)' }}>
                                Тариф: {item.tariff} ₴/{item.unit}
                              </span>
                            )}
                          </div>
                        )}

                        {item.note && (
                          <p className="planned-item-note" style={{ margin: '0.35rem 0 0 0' }}>
                            📝 {item.note}
                          </p>
                        )}

                        <div className="planned-item-meta" style={{ marginTop: '0.4rem' }}>
                          <span>📅 Дедлайн сплати: <strong>{item.dueDate}</strong></span>
                          {item.paidAt && (
                            <span style={{ color: '#10b981', marginLeft: '0.5rem' }}>
                              • Сплачено {new Date(item.paidAt).toLocaleDateString()}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="planned-item-actions" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.65rem' }}>
                        <div
                          className="planned-item-amount"
                          style={{
                            fontSize: '1.45rem',
                            fontWeight: 800,
                            color: item.isPaid ? 'var(--text-muted)' : '#f87171'
                          }}
                        >
                          {item.amount.toLocaleString(currency.locale)} {currency.symbol}
                        </div>

                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                          <button
                            type="button"
                            className={item.isPaid ? 'btn-paid-toggle is-paid' : 'btn-pay-now'}
                            onClick={() => togglePaidUtilityBill(item.id, true)}
                            title={item.isPaid ? 'Повернути до очікування' : 'Сплатити та додати до витрат балансу'}
                            style={{
                              padding: '0.45rem 0.9rem',
                              fontSize: '0.85rem',
                              borderRadius: 'var(--radius-sm)',
                              fontWeight: 600,
                              cursor: 'pointer',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '0.35rem',
                              background: item.isPaid ? 'rgba(255, 255, 255, 0.08)' : 'linear-gradient(135deg, #10b981, #059669)',
                              color: '#fff',
                              border: item.isPaid ? '1px solid var(--border-color)' : 'none'
                            }}
                          >
                            <span>{item.isPaid ? '↩️' : '💳'}</span>
                            <span>{item.isPaid ? 'Повернути' : 'Сплатити'}</span>
                          </button>

                          <button
                            type="button"
                            className="btn-danger-outline"
                            onClick={() => {
                              if (confirm(`Видалити рахунок «${item.title}»?`)) {
                                deleteUtilityBill(item.id);
                              }
                            }}
                            title="Видалити рахунок"
                            style={{
                              background: 'rgba(239, 68, 68, 0.1)',
                              border: '1px solid rgba(239, 68, 68, 0.3)',
                              color: '#ef4444',
                              padding: '0.45rem 0.65rem',
                              borderRadius: 'var(--radius-sm)',
                              cursor: 'pointer'
                            }}
                          >
                            🗑️
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>

      {/* Усі модальні вікна */}
      <AddUtilityModal />
      <SubscriptionModal />
      <CheckoutModal />
      <ProfileModal />
      <WelcomeAuthModal />
      <GoogleChooserModal />
    </>
  );
}
