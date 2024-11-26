import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCoKk4DnuouZzFZWD9WdHqPo-oA8oZWhI8",
  authDomain: "crud-app-85d56.firebaseapp.com",
  projectId: "crud-app-85d56",
  storageBucket: "crud-app-85d56.firebasestorage.app",
  messagingSenderId: "525395431754",
  appId: "1:525395431754:web:0e1e79e5cadbf1c7ba71b3",
  measurementId: "G-KE4KCJLV0W",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
