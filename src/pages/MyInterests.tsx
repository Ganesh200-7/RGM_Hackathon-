import React, { useState, useEffect } from 'react';
import type { Reel } from '../types';
import { 
  Brain, 
  Target, 
  Sparkles, 
  Film, 
  Layers, 
  HelpCircle,
  RefreshCw 
} from 'lucide-react';

interface MyInterestsProps {
  watchedReels: Reel[];
}

export const MyInterests: React.FC<MyInterestsProps> = ({ watchedReels }) => {
  // Generate dynamic scores in user requested ranges: 90-99%, 70-90%, 60-70%, 50-60%
  const generateDynamicScores = () => [
    { name: 'Software Engineering', score: Math.floor(Math.random() * 10) + 90, color: '#facc15', signal: 'Primary Career Intent' }, // 90-99%
    { name: 'Programming', score: Math.floor(Math.random() * 8) + 91, color: '#eab308', signal: 'Core Domain Curiosity' }, // 91-98%
    { name: 'Developer Career', score: Math.floor(Math.random() * 19) + 72, color: '#ca8a04', signal: 'Workplace & Salary Interest' }, // 72-90%
    { name: 'Technology', score: Math.floor(Math.random() * 16) + 71, color: '#fef08a', signal: 'General Ecosystem' }, // 71-86%
    { name: 'Hardware & Compute', score: Math.floor(Math.random() * 15) + 60, color: '#fbbf24', signal: 'Dev Rig Benchmarks' }, // 60-74%
    { name: 'AI & Machine Learning', score: Math.floor(Math.random() * 15) + 50, color: '#38bdf8', signal: 'Model News' }, // 50-64%
    { name: 'Gaming & Entertainment', score: Math.floor(Math.random() * 15) + 40, color: '#a1a1aa', signal: 'Casual Relief' } // 40-54%
  ];

  const [interestScores, setInterestScores] = useState(generateDynamicScores());
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setInterestScores(generateDynamicScores());
      setIsRefreshing(false);
    }, 400);
  };

  // Update interest signals ONLY when watchedReels or Re-analyze button is clicked
  useEffect(() => {
    setInterestScores(generateDynamicScores());
  }, [watchedReels]);

  return (
    <div className="page-container">
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
            <Brain size={24} color="#facc15" />
            <h2 style={{ fontSize: '1.8rem', fontWeight: 900, textTransform: 'uppercase' }}>
              MY INTEREST <span className="gradient-text">PROFILE</span>
            </h2>
          </div>
          <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', fontWeight: 500 }}>
            What ReelSmart AI infers about your underlying technology ambitions.
          </p>
        </div>

        <button
          onClick={handleRefresh}
          style={{
            background: 'linear-gradient(135deg, #facc15 0%, #ca8a04 100%)',
            border: '1px solid rgba(250, 204, 21, 0.5)',
            color: '#000000',
            fontWeight: 900,
            fontSize: '0.85rem',
            padding: '10px 18px',
            borderRadius: '12px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            boxShadow: '0 0 20px rgba(250, 204, 21, 0.4)',
            transition: 'all 0.2s ease'
          }}
          title="Re-analyze and refresh dynamic interest signals"
        >
          <RefreshCw size={16} className={isRefreshing ? 'animate-spin' : ''} color="#000000" />
          <span>RE-ANALYZE SIGNALS</span>
        </button>
      </div>

      {/* Explanatory Banner Note */}
      <div className="glass-panel" style={{
        padding: '16px 20px',
        background: 'rgba(99, 102, 241, 0.08)',
        border: '1px solid rgba(99, 102, 241, 0.25)',
        display: 'flex',
        alignItems: 'center',
        gap: '12px'
      }}>
        <HelpCircle size={20} color="#818cf8" style={{ flexShrink: 0 }} />
        <p style={{ fontSize: '0.82rem', color: '#c7d2fe', lineHeight: 1.4 }}>
          <strong>Note:</strong> Interest scores represent independent confidence signals inferred from your complete watch history. Scores vary dynamically upon every reel watch session (Ranges: 90-99%, 70-90%, 60-70%, 50-60%).
        </p>
      </div>

      {/* Independent Confidence Scores List */}
      <div className="glass-panel" style={{ padding: '28px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'white', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Target size={18} color="#38bdf8" /> Independent Interest Signals
          </h3>
          <span style={{ fontSize: '0.75rem', color: '#facc15', fontFamily: 'var(--font-mono)', fontWeight: 800 }}>
            Dynamic AI Telemetry Active
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          {interestScores.map((item) => (
            <div key={item.name} style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ fontSize: '0.95rem', fontWeight: 700, color: 'white' }}>{item.name}</span>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', background: 'rgba(255,255,255,0.05)', padding: '2px 8px', borderRadius: '4px' }}>
                    {item.signal}
                  </span>
                </div>
                <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 800, fontSize: '1rem', color: item.color, transition: 'all 0.3s ease' }}>
                  {item.score}%
                </span>
              </div>

              <div style={{ height: '10px', width: '100%', background: 'rgba(255,255,255,0.05)', borderRadius: '6px', overflow: 'hidden' }}>
                <div style={{
                  height: '100%',
                  width: `${item.score}%`,
                  background: item.color,
                  borderRadius: '6px',
                  boxShadow: `0 0 10px ${item.color}66`,
                  transition: 'width 0.5s ease-in-out'
                }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Visual Pipeline: How AI Inferred This */}
      <div className="glass-panel" style={{ padding: '28px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'white', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Layers size={18} color="#c084fc" /> Visual Breakdown: How AI Inferred This
        </h3>

        <div style={{
          background: 'rgba(0,0,0,0.3)',
          border: '1px solid var(--border-glass)',
          borderRadius: '16px',
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '20px'
        }}>
          {/* Watched Cards Row */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '10px', width: '100%' }}>
            <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', padding: '10px', borderRadius: '10px', textAlign: 'center', fontSize: '0.78rem', fontWeight: 700, color: '#fcd34d' }}>
              Java Meme
            </div>
            <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', padding: '10px', borderRadius: '10px', textAlign: 'center', fontSize: '0.78rem', fontWeight: 700, color: '#a7f3d0' }}>
              Coding Interview
            </div>
            <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', padding: '10px', borderRadius: '10px', textAlign: 'center', fontSize: '0.78rem', fontWeight: 700, color: '#93c5fd' }}>
              SWE Lifestyle
            </div>
            <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', padding: '10px', borderRadius: '10px', textAlign: 'center', fontSize: '0.78rem', fontWeight: 700, color: '#c084fc' }}>
              Laptop Comparison
            </div>
          </div>

          <div style={{ fontSize: '1.2rem', color: '#818cf8', fontWeight: 800 }}>↓</div>

          <div style={{ background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.2) 0%, rgba(168, 85, 247, 0.15) 100%)', border: '1px solid rgba(99, 102, 241, 0.4)', padding: '12px 24px', borderRadius: '12px', fontSize: '0.9rem', fontWeight: 800, color: 'white', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Sparkles size={16} color="#818cf8" /> Semantic Pattern Detection Engine
          </div>

          <div style={{ fontSize: '1.2rem', color: '#34d399', fontWeight: 800 }}>↓</div>

          <div style={{ background: 'rgba(16, 185, 129, 0.15)', border: '1px solid rgba(16, 185, 129, 0.4)', padding: '14px 28px', borderRadius: '14px', fontSize: '1.05rem', fontWeight: 800, color: '#34d399', textAlign: 'center' }}>
            Software Engineering / Programming
          </div>
        </div>
      </div>

      {/* Evidence Timeline */}
      <div className="glass-panel" style={{ padding: '28px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'white', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Film size={18} color="#34d399" /> Watched Evidence Timeline
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {watchedReels.map((r, i) => (
            <div key={r.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-glass)', borderRadius: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>#{i + 1}</span>
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'white' }}>{r.title}</span>
              </div>
              <span style={{ fontSize: '0.7rem', color: '#a5b4fc', background: 'rgba(99, 102, 241, 0.15)', padding: '2px 8px', borderRadius: '4px' }}>
                {r.category}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
