'use client';

import React, { useState, useEffect } from 'react';
import { useFinance } from '@/context/FinanceContext';
import { UtilityCategory } from '@/types';
import { UTILITY_CATEGORIES, getUtilityCategoryName } from '@/constants/utilities';

export const AddUtilityModal: React.FC = () => {
  const {
    isUtilityModalOpen,
    setIsUtilityModalOpen,
    addUtilityBill,
    showToast,
    currency,
    language
  } = useFinance();

  const [category, setCategory] = useState<UtilityCategory>('electricity');
  const [title, setTitle] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [period, setPeriod] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [hasMeter, setHasMeter] = useState(true);
  const [meterPrev, setMeterPrev] = useState('');
  const [meterCurrent, setMeterCurrent] = useState('');
  const [unit, setUnit] = useState('кВт·год');
  const [tariff, setTariff] = useState('4.32');
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');

  // Закриття по Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isUtilityModalOpen) {
        setIsUtilityModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isUtilityModalOpen, setIsUtilityModalOpen]);

  // Ініціалізація при відкритті
  useEffect(() => {
    if (isUtilityModalOpen) {
      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, '0');
      setPeriod(`${year}-${month}`);

      // Зазвичай дедлайн комуналки 20 число
      const dueDay = 20;
      const due = new Date(year, now.getMonth(), dueDay);
      setDueDate(due.toISOString().split('T')[0]);

      selectCategory('electricity');
      setAccountNumber('');
      setNote('');
    }
  }, [isUtilityModalOpen]);

  const selectCategory = (catKey: UtilityCategory) => {
    const meta = UTILITY_CATEGORIES[catKey];
    setCategory(catKey);
    setTitle(getUtilityCategoryName(meta, language));
    setUnit(meta.defaultUnit);
    setTariff(meta.defaultTariff > 0 ? String(meta.defaultTariff) : '');
    setHasMeter(meta.hasMeterDefault);
    setMeterPrev('');
    setMeterCurrent('');
    setAmount('');
  };

  // Автоматичний розрахунок суми за лічильником
  useEffect(() => {
    if (!hasMeter) return;

    const prevNum = parseFloat(meterPrev.replace(',', '.'));
    const curNum = parseFloat(meterCurrent.replace(',', '.'));
    const tariffNum = parseFloat(tariff.replace(',', '.'));

    if (!isNaN(prevNum) && !isNaN(curNum) && !isNaN(tariffNum)) {
      const diff = curNum - prevNum;
      if (diff >= 0) {
        const calculated = Math.round(diff * tariffNum * 100) / 100;
        setAmount(String(calculated));
      }
    }
  }, [hasMeter, meterPrev, meterCurrent, tariff]);

  if (!isUtilityModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const cleanTitle = title.trim();
    if (!cleanTitle) {
      showToast('⚠️ Вкажіть назву комунальної послуги або постачальника!');
      return;
    }

    const cleanAmount = amount.trim().replace(',', '.');
    const numAmount = parseFloat(cleanAmount);
    if (isNaN(numAmount) || numAmount < 0) {
      showToast('⚠️ Введіть дійсну суму до сплати!');
      return;
    }

    if (!dueDate) {
      showToast('⚠️ Оберіть термін оплати (дедлайн)!');
      return;
    }

    const numPrev = meterPrev ? parseFloat(meterPrev.replace(',', '.')) : undefined;
    const numCur = meterCurrent ? parseFloat(meterCurrent.replace(',', '.')) : undefined;
    const numTariff = tariff ? parseFloat(tariff.replace(',', '.')) : undefined;

    if (hasMeter && numPrev !== undefined && numCur !== undefined && numCur < numPrev) {
      showToast('⚠️ Поточний показник лічильника не може бути меншим за попередній!');
      return;
    }

    addUtilityBill({
      title: cleanTitle,
      category,
      period: period || new Date().toISOString().slice(0, 7),
      accountNumber: accountNumber.trim() || undefined,
      hasMeter,
      meterPrev: hasMeter ? numPrev : undefined,
      meterCurrent: hasMeter ? numCur : undefined,
      unit: hasMeter ? unit : undefined,
      tariff: hasMeter ? numTariff : undefined,
      amount: numAmount,
      dueDate,
      note: note.trim() || undefined
    });

    setIsUtilityModalOpen(false);
  };

  const consumedDifference = (() => {
    if (!hasMeter) return null;
    const p = parseFloat(meterPrev.replace(',', '.'));
    const c = parseFloat(meterCurrent.replace(',', '.'));
    if (!isNaN(p) && !isNaN(c)) {
      return c - p;
    }
    return null;
  })();

  return (
    <div
      className="modal-overlay active"
      onClick={(e) => {
        if (e.target === e.currentTarget) setIsUtilityModalOpen(false);
      }}
    >
      <div className="modal-box" style={{ maxWidth: '540px' }}>
        <div className="modal-header">
          <h3 className="modal-title">
            <span>💡</span> Додати комунальний платіж
          </h3>
          <button
            type="button"
            className="modal-close"
            onClick={() => setIsUtilityModalOpen(false)}
          >
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          {/* Швидкі шаблони комунальних послуг */}
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.4rem', display: 'block' }}>
              ⚡ Швидкий вибір типу послуги:
            </label>
            <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
              {(Object.keys(UTILITY_CATEGORIES) as UtilityCategory[]).map((catKey) => {
                const item = UTILITY_CATEGORIES[catKey];
                const isActive = category === catKey;
                return (
                  <button
                    key={catKey}
                    type="button"
                    onClick={() => selectCategory(catKey)}
                    style={{
                      background: isActive ? `${item.color}25` : 'rgba(255, 255, 255, 0.05)',
                      border: `1px solid ${isActive ? item.color : 'var(--border-color)'}`,
                      color: isActive ? item.color : 'var(--text-muted)',
                      padding: '0.35rem 0.65rem',
                      borderRadius: 'var(--radius-sm)',
                      fontSize: '0.78rem',
                      fontWeight: isActive ? 700 : 500,
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.3rem',
                      transition: 'all 0.2s'
                    }}
                  >
                    <span>{item.icon}</span>
                    <span>{getUtilityCategoryName(item, language).split(' ')[0]}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Назва послуги та особовий рахунок */}
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="utilTitle">Послуга / Постачальник *</label>
              <input
                type="text"
                id="utilTitle"
                className="form-input"
                placeholder="напр. ДТЕК Київські електромережі"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="utilAccount">Особовий рахунок (№)</label>
              <input
                type="text"
                id="utilAccount"
                className="form-input"
                placeholder="напр. 24810931"
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
              />
            </div>
          </div>

          {/* Період та дедлайн */}
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="utilPeriod">Розрахунковий місяць *</label>
              <input
                type="month"
                id="utilPeriod"
                className="form-input"
                value={period}
                onChange={(e) => setPeriod(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="utilDueDate">Термін оплати (дедлайн) *</label>
              <input
                type="date"
                id="utilDueDate"
                className="form-input"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Перемикач лічильника */}
          <div
            style={{
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-sm)',
              padding: '0.75rem 0.9rem',
              marginBottom: '1rem'
            }}
          >
            <label
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.6rem',
                cursor: 'pointer',
                margin: 0,
                fontSize: '0.88rem',
                fontWeight: 600,
                color: 'var(--text-main)'
              }}
            >
              <input
                type="checkbox"
                checked={hasMeter}
                onChange={(e) => setHasMeter(e.target.checked)}
                style={{ width: '18px', height: '18px', cursor: 'pointer' }}
              />
              <span>🎛️ Розрахунок за показниками лічильника</span>
            </label>

            {hasMeter && (
              <div style={{ marginTop: '0.8rem', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                <div className="form-row">
                  <div className="form-group" style={{ margin: 0 }}>
                    <label style={{ fontSize: '0.78rem' }}>Попередній показник</label>
                    <input
                      type="number"
                      step="any"
                      className="form-input"
                      placeholder="0"
                      value={meterPrev}
                      onChange={(e) => setMeterPrev(e.target.value)}
                    />
                  </div>
                  <div className="form-group" style={{ margin: 0 }}>
                    <label style={{ fontSize: '0.78rem' }}>Поточний показник</label>
                    <input
                      type="number"
                      step="any"
                      className="form-input"
                      placeholder="0"
                      value={meterCurrent}
                      onChange={(e) => setMeterCurrent(e.target.value)}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group" style={{ margin: 0 }}>
                    <label style={{ fontSize: '0.78rem' }}>Одиниця виміру</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="кВт·год / м³"
                      value={unit}
                      onChange={(e) => setUnit(e.target.value)}
                    />
                  </div>
                  <div className="form-group" style={{ margin: 0 }}>
                    <label style={{ fontSize: '0.78rem' }}>Тариф (грн за одиницю)</label>
                    <input
                      type="number"
                      step="any"
                      className="form-input"
                      placeholder="4.32"
                      value={tariff}
                      onChange={(e) => setTariff(e.target.value)}
                    />
                  </div>
                </div>

                {consumedDifference !== null && (
                  <div
                    style={{
                      background: 'rgba(99, 102, 241, 0.1)',
                      border: '1px solid rgba(99, 102, 241, 0.25)',
                      borderRadius: '6px',
                      padding: '0.5rem 0.8rem',
                      fontSize: '0.82rem',
                      color: '#a5b4fc',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}
                  >
                    <span>📊 Спожито: <strong>{consumedDifference >= 0 ? consumedDifference : 0} {unit}</strong></span>
                    {tariff && (
                      <span>× {tariff} ₴ = <strong>{amount} ₴</strong></span>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Сума до сплати */}
          <div className="form-group">
            <label htmlFor="utilAmount">
              Сума до сплати ({currency.symbol}) *
            </label>
            <input
              type="number"
              step="any"
              id="utilAmount"
              className="form-input"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>

          {/* Примітка */}
          <div className="form-group">
            <label htmlFor="utilNote">Коментар або примітка</label>
            <input
              type="text"
              id="utilNote"
              className="form-input"
              placeholder="напр. Лічильник у коридорі, сплатити через Приват24"
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </div>

          <div className="modal-actions" style={{ marginTop: '1.25rem' }}>
            <button
              type="button"
              className="btn-secondary"
              onClick={() => setIsUtilityModalOpen(false)}
            >
              Скасувати
            </button>
            <button type="submit" className="btn-primary">
              <span>➕</span> <span>Додати рахунок</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
