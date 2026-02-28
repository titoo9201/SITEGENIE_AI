// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey:import.meta.env.VITE_FIRE_BASE_API_KEY,
  authDomain: "sitegenieai-17e6c.firebaseapp.com",
  projectId: "sitegenieai-17e6c",
  storageBucket: "sitegenieai-17e6c.firebasestorage.app",
  messagingSenderId: "863040620944",
  appId: "1:863040620944:web:3014c95d3be022e5138b15"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth=getAuth(app)
const provider=new GoogleAuthProvider()

export {auth,provider}