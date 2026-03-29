import { initializeApp, getApps, getApp } from "firebase/app";
import { 
  getFirestore, 
  doc, 
  setDoc, 
  getDoc, 
  updateDoc, 
  arrayUnion, 
  onSnapshot 
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Singleton initialization
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

export function generateId() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < 8; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export async function saveBook(bookData) {
  try {
    const bookRef = doc(db, "books", bookData.id);
    await setDoc(bookRef, {
      ...bookData,
      responses: [], // Initialize empty responses array
    });
    return { id: bookData.id };
  } catch (error) {
    console.error("Error saving book:", error);
    throw error;
  }
}

export async function getBook(bookId) {
  try {
    const bookRef = doc(db, "books", bookId);
    const bookSnap = await getDoc(bookRef);
    if (bookSnap.exists()) {
      return bookSnap.data();
    }
    return null;
  } catch (error) {
    console.error("Error fetching book:", error);
    throw error;
  }
}

export async function saveResponse(bookId, response) {
  try {
    const bookRef = doc(db, "books", bookId);
    await updateDoc(bookRef, {
      responses: arrayUnion(response)
    });
    return true;
  } catch (error) {
    console.error("Error saving response:", error);
    throw error;
  }
}

export function subscribeToBook(bookId, callback) {
  const bookRef = doc(db, "books", bookId);
  return onSnapshot(bookRef, (doc) => {
    if (doc.exists()) {
      callback(doc.data());
    }
  });
}
