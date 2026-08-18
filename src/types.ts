export type PageRoute = 
  | 'overview' 
  | 'feed' 
  | 'interests' 
  | 'recommendations' 
  | 'lab' 
  | 'settings';

export type ReelCategory = 
  | 'AI' 
  | 'DSA' 
  | 'Java' 
  | 'HLD' 
  | 'Cybersecurity' 
  | 'Cloud' 
  | 'Hardware' 
  | 'Career' 
  | 'Entertainment' 
  | 'Gaming' 
  | 'Gadgets' 
  | 'Hype' 
  | 'Other';

export interface Reel {
  id: string;
  title: string;
  creator: string;
  handle: string;
  avatarUrl: string;
  thumbnailGradient: string;
  duration: number; // in seconds
  category: ReelCategory;
  tags: string[];
  description: string;
  likesCount: string;
  commentsCount: string;
  sharesCount: string;
  transcript: string;
  isHype?: boolean;
  videoUrl?: string;
}

export interface RecommendationOutput {
  currentReelRef: string;
  interestDetected: string;
  why: string;
  recommendedTechReel: string;
  category: 'AI' | 'DSA' | 'Java' | 'HLD' | 'Cybersecurity' | 'Cloud' | 'Hardware' | 'Career' | 'Other';
  whyThisRecommendation: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  confidence: 'High' | 'Medium' | 'Low';
  interestMatchPct?: number;
  educationalValuePct?: number;
  hypeRisk?: 'Low' | 'Medium' | 'High';
  whyNotGenericJava?: string;
  recommendedReelDetails?: {
    description: string;
    keyTakeaway: string;
    estimatedWatchSec: number;
  };
}

export interface ShallowOutput {
  currentReelRef: string;
  keywordMatched: string;
  recommendedReel: string;
  category: string;
  whyThisIsShallow: string;
}

export interface InterestScore {
  name: string;
  scorePct: number;
  category: ReelCategory;
  evidenceCount: number;
}

export interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'warning';
  title: string;
  message: string;
}

export interface InteractionLog {
  reelId: string;
  watchDurationSec: number;
  completed: boolean;
  liked: boolean;
  saved: boolean;
  timestamp: number;
}
