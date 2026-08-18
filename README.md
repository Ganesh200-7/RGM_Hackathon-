# ReelSmart AI 🚀
### Educational Short-Form Content Intent Detection & Recommendation Agent

> **Hackathon Submission** | Autonomous AI agent that transforms casual short-form content scrolling into engaging, high-value technology learning paths.

---

## 📌 Problem Statement

Students spend significant time scrolling short-form video content (Instagram Reels, YouTube Shorts, TikTok). Much of this content provides entertainment or humor, but offers little long-term educational or career value.

### **The ReelSmart Solution**
ReelSmart AI is an intelligent recommendation agent that:
1. **Tracks Live Behavior Signals**: Analyzes real-time watch telemetry—completion rate, rewatches (+1), pauses, likes, saves, and skips.
2. **Infers Apparent Intent (Not Just Keywords)**: Extracts deeper context (e.g. watching a Java meme implies interest in *Software Engineering & System Design*, not simple syntax tutorials).
3. **Bypasses Naive Traps**: Uses a built-in trap detector to avoid recommending shallow syntax drills when students watch programming humor.
4. **Filters Out Hype**: Applies anti-hype filtering to block clickbait videos ("10 AI tools to get rich fast") in favor of core engineering topics (System Design, DSA, Architecture).
5. **Recommends High-Value Tech Reels**: Seamlessly steers student scrolling toward career-building technology content.

---

## ✨ Key Features & Architecture

### 1. 🎬 Real-Time Pitch-Black Reel Player (`#feed`)
- Ultra-premium pitch-black obsidian theme (`#070709`) with gold accents (`#facc15`).
- Seamless 9:16 vertical video player supporting Instagram Reels embeds and direct HTML5 video stream fallbacks.
- Live real-time seek bar bound to current timestamp badge (`MM:SS / MM:SS`).

### 2. ⚡ Click-Triggered Progressive AI Intent Scanning
- When a student clicks or switches to a Reel, the AI scanning sequence initializes instantly:
  - **0ms**: `Reading Reel context...` → Score resets to low (**`24%`**).
  - **400ms**: `Detecting semantic signals...` → Rises to **`48%`**.
  - **800ms**: `Inferring apparent intent...` → Rises to **`72%`**.
  - **1200ms**: **`[ ✓ AI ANALYZED ]`** → Score increases to full high match (**`94%`**) with a glowing gold progress bar!

### 3. 🛡️ Built-in Trap Avoidance Engine
- **Java Meme Trap Bypassed**: When a student watches Java meme reels, ReelSmart AI recognizes it as *Core Domain Curiosity* in *Software Engineering* and recommends **System Architecture & Garbage Collection in Production** instead of basic `System.out.println` syntax tutorials.

### 4. 📊 Dynamic Interest Signals & Telemetry Profile (`#interests`)
- Tracks 7 independent interest confidence signals:
  - **Software Engineering**: 90% – 99% *(Primary Career Intent)*
  - **Programming**: 91% – 98% *(Core Domain Curiosity)*
  - **Developer Career**: 72% – 90% *(Workplace & Salary Interest)*
  - **Technology**: 71% – 86% *(General Ecosystem)*
  - **Hardware & Compute**: 60% – 74% *(Dev Rig Benchmarks)*
  - **AI & Machine Learning**: 50% – 64% *(Model News)*
  - **Gaming & Entertainment**: 40% – 54% *(Casual Relief)*

### 5. ⚙️ Hackathon Control Center & Settings (`#settings`)
- **AI Inference Depth**: Toggle `Deep Intent Detection` vs `Shallow Keyword Fallback`.
- **Educational Tech Shift Ratio**: Configure `100% High Career Value Shift`.
- **Schema Enforcer**: Validates the 8 mandatory Hackathon output fields.
- **Gemini AI LLM Integration**: Offline smart inference engine fallback + live Google Gemini API key support.

---

## 📋 Required Hackathon Output Schema

ReelSmart AI strictly formats all recommendations to match the mandatory Hackathon schema:

```json
{
  "CURRENT_REEL": "When NullPointerException strikes (Java Meme)",
  "INTEREST_DETECTED": "Software Engineering & System Architecture",
  "WHY": "Pattern analysis across Java humor and dev rig benchmarks indicates a strong desire for real-world software engineering depth.",
  "RECOMMENDED_TECH_REEL": "How Java Memory Management & Garbage Collection Works in Production",
  "CATEGORY": "Java / Systems",
  "WHY_THIS_RECOMMENDATION": "Bridges familiar Java syntax background with enterprise microservice latency tuning.",
  "DIFFICULTY": "Intermediate",
  "CONFIDENCE": "High (94%)"
}
```

---

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Vanilla CSS Design Tokens (Obsidian Dark Theme, Glassmorphism)
- **Icons**: Lucide React
- **AI Engine**: Built-in Offline Reasoning Engine + Google Gemini AI API Integration
- **Video Player**: HTML5 Video API + Pexels Video API + Instagram Embed Service

---

## 🚀 Getting Started

### 1. Clone & Install Dependencies
```bash
git clone https://github.com/Ganesh200-7/RGM_Hackathon-.git
cd RGM_Hackathon-
npm install
```

### 2. Run Locally in Development Mode
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 3. Build for Production
```bash
npm run build
```

---

## 📝 License
Created for the Hackathon. Designed and built with ❤️ by Ganesh.
