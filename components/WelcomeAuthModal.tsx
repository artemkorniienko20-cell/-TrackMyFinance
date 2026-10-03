'use client';

import React from 'react';
import { useFinance } from '@/context/FinanceContext';
import { APP_ICONS } from '@/constants/icons';

export const WelcomeAuthModal: React.FC = () => {
  const {
    isAuthModalOpen,
    setIsAuthModalOpen,
    iconVariant,
    continueAsGuest,
    setIsGoogleChooserOpen,
    t
  } = useFinance();

  if (!isAuthModalOpen) return null;

  const currentIcon = APP_ICONS[iconVariant] || APP_ICONS[2];

  return (
    <div className="modal-overlay active" style={{ zIndex: 1100 }}>
      <div className="welcome-auth-box">
        {/* App Logo */}
        <div
          className="welcome-logo-badge"
          dangerouslySetInnerHTML={{ __html: currentIcon.svg }}
        />

        <h2 className="welcome-title">{t.welcomeModalTitle}</h2>
        <p className="welcome-subtitle">{t.welcomeModalDesc}</p>

        {/* Google Sign-in Button */}
        <button
          type="button"
          className="btn-google-sign-in"
          onClick={() => {
            setIsAuthModalOpen(false);
            setIsGoogleChooserOpen(true);
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
            />
            <path
              fill="#34A853"
              d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
            />
            <path
              fill="#FBBC05"
              d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 10.03 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
            />
            <path
              fill="#EA4335"
              d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
            />
          </svg>
          <span>{t.btnSignInGoogle}</span>
        </button>

        {/* Continue without sign-in Button */}
        <button
          type="button"
          className="btn-guest-continue"
          onClick={continueAsGuest}
        >
          {t.btnContinueGuest}
        </button>
      </div>
    </div>
  );
};
