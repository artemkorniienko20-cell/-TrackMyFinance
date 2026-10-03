'use client';

import React, { useState, useEffect } from 'react';
import { useFinance } from '@/context/FinanceContext';
import { AVATARS } from '@/constants/avatars';
import { FRAMES } from '@/constants/frames';
import { SubscriptionTier } from '@/types';

export const ProfileModal: React.FC = () => {
  const {
    isProfileModalOpen,
    setIsProfileModalOpen,
    subscription,
    profile,
    selectAvatar,
    selectFrame,
    updateProfileName,
    openCheckout,
    switchSubscription,
    hasPurchasedTier,
    currency,
    user,
    setIsGoogleChooserOpen,
    logout,
    showToast,
    t
  } = useFinance();

  const [previewAvatarId, setPreviewAvatarId] = useState<string>(profile.avatarId);
  const [previewFrameId, setPreviewFrameId] = useState<string>(profile.frameId);
  const [isEditingName, setIsEditingName] = useState(false);
  const [nameInput, setNameInput] = useState(profile.name);
  const [vipBanner, setVipBanner] = useState<{ title: string; tier: 'premium' | 'delux' | 'super_premium' } | null>(null);

  // Синхронізація прев'ю при відкритті або зміні профілю
  useEffect(() => {
    if (isProfileModalOpen) {
      setPreviewAvatarId(profile.avatarId);
      setPreviewFrameId(profile.frameId);
      setVipBanner(null);
      setIsEditingName(false);
      setNameInput(profile.name);
    }
  }, [isProfileModalOpen, profile.avatarId, profile.frameId, profile.name]);

  if (!isProfileModalOpen) return null;

  const handleSaveName = () => {
    const trimmed = nameInput.trim();
    if (!trimmed) {
      showToast('⚠️ Нікнейм не може бути порожнім!');
      return;
    }
    updateProfileName(trimmed);
    setIsEditingName(false);
  };

  const hasSuper = hasPurchasedTier('super_premium') || subscription.tier === 'super_premium';
  const hasDelux = hasSuper || hasPurchasedTier('delux') || subscription.tier === 'delux';
  const hasPremium = hasDelux || hasPurchasedTier('premium') || subscription.tier === 'premium';

  const curAvatar = AVATARS.find(a => a.id === previewAvatarId) || AVATARS[0];

  const handleAvatarClick = (avatar: typeof AVATARS[0]) => {
    if (avatar.tierRequired === 'super_premium' && !hasSuper) {
      setVipBanner({
        title: `💎 Аватарка «${avatar.name}» входить до ексклюзивної підписки FinanseSuperPremium.`,
        tier: 'super_premium'
      });
      return;
    }

    if (avatar.vip && !hasPremium) {
      setVipBanner({
        title: `🦁 Аватарка «${avatar.name}» входить до підписки FinansePremium.`,
        tier: 'premium'
      });
      return;
    }

    setVipBanner(null);
    setPreviewAvatarId(avatar.id);
    selectAvatar(avatar.id);
  };

  const handleFrameClick = (frame: typeof FRAMES[0]) => {
    // Якщо це рамка для тих, хто увійшов через Google
    if (frame.requiresGoogleAuth && !user.isLoggedIn) {
      setIsGoogleChooserOpen(true);
      return;
    }

    if (frame.tierRequired === 'super_premium' && !hasSuper) {
      setVipBanner({
        title: `✨ VIP-рамка «${frame.name}» доступна в тарифі FinanseSuperPremium.`,
        tier: 'super_premium'
      });
      return;
    }

    if (frame.vip && !frame.requiresGoogleAuth && !hasDelux) {
      setVipBanner({
        title: `👑 VIP-рамка «${frame.name}» доступна в тарифі FinanseDelux або SuperPremium.`,
        tier: 'delux'
      });
      return;
    }

    setVipBanner(null);
    setPreviewFrameId(frame.id);
    selectFrame(frame.id);
  };

  const handleSubSwitchClick = (tier: SubscriptionTier) => {
    if (!hasPurchasedTier(tier)) {
      const planName = tier === 'super_premium' ? 'FinanseSuperPremium' : (tier === 'delux' ? 'FinanseDelux' : 'FinansePremium');
      showToast(`🔒 Підписка «${planName}» ще не придбана! Відкриваємо оформлення...`);
      setIsProfileModalOpen(false);
      openCheckout(tier as 'premium' | 'delux' | 'super_premium');
      return;
    }

    switchSubscription(tier);
  };

  const handleUnlockClick = (tier: 'premium' | 'delux' | 'super_premium') => {
    setIsProfileModalOpen(false);
    openCheckout(tier);
  };

  return (
    <div
      className="modal-overlay active"
      onClick={(e) => {
        if (e.target === e.currentTarget) setIsProfileModalOpen(false);
      }}
    >
      <div className="modal-box" style={{ maxWidth: '600px' }}>
        <div className="modal-header">
          <h3 className="modal-title">
            <span>👤</span> Профіль та кастомізація
          </h3>
          <button className="modal-close" onClick={() => setIsProfileModalOpen(false)}>
            &times;
          </button>
        </div>

        <div className="modal-body">
          {/* Large Avatar Preview with active or previewed frame */}
          <div className="profile-hero">
            <div className={`avatar-container profile-avatar-large ${previewFrameId || 'frame-none'}`}>
              <div
                className="avatar-image-box"
                dangerouslySetInnerHTML={{ __html: curAvatar.svg }}
              />
            </div>

            {/* Interactive Nickname */}
            {!isEditingName ? (
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.45rem',
                  marginTop: '0.4rem',
                  marginBottom: '0.2rem'
                }}
              >
                <div
                  className="profile-name"
                  onClick={() => {
                    setNameInput(profile.name);
                    setIsEditingName(true);
                  }}
                  title={t.editNickname}
                  style={{ cursor: 'pointer', margin: 0, display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
                >
                  <span>{profile.name}</span>
                  {(subscription.tier === 'delux' || subscription.tier === 'super_premium') && (
                    <span className="delux-nick-badge" title="VIP Delux Badge">
                      {subscription.tier === 'super_premium' ? '💎 Delux' : '👑 Delux'}
                    </span>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setNameInput(profile.name);
                    setIsEditingName(true);
                  }}
                  title={t.editNickname}
                  style={{
                    background: 'rgba(255, 255, 255, 0.08)',
                    border: '1px solid var(--border-color)',
                    color: 'var(--text-muted)',
                    borderRadius: '6px',
                    padding: '0.2rem 0.45rem',
                    fontSize: '0.8rem',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.25rem',
                    transition: 'all 0.2s'
                  }}
                >
                  <span>✏️</span>
                </button>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSaveName();
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.4rem',
                  marginTop: '0.4rem',
                  marginBottom: '0.2rem',
                  width: '100%',
                  maxWidth: '360px'
                }}
              >
                <input
                  type="text"
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  placeholder={t.nicknamePlaceholder}
                  maxLength={30}
                  autoFocus
                  style={{
                    flex: 1,
                    background: 'rgba(255, 255, 255, 0.08)',
                    border: '1px solid var(--accent)',
                    color: '#fff',
                    borderRadius: '8px',
                    padding: '0.4rem 0.75rem',
                    fontSize: '0.95rem',
                    fontWeight: 600,
                    textAlign: 'center',
                    outline: 'none',
                    boxShadow: '0 0 0 2px rgba(99, 102, 241, 0.25)'
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Escape') {
                      setIsEditingName(false);
                    }
                  }}
                />
                <button
                  type="submit"
                  title={t.saveNickname}
                  style={{
                    background: 'var(--accent)',
                    border: 'none',
                    color: '#fff',
                    borderRadius: '8px',
                    padding: '0.45rem 0.75rem',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.2rem'
                  }}
                >
                  <span>✓</span> <span>{t.saveNickname}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditingName(false)}
                  title={t.cancelEdit}
                  style={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    border: '1px solid var(--border-color)',
                    color: 'var(--text-muted)',
                    borderRadius: '8px',
                    padding: '0.45rem 0.65rem',
                    fontSize: '0.85rem',
                    cursor: 'pointer'
                  }}
                >
                  ✕
                </button>
              </form>
            )}
            {user.isLoggedIn && (
              <div style={{ fontSize: '0.82rem', color: '#60a5fa', marginBottom: '0.4rem' }}>
                🌐 Google: {user.email}
              </div>
            )}

            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap' }}>
              <span
                className={`header-badge ${
                  subscription.tier === 'super_premium'
                    ? 'badge-super-premium'
                    : subscription.tier === 'delux'
                    ? 'badge-delux'
                    : subscription.tier === 'premium'
                    ? 'badge-premium'
                    : 'badge-free'
                }`}
              >
                {subscription.tier === 'super_premium' ? '💎 FinanseSuperPremium' : subscription.name}
              </span>

              {user.isLoggedIn ? (
                <button
                  type="button"
                  onClick={logout}
                  style={{
                    background: 'rgba(239, 68, 68, 0.15)',
                    border: '1px solid rgba(239, 68, 68, 0.4)',
                    color: '#f87171',
                    fontSize: '0.78rem',
                    padding: '0.2rem 0.5rem',
                    borderRadius: '6px',
                    cursor: 'pointer'
                  }}
                >
                  Вийти
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setIsGoogleChooserOpen(true)}
                  style={{
                    background: 'rgba(66, 133, 244, 0.15)',
                    border: '1px solid rgba(66, 133, 244, 0.4)',
                    color: '#60a5fa',
                    fontSize: '0.78rem',
                    padding: '0.2rem 0.5rem',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.3rem'
                  }}
                >
                  <span>🌐</span> <span>Увійти через Google</span>
                </button>
              )}
            </div>

            {/* Subscription Switcher */}
            <div className="sub-switcher-container">
              <div className="sub-switcher-label">
                <span>🔄</span> <span>Перемикання підписки:</span>
              </div>
              <div className="sub-switcher-pills">
                <button
                  type="button"
                  className={`sub-switch-btn ${subscription.tier === 'free' ? 'active' : ''}`}
                  onClick={() => handleSubSwitchClick('free')}
                >
                  ⚪ Базовий
                </button>
                <button
                  type="button"
                  className={`sub-switch-btn premium ${subscription.tier === 'premium' ? 'active' : ''} ${!hasPurchasedTier('premium') ? 'locked' : ''}`}
                  onClick={() => handleSubSwitchClick('premium')}
                  title={!hasPurchasedTier('premium') ? 'Підписка ще не куплена. Натисніть, щоб оформити.' : 'Перемкнутися на FinansePremium'}
                >
                  {!hasPurchasedTier('premium') ? '🔒 ⭐ Premium' : '⭐ FinansePremium'}
                </button>
                <button
                  type="button"
                  className={`sub-switch-btn delux ${subscription.tier === 'delux' ? 'active' : ''} ${!hasPurchasedTier('delux') ? 'locked' : ''}`}
                  onClick={() => handleSubSwitchClick('delux')}
                  title={!hasPurchasedTier('delux') ? 'Підписка ще не куплена. Натисніть, щоб оформити.' : 'Перемкнутися на FinanseDelux'}
                >
                  {!hasPurchasedTier('delux') ? '🔒 👑 Delux' : '👑 FinanseDelux'}
                </button>
                <button
                  type="button"
                  className={`sub-switch-btn super-premium ${subscription.tier === 'super_premium' ? 'active' : ''} ${!hasPurchasedTier('super_premium') ? 'locked' : ''}`}
                  onClick={() => handleSubSwitchClick('super_premium')}
                  title={!hasPurchasedTier('super_premium') ? 'Підписка ще не куплена. Натисніть, щоб оформити.' : 'Перемкнутися на FinanseSuperPremium'}
                  style={{
                    background: subscription.tier === 'super_premium' ? 'linear-gradient(135deg, #00f2fe, #4facfe, #7000ff)' : undefined,
                    color: '#fff',
                    border: '1px solid rgba(255, 255, 255, 0.2)'
                  }}
                >
                  {!hasPurchasedTier('super_premium') ? '🔒 💎 Super' : '💎 SuperPremium'}
                </button>
              </div>
            </div>

            {/* Dynamic VIP Banner */}
            {vipBanner && (
              <div className="profile-vip-banner">
                <div className="profile-vip-banner-text">{vipBanner.title}</div>
                <button
                  type="button"
                  className="btn-banner-unlock"
                  onClick={() => handleUnlockClick(vipBanner.tier)}
                >
                  {vipBanner.tier === 'super_premium'
                    ? `Купити за ${currency.superPremiumPrice} ${currency.symbol}`
                    : vipBanner.tier === 'delux'
                    ? `Купити за ${currency.deluxPrice} ${currency.symbol}`
                    : `Купити за ${currency.premiumPrice} ${currency.symbol}`}
                </button>
              </div>
            )}
          </div>

          {/* Avatar Selection Section */}
          <div className="customization-section">
            <div className="customization-header">
              <div className="customization-title">
                <span>🎭</span> Оберіть аватарку (29 варіантів)
              </div>
              <span className="vip-badge-tag vip-badge-gold">SuperPremium & VIP</span>
            </div>

            <div className="avatar-selection-grid">
              {AVATARS.map(avatar => {
                const isSelected = profile.avatarId === avatar.id;
                const isSuperLocked = avatar.tierRequired === 'super_premium' && !hasSuper;
                const isLocked = isSuperLocked || (avatar.vip && !hasPremium);

                return (
                  <div
                    key={avatar.id}
                    className={`selectable-item ${isSelected ? 'selected' : ''} ${isLocked ? 'locked' : ''}`}
                    title={`${avatar.name}${avatar.tierRequired === 'super_premium' ? ' (SuperPremium 💎)' : (avatar.vip ? ' (VIP)' : '')}`}
                    onClick={() => handleAvatarClick(avatar)}
                  >
                    {isLocked && (
                      <div className="lock-overlay" title={isSuperLocked ? "Потрібна підписка FinanseSuperPremium" : "Потрібна підписка FinansePremium"}>
                        {isSuperLocked ? '💎' : '🔒'}
                      </div>
                    )}
                    <div
                      style={{ width: '44px', height: '44px', pointerEvents: 'none' }}
                      dangerouslySetInnerHTML={{ __html: avatar.svg }}
                    />
                    <span className="item-label">{avatar.name}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Frame Selection Section */}
          <div className="customization-section">
            <div className="customization-header">
              <div className="customization-title">
                <span>🖼️</span> Рамки (27 ексклюзивних рамок)
              </div>
              <span className="vip-badge-tag vip-badge-delux">SuperPremium & Delux</span>
            </div>

            <div className="frame-selection-grid">
              {FRAMES.map(frame => {
                const isSelected = profile.frameId === frame.id;
                const isSuperLocked = frame.tierRequired === 'super_premium' && !hasSuper;
                const isLocked = frame.requiresGoogleAuth
                  ? !user.isLoggedIn
                  : isSuperLocked || (frame.vip && !hasDelux);

                return (
                  <div
                    key={frame.id}
                    className={`selectable-item ${isSelected ? 'selected' : ''} ${isLocked ? 'locked' : ''}`}
                    title={`${frame.name}${frame.requiresGoogleAuth ? ' (Для Google)' : (frame.tierRequired === 'super_premium' ? ' (SuperPremium 💎)' : (frame.vip ? ' (Delux)' : ''))}`}
                    onClick={() => handleFrameClick(frame)}
                  >
                    {isLocked && (
                      <div
                        className="lock-overlay"
                        title={frame.requiresGoogleAuth ? 'Потрібен вхід через Google' : (isSuperLocked ? 'Потрібна підписка FinanseSuperPremium' : 'Потрібна підписка FinanseDelux')}
                      >
                        {isSuperLocked ? '💎' : '🔒'}
                      </div>
                    )}
                    <div
                      className={`avatar-container ${frame.id}`}
                      style={{ width: '44px', height: '44px', pointerEvents: 'none' }}
                    >
                      <div className="avatar-image-box" style={{ fontSize: '1.1rem' }}>
                        {frame.icon}
                      </div>
                    </div>
                    <span className="item-label">{frame.name}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
