# Quick Setup Guide

## 1. Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project called "smart-rental-app"
3. Enable Authentication:
   - Go to Authentication > Sign-in method
   - Enable Email/Password
4. Enable Firestore Database:
   - Go to Firestore Database
   - Create database in test mode
5. Get your config:
   - Go to Project Settings > General
   - Scroll down to "Your apps" section
   - Click "Add app" > Web app
   - Copy the config object

## 2. Update Firebase Config

Open `src/firebase.ts` and replace the placeholder values with your Firebase config:

```typescript
const firebaseConfig = {
  apiKey: "your-actual-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "your-app-id"
};
```

## 3. Set Firestore Security Rules

In Firebase Console > Firestore Database > Rules, replace with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /properties/{document} {
      allow read, write: if request.auth != null;
    }
  }
}
```

## 4. Run the App

```bash
npm start
```

The app will open at http://localhost:3000

## 5. Test the App

1. Sign up with a new email/password
2. Add some properties
3. Test the CRUD operations
4. Sign out and sign back in to verify persistence

## Features Included

- ✅ User authentication (signup/signin)
- ✅ Property management (add/view/delete)
- ✅ Responsive design
- ✅ Real-time data with Firestore
- ✅ TypeScript support
- ✅ Tailwind CSS styling
