import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: 'AIzaSyC6m2pJ8rbaDN6zFRr2vKo6hat2CXcWWYI',
    authDomain: 'discord-clone-ca252.firebaseapp.com',
    projectId: 'discord-clone-ca252',
    storageBucket: 'discord-clone-ca252.appspot.com',
    messagingSenderId: '268393761820',
    appId: '1:268393761820:web:f2f3acc0c3a6f7124023d9',
    measurementId: 'G-PXXQM8JMSB'
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
