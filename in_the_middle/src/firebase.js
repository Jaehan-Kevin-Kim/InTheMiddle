import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBm72aLwOe89g7NUnTRWurfs8PQdNo2c6s",
  authDomain: "inthemiddle-2021.firebaseapp.com",
  projectId: "inthemiddle-2021",
  storageBucket: "inthemiddle-2021.appspot.com",
  messagingSenderId: "570754689501",
  appId: "1:570754689501:web:5b8c4904736b354ea4ae34",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };
