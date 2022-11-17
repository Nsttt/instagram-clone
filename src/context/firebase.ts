import { FirebaseApp } from "firebase/app";
import FieldValue from "firebase/firestore";
import { createContext } from "react";

interface FirebaseProps {
  firebase: FirebaseApp;
  FieldValue: typeof FieldValue;
}

const FirebaseContext = createContext<FirebaseProps | null>(null);

export default FirebaseContext;
