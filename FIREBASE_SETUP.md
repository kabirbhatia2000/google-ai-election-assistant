# 🔥 Firebase Setup Guide

## 1. Enable Google Authentication
1. Go to the [Firebase Console](https://console.firebase.google.com/).
2. Select your project.
3. Enable **Google** in the **Sign-in method** tab of the Authentication section.

## 2. Register Web App
1. Go to **Project Settings** > **Your apps**.
2. Click the `</>` icon to add a web app.
3. Copy the `firebaseConfig` object.

## 3. Connect to App
1. Open `frontend/web/src/lib/firebase.ts`.
2. Replace project placeholders with your actual keys.

Your Google Login will now be active in the Dashboard! 🚀
