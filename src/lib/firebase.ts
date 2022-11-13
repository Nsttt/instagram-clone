import Firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
// import seedDatabase from '../seed';

const config = {
  apiKey: process.env.REACT_APP_apiKey,
  authDomain: process.env.REACT_APP_authDomain,
  projectId: process.env.REACT_APP_projectId,
  storageBucket: process.env.REACT_APP_storageBucket,
  messagingSenderId: process.env.REACT_APP_messagingSenderId,
  appId: process.env.REACT_APP_appId,
};

const firebase = Firebase.initializeApp(config);
const { FieldValue } = Firebase.firestore;

// ! Seed database function, only run once.
// seedDatabase(firebase);

export { firebase, FieldValue };
