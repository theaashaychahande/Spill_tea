let firebaseApp = null;

export function getFirebaseApp() {
  if (firebaseApp) return firebaseApp;
  
  const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  };

  firebaseApp = firebaseConfig;
  return firebaseApp;
}

export function generateId() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < 8; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export async function saveBook(bookData) {
  console.log('Book saved (stub):', bookData);
  return { id: bookData.id };
}

export async function getBook(bookId) {
  console.log('Fetching book (stub):', bookId);
  return null;
}

export async function saveResponse(bookId, response) {
  console.log('Response saved (stub):', bookId, response);
  return true;
}
