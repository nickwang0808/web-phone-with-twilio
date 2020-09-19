import * as firebase from "firebase/app";
import "firebase/firestore";
import firebaseConfig from "./secrets";

firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();
