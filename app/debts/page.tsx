'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useFinance } from '@/context/FinanceContext';
import { Header } from '@/components/Header';
import { SideDrawer } from '@/components/SideDrawer';
import { AddDebtModal } from '@/components/AddDebtModal';
import { RepayDebtModal } from '@/components/RepayDebtModal';
import { SubscriptionModal } from '@/components/SubscriptionModal';
import { CheckoutModal } from '@/components/CheckoutModal';
import { ProfileModal } from '@/components/ProfileModal';
import { WelcomeAuthModal } from '@/components/WelcomeAuthModal';
import { GoogleChooserModal } from '@/components/GoogleChooserModal';
import { DebtItem } from '@/types';

export default function DebtsPage() {
  const {
    debts,
    deleteDebt,
    clearAllDebts,
    setIsDebtModalOpen,
    currency,
    t
  } = useFinance();

  const [activeFilter, setActiveFilter] = useState<'all' | 'they_owe_me' | 'i_owe' | 'open' | 'closed'>('all');
  const [selectedDebtForRepay, setSelectedDebtForRepay] = useState<DebtItem | null>(null);

  const todayStr = new Date().toISOString().split('T')[0];
  const todayMs = new Date(todayStr).getTime();

  // Обчислення статистики
  const activeDebts = debts.filter(d => !d.isClosed);

  const theyOweMeSum = activeDebts
    .filter(d => d.type === 'they_owe_me')
    .reduce((sum, d) => sum + (d.amount - d.paidAmount), 0);

  const iOweSum = activeDebts
    .filter(d => d.type === 'i_owe')
    .reduce((sum, d) => sum + (d.amount - d.paidAmount), 0);

  const netBalance = theyOweMeSum - iOweSum;

  // Фільтрація
  const filteredList = debts.filter(item => {
    if (activeFilter === 'they_owe_me') return item.type === 'they_owe_me';
    if (activeFilter === 'i_owe') return item.type === 'i_owe';
    if (activeFilter === 'open') return !item.isClosed;
    if (activeFilter === 'closed') return item.isClosed;
    return true;
  });

  const getDueBadge = (dueDateStr?: string, isClosed?: boolean) => {
    if (isClosed) {
      return <span className="status-badge paid">✅ Борг закрито</span>;
    }
    if (!dueDateStr) {
      return <span className="status-badge normal">⏳ Без фіксованого терміну</span>;
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
      return <span className="status-badge today">🟡 Дедлайн повернення сьогодні!</span>;
    } else if (diffDays <= 3) {
      return (
        <span className="status-badge soon">
          ⚠️ Повернення через {diffDays} дн.
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
        {/* Банер 4-ї сторінки */}
        <div className="action-banner" style={{ marginBottom: '1.8rem' }}>
          <div className="action-banner-text">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.4rem' }}>
              <span style={{ fontSize: '1.8rem' }}>🤝</span>
              <h2 style={{ margin: 0, fontSize: '1.6rem', fontWeight: 800 }}>
                {t.debtsTitle}
              </h2>
            </div>
            <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.95rem' }}>
              {t.debtsDesc}
            </p>
          </div>
          <div className="banner-buttons">
            <button
              className="btn-primary"
              onClick={() => setIsDebtModalOpen(true)}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
            >
              <span>➕</span> <span>{t.btnAddDebt}</span>
            </button>
            <Link href="/utilities" className="btn-secondary" style={{ textDecoration: 'none' }}>
              <span>💡</span> <span>{t.navUtilities}</span>
            </Link>
            <Link href="/planned" className="btn-secondary" style={{ textDecoration: 'none' }}>
              <span>📅</span> <span>{t.navPlanned}</span>
            </Link>
            <Link href="/" className="btn-secondary" style={{ textDecoration: 'none' }}>
              <span>🏠</span> <span>{t.navHome}</span>
            </Link>
          </div>
        </div>

        {/* 3 Статистичні картки боргів */}
        <div className="stats-grid" style={{ marginBottom: '2rem' }}>
          <div className="stat-card">
            <div className="stat-header">
              <span className="stat-title">{t.debtsTheyOweMe}</span>
              <span className="stat-icon icon-income">📈</span>
            </div>
            <div className="stat-value income">
              +{theyOweMeSum.toLocaleString(currency.locale)} {currency.symbol}
            </div>
            <div className="stat-sub">
              Кошти, які мають повернути вам
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-header">
              <span className="stat-title">{t.debtsIOwe}</span>
              <span className="stat-icon icon-expense">📉</span>
            </div>
            <div className="stat-value expense">
              -{iOweSum.toLocaleString(currency.locale)} {currency.symbol}
            </div>
            <div className="stat-sub">
              Кошти, які маєте повернути ви
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-header">
              <span className="stat-title">{t.debtsNetBalance}</span>
              <span className="stat-icon" style={{ background: 'rgba(99, 102, 241, 0.15)', color: '#818cf8' }}>⚖️</span>
            </div>
            <div
              className="stat-value"
              style={{ color: netBalance >= 0 ? '#10b981' : '#f87171' }}
            >
              {netBalance >= 0 ? '+' : ''}{netBalance.toLocaleString(currency.locale)} {currency.symbol}
            </div>
            <div className="stat-sub">
              {netBalance >= 0 ? 'Ви у плюсі по взаєморозрахунках' : 'Сума ваших боргових зобовʼязань більша'}
            </div>
          </div>
        </div>

        {/* Картка списку боргів */}
        <div className="card">
          <div className="card-header" style={{ flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}>
            <div>
              <h3 className="card-title">Журнал боргів та позик</h3>
              <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                Фіксуйте часткові та повні погашення, відстежуйте дедлайни та тримайте фінанси під контролем.
              </p>
            </div>

            {/* Фільтрація */}
            <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'center', flexWrap: 'wrap' }}>
              <div className="filter-tabs">
                <button
                  className={`filter-btn ${activeFilter === 'all' ? 'active' : ''}`}
                  onClick={() => setActiveFilter('all')}
                >
                  Всі ({debts.length})
                </button>
                <button
                  className={`filter-btn ${activeFilter === 'open' ? 'active' : ''}`}
                  onClick={() => setActiveFilter('open')}
                >
                  Відкриті ({activeDebts.length})
                </button>
                <button
                  className={`filter-btn ${activeFilter === 'they_owe_me' ? 'active' : ''}`}
                  onClick={() => setActiveFilter('they_owe_me')}
                >
                  🟢 Мені винні
                </button>
                <button
                  className={`filter-btn ${activeFilter === 'i_owe' ? 'active' : ''}`}
                  onClick={() => setActiveFilter('i_owe')}
                >
                  🔴 Я винен
                </button>
                <button
                  className={`filter-btn ${activeFilter === 'closed' ? 'active' : ''}`}
                  onClick={() => setActiveFilter('closed')}
                >
                  Закриті
                </button>
              </div>

              {debts.length > 0 && (
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
                  title={t.confirmClearDebts}
                  onClick={() => {
                    if (confirm(t.confirmClearDebts)) {
                      clearAllDebts();
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
              <div style={{ fontSize: '3rem', marginBottom: '0.8rem' }}>🤝</div>
              <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1.2rem' }}>
                Немає боргових записів
              </h4>
              <p style={{ color: 'var(--text-muted)', marginBottom: '1.2rem', maxWidth: '420px', margin: '0 auto 1.2rem' }}>
                Зафіксуйте свій перший борг чи позику, щоб не тримати цифри в голові та не забувати про взаєморозрахунки!
              </p>
              <button
                className="btn-primary"
                onClick={() => setIsDebtModalOpen(true)}
              >
                <span>➕</span> {t.btnAddDebt}
              </button>
            </div>
          ) : (
            <div className="planned-list" style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem', marginTop: '1rem' }}>
              {filteredList.map((item) => {
                const isTheyOweMe = item.type === 'they_owe_me';
                const remaining = Math.max(0, item.amount - item.paidAmount);
                const percent = Math.min(100, Math.round((item.paidAmount / item.amount) * 100));

                return (
                  <div
                    key={item.id}
                    className={`planned-item-card ${item.isClosed ? 'is-paid' : ''}`}
                    style={{
                      borderLeft: `4px solid ${isTheyOweMe ? '#10b981' : '#ef4444'}`
                    }}
                  >
                    <div className="planned-item-main">
                      <div className="planned-item-info">
                        <div className="planned-item-header-row" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
                          <span
                            className="planned-category-pill"
                            style={{
                              background: isTheyOweMe ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                              color: isTheyOweMe ? '#10b981' : '#f87171',
                              fontWeight: 700
                            }}
                          >
                            {isTheyOweMe ? '🟢 Мені винні' : '🔴 Я винен'}
                          </span>
                          {getDueBadge(item.dueDate, item.isClosed)}
                        </div>

                        <h4 className="planned-item-title" style={{ marginTop: '0.35rem', marginBottom: '0.3rem', fontSize: '1.2rem' }}>
                          {item.person}
                        </h4>

                        {/* Прогрес погашення боргу */}
                        <div style={{ maxWidth: '380px', margin: '0.45rem 0' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-dim)', marginBottom: '0.25rem' }}>
                            <span>Виплачено: <strong>{item.paidAmount.toLocaleString(currency.locale)} {currency.symbol}</strong> ({percent}%)</span>
                            <span>Всього: {item.amount.toLocaleString(currency.locale)} {currency.symbol}</span>
                          </div>
                          <div
                            style={{
                              height: '7px',
                              background: 'rgba(255, 255, 255, 0.08)',
                              borderRadius: '999px',
                              overflow: 'hidden'
                            }}
                          >
                            <div
                              style={{
                                width: `${percent}%`,
                                height: '100%',
                                background: isTheyOweMe
                                  ? 'linear-gradient(90deg, #10b981, #34d399)'
                                  : 'linear-gradient(90deg, #ef4444, #f87171)',
                                transition: 'width 0.3s ease'
                              }}
                            />
                          </div>
                        </div>

                        {item.note && (
                          <p className="planned-item-note" style={{ margin: '0.35rem 0 0 0' }}>
                            📝 {item.note}
                          </p>
                        )}

                        <div className="planned-item-meta" style={{ marginTop: '0.4rem' }}>
                          <span>📅 Створено: {new Date(item.createdAt).toLocaleDateString()}</span>
                          {item.dueDate && !item.isClosed && (
                            <span style={{ marginLeft: '0.6rem' }}>
                              • Дедлайн повернення: <strong>{item.dueDate}</strong>
                            </span>
                          )}
                          {item.closedAt && (
                            <span style={{ color: '#10b981', marginLeft: '0.6rem' }}>
                              • Повністю закрито {new Date(item.closedAt).toLocaleDateString()}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="planned-item-actions" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.65rem' }}>
                        <div>
                          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textAlign: 'right' }}>
                            {item.isClosed ? 'Борг закрито' : 'Залишок до сплати:'}
                          </div>
                          <div
                            className="planned-item-amount"
                            style={{
                              fontSize: '1.5rem',
                              fontWeight: 800,
                              color: item.isClosed
                                ? 'var(--text-muted)'
                                : isTheyOweMe ? '#10b981' : '#f87171'
                            }}
                          >
                            {remaining.toLocaleString(currency.locale)} {currency.symbol}
                          </div>
                        </div>

                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                          {!item.isClosed && (
                            <button
                              type="button"
                              className="btn-pay-now"
                              onClick={() => setSelectedDebtForRepay(item)}
                              title="Внести платіж (частково або повністю)"
                              style={{
                                padding: '0.45rem 0.9rem',
                                fontSize: '0.85rem',
                                borderRadius: 'var(--radius-sm)',
                                fontWeight: 600,
                                cursor: 'pointer',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '0.35rem',
                                background: isTheyOweMe
                                  ? 'linear-gradient(135deg, #10b981, #059669)'
                                  : 'linear-gradient(135deg, #6366f1, #4f46e5)',
                                color: '#fff',
                                border: 'none'
                              }}
                            >
                              <span>💳</span>
                              <span>{isTheyOweMe ? 'Отримати платіж' : 'Погасити'}</span>
                            </button>
                          )}

                          <button
                            type="button"
                            className="btn-danger-outline"
                            onClick={() => {
                              if (confirm(`Видалити запис боргу для «${item.person}»?`)) {
                                deleteDebt(item.id);
                              }
                            }}
                            title="Видалити запис"
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
      <AddDebtModal />
      <RepayDebtModal
        debt={selectedDebtForRepay}
        isOpen={Boolean(selectedDebtForRepay)}
        onClose={() => setSelectedDebtForRepay(null)}
      />
      <SubscriptionModal />
      <CheckoutModal />
      <ProfileModal />
      <WelcomeAuthModal />
      <GoogleChooserModal />
    </>
  );
}
