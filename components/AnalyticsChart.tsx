'use client';

import React, { useRef, useEffect } from 'react';
import { useFinance } from '@/context/FinanceContext';
import { CATEGORY_COLORS } from '@/constants/categories';

export const AnalyticsChart: React.FC = () => {
  const { transactions, theme, currency, t } = useFinance();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const expenses = transactions.filter(tr => tr.type === 'expense');
  const categoryTotals: Record<string, number> = {};
  let totalExpenseAmount = 0;

  expenses.forEach(tr => {
    const amt = Number(tr.amount);
    categoryTotals[tr.category] = (categoryTotals[tr.category] || 0) + amt;
    totalExpenseAmount += amt;
  });

  const categories = Object.keys(categoryTotals).sort((a, b) => categoryTotals[b] - categoryTotals[a]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const size = 240;

    canvas.width = size * dpr;
    canvas.height = size * dpr;
    canvas.style.width = `${size}px`;
    canvas.style.height = `${size}px`;

    ctx.save();
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, size, size);

    const centerX = size / 2;
    const centerY = size / 2;
    const outerRadius = 100;
    const innerRadius = 68;

    if (categories.length === 0 || totalExpenseAmount === 0) {
      ctx.beginPath();
      ctx.arc(centerX, centerY, outerRadius, 0, Math.PI * 2);
      ctx.arc(centerX, centerY, innerRadius, Math.PI * 2, 0, true);
      ctx.fillStyle = theme === 'light' ? 'rgba(0, 0, 0, 0.06)' : 'rgba(255, 255, 255, 0.08)';
      ctx.fill();
      ctx.restore();
      return;
    }

    let startAngle = -Math.PI / 2;

    categories.forEach(cat => {
      const amount = categoryTotals[cat];
      const sliceAngle = (amount / totalExpenseAmount) * (Math.PI * 2);
      const color = CATEGORY_COLORS[cat] || '#8b5cf6';

      ctx.beginPath();
      ctx.arc(centerX, centerY, outerRadius, startAngle, startAngle + sliceAngle);
      ctx.arc(centerX, centerY, innerRadius, startAngle + sliceAngle, startAngle, true);
      ctx.closePath();
      ctx.fillStyle = color;
      ctx.shadowColor = color + '66';
      ctx.shadowBlur = 8;
      ctx.fill();

      startAngle += sliceAngle;
    });

    ctx.restore();
  }, [transactions, theme, categories.length, totalExpenseAmount]);

  return (
    <section className="card-panel">
      <div className="panel-header">
        <h2 className="panel-title">
          <span>📊</span> {t.analyticsTitle}
        </h2>
      </div>

      <div className="chart-wrapper">
        <canvas ref={canvasRef} id="categoryChartCanvas" />
        <div className="chart-center-text">
          <div className="chart-center-amount">
            {totalExpenseAmount.toLocaleString(currency.locale)} {currency.symbol}
          </div>
          <div className="chart-center-label">{t.totalExpenses}</div>
        </div>
      </div>

      <div className="category-legend">
        {categories.length === 0 || totalExpenseAmount === 0 ? (
          <div style={{ textAlign: 'center', color: 'var(--text-dim)', fontSize: '0.85rem', padding: '0.5rem' }}>
            Немає витрат для формування графіку
          </div>
        ) : (
          categories.map(cat => {
            const amount = categoryTotals[cat];
            const color = CATEGORY_COLORS[cat] || '#8b5cf6';
            const pct = Math.round((amount / totalExpenseAmount) * 100);

            return (
              <div key={cat} className="legend-item">
                <div className="legend-info">
                  <span className="legend-color-dot" style={{ background: color }} />
                  <span>{cat}</span>
                </div>
                <div>
                  <span style={{ fontWeight: 700 }}>
                    {amount.toLocaleString(currency.locale)} {currency.symbol}
                  </span>
                  <span className="legend-pct"> ({pct}%)</span>
                </div>
              </div>
            );
          })
        )}
      </div>
    </section>
  );
};
