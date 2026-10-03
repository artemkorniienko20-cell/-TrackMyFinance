'use client';

import React, { useState, useEffect } from 'react';
import { useFinance } from '@/context/FinanceContext';
import Image from 'next/image';

export const IosInstallModal: React.FC = () => {
  const { isIosInstallOpen, setIsIosInstallOpen } = useFinance();
  const [isIos, setIsIos] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);
  const [showBottomPrompt, setShowBottomPrompt] = useState(false);

  useEffect(() => {
    // Перевірка, чи користувач на iOS (iPhone, iPad, iPod)
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIosDevice = /iphone|ipad|ipod/.test(userAgent) || 
      (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
    
    // Перевірка, чи застосунок вже запущено у повноекранному автономному режимі
    const isStandaloneMode = 
      ('standalone' in window.navigator && (window.navigator as unknown as { standalone: boolean }).standalone === true) ||
      window.matchMedia('(display-mode: standalone)').matches;

    setIsIos(isIosDevice);
    setIsStandalone(isStandaloneMode);

    // Показуємо плаваючий банер-підказку тільки на iOS, якщо ще не встановлено і користувач не закрив у цій сесії
    const dismissed = sessionStorage.getItem('tmf_ios_prompt_dismissed');
    if (isIosDevice && !isStandaloneMode && !dismissed) {
      const timer = setTimeout(() => {
        setShowBottomPrompt(true);
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleDismissPrompt = () => {
    setShowBottomPrompt(false);
    sessionStorage.setItem('tmf_ios_prompt_dismissed', 'true');
  };

  return (
    <>
      {/* Плаваючий нижній банер-підказка для користувачів iPhone */}
      {showBottomPrompt && !isStandalone && (
        <div className="ios-bottom-banner">
          <div className="ios-bottom-banner-icon">
            <img src="/apple-touch-icon.png" alt="App Icon" width={38} height={38} style={{ borderRadius: '9px' }} />
          </div>
          <div className="ios-bottom-banner-text">
            <strong>Додайте на екран iPhone</strong>
            <span>Швидкий доступ та повноекранний режим</span>
          </div>
          <div className="ios-bottom-banner-actions">
            <button
              type="button"
              className="ios-banner-btn-open"
              onClick={() => {
                setShowBottomPrompt(false);
                setIsIosInstallOpen(true);
              }}
            >
              Як додати
            </button>
            <button
              type="button"
              className="ios-banner-btn-close"
              onClick={handleDismissPrompt}
              aria-label="Закрити"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Головне модальне вікно з покроковою інструкцією */}
      {isIosInstallOpen && (
        <div
          className="modal-overlay active"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsIosInstallOpen(false);
          }}
          style={{ zIndex: 9999 }}
        >
          <div className="modal-box" style={{ maxWidth: '480px', borderRadius: '24px', overflow: 'hidden' }}>
            <div className="modal-header" style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '0.85rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <span style={{ fontSize: '1.4rem' }}>🍏</span>
                <h3 className="modal-title" style={{ fontSize: '1.15rem', margin: 0 }}>
                  Додати на екран iPhone
                </h3>
              </div>
              <button
                type="button"
                className="modal-close"
                onClick={() => setIsIosInstallOpen(false)}
              >
                &times;
              </button>
            </div>

            <div className="modal-body" style={{ padding: '1.25rem 1rem' }}>
              {/* Попередній перегляд іконки на робочому столі */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '1.5rem' }}>
                <div
                  style={{
                    width: '74px',
                    height: '74px',
                    borderRadius: '18px',
                    overflow: 'hidden',
                    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.1)',
                    background: '#0a0b10',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '0.5rem'
                  }}
                >
                  <img
                    src="/apple-touch-icon.png"
                    alt="TrackFinance App Icon"
                    width={74}
                    height={74}
                    style={{ width: '100%', height: '100%', display: 'block' }}
                  />
                </div>
                <div style={{ fontWeight: 700, fontSize: '0.95rem', color: '#fff' }}>
                  TrackFinance
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  Іконка застосунку для вашого головного екрана
                </div>
              </div>

              {/* 3 кроки для встановлення в Safari */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
                {/* Крок 1 */}
                <div
                  style={{
                    background: 'rgba(255, 255, 255, 0.04)',
                    border: '1px solid var(--border-color)',
                    borderRadius: '14px',
                    padding: '0.85rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.85rem'
                  }}
                >
                  <div
                    style={{
                      width: '38px',
                      height: '38px',
                      borderRadius: '10px',
                      background: 'rgba(59, 130, 246, 0.2)',
                      border: '1px solid rgba(59, 130, 246, 0.4)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.2rem',
                      flexShrink: 0
                    }}
                  >
                    {/* SVG іконки "Поділитися" з iOS Safari */}
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
                      <polyline points="16 6 12 2 8 6" />
                      <line x1="12" y1="2" x2="12" y2="15" />
                    </svg>
                  </div>
                  <div style={{ fontSize: '0.88rem' }}>
                    <div style={{ fontWeight: 700, color: '#fff' }}>1. Натисніть кнопку «Поділитися»</div>
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: '0.15rem' }}>
                      Квадрат зі стрілкою вгору <span style={{ color: '#60a5fa', fontWeight: 600 }}>⎋</span> на нижній панелі Safari
                    </div>
                  </div>
                </div>

                {/* Крок 2 */}
                <div
                  style={{
                    background: 'rgba(255, 255, 255, 0.04)',
                    border: '1px solid var(--border-color)',
                    borderRadius: '14px',
                    padding: '0.85rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.85rem'
                  }}
                >
                  <div
                    style={{
                      width: '38px',
                      height: '38px',
                      borderRadius: '10px',
                      background: 'rgba(16, 185, 129, 0.2)',
                      border: '1px solid rgba(16, 185, 129, 0.4)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.2rem',
                      flexShrink: 0
                    }}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="3" width="18" height="18" rx="4" />
                      <line x1="12" y1="8" x2="12" y2="16" />
                      <line x1="8" y1="12" x2="16" y2="12" />
                    </svg>
                  </div>
                  <div style={{ fontSize: '0.88rem' }}>
                    <div style={{ fontWeight: 700, color: '#fff' }}>2. Оберіть «На початковий екран»</div>
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: '0.15rem' }}>
                      Прокрутіть список дій вниз до пункту <span style={{ color: '#34d399', fontWeight: 600 }}>«На початковий екран»</span> (Add to Home Screen)
                    </div>
                  </div>
                </div>

                {/* Крок 3 */}
                <div
                  style={{
                    background: 'rgba(255, 255, 255, 0.04)',
                    border: '1px solid var(--border-color)',
                    borderRadius: '14px',
                    padding: '0.85rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.85rem'
                  }}
                >
                  <div
                    style={{
                      width: '38px',
                      height: '38px',
                      borderRadius: '10px',
                      background: 'rgba(168, 85, 247, 0.2)',
                      border: '1px solid rgba(168, 85, 247, 0.4)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.1rem',
                      fontWeight: 800,
                      color: '#c084fc',
                      flexShrink: 0
                    }}
                  >
                    ✓
                  </div>
                  <div style={{ fontSize: '0.88rem' }}>
                    <div style={{ fontWeight: 700, color: '#fff' }}>3. Натисніть «Додати»</div>
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: '0.15rem' }}>
                      У правому верхньому кутку екрана натисніть синю кнопку <span style={{ color: '#60a5fa', fontWeight: 600 }}>«Додати»</span> (Add)
                    </div>
                  </div>
                </div>
              </div>

              {/* Переваги автономного режиму */}
              <div
                style={{
                  background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.12), rgba(168, 85, 247, 0.12))',
                  border: '1px dashed rgba(99, 102, 241, 0.4)',
                  borderRadius: '14px',
                  padding: '0.85rem',
                  fontSize: '0.8rem',
                  color: '#c7d2fe',
                  marginBottom: '1.25rem',
                  lineHeight: 1.45
                }}
              >
                ✨ <strong>Чому це зручно:</strong> Застосунок відкриватиметься на весь екран як справжня рідна програма з App Store — без рамок браузера Safari та з миттєвим завантаженням!
              </div>

              <button
                type="button"
                className="btn-primary"
                style={{ width: '100%', justifyContent: 'center', padding: '0.75rem' }}
                onClick={() => setIsIosInstallOpen(false)}
              >
                <span>👍</span> <span>Зрозуміло</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
