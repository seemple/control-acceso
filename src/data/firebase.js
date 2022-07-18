// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCzR8M2hifmnmrrCOiujPkw3zgA5r7I-YY",
  authDomain: "control-acceso-d14f7.firebaseapp.com",
  projectId: "control-acceso-d14f7",
  storageBucket: "control-acceso-d14f7.appspot.com",
  messagingSenderId: "445182027162",
  appId: "1:445182027162:web:94120a72f2897dbe424623",
  measurementId: "G-HRZD52L235"
};

// Initialize Firebase
export default function firebaseConnect(){
    return (initializeApp(firebaseConfig))
}