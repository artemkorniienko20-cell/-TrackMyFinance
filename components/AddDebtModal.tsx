'use client';

import React, { useState, useEffect } from 'react';
import { useFinance } from '@/context/FinanceContext';
import { DebtType } from '@/types';

export const AddDebtModal: React.FC = () => {
  const {
    isDebtModalOpen,
    setIsDebtModalOpen,
    addDebt,
    showToast,
    currency
  } = useFinance();

  const [type, setType] = useState<DebtType>('they_owe_me');
  const [person, setPerson] = useState('');
  const [amount, setAmount] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [note, setNote] = useState('');

  // Закриття по Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isDebtModalOpen) {
        setIsDebtModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isDebtModalOpen, setIsDebtModalOpen]);

  // Скидання форми при відкритті
  useEffect(() => {
    if (isDebtModalOpen) {
      setType('they_owe_me');
      setPerson('');
      setAmount('');
      setNote('');
      // За замовчуванням дедлайн повернення через 14 днів
      const defaultDue = new Date(Date.now() + 86400000 * 14).toISOString().split('T')[0];
      setDueDate(defaultDue);
    }
  }, [isDebtModalOpen]);

  if (!isDebtModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const cleanPerson = person.trim();
    if (!cleanPerson) {
      showToast('⚠️ Вкажіть імʼя людини або назву організації/банку!');
      return;
    }

    const cleanAmount = amount.trim().replace(',', '.');
    const numAmount = parseFloat(cleanAmount);
    if (isNaN(numAmount) || numAmount <= 0) {
      showToast('⚠️ Введіть дійсну суму боргу більше 0!');
      return;
    }

    addDebt({
      type,
      person: cleanPerson,
      amount: numAmount,
      dueDate: dueDate || undefined,
      note: note.trim() || undefined
    });

    setIsDebtModalOpen(false);
  };

  return (
    <div
      className="modal-overlay active"
      onClick={(e) => {
        if (e.target === e.currentTarget) setIsDebtModalOpen(false);
      }}
    >
      <div className="modal-box" style={{ maxWidth: '480px' }}>
        <div className="modal-header">
          <h3 className="modal-title">
            <span>🤝</span> Додати борг або позику
          </h3>
          <button
            type="button"
            className="modal-close"
            onClick={() => setIsDebtModalOpen(false)}
          >
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          {/* Тип боргу: Мені винні або Я винен */}
          <div style={{ marginBottom: '1.2rem' }}>
            <label style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '0.4rem', display: 'block' }}>
              Тип боргового зобовʼязання:
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.6rem' }}>
              <button
                type="button"
                onClick={() => setType('they_owe_me')}
                style={{
                  padding: '0.75rem',
                  borderRadius: 'var(--radius-sm)',
                  border: `2px solid ${type === 'they_owe_me' ? '#10b981' : 'var(--border-color)'}`,
                  background: type === 'they_owe_me' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(255, 255, 255, 0.03)',
                  color: type === 'they_owe_me' ? '#10b981' : 'var(--text-muted)',
                  fontWeight: 700,
                  fontSize: '0.88rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.45rem',
                  transition: 'all 0.2s'
                }}
              >
                <span>🟢</span>
                <span>Мені винні</span>
              </button>

              <button
                type="button"
                onClick={() => setType('i_owe')}
                style={{
                  padding: '0.75rem',
                  borderRadius: 'var(--radius-sm)',
                  border: `2px solid ${type === 'i_owe' ? '#ef4444' : 'var(--border-color)'}`,
                  background: type === 'i_owe' ? 'rgba(239, 68, 68, 0.15)' : 'rgba(255, 255, 255, 0.03)',
                  color: type === 'i_owe' ? '#f87171' : 'var(--text-muted)',
                  fontWeight: 700,
                  fontSize: '0.88rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.45rem',
                  transition: 'all 0.2s'
                }}
              >
                <span>🔴</span>
                <span>Я винен</span>
              </button>
            </div>
          </div>

          {/* Ім'я людини або компанії */}
          <div className="form-group">
            <label htmlFor="debtPerson">
              {type === 'they_owe_me' ? 'Хто вам винен? (Імʼя / Контакт) *' : 'Кому ви винні? (Людина / Банк / Організація) *'}
            </label>
            <input
              type="text"
              id="debtPerson"
              className="form-input"
              placeholder={type === 'they_owe_me' ? 'напр. Олександр або Колега Ігор' : 'напр. Монобанк або Друг Дмитро'}
              value={person}
              onChange={(e) => setPerson(e.target.value)}
              required
            />
          </div>

          {/* Сума боргу */}
          <div className="form-group">
            <label htmlFor="debtAmount">
              Сума боргу ({currency.symbol}) *
            </label>
            <input
              type="number"
              step="any"
              id="debtAmount"
              className="form-input"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>

          {/* Термін повернення */}
          <div className="form-group">
            <label htmlFor="debtDue">Термін повернення (Дедлайн)</label>
            <input
              type="date"
              id="debtDue"
              className="form-input"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>

          {/* Примітка */}
          <div className="form-group">
            <label htmlFor="debtNote">Примітка або коментар</label>
            <input
              type="text"
              id="debtNote"
              className="form-input"
              placeholder="напр. На покупку квитків, поверне готівкою"
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </div>

          <div className="modal-actions" style={{ marginTop: '1.25rem' }}>
            <button
              type="button"
              className="btn-secondary"
              onClick={() => setIsDebtModalOpen(false)}
            >
              Скасувати
            </button>
            <button type="submit" className="btn-primary">
              <span>➕</span> <span>Зберегти борг</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
