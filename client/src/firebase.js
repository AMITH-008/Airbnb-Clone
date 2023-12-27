// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "airbnb-clone-6f9b3.firebaseapp.com",
  projectId: "airbnb-clone-6f9b3",
  storageBucket: "airbnb-clone-6f9b3.appspot.com",
  messagingSenderId: "99812357026",
  appId: "1:99812357026:web:36bd08867388f55e99f8fb"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);