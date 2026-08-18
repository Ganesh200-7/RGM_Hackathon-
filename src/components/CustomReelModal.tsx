import React, { useState } from 'react';
import type { Reel, ReelCategory } from '../types';
import { PlusCircle, X } from 'lucide-react';

interface CustomReelModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddReel: (reel: Reel) => void;
}

export const CustomReelModal: React.FC<CustomReelModalProps> = ({
  isOpen,
  onClose,
  onAddReel
}) => {
  const [title, setTitle] = useState('');
  const [creator, setCreator] = useState('');
  const [category, setCategory] = useState<ReelCategory>('Java');
  const [transcript, setTranscript] = useState('');
  const [tags, setTags] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !transcript) return;

    const newReel: Reel = {
      id: `custom-reel-${Date.now()}`,
      title,
      creator: creator || 'Custom Creator',
      handle: `@${(creator || 'custom').toLowerCase().replace(/\s+/g, '')}`,
      avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
      thumbnailGradient: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
      duration: 30,
      category,
      tags: tags.split(',').map(t => t.trim()).filter(Boolean),
      description: transcript.slice(0, 100),
      likesCount: '12.5K',
      commentsCount: '450',
      sharesCount: '1.2K',
      transcript
    };

    onAddReel(newReel);
    onClose();
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(0,0,0,0.85)',
      backdropFilter: 'blur(10px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 300,
      padding: '20px'
    }}>
      <div className="glass-panel" style={{
        maxWidth: '520px',
        width: '100%',
        padding: '28px',
        background: '#0d1322',
        border: '1px solid rgba(99, 102, 241, 0.4)',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <PlusCircle size={20} color="#818cf8" /> Add Custom Reel Scenario
          </h3>
          <button 
            onClick={onClose}
            style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div>
            <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
              Reel Title
            </label>
            <input 
              type="text"
              required
              placeholder="e.g., Why C++ Pointers make memory leaks tricky"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={{
                width: '100%',
                background: 'rgba(0,0,0,0.4)',
                border: '1px solid var(--border-glass)',
                borderRadius: '8px',
                padding: '10px',
                color: 'white',
                fontSize: '0.85rem'
              }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <div>
              <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
                Creator Name
              </label>
              <input 
                type="text"
                placeholder="e.g. CodeNinja"
                value={creator}
                onChange={(e) => setCreator(e.target.value)}
                style={{
                  width: '100%',
                  background: 'rgba(0,0,0,0.4)',
                  border: '1px solid var(--border-glass)',
                  borderRadius: '8px',
                  padding: '10px',
                  color: 'white',
                  fontSize: '0.85rem'
                }}
              />
            </div>

            <div>
              <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as ReelCategory)}
                style={{
                  width: '100%',
                  background: 'rgba(0,0,0,0.4)',
                  border: '1px solid var(--border-glass)',
                  borderRadius: '8px',
                  padding: '10px',
                  color: 'white',
                  fontSize: '0.85rem'
                }}
              >
                <option value="Java">Java</option>
                <option value="DSA">DSA</option>
                <option value="HLD">HLD</option>
                <option value="AI">AI</option>
                <option value="Cybersecurity">Cybersecurity</option>
                <option value="Cloud">Cloud</option>
                <option value="Hardware">Hardware</option>
                <option value="Career">Career</option>
                <option value="Gaming">Gaming</option>
              </select>
            </div>
          </div>

          <div>
            <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
              Reel Transcript / Content Context
            </label>
            <textarea 
              required
              rows={3}
              placeholder="e.g. Pointers directly reference memory addresses. If you allocate with new and forget delete, that memory remains un-freed..."
              value={transcript}
              onChange={(e) => setTranscript(e.target.value)}
              style={{
                width: '100%',
                background: 'rgba(0,0,0,0.4)',
                border: '1px solid var(--border-glass)',
                borderRadius: '8px',
                padding: '10px',
                color: 'white',
                fontSize: '0.85rem'
              }}
            />
          </div>

          <div>
            <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
              Tags (comma separated)
            </label>
            <input 
              type="text"
              placeholder="cpp, memory, pointers, backend"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              style={{
                width: '100%',
                background: 'rgba(0,0,0,0.4)',
                border: '1px solid var(--border-glass)',
                borderRadius: '8px',
                padding: '10px',
                color: 'white',
                fontSize: '0.85rem'
              }}
            />
          </div>

          <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '10px' }}>
            <button type="button" onClick={onClose} className="btn-secondary">
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              Add to Feed & Analyze
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
