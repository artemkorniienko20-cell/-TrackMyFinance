'use client';

import React from 'react';
import Link from 'next/link';
import { useFinance } from '@/context/FinanceContext';
import { Header } from '@/components/Header';
import { SideDrawer } from '@/components/SideDrawer';
import { HeroStats } from '@/components/HeroStats';
import { QuickAddCard } from '@/components/QuickAddCard';
import { TransactionsList } from '@/components/TransactionsList';
import { AnalyticsChart } from '@/components/AnalyticsChart';
import { SubscriptionModal } from '@/components/SubscriptionModal';
import { CheckoutModal } from '@/components/CheckoutModal';
import { ProfileModal } from '@/components/ProfileModal';
import { AddTransactionModal } from '@/components/AddTransactionModal';
import { WelcomeAuthModal } from '@/components/WelcomeAuthModal';
import { GoogleChooserModal } from '@/components/GoogleChooserModal';

export default function HomePage() {
  const { setIsTxModalOpen, setIsSubModalOpen, t } = useFinance();

  return (
    <>
      <Header />
      <SideDrawer />

      <main className="main-content">
        {/* Статистика балансу, доходів, витрат та підписки */}
        <HeroStats />

        {/* Промо-банер швидких дій */}
        <div className="action-banner">
          <div className="action-banner-text">
            <h3>{t.bannerTitle}</h3>
            <p>{t.bannerDesc}</p>
          </div>
          <div className="banner-buttons">
            <button className="btn-primary" onClick={() => setIsTxModalOpen(true)}>
              <span>+</span> <span>{t.btnAddWindow}</span>
            </button>
            <Link href="/planned" className="btn-secondary" style={{ textDecoration: 'none' }}>
              <span>📅</span> <span>{t.navPlanned}</span>
            </Link>
            <Link href="/utilities" className="btn-secondary" style={{ textDecoration: 'none' }}>
              <span>💡</span> <span>{t.navUtilities}</span>
            </Link>
            <Link href="/debts" className="btn-secondary" style={{ textDecoration: 'none' }}>
              <span>🤝</span> <span>{t.navDebts}</span>
            </Link>
            <button className="btn-secondary" onClick={() => setIsSubModalOpen(true)}>
              <span>⭐</span> <span>{t.btnSubscriptions}</span>
            </button>
          </div>
        </div>

        {/* Віджет швидкого додавання в 1 клік */}
        <QuickAddCard />

        {/* Головна сітка: історія операцій та графік аналітики */}
        <div className="dashboard-grid">
          <TransactionsList />
          <AnalyticsChart />
        </div>
      </main>

      {/* Модальні вікна */}
      <SubscriptionModal />
      <CheckoutModal />
      <ProfileModal />
      <AddTransactionModal />
      <WelcomeAuthModal />
      <GoogleChooserModal />
    </>
  );
}
