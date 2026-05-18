# Placement Prep Platform: Premium Build

The all-in-one, AI-powered platform designed to help candidates ace technical interviews.

## 🚀 Key Features

- **AI Strategist**: JD analysis and 7-day roadmaps.
- **Readiness Dashboard**: Visual analytics and skill tracking.
- **Practice Ecosystem**: Curated library of coding problems.
- **Local-First Architecture**: Works entirely in your browser without complex cloud setup.

## 🛠️ Deployment (Vercel)

This project is optimized for deployment on Vercel with minimal configuration.

### Environment Variables

To enable AI features, you only need to provide the following variables in your Vercel Project Settings:

1. **AI Engine**:
   - `GOOGLE_GENAI_API_KEY`: Your Google Gemini API Key.

2. **Client Authentication (Optional)**:
   - `NEXT_PUBLIC_FIREBASE_API_KEY`: Your Firebase API Key.

*Note: If a Project ID is not provided, the app automatically runs in **Local Mode**, saving all progress securely to your browser's Local Storage.*

### Steps to Deploy

1. Connect your repository to Vercel.
2. Add the `GOOGLE_GENAI_API_KEY`.
3. Deploy!

---

© 2026 Placement Prep Platform.