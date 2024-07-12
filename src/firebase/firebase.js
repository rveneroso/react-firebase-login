import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA7gUG8DCFBj_oFLh58BMTelUcUI3L60LM",
  authDomain: "react-with-firebase-logi-20db5.firebaseapp.com",
  projectId: "react-with-firebase-logi-20db5",
  storageBucket: "react-with-firebase-logi-20db5.appspot.com",
  messagingSenderId: "74218435130",
  appId: "1:74218435130:web:49847972b1475b741c3b03"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };
