// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAAMtRPm2vNq730gQtPclDTIyV-sJCZB1w",
  authDomain: "f1track-80d60.firebaseapp.com",
  databaseURL: "https://f1track-80d60-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "f1track-80d60",
  storageBucket: "f1track-80d60.firebasestorage.app",
  messagingSenderId: "557342060818",
  appId: "1:557342060818:web:159047fdff6291f81b83cb",
  measurementId: "G-5EECMEYPZ6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// EXPORTED TO USE IN THE LOGIN COMPONENT
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;
