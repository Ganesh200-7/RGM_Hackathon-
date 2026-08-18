import React, { useState, useEffect } from 'react';
import type { Reel } from '../types';
import { Play, Pause, Heart, MessageCircle, Eye, SkipForward, CheckCircle2 } from 'lucide-react';

interface ReelSimulatorProps {
  reels: Reel[];
  currentReel: Reel;
  onSelectReel: (reel: Reel) => void;
  watchedReels: Reel[];
  onInteract: (reel: Reel, action: 'watch' | 'like' | 'skip') => void;
}

export const ReelSimulator: React.FC<ReelSimulatorProps> = ({
  reels,
  currentReel,
  onSelectReel,
  watchedReels,
  onInteract
}) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  // Reset progress when current reel changes
  useEffect(() => {
    setProgress(0);
    setIsLiked(false);
    setIsPlaying(true);
  }, [currentReel.id]);

  // Simulate video playback progress
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          onInteract(currentReel, 'watch');
          return 100;
        }
        return prev + 4; // Simulated playback
      });
    }, 400);

    return () => clearInterval(interval);
  }, [isPlaying, currentReel, onInteract]);

  const handleLikeToggle = () => {
    setIsLiked(!isLiked);
    onInteract(currentReel, 'like');
  };

  const handleNextReel = () => {
    onInteract(currentReel, 'skip');
    const currentIndex = reels.findIndex(r => r.id === currentReel.id);
    const nextIndex = (currentIndex + 1) % reels.length;
    onSelectReel(reels[nextIndex]);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', height: '100%' }}>
      {/* Feed Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h2 style={{ fontSize: '1.1rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Eye size={18} color="#818cf8" /> Interactive Reel Simulator
          </h2>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            Simulate a student scrolling short-form content
          </p>
        </div>
        <span className="badge-glow" style={{ fontSize: '0.75rem', padding: '4px 10px', borderRadius: '8px' }}>
          {watchedReels.length} Reels Watched in Session
        </span>
      </div>

      {/* Phone Mockup Frame */}
      <div className="glass-panel" style={{
        position: 'relative',
        borderRadius: '32px',
        overflow: 'hidden',
        border: '2px solid rgba(255, 255, 255, 0.12)',
        background: '#05070c',
        boxShadow: '0 20px 50px rgba(0, 0, 0, 0.6), 0 0 30px rgba(99, 102, 241, 0.15)',
        minHeight: '520px',
        display: 'flex',
        flexDirection: 'column'
      }}>
        {/* Dynamic Video Gradient Backdrop */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: currentReel.thumbnailGradient,
          opacity: 0.85,
          zIndex: 1,
          transition: 'all 0.5s ease'
        }}>
          {/* Animated Mesh / Pattern Overlay */}
          <div style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'radial-gradient(circle at 50% 30%, rgba(255,255,255,0.15) 0%, transparent 60%)',
            mixBlendMode: 'overlay'
          }} />
        </div>

        {/* Video Player Header Overlay */}
        <div style={{
          position: 'relative',
          zIndex: 10,
          padding: '16px 20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, transparent 100%)'
        }}>
          <span style={{
            fontSize: '0.7rem',
            fontWeight: 800,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            background: 'rgba(0,0,0,0.4)',
            padding: '3px 8px',
            borderRadius: '6px',
            border: '1px solid rgba(255,255,255,0.2)',
            color: currentReel.isHype ? '#f43f5e' : '#a5b4fc'
          }}>
            {currentReel.isHype ? '⚠️ Hype Content' : currentReel.category}
          </span>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'rgba(255,255,255,0.8)' }}>
              {currentReel.duration}s
            </span>
            <button 
              onClick={() => setIsPlaying(!isPlaying)}
              style={{
                background: 'rgba(0,0,0,0.4)',
                border: 'none',
                color: 'white',
                borderRadius: '50%',
                width: '32px',
                height: '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
            >
              {isPlaying ? <Pause size={14} /> : <Play size={14} />}
            </button>
          </div>
        </div>

        {/* Video Content Center Visual */}
        <div style={{
          position: 'relative',
          zIndex: 5,
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px',
          textAlign: 'center'
        }}>
          <div style={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            background: 'rgba(0,0,0,0.4)',
            backdropFilter: 'blur(10px)',
            border: '2px solid rgba(255,255,255,0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '16px',
            boxShadow: '0 0 30px rgba(0,0,0,0.5)'
          }}>
            <Play size={36} color="white" style={{ opacity: isPlaying ? 0.9 : 0.4 }} />
          </div>

          <h3 style={{
            fontSize: '1.2rem',
            fontWeight: 800,
            color: 'white',
            textShadow: '0 2px 10px rgba(0,0,0,0.8)',
            maxWidth: '280px',
            lineHeight: 1.3
          }}>
            {currentReel.title}
          </h3>
        </div>

        {/* Floating Right Interaction Sidebar */}
        <div style={{
          position: 'absolute',
          right: '16px',
          bottom: '100px',
          zIndex: 15,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '16px'
        }}>
          {/* Like Button */}
          <button 
            onClick={handleLikeToggle}
            style={{
              background: isLiked ? '#ef4444' : 'rgba(0,0,0,0.4)',
              border: '1px solid rgba(255,255,255,0.2)',
              color: 'white',
              borderRadius: '50%',
              width: '44px',
              height: '44px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              boxShadow: isLiked ? '0 0 20px rgba(239, 68, 68, 0.6)' : undefined
            }}
          >
            <Heart size={20} fill={isLiked ? 'white' : 'none'} />
          </button>
          <span style={{ fontSize: '0.7rem', color: 'white', fontWeight: 600 }}>
            {currentReel.likesCount}
          </span>

          {/* Comments Count */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{
              background: 'rgba(0,0,0,0.4)',
              border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: '50%',
              width: '40px',
              height: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <MessageCircle size={18} color="white" />
            </div>
            <span style={{ fontSize: '0.7rem', color: 'white', fontWeight: 600, marginTop: '2px' }}>
              {currentReel.commentsCount}
            </span>
          </div>

          {/* Skip Next Reel */}
          <button 
            onClick={handleNextReel}
            style={{
              background: 'rgba(99, 102, 241, 0.6)',
              border: '1px solid rgba(255,255,255,0.3)',
              color: 'white',
              borderRadius: '50%',
              width: '44px',
              height: '44px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: '0 0 15px rgba(99, 102, 241, 0.5)'
            }}
            title="Next Reel in Feed"
          >
            <SkipForward size={20} />
          </button>
        </div>

        {/* Bottom Reel Details Overlay */}
        <div style={{
          position: 'relative',
          zIndex: 10,
          padding: '20px',
          background: 'linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.6) 70%, transparent 100%)',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px'
        }}>
          {/* Creator Details */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <img 
              src={currentReel.avatarUrl} 
              alt={currentReel.creator}
              style={{ width: '36px', height: '36px', borderRadius: '50%', border: '2px solid white', objectFit: 'cover' }}
            />
            <div>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'white' }}>
                {currentReel.creator}
              </div>
              <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.7)' }}>
                {currentReel.handle}
              </div>
            </div>
          </div>

          {/* Reel Transcript Snippet */}
          <p style={{
            fontSize: '0.78rem',
            color: 'rgba(255,255,255,0.9)',
            lineHeight: 1.4,
            background: 'rgba(255,255,255,0.08)',
            padding: '8px 12px',
            borderRadius: '8px',
            borderLeft: '3px solid #818cf8',
            fontStyle: 'italic'
          }}>
            "{currentReel.transcript}"
          </p>

          {/* Tags list */}
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            {currentReel.tags.map(t => (
              <span key={t} style={{
                fontSize: '0.68rem',
                color: '#a5b4fc',
                background: 'rgba(99, 102, 241, 0.15)',
                padding: '2px 8px',
                borderRadius: '4px'
              }}>
                #{t}
              </span>
            ))}
          </div>

          {/* Playback Progress Bar */}
          <div style={{
            height: '4px',
            width: '100%',
            background: 'rgba(255,255,255,0.2)',
            borderRadius: '2px',
            overflow: 'hidden',
            marginTop: '4px'
          }}>
            <div style={{
              height: '100%',
              width: `${progress}%`,
              background: 'linear-gradient(90deg, #6366f1 0%, #ec4899 100%)',
              transition: 'width 0.3s linear'
            }} />
          </div>
        </div>
      </div>

      {/* Reel Feed Reel Selector Thumbnails */}
      <div>
        <h4 style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '8px' }}>
          Sample Reel Feed (Select to simulate interaction):
        </h4>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))',
          gap: '10px'
        }}>
          {reels.map((r) => {
            const isSelected = r.id === currentReel.id;
            const isWatched = watchedReels.some(w => w.id === r.id);

            return (
              <button
                key={r.id}
                onClick={() => onSelectReel(r)}
                style={{
                  background: isSelected 
                    ? 'rgba(99, 102, 241, 0.25)' 
                    : 'rgba(18, 24, 38, 0.6)',
                  border: isSelected 
                    ? '2px solid #818cf8' 
                    : isWatched 
                    ? '1px solid rgba(16, 185, 129, 0.4)' 
                    : '1px solid var(--border-glass)',
                  borderRadius: '12px',
                  padding: '8px',
                  textAlign: 'left',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                {/* Micro Thumbnail Gradient Bar */}
                <div style={{
                  height: '6px',
                  borderRadius: '4px',
                  background: r.thumbnailGradient,
                  marginBottom: '6px'
                }} />

                <div style={{ fontSize: '0.72rem', fontWeight: 700, color: isSelected ? 'white' : 'var(--text-main)', lineHeight: 1.2, height: '32px', overflow: 'hidden' }}>
                  {r.title}
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '6px' }}>
                  <span style={{ fontSize: '0.65rem', color: r.isHype ? '#f43f5e' : 'var(--text-muted)' }}>
                    {r.category}
                  </span>
                  {isWatched && <CheckCircle2 size={12} color="#34d399" />}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
