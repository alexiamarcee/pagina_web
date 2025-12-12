// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, onValue, push, set } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCDQnBy6eNCEOpNr72U8zMB8AdYG5vS9Jc",
  authDomain: "prueba1-27afa.firebaseapp.com",
  databaseURL: "https://prueba1-27afa-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "prueba1-27afa",
  storageBucket: "prueba1-27afa.firebasestorage.app",
  messagingSenderId: "323747779688",
  appId: "1:323747779688:web:955eaa6d886009a15a57dd"
};

// Initialize Firebase
initializeApp(firebaseConfig);

export default { getDatabase, ref, onValue, push, set };
