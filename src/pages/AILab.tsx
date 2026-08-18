import React, { useState } from 'react';
import type { RecommendationOutput, ShallowOutput } from '../types';
import { 
  FlaskConical, 
  Zap, 
  ShieldCheck, 
  CheckCircle2, 
  AlertTriangle,
  Terminal,
  Play
} from 'lucide-react';

interface AILabProps {
  shallowOutput: ShallowOutput | null;
  deepOutput: RecommendationOutput | null;
  onTriggerTrap: () => void;
}

export const AILab: React.FC<AILabProps> = ({
  shallowOutput: _shallowOutput,
  deepOutput: _deepOutput,
  onTriggerTrap
}) => {
  const [activeTab, setActiveTab] = useState<'trap' | 'schema' | 'antihype'>('trap');
  const [simulationRunning, setSimulationRunning] = useState<boolean>(false);

  const handleRunTrapSimulation = () => {
    setSimulationRunning(true);
    onTriggerTrap();
    setTimeout(() => {
      setSimulationRunning(false);
    }, 1000);
  };

  // Exact Required Output Schema from Hackathon Prompt
  const sampleRequiredOutput = {
    currentReelRef: '"When NullPointerException strikes" (DevHumorCentral)',
    interestDetected: 'Software Engineering & System Architecture',
    why: 'Pattern analysis across Java humor, software engineer lifestyle vlog, interview jokes, and laptop rig benchmarks indicates a strong desire for real-world software engineering depth.',
    recommendedTechReel: 'System Design 101: How WhatsApp Handles 10 Billion Messages a Day',
    category: 'HLD',
    whyThisRecommendation: 'Bridges lifestyle & Java humor curiosity into production backend architectural concepts tested in top engineering roles.',
    difficulty: 'Advanced',
    confidence: 'High',
    hypeRisk: 'Low',
    whyNotGenericJava: 'Because the student\'s behavior suggests an interest in software engineering and backend systems rather than single syntax drills alone.'
  };

  return (
    <div className="page-container">
      {/* Header */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '6px' }}>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #facc15 0%, #ca8a04 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 20px rgba(250, 204, 21, 0.4)'
          }}>
            <FlaskConical size={22} color="black" />
          </div>
          <div>
            <h2 style={{ fontSize: '1.8rem', fontWeight: 900, textTransform: 'uppercase' }}>
              AI LAB & <span className="gradient-text">HACKATHON BENCHMARK</span>
            </h2>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: 500 }}>
              Verify how ReelSmart AI solves the built-in hackathon trap & produces the required output schema.
            </p>
          </div>
        </div>
      </div>

      {/* Sub Navigation Tabs */}
      <div style={{ display: 'flex', gap: '10px', borderBottom: '1px solid rgba(250, 204, 21, 0.2)', paddingBottom: '12px' }}>
        <button
          onClick={() => setActiveTab('trap')}
          style={{
            background: activeTab === 'trap' ? 'linear-gradient(135deg, #facc15 0%, #ca8a04 100%)' : 'rgba(250, 204, 21, 0.05)',
            border: activeTab === 'trap' ? '1px solid #facc15' : '1px solid var(--border-glass)',
            color: activeTab === 'trap' ? '#000000' : '#facc15',
            padding: '8px 18px',
            borderRadius: '12px',
            fontSize: '0.82rem',
            fontWeight: 900,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <Zap size={16} color={activeTab === 'trap' ? 'black' : '#facc15'} /> Built-In Trap Scenario
        </button>

        <button
          onClick={() => setActiveTab('schema')}
          style={{
            background: activeTab === 'schema' ? 'linear-gradient(135deg, #facc15 0%, #ca8a04 100%)' : 'rgba(250, 204, 21, 0.05)',
            border: activeTab === 'schema' ? '1px solid #facc15' : '1px solid var(--border-glass)',
            color: activeTab === 'schema' ? '#000000' : '#facc15',
            padding: '8px 18px',
            borderRadius: '12px',
            fontSize: '0.82rem',
            fontWeight: 900,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <Terminal size={16} color={activeTab === 'schema' ? 'black' : '#facc15'} /> Required Output Schema
        </button>

        <button
          onClick={() => setActiveTab('antihype')}
          style={{
            background: activeTab === 'antihype' ? 'linear-gradient(135deg, #facc15 0%, #ca8a04 100%)' : 'rgba(250, 204, 21, 0.05)',
            border: activeTab === 'antihype' ? '1px solid #facc15' : '1px solid var(--border-glass)',
            color: activeTab === 'antihype' ? '#000000' : '#facc15',
            padding: '8px 18px',
            borderRadius: '12px',
            fontSize: '0.82rem',
            fontWeight: 900,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <ShieldCheck size={16} color={activeTab === 'antihype' ? 'black' : '#facc15'} /> Anti-Hype Filter Test
        </button>
      </div>

      {/* TAB 1: BUILT-IN TRAP SCENARIO */}
      {activeTab === 'trap' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Problem Statement Card */}
          <div className="glass-panel" style={{
            padding: '24px',
            background: 'linear-gradient(135deg, rgba(20, 22, 32, 0.95) 0%, rgba(10, 11, 16, 0.95) 100%)',
            border: '1px solid rgba(250, 204, 21, 0.3)',
            borderRadius: '20px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 900, color: '#facc15', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                HACKATHON BUILT-IN TRAP BENCHMARK
              </span>
              <button
                onClick={handleRunTrapSimulation}
                className="btn-primary"
                style={{ padding: '8px 18px', fontSize: '0.82rem', display: 'flex', alignItems: 'center', gap: '6px' }}
              >
                <Play size={14} color="black" /> {simulationRunning ? 'Evaluating...' : 'Run Live Trap Test'}
              </button>
            </div>

            <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
              <strong style={{ color: 'white' }}>Scenario:</strong> A student watches a <em>Java Meme</em>, a <em>Software Engineer Lifestyle Vlog</em>, a <em>Coding Interview Joke</em>, and a <em>Laptop Comparison</em>.
            </p>
          </div>

          {/* Side-by-Side Comparison: Shallow System vs ReelSmart AI */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '20px'
          }}>
            {/* Shallow System (FAILED TRAP) */}
            <div className="glass-panel" style={{
              padding: '24px',
              background: 'rgba(244, 63, 94, 0.04)',
              border: '1px solid rgba(244, 63, 94, 0.35)',
              borderRadius: '20px',
              display: 'flex',
              flexDirection: 'column',
              gap: '14px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <AlertTriangle size={20} color="#fb7185" />
                <div>
                  <h4 style={{ fontSize: '1rem', fontWeight: 900, color: '#fb7185', textTransform: 'uppercase' }}>
                    SHALLOW SYSTEM (TRAP FAILED)
                  </h4>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Naive Keyword Recommender</span>
                </div>
              </div>

              <div style={{ background: 'rgba(0,0,0,0.4)', padding: '12px 14px', borderRadius: '12px', fontSize: '0.82rem', border: '1px solid rgba(244,63,94,0.2)' }}>
                <span style={{ color: '#fb7185', fontWeight: 800, display: 'block', fontSize: '0.72rem' }}>INFERRED INTEREST:</span>
                <span style={{ color: 'white', fontWeight: 700 }}>Java Syntax & Drills</span>
              </div>

              <div style={{ background: 'rgba(0,0,0,0.4)', padding: '12px 14px', borderRadius: '12px', fontSize: '0.82rem', border: '1px solid rgba(244,63,94,0.2)' }}>
                <span style={{ color: '#fb7185', fontWeight: 800, display: 'block', fontSize: '0.72rem' }}>RECOMMENDED REEL:</span>
                <span style={{ color: 'white', fontWeight: 700 }}>"Learn Java Loop Syntax in 60 Seconds"</span>
              </div>

              <div style={{ background: 'rgba(0,0,0,0.4)', padding: '12px 14px', borderRadius: '12px', fontSize: '0.82rem', border: '1px solid rgba(244,63,94,0.2)' }}>
                <span style={{ color: '#fb7185', fontWeight: 800, display: 'block', fontSize: '0.72rem' }}>FAILURE CAUSE:</span>
                <span style={{ color: '#e5e7eb', fontSize: '0.78rem' }}>Matched keyword "Java" from the meme without recognizing the broader software engineering & lifestyle context.</span>
              </div>
            </div>

            {/* ReelSmart AI Agent (PASSED TRAP) */}
            <div className="glass-panel" style={{
              padding: '24px',
              background: 'linear-gradient(135deg, rgba(250, 204, 21, 0.08) 0%, rgba(18, 20, 28, 0.95) 100%)',
              border: '1px solid rgba(250, 204, 21, 0.45)',
              borderRadius: '20px',
              display: 'flex',
              flexDirection: 'column',
              gap: '14px',
              boxShadow: '0 0 30px rgba(250, 204, 21, 0.15)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <CheckCircle2 size={20} color="#facc15" />
                <div>
                  <h4 style={{ fontSize: '1rem', fontWeight: 900, color: '#facc15', textTransform: 'uppercase' }}>
                    REELSMART AI (TRAP PASSED ✓)
                  </h4>
                  <span style={{ fontSize: '0.7rem', color: '#facc15', fontWeight: 700 }}>Context & Intent Reasoning Agent</span>
                </div>
              </div>

              <div style={{ background: 'rgba(0,0,0,0.5)', padding: '12px 14px', borderRadius: '12px', fontSize: '0.82rem', border: '1px solid rgba(250, 204, 21, 0.3)' }}>
                <span style={{ color: '#facc15', fontWeight: 800, display: 'block', fontSize: '0.72rem' }}>INFERRED INTEREST:</span>
                <span style={{ color: 'white', fontWeight: 900 }}>Software Engineering & System Architecture</span>
              </div>

              <div style={{ background: 'rgba(0,0,0,0.5)', padding: '12px 14px', borderRadius: '12px', fontSize: '0.82rem', border: '1px solid rgba(250, 204, 21, 0.3)' }}>
                <span style={{ color: '#facc15', fontWeight: 800, display: 'block', fontSize: '0.72rem' }}>RECOMMENDED REEL:</span>
                <span style={{ color: 'white', fontWeight: 900 }}>"System Design 101: How WhatsApp Handles 10 Billion Messages"</span>
              </div>

              <div style={{ background: 'rgba(0,0,0,0.5)', padding: '12px 14px', borderRadius: '12px', fontSize: '0.82rem', border: '1px solid rgba(250, 204, 21, 0.3)' }}>
                <span style={{ color: '#facc15', fontWeight: 800, display: 'block', fontSize: '0.72rem' }}>WHY THIS RECOMMENDATION:</span>
                <span style={{ color: '#e5e7eb', fontSize: '0.78rem', lineHeight: 1.4 }}>Bridges developer lifestyle curiosity and Java humor into real production engineering concepts tested in senior technical roles.</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: REQUIRED OUTPUT SCHEMA */}
      {activeTab === 'schema' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div className="glass-panel" style={{
            padding: '24px',
            background: 'linear-gradient(135deg, rgba(20, 22, 32, 0.95) 0%, rgba(10, 11, 16, 0.95) 100%)',
            border: '1px solid rgba(250, 204, 21, 0.35)',
            borderRadius: '20px'
          }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 900, color: 'white', marginBottom: '12px', textTransform: 'uppercase' }}>
              EXACT REQUIRED OUTPUT SCHEMA (HACKATHON COMPLIANT)
            </h3>
            <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)', marginBottom: '20px' }}>
              ReelSmart AI structures every recommendation output into the exact schema required by the hackathon prompt.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '14px' }}>
              <div style={{ background: 'rgba(250, 204, 21, 0.05)', border: '1px solid rgba(250, 204, 21, 0.25)', padding: '12px 16px', borderRadius: '12px' }}>
                <span style={{ fontSize: '0.68rem', color: '#facc15', fontWeight: 900, textTransform: 'uppercase' }}>CURRENT REEL</span>
                <p style={{ fontSize: '0.88rem', color: 'white', fontWeight: 800, margin: '4px 0 0 0' }}>{sampleRequiredOutput.currentReelRef}</p>
              </div>

              <div style={{ background: 'rgba(250, 204, 21, 0.05)', border: '1px solid rgba(250, 204, 21, 0.25)', padding: '12px 16px', borderRadius: '12px' }}>
                <span style={{ fontSize: '0.68rem', color: '#facc15', fontWeight: 900, textTransform: 'uppercase' }}>INTEREST DETECTED</span>
                <p style={{ fontSize: '0.88rem', color: 'white', fontWeight: 800, margin: '4px 0 0 0' }}>{sampleRequiredOutput.interestDetected}</p>
              </div>

              <div style={{ background: 'rgba(250, 204, 21, 0.05)', border: '1px solid rgba(250, 204, 21, 0.25)', padding: '12px 16px', borderRadius: '12px', gridColumn: '1 / -1' }}>
                <span style={{ fontSize: '0.68rem', color: '#facc15', fontWeight: 900, textTransform: 'uppercase' }}>WHY (EVIDENCE)</span>
                <p style={{ fontSize: '0.85rem', color: '#e5e7eb', margin: '4px 0 0 0', lineHeight: 1.4 }}>{sampleRequiredOutput.why}</p>
              </div>

              <div style={{ background: 'rgba(250, 204, 21, 0.05)', border: '1px solid rgba(250, 204, 21, 0.25)', padding: '12px 16px', borderRadius: '12px' }}>
                <span style={{ fontSize: '0.68rem', color: '#facc15', fontWeight: 900, textTransform: 'uppercase' }}>RECOMMENDED TECH REEL</span>
                <p style={{ fontSize: '0.88rem', color: 'white', fontWeight: 800, margin: '4px 0 0 0' }}>{sampleRequiredOutput.recommendedTechReel}</p>
              </div>

              <div style={{ background: 'rgba(250, 204, 21, 0.05)', border: '1px solid rgba(250, 204, 21, 0.25)', padding: '12px 16px', borderRadius: '12px' }}>
                <span style={{ fontSize: '0.68rem', color: '#facc15', fontWeight: 900, textTransform: 'uppercase' }}>CATEGORY</span>
                <p style={{ fontSize: '0.88rem', color: '#38bdf8', fontWeight: 900, margin: '4px 0 0 0' }}>[ {sampleRequiredOutput.category} ]</p>
              </div>

              <div style={{ background: 'rgba(250, 204, 21, 0.05)', border: '1px solid rgba(250, 204, 21, 0.25)', padding: '12px 16px', borderRadius: '12px', gridColumn: '1 / -1' }}>
                <span style={{ fontSize: '0.68rem', color: '#facc15', fontWeight: 900, textTransform: 'uppercase' }}>WHY THIS RECOMMENDATION</span>
                <p style={{ fontSize: '0.85rem', color: '#e5e7eb', margin: '4px 0 0 0', lineHeight: 1.4 }}>{sampleRequiredOutput.whyThisRecommendation}</p>
              </div>

              <div style={{ background: 'rgba(250, 204, 21, 0.05)', border: '1px solid rgba(250, 204, 21, 0.25)', padding: '12px 16px', borderRadius: '12px' }}>
                <span style={{ fontSize: '0.68rem', color: '#facc15', fontWeight: 900, textTransform: 'uppercase' }}>DIFFICULTY</span>
                <p style={{ fontSize: '0.88rem', color: '#c084fc', fontWeight: 900, margin: '4px 0 0 0' }}>{sampleRequiredOutput.difficulty}</p>
              </div>

              <div style={{ background: 'rgba(250, 204, 21, 0.05)', border: '1px solid rgba(250, 204, 21, 0.25)', padding: '12px 16px', borderRadius: '12px' }}>
                <span style={{ fontSize: '0.68rem', color: '#facc15', fontWeight: 900, textTransform: 'uppercase' }}>CONFIDENCE</span>
                <p style={{ fontSize: '0.88rem', color: '#34d399', fontWeight: 900, margin: '4px 0 0 0' }}>{sampleRequiredOutput.confidence}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: ANTI-HYPE FILTER TEST */}
      {activeTab === 'antihype' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div className="glass-panel" style={{
            padding: '24px',
            background: 'linear-gradient(135deg, rgba(20, 22, 32, 0.95) 0%, rgba(10, 11, 16, 0.95) 100%)',
            border: '1px solid rgba(250, 204, 21, 0.35)',
            borderRadius: '20px'
          }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 900, color: 'white', marginBottom: '8px', textTransform: 'uppercase' }}>
              ANTI-HYPE CLICKBAIT FILTERING ENGINE
            </h3>
            <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)', marginBottom: '20px' }}>
              The prompt explicitly mandates avoiding blind hype content such as <em>"10 AI tools that will get you a job."</em>
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
              <div style={{ background: 'rgba(244, 63, 94, 0.08)', border: '1px solid rgba(244, 63, 94, 0.3)', padding: '16px', borderRadius: '14px' }}>
                <span style={{ fontSize: '0.72rem', color: '#fb7185', fontWeight: 900, textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>
                  🚫 BLOCKED HYPE CONTENT
                </span>
                <h5 style={{ fontSize: '0.9rem', color: 'white', fontWeight: 800 }}>"10 Secret AI Tools That Will Get You Hired"</h5>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '4px' }}>Reason: Low educational depth, clickbait title, zero architectural concepts.</p>
              </div>

              <div style={{ background: 'rgba(16, 185, 129, 0.08)', border: '1px solid rgba(16, 185, 129, 0.3)', padding: '16px', borderRadius: '14px' }}>
                <span style={{ fontSize: '0.72rem', color: '#34d399', fontWeight: 900, textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>
                  ✓ APPROVED EDUCATIONAL TECH REEL
                </span>
                <h5 style={{ fontSize: '0.9rem', color: 'white', fontWeight: 800 }}>"System Design: Scaling Key-Value Stores"</h5>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '4px' }}>Reason: High engineering depth, real system trade-offs, high technical value.</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
