// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite'
import { getFirestore as getDB } from 'firebase/firestore'
import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";

// if (import.meta.env.DEV) {
//   self.FIREBASE_APPCHECK_DEBUG_TOKEN = true
// }
// 6bf585ba-f777-45e9-8295-374dae9f2879
// 140630

const firebaseConfig = {
  apiKey: "AIzaSyDCxi6eYjlmbvuguBrC5ngsTs627wXjxFg",
  authDomain: "xenochange.firebaseapp.com",
  projectId: "xenochange",
  storageBucket: "xenochange.appspot.com",
  messagingSenderId: "796591934341",
  appId: "1:796591934341:web:165b234f9b148377d712ec"
};


// Initialize Firebase
export const FirebaseApp = initializeApp( firebaseConfig );

export const FirebaseAuth = getAuth( FirebaseApp );
export const FirebaseDB = getFirestore( FirebaseApp);

export const xenoDB = getDB(FirebaseApp);

initializeAppCheck(FirebaseApp, {
  provider: new ReCaptchaV3Provider('6LftFJIoAAAAAGVomrFp0fihf5sP0RlPX9tp9juI'),
  isTokenAutoRefreshEnabled: true // Set to true to allow auto-refresh.
});