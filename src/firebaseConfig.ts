// src/firebaseConfig.ts
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDkmJgc8_clVnnSbRgh7P0L9-I7xXbwDB0",
  authDomain: "tadawul-web.firebaseapp.com",
  databaseURL: "https://tadawul-web-default-rtdb.firebaseio.com",
  projectId: "tadawul-web",
  storageBucket: "tadawul-web.firebasestorage.app",
  messagingSenderId: "385882904488",
  appId: "1:385882904488:web:a98365a7204c8335dbaf9d"
};

// تهيئة التطبيق وربط قاعدة البيانات
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
