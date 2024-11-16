import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDOiHfrVOhtyehDAtqyfyqzH5NZXYxnUxA",
    authDomain: "badgerexchange-dd245.firebaseapp.com",
    projectId: "badgerexchange-dd245",
    storageBucket: "badgerexchange-dd245.appspot.com",
    messagingSenderId: "548647334261",
    appId: "1:548647334261:web:dbe78ee6341408c7cb233c",
    measurementId: "G-MFZEF9GNFZ"
  };

const app = initializeApp(firebaseConfig);
console.log(app);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };