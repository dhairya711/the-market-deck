# 📰 TFG TIMES • The No-Nonsense Personal Broadsheet

> *"The only news that matters. No cap, just high-signal vibes."*

A personalized financial and industry newspaper engineered for investors who are tired of reading clickbait, irrelevant gossip, and promotional fluff. It delivers high-signal, zero-nonsense intelligence dossiers on the exact stocks you own and industries you have invested in.

Built with **React 19**, **Vite**, **Vanilla CSS broadsheet styling**, and zero external framework lock-in. Ready for **1-click production deployment** to Vercel, Netlify, Cloudflare Pages, or GitHub Pages.

---

## ✨ Features

- **🗞️ Authentic Broadsheet Aesthetic & Lock-In Dark Mode**:
  - Classic newspaper masthead typography (Playfair Display, Newsreader, JetBrains Mono).
  - Authentic double rules, vintage issue metadata, live pulsing vibe monitor, and paper grain styling.
  - Seamless toggle between **Cream Broadsheet Paper** (`#fbf8f1`) and **Lock-In Terminal Dark** (`#0a0c10`).
- **⏱️ 15-Minute Auto-Refresh Engine**:
  - Integrated active countdown timer (`Next in: 14:59`).
  - Automatically fetches and synthesizes the latest market catalysts and price moves every 15 minutes.
  - Configurable in settings (`5m`, `15m default`, `30m`, `60m`, or `manual`).
- **🔄 On-Demand Topic & Stock Refresher**:
  - Click the **"Refresh Angle"** button on the Lead Editorial or any Dossier card to generate an instant, updated high-signal intelligence take for that exact topic.
- **💼 Personal Portfolio & Watchlist Customizer**:
  - Add or remove stocks you own (e.g. `$TATAMOTORS`, `$ZOMATO`, `$NVDA`, `$RELIANCE`, `$TSLA`, `$AAPL`, etc.).
  - Select your invested sectors: *Stonks Arena*, *Tech Specs*, *Energy & Grid*, *Metal Shine*, *VC Inflow*, *Regulation Patrol*, *Global Dial*, *Yield Flow*, *Smart Reads*.
  - Choose your preferred editorial tone:
    - **TFG Style** (*High Signal, No Cap, Gen-Z / WSB*)
    - **Wall Street Executive** (*Crisp, Quantitative, Zero Fluff*)
  - Rename your newspaper masthead (e.g., `THE INVESTOR'S CHRONICLE`, `MY DOSSIER`).
  - Everything automatically persists in `localStorage`.
- **⚡ 60-Second "Catch Me Up" Executive Audio Briefing**:
  - High-signal 4-point executive briefing of the day.
  - **Browser Web Speech API** narrator reads out the briefing hands-free with pause/resume controls.
- **📈 Live Market Ticker & Yield Curve Sidebar**:
  - Continuous ticker track showing NIFTY 50, SENSEX, S&P 500, NASDAQ, URTH, EEM, US 10Y, Gold, Crude Oil, and your tracked stocks.
  - Complete Yield Curve Benchmark table with 2Y-10Y inversion/steepening status.
  - Signal-to-Noise gauge displaying filtered fluff statistics.
- **🎲 Brain Gym (touch grass later)**:
  - **Interactive Sudoku**: Playable 9x9 daily grid with cell selection, number keypad, validation check, and reset.
  - **Interactive Canvas Maze**: Smooth keyboard & touch arrow navigation with celebration confetti upon escape.
  - **Finance Wordle**: 5-letter financial word guessing game with on-screen keyboard, colored tiles, and financial clues.
  - **Finance Trivia & Higher/Lower**: Interactive literacy tests and market cap streak challenges.

---

## 🚀 Quick Start (Local Development)

### 1. Prerequisites
- Node.js `v18+` or `v20+`
- npm `v9+` or `v10+`

### 2. Install & Run
```bash
# Clone or navigate to the directory
cd tfg-newspaper

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:5173/` in your browser.

---

## 📦 Production Build

```bash
# Build optimized static bundle
npm run build

# Preview production build locally
npm run preview
```

The production assets will be output cleanly to `dist/` with zero server requirements.

---

## 🌐 1-Click Deployment

This repository is pre-configured with `vercel.json` and `netlify.toml` for zero-configuration deployments:

### Deploy to Vercel
1. Push this directory to your GitHub repository.
2. Go to [vercel.com](https://vercel.com) and click **"Add New Project"**.
3. Import your repository. Vercel will automatically detect Vite.
4. Click **Deploy**. Your newspaper is live!

### Deploy to Netlify
1. Go to [netlify.com](https://netlify.com) and select **"Add new site" -> "Import an existing project"**.
2. Select your repository. Netlify reads `netlify.toml` automatically (`npm run build`, publish directory: `dist`).
3. Click **Deploy Site**.

### Deploy to Cloudflare Pages
- Framework preset: `Vite`
- Build command: `npm run build`
- Build output directory: `dist`

---

## 🛠️ Project Structure

```
tfg-newspaper/
├── public/
├── src/
│   ├── components/
│   │   ├── ArticleModal.jsx      # In-depth reader with audio playback & noise filter
│   │   ├── BrainGym.jsx          # Sudoku, Maze, Wordle, Trivia, Higher/Lower
│   │   ├── CatchMeUpModal.jsx    # 60-second executive audio briefing modal
│   │   ├── CategoryNav.jsx       # Topic filter pills & search bar
│   │   ├── DossierGrid.jsx       # Multi-column high-signal news cards
│   │   ├── Header.jsx            # Broadsheet masthead, countdown timer & actions
│   │   ├── LeadStory.jsx         # Primary lead editorial article card
│   │   ├── Sidebar.jsx           # Yield curves, portfolio radar & noise meter
│   │   ├── TickerTape.jsx        # Live scrolling financial ticker
│   │   ├── SettingsModal.jsx     # Watchlist, sectors, tone, & timer configuration
│   │   └── Toast.jsx             # Notification toasts for refreshes & bookmarks
│   ├── data/
│   │   ├── defaultNews.js        # Curated editorial stories & brain gym data
│   │   └── marketData.js        # Yield curves, indices, and default watchlist
│   ├── services/
│   │   └── newsService.js        # 15m timer, topic generator, storage sync
│   ├── App.jsx                   # Main application coordinator
│   ├── index.css                 # Broadsheet & Lock-in CSS design system
│   └── main.jsx                  # Application entry point
├── index.html                    # Broadsheet Google Fonts & HTML metadata
├── package.json
├── vercel.json                   # Vercel deployment routing & headers
├── netlify.toml                  # Netlify deployment configuration
└── README.md
```

---

## 📄 License
MIT © 2026 TFG Times. No cap, just high-signal vibes.
