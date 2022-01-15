import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyCrX293Q_r4fVXuuH1iHvHaAlptmaHbEmo",
  authDomain: "bluuweb-dfdd5.firebaseapp.com",
  projectId: "bluuweb-dfdd5",
  storageBucket: "bluuweb-dfdd5.appspot.com",
  messagingSenderId: "92606455850",
  appId: "1:92606455850:web:1774fd5cd632797be2e353",
};
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
const db = firebase.firestore();
const auth = firebase.auth();
const timeStamp = firebase.firestore.FieldValue.serverTimestamp;

firebase.getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsuscribe = firebase.auth().onAuthStateChanged((user) => {
      unsuscribe();
      resolve(user);
    }, reject);
  });
};

export { db, auth, timeStamp, firebase };
