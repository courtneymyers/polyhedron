import firebase from 'firebase';

firebase.initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: 'polyhedron-db.firebaseapp.com',
  databaseURL: 'https://polyhedron-db.firebaseio.com',
  projectId: 'polyhedron-db',
  storageBucket: 'polyhedron-db.appspot.com',
  messagingSenderId: '687411267088',
});

export default firebase;
