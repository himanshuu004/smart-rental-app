# Smart Rental Management App

A simple and lightweight React + Tailwind CSS web application for managing rental properties with Firebase authentication and database.

## Features

- 🔐 Firebase Authentication (Sign up/Sign in)
- 🏠 Property Management (Add, View, Delete properties)
- 📊 Dashboard with property status tracking
- 💰 Rent tracking
- 👥 Tenant management
- 📱 Responsive design with Tailwind CSS

## Setup Instructions

### 1. Firebase Configuration ✅ COMPLETED

✅ **Firebase is already configured!** Your project `smart-rental-app-fa657` is ready to use.

**Next steps:**
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: `smart-rental-app-fa657`
3. Enable Authentication (Email/Password) in Authentication > Sign-in method
4. Enable Firestore Database in Firestore Database
5. Set up security rules (see Security Rules section below)

### 2. Install Dependencies

```bash
npm install
```

### 3. Start Development Server

```bash
npm start
```

The app will open at `http://localhost:3000`

## Usage

1. **Sign Up**: Create a new account with email and password
2. **Sign In**: Use your credentials to access the dashboard
3. **Add Properties**: Click "Add Property" to add new rental properties
4. **Manage Properties**: View, update, or delete existing properties
5. **Track Status**: Monitor occupancy status and tenant information

## Tech Stack

- React 18 with TypeScript
- Tailwind CSS for styling
- Firebase Authentication
- Firestore Database
- React Context for state management

## Project Structure

```
src/
├── components/
│   ├── Auth.tsx          # Authentication component
│   └── Dashboard.tsx     # Main dashboard
├── contexts/
│   └── AuthContext.tsx   # Authentication context
├── firebase.ts           # Firebase configuration
├── App.tsx              # Main app component
└── index.css            # Tailwind CSS imports
```

## Security Rules

Make sure to set up proper Firestore security rules:

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

## License

MIT License