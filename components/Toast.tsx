'use client';

import React from 'react';
import { useFinance } from '@/context/FinanceContext';

export const Toast: React.FC = () => {
  const { toast } = useFinance();

  return (
    <div className={`toast ${toast.visible ? 'show' : ''}`}>
      <span className="toast-icon">✨</span>
      <span>{toast.message}</span>
    </div>
  );
};
