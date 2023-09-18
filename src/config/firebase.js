import { initializeApp } from "firebase/app";
import { getAuth, initializeAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";

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
let persistenceConfig;

if (Platform.OS === "web") {
  // persistenceConfig = getReactNativePersistence(ReactNativeAsyncStorage);
  persistenceConfig = false;
} else {
  persistenceConfig = getAuth(app);
}

export const auth = initializeAuth(app, {
  persistence: persistenceConfig,
});
