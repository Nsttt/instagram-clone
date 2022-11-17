import Firebase from "firebase/app";
import FieldValue from "firebase/firestore";

const config = {
  apiKey: process.env.REACT_APP_apiKey,
  authDomain: process.env.REACT_APP_authDomain,
  projectId: process.env.REACT_APP_projectId,
  storageBucket: process.env.REACT_APP_storageBucket,
  messagingSenderId: process.env.REACT_APP_messagingSenderId,
  appId: process.env.REACT_APP_appId,
};

const firebase = Firebase.initializeApp(config);

// ! Seed database function, run only once.
// seedDatabase(firebase);

export { firebase, FieldValue };
