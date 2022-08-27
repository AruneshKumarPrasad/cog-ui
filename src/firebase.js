// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDmolckBVAwmwQvPpgUijqncDzLfcrEAMo",
    authDomain: "cog-ui.firebaseapp.com",
    projectId: "cog-ui",
    storageBucket: "cog-ui.appspot.com",
    messagingSenderId: "26435462847",
    appId: "1:26435462847:web:a6aad159500c557c51080a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize FirebaseAuth
const auth = getAuth();
// Initailize Database
const db = getFirestore(app);

export {app, auth, db};