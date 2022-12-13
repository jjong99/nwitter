
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBArT2ZSWg9qj31nyAvxA4yeLMV-yLKohA",
  authDomain: "nwitter-7a637.firebaseapp.com",
  projectId: "nwitter-7a637",
  storageBucket: "nwitter-7a637.appspot.com",
  messagingSenderId: "407089026506",
  appId: "1:407089026506:web:2896824738e0fa47a8eb33"
};

firebase.initializeApp(firebaseConfig);


export const firebaseInstance = firebase;

export const dbService = firebase.firestore();

export const storageService = firebase.storage();

export const authService = firebase.auth();