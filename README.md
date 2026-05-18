# Placement Prep Platform: Premium Build

The all-in-one, AI-powered platform designed to help candidates ace technical interviews and land their dream careers at top tech companies.

## 🚀 Key Features

- **AI Strategist**: Paste any Job Description (JD) to receive a deterministic 7-day preparation roadmap, round-wise checklists, and predicted technical questions.
- **Interactive Readiness Dashboard**: Track your placement readiness with high-fidelity visual analytics, including skill breakdown radar charts and progress tracking.
- **Practice Ecosystem**: Access a curated library of coding problems categorized by difficulty and topic, with direct integration for live solving.
- **Resources Researcher**: AI-curated study material for complex technical topics like System Design, DSA, and specific tech stacks.
- **Smart Study Schedule**: Integrated calendar for managing reminders and daily technical tasks.
- **Professional Profile**: Showcase your technical journey, verify milestones, and manage your skill confidence map.
- **Dual-Theme Experience**: Switch between a clean "White" professional theme and the deep, immersive "PurpleBlack" high-tech theme.

## 🛠️ Tech Stack

- **Framework**: [Next.js 15+](https://nextjs.org/) (App Router)
- **Frontend**: [React 19](https://react.dev/), [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [ShadCN UI](https://ui.shadcn.com/)
- **Generative AI**: [Google Genkit](https://firebase.google.com/docs/genkit) (Gemini 2.5 Flash)
- **Backend & Auth**: [Firebase](https://firebase.google.com/) (Firestore, Firebase Authentication)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Charts**: [Recharts](https://recharts.org/)

## 🏁 Getting Started

### Prerequisites

- Node.js 20 or higher
- A Firebase project
- A Gemini API Key (for AI features)

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   Create a `.env` file in the root directory. You will need to obtain your project-specific configuration values from the Firebase Console and your AI provider. Required variables:
   - Firebase API Configuration (API Key, Auth Domain, Project ID, etc.)
   - Provider API Key (for Generative AI features)

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Access the app at `http://localhost:9002`.

## 🚢 Deployment

This project is configured for **Firebase App Hosting**. 

To deploy:
1. Connect your GitHub repository to Firebase App Hosting in the Firebase Console.
2. The `apphosting.yaml` file is pre-configured for optimal performance.

---

© 2026 Placement Prep Platform. ALL RIGHTS RESERVED.
