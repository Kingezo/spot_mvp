// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB_zuZoYh8OVyYpRvCEDG-zoA3eX8mrfZQ",
  authDomain: "spot-financial.firebaseapp.com",
  projectId: "spot-financial",
  storageBucket: "spot-financial.firebasestorage.app",
  messagingSenderId: "970733336355",
  appId: "1:970733336355:web:4170abaf0a6c8a9e01fe96",
  // measurementId: "G-BVFRBMFQ7C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Analytics with support check
async function initAnalytics() {
  const analyticsSupported = await isSupported();
  if (analyticsSupported) {
    getAnalytics(app); // Only call getAnalytics if supported
  } else {
    console.warn("Firebase Analytics is not supported in this environment.");
  }
}

initAnalytics(); // Call the function to initialize analytics

// Initialize Auth with persistence
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage) // Use AsyncStorage for persistence
});

// Initialize Firestore
export const db = getFirestore(app);
export { collection, query, where, getDocs };

export default app;
