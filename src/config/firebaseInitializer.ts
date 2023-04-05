import 'firebase/storage';
import {getStorage} from 'firebase/storage';
import {getApp, initializeApp} from "firebase/app"

let firebaseApp

try {
    firebaseApp = getApp()
} catch (error) {
    firebaseApp = initializeApp({
        apiKey: "AIzaSyDtzfNZ6i6_6Smk3iLl54Smbx0UBpIqreo",
        authDomain: "esint-front.firebaseapp.com",
        projectId: "esint-front",
        storageBucket: "esint-front.appspot.com",
        messagingSenderId: "776287794239",
        appId: "1:776287794239:web:dcd832cc3e83187a88748a",
        measurementId: "G-PK645RG8YF"
    })
}

export const firebaseStorage = getStorage(firebaseApp);
