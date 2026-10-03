'use client';

import React, { useState } from 'react';
import { useFinance } from '@/context/FinanceContext';
import { TransactionType } from '@/types';

export const QuickAddCard: React.FC = () => {
  const { addTransaction, showToast, currency, t } = useFinance();
  const [type, setType] = useState<TransactionType>('expense');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Продукти');
  const [note, setNote] = useState('');

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    const cleanAmount = amount.trim().replace(',', '.');
    const numAmount = parseFloat(cleanAmount);

    if (isNaN(numAmount) || numAmount <= 0) {
      showToast('⚠️ Вкажіть коректну суму (наприклад, 250 або 250.50)!');
      return;
    }

    addTransaction({
      type,
      amount: numAmount,
      category,
      note: note.trim() || category,
      date: new Date().toISOString().split('T')[0]
    });

    setAmount('');
    setNote('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <section className="inline-add-card">
      <div className="inline-add-header">
        <div className="inline-type-toggle">
          <button
            type="button"
            className={`type-pill expense ${type === 'expense' ? 'active' : ''}`}
            onClick={() => setType('expense')}
          >
            {t.quickExpense}
          </button>
          <button
            type="button"
            className={`type-pill income ${type === 'income' ? 'active' : ''}`}
            onClick={() => setType('income')}
          >
            {t.quickIncome}
          </button>
        </div>
        <span className="inline-add-hint">{t.quickAddHint}</span>
      </div>

      <div className="inline-add-grid">
        <div className="input-with-symbol">
          <input
            type="text"
            placeholder={t.amountPlaceholder}
            inputMode="decimal"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <span className="currency-sym">{currency.symbol}</span>
        </div>

        <select
          className="inline-select"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="Продукти">🛒 Продукти</option>
          <option value="Транспорт">🚗 Транспорт</option>
          <option value="Кафе та ресторани">☕ Кафе та ресторани</option>
          <option value="Комунальні">🏠 Комунальні</option>
          <option value="Розваги">🎮 Розваги</option>
          <option value="Покупки">🛍️ Покупки</option>
          <option value="Здоровʼя">💊 Здоровʼя</option>
          <option value="Зарплата">💰 Зарплата</option>
          <option value="Фріланс">💻 Фріланс</option>
          <option value="Інше">📦 Інше</option>
        </select>

        <input
          type="text"
          placeholder={t.notePlaceholder}
          className="inline-input"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          onKeyDown={handleKeyDown}
        />

        <button
          type="button"
          className="btn-primary"
          onClick={() => handleSubmit()}
        >
          <span>➕</span> <span>{t.btnAdd}</span>
        </button>
      </div>
    </section>
  );
};
