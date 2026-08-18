import React, { useState } from 'react';
import { Sparkles, Key, RotateCcw, Zap, ShieldCheck } from 'lucide-react';

interface NavbarProps {
  apiKey: string;
  setApiKey: (key: string) => void;
  onResetSession: () => void;
  onTriggerTrapScenario: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  apiKey,
  setApiKey,
  onResetSession,
  onTriggerTrapScenario
}) => {
  const [showKeyInput, setShowKeyInput] = useState(false);
  const [tempKey, setTempKey] = useState(apiKey);

  const handleSaveKey = (e: React.FormEvent) => {
    e.preventDefault();
    setApiKey(tempKey);
    setShowKeyInput(false);
  };

  return (
    <header style={{
      width: '100%',
      borderBottom: '1px solid var(--border-glass)',
      background: 'rgba(7, 9, 14, 0.85)',
      backdropFilter: 'blur(16px)',
      position: 'sticky',
      top: 0,
      zIndex: 100
    }}>
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '14px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px'
      }}>
        {/* Brand Logo & Title */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 50%, #ec4899 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 20px rgba(99, 102, 241, 0.5)'
          }}>
            <Sparkles size={22} color="white" />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <h1 style={{ fontSize: '1.25rem', fontWeight: 800, letterSpacing: '-0.02em' }}>
                ReelSmart <span className="gradient-text">AI</span>
              </h1>
              <span className="badge-glow" style={{
                fontSize: '0.7rem',
                padding: '2px 8px',
                borderRadius: '99px',
                fontWeight: 700
              }}>
                HACKATHON AGENT
              </span>
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Deep Context Student Reel Recommendation Engine
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
          {/* Quick Trigger Trap Scenario Button */}
          <button 
            onClick={onTriggerTrapScenario}
            className="btn-primary"
            style={{
              background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
              boxShadow: '0 4px 14px rgba(245, 158, 11, 0.35)',
              fontSize: '0.85rem'
            }}
            title="Load the exact trap watch history (Java Meme + Lifestyle + Interview Joke + Laptop Review)"
          >
            <Zap size={16} />
            Test Built-in Trap Scenario
          </button>

          {/* Reset Session */}
          <button 
            onClick={onResetSession}
            className="btn-secondary"
            style={{ fontSize: '0.85rem' }}
            title="Reset watch history and start fresh"
          >
            <RotateCcw size={15} />
            Reset Feed
          </button>

          {/* Optional Gemini API Key Config */}
          <div style={{ position: 'relative' }}>
            <button 
              onClick={() => setShowKeyInput(!showKeyInput)}
              className="btn-secondary"
              style={{
                fontSize: '0.85rem',
                borderColor: apiKey ? 'rgba(16, 185, 129, 0.4)' : undefined,
                color: apiKey ? '#34d399' : undefined
              }}
            >
              {apiKey ? <ShieldCheck size={16} /> : <Key size={16} />}
              {apiKey ? 'Gemini Live' : 'API Key'}
            </button>

            {showKeyInput && (
              <div className="glass-panel" style={{
                position: 'absolute',
                right: 0,
                top: '48px',
                width: '320px',
                padding: '16px',
                zIndex: 200
              }}>
                <h4 style={{ fontSize: '0.9rem', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Key size={15} color="#818cf8" /> Optional Gemini API Key
                </h4>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '12px' }}>
                  ReelSmart AI runs seamlessly with its built-in inference engine out of the box. Add a key to test live Gemini 1.5 LLM calls.
                </p>
                <form onSubmit={handleSaveKey} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <input 
                    type="password"
                    placeholder="AIzaSy..."
                    value={tempKey}
                    onChange={(e) => setTempKey(e.target.value)}
                    style={{
                      background: 'rgba(0, 0, 0, 0.4)',
                      border: '1px solid var(--border-glass)',
                      borderRadius: '8px',
                      padding: '8px 12px',
                      color: 'white',
                      fontSize: '0.85rem'
                    }}
                  />
                  <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                    {apiKey && (
                      <button 
                        type="button" 
                        onClick={() => { setApiKey(''); setTempKey(''); setShowKeyInput(false); }}
                        style={{ background: 'none', border: 'none', color: '#ef4444', fontSize: '0.75rem', cursor: 'pointer' }}
                      >
                        Clear
                      </button>
                    )}
                    <button type="submit" className="btn-primary" style={{ padding: '6px 12px', fontSize: '0.8rem' }}>
                      Save Key
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
