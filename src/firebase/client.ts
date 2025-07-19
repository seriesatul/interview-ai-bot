// Import the functions you need from the SDKs you need
import { initializeApp, getApp,getApps } from "firebase/app";
import  { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCAbcKEylJ1OBowxokUpzeosikGT8Lcqww",
  authDomain: "prepmate-ai-bab86.firebaseapp.com",
  projectId: "prepmate-ai-bab86",
  storageBucket: "prepmate-ai-bab86.firebasestorage.app",
  messagingSenderId: "566103813681",
  appId: "1:566103813681:web:91952f1b8dd762ce21af10",
  measurementId: "G-TMJ00R436D"
};

// Initialize Firebase
const app = !getApp.length ? initializeApp(firebaseConfig): getApp();
export const auth = getAuth(app);
export const db = getFirestore(app);