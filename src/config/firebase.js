import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyD79zwwA22mOvTAJtqghRuvUK8UHpj9hB4",
  authDomain: "aquafix-d1c67.firebaseapp.com",
  projectId: "aquafix-d1c67",
  storageBucket: "aquafix-d1c67.appspot.com",
  messagingSenderId: "253279762355",
  appId: "1:253279762355:web:e2422434169c8e1c1bbdc6"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export{app, auth};