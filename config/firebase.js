// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getAuth} from 'firebase/authh';
import{getFirestore} from 'firebase/firestore'

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB_zuZoYh8OVyYpRvCEDG-zoA3eX8mrfZQ",
  authDomain: "spot-financial.firebaseapp.com",
  projectId: "spot-financial",
  storageBucket: "spot-financial.appspot.com",
  messagingSenderId: "970733336355",
  appId: "1:970733336355:web:4170abaf0a6c8a9e01fe96",
  measurementId: "G-BVFRBMFQ7C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app)
export const auth= getAuth(app)

//export const tripsRef = colleciton(db, 'trips')
//export const expensesRef = colleciton(db, 'expense')


export default app;