import firebase from 'firebase';
import { FIREBASE } from '../constants/keys';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: FIREBASE.apiKey,
  authDomain: FIREBASE.authDomain,
  projectId: FIREBASE.projectId,
  storageBucket: FIREBASE.storageBucket,
  messagingSenderId: FIREBASE.messagingSenderId,
  appId: FIREBASE.appId,
};

let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const auth = firebase.auth(app);
const db = firebase.firestore(app);

const saveFavs = async (symbols = []) => {
  await db
    .collection('favs')
    .doc(auth.currentUser.email)
    .set({ symbols: [...symbols] }, { merge: true });
};

const loadFavs = async () => {
  const doc = await db.collection('favs').doc(auth.currentUser.email).get();
  return doc.data();
};

export { auth, db, saveFavs, loadFavs };
