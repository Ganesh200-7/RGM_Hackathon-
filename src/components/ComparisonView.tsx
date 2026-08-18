import React from 'react';
import type { RecommendationOutput, ShallowOutput } from '../types';
import { CheckCircle2, ShieldX, Zap } from 'lucide-react';

interface ComparisonViewProps {
  shallowOutput: ShallowOutput | null;
  deepOutput: RecommendationOutput | null;
}

export const ComparisonView: React.FC<ComparisonViewProps> = ({
  shallowOutput,
  deepOutput
}) => {
  if (!shallowOutput || !deepOutput) return null;

  return (
    <div className="glass-panel" style={{
      padding: '24px',
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
      background: 'rgba(15, 20, 32, 0.9)'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Zap size={22} color="#f59e0b" />
          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800 }}>
              Hackathon Trap Benchmark: <span className="gradient-text">Shallow System vs ReelSmart AI</span>
            </h3>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              Demonstrating why naive keyword matching fails on student watch behavior
            </p>
          </div>
        </div>
        <span style={{
          fontSize: '0.75rem',
          background: 'rgba(245, 158, 11, 0.15)',
          border: '1px solid rgba(245, 158, 11, 0.3)',
          color: '#fbbf24',
          padding: '4px 12px',
          borderRadius: '99px',
          fontWeight: 700
        }}>
          Built-in Trap Evaluator
        </span>
      </div>

      {/* Side by side comparison grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
        {/* Shallow System Box (The Flawed Baseline) */}
        <div style={{
          background: 'rgba(239, 68, 68, 0.06)',
          border: '1px solid rgba(239, 68, 68, 0.25)',
          borderRadius: '16px',
          padding: '18px',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ShieldX size={20} color="#f87171" />
            <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#f87171' }}>
              Shallow Keyword Matching System
            </h4>
          </div>

          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
            <strong>Trigger Keyword Matched:</strong> <code style={{ color: '#fca5a5', background: 'rgba(0,0,0,0.3)', padding: '2px 6px', borderRadius: '4px' }}>{shallowOutput.keywordMatched}</code>
          </div>

          <div style={{
            background: 'rgba(0,0,0,0.4)',
            border: '1px solid rgba(239, 68, 68, 0.2)',
            padding: '12px',
            borderRadius: '10px'
          }}>
            <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)', display: 'block', fontWeight: 700 }}>
              NAIVE RECOMMENDATION:
            </span>
            <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#fca5a5', marginTop: '2px' }}>
              {shallowOutput.recommendedReel}
            </div>
          </div>

          <div style={{
            fontSize: '0.78rem',
            color: '#f87171',
            lineHeight: 1.4,
            background: 'rgba(239, 68, 68, 0.1)',
            padding: '10px',
            borderRadius: '8px'
          }}>
            ⚠️ <strong>Why It Fails:</strong> {shallowOutput.whyThisIsShallow}
          </div>
        </div>

        {/* ReelSmart AI Deep Agent Box (The Strong Solution) */}
        <div style={{
          background: 'rgba(16, 185, 129, 0.08)',
          border: '1px solid rgba(16, 185, 129, 0.3)',
          borderRadius: '16px',
          padding: '18px',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <CheckCircle2 size={20} color="#34d399" />
            <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#34d399' }}>
              ReelSmart AI Deep Agent
            </h4>
          </div>

          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
            <strong>Inferred Underlying Interest:</strong> <span style={{ color: '#6ee7b7', fontWeight: 700 }}>{deepOutput.interestDetected}</span>
          </div>

          <div style={{
            background: 'rgba(0,0,0,0.4)',
            border: '1px solid rgba(16, 185, 129, 0.2)',
            padding: '12px',
            borderRadius: '10px'
          }}>
            <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)', display: 'block', fontWeight: 700 }}>
              SMART ENGAGING TECH RECOMMENDATION:
            </span>
            <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#6ee7b7', marginTop: '2px' }}>
              {deepOutput.recommendedTechReel}
            </div>
          </div>

          <div style={{
            fontSize: '0.78rem',
            color: '#a7f3d0',
            lineHeight: 1.4,
            background: 'rgba(16, 185, 129, 0.12)',
            padding: '10px',
            borderRadius: '8px'
          }}>
            ✨ <strong>Deep Reasoning Success:</strong> Connected user's humor/lifestyle watch context to real technical skill building ({deepOutput.category}), while filtering out superficial hype!
          </div>
        </div>
      </div>
    </div>
  );
};
