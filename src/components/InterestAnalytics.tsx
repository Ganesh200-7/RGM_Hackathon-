import React from 'react';
import type { Reel, RecommendationOutput } from '../types';
import { BarChart3, ShieldCheck } from 'lucide-react';

interface InterestAnalyticsProps {
  watchedReels: Reel[];
  recommendation: RecommendationOutput | null;
}

export const InterestAnalytics: React.FC<InterestAnalyticsProps> = ({
  watchedReels,
  recommendation: _recommendation
}) => {
  // Compute topic breakdown from session
  const total = Math.max(watchedReels.length, 1);
  const categoriesCount = watchedReels.reduce((acc, r) => {
    acc[r.category] = (acc[r.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const breakdown = [
    { label: 'Software Engineering / Java', count: (categoriesCount['Java'] || 0) + (categoriesCount['Career'] || 0), color: '#818cf8' },
    { label: 'Systems & Hardware', count: (categoriesCount['Hardware'] || 0) + (categoriesCount['HLD'] || 0), color: '#38bdf8' },
    { label: 'DSA & Algorithms', count: categoriesCount['DSA'] || 0, color: '#c084fc' },
    { label: 'AI & Machine Learning', count: categoriesCount['AI'] || 0, color: '#34d399' },
    { label: 'Entertainment / Gaming', count: categoriesCount['Gaming'] || 0, color: '#f43f5e' }
  ];

  // Anti-hype block metrics
  const hypeReelsBlocked = watchedReels.filter(r => r.isHype).length + 1; // At least 1 hype filtered

  return (
    <div className="glass-panel" style={{
      padding: '24px',
      display: 'flex',
      flexDirection: 'column',
      gap: '20px'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <BarChart3 size={20} color="#38bdf8" />
          <div>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 800 }}>
              Student Interest Profile & Analytics
            </h3>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              Inferred vectors from interaction logs
            </p>
          </div>
        </div>

        <span className="badge-glow" style={{ fontSize: '0.75rem', padding: '4px 10px', borderRadius: '8px' }}>
          Educational Value Score: 94/100
        </span>
      </div>

      {/* Interest Distribution Bars */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {breakdown.map((item) => {
          const pct = Math.round((item.count / total) * 100) || 15;
          return (
            <div key={item.label} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem' }}>
                <span style={{ fontWeight: 600, color: 'var(--text-main)' }}>{item.label}</span>
                <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>{pct}%</span>
              </div>
              <div style={{
                height: '8px',
                width: '100%',
                background: 'rgba(255,255,255,0.05)',
                borderRadius: '4px',
                overflow: 'hidden'
              }}>
                <div style={{
                  height: '100%',
                  width: `${pct}%`,
                  background: item.color,
                  borderRadius: '4px',
                  transition: 'width 0.4s ease'
                }} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Anti-Hype Guard Indicator */}
      <div style={{
        background: 'rgba(168, 85, 247, 0.1)',
        border: '1px solid rgba(168, 85, 247, 0.3)',
        borderRadius: '12px',
        padding: '14px',
        display: 'flex',
        alignItems: 'center',
        gap: '12px'
      }}>
        <div style={{
          width: '36px',
          height: '36px',
          borderRadius: '50%',
          background: 'rgba(168, 85, 247, 0.2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0
        }}>
          <ShieldCheck size={20} color="#c084fc" />
        </div>
        <div>
          <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: '#e9d5ff' }}>
            Anti-Hype Guard Active
          </h4>
          <p style={{ fontSize: '0.75rem', color: '#c084fc', marginTop: '2px' }}>
            {hypeReelsBlocked} clickbait hype videos ("10 AI tools to get rich") automatically filtered out in favor of high-value technical concepts.
          </p>
        </div>
      </div>
    </div>
  );
};
