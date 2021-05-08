import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCi52eypYzO2dVCIXlwBoDL-icgp3pNijY",
  authDomain: "inthemiddle-21.firebaseapp.com",
  projectId: "inthemiddle-21",
  storageBucket: "inthemiddle-21.appspot.com",
  messagingSenderId: "967275229107",
  appId: "1:967275229107:web:31615418bc2ea7422fa5c6",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };
