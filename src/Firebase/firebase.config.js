// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAzbSlAr392rZMXl0k851r4fP3HqBtTAQI",
  authDomain: "books-buy1.firebaseapp.com",
  projectId: "books-buy1",
  storageBucket: "books-buy1.appspot.com",
  messagingSenderId: "436273183391",
  appId: "1:436273183391:web:a1246c4d66be84c8ca00aa"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;