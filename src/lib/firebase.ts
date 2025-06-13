// src/lib/firebase.ts (VERSI FINAL TERAKHIR)

import { initializeApp, getApps, FirebaseApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Validasi environment variable Anda
const firebaseApiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
const firebaseAuthDomain = process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN;
const firebaseProjectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
const firebaseMessagingSenderId = process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID;
const firebaseAppId = process.env.NEXT_PUBLIC_FIREBASE_APP_ID;

if (!firebaseApiKey || !firebaseAuthDomain || !firebaseProjectId || !firebaseMessagingSenderId || !firebaseAppId) {
  throw new Error("Satu atau lebih Environment Variable Firebase belum diatur.");
  }

const firebaseConfig = {
  apiKey: firebaseApiKey,
  authDomain: firebaseAuthDomain,
  projectId: firebaseProjectId,
  messagingSenderId: firebaseMessagingSenderId,
  appId: firebaseAppId,
};

// Deklarasi yang lebih ringkas dan benar menggunakan const
const app: FirebaseApp = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

const auth = getAuth(app);
const db = getFirestore(app);

export { db, auth, app };