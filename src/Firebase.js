// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB1ukM07wn0W5kgseZZvrMx3RcpfRhNBEE",
  authDomain: "react-firebase2-4-7034d.firebaseapp.com",
  projectId: "react-firebase2-4-7034d",
  storageBucket: "react-firebase2-4-7034d.firebasestorage.app",
  messagingSenderId: "806110222815",
  appId: "1:806110222815:web:5470f57a80b96b3b11cc6a",
  measurementId: "G-NEV79V67BT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

 export const auth = getAuth();
 export const db= getFirestore();