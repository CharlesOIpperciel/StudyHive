// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCF-ehL4kP08Nvg5hxWiRyI3MLTCdpOYG0",
    authDomain: "study-hive-c4149.firebaseapp.com",
    projectId: "study-hive-c4149",
    storageBucket: "study-hive-c4149.appspot.com",
    messagingSenderId: "457716678700",
    appId: "1:457716678700:web:dbed6e66124b2ea664d189",
    measurementId: "G-9ZRWQDM1B4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export {app, auth}