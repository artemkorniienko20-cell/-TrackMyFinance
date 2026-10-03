'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useFinance } from '@/context/FinanceContext';
import { Header } from '@/components/Header';
import { SideDrawer } from '@/components/SideDrawer';
import { AddPlannedModal } from '@/components/AddPlannedModal';
import { SubscriptionModal } from '@/components/SubscriptionModal';
import { CheckoutModal } from '@/components/CheckoutModal';
import { ProfileModal } from '@/components/ProfileModal';
import { WelcomeAuthModal } from '@/components/WelcomeAuthModal';
import { GoogleChooserModal } from '@/components/GoogleChooserModal';

export default function PlannedPaymentsPage() {
  const {
    plannedPayments,
    togglePaidPlannedPayment,
    deletePlannedPayment,
    clearAllPlannedPayments,
    setIsPlannedModalOpen,
    currency,
    t
  } = useFinance();

  const [activeFilter, setActiveFilter] = useState<'all' | 'pending' | 'paid' | 'urgent'>('all');

  const todayStr = new Date().toISOString().split('T')[0];
  const todayMs = new Date(todayStr).getTime();

  // Обчислення статистики
  const pendingPayments = plannedPayments.filter(p => !p.isPaid);
  const paidPayments = plannedPayments.filter(p => p.isPaid);

  const pendingSum = pendingPayments.reduce((sum, p) => sum + p.amount, 0);
  const paidSum = paidPayments.reduce((sum, p) => sum + p.amount, 0);

  // Термінові: не сплачені, де дедлайн <= 3 дні від сьогодні
  const urgentPayments = pendingPayments.filter(p => {
    const dueMs = new Date(p.dueDate).getTime();
    const diffDays = Math.ceil((dueMs - todayMs) / (1000 * 60 * 60 * 24));
    return diffDays <= 3;
  });

  // Фільтрація списку
  const filteredList = plannedPayments.filter(item => {
    if (activeFilter === 'pending') return !item.isPaid;
    if (activeFilter === 'paid') return item.isPaid;
    if (activeFilter === 'urgent') {
      if (item.isPaid) return false;
      const dueMs = new Date(item.dueDate).getTime();
      const diffDays = Math.ceil((dueMs - todayMs) / (1000 * 60 * 60 * 24));
      return diffDays <= 3;
    }
    return true;
  });

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
          ⏳ Через {diffDays} дн.
        </span>
      );
    }
  };

  return (
    <>
      <Header />
      <SideDrawer />

      <main className="main-content">
        {/* Заголовок другої сторінки */}
        <div className="action-banner" style={{ marginBottom: '1.8rem' }}>
          <div className="action-banner-text">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.4rem' }}>
              <span style={{ fontSize: '1.8rem' }}>📅</span>
              <h2 style={{ margin: 0, fontSize: '1.6rem', fontWeight: 800 }}>
                {t.plannedTitle}
              </h2>
            </div>
            <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.95rem' }}>
              {t.plannedDesc}
            </p>
          </div>
          <div className="banner-buttons">
            <button
              className="btn-primary"
              onClick={() => setIsPlannedModalOpen(true)}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
            >
              <span>➕</span> <span>{t.btnAddPlanned}</span>
            </button>
            <Link href="/utilities" className="btn-secondary" style={{ textDecoration: 'none' }}>
              <span>💡</span> <span>{t.navUtilities}</span>
            </Link>
            <Link href="/debts" className="btn-secondary" style={{ textDecoration: 'none' }}>
              <span>🤝</span> <span>{t.navDebts}</span>
            </Link>
            <Link href="/" className="btn-secondary" style={{ textDecoration: 'none' }}>
              <span>🏠</span> <span>{t.navHome}</span>
            </Link>
          </div>
        </div>

        {/* 3 Статистичні картки */}
        <div className="stats-grid" style={{ marginBottom: '2rem' }}>
          <div className="stat-card">
            <div className="stat-header">
              <span className="stat-title">{t.pendingTotal}</span>
              <span className="stat-icon icon-expense">⏳</span>
            </div>
            <div className="stat-value expense">
              {pendingSum.toLocaleString(currency.locale)} {currency.symbol}
            </div>
            <div className="stat-sub">
              {pendingPayments.length} платежів очікують на оплату
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-header">
              <span className="stat-title">{t.paidTotal}</span>
              <span className="stat-icon icon-income">✅</span>
            </div>
            <div className="stat-value income">
              {paidSum.toLocaleString(currency.locale)} {currency.symbol}
            </div>
            <div className="stat-sub">
              {paidPayments.length} рахунків успішно закрито
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-header">
              <span className="stat-title">{t.urgentDue}</span>
              <span className="stat-icon" style={{ background: 'rgba(239, 68, 68, 0.15)', color: '#ef4444' }}>⚠️</span>
            </div>
            <div className="stat-value" style={{ color: urgentPayments.length > 0 ? '#ef4444' : 'var(--text-main)' }}>
              {urgentPayments.length}
            </div>
            <div className="stat-sub">
              {urgentPayments.length > 0 ? 'Потребують термінової уваги!' : 'Термінових рахунків немає'}
            </div>
          </div>
        </div>

        {/* Секція списку платежів на потім */}
        <div className="card">
          <div className="card-header" style={{ flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <h3 className="card-title">Список планованих платежів</h3>
              <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                Натискайте «Сплатити зараз», щоб позначити платіж та автоматично додати його у витрати балансу.
              </p>
            </div>

            {/* Фільтри та керування */}
            <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'center', flexWrap: 'wrap' }}>
              <div className="filter-tabs">
                <button
                  className={`filter-btn ${activeFilter === 'all' ? 'active' : ''}`}
                  onClick={() => setActiveFilter('all')}
                >
                  Всі ({plannedPayments.length})
                </button>
                <button
                  className={`filter-btn ${activeFilter === 'pending' ? 'active' : ''}`}
                  onClick={() => setActiveFilter('pending')}
                >
                  Очікують ({pendingPayments.length})
                </button>
                <button
                  className={`filter-btn ${activeFilter === 'urgent' ? 'active' : ''}`}
                  onClick={() => setActiveFilter('urgent')}
                >
                  Термінові ({urgentPayments.length})
                </button>
                <button
                  className={`filter-btn ${activeFilter === 'paid' ? 'active' : ''}`}
                  onClick={() => setActiveFilter('paid')}
                >
                  Сплачені ({paidPayments.length})
                </button>
              </div>

              {plannedPayments.length > 0 && (
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
                  title="Очистити всі плановані платежі"
                  onClick={() => {
                    if (confirm('Видалити всі плановані платежі зі списку?')) {
                      clearAllPlannedPayments();
                    }
                  }}
                >
                  <span>🗑️</span> <span>Очистити все</span>
                </button>
              )}
            </div>
          </div>

          {filteredList.length === 0 ? (
            <div className="empty-state" style={{ padding: '3rem 1rem', textAlign: 'center' }}>
              <div style={{ fontSize: '3rem', marginBottom: '0.8rem' }}>🎉</div>
              <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1.2rem' }}>
                Немає платежів у цій категорії
              </h4>
              <p style={{ color: 'var(--text-muted)', marginBottom: '1.2rem' }}>
                Додайте свій перший платіж на потім, щоб не забути про важливий рахунок!
              </p>
              <button
                className="btn-primary"
                onClick={() => setIsPlannedModalOpen(true)}
              >
                <span>➕</span> {t.btnAddPlanned}
              </button>
            </div>
          ) : (
            <div className="planned-list" style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem', marginTop: '1rem' }}>
              {filteredList.map((item) => (
                <div
                  key={item.id}
                  className={`planned-item-card ${item.isPaid ? 'is-paid' : ''}`}
                >
                  <div className="planned-item-main">
                    <div className="planned-item-info">
                      <div className="planned-item-header-row">
                        <span className="planned-category-pill">{item.category}</span>
                        {getDueBadge(item.dueDate, item.isPaid)}
                      </div>
                      <h4 className="planned-item-title">{item.title}</h4>
                      {item.note && (
                        <p className="planned-item-note">📝 {item.note}</p>
                      )}
                      <div className="planned-item-meta">
                        <span>📅 Дедлайн: <strong>{item.dueDate}</strong></span>
                        {item.paidAt && (
                          <span style={{ color: '#10b981' }}>
                            • Сплачено {new Date(item.paidAt).toLocaleDateString()}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="planned-item-pricing">
                      <div className="planned-item-amount">
                        {item.amount.toLocaleString(currency.locale)} {currency.symbol}
                      </div>

                      <div className="planned-item-actions">
                        {!item.isPaid ? (
                          <button
                            type="button"
                            className="btn-pay-now"
                            onClick={() => togglePaidPlannedPayment(item.id, true)}
                            title="Позначити сплаченим та внести у витрати балансу"
                          >
                            <span>✓</span> Сплатити зараз
                          </button>
                        ) : (
                          <button
                            type="button"
                            className="btn-revert"
                            onClick={() => togglePaidPlannedPayment(item.id, false)}
                            title="Повернути в очікування"
                          >
                            <span>↩️</span> Повернути
                          </button>
                        )}

                        <button
                          type="button"
                          className="btn-delete-planned"
                          onClick={() => deletePlannedPayment(item.id)}
                          title="Видалити цей платіж"
                        >
                          🗑️
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Модальні вікна */}
      <AddPlannedModal />
      <SubscriptionModal />
      <CheckoutModal />
      <ProfileModal />
      <WelcomeAuthModal />
      <GoogleChooserModal />
    </>
  );
}
