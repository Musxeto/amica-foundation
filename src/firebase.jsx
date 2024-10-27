import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword , updatePassword} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDgtBVh_H5WMME7uMzciUoIO2qS4v2rMUU",
  authDomain: "amico-a0a2e.firebaseapp.com",
  projectId: "amico-a0a2e",
  storageBucket: "amico-a0a2e.appspot.com",
  messagingSenderId: "392600188004",
  appId: "1:392600188004:web:15492736246b44e975db71",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app)

export { auth, db, storage };

export const login = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return userCredential.user;
    } catch (error) {
      console.error('Error during login:', error);
      throw error;
    }
  };