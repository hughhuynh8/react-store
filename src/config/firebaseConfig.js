import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyAi_nMgdDmwluc6MnWSye_y8FPoJ3yGV2U",
    authDomain: "react-store-284805.firebaseapp.com",
    databaseURL: "https://react-store-284805.firebaseio.com",
    projectId: "react-store-284805",
    storageBucket: "react-store-284805.appspot.com",
    messagingSenderId: "760500977082",
    appId: "1:760500977082:web:4aac652c079780d28b7183",
    measurementId: "G-6MJTL8GN66"
};
  
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.firestore();

export default firebase;