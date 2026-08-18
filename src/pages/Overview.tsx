import React from 'react';
import type { PageRoute, Reel, RecommendationOutput } from '../types';
import { 
  Sparkles, 
  ArrowRight, 
  Film, 
  Brain, 
  Compass, 
  Award, 
  Zap,
  CheckCircle2
} from 'lucide-react';

interface OverviewProps {
  onNavigate: (page: PageRoute) => void;
  watchedReels: Reel[];
  recommendation: RecommendationOutput | null;
}

export const Overview: React.FC<OverviewProps> = ({
  onNavigate,
  watchedReels,
  recommendation
}) => {
  const topInterests = [
    { name: 'Software Engineering', score: 91, color: '#facc15' },
    { name: 'Programming', score: 87, color: '#eab308' },
    { name: 'Developer Career', score: 84, color: '#ca8a04' }
  ];

  return (
    <div className="page-container">
      {/* Hero Section */}
      <div className="glass-panel" style={{
        padding: '48px 40px',
        background: 'linear-gradient(135deg, rgba(20, 22, 32, 0.95) 0%, rgba(10, 11, 16, 0.95) 100%)',
        border: '1px solid rgba(250, 204, 21, 0.3)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Gold Glow backdrop detail */}
        <div style={{
          position: 'absolute',
          top: '-60px',
          right: '-60px',
          width: '350px',
          height: '350px',
          background: 'radial-gradient(circle, rgba(250, 204, 21, 0.15) 0%, transparent 70%)',
          pointerEvents: 'none'
        }} />

        <div style={{ maxWidth: '750px', position: 'relative', zIndex: 10 }}>
          <div className="badge-gold" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '18px', padding: '6px 14px', borderRadius: '99px', fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase' }}>
            <Sparkles size={14} color="#facc15" /> STUDENT AI RECOMMENDATION ENGINE
          </div>

          <h1 style={{
            fontSize: '3rem',
            fontWeight: 900,
            lineHeight: 1.12,
            letterSpacing: '-0.03em',
            marginBottom: '18px',
            textTransform: 'uppercase'
          }}>
            TURN SCROLLING INTO <span className="gradient-text">SOMETHING USEFUL.</span>
          </h1>

          <p style={{
            fontSize: '1.12rem',
            color: 'var(--text-muted)',
            lineHeight: 1.6,
            marginBottom: '32px',
            fontWeight: 500
          }}>
            ReelSmart AI analyzes short-form video interaction, discovers underlying career interests, and recommends high-value technology content worth watching.
          </p>

          <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
            <button 
              onClick={() => onNavigate('feed')}
              className="btn-primary"
              style={{ padding: '14px 28px', fontSize: '0.95rem' }}
            >
              <Film size={18} color="black" /> ANALYZE MY FEED <ArrowRight size={18} color="black" />
            </button>

            <button 
              onClick={() => onNavigate('recommendations')}
              className="btn-secondary"
              style={{ padding: '14px 24px', fontSize: '0.95rem' }}
            >
              <Compass size={18} color="#facc15" /> EXPLORE RECOMMENDATIONS
            </button>
          </div>
        </div>
      </div>

      {/* 4 Compact Statistics */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '16px'
      }}>
        <div className="glass-panel" style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: 'rgba(250, 204, 21, 0.15)', border: '1px solid rgba(250, 204, 21, 0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Film size={22} color="#facc15" />
          </div>
          <div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase', display: 'block' }}>REELS ANALYZED</span>
            <span style={{ fontSize: '1.6rem', fontWeight: 900, color: '#facc15' }}>{watchedReels.length}</span>
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: 'rgba(250, 204, 21, 0.15)', border: '1px solid rgba(250, 204, 21, 0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Brain size={22} color="#facc15" />
          </div>
          <div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase', display: 'block' }}>INTERESTS DETECTED</span>
            <span style={{ fontSize: '1.6rem', fontWeight: 900, color: 'white' }}>4 Core Domains</span>
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: 'rgba(250, 204, 21, 0.15)', border: '1px solid rgba(250, 204, 21, 0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Sparkles size={22} color="#facc15" />
          </div>
          <div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase', display: 'block' }}>RECOMMENDATIONS</span>
            <span style={{ fontSize: '1.6rem', fontWeight: 900, color: 'white' }}>6 Tech Topics</span>
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: 'rgba(16, 185, 129, 0.15)', border: '1px solid rgba(16, 185, 129, 0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Award size={22} color="#34d399" />
          </div>
          <div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase', display: 'block' }}>EDUCATIONAL SCORE</span>
            <span style={{ fontSize: '1.6rem', fontWeight: 900, color: '#34d399' }}>94% Score</span>
          </div>
        </div>
      </div>

      {/* Grid: Your AI Profile + Recent AI Insight */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
        gap: '24px'
      }}>
        {/* Compact "Your AI Profile" Section */}
        <div className="glass-panel" style={{ padding: '28px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 900, color: 'white', textTransform: 'uppercase' }}>YOUR AI PROFILE</h3>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>Top inferred interest confidence signals</p>
            </div>
            <button 
              onClick={() => onNavigate('interests')}
              style={{ background: 'none', border: 'none', color: '#facc15', fontSize: '0.82rem', fontWeight: 800, cursor: 'pointer' }}
            >
              View Full Profile →
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {topInterests.map((item) => (
              <div key={item.name} style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                  <span style={{ fontWeight: 800, color: 'white' }}>{item.name}</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 900, color: item.color }}>{item.score}%</span>
                </div>
                <div style={{ height: '8px', width: '100%', background: 'rgba(255,255,255,0.06)', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${item.score}%`, background: 'linear-gradient(90deg, #facc15 0%, #ca8a04 100%)', borderRadius: '4px' }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Small "Recent AI Insight" Card */}
        <div className="glass-panel" style={{
          padding: '28px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: 'linear-gradient(135deg, rgba(250, 204, 21, 0.08) 0%, rgba(15, 16, 22, 0.95) 100%)',
          border: '1px solid rgba(250, 204, 21, 0.35)'
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Zap size={18} color="#facc15" />
              <span style={{ fontSize: '0.75rem', fontWeight: 900, color: '#facc15', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                RECENT AI INSIGHT
              </span>
            </div>

            <h4 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'white', lineHeight: 1.4 }}>
              "You appear more interested in software engineering than Java specifically."
            </h4>

            <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', lineHeight: 1.5, fontWeight: 500 }}>
              {recommendation?.why || "Your engagement with developer humor, interview jokes, and compile hardware tests signals an ambition toward a full engineering career rather than single syntax drills."}
            </p>
          </div>

          <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid rgba(255,255,255,0.08)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.78rem', color: '#facc15', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '4px' }}>
              <CheckCircle2 size={14} color="#facc15" /> Anti-Hype System Active
            </span>
            <button 
              onClick={() => onNavigate('lab')}
              className="btn-secondary"
              style={{ fontSize: '0.78rem', padding: '6px 14px' }}
            >
              Test Trap Benchmark
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
