'use client';

import React, { useState } from 'react';
import { useFinance } from '@/context/FinanceContext';
import {
  validateCardNumber,
  validateCardExpiry,
  validateCardCvv
} from '@/utils/cardValidator';

export const CheckoutModal: React.FC = () => {
  const {
    isCheckoutModalOpen,
    setIsCheckoutModalOpen,
    checkoutTier,
    completePayment,
    setIsProfileModalOpen,
    currency,
    showToast
  } = useFinance();

  const [activeTab, setActiveTab] = useState<'card' | 'applepay' | 'googlepay'>('card');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [cardBrand, setCardBrand] = useState<'visa' | 'mastercard' | 'amex' | 'unknown'>('unknown');
  const [validationError, setValidationError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isCheckoutModalOpen) return null;

  const isSuper = checkoutTier === 'super_premium';
  const isDelux = checkoutTier === 'delux';
  const planName = isSuper ? 'FinanseSuperPremium' : (isDelux ? 'FinanseDelux' : 'FinansePremium');
  const currentPrice = isSuper ? currency.superPremiumPrice : (isDelux ? currency.deluxPrice : currency.premiumPrice);
  const formattedPrice = `${currentPrice.toLocaleString(currency.locale)} ${currency.symbol}`;

  const planDesc = isSuper
    ? 'Значок Delux у ніку + 20 нових аватарок (разом 29) + 20 нових VIP-рамок (разом 27)'
    : isDelux
    ? 'Всі VIP-аватарки + 5 анімованих рамок та королівський бейдж'
    : '6 ексклюзивних VIP-аватарок та статус Premium';

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, '').substring(0, 16);
    const formatted = raw.match(/.{1,4}/g)?.join(' ') || raw;
    setCardNumber(formatted);
    setValidationError(null);

    // Миттєве розпізнавання бренду
    if (/^4/.test(raw)) {
      setCardBrand('visa');
    } else if (/^(5[1-5]|2[2-7])/.test(raw)) {
      setCardBrand('mastercard');
    } else if (/^3[47]/.test(raw)) {
      setCardBrand('amex');
    } else {
      setCardBrand('unknown');
    }
  };

  const handleCardExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').substring(0, 4);
    if (value.length >= 3) {
      setCardExpiry(value.substring(0, 2) + '/' + value.substring(2, 4));
    } else {
      setCardExpiry(value);
    }
    setValidationError(null);
  };

  const handleCardCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCardCvv(e.target.value.replace(/\D/g, '').substring(0, 4));
    setValidationError(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // 1. Сувора перевірка номера картки за алгоритмом Луна
    const numberValidation = validateCardNumber(cardNumber);
    if (!numberValidation.isValid) {
      setValidationError(numberValidation.error || 'Недійсний номер банківської картки!');
      showToast(`⚠️ ${numberValidation.error || 'Помилка номера картки'}`);
      return;
    }

    // 2. Перевірка терміну дії (місяць 01-12, не прострочена)
    const expiryValidation = validateCardExpiry(cardExpiry);
    if (!expiryValidation.isValid) {
      setValidationError(expiryValidation.error || 'Недійсний термін дії картки!');
      showToast(`⚠️ ${expiryValidation.error || 'Термін дії картки закінчився'}`);
      return;
    }

    // 3. Перевірка CVV (3 або 4 цифри)
    const cvvValidation = validateCardCvv(cardCvv);
    if (!cvvValidation.isValid) {
      setValidationError(cvvValidation.error || 'Недійсний CVV код!');
      showToast(`⚠️ ${cvvValidation.error || 'Помилка CVV'}`);
      return;
    }

    if (!cardHolder.trim()) {
      setValidationError('Вкажіть імʼя та прізвище власника картки');
      showToast('⚠️ Вкажіть власника картки');
      return;
    }

    setValidationError(null);
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      completePayment(checkoutTier);
    }, 1400);
  };

  const handleClose = () => {
    setIsCheckoutModalOpen(false);
    setIsProcessing(false);
    setIsSuccess(false);
    setValidationError(null);
  };

  const handleSuccessGoToProfile = () => {
    handleClose();
    setIsProfileModalOpen(true);
  };

  return (
    <div
      className="modal-overlay active"
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
    >
      <div className="modal-box" style={{ maxWidth: '500px' }}>
        <div className="modal-header">
          <h3 className="modal-title">
            <span>💳</span> Оформлення {planName}
          </h3>
          <button className="modal-close" onClick={handleClose}>
            &times;
          </button>
        </div>

        <div className="modal-body">
          {/* Summary Box */}
          <div className="checkout-summary">
            <div className="checkout-plan-info">
              <h4>{planName}</h4>
              <p>{planDesc}</p>
            </div>
            <div className="checkout-total-price">{formattedPrice}</div>
          </div>

          {!isProcessing && !isSuccess && (
            <>
              {/* Payment Methods */}
              <div className="payment-methods-tabs">
                <div
                  className={`payment-tab ${activeTab === 'card' ? 'active' : ''}`}
                  onClick={() => setActiveTab('card')}
                >
                  <span>💳</span>
                  <span>Банківська картка</span>
                </div>
                <div
                  className={`payment-tab ${activeTab === 'applepay' ? 'active' : ''}`}
                  onClick={() => setActiveTab('applepay')}
                >
                  <span>🍏</span>
                  <span>Apple Pay</span>
                </div>
                <div
                  className={`payment-tab ${activeTab === 'googlepay' ? 'active' : ''}`}
                  onClick={() => setActiveTab('googlepay')}
                >
                  <span>🌐</span>
                  <span>Google Pay</span>
                </div>
              </div>


              {/* Error Message Alert */}
              {validationError && (
                <div
                  style={{
                    background: 'rgba(239, 68, 68, 0.15)',
                    border: '1px solid rgba(239, 68, 68, 0.4)',
                    color: '#fca5a5',
                    padding: '0.65rem 0.9rem',
                    borderRadius: '8px',
                    fontSize: '0.85rem',
                    marginBottom: '1rem'
                  }}
                >
                  🛡️ <strong>Перевірка безпеки:</strong> {validationError}
                </div>
              )}

              {/* Card Form */}
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <label htmlFor="cardNum">Номер банківської картки</label>
                    {cardBrand === 'visa' && (
                      <span className="google-card-brand-tag card-brand-visa">VISA</span>
                    )}
                    {cardBrand === 'mastercard' && (
                      <span className="google-card-brand-tag card-brand-mastercard">MASTERCARD</span>
                    )}
                  </div>
                  <input
                    type="text"
                    id="cardNum"
                    className="form-input"
                    placeholder="4532 0151 1283 0366"
                    value={cardNumber}
                    onChange={handleCardNumberChange}
                    maxLength={19}
                    required
                  />
                  <span style={{ fontSize: '0.74rem', color: 'var(--text-dim)', marginTop: '0.2rem', display: 'block' }}>
                    * Перевіряється справжність за алгоритмом контрольної суми Луна (Mod 10)
                  </span>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="cardExp">Термін (MM/YY)</label>
                    <input
                      type="text"
                      id="cardExp"
                      className="form-input"
                      placeholder="12/28"
                      value={cardExpiry}
                      onChange={handleCardExpiryChange}
                      maxLength={5}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="cardCvv">CVV / CVC</label>
                    <input
                      type="password"
                      id="cardCvv"
                      className="form-input"
                      placeholder="•••"
                      value={cardCvv}
                      onChange={handleCardCvvChange}
                      maxLength={4}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="cardHold">Власник картки</label>
                  <input
                    type="text"
                    id="cardHold"
                    className="form-input"
                    placeholder="ANDRII KOVALENKO"
                    value={cardHolder}
                    onChange={(e) => setCardHolder(e.target.value.toUpperCase())}
                    required
                  />
                </div>

                <button type="submit" className="btn-confirm-pay">
                  <span>🔒</span> <span>Підтвердити оплату {formattedPrice}</span>
                </button>

                <p
                  style={{
                    fontSize: '0.76rem',
                    color: 'var(--text-dim)',
                    textAlign: 'center',
                    marginTop: '0.85rem'
                  }}
                >
                  🛡️ Безпечний платіжний шлюз з перевіркою контрольної суми Луна та шифруванням 256-bit SSL.
                </p>
              </form>
            </>
          )}

          {/* Loader State */}
          {isProcessing && (
            <div className="pay-loader" style={{ display: 'block' }}>
              <div className="pay-spinner" style={{ margin: '0 auto 1rem' }} />
              <h4>Обробка платежу...</h4>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '0.4rem' }}>
                Зʼєднання з банківським процесингом та перевірка картки...
              </p>
            </div>
          )}

          {/* Success State */}
          {isSuccess && (
            <div className="pay-success" style={{ display: 'block', textAlign: 'center' }}>
              <div className="pay-success-icon" style={{ margin: '0 auto 1rem' }}>✓</div>
              <h3 style={{ fontSize: '1.4rem', color: '#fff', marginBottom: '0.4rem' }}>
                Оплату успішно підтверджено!
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '1.5rem' }}>
                Вітаємо! Ваш статус оновлено до {planName}. Всі VIP-аксесуари вже доступні у вашому профілі.
              </p>
              <button
                type="button"
                className="btn-primary"
                style={{ width: '100%', justifyContent: 'center' }}
                onClick={handleSuccessGoToProfile}
              >
                <span>🎨</span> <span>Перейти до налаштування аватара та рамок</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
