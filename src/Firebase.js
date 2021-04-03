import firebase from "firebase";


const firebaseApp =firebase.initializeApp({
    apiKey: "AIzaSyCaHhHMqMaGLKWkGN2suJwfx4Cg9rnU9UI",
    authDomain: "instagram-clone-3ec88.firebaseapp.com",
    projectId: "instagram-clone-3ec88",
    storageBucket: "instagram-clone-3ec88.appspot.com",
    messagingSenderId: "305055237645",
    appId: "1:305055237645:web:dd4e03475e2ee9ee66f744",
    measurementId: "G-D77ZM5ZY8M"
  });

const db= firebase.firestore();
const auth=firebase.auth();
const storage=firebase.storage();

export{db,auth,storage};