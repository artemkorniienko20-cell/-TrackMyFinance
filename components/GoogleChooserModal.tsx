'use client';

import React, { useState } from 'react';
import { useFinance } from '@/context/FinanceContext';

export const GoogleChooserModal: React.FC = () => {
  const {
    isGoogleChooserOpen,
    setIsGoogleChooserOpen,
    loginWithGoogle,
    showToast
  } = useFinance();

  const [emailInput, setEmailInput] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  if (!isGoogleChooserOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanEmail = emailInput.trim();

    if (!cleanEmail) {
      setErrorMsg('Введіть адресу електронної пошти');
      return;
    }

    if (!cleanEmail.includes('@') || !cleanEmail.includes('.')) {
      setErrorMsg('Введіть дійсну адресу електронної пошти (наприклад, імʼя@gmail.com)');
      return;
    }

    setErrorMsg(null);
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      loginWithGoogle(cleanEmail);
    }, 700);
  };

  return (
    <div
      className="modal-overlay active"
      style={{ zIndex: 1200 }}
      onClick={(e) => {
        if (e.target === e.currentTarget) setIsGoogleChooserOpen(false);
      }}
    >
      <div className="google-chooser-window" style={{ maxWidth: '450px' }}>
        {/* Google Official Logo */}
        <div className="google-header-logo">
          <svg width="74" height="24" viewBox="0 0 74 24">
            <path
              fill="#4285F4"
              d="M9.24 18.28c-5.1 0-9.24-4.14-9.24-9.24S4.14 0 9.24 0c2.81 0 4.81 1.11 6.32 2.54l-1.78 1.78c-1.07-1-2.52-1.78-4.54-1.78-3.7 0-6.7 2.99-6.7 6.7s3 6.7 6.7 6.7c2.4 0 3.76-.96 4.64-1.84.74-.74 1.22-1.8 1.4-3.26H9.24v-2.54h8.28c.08.44.12.98.12 1.56 0 1.86-.5 4.18-2.14 5.82-1.6 1.66-3.66 2.54-6.26 2.54z"
            />
            <path
              fill="#EA4335"
              d="M29.5 12.3c0 3.6-2.8 6.18-6.2 6.18s-6.2-2.58-6.2-6.18c0-3.64 2.8-6.18 6.2-6.18s6.2 2.54 6.2 6.18zm-2.7 0c0-2.26-1.64-3.8-3.5-3.8s-3.5 1.54-3.5 3.8 1.64 3.8 3.5 3.8 3.5-1.54 3.5-3.8z"
            />
            <path
              fill="#FBBC05"
              d="M43.5 12.3c0 3.6-2.8 6.18-6.2 6.18s-6.2-2.58-6.2-6.18c0-3.64 2.8-6.18 6.2-6.18s6.2 2.54 6.2 6.18zm-2.7 0c0-2.26-1.64-3.8-3.5-3.8s-3.5 1.54-3.5 3.8 1.64 3.8 3.5 3.8 3.5-1.54 3.5-3.8z"
            />
            <path
              fill="#4285F4"
              d="M56.5 6.42v11.48c0 4.72-2.78 6.66-6.08 6.66-3.1 0-4.96-2.08-5.66-3.78l2.36-.98c.42 1.02 1.46 2.22 3.3 2.22 2.14 0 3.48-1.32 3.48-3.8v-.94h-.1c-.64.78-1.86 1.48-3.4 1.48-3.22 0-6.16-2.8-6.16-6.26 0-3.5 2.94-6.28 6.16-6.28 1.54 0 2.76.7 3.4 1.44h.1v-.98h2.7v-.25zm-2.5 5.98c0-2.22-1.46-3.82-3.34-3.82-1.92 0-3.4 1.6-3.4 3.82 0 2.2 1.48 3.78 3.4 3.78 1.88 0 3.34-1.58 3.34-3.78z"
            />
            <path fill="#34A853" d="M60.5.5v17.4h-2.7V.5h2.7z" />
            <path
              fill="#EA4335"
              d="M71.7 14.52l2.16 1.44c-.7 1.04-2.38 2.52-5.18 2.52-4.32 0-6.08-3.34-6.08-6.18 0-3.74 2.6-6.18 5.8-6.18 3.44 0 4.88 2.68 5.22 4.1l.3.74-8.14 3.36c.62 1.24 1.62 1.9 3.02 1.9 1.42 0 2.38-.7 2.9-1.7zm-6.2-2.42l5.44-2.26c-.3-.76-1.18-1.3-2.24-1.3-1.34 0-3.24 1.18-3.2 3.56z"
            />
          </svg>
        </div>

        <h3 className="google-chooser-title">Вхід</h3>
        <p className="google-chooser-sub">
          Перейти до додатка <strong>TrackMyFinance</strong>
        </p>

        {/* Real Google Email Input Form */}
        <form onSubmit={handleSubmit} style={{ marginTop: '1.5rem' }}>
          <div style={{ marginBottom: '1.25rem' }}>
            <label
              htmlFor="googleEmailInput"
              style={{
                display: 'block',
                fontSize: '0.85rem',
                fontWeight: 500,
                color: '#5f6368',
                marginBottom: '0.4rem',
                textAlign: 'left'
              }}
            >
              Електронна адреса або номер телефону
            </label>
            <input
              type="email"
              id="googleEmailInput"
              className="form-input"
              style={{
                background: '#ffffff',
                color: '#202124',
                border: errorMsg ? '2px solid #d93025' : '1px solid #dadce0',
                borderRadius: '4px',
                padding: '0.85rem 1rem',
                fontSize: '1rem',
                width: '100%',
                outline: 'none',
                boxShadow: 'none'
              }}
              placeholder="Введіть ваш Gmail..."
              value={emailInput}
              onChange={(e) => {
                setEmailInput(e.target.value);
                setErrorMsg(null);
              }}
              autoFocus
              required
            />
            {errorMsg && (
              <div
                style={{
                  color: '#d93025',
                  fontSize: '0.78rem',
                  marginTop: '0.35rem',
                  textAlign: 'left',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.3rem'
                }}
              >
                <span>⚠️</span> <span>{errorMsg}</span>
              </div>
            )}
          </div>

          <p
            style={{
              fontSize: '0.8rem',
              color: '#5f6368',
              lineHeight: 1.4,
              textAlign: 'left',
              marginBottom: '1.75rem'
            }}
          >
            Не ваш комп’ютер? Для конфіденційного входу використовуйте режим анонімного перегляду.{' '}
            <span style={{ color: '#1a73e8', cursor: 'pointer', fontWeight: 500 }}>
              Докладніше
            </span>
          </p>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '1rem'
            }}
          >
            <button
              type="button"
              onClick={() => setIsGoogleChooserOpen(false)}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#1a73e8',
                fontSize: '0.9rem',
                fontWeight: 600,
                cursor: 'pointer',
                padding: '0.5rem 0'
              }}
            >
              Скасувати
            </button>

            <button
              type="submit"
              disabled={isLoading}
              style={{
                background: '#1a73e8',
                color: '#ffffff',
                border: 'none',
                padding: '0.65rem 1.6rem',
                borderRadius: '4px',
                fontSize: '0.92rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'background 0.2s ease',
                boxShadow: '0 1px 3px rgba(60,64,67,0.3)'
              }}
            >
              {isLoading ? 'Перевірка...' : 'Далі'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
