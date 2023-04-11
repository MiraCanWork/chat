import { FirebaseApp } from "firebase/app";
import { Auth  } from "firebase/auth";
import { Firestore } from "@firebase/firestore"
import { createContext } from "react";

export type FirebaseContext = {
  auth: Auth,
  firestore: Firestore,
  firebase: FirebaseApp,
}

export default createContext<FirebaseContext | null>(null);
