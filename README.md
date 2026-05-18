
# Placement Prep Platform: Premium Build

The all-in-one, AI-powered platform designed to help candidates ace technical interviews and land their dream careers at top tech companies.

## 🚀 Key Features

- **AI Strategist**: Paste any Job Description (JD) to receive a deterministic 7-day preparation roadmap, round-wise checklists, and predicted technical questions.
- **Interactive Readiness Dashboard**: Track your placement readiness with high-fidelity visual analytics, including skill breakdown radar charts and progress tracking.
- **Practice Ecosystem**: Access a curated library of coding problems categorized by difficulty and topic, with direct integration for live solving.
- **Resources Researcher**: AI-curated study material for complex technical topics like System Design, DSA, and specific tech stacks.
- **Dual-Theme Experience**: Switch between a clean "White" professional theme and the deep, immersive "PurpleBlack" high-tech theme.

## 🛠️ Tech Stack

- **Framework**: Next.js 15+ (App Router)
- **Generative AI**: Google Genkit (Gemini 2.5 Flash)
- **Backend**: Hybrid (Firebase Firestore / Browser Local Storage)
- **Styling**: Tailwind CSS & ShadCN UI

## 🚢 Deployment (Vercel)

This project is optimized for deployment on Vercel. 

### Environment Variables

To enable the AI Strategist and other features, you must configure the following environment variables in your Vercel Project Settings:

1. **Required for AI**:
   - `GOOGLE_GENAI_API_KEY`: Your Google Gemini API Key. Obtain it from [Google AI Studio](https://aistudio.google.com/).

2. **Optional for Cloud Sync**:
   - `NEXT_PUBLIC_FIREBASE_API_KEY`
   - `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
   - `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
   - `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
   - `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
   - `NEXT_PUBLIC_FIREBASE_APP_ID`

*Note: If Firebase variables are not provided, the app will automatically default to **Local Mode**, saving all data to your browser's Local Storage.*

### Steps to Deploy

1. Push your code to a GitHub repository.
2. Connect the repository to Vercel.
3. Add the `GOOGLE_GENAI_API_KEY` variable.
4. Deploy!

---

© 2026 Placement Prep Platform. ALL RIGHTS RESERVED.
