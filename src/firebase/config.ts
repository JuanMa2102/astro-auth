// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB25kpmMXaCOu_yOf-co7yvuu8mmgDin5A",
  authDomain: "astro-auth-580b1.firebaseapp.com",
  projectId: "astro-auth-580b1",
  storageBucket: "astro-auth-580b1.appspot.com",
  messagingSenderId: "903325991282",
  appId: "1:903325991282:web:7e4d3e207c81ba5b451deb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export const firebase = { app, auth };

