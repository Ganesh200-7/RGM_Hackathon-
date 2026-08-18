import React, { useState } from 'react';
import type { RecommendationOutput } from '../types';
import { Brain, Target, Copy, Check, Play } from 'lucide-react';
import confetti from 'canvas-confetti';

interface RecommendationCardProps {
  recommendation: RecommendationOutput | null;
  loading: boolean;
}

export const RecommendationCard: React.FC<RecommendationCardProps> = ({
  recommendation,
  loading
}) => {
  const [copied, setCopied] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);

  if (loading) {
    return (
      <div className="glass-panel" style={{
        padding: '36px',
        minHeight: '480px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '16px',
        textAlign: 'center'
      }}>
        <div style={{
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          border: '3px solid rgba(99, 102, 241, 0.2)',
          borderTopColor: '#818cf8',
          animation: 'spin 1s linear infinite'
        }} />
        <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
        <div>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>AI Reasoning Engine Active...</h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '4px' }}>
            Evaluating watch history context, inferring deep career intent & filtering hype content...
          </p>
        </div>
      </div>
    );
  }

  if (!recommendation) {
    return (
      <div className="glass-panel" style={{
        padding: '36px',
        minHeight: '480px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        gap: '12px'
      }}>
        <Brain size={48} color="#6b7280" />
        <h3 style={{ fontSize: '1.1rem', fontWeight: 600 }}>No Analysis Available</h3>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          Interact with or select a reel to trigger the AI recommendation agent.
        </p>
      </div>
    );
  }

  const handleCopySchemaText = () => {
    const rawText = `CURRENT REEL: ${recommendation.currentReelRef}
INTEREST DETECTED: ${recommendation.interestDetected}
WHY: ${recommendation.why}
RECOMMENDED TECH REEL: ${recommendation.recommendedTechReel}
CATEGORY: ${recommendation.category}
WHY THIS RECOMMENDATION: ${recommendation.whyThisRecommendation}
DIFFICULTY: ${recommendation.difficulty}
CONFIDENCE: ${recommendation.confidence}`;

    navigator.clipboard.writeText(rawText);
    setCopied(true);
    confetti({ particleCount: 40, spread: 60, origin: { y: 0.8 } });
    setTimeout(() => setCopied(false), 2500);
  };

  const getDifficultyColor = (diff: string) => {
    switch (diff) {
      case 'Beginner': return '#34d399';
      case 'Intermediate': return '#38bdf8';
      case 'Advanced': return '#c084fc';
      default: return '#818cf8';
    }
  };

  const getConfidenceBadge = (conf: string) => {
    switch (conf) {
      case 'High': return { bg: 'rgba(16, 185, 129, 0.15)', border: 'rgba(16, 185, 129, 0.4)', text: '#34d399' };
      case 'Medium': return { bg: 'rgba(245, 158, 11, 0.15)', border: 'rgba(245, 158, 11, 0.4)', text: '#fbbf24' };
      case 'Low': return { bg: 'rgba(239, 68, 68, 0.15)', border: 'rgba(239, 68, 68, 0.4)', text: '#f87171' };
      default: return { bg: 'rgba(99, 102, 241, 0.15)', border: 'rgba(99, 102, 241, 0.4)', text: '#a5b4fc' };
    }
  };

  const confBadge = getConfidenceBadge(recommendation.confidence);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Header Bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '10px',
            background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 15px rgba(16, 185, 129, 0.4)'
          }}>
            <Brain size={20} color="white" />
          </div>
          <div>
            <h2 style={{ fontSize: '1.15rem', fontWeight: 800, letterSpacing: '-0.01em' }}>
              AI Recommendation Agent Output
            </h2>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              Deep intent inference & anti-hype educational matching
            </p>
          </div>
        </div>

        <button 
          onClick={handleCopySchemaText}
          className="btn-secondary"
          style={{ fontSize: '0.8rem', padding: '6px 12px' }}
        >
          {copied ? <Check size={14} color="#34d399" /> : <Copy size={14} />}
          {copied ? 'Copied Required Output!' : 'Copy Required Output'}
        </button>
      </div>

      {/* Primary Schema Output Card */}
      <div className="glass-panel" style={{
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        background: 'rgba(12, 17, 29, 0.85)',
        border: '1px solid rgba(99, 102, 241, 0.25)'
      }}>
        {/* Field 1: CURRENT REEL */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <span style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--text-muted)', letterSpacing: '0.05em' }}>
            CURRENT REEL:
          </span>
          <div style={{
            fontSize: '0.9rem',
            fontWeight: 700,
            color: 'white',
            background: 'rgba(255,255,255,0.04)',
            padding: '10px 14px',
            borderRadius: '10px',
            border: '1px solid var(--border-glass)'
          }}>
            {recommendation.currentReelRef}
          </div>
        </div>

        {/* Field 2 & 3: INTEREST DETECTED & WHY */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.12) 0%, rgba(168, 85, 247, 0.08) 100%)',
          border: '1px solid rgba(99, 102, 241, 0.3)',
          borderRadius: '14px',
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Target size={18} color="#818cf8" />
            <div>
              <span style={{ fontSize: '0.68rem', fontWeight: 800, color: '#a5b4fc', letterSpacing: '0.05em', display: 'block' }}>
                INTEREST DETECTED:
              </span>
              <span style={{ fontSize: '1.05rem', fontWeight: 800, color: 'white' }}>
                {recommendation.interestDetected}
              </span>
            </div>
          </div>

          <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '10px' }}>
            <span style={{ fontSize: '0.68rem', fontWeight: 800, color: 'var(--text-muted)', letterSpacing: '0.05em', display: 'block', marginBottom: '4px' }}>
              WHY (Evidence from watch pattern & transcript context):
            </span>
            <p style={{ fontSize: '0.85rem', color: '#e5e7eb', lineHeight: 1.5 }}>
              {recommendation.why}
            </p>
          </div>
        </div>

        {/* Field 4, 5, 6: RECOMMENDED TECH REEL & CATEGORY & WHY RECOMMENDATION */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.12) 0%, rgba(6, 182, 212, 0.08) 100%)',
          border: '1px solid rgba(16, 185, 129, 0.3)',
          borderRadius: '14px',
          padding: '18px',
          display: 'flex',
          flexDirection: 'column',
          gap: '14px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '10px' }}>
            <div style={{ flex: 1, minWidth: '240px' }}>
              <span style={{ fontSize: '0.68rem', fontWeight: 800, color: '#6ee7b7', letterSpacing: '0.05em', display: 'block' }}>
                RECOMMENDED TECH REEL:
              </span>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'white', marginTop: '2px', lineHeight: 1.3 }}>
                {recommendation.recommendedTechReel}
              </h3>
            </div>

            {/* CATEGORY BADGE */}
            <div style={{
              background: 'rgba(16, 185, 129, 0.2)',
              border: '1px solid rgba(16, 185, 129, 0.5)',
              padding: '6px 14px',
              borderRadius: '99px',
              textAlign: 'center'
            }}>
              <span style={{ fontSize: '0.65rem', color: '#a7f3d0', display: 'block', fontWeight: 700 }}>CATEGORY</span>
              <span style={{ fontSize: '0.9rem', fontWeight: 800, color: 'white' }}>{recommendation.category}</span>
            </div>
          </div>

          <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '10px' }}>
            <span style={{ fontSize: '0.68rem', fontWeight: 800, color: 'var(--text-muted)', letterSpacing: '0.05em', display: 'block', marginBottom: '4px' }}>
              WHY THIS RECOMMENDATION (Connection to deep interest):
            </span>
            <p style={{ fontSize: '0.85rem', color: '#e5e7eb', lineHeight: 1.5 }}>
              {recommendation.whyThisRecommendation}
            </p>
          </div>

          {/* Action to preview recommendation content */}
          {recommendation.recommendedReelDetails && (
            <button 
              onClick={() => setShowPreviewModal(true)}
              className="btn-primary"
              style={{
                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                boxShadow: '0 4px 14px rgba(16, 185, 129, 0.35)',
                fontSize: '0.85rem',
                alignSelf: 'flex-start',
                marginTop: '4px'
              }}
            >
              <Play size={15} /> Preview Recommended Reel Concept
            </button>
          )}
        </div>

        {/* Field 7 & 8: DIFFICULTY & CONFIDENCE */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          <div style={{
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid var(--border-glass)',
            padding: '12px 16px',
            borderRadius: '12px'
          }}>
            <span style={{ fontSize: '0.68rem', fontWeight: 800, color: 'var(--text-muted)', letterSpacing: '0.05em', display: 'block' }}>
              DIFFICULTY:
            </span>
            <span style={{
              fontSize: '1rem',
              fontWeight: 800,
              color: getDifficultyColor(recommendation.difficulty)
            }}>
              {recommendation.difficulty}
            </span>
          </div>

          <div style={{
            background: confBadge.bg,
            border: `1px solid ${confBadge.border}`,
            padding: '12px 16px',
            borderRadius: '12px'
          }}>
            <span style={{ fontSize: '0.68rem', fontWeight: 800, color: 'var(--text-muted)', letterSpacing: '0.05em', display: 'block' }}>
              CONFIDENCE:
            </span>
            <span style={{
              fontSize: '1rem',
              fontWeight: 800,
              color: confBadge.text
            }}>
              {recommendation.confidence}
            </span>
          </div>
        </div>
      </div>

      {/* Recommended Reel Modal Preview */}
      {showPreviewModal && recommendation.recommendedReelDetails && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.8)',
          backdropFilter: 'blur(10px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 300,
          padding: '20px'
        }}>
          <div className="glass-panel" style={{
            maxWidth: '500px',
            width: '100%',
            padding: '28px',
            background: '#0d1322',
            border: '1px solid rgba(16, 185, 129, 0.4)',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <span className="badge-glow" style={{ fontSize: '0.75rem', padding: '4px 10px', borderRadius: '8px' }}>
                Recommended Tech Reel Preview
              </span>
              <button 
                onClick={() => setShowPreviewModal(false)}
                style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', fontSize: '1.2rem' }}
              >
                ✕
              </button>
            </div>

            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'white' }}>
              {recommendation.recommendedTechReel}
            </h3>

            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
              {recommendation.recommendedReelDetails.description}
            </p>

            <div style={{
              background: 'rgba(16, 185, 129, 0.1)',
              border: '1px solid rgba(16, 185, 129, 0.3)',
              borderRadius: '10px',
              padding: '12px',
              fontSize: '0.82rem',
              color: '#a7f3d0'
            }}>
              <strong>Key Educational Takeaway:</strong> {recommendation.recommendedReelDetails.keyTakeaway}
            </div>

            <button 
              onClick={() => setShowPreviewModal(false)}
              className="btn-primary"
              style={{ alignSelf: 'center', marginTop: '8px' }}
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
