# Placement Prep Platform: Premium Build

The all-in-one, AI-powered platform designed to help candidates ace technical interviews.

## 🚀 Zero-Config Deployment (Vercel)

This project is optimized for deployment on Vercel with no complex setup required.

### 1. Required Environment Variables
To enable the AI features, add the following variable in your Vercel Project Settings:

- `GOOGLE_GENAI_API_KEY`: Your Google Gemini API Key.

### 2. Deployment Mode: "Local-First"
By default, the app runs in **Local Mode**. In this mode:
- **No Database Needed**: All your progress, job analyses, and profile data are saved securely and exclusively to your browser's Local Storage.
- **Privacy Focused**: Your data stays with you.
- **AI Ready**: The AI Strategist works instantly using your Gemini key.

### 3. Optional: Cloud Sync (Firebase)
If you wish to sync data across devices in the future, you can optionally provide:
- `NEXT_PUBLIC_FIREBASE_API_KEY`
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID`

---

© 2026 Placement Prep Platform.
