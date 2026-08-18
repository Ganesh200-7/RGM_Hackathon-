import { useState, useEffect } from 'react';
import { SAMPLE_REELS } from './data/sampleReels';
import type { Reel, RecommendationOutput, ShallowOutput, PageRoute, ToastMessage } from './types';
import { RecommendationAgent } from './services/aiAgent';

import { Sidebar } from './components/Sidebar';
import { Toast } from './components/Toast';

import { Overview } from './pages/Overview';
import { ReelFeed } from './pages/ReelFeed';
import { MyInterests } from './pages/MyInterests';
import { AIRecommendations } from './pages/AIRecommendations';
import { AILab } from './pages/AILab';
import { Settings } from './pages/Settings';

export function App() {
  const [activePage, setActivePage] = useState<PageRoute>('overview');
  const [reels, _setReels] = useState<Reel[]>(SAMPLE_REELS);
  const [currentReel, setCurrentReel] = useState<Reel>(SAMPLE_REELS[0]);
  const [watchedReels, setWatchedReels] = useState<Reel[]>([SAMPLE_REELS[0]]);
  const [apiKey, setApiKey] = useState<string>('');
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const [deepRecommendation, setDeepRecommendation] = useState<RecommendationOutput | null>(null);
  const [shallowComparison, setShallowComparison] = useState<ShallowOutput | null>(null);

  // Sync hash routing
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') as PageRoute;
      if (['overview', 'feed', 'interests', 'recommendations', 'lab', 'settings'].includes(hash)) {
        setActivePage(hash);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (page: PageRoute) => {
    setActivePage(page);
    window.location.hash = page;
  };

  const addToast = (title: string, message: string, type: 'success' | 'info' | 'warning' = 'info') => {
    const newToast: ToastMessage = { id: `toast-${Date.now()}`, title, message, type };
    setToasts((prev) => [...prev, newToast]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== newToast.id));
    }, 4000);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Run AI Agent inference
  const runAgentInference = async (history: Reel[], active: Reel) => {
    try {
      const { deepOutput, shallowOutput } = await RecommendationAgent.getRecommendation(
        history,
        active,
        apiKey
      );
      setDeepRecommendation(deepOutput);
      setShallowComparison(shallowOutput);
    } catch (err) {
      console.error('Error computing recommendation:', err);
    }
  };

  useEffect(() => {
    runAgentInference(watchedReels, currentReel);
  }, []);

  const handleSelectReel = (reel: Reel) => {
    setCurrentReel(reel);
    const updatedWatched = watchedReels.some((w) => w.id === reel.id)
      ? watchedReels
      : [...watchedReels, reel];

    setWatchedReels(updatedWatched);
    runAgentInference(updatedWatched, reel);
    addToast('Reel Switched', `Analyzing intent for "${reel.title}"`, 'info');
  };

  const handleInteract = (reel: Reel, _action: 'watch' | 'like' | 'skip' | 'save') => {
    const updatedWatched = watchedReels.some((w) => w.id === reel.id)
      ? watchedReels
      : [...watchedReels, reel];
    setWatchedReels(updatedWatched);
  };

  const handleResetSession = () => {
    const initialReel = SAMPLE_REELS[0];
    setCurrentReel(initialReel);
    setWatchedReels([initialReel]);
    runAgentInference([initialReel], initialReel);
  };

  const handleTriggerTrapScenario = () => {
    const trapReels = [SAMPLE_REELS[0], SAMPLE_REELS[1], SAMPLE_REELS[2], SAMPLE_REELS[3]];
    const targetReel = SAMPLE_REELS[3];
    setCurrentReel(targetReel);
    setWatchedReels(trapReels);
    runAgentInference(trapReels, targetReel);
    navigateTo('lab');
    addToast('Trap Test Loaded', 'Evaluated side-by-side benchmark for hackathon trap.', 'warning');
  };

  return (
    <div className="app-layout">
      {/* Persistent Left Sidebar */}
      <Sidebar
        activePage={activePage}
        onNavigate={navigateTo}
        watchedCount={watchedReels.length}
        hasApiKey={Boolean(apiKey)}
      />

      {/* Main Page Area */}
      <main style={{ minHeight: '100vh', overflowY: 'auto' }}>
        {activePage === 'overview' && (
          <Overview
            onNavigate={navigateTo}
            watchedReels={watchedReels}
            recommendation={deepRecommendation}
          />
        )}

        {activePage === 'feed' && (
          <ReelFeed
            reels={reels}
            currentReel={currentReel}
            onSelectReel={handleSelectReel}
            watchedReels={watchedReels}
            onInteract={handleInteract}
            onAddToast={addToast}
          />
        )}

        {activePage === 'interests' && (
          <MyInterests watchedReels={watchedReels} />
        )}

        {activePage === 'recommendations' && (
          <AIRecommendations
            recommendation={deepRecommendation}
            onAddToast={addToast}
          />
        )}

        {activePage === 'lab' && (
          <AILab
            shallowOutput={shallowComparison}
            deepOutput={deepRecommendation}
            onTriggerTrap={handleTriggerTrapScenario}
          />
        )}

        {activePage === 'settings' && (
          <Settings
            apiKey={apiKey}
            setApiKey={setApiKey}
            onResetSession={handleResetSession}
            onAddToast={addToast}
          />
        )}
      </main>

      {/* Toast Notification Container */}
      <Toast toasts={toasts} onDismiss={dismissToast} />
    </div>
  );
}
