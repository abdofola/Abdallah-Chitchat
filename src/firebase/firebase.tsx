// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import {
  getAuth,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCMSKuZn_LV6p3JrZciGIgBaNcdHxIw8qA",
  authDomain: "auth-dev-4ee99.firebaseapp.com",
  projectId: "auth-dev-4ee99",
  storageBucket: "auth-dev-4ee99.appspot.com",
  messagingSenderId: "226591466456",
  appId: "1:226591466456:web:0c6e52a6f10599cd4cc8ad",
};
export const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { signInWithPopup as default, auth, onAuthStateChanged, signOut };
