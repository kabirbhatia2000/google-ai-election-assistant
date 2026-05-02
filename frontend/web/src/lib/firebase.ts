import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDWkaPLsR0h5zENEpkcLZVrVjiefT1XWII",
  authDomain: "election-assistant-auth.firebaseapp.com",
  projectId: "election-assistant-auth",
  storageBucket: "election-assistant-auth.firebasestorage.app",
  messagingSenderId: "529932846540",
  appId: "1:529932846540:web:1b3b67e6c9869322a08969",
  measurementId: "G-QXGYN07ZB2"
};

// Initialize Firebase for SSR compatibility
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
