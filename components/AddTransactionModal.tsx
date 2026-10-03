'use client';

import React, { useState, useEffect } from 'react';
import { useFinance } from '@/context/FinanceContext';
import { TransactionType } from '@/types';

export const AddTransactionModal: React.FC = () => {
  const { isTxModalOpen, setIsTxModalOpen, addTransaction, showToast, currency } = useFinance();

  const [type, setType] = useState<TransactionType>('expense');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Продукти');
  const [note, setNote] = useState('');
  const [date, setDate] = useState('');

  // Закриття по клавіші Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isTxModalOpen) {
        setIsTxModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isTxModalOpen, setIsTxModalOpen]);

  useEffect(() => {
    if (isTxModalOpen) {
      setDate(new Date().toISOString().split('T')[0]);
      setAmount('');
      setNote('');
    }
  }, [isTxModalOpen]);

  if (!isTxModalOpen) return null;

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    const cleanAmount = amount.trim().replace(',', '.');
    const numAmount = parseFloat(cleanAmount);

    if (isNaN(numAmount) || numAmount <= 0) {
      showToast('⚠️ Введіть дійсну суму більше 0 (наприклад, 250 або 250.50)!');
      return;
    }

    addTransaction({
      type,
      amount: numAmount,
      category,
      note: note.trim() || category,
      date: date || new Date().toISOString().split('T')[0]
    });

    // Обов'язково закриваємо вікно операції
    setIsTxModalOpen(false);
    setAmount('');
    setNote('');
  };

  return (
    <div
      className="modal-overlay active"
      onClick={(e) => {
        if (e.target === e.currentTarget) setIsTxModalOpen(false);
      }}
    >
      <div className="modal-box" style={{ maxWidth: '460px' }}>
        <div className="modal-header">
          <h3 className="modal-title">
            <span>➕</span> Нова операція
          </h3>
          <button
            type="button"
            className="modal-close"
            onClick={() => setIsTxModalOpen(false)}
            title="Закрити вікно"
          >
            &times;
          </button>
        </div>

        <div className="modal-body">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="txType">Тип операції</label>
              <select
                id="txType"
                className="form-input"
                value={type}
                onChange={(e) => setType(e.target.value as TransactionType)}
              >
                <option value="expense">Витрата (-)</option>
                <option value="income">Дохід (+)</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="txAmount">Сума ({currency.symbol})</label>
              <input
                type="text"
                id="txAmount"
                className="form-input"
                placeholder="наприклад, 450 або 450,50"
                inputMode="decimal"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                autoFocus
              />
            </div>

            <div className="form-group">
              <label htmlFor="txCategory">Категорія</label>
              <select
                id="txCategory"
                className="form-input"
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
            </div>

            <div className="form-group">
              <label htmlFor="txNote">Коментар або опис</label>
              <input
                type="text"
                id="txNote"
                className="form-input"
                placeholder="наприклад, Супермаркет або Таксі"
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="txDate">Дата</label>
              <input
                type="date"
                id="txDate"
                className="form-input"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.25rem' }}>
              <button
                type="submit"
                className="btn-primary"
                style={{ flex: 1, justifyContent: 'center' }}
              >
                <span>➕</span> <span>Додати операцію</span>
              </button>
              <button
                type="button"
                className="btn-secondary"
                onClick={() => setIsTxModalOpen(false)}
                style={{ padding: '0 1.25rem' }}
              >
                Скасувати
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
