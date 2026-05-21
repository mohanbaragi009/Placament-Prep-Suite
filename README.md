# Placement Prep Platform: Premium Build

The all-in-one, AI-powered platform designed to help candidates ace technical interviews.

## 🚀 Deployment (Vercel)

This project is optimized for deployment on Vercel with zero-config requirement.

### Environment Variables

To enable AI features, you only need to provide the following variable in your Vercel Project Settings:

1. **AI Engine (Mandatory)**:
   - `GOOGLE_GENAI_API_KEY`: Your Google Gemini API Key.

2. **Cloud Sync (Optional)**:
   - `NEXT_PUBLIC_FIREBASE_API_KEY`: Your Firebase API Key.
   - `NEXT_PUBLIC_FIREBASE_PROJECT_ID`: Your Firebase Project ID.

**Note on "Local Mode":**
If Firebase variables are not provided, the app automatically runs in **Local Mode**. In this mode, all your progress, profile data, and job analyses are saved securely and exclusively to your browser's Local Storage.

### Steps to Deploy

1. Connect your repository to Vercel.
2. Add the `GOOGLE_GENAI_API_KEY`.
3. Deploy!

---

© 2026 Placement Prep Platform.
