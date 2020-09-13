import * as firebase from "firebase/app";
import "firebase/firestore";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAFiw1oa4U8y8fmABEt6wl6GB497X0uK0E",
  authDomain: "autodialer-285913.firebaseapp.com",
  databaseURL: "https://autodialer-285913.firebaseio.com",
  projectId: "autodialer-285913",
  storageBucket: "autodialer-285913.appspot.com",
  messagingSenderId: "954133383749",
  appId: "1:954133383749:web:b89bec6278fb7966bb712c",
  measurementId: "G-ZKBT2Q7B3T",
};

firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();
