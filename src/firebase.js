import firebase from 'firebase';

var firebaseConfig = {
  apiKey: 'AIzaSyBsSrwXiBW1a09q1aVAZcRb7f2CPF5Mm8w',
  authDomain: 'flashkart-b5471.firebaseapp.com',
  databaseURL: 'https://flashkart-b5471.firebaseio.com',
  projectId: 'flashkart-b5471',
  storageBucket: 'flashkart-b5471.appspot.com',
  messagingSenderId: '468187246048',
  appId: '1:468187246048:web:3fdb8930b9d08fcc720f85',
  measurementId: 'G-F3550BXPT5',
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
