import React, { useState } from 'react';
import type { RecommendationOutput } from '../types';
import { 
  Sparkles, 
  Play, 
  ThumbsUp, 
  ThumbsDown,
  X
} from 'lucide-react';

interface AIRecommendationsProps {
  recommendation: RecommendationOutput | null;
  onAddToast: (title: string, message: string, type?: 'success' | 'info' | 'warning') => void;
}

export const AIRecommendations: React.FC<AIRecommendationsProps> = ({
  recommendation,
  onAddToast
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedDetail, setSelectedDetail] = useState<RecommendationOutput | null>(null);

  const categories = ['All', 'AI', 'DSA', 'Java', 'HLD', 'Cybersecurity', 'Cloud', 'Hardware', 'Career'];

  // Curated list of recommendations tailored to inferred interests
  const recommendationItems: (RecommendationOutput & { id: string })[] = [
    {
      id: 'rec-1',
      currentReelRef: recommendation?.currentReelRef || '"When NullPointerException strikes" (DevHumorCentral)',
      interestDetected: recommendation?.interestDetected || 'Software Engineering Career & System Architecture',
      why: recommendation?.why || 'Pattern analysis across Java humor, interview memes, and dev rig benchmarks indicates a strong desire for real-world software engineering depth.',
      recommendedTechReel: 'How Java Memory Management & Garbage Collection Works in Production',
      category: 'Java',
      whyThisRecommendation: 'Bridges familiar Java syntax background with enterprise microservice latency tuning.',
      difficulty: 'Intermediate',
      confidence: 'High',
      interestMatchPct: 94,
      educationalValuePct: 92,
      hypeRisk: 'Low',
      whyNotGenericJava: 'Because your behavior suggests an interest in software engineering and programming rather than Java syntax drills alone.'
    },
    {
      id: 'rec-2',
      currentReelRef: '"A Day in the Life of a Google SWE" (TechWithSarah)',
      interestDetected: 'High-Scale System Design & Backend Infrastructure',
      why: 'Watched developer workspace vlogs and Docker benchmark comparisons.',
      recommendedTechReel: 'System Design 101: How WhatsApp Handles 10 Billion Messages a Day',
      category: 'HLD',
      whyThisRecommendation: 'Transitions developer lifestyle curiosity into actual backend architectural concepts tested in top engineering roles.',
      difficulty: 'Advanced',
      confidence: 'High',
      interestMatchPct: 91,
      educationalValuePct: 95,
      hypeRisk: 'Low',
      whyNotGenericJava: 'Focuses on distributed system scaling rather than single-threaded language tutorials.'
    },
    {
      id: 'rec-3',
      currentReelRef: '"Reverse a Binary Tree" (AlgoBro)',
      interestDetected: 'Algorithmic Problem Solving & Data Structures',
      why: 'Engaged with technical interview humor clips.',
      recommendedTechReel: 'Dynamic Programming Decoded: Memoization vs Tabulation',
      category: 'DSA',
      whyThisRecommendation: 'Provides a systematic 3-step framework for solving complex LeetCode hard DP problems.',
      difficulty: 'Intermediate',
      confidence: 'High',
      interestMatchPct: 88,
      educationalValuePct: 90,
      hypeRisk: 'Low',
      whyNotGenericJava: 'Targets fundamental computer science algorithms rather than language-specific boilerplate.'
    },
    {
      id: 'rec-4',
      currentReelRef: '"DeepSeek R1 Explained" (AIUnfiltered)',
      interestDetected: 'AI Architecture & Reasoning Models',
      why: 'Tracked view duration on AI model architecture updates.',
      recommendedTechReel: 'Inside Transformer Attention: How QKV Vectors & KV Caching Work',
      category: 'AI',
      whyThisRecommendation: 'Explains the actual matrix math behind LLM inference instead of surface prompt tricks.',
      difficulty: 'Intermediate',
      confidence: 'High',
      interestMatchPct: 86,
      educationalValuePct: 94,
      hypeRisk: 'Low',
      whyNotGenericJava: 'Deepens your AI mechanics understanding without falling for low-value hype.'
    },
    {
      id: 'rec-5',
      currentReelRef: '"M3 Max vs RTX 4090" (HardwareGeek)',
      interestDetected: 'Hardware Optimization & Systems Performance',
      why: 'Watched Docker compile benchmark tests.',
      recommendedTechReel: 'CPU Cache Misses & Memory Alignment: Writing Cache-Friendly Code',
      category: 'Hardware',
      whyThisRecommendation: 'Shows how CPU L1/L2/L3 cache lines impact software compilation speed.',
      difficulty: 'Advanced',
      confidence: 'Medium',
      interestMatchPct: 82,
      educationalValuePct: 89,
      hypeRisk: 'Low',
      whyNotGenericJava: 'Teaches low-level hardware performance tuning.'
    },
    {
      id: 'rec-6',
      currentReelRef: '"Google SWE NYC" (TechWithSarah)',
      interestDetected: 'Software Engineering Career Progression',
      why: 'Interest in software engineer career growth and workplace culture.',
      recommendedTechReel: 'How to Pass System Design & Coding Reviews for L4/L5 Roles',
      category: 'Career',
      whyThisRecommendation: 'Provides actionable career advice for leveling up from junior to senior engineer.',
      difficulty: 'Beginner',
      confidence: 'High',
      interestMatchPct: 85,
      educationalValuePct: 88,
      hypeRisk: 'Low',
      whyNotGenericJava: 'Guides career trajectory over static syntax.'
    }
  ];

  const filteredItems = activeCategory === 'All' 
    ? recommendationItems 
    : recommendationItems.filter(item => item.category === activeCategory);

  return (
    <div className="page-container">
      {/* Header */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
          <Sparkles size={24} color="#facc15" />
          <h2 style={{ fontSize: '1.8rem', fontWeight: 900, textTransform: 'uppercase' }}>
            RECOMMENDED <span className="gradient-text">FOR YOU</span>
          </h2>
        </div>
        <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', fontWeight: 500 }}>
          High-value technology content selected from your inferred interest profile.
        </p>
      </div>

      {/* Category Filter Pills */}
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        {categories.map((cat) => {
          const isActive = activeCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                background: isActive ? 'linear-gradient(135deg, #facc15 0%, #ca8a04 100%)' : 'rgba(250, 204, 21, 0.05)',
                border: isActive ? '1px solid #facc15' : '1px solid var(--border-glass)',
                color: isActive ? '#000000' : 'var(--text-main)',
                padding: '8px 16px',
                borderRadius: '99px',
                fontSize: '0.82rem',
                fontWeight: isActive ? 900 : 700,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: isActive ? '0 0 18px rgba(250, 204, 21, 0.35)' : 'none'
              }}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Grid of Recommendation Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
        gap: '20px'
      }}>
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="glass-panel"
            onClick={() => setSelectedDetail(item)}
            style={{
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: '16px',
              cursor: 'pointer'
            }}
          >
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <span className="badge-emerald" style={{ fontSize: '0.7rem', padding: '3px 8px', borderRadius: '6px', fontWeight: 700 }}>
                  {item.category}
                </span>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                  {item.difficulty}
                </span>
              </div>

              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'white', lineHeight: 1.3, marginBottom: '8px' }}>
                {item.recommendedTechReel}
              </h3>

              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>
                {item.whyThisRecommendation}
              </p>
            </div>

            {/* Metrics Footer */}
            <div style={{
              background: 'rgba(0,0,0,0.3)',
              border: '1px solid var(--border-glass)',
              borderRadius: '12px',
              padding: '10px 14px',
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 1fr',
              gap: '8px',
              textAlign: 'center'
            }}>
              <div>
                <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', display: 'block' }}>Match</span>
                <span style={{ fontSize: '0.88rem', fontWeight: 800, color: '#818cf8' }}>{item.interestMatchPct}%</span>
              </div>
              <div>
                <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', display: 'block' }}>Edu Value</span>
                <span style={{ fontSize: '0.88rem', fontWeight: 800, color: '#34d399' }}>{item.educationalValuePct}%</span>
              </div>
              <div>
                <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', display: 'block' }}>Hype Risk</span>
                <span style={{ fontSize: '0.88rem', fontWeight: 800, color: item.hypeRisk === 'Low' ? '#34d399' : '#fbbf24' }}>{item.hypeRisk}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Detailed Recommendation View Modal */}
      {selectedDetail && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.85)',
          backdropFilter: 'blur(12px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 300,
          padding: '20px'
        }}>
          <div className="glass-panel" style={{
            maxWidth: '640px',
            width: '100%',
            maxHeight: '90vh',
            overflowY: 'auto',
            padding: '32px',
            background: '#0c1220',
            border: '1px solid rgba(99, 102, 241, 0.4)',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <span className="badge-glow" style={{ fontSize: '0.72rem', padding: '4px 10px', borderRadius: '8px' }}>
                  Detailed Recommendation View
                </span>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'white', marginTop: '6px' }}>
                  {selectedDetail.recommendedTechReel}
                </h3>
              </div>
              <button onClick={() => setSelectedDetail(null)} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}>
                <X size={20} />
              </button>
            </div>

            {/* Required Output Schema Fields */}
            <div className="schema-block" style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.82rem' }}>
              <div><strong style={{ color: '#818cf8' }}>CURRENT REEL:</strong> {selectedDetail.currentReelRef}</div>
              <div><strong style={{ color: '#38bdf8' }}>INTEREST DETECTED:</strong> {selectedDetail.interestDetected}</div>
              <div><strong style={{ color: 'var(--text-muted)' }}>WHY:</strong> {selectedDetail.why}</div>
              <div><strong style={{ color: '#34d399' }}>RECOMMENDED TECH REEL:</strong> {selectedDetail.recommendedTechReel}</div>
              <div><strong style={{ color: '#c084fc' }}>CATEGORY:</strong> {selectedDetail.category}</div>
              <div><strong style={{ color: '#a7f3d0' }}>WHY THIS RECOMMENDATION:</strong> {selectedDetail.whyThisRecommendation}</div>
              <div><strong style={{ color: '#fbbf24' }}>DIFFICULTY:</strong> {selectedDetail.difficulty}</div>
              <div><strong style={{ color: '#34d399' }}>CONFIDENCE:</strong> {selectedDetail.confidence}</div>
            </div>

            {/* "Why this instead of another Java Reel?" Callout Card */}
            <div style={{
              background: 'rgba(99, 102, 241, 0.12)',
              border: '1px solid rgba(99, 102, 241, 0.3)',
              borderRadius: '12px',
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px'
            }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#a5b4fc' }}>
                💡 WHY THIS INSTEAD OF ANOTHER JAVA REEL?
              </span>
              <p style={{ fontSize: '0.85rem', color: 'white', lineHeight: 1.4 }}>
                "{selectedDetail.whyNotGenericJava}"
              </p>
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: '8px' }}>
              <button 
                onClick={() => {
                  onAddToast('Opening Reel Player', `Playing "${selectedDetail.recommendedTechReel}"`, 'success');
                  setSelectedDetail(null);
                }}
                className="btn-primary"
              >
                <Play size={16} /> Watch Reel
              </button>

              <button 
                onClick={() => {
                  onAddToast('Filter Updated', 'Finding more recommendations matching this interest.', 'info');
                  setSelectedDetail(null);
                }}
                className="btn-secondary"
              >
                <ThumbsUp size={16} /> More Like This
              </button>

              <button 
                onClick={() => {
                  onAddToast('Feedback Recorded', 'This recommendation won\'t show again.', 'warning');
                  setSelectedDetail(null);
                }}
                className="btn-secondary"
                style={{ color: '#ef4444' }}
              >
                <ThumbsDown size={16} /> Not Interested
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
