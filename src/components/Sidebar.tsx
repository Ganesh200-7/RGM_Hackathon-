import React, { useState } from 'react';
import type { PageRoute } from '../types';
import { 
  LayoutDashboard, 
  Film, 
  Brain, 
  Sparkles, 
  FlaskConical, 
  Settings, 
  Menu, 
  X, 
  Eye
} from 'lucide-react';

interface SidebarProps {
  activePage: PageRoute;
  onNavigate: (page: PageRoute) => void;
  watchedCount: number;
  hasApiKey: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activePage,
  onNavigate,
  watchedCount,
  hasApiKey
}) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems: { id: PageRoute; label: string; icon: React.ReactNode }[] = [
    { id: 'overview', label: 'Overview', icon: <LayoutDashboard size={18} /> },
    { id: 'feed', label: 'Reel Feed', icon: <Film size={18} /> },
    { id: 'interests', label: 'My Interests', icon: <Brain size={18} /> },
    { id: 'recommendations', label: 'AI Recommendations', icon: <Sparkles size={18} /> },
    { id: 'lab', label: 'AI Lab', icon: <FlaskConical size={18} /> },
    { id: 'settings', label: 'Settings', icon: <Settings size={18} /> }
  ];

  const handleNavClick = (id: PageRoute) => {
    onNavigate(id);
    setMobileOpen(false);
  };

  return (
    <>
      {/* Mobile Top Header */}
      <div style={{
        display: 'none',
        padding: '12px 20px',
        background: '#0b0f19',
        borderBottom: '1px solid var(--border-glass)',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'sticky',
        top: 0,
        zIndex: 100
      }} className="mobile-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '32px',
            height: '32px',
            borderRadius: '8px',
            background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Sparkles size={18} color="white" />
          </div>
          <span style={{ fontSize: '1.1rem', fontWeight: 800 }}>ReelSmart AI</span>
        </div>
        <button 
          onClick={() => setMobileOpen(!mobileOpen)}
          style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Persistent Left Sidebar */}
      <aside style={{
        background: 'var(--bg-sidebar)',
        borderRight: '1px solid var(--border-glass)',
        padding: '24px 18px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100vh',
        position: 'sticky',
        top: 0,
        zIndex: 90
      }}>
        {/* Top Brand Logo */}
        <div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            paddingBottom: '24px',
            borderBottom: '1px solid var(--border-glass)',
            marginBottom: '24px'
          }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #facc15 0%, #eab308 50%, #ca8a04 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 25px rgba(250, 204, 21, 0.45)'
            }}>
              <Sparkles size={22} color="black" />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <h1 style={{ fontSize: '1.2rem', fontWeight: 900, letterSpacing: '-0.02em', textTransform: 'uppercase' }}>
                  REELSMART <span className="gradient-text">AI</span>
                </h1>
              </div>
              <span style={{ fontSize: '0.68rem', color: '#facc15', fontWeight: 800, letterSpacing: '0.05em', display: 'block', textTransform: 'uppercase' }}>
                PREMIUM AI ASSISTANT
              </span>
            </div>
          </div>

          {/* Navigation Items */}
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {navItems.map((item) => {
              const isActive = activePage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`sidebar-nav-item ${isActive ? 'active' : ''}`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Footer Session Badge */}
        <div style={{
          background: 'rgba(250, 204, 21, 0.04)',
          border: '1px solid rgba(250, 204, 21, 0.25)',
          borderRadius: '14px',
          padding: '12px 14px',
          display: 'flex',
          flexDirection: 'column',
          gap: '6px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 700 }}>
              Session History
            </span>
            <span className="badge-gold" style={{ fontSize: '0.68rem', padding: '2px 8px', borderRadius: '6px' }}>
              {watchedCount} Reels
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.72rem', color: '#facc15', fontWeight: 800 }}>
            <Eye size={12} color="#facc15" />
            <span>{hasApiKey ? 'Gemini Live Active' : 'Smart Engine Ready'}</span>
          </div>
        </div>
      </aside>
    </>
  );
};
