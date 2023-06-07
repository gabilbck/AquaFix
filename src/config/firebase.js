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
  apiKey: "AIzaSyC3peghs0Z1zY179lW5OILGFVUkLHsFcTQ",
  authDomain: "triste-ea550.firebaseapp.com",
  projectId: "triste-ea550",
  storageBucket: "triste-ea550.appspot.com",
  messagingSenderId: "23384883368",
  appId: "1:23384883368:web:862036d54a24ef63d4029d"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export{app, auth};