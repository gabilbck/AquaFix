import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

/**
 * Firebase configuration
 * @author Gabrieli Eduarda Lembeck
 * 
 * @const {Object} firebaseConfig Firebase configuration
 * @const {string} firebaseConfig.apiKey Firebase API key
 * @const {string} firebaseConfig.authDomain Firebase auth domain
 * @const {string} firebaseConfig.projectId Firebase project ID
 * @const {string} firebaseConfig.storageBucket Firebase storage bucket
 * @const {string} firebaseConfig.messagingSenderId Firebase messaging sender ID
 * @const {string} firebaseConfig.appId Firebase app ID
 * @since 0.1.0 
 */
const firebaseConfig = {
  apiKey: "AIzaSyBr1OGo5lOFQ4aTsYQRADiP5WqyDG4zGso",
  authDomain: "aquafix-4df2e.firebaseapp.com",
  projectId: "aquafix-4df2e",
  storageBucket: "aquafix-4df2e.appspot.com",
  messagingSenderId: "699173900788",
  appId: "1:699173900788:web:d88401edd38056c75c69a1"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export{app, auth};