'use client';

import React, { useState, useEffect } from 'react';
import { useFinance } from '@/context/FinanceContext';

const PLANNED_CATEGORIES = [
  'Комуналка',
  'Житло та оренда',
  'Зв\'язок та інтернет',
  'Підписки та сервіси',
  'Кредит / Борги',
  'Навчання',
  'Страхування',
  'Інше'
];

export const AddPlannedModal: React.FC = () => {
  const {
    isPlannedModalOpen,
    setIsPlannedModalOpen,
    addPlannedPayment,
    showToast,
    currency,
    t
  } = useFinance();

  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState(PLANNED_CATEGORIES[0]);
  const [dueDate, setDueDate] = useState('');
  const [note, setNote] = useState('');

  // Закриття по Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isPlannedModalOpen) {
        setIsPlannedModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPlannedModalOpen, setIsPlannedModalOpen]);

  // Початкове значення дати (через 7 днів)
  useEffect(() => {
    if (isPlannedModalOpen) {
      const defaultDate = new Date(Date.now() + 86400000 * 7).toISOString().split('T')[0];
      setDueDate(defaultDate);
      setTitle('');
      setAmount('');
      setNote('');
      setCategory(PLANNED_CATEGORIES[0]);
    }
  }, [isPlannedModalOpen]);

  if (!isPlannedModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const cleanTitle = title.trim();
    if (!cleanTitle) {
      showToast('⚠️ Вкажіть назву платежу (наприклад, Комуналка або Оренда)!');
      return;
    }

    const cleanAmount = amount.trim().replace(',', '.');
    const numAmount = parseFloat(cleanAmount);
    if (isNaN(numAmount) || numAmount <= 0) {
      showToast('⚠️ Введіть дійсну суму платежу більше 0!');
      return;
    }

    if (!dueDate) {
      showToast('⚠️ Оберіть дату або дедлайн платежу!');
      return;
    }

    addPlannedPayment({
      title: cleanTitle,
      amount: numAmount,
      category,
      dueDate,
      note: note.trim()
    });

    setIsPlannedModalOpen(false);
  };

  return (
    <div
      className="modal-overlay active"
      onClick={(e) => {
        if (e.target === e.currentTarget) setIsPlannedModalOpen(false);
      }}
    >
      <div className="modal-box" style={{ maxWidth: '480px' }}>
        <div className="modal-header">
          <h3 className="modal-title">
            <span>📅</span> {t.btnAddPlanned}
          </h3>
          <button
            type="button"
            className="modal-close"
            onClick={() => setIsPlannedModalOpen(false)}
            title="Закрити вікно"
          >
            &times;
          </button>
        </div>

        <div className="modal-body">
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginBottom: '1.2rem' }}>
            Додайте майбутній рахунок або регулярну витрату, щоб вчасно отримати нагадування та контролювати бюджет.
          </p>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="planTitle">Назва платежу *</label>
              <input
                type="text"
                id="planTitle"
                className="form-input"
                placeholder="наприклад, Комуналка, Оренда, Інтернет"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                autoFocus
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="planAmount">Сума ({currency.symbol}) *</label>
              <input
                type="text"
                id="planAmount"
                className="form-input"
                placeholder="наприклад, 1200 або 350.50"
                inputMode="decimal"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="planDate">Дата дедлайну / оплати *</label>
              <input
                type="date"
                id="planDate"
                className="form-input"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="planCategory">Категорія</label>
              <select
                id="planCategory"
                className="form-input"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                {PLANNED_CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="planNote">Примітка або номер рахунку (необов'язково)</label>
              <input
                type="text"
                id="planNote"
                className="form-input"
                placeholder="наприклад, О/Р #12345678, до 20 числа"
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />
            </div>

            <div className="modal-actions" style={{ marginTop: '1.5rem', display: 'flex', gap: '0.8rem', justifyContent: 'flex-end' }}>
              <button
                type="button"
                className="btn-secondary"
                onClick={() => setIsPlannedModalOpen(false)}
              >
                Скасувати
              </button>
              <button type="submit" className="btn-primary">
                <span>➕</span> Додати платіж
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
