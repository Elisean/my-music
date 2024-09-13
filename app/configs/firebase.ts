import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';


const firebaseConfig = {
  apiKey: "AIzaSyAIN8du-i9XKTgWZN_ZepcNGrhnyxFIsEI",
  authDomain: "my-music-d049f.firebaseapp.com",
  projectId: "my-music-d049f",
  storageBucket: "my-music-d049f.appspot.com",
  messagingSenderId: "888158935608",
  appId: "1:888158935608:web:4b16d3ab06d9fbc0dbe4cd"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const storage = getStorage(app);
const db = getFirestore(app);
const auth = getAuth(app);

export { app, database, storage, db, auth };