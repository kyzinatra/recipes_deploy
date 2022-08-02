import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";

const firebaseConfig = {
	apiKey: "AIzaSyBhjMeMcULNN3PJb55jgm7Z0zO1ARgEnbY",
	authDomain: "idishes.firebaseapp.com",
	databaseURL: "https://idishes-default-rtdb.firebaseio.com",
	projectId: "idishes",
	storageBucket: "idishes.appspot.com",
	messagingSenderId: "466559266582",
	appId: "1:466559266582:web:a0708a3ae9b05c46b16a37",
	measurementId: "G-BDKGG9Q7WP",
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
