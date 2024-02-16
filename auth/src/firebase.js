import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyAGh_z0XxPIS7_F0b0clW9ELYF8GOWp7YM",
  authDomain: "auth-f88b8.firebaseapp.com",
  projectId: "auth-f88b8",
  storageBucket: "auth-f88b8.appspot.com",
  messagingSenderId: "1019011560561",
  appId: "1:1019011560561:web:3002d01968dc42f5e757d0",
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
export {auth};
export default db;