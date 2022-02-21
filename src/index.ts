import dotenv from 'dotenv';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore'

dotenv.config();

// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env?.FIREBASE_API_KEY,
  authDomain: process.env?.FIREBASE_AUTH_DOMAIN,
  projectId: process.env?.FIREBASE_PROJECT_ID,
  storageBucket: process.env?.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env?.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env?.FIREBASE_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const server = async () => {
	const querySnapshot = await getDocs(collection(db, 'test'));
	querySnapshot.forEach((doc) => {
		console.log(`${doc.id}`);
		const data = doc.data();
		console.log(data['firstname'], data['surname']);
	});
}

server();
