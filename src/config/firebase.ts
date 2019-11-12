import firebase from 'firebase';

const firebaseApiKey = process.env.REACT_APP_FIREBASE_API_KEY || '';
const firebaseProjectId = process.env.REACT_APP_FIREBASE_PROJECT_ID || '';
const firebaseMessagingId = process.env.REACT_APP_FIREBASE_MESSAGING_ID || '';
const version = '01'; // database schema version

if (!firebaseProjectId) throw new Error('Firebase Project ID error.');

firebase.initializeApp({
  apiKey: firebaseApiKey,
  authDomain: `${firebaseProjectId}.firebaseapp.com`,
  databaseURL: `https://${firebaseProjectId}.firebaseio.com`,
  projectId: `${firebaseProjectId}`,
  storageBucket: `${firebaseProjectId}.appspot.com`,
  messagingSenderId: firebaseMessagingId,
});

export default firebase;
export { version };
