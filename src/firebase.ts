import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyCGrxtUS4Z3hrX4FoDB3T6ZaPa1WtGsiNE",
  authDomain: "smart-rental-app-fa657.firebaseapp.com",
  projectId: "smart-rental-app-fa657",
  storageBucket: "smart-rental-app-fa657.firebasestorage.app",
  messagingSenderId: "45853668305",
  appId: "1:45853668305:web:e9a997df51a71287c5e6f0",
  measurementId: "G-1HNREY2DZP"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const analytics = getAnalytics(app);
export default app;
