import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider, signInWithPopup} from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCAkwCQduZHeVAtDdKrYNgKsgGjlpnn_Kk",
  authDomain: "memories-360313.firebaseapp.com",
  projectId: "memories-360313",
  storageBucket: "memories-360313.appspot.com",
  messagingSenderId: "1063912358573",
  appId: "1:1063912358573:web:8a5031c47482c0017f3c24"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const provider= new GoogleAuthProvider()

export const signInWithGoogle = () => {

    signInWithPopup(auth, provider)
    .then((result) => {
        const name = result.user.displayName;
        const email = result.user.email;
        const profilePic = result.user.photoURL;
        const id = result.user.uid;
        const Token = result.user.accessToken;

        localStorage.setItem("Token", result.user.accessToken);
        localStorage.setItem("name", name);
        localStorage.setItem("email", email);
        localStorage.setItem("profilePic", profilePic);
        localStorage.setItem("id", id);
    })
    .catch((error) => {
        console.log(error);
    })
}
