// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "agentforge-92fdc.firebaseapp.com",
    projectId: "agentforge-92fdc",
    storageBucket: "agentforge-92fdc.firebasestorage.app",
    messagingSenderId: "442806675623",
    appId: "1:442806675623:web:eb0d2c1858ddcdb0b51382"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();