'use client';

import React, { useState, useEffect } from 'react';
import { useFinance } from '@/context/FinanceContext';
import { DebtItem } from '@/types';

interface RepayDebtModalProps {
  debt: DebtItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export const RepayDebtModal: React.FC<RepayDebtModalProps> = ({ debt, isOpen, onClose }) => {
  const { repayDebt, currency, showToast } = useFinance();
  const [amount, setAmount] = useState('');
  const [applyToBalance, setApplyToBalance] = useState(true);

  const remaining = debt ? Math.max(0, debt.amount - debt.paidAmount) : 0;

  useEffect(() => {
    if (isOpen && debt) {
      setAmount(String(remaining));
      setApplyToBalance(true);
    }
  }, [isOpen, debt, remaining]);

  if (!isOpen || !debt) return null;

  const isTheyOweMe = debt.type === 'they_owe_me';

  const handleFullPay = () => {
    setAmount(String(remaining));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const cleanAmount = amount.trim().replace(',', '.');
    const numAmount = parseFloat(cleanAmount);
    if (isNaN(numAmount) || numAmount <= 0) {
      showToast('⚠️ Введіть дійсну суму платежу більше 0!');
      return;
    }

    if (numAmount > remaining) {
      showToast(`⚠️ Сума платежу не може перевищувати залишок боргу (${remaining.toLocaleString(currency.locale)} ${currency.symbol})!`);
      return;
    }

    repayDebt(debt.id, numAmount, applyToBalance);
    onClose();
  };

  return (
    <div
      className="modal-overlay active"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="modal-box" style={{ maxWidth: '440px' }}>
        <div className="modal-header">
          <h3 className="modal-title">
            <span>💳</span> {isTheyOweMe ? 'Отримання повернення боргу' : 'Погашення свого боргу'}
          </h3>
          <button type="button" className="modal-close" onClick={onClose}>
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <div
            style={{
              background: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-sm)',
              padding: '0.9rem',
              marginBottom: '1rem'
            }}
          >
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              {isTheyOweMe ? 'Боржник:' : 'Кредитор:'}
            </div>
            <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#fff', margin: '0.2rem 0' }}>
              {debt.person}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', color: 'var(--text-dim)', marginTop: '0.4rem' }}>
              <span>Загальна сума: {debt.amount.toLocaleString(currency.locale)} {currency.symbol}</span>
              <span style={{ color: isTheyOweMe ? '#10b981' : '#f87171', fontWeight: 700 }}>
                Залишок: {remaining.toLocaleString(currency.locale)} {currency.symbol}
              </span>
            </div>
          </div>

          <div className="form-group">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.3rem' }}>
              <label htmlFor="repayAmount" style={{ margin: 0 }}>
                Сума платежу ({currency.symbol}) *
              </label>
              <button
                type="button"
                onClick={handleFullPay}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#93c5fd',
                  fontSize: '0.78rem',
                  cursor: 'pointer',
                  textDecoration: 'underline'
                }}
              >
                Повний залишок ({remaining} {currency.symbol})
              </button>
            </div>
            <input
              type="number"
              step="any"
              id="repayAmount"
              className="form-input"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>

          <div style={{ marginBottom: '1.2rem' }}>
            <label
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.6rem',
                cursor: 'pointer',
                margin: 0,
                fontSize: '0.85rem',
                color: 'var(--text-main)'
              }}
            >
              <input
                type="checkbox"
                checked={applyToBalance}
                onChange={(e) => setApplyToBalance(e.target.checked)}
                style={{ width: '17px', height: '17px', cursor: 'pointer' }}
              />
              <span>
                {isTheyOweMe
                  ? '💰 Додати отримані кошти як дохід до загального балансу'
                  : '📉 Списати сплачені кошти як витрату з балансу'}
              </span>
            </label>
          </div>

          <div className="modal-actions">
            <button type="button" className="btn-secondary" onClick={onClose}>
              Скасувати
            </button>
            <button
              type="submit"
              className="btn-primary"
              style={{
                background: isTheyOweMe ? 'linear-gradient(135deg, #10b981, #059669)' : undefined
              }}
            >
              <span>{isTheyOweMe ? '📥 Отримати платіж' : '📤 Внести платіж'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
