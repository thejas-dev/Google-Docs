import {initializeApp,getApps,getApp} from "firebase/app";
import {getFirestore} from 'firebase/firestore';
import  {getStorage } from 'firebase/storage'
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAhjQn_6CjJ6isnsWJlo8FaKRW8fEhiYl0",
  authDomain: "docs-thejas.firebaseapp.com",
  projectId: "docs-thejas",
  storageBucket: "docs-thejas.appspot.com",
  messagingSenderId: "698311974320",
  appId: "1:698311974320:web:b3ad5fbcad1ad23bf54a75",
  measurementId: "G-TFLR6HEWWP"
};


const app = initializeApp(firebaseConfig)

const db = getFirestore();

const storage = getStorage(app);
// const storage = getStorage(app);

export { db, app, storage };


// Import the functions you need from the SDKs you need
