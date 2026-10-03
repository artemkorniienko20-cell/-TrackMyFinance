'use client';

import React from 'react';
import { useFinance } from '@/context/FinanceContext';
import { CATEGORY_COLORS, CATEGORY_ICONS } from '@/constants/categories';

export const TransactionsList: React.FC = () => {
  const {
    transactions,
    filter,
    setFilter,
    deleteTransaction,
    clearAllTransactions,
    setIsTxModalOpen,
    currency,
    t
  } = useFinance();

  let filtered = transactions;
  if (filter === 'expense') {
    filtered = transactions.filter(t => t.type === 'expense');
  } else if (filter === 'income') {
    filtered = transactions.filter(t => t.type === 'income');
  }

  const handleDelete = (id: string) => {
    if (confirm('Видалити цю транзакцію?')) {
      deleteTransaction(id);
    }
  };

  return (
    <section className="card-panel">
      <div className="panel-header">
        <h2 className="panel-title">
          <span>📝</span> {t.historyTitle}
        </h2>
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          {transactions.length > 0 && (
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
              title={t.clearAll}
              onClick={() => {
                if (confirm(t.confirmClearHistory)) {
                  clearAllTransactions();
                }
              }}
            >
              <span>🗑️</span> <span>{t.clearAll}</span>
            </button>
          )}
          <button
            className="btn-primary"
            style={{ padding: '0.45rem 0.9rem', fontSize: '0.85rem' }}
            onClick={() => setIsTxModalOpen(true)}
          >
            + Вікно
          </button>
        </div>
      </div>

      {/* Filter tabs */}
      <div className="filters-row">
        <button
          className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          {t.filterAll}
        </button>
        <button
          className={`filter-btn ${filter === 'expense' ? 'active' : ''}`}
          onClick={() => setFilter('expense')}
        >
          {t.filterExpense}
        </button>
        <button
          className={`filter-btn ${filter === 'income' ? 'active' : ''}`}
          onClick={() => setFilter('income')}
        >
          {t.filterIncome}
        </button>
      </div>

      {/* Transactions Scroll List */}
      <div className="transactions-container">
        {filtered.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">📂</div>
            <p>Не знайдено жодної транзакції у цій категорії.</p>
          </div>
        ) : (
          filtered.map(tItem => {
            const isIncome = tItem.type === 'income';
            const icon = CATEGORY_ICONS[tItem.category] || '💰';
            const color = CATEGORY_COLORS[tItem.category] || '#6366f1';
            const sign = isIncome ? '+' : '-';
            const amountClass = isIncome ? 'income' : 'expense';

            return (
              <div key={tItem.id} className="transaction-item">
                <div className="tx-left">
                  <div className="tx-icon-badge" style={{ background: `${color}20`, color }}>
                    {icon}
                  </div>
                  <div className="tx-details">
                    <h4>{tItem.note || tItem.category}</h4>
                    <div className="tx-meta">
                      <span className="tx-category-tag">{tItem.category}</span>
                      <span>•</span>
                      <span>{tItem.date}</span>
                    </div>
                  </div>
                </div>

                <div className="tx-right">
                  <div className={`tx-amount ${amountClass}`}>
                    {sign}{Number(tItem.amount).toLocaleString(currency.locale)} {currency.symbol}
                  </div>
                  <button
                    className="tx-delete-btn"
                    title="Видалити"
                    onClick={() => handleDelete(tItem.id)}
                  >
                    🗑️
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </section>
  );
};
