import { initializeApp } from "firebase/app";
import {
  getAuth,
  initializeAuth,
  getReactNativePersistence,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

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
  appId: "1:699173900788:web:d88401edd38056c75c69a1",
};
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
// export const auth = getAuth(app);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
