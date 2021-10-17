  import firebase from "firebase";

  const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyCbLSv_TyU3oxdGZ8-BecVOlRzy5YvlvXw",
    authDomain: "react-instagram-clone-fe8ea.firebaseapp.com",
    projectId: "react-instagram-clone-fe8ea",
    storageBucket: "react-instagram-clone-fe8ea.appspot.com",
    messagingSenderId: "576642845445",
    appId: "1:576642845445:web:15e2d3aeb25996fb9b456c",
    measurementId: "G-MHRD0EPYY2"
});

    const db = firebaseApp.firestore();
    const auth = firebase.auth();
    const storage = firebase.storage();

    export { db, auth, storage };

    // export default db;