'use client';

import React from 'react';
import { useFinance } from '@/context/FinanceContext';

export const HeroStats: React.FC = () => {
  const { transactions, subscription, setIsSubModalOpen, currency, t } = useFinance();

  let income = 0;
  let expense = 0;

  transactions.forEach(t => {
    if (t.type === 'income') income += Number(t.amount);
    if (t.type === 'expense') expense += Number(t.amount);
  });

  const balance = income - expense;

  return (
    <section className="stats-grid">
      {/* Total Balance */}
      <div className="stat-card card-balance">
        <div className="stat-header">
          <span>{t.balance}</span>
          <div className="stat-icon icon-balance">💳</div>
        </div>
        <div className={`stat-value ${balance < 0 ? 'text-red' : 'text-green'}`}>
          {balance.toLocaleString(currency.locale)} {currency.symbol}
        </div>
        <div className="stat-subtext">{t.balanceSub}</div>
      </div>

      {/* Monthly Income */}
      <div className="stat-card card-income">
        <div className="stat-header">
          <span>{t.income}</span>
          <div className="stat-icon icon-income">📈</div>
        </div>
        <div className="stat-value text-green">
          +{income.toLocaleString(currency.locale)} {currency.symbol}
        </div>
        <div className="stat-subtext">{t.incomeSub}</div>
      </div>

      {/* Monthly Expense */}
      <div className="stat-card card-expense">
        <div className="stat-header">
          <span>{t.expense}</span>
          <div className="stat-icon icon-expense">📉</div>
        </div>
        <div className="stat-value text-red">
          -{expense.toLocaleString(currency.locale)} {currency.symbol}
        </div>
        <div className="stat-subtext">{t.expenseSub}</div>
      </div>

      {/* Subscription Promo Card */}
      <div
        className="stat-card card-premium-promo"
        style={{ cursor: 'pointer' }}
        onClick={() => setIsSubModalOpen(true)}
      >
        <div className="stat-header">
          <span>{t.subStatus}</span>
          <div className="stat-icon icon-vip">👑</div>
        </div>
        <div className="stat-value" style={{ fontSize: '1.55rem', color: '#fbbf24' }}>
          {subscription.tier === 'delux'
            ? 'FinanseDelux'
            : subscription.tier === 'premium'
            ? 'FinansePremium'
            : 'Базовий'}
        </div>
        <div className="stat-subtext">
          {subscription.tier === 'delux'
            ? '👑 VIP-рамки активовано →'
            : subscription.tier === 'premium'
            ? `Оновити до Delux (${currency.deluxPrice} ${currency.symbol}) →`
            : `${t.openDelux} (${currency.deluxPrice} ${currency.symbol})`}
        </div>
      </div>
    </section>
  );
};
