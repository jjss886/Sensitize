// import * as firebase from "firebase";
import firebase from "firebase/app";
import "firebase/database";

// PERSONAL FIREBASE CONFIGURATION
const firebaseConfig = {
  apiKey: "AIzaSyByETasiITMQ9ZRv4TxC5Oot9oe3bcXsMk",
  authDomain: "sensitize-56568.firebaseapp.com",
  databaseURL: "https://sensitize-56568.firebaseio.com",
  projectId: "sensitize-56568",
  storageBucket: "sensitize-56568.appspot.com",
  messagingSenderId: "662919213348",
  appId: "1:662919213348:web:d3733ecfe14fc2721dc3b1",
  measurementId: "G-JQLL4GNG72"
};

// INITIALIZE FIREBASE
firebase.initializeApp(firebaseConfig);

const fbDatabase = firebase.database();

export { firebase, fbDatabase as default };
