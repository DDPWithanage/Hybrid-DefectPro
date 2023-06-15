// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
import {getDatabase} from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCXzTBX6F_xj43lvZ52_r_sw-47Bx8pVPg",
  authDomain: "defectpredictionsystem.firebaseapp.com",
  projectId: "defectpredictionsystem",
  storageBucket: "defectpredictionsystem.appspot.com",
  messagingSenderId: "1008193706017",
  appId: "1:1008193706017:web:3261533df56bb55ffc6b60",
  measurementId: "G-97JRCJDFK9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const storage = getStorage(app);
export const rtDatabase = getDatabase(app);