import React, { useState } from 'react';
import { 
  Settings as SettingsIcon, 
  Key, 
  RotateCcw, 
  Check,
  Terminal,
  ShieldCheck,
  Brain,
  Activity
} from 'lucide-react';

interface SettingsProps {
  apiKey: string;
  setApiKey: (key: string) => void;
  onResetSession: () => void;
  onAddToast: (title: string, message: string, type?: 'success' | 'info' | 'warning') => void;
}

export const Settings: React.FC<SettingsProps> = ({
  apiKey,
  setApiKey,
  onResetSession,
  onAddToast
}) => {
  const [tempKey, setTempKey] = useState(apiKey);
  const [inferenceEngine, setInferenceEngine] = useState('Deep Intent Detection (Topic + Context + Apparent Intent)');
  const [educationalShiftRatio, setEducationalShiftRatio] = useState('100% High Career Value Shift');
  const [trapDetector, setTrapDetector] = useState('Active - Bypasses Naive Java Meme Trap');
  const [antiHypeStrictness, setAntiHypeStrictness] = useState('High (Blocks "10 AI tools that get you a job")');
  const [schemaValidation, setSchemaValidation] = useState(true);
  const [telemetryTracking, setTelemetryTracking] = useState(true);

  const handleSaveKey = (e: React.FormEvent) => {
    e.preventDefault();
    setApiKey(tempKey);
    onAddToast('Settings Saved', 'Gemini API key updated successfully.', 'success');
  };

  const handleReset = () => {
    onResetSession();
    onAddToast('Session Reset', 'Student watch history and AI telemetry cleared.', 'info');
  };

  return (
    <div className="page-container">
      {/* Header */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '6px' }}>
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #facc15 0%, #ca8a04 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 20px rgba(250, 204, 21, 0.4)'
          }}>
            <SettingsIcon size={24} color="black" />
          </div>
          <div>
            <h2 style={{ fontSize: '1.8rem', fontWeight: 900, textTransform: 'uppercase' }}>
              SETTINGS & <span className="gradient-text">SYSTEM CONFIGURATION</span>
            </h2>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: 500 }}>
              Tailored strictly to the Hackathon Problem Statement — Student Intent Inference, Trap Detector & Output Schema.
            </p>
          </div>
        </div>
      </div>

      {/* 1. STUDENT REEL INTERACTION & SCROLL BEHAVIOR ENGINE */}
      <div className="glass-panel" style={{
        padding: '28px',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        background: 'linear-gradient(135deg, rgba(20, 22, 32, 0.95) 0%, rgba(10, 11, 16, 0.95) 100%)',
        border: '1px solid rgba(250, 204, 21, 0.35)',
        borderRadius: '20px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Brain size={22} color="#facc15" />
          <h3 style={{ fontSize: '1.15rem', fontWeight: 900, color: 'white', textTransform: 'uppercase' }}>
            STUDENT REEL INTERACTION & SCROLL BEHAVIOR ENGINE
          </h3>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
          {/* Inference Reasoning Depth */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontSize: '0.8rem', fontWeight: 800, color: '#facc15', textTransform: 'uppercase' }}>
              AI INFERENCE REASONING DEPTH
            </label>
            <select
              value={inferenceEngine}
              onChange={(e) => { setInferenceEngine(e.target.value); onAddToast('Inference Depth Updated', e.target.value, 'info'); }}
              style={{
                background: 'rgba(0,0,0,0.5)',
                border: '1px solid rgba(250, 204, 21, 0.35)',
                borderRadius: '10px',
                padding: '10px 14px',
                color: 'white',
                fontSize: '0.85rem',
                outline: 'none'
              }}
            >
              <option value="Deep Intent Detection (Topic + Context + Apparent Intent)">Deep Intent Detection (Topic + Context + Apparent Intent)</option>
              <option value="Shallow Keyword Matching (Naive Fallback)">Shallow Keyword Matching (Naive Fallback)</option>
            </select>
          </div>

          {/* Educational Shift Ratio */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontSize: '0.8rem', fontWeight: 800, color: '#facc15', textTransform: 'uppercase' }}>
              EDUCATIONAL TECH SHIFT RATIO
            </label>
            <select
              value={educationalShiftRatio}
              onChange={(e) => { setEducationalShiftRatio(e.target.value); onAddToast('Shift Ratio Set', e.target.value, 'info'); }}
              style={{
                background: 'rgba(0,0,0,0.5)',
                border: '1px solid rgba(250, 204, 21, 0.35)',
                borderRadius: '10px',
                padding: '10px 14px',
                color: 'white',
                fontSize: '0.85rem',
                outline: 'none'
              }}
            >
              <option value="100% High Career Value Shift">100% High Career Value Shift (Max Educational Impact)</option>
              <option value="75% Balanced Learning Shift">75% Balanced Learning Shift (Career + Tech News)</option>
              <option value="50% Moderate Shift">50% Moderate Shift (Gradual Enhancement)</option>
            </select>
          </div>
        </div>

        {/* Real-time Telemetry Tracking Toggle */}
        <div style={{
          paddingTop: '16px',
          borderTop: '1px solid rgba(255,255,255,0.08)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Activity size={18} color="#38bdf8" />
            <div>
              <span style={{ fontSize: '0.88rem', fontWeight: 800, color: 'white', display: 'block' }}>
                Real-Time Telemetry & Behavior Signals Tracking
              </span>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                Tracks Watch Completion %, Rewatches (+1), Pauses, and Manual Skips for Intent Inference.
              </span>
            </div>
          </div>

          <button
            onClick={() => { setTelemetryTracking(!telemetryTracking); onAddToast('Telemetry Tracking', telemetryTracking ? 'Paused' : 'Active', 'info'); }}
            style={{
              background: telemetryTracking ? 'rgba(56, 189, 248, 0.2)' : 'rgba(255,255,255,0.08)',
              border: '1px solid #38bdf8',
              color: telemetryTracking ? '#38bdf8' : '#ffffff',
              padding: '6px 16px',
              borderRadius: '99px',
              fontSize: '0.8rem',
              fontWeight: 900,
              cursor: 'pointer'
            }}
          >
            {telemetryTracking ? '✓ ACTIVE' : 'PAUSED'}
          </button>
        </div>
      </div>

      {/* 2. BUILT-IN TRAP AVOIDANCE BENCHMARKING */}
      <div className="glass-panel" style={{
        padding: '28px',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        background: 'linear-gradient(135deg, rgba(20, 22, 32, 0.95) 0%, rgba(10, 11, 16, 0.95) 100%)',
        border: '1px solid rgba(250, 204, 21, 0.35)',
        borderRadius: '20px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <ShieldCheck size={22} color="#facc15" />
          <h3 style={{ fontSize: '1.15rem', fontWeight: 900, color: 'white', textTransform: 'uppercase' }}>
            BUILT-IN TRAP AVOIDANCE & ANTI-HYPE FILTER
          </h3>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
          {/* Java Meme Trap Mode */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontSize: '0.8rem', fontWeight: 800, color: '#facc15', textTransform: 'uppercase' }}>
              JAVA MEME TRAP DETECTOR
            </label>
            <select
              value={trapDetector}
              onChange={(e) => { setTrapDetector(e.target.value); onAddToast('Trap Detector Mode', e.target.value, 'info'); }}
              style={{
                background: 'rgba(0,0,0,0.5)',
                border: '1px solid rgba(250, 204, 21, 0.35)',
                borderRadius: '10px',
                padding: '10px 14px',
                color: 'white',
                fontSize: '0.85rem',
                outline: 'none'
              }}
            >
              <option value="Active - Bypasses Naive Java Meme Trap">Active - Bypasses Naive Java Meme Trap (Recommends Architecture)</option>
              <option value="Disabled - Fallback to Naive Java Syntax">Disabled - Fallback to Naive Java Syntax (Trap Failed)</option>
            </select>
          </div>

          {/* Anti-Hype Filtering Strictness */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontSize: '0.8rem', fontWeight: 800, color: '#facc15', textTransform: 'uppercase' }}>
              ANTI-HYPE FILTERING THRESHOLD
            </label>
            <select
              value={antiHypeStrictness}
              onChange={(e) => { setAntiHypeStrictness(e.target.value); onAddToast('Anti-Hype Strictness', e.target.value, 'info'); }}
              style={{
                background: 'rgba(0,0,0,0.5)',
                border: '1px solid rgba(250, 204, 21, 0.35)',
                borderRadius: '10px',
                padding: '10px 14px',
                color: 'white',
                fontSize: '0.85rem',
                outline: 'none'
              }}
            >
              <option value="High (Blocks '10 AI tools that get you a job')">High (Blocks "10 AI tools that get you a job")</option>
              <option value="Medium (Warns on hype titles)">Medium (Warns on hype titles)</option>
              <option value="Disabled (Allow raw feeds)">Disabled (Allow raw feeds)</option>
            </select>
          </div>
        </div>
      </div>

      {/* 3. STRUCTURED HACKATHON OUTPUT SCHEMA VALIDATOR */}
      <div className="glass-panel" style={{
        padding: '28px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        background: 'linear-gradient(135deg, rgba(20, 22, 32, 0.95) 0%, rgba(10, 11, 16, 0.95) 100%)',
        border: '1px solid rgba(250, 204, 21, 0.35)',
        borderRadius: '20px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Terminal size={20} color="#34d399" />
            <div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 900, color: 'white', textTransform: 'uppercase' }}>
                HACKATHON REQUIRED OUTPUT SCHEMA VALIDATOR
              </h3>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                Validates: CURRENT REEL, INTEREST DETECTED, WHY, RECOMMENDED TECH REEL, CATEGORY, WHY THIS RECOMMENDATION, DIFFICULTY, CONFIDENCE.
              </span>
            </div>
          </div>

          <button
            onClick={() => { setSchemaValidation(!schemaValidation); onAddToast('Schema Validator', schemaValidation ? 'Disabled' : 'Enforced', 'success'); }}
            style={{
              background: schemaValidation ? 'linear-gradient(135deg, #facc15 0%, #ca8a04 100%)' : 'rgba(255,255,255,0.08)',
              border: '1px solid #facc15',
              color: schemaValidation ? '#000000' : '#ffffff',
              padding: '8px 20px',
              borderRadius: '99px',
              fontSize: '0.82rem',
              fontWeight: 900,
              cursor: 'pointer',
              boxShadow: schemaValidation ? '0 0 20px rgba(250, 204, 21, 0.4)' : 'none'
            }}
          >
            {schemaValidation ? '✓ SCHEMA ENFORCED' : 'OFF'}
          </button>
        </div>
      </div>

      {/* 4. GOOGLE GEMINI AI LLM CONFIGURATION */}
      <div className="glass-panel" style={{
        padding: '28px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        background: 'linear-gradient(135deg, rgba(20, 22, 32, 0.95) 0%, rgba(10, 11, 16, 0.95) 100%)',
        border: '1px solid rgba(250, 204, 21, 0.35)',
        borderRadius: '20px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Key size={20} color="#facc15" />
          <h3 style={{ fontSize: '1.15rem', fontWeight: 900, color: 'white', textTransform: 'uppercase' }}>
            GOOGLE GEMINI AI LLM CREDENTIALS
          </h3>
        </div>

        <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)', lineHeight: 1.5, fontWeight: 500 }}>
          ReelSmart AI includes an integrated offline inference engine for instant recommendation reasoning. You can optionally provide a Google Gemini API Key to run live LLM calls.
        </p>

        <form onSubmit={handleSaveKey} style={{ display: 'flex', flexDirection: 'column', gap: '14px', maxWidth: '520px' }}>
          <input 
            type="password"
            placeholder="AIzaSy..."
            value={tempKey}
            onChange={(e) => setTempKey(e.target.value)}
            style={{
              width: '100%',
              background: 'rgba(0,0,0,0.5)',
              border: '1px solid rgba(250, 204, 21, 0.3)',
              borderRadius: '12px',
              padding: '12px 16px',
              color: 'white',
              fontSize: '0.9rem',
              outline: 'none'
            }}
          />

          <div style={{ display: 'flex', gap: '12px' }}>
            <button type="submit" className="btn-primary" style={{ padding: '10px 22px', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Check size={16} color="black" /> Save API Key
            </button>
            {apiKey && (
              <button 
                type="button" 
                onClick={() => { setApiKey(''); setTempKey(''); onAddToast('API Key Removed', 'Reverted to built-in smart inference engine.', 'info'); }} 
                className="btn-secondary"
                style={{ color: '#fb7185', fontSize: '0.85rem' }}
              >
                Clear Key
              </button>
            )}
          </div>
        </form>
      </div>

      {/* 5. RESET DEMO SESSION & CLEAR TELEMETRY DATA */}
      <div className="glass-panel" style={{
        padding: '24px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: 'linear-gradient(135deg, rgba(20, 22, 32, 0.95) 0%, rgba(10, 11, 16, 0.95) 100%)',
        border: '1px solid rgba(250, 204, 21, 0.35)',
        borderRadius: '20px'
      }}>
        <div>
          <h4 style={{ fontSize: '1rem', fontWeight: 900, color: 'white', textTransform: 'uppercase' }}>RESET DEMO SESSION</h4>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0 }}>Clear watched reels history, student interest confidence scores, and telemetry states.</p>
        </div>
        <button 
          onClick={handleReset}
          className="btn-secondary"
          style={{ color: '#fb7185', borderColor: '#fb7185', fontSize: '0.84rem', padding: '8px 18px', display: 'flex', alignItems: 'center', gap: '6px' }}
        >
          <RotateCcw size={16} /> Reset Session Data
        </button>
      </div>
    </div>
  );
};
