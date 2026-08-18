import React, { useState, useEffect, useRef, useCallback } from 'react';
import type { Reel } from '../types';
import { DEMO_REELS, type DemoReel } from '../data/demoReels';
import { fetchReelVideoUrl } from '../services/pexelsService';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  RotateCcw, 
  Heart, 
  MessageSquare, 
  Bookmark, 
  ChevronLeft, 
  ChevronRight, 
  Brain, 
  Sparkles, 
  Eye, 
  CheckCircle2, 
  Activity,
  Send,
  X
} from 'lucide-react';

interface ReelFeedProps {
  reels?: Reel[];
  currentReel?: Reel;
  onSelectReel?: (reel: Reel) => void;
  watchedReels?: Reel[];
  onInteract?: (reel: Reel, action: 'watch' | 'like' | 'skip' | 'save') => void;
  onAddToast: (title: string, message: string, type?: 'success' | 'info' | 'warning') => void;
}

export const ReelFeed: React.FC<ReelFeedProps> = ({ onAddToast }) => {
  // Active selected demo reel index (0 to 5)
  const [activeDemoIndex, setActiveDemoIndex] = useState<number>(0);
  const activeReel: DemoReel = DEMO_REELS[activeDemoIndex];

  // Video state & HTML5 Video element ref
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [videoUrl, setVideoUrl] = useState<string>('');
  const [_isVideoLoading, setIsVideoLoading] = useState<boolean>(true);
  const [iframeError, setIframeError] = useState<boolean>(false);

  // Playback Telemetry
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(15);


  // AI Analysis State Animation
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(true);
  const [analysisStep, setAnalysisStep] = useState<string>('Reading Reel context...');
  const [displayedMatchScore, setDisplayedMatchScore] = useState<number>(24);

  // Live Behavior Signals
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [isSaved, setIsSaved] = useState<boolean>(false);
  const [rewatchCount, setRewatchCount] = useState<number>(0);
  const [pauseCount, setPauseCount] = useState<number>(0);
  const [hasSkipped, setHasSkipped] = useState<boolean>(false);



  // Load Video URL for active demo reel
  const loadVideo = useCallback(async (reel: DemoReel) => {
    setIsVideoLoading(true);
    setIframeError(false);

    if (reel.videoUrl) {
      setVideoUrl(reel.videoUrl);
      setIsVideoLoading(false);
      return;
    }

    try {
      const url = await fetchReelVideoUrl(reel.index, reel.pexelsQuery);
      setVideoUrl(url || reel.videoUrl);
    } catch (err) {
      console.warn('Error fetching video URL:', err);
      setVideoUrl(reel.videoUrl || 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4');
    } finally {
      setIsVideoLoading(false);
    }
  }, []);

  // Trigger Reel Switch
  const switchReel = useCallback((newIndex: number, isManualSkip = false) => {
    if (newIndex < 0 || newIndex >= DEMO_REELS.length) return;

    if (isManualSkip && currentTime < duration * 0.8) {
      setHasSkipped(true);
    } else if (!isManualSkip) {
      setHasSkipped(false);
    }

    // Reset interaction state
    setActiveDemoIndex(newIndex);
    const targetReel = DEMO_REELS[newIndex];
    setDuration(targetReel.duration || 30);
    setIsLiked(false);
    setIsSaved(false);
    setRewatchCount(0);
    setPauseCount(0);
    setCurrentTime(0);
    setIsPlaying(true);
    setIframeError(false);

    // Run AI Analysis Animation sequence (1.2 seconds)
    setIsAnalyzing(true);
    setAnalysisStep('Reading Reel context...');
    setDisplayedMatchScore(24);

    setTimeout(() => {
      setAnalysisStep('Detecting semantic signals...');
      setDisplayedMatchScore(48);
    }, 400);

    setTimeout(() => {
      setAnalysisStep('Inferring apparent intent...');
      setDisplayedMatchScore(72);
    }, 800);

    setTimeout(() => {
      setIsAnalyzing(false);
      setAnalysisStep('✓ AI analysis complete');
      setDisplayedMatchScore(targetReel.interestMatchPct || 94);
    }, 1200);

    // Fetch / Set video URL
    const nextReel = DEMO_REELS[newIndex];
    loadVideo(nextReel);
  }, [currentTime, duration, loadVideo]);

  // Handle Initial Load
  useEffect(() => {
    switchReel(0);
  }, []);

  // Handle HTML5 Video autoplay & playback state
  useEffect(() => {
    if (!videoRef.current) return;

    videoRef.current.load();
    if (isPlaying) {
      videoRef.current.muted = isMuted;
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Fallback to muted autoplay to bypass browser security policies
          if (videoRef.current) {
            videoRef.current.muted = true;
            setIsMuted(true);
            videoRef.current.play().catch(() => {});
          }
        });
      }
    } else {
      videoRef.current.pause();
    }
  }, [isPlaying, activeDemoIndex, isMuted]);

  // Continuous Watch Progress Timer for Instagram Embed mode (Index <= 3)
  useEffect(() => {
    if (!isPlaying || activeReel.index > 3 || iframeError) return;

    const interval = setInterval(() => {
      setCurrentTime(prev => {
        const totalDuration = activeReel.duration || 25;
        const nextTime = prev + 0.5;
        if (nextTime >= totalDuration) {
          setRewatchCount(r => r + 1);
          return 0;
        }
        return nextTime;
      });
    }, 500);

    return () => clearInterval(interval);
  }, [isPlaying, activeReel.duration, activeDemoIndex, iframeError]);

  // Comment Drawer State
  const [showCommentModal, setShowCommentModal] = useState<boolean>(false);
  const [commentsList, setCommentsList] = useState<Record<string, Array<{ id: string; user: string; text: string; time: string }>>>({
    'demo-reel-1': [
      { id: 'c1', user: 'Alex (FullStack Dev)', text: 'Vibe coding with AI saved me hours of boilerplate writing!', time: '2h ago' },
      { id: 'c2', user: 'Priya (Tech Student)', text: 'Is React still better than Svelte for AI scaffolded apps?', time: '4h ago' }
    ],
    'demo-reel-2': [
      { id: 'c1', user: 'Rahul (Backend Lead)', text: 'SQL query optimization matters 10x more than LeetCode in production!', time: '1h ago' },
      { id: 'c2', user: 'Siddharth (CS Junior)', text: 'Glad someone brought up relational indexing vs DSA!', time: '3h ago' }
    ]
  });
  const [newCommentInput, setNewCommentInput] = useState<string>('');
  const formatTime = (seconds: number) => {
    const s = Math.max(0, Math.floor(seconds || 0));
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // Handle Seek Bar Drag & Jump
  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const targetSec = parseFloat(e.target.value);
    setCurrentTime(targetSec);
    if (videoRef.current) {
      videoRef.current.currentTime = targetSec;
    }
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentInput.trim()) return;

    const reelId = activeReel.id;
    const current = commentsList[reelId] || [];
    const item = {
      id: `c-${Date.now()}`,
      user: 'You (Student User)',
      text: newCommentInput.trim(),
      time: 'Just now'
    };
    setCommentsList({
      ...commentsList,
      [reelId]: [item, ...current]
    });
    setNewCommentInput('');
    onAddToast('Comment Posted!', 'Your feedback was logged to the active discussion.', 'success');
  };

  // Keyboard navigation shortcuts (Left/Right arrow for Previous/Next, Space for Play/Pause)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in an input
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) return;

      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        switchReel(activeDemoIndex - 1, true);
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        switchReel(activeDemoIndex + 1, true);
      } else if (e.key === ' ') {
        e.preventDefault();
        togglePlayPause();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeDemoIndex, switchReel]);

  // Video Event Handlers
  const togglePlayPause = () => {
    setIsPlaying(prev => {
      const next = !prev;
      if (!next) setPauseCount(p => p + 1);
      return next;
    });
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const handleRestart = () => {
    setCurrentTime(0);
    setIsPlaying(true);
    setRewatchCount(prev => prev + 1);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    }
    onAddToast('Reel Rewatched!', `Rewatch telemetry signal (+1) logged for ${activeReel.topic}.`, 'info');
  };

  const handleLikeToggle = () => {
    const next = !isLiked;
    setIsLiked(next);
    onAddToast(next ? 'Reel Liked!' : 'Unliked', next ? `Added positive interest signal for ${activeReel.topic}.` : 'Removed like signal.', 'success');
  };

  const handleSaveToggle = () => {
    const next = !isSaved;
    setIsSaved(next);
    onAddToast(next ? 'Reel Saved!' : 'Unsaved', next ? `Bookmarked "${activeReel.title}" to your profile.` : 'Removed bookmark.', 'info');
  };

  // Calculate watch completion percentage
  const watchCompletionPct = Math.min(100, Math.round((currentTime / (duration || 1)) * 100));

  return (
    <div className="page-container">
      {/* Header */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
          <Eye size={24} color="#facc15" />
          <h2 style={{ fontSize: '1.8rem', fontWeight: 900, textTransform: 'uppercase' }}>
            STUDENT <span className="gradient-text">REEL FEED</span>
          </h2>
        </div>
        <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: 500 }}>
          See what ReelSmart AI observes in real time from short-form video interaction.
        </p>
      </div>

      {/* Main Grid: Left 9:16 Vertical Reel Player + Right AI Intelligence Console */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(340px, 420px) 1fr',
        gap: '28px',
        alignItems: 'start'
      }}>
        {/* Left Column: Vertical 9:16 Reel Player Container & Action Controls */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', position: 'relative' }}>

          {/* Vertical 9:16 Player Container */}
          <div className="glass-panel" style={{
            position: 'relative',
            width: '100%',
            aspectRatio: '9 / 16',
            maxHeight: '680px',
            borderRadius: '24px',
            overflow: 'hidden',
            border: '2px solid rgba(250, 204, 21, 0.3)',
            background: '#04060b',
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.8), 0 0 35px rgba(250, 204, 21, 0.15)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}>
            {/* FLOATING SIDE ARROWS: PREVIOUS REEL (<) */}
            <button
              onClick={() => switchReel(activeDemoIndex - 1, true)}
              disabled={activeDemoIndex === 0}
              style={{
                position: 'absolute',
                top: '50%',
                left: '12px',
                transform: 'translateY(-50%)',
                zIndex: 10,
                width: '46px',
                height: '46px',
                borderRadius: '50%',
                background: activeDemoIndex === 0 ? 'rgba(0,0,0,0.3)' : 'linear-gradient(135deg, #facc15 0%, #ca8a04 100%)',
                border: '1px solid rgba(250, 204, 21, 0.5)',
                color: activeDemoIndex === 0 ? 'rgba(255,255,255,0.2)' : '#000000',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: activeDemoIndex === 0 ? 'not-allowed' : 'pointer',
                boxShadow: activeDemoIndex === 0 ? 'none' : '0 0 25px rgba(250, 204, 21, 0.5)',
                transition: 'all 0.2s ease',
                opacity: activeDemoIndex === 0 ? 0.4 : 1
              }}
              title="Previous Reel (Left Arrow)"
            >
              <ChevronLeft size={26} color={activeDemoIndex === 0 ? 'rgba(255,255,255,0.2)' : '#000000'} />
            </button>

            {/* FLOATING SIDE ARROWS: NEXT REEL (>) */}
            <button
              onClick={() => switchReel(activeDemoIndex + 1, true)}
              disabled={activeDemoIndex === DEMO_REELS.length - 1}
              style={{
                position: 'absolute',
                top: '50%',
                right: '12px',
                transform: 'translateY(-50%)',
                zIndex: 10,
                width: '46px',
                height: '46px',
                borderRadius: '50%',
                background: activeDemoIndex === DEMO_REELS.length - 1 ? 'rgba(0,0,0,0.3)' : 'linear-gradient(135deg, #facc15 0%, #ca8a04 100%)',
                border: '1px solid rgba(250, 204, 21, 0.5)',
                color: activeDemoIndex === DEMO_REELS.length - 1 ? 'rgba(255,255,255,0.2)' : '#000000',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: activeDemoIndex === DEMO_REELS.length - 1 ? 'not-allowed' : 'pointer',
                boxShadow: activeDemoIndex === DEMO_REELS.length - 1 ? 'none' : '0 0 25px rgba(250, 204, 21, 0.5)',
                transition: 'all 0.2s ease',
                opacity: activeDemoIndex === DEMO_REELS.length - 1 ? 0.4 : 1
              }}
              title="Next Reel (Right Arrow)"
            >
              <ChevronRight size={26} color={activeDemoIndex === DEMO_REELS.length - 1 ? 'rgba(255,255,255,0.2)' : '#000000'} />
            </button>
            {/* Instagram Live Reel Embed for 1-3 OR Native HTML5 Video for 4-6 & Fallbacks */}
            {activeReel.instagramUrl && !iframeError && activeReel.index <= 3 ? (
              <iframe
                key={activeReel.id}
                src={`${activeReel.instagramUrl.replace(/\/$/, '')}/embed`}
                style={{
                  position: 'absolute',
                  top: '-70px',
                  left: '-5%',
                  width: '110%',
                  height: 'calc(100% + 220px)',
                  border: 'none',
                  zIndex: 3,
                  borderRadius: '24px',
                  background: '#000000'
                }}
                onError={() => setIframeError(true)}
                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                title={activeReel.title}
              />
            ) : (activeReel.videoUrl || videoUrl) ? (
              <video
                key={activeReel.id}
                ref={videoRef}
                src={activeReel.videoUrl || videoUrl}
                autoPlay
                muted={isMuted}
                playsInline
                loop
                onTimeUpdate={() => {
                  if (videoRef.current) {
                    setCurrentTime(videoRef.current.currentTime);
                  }
                }}
                onLoadedMetadata={() => {
                  if (videoRef.current && videoRef.current.duration) {
                    setDuration(videoRef.current.duration);
                  }
                }}
                onEnded={() => {
                  setRewatchCount(prev => prev + 1);
                  setCurrentTime(0);
                  if (videoRef.current) {
                    videoRef.current.currentTime = 0;
                    videoRef.current.play().catch(() => {});
                  }
                }}
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  zIndex: 3,
                  borderRadius: '24px'
                }}
              />
            ) : null}

            {/* Video Overlay Gradient Shades */}
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to bottom, rgba(0,0,0,0.65) 0%, transparent 30%, transparent 65%, rgba(0,0,0,0.95) 100%)',
              zIndex: 2,
              pointerEvents: 'none'
            }} />

            {/* TOP OVERLAY BAR: Category Badge & AI Analysis Indicator */}
            <div style={{
              position: 'relative',
              zIndex: 10,
              padding: '16px 18px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              {/* Category Badge */}
              <span style={{
                fontSize: '0.68rem',
                fontWeight: 800,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                background: 'rgba(0, 0, 0, 0.65)',
                backdropFilter: 'blur(8px)',
                padding: '4px 10px',
                borderRadius: '8px',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                color: activeReel.isHype ? '#fb7185' : '#a5b4fc'
              }}>
                [ {activeReel.category} ]
              </span>

              {/* AI Analysis Status Badge */}
              <span style={{
                fontSize: '0.68rem',
                fontWeight: 800,
                letterSpacing: '0.04em',
                background: isAnalyzing ? 'rgba(245, 158, 11, 0.25)' : 'rgba(16, 185, 129, 0.25)',
                border: isAnalyzing ? '1px solid rgba(245, 158, 11, 0.5)' : '1px solid rgba(16, 185, 129, 0.5)',
                color: isAnalyzing ? '#fbbf24' : '#34d399',
                padding: '4px 10px',
                borderRadius: '99px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}>
                {isAnalyzing ? (
                  <>
                    <span style={{
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      background: '#fbbf24',
                      animation: 'pulseGlow 1s infinite'
                    }} />
                    [ ● AI ANALYZING ]
                  </>
                ) : (
                  <>
                    <CheckCircle2 size={12} />
                    [ ✓ AI ANALYZED ]
                  </>
                )}
              </span>
            </div>

            {/* Subtle Pause Indicator */}
            {!isPlaying && (
              <div 
                onClick={togglePlayPause}
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  zIndex: 20,
                  background: 'rgba(0, 0, 0, 0.65)',
                  backdropFilter: 'blur(8px)',
                  border: '1px solid rgba(250, 204, 21, 0.4)',
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 0 30px rgba(0,0,0,0.8)'
                }}
              >
                <Play size={28} fill="#facc15" color="#facc15" style={{ marginLeft: '4px' }} />
              </div>
            )}

            {/* BOTTOM REEL INFO & CUSTOM VIDEO CONTROLS */}
            <div style={{
              position: 'relative',
              zIndex: 10,
              padding: '18px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px'
            }}>
              {/* Creator & Caption Overlay */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <img 
                    src={activeReel.avatarUrl} 
                    alt={activeReel.creator}
                    style={{ width: '32px', height: '32px', borderRadius: '50%', border: '2px solid white' }}
                  />
                  <div>
                    <span style={{ fontSize: '0.85rem', fontWeight: 800, color: 'white', display: 'block', lineHeight: 1.1 }}>
                      {activeReel.creator}
                    </span>
                    <span style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.7)' }}>
                      {activeReel.handle}
                    </span>
                  </div>
                </div>

                <h3 style={{ fontSize: '0.95rem', fontWeight: 800, color: 'white', marginTop: '4px', lineHeight: 1.25 }}>
                  "{activeReel.title}"
                </h3>

                <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.85)', lineHeight: 1.35 }}>
                  {activeReel.description}
                </p>
              </div>

              {/* Custom Video Controls */}
              <div style={{
                background: 'rgba(0, 0, 0, 0.65)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                borderRadius: '14px',
                padding: '10px 14px',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px'
              }}>
                {/* Seekable Progress Bar with Exact Real-Time Timestamp (e.g. 0:14 / 0:30) */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <input
                    type="range"
                    min="0"
                    max={duration || activeReel.duration || 30}
                    step="0.1"
                    value={currentTime}
                    onChange={handleSeek}
                    style={{
                      flex: 1,
                      height: '5px',
                      accentColor: '#facc15',
                      cursor: 'pointer'
                    }}
                  />
                  <span style={{
                    fontSize: '0.75rem',
                    fontWeight: 800,
                    fontFamily: 'JetBrains Mono, monospace',
                    color: '#facc15',
                    background: 'rgba(0,0,0,0.6)',
                    padding: '2px 8px',
                    borderRadius: '6px',
                    whiteSpace: 'nowrap'
                  }}>
                    {formatTime(currentTime)} / {formatTime(duration || activeReel.duration || 30)}
                  </span>
                </div>

                {/* Play / Pause / Mute / Restart Buttons */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <button
                      onClick={togglePlayPause}
                      style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}
                      title={isPlaying ? 'Pause' : 'Play'}
                    >
                      {isPlaying ? <Pause size={18} color="#facc15" /> : <Play size={18} fill="#facc15" color="#facc15" />}
                    </button>

                    <button
                      onClick={toggleMute}
                      style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}
                      title={isMuted ? 'Unmute' : 'Mute'}
                    >
                      {isMuted ? <VolumeX size={18} color="#fb7185" /> : <Volume2 size={18} color="#34d399" />}
                    </button>

                    <button
                      onClick={handleRestart}
                      style={{ background: 'none', border: 'none', color: '#facc15', cursor: 'pointer' }}
                      title="Restart Video"
                    >
                      <RotateCcw size={16} color="#facc15" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Under-Reel Action Bar: Like, Comment, Save, Rewatch & Navigation */}
          <div className="glass-panel" style={{
            padding: '14px 18px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '12px',
            background: 'linear-gradient(135deg, rgba(15, 16, 22, 0.95) 0%, rgba(8, 9, 14, 0.95) 100%)',
            border: '1px solid rgba(250, 204, 21, 0.3)'
          }}>
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
              <button 
                onClick={handleLikeToggle}
                style={{
                  background: isLiked ? 'rgba(239, 68, 68, 0.15)' : 'none',
                  border: isLiked ? '1px solid rgba(239, 68, 68, 0.4)' : 'none',
                  color: isLiked ? '#ef4444' : 'var(--text-main)',
                  padding: '6px 10px',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  cursor: 'pointer',
                  fontWeight: 900,
                  fontSize: '0.84rem',
                  transition: 'all 0.2s ease'
                }}
              >
                <Heart size={18} fill={isLiked ? '#ef4444' : 'none'} color={isLiked ? '#ef4444' : '#facc15'} />
                <span>{isLiked ? 'Liked' : 'Like'}</span>
              </button>

              <button 
                onClick={() => setShowCommentModal(true)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#facc15',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  cursor: 'pointer',
                  fontWeight: 900,
                  fontSize: '0.84rem'
                }}
              >
                <MessageSquare size={18} color="#facc15" />
                <span>Comment ({ (commentsList[activeReel.id] || []).length })</span>
              </button>

              <button 
                onClick={handleSaveToggle}
                style={{
                  background: isSaved ? 'rgba(250, 204, 21, 0.15)' : 'none',
                  border: isSaved ? '1px solid rgba(250, 204, 21, 0.4)' : 'none',
                  color: isSaved ? '#facc15' : 'var(--text-main)',
                  padding: '6px 10px',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  cursor: 'pointer',
                  fontWeight: 900,
                  fontSize: '0.84rem',
                  transition: 'all 0.2s ease'
                }}
              >
                <Bookmark size={18} fill={isSaved ? '#facc15' : 'none'} color={isSaved ? '#facc15' : '#facc15'} />
                <span>{isSaved ? 'Saved' : 'Save'}</span>
              </button>

              <button 
                onClick={handleRestart}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#facc15',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  cursor: 'pointer',
                  fontWeight: 900,
                  fontSize: '0.84rem'
                }}
              >
                <RotateCcw size={18} color="#facc15" />
                <span>Rewatch</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: AI Intelligence Console & Demo Selector */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Main AI Understanding Panel */}
          <div className="glass-panel" style={{
            padding: '28px',
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
            background: 'linear-gradient(135deg, rgba(14, 15, 22, 0.95) 0%, rgba(8, 9, 14, 0.95) 100%)',
            border: '1px solid rgba(250, 204, 21, 0.25)',
            boxShadow: '0 20px 50px rgba(0,0,0,0.8), 0 0 30px rgba(250, 204, 21, 0.1)'
          }}>
            {/* Header */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderBottom: '1px solid rgba(250, 204, 21, 0.2)',
              paddingBottom: '16px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '10px',
                  background: 'linear-gradient(135deg, #facc15 0%, #ca8a04 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 0 20px rgba(250, 204, 21, 0.4)'
                }}>
                  <Brain size={20} color="black" />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 900, color: 'white', letterSpacing: '0.02em', textTransform: 'uppercase' }}>
                    WHAT REELSMART <span className="gradient-text">UNDERSTANDS</span>
                  </h3>
                  <p style={{ fontSize: '0.76rem', color: '#facc15', fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                    REAL-TIME SEMANTIC ANALYSIS & INTENT DETECTION
                  </p>
                </div>
              </div>

              {isAnalyzing && (
                <span className="badge-gold" style={{ fontSize: '0.75rem', padding: '4px 12px', borderRadius: '99px', animation: 'pulseGlow 1s infinite' }}>
                  {analysisStep}
                </span>
              )}
            </div>

            {/* 6 Separate & Distinct Telemetry Metric Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
              {/* INTEREST MATCH SCORE Full Width Card */}
              <div style={{
                gridColumn: '1 / -1',
                background: 'linear-gradient(135deg, rgba(250, 204, 21, 0.14) 0%, rgba(18, 20, 28, 0.9) 100%)',
                border: '1px solid rgba(250, 204, 21, 0.4)',
                padding: '14px 18px',
                borderRadius: '16px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '12px'
              }}>
                <div>
                  <span style={{ fontSize: '0.72rem', color: '#facc15', fontWeight: 900, letterSpacing: '0.08em', textTransform: 'uppercase', display: 'block' }}>
                    INFERRED INTEREST MATCH SCORE
                  </span>
                  <span style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.7)', fontWeight: 600 }}>
                    {isAnalyzing ? 'Scanning video intent & semantic signals...' : 'Matches student software & technology profile'}
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '100px', height: '8px', background: 'rgba(0,0,0,0.6)', borderRadius: '99px', overflow: 'hidden' }}>
                    <div style={{ width: `${displayedMatchScore}%`, height: '100%', background: 'linear-gradient(90deg, #fef08a 0%, #facc15 50%, #ca8a04 100%)', borderRadius: '99px', transition: 'all 0.4s ease-out' }} />
                  </div>
                  <span style={{ fontSize: '1.45rem', fontWeight: 900, color: '#facc15', fontFamily: 'var(--font-mono)', transition: 'all 0.3s ease' }}>
                    {displayedMatchScore}%
                  </span>
                </div>
              </div>

              {/* TOPIC Card */}
              <div style={{
                background: 'linear-gradient(135deg, rgba(250, 204, 21, 0.08) 0%, rgba(18, 20, 28, 0.8) 100%)',
                border: '1px solid rgba(250, 204, 21, 0.35)',
                padding: '14px 16px',
                borderRadius: '16px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
                display: 'flex',
                flexDirection: 'column',
                gap: '4px'
              }}>
                <span style={{ fontSize: '0.68rem', color: '#facc15', fontWeight: 900, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                  TOPIC
                </span>
                <span style={{ fontSize: '1.1rem', fontWeight: 900, color: '#ffffff', letterSpacing: '-0.01em' }}>
                  {activeReel.topic}
                </span>
              </div>

              {/* CONTEXT Card */}
              <div style={{
                background: 'linear-gradient(135deg, rgba(56, 189, 248, 0.08) 0%, rgba(18, 20, 28, 0.8) 100%)',
                border: '1px solid rgba(56, 189, 248, 0.35)',
                padding: '14px 16px',
                borderRadius: '16px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
                display: 'flex',
                flexDirection: 'column',
                gap: '4px'
              }}>
                <span style={{ fontSize: '0.68rem', color: '#38bdf8', fontWeight: 900, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                  CONTEXT
                </span>
                <span style={{ fontSize: '1.1rem', fontWeight: 900, color: '#38bdf8', letterSpacing: '-0.01em' }}>
                  {activeReel.context}
                </span>
              </div>

              {/* APPARENT INTENT Card */}
              <div style={{
                background: 'linear-gradient(135deg, rgba(192, 132, 252, 0.08) 0%, rgba(18, 20, 28, 0.8) 100%)',
                border: '1px solid rgba(192, 132, 252, 0.35)',
                padding: '14px 16px',
                borderRadius: '16px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
                display: 'flex',
                flexDirection: 'column',
                gap: '4px'
              }}>
                <span style={{ fontSize: '0.68rem', color: '#c084fc', fontWeight: 900, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                  APPARENT INTENT
                </span>
                <span style={{ fontSize: '1.1rem', fontWeight: 900, color: '#c084fc', letterSpacing: '-0.01em' }}>
                  {activeReel.intent}
                </span>
              </div>

              {/* WATCH COMPLETION Card */}
              <div style={{
                background: 'linear-gradient(135deg, rgba(52, 211, 153, 0.08) 0%, rgba(18, 20, 28, 0.8) 100%)',
                border: '1px solid rgba(52, 211, 153, 0.35)',
                padding: '14px 16px',
                borderRadius: '16px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
                display: 'flex',
                flexDirection: 'column',
                gap: '4px'
              }}>
                <span style={{ fontSize: '0.68rem', color: '#34d399', fontWeight: 900, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                  WATCH COMPLETION
                </span>
                <span style={{ fontSize: '1.15rem', fontWeight: 900, color: '#34d399', fontFamily: 'var(--font-mono)' }}>
                  {watchCompletionPct}%
                </span>
              </div>

              {/* INTEREST SIGNAL Card */}
              <div style={{
                background: activeReel.interestSignalStr === 'HIGH CONFIDENCE' ? 'linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(18, 20, 28, 0.8) 100%)' : 'linear-gradient(135deg, rgba(250, 204, 21, 0.15) 0%, rgba(18, 20, 28, 0.8) 100%)',
                border: activeReel.interestSignalStr === 'HIGH CONFIDENCE' ? '1px solid rgba(16, 185, 129, 0.45)' : '1px solid rgba(250, 204, 21, 0.45)',
                padding: '14px 16px',
                borderRadius: '16px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
                display: 'flex',
                flexDirection: 'column',
                gap: '4px'
              }}>
                <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)', fontWeight: 900, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                  INTEREST SIGNAL
                </span>
                <span style={{
                  fontSize: '1rem',
                  fontWeight: 900,
                  color: activeReel.interestSignalStr === 'HIGH CONFIDENCE' ? '#34d399' : '#facc15'
                }}>
                  {activeReel.interestSignalStr}
                </span>
              </div>

              {/* HYPE RISK Card */}
              <div style={{
                background: activeReel.hypeRiskStr === 'HIGH' ? 'linear-gradient(135deg, rgba(244, 63, 94, 0.15) 0%, rgba(18, 20, 28, 0.8) 100%)' : 'linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(18, 20, 28, 0.8) 100%)',
                border: activeReel.hypeRiskStr === 'HIGH' ? '1px solid rgba(244, 63, 94, 0.45)' : '1px solid rgba(16, 185, 129, 0.45)',
                padding: '14px 16px',
                borderRadius: '16px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
                display: 'flex',
                flexDirection: 'column',
                gap: '4px'
              }}>
                <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)', fontWeight: 900, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                  HYPE RISK
                </span>
                <span style={{
                  fontSize: '1rem',
                  fontWeight: 900,
                  color: activeReel.hypeRiskStr === 'HIGH' ? '#fb7185' : '#34d399'
                }}>
                  {activeReel.hypeRiskStr}
                </span>
              </div>
            </div>

            {/* WHAT AI SEES (Semantic Signal Chips Card) */}
            <div style={{
              background: 'rgba(250, 204, 21, 0.03)',
              border: '1px solid rgba(250, 204, 21, 0.2)',
              borderRadius: '16px',
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px'
            }}>
              <span style={{ fontSize: '0.74rem', fontWeight: 900, color: '#facc15', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                WHAT AI SEES (Semantic Signal Chips):
              </span>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {activeReel.semanticSignals.map(sig => (
                  <span 
                    key={sig} 
                    style={{
                      background: 'linear-gradient(135deg, rgba(250, 204, 21, 0.18) 0%, rgba(234, 179, 8, 0.08) 100%)',
                      border: '1px solid rgba(250, 204, 21, 0.45)',
                      color: '#facc15',
                      fontWeight: 900,
                      fontSize: '0.78rem',
                      padding: '6px 14px',
                      borderRadius: '99px',
                      boxShadow: '0 0 16px rgba(250, 204, 21, 0.25)'
                    }}
                  >
                    {sig}
                  </span>
                ))}
              </div>
            </div>

            {/* Separate AI INTERPRETATION Standalone Card */}
            <div style={{
              background: 'linear-gradient(135deg, rgba(250, 204, 21, 0.08) 0%, rgba(18, 20, 28, 0.95) 100%)',
              border: '1px solid rgba(250, 204, 21, 0.35)',
              borderRadius: '16px',
              padding: '18px',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
              boxShadow: '0 6px 24px rgba(0,0,0,0.6)'
            }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 900, color: '#facc15', letterSpacing: '0.06em', display: 'flex', alignItems: 'center', gap: '8px', textTransform: 'uppercase' }}>
                <Sparkles size={16} color="#facc15" /> AI REASONING INTERPRETATION:
              </span>
              <p style={{ fontSize: '0.88rem', color: '#ffffff', lineHeight: 1.5, fontWeight: 600 }}>
                "{activeReel.aiInterpretation}"
              </p>
            </div>

            {/* Separate LIVE BEHAVIOR SIGNALS Telemetry Card */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.02)',
              border: '1px solid rgba(250, 204, 21, 0.2)',
              borderRadius: '16px',
              padding: '16px 18px',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 900, color: '#facc15', letterSpacing: '0.06em', display: 'flex', alignItems: 'center', gap: '8px', textTransform: 'uppercase' }}>
                  <Activity size={16} color="#facc15" /> LIVE BEHAVIOR SIGNALS
                </span>
                <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)', fontWeight: 700 }}>
                  Demo Telemetry Console
                </span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', fontSize: '0.78rem', fontFamily: 'var(--font-mono)' }}>
                <div style={{ background: 'rgba(0,0,0,0.4)', padding: '6px 10px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
                  Completion: <strong style={{ color: '#34d399', fontWeight: 900 }}>{watchCompletionPct}%</strong>
                </div>
                <div style={{ background: 'rgba(0,0,0,0.4)', padding: '6px 10px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
                  Rewatches: <strong style={{ color: '#facc15', fontWeight: 900 }}>{rewatchCount}</strong>
                </div>
                <div style={{ background: 'rgba(0,0,0,0.4)', padding: '6px 10px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
                  Pauses: <strong style={{ color: '#fbbf24', fontWeight: 900 }}>{pauseCount}</strong>
                </div>
                <div style={{ background: 'rgba(0,0,0,0.4)', padding: '6px 10px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
                  Liked: <strong style={{ color: isLiked ? '#34d399' : 'var(--text-dim)', fontWeight: 900 }}>{isLiked ? 'Yes' : 'No'}</strong>
                </div>
                <div style={{ background: 'rgba(0,0,0,0.4)', padding: '6px 10px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
                  Saved: <strong style={{ color: isSaved ? '#facc15' : 'var(--text-dim)', fontWeight: 900 }}>{isSaved ? 'Yes' : 'No'}</strong>
                </div>
                <div style={{ background: 'rgba(0,0,0,0.4)', padding: '6px 10px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
                  Skipped: <strong style={{ color: hasSkipped ? '#fb7185' : 'var(--text-dim)', fontWeight: 900 }}>{hasSkipped ? 'Yes' : 'No'}</strong>
                </div>
              </div>
            </div>
          </div>

          {/* DYNAMIC REEL SWITCHING SELECTOR GRID */}
          <div className="glass-panel" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h4 style={{ fontSize: '0.9rem', fontWeight: 800, color: 'white' }}>
                SELECT REEL TO SIMULATE SCROLLING
              </h4>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                6 Demo Scenarios
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '10px' }}>
              {DEMO_REELS.map((r, idx) => {
                const isSelected = idx === activeDemoIndex;
                return (
                  <button
                    key={r.id}
                    onClick={() => switchReel(idx, true)}
                    style={{
                      background: isSelected ? 'rgba(99, 102, 241, 0.25)' : 'rgba(18, 24, 38, 0.6)',
                      border: isSelected ? '2px solid #818cf8' : '1px solid var(--border-glass)',
                      borderRadius: '12px',
                      padding: '10px',
                      textAlign: 'left',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '4px'
                    }}
                  >
                    <div style={{ height: '4px', borderRadius: '4px', background: r.thumbnailGradient, marginBottom: '2px' }} />
                    <span style={{ fontSize: '0.65rem', color: r.isHype ? '#fb7185' : '#a5b4fc', fontWeight: 700 }}>
                      [ {r.category} ]
                    </span>
                    <div style={{ fontSize: '0.72rem', fontWeight: 700, color: isSelected ? 'white' : 'var(--text-muted)', height: '30px', overflow: 'hidden', lineHeight: 1.2 }}>
                      {r.title}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Pexels Attribution */}
          <div style={{ textAlign: 'right', fontSize: '0.7rem', color: 'var(--text-dim)' }}>
            Video content provided by{' '}
            <a 
              href="https://www.pexels.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              style={{ color: '#818cf8', textDecoration: 'underline' }}
            >
              Pexels
            </a>
          </div>
        </div>
      </div>

      {/* Interactive Student Comments Modal */}
      {showCommentModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.85)',
          backdropFilter: 'blur(10px)',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px'
        }}>
          <div className="glass-panel" style={{
            width: '100%',
            maxWidth: '520px',
            background: 'linear-gradient(135deg, rgba(15, 16, 22, 0.98) 0%, rgba(8, 9, 14, 0.98) 100%)',
            border: '1px solid rgba(250, 204, 21, 0.4)',
            borderRadius: '24px',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '18px',
            boxShadow: '0 25px 60px rgba(0,0,0,0.9), 0 0 35px rgba(250, 204, 21, 0.2)'
          }}>
            {/* Modal Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(250, 204, 21, 0.2)', paddingBottom: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <MessageSquare size={20} color="#facc15" />
                <h3 style={{ fontSize: '1.1rem', fontWeight: 900, color: 'white', textTransform: 'uppercase' }}>
                  STUDENT COMMENTS & DISCUSSIONS
                </h3>
              </div>
              <button 
                onClick={() => setShowCommentModal(false)}
                style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
              >
                <X size={20} color="#facc15" />
              </button>
            </div>

            {/* Comment List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxHeight: '280px', overflowY: 'auto' }}>
              {(commentsList[activeReel.id] || []).length === 0 ? (
                <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', textAlign: 'center', padding: '20px 0' }}>
                  No comments yet. Be the first student to comment on this Reel!
                </p>
              ) : (
                (commentsList[activeReel.id] || []).map(c => (
                  <div key={c.id} style={{
                    background: 'rgba(250, 204, 21, 0.04)',
                    border: '1px solid rgba(250, 204, 21, 0.18)',
                    borderRadius: '12px',
                    padding: '12px 14px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '4px'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#facc15' }}>{c.user}</span>
                      <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>{c.time}</span>
                    </div>
                    <p style={{ fontSize: '0.85rem', color: 'white', lineHeight: 1.4, margin: 0 }}>
                      {c.text}
                    </p>
                  </div>
                ))
              )}
            </div>

            {/* Post Comment Input Form */}
            <form onSubmit={handleAddComment} style={{ display: 'flex', gap: '10px' }}>
              <input
                type="text"
                placeholder="Write a student comment..."
                value={newCommentInput}
                onChange={e => setNewCommentInput(e.target.value)}
                style={{
                  flex: 1,
                  background: 'rgba(0,0,0,0.5)',
                  border: '1px solid rgba(250, 204, 21, 0.3)',
                  borderRadius: '12px',
                  padding: '10px 14px',
                  color: 'white',
                  fontSize: '0.85rem',
                  outline: 'none'
                }}
              />
              <button
                type="submit"
                className="btn-primary"
                style={{ padding: '10px 18px', borderRadius: '12px', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '6px' }}
              >
                <Send size={16} color="black" /> Post
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
