// import * as firebase from "firebase";
import firebase from "firebase/app";
import "firebase/database";
import fbKeys from "../../firebaseKeys";

// PERSONAL FIREBASE CONFIGURATION
const firebaseConfig = fbKeys;

// INITIALIZE FIREBASE
firebase.initializeApp(firebaseConfig);

const fbDatabase = firebase.database();

export { firebase, fbDatabase as default };
