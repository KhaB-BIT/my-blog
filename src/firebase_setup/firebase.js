import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyC0s17jUBNhomo7ZcwyOagUmcQECpTOpIQ",
    authDomain: "my-blog-500f1.firebaseapp.com",
    projectId: "my-blog-500f1",
    storageBucket: "my-blog-500f1.appspot.com",
    messagingSenderId: "951068458459",
    appId: "1:951068458459:web:fd8e653ffd73132293fbfe",
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
