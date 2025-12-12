# BMAD Workspace

> **Build • Measure • Analyze • Deploy** - AI-Powered Developer Environment

A modern, glassmorphism-styled developer workspace with integrated AI orchestration, SpecKit documentation, and tiered monetization.

![BMAD Workspace](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=flat-square&logo=tailwind-css)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

---

## ✨ Features

### 🎨 Design
- **Dark Theme** - Deep black background with neon green/yellow accents
- **Glassmorphism UI** - Modern frosted glass effects
- **Responsive Layout** - Works on desktop, tablet, and mobile

### 🛠️ Developer Tools
- **Monaco Code Editor** - Full syntax highlighting, AI completions
- **Live Preview** - Real-time preview with device toggles (Desktop/Tablet/Mobile)
- **BMAD Dashboard** - Build, Measure, Analyze, Deploy status panels

### 🤖 AI Features
- **AI Project Guide** - Guided project phases (Plan → Build → Test → Deploy)
- **AI Assistant** - Chat-based code assistance with quick actions
- **Smart Suggestions** - Priority-based optimization recommendations

### 👔 Admin & Monetization
- **Admin CMS** - User management, revenue tracking, SpecKit documents
- **3-Tier Pricing** - Free ($0), Pro ($19/mo), Enterprise ($99/mo)
- **Usage Tracking** - Credit-based AI usage with upsell prompts

---

## 🚀 Quick Start

### Prerequisites
- Node.js 20+
- Docker & Docker Compose (for production)
- Yarn package manager

### Development

```bash
# Clone the repository
git clone https://github.com/macyb27/Ai-workspace.git
cd Ai-workspace

# Install dependencies
yarn install

# Start development server
yarn dev

# Open http://localhost:3000
```

### Production (Docker)

```bash
# Build and run
docker compose up -d --build

# View logs
docker compose logs -f

# Stop
docker compose down
```

---

## 📁 Project Structure

```
bmad-workspace/
├── app/                          # Next.js App Router
│   ├── globals.css              # Design system & tokens
│   ├── layout.js                # Root layout
│   └── page.js                  # Main page
├── components/
│   ├── ui/                      # Shadcn UI components
│   └── workspace/               # BMAD workspace components
│       ├── Workspace.jsx        # Main workspace container
│       ├── Header.jsx           # Top navigation bar
│       ├── Sidebar.jsx          # File explorer & nav
│       ├── CodeEditor.jsx       # Monaco editor wrapper
│       ├── LivePreview.jsx      # Real-time preview
│       ├── BMADDashboard.jsx    # BMAD metrics panel
│       ├── AIAssistant.jsx      # AI chat panel
│       ├── AIProjectGuide.jsx   # Project guidance panel
│       ├── AdminCMS.jsx         # Admin dashboard
│       ├── PricingModal.jsx     # Subscription tiers
│       ├── SettingsModal.jsx    # API keys & settings
│       ├── UsageTracker.jsx     # Credit usage bar
│       └── OnboardingModal.jsx  # Welcome wizard
├── hooks/                        # Custom React hooks
├── lib/                          # Utilities
├── nginx/                        # Nginx configuration
├── scripts/                      # Deployment scripts
├── Dockerfile                    # Production Docker build
├── docker-compose.yml            # Container orchestration
└── DEPLOYMENT.md                 # Deployment guide
```

---

## 🎨 Design System

### Color Palette

| Token | Color | Usage |
|-------|-------|-------|
| `--background` | `#0a0a0a` | Deep black background |
| `--primary` | `#22c55e` | Neon green accents |
| `--secondary` | `#d4ff00` | Lime yellow highlights |
| `--accent` | `#facc15` | Gold/amber for premium |
| `--muted` | `#1f1f1f` | Subtle backgrounds |

### Typography

- **Headings**: Space Grotesk (300-700)
- **Code**: JetBrains Mono (400-600)

---

## 🖥️ Deployment

### Docker (Recommended)

```bash
docker compose up -d --build
```

### PM2 (Alternative)

```bash
yarn build
pm2 start ecosystem.config.js
```

### Full Server Setup

See [DEPLOYMENT.md](./DEPLOYMENT.md) for complete instructions including:
- Nginx reverse proxy configuration
- SSL certificate setup (Let's Encrypt)
- Firewall configuration
- DNS settings

---

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file:

```env
# Optional: Analytics
NEXT_PUBLIC_GA_ID=your-ga-id

# Optional: API Keys (for future backend)
OPENAI_API_KEY=your-key
MONGO_URL=mongodb://localhost:27017/bmad
```

---

## 📊 Admin Mode

1. Click the **Shield icon** in the sidebar to enable Admin Mode
2. **ADMIN** badge appears in header
3. Click **CMS** button to access:
   - **Overview**: User stats, revenue metrics
   - **Users**: User management table
   - **Revenue**: MRR, ARPU, charts
   - **SpecKit**: Documentation management

---

## 🛣️ Roadmap

- [ ] Backend API integration (FastAPI)
- [ ] Real AI code completion (GPT-4)
- [ ] MongoDB user persistence
- [ ] Stripe payment integration
- [ ] Team collaboration features
- [ ] Custom theme editor

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

MIT License - see [LICENSE](./LICENSE) for details.

---

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - React Framework
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS
- [Shadcn/UI](https://ui.shadcn.com/) - UI Components
- [Framer Motion](https://www.framer.com/motion/) - Animations
- [Monaco Editor](https://microsoft.github.io/monaco-editor/) - Code Editor

---

<p align="center">
  Built with ❤️ using <strong>Emergent AI</strong>
</p>
