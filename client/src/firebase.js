// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfiguration = {
  apiKey: "AIzaSyDDJw4BXKGcrx3Jn3MaooUvdY_r_t8Xf30",
  authDomain: "watcher-8c89a.firebaseapp.com",
  projectId: "watcher-8c89a",
  storageBucket: "watcher-8c89a.appspot.com",
  messagingSenderId: "532132207081",
  appId: "1:532132207081:web:66f392c7edbc3ebea81378",
};

// Initialize Firebase
const app = initializeApp(firebaseConfiguration);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();

export default app;
