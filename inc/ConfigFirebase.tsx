// @ts-ignore
import firebase from "firebase";

let config = {
    apiKey: "AIzaSyC6S2MPRoZ2CFui3qlCf1gD3nKaLnp_sPE",
    authDomain: "rpglite-74b72.firebaseapp.com",
    projectId: "rpglite-74b72",
    storageBucket: "rpglite-74b72.appspot.com",
    messagingSenderId: "515331412092",
    appId: "1:515331412092:web:cb9b99b4ff289136a3b9f9",
    measurementId: "G-S6LYXB0TNL"
};

let app = firebase.initializeApp(config)

export const db = app.database()
export const auth = app.auth();

