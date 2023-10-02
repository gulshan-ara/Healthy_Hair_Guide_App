// importing firebase
import firebase from "firebase";

// firebase configurations
const firebaseConfig = {
	apiKey: "AIzaSyCauoMDnGe0ickQDGMGNnovW2NVDX5xN2U",
	authDomain: "healthy-hair-app.firebaseapp.com",
	projectId: "healthy-hair-app",
	storageBucket: "healthy-hair-app.appspot.com",
	messagingSenderId: "1097174926758",
	appId: "1:1097174926758:web:7a47f875d3be1454377b67",
};

// initializing app
let app;
if (firebase.apps.length == 0) {
	app = firebase.initializeApp(firebaseConfig);
} else {
	app = firebase.app();
}

// auth and db service
const auth = firebase.auth();
const db = firebase.firestore();

export { auth, db };
