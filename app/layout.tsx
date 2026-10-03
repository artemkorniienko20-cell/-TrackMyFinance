import type { Metadata } from 'next';
import './globals.css';
import { FinanceProvider } from '@/context/FinanceContext';
import { Toast } from '@/components/Toast';

export const metadata: Metadata = {
  title: 'TrackMyFinance — Розумний трекер витрат та фінансів',
  description: 'TrackMyFinance: керуйте власним бюджетом, відстежуйте доходи та витрати, користуйтеся підписками FinansePremium та FinanseDelux з ексклюзивними аватарками та рамками.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uk" data-theme="dark" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <FinanceProvider>
          {children}
          <Toast />
        </FinanceProvider>
      </body>
    </html>
  );
}
