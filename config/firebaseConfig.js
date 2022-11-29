// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCW5dGU3u-O2wcAykn1sujdVOwivcegN7A",
    authDomain: "app-auth-2cf34.firebaseapp.com",
    projectId: "app-auth-2cf34",
    storageBucket: "app-auth-2cf34.appspot.com",
    messagingSenderId: "464475090252",
    appId: "1:464475090252:web:c29a075c7cb382325073e9"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
