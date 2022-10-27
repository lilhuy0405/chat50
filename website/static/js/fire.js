import {initializeApp} from "https://www.gstatic.com/firebasejs/9.12.1/firebase-app.js";
import {getAnalytics} from "https://www.gstatic.com/firebasejs/9.12.1/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {
    ref,
    getDownloadURL,
    uploadBytesResumable,
    getStorage
} from "https://www.gstatic.com/firebasejs/9.12.1/firebase-storage.js";
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBuGhbH3H0BACChLtdkb4tUqftPddWMGJ4",
    authDomain: "chat50-f0852.firebaseapp.com",
    projectId: "chat50-f0852",
    storageBucket: "chat50-f0852.appspot.com",
    messagingSenderId: "376593750657",
    appId: "1:376593750657:web:82ed0a78be85e9392dcb80",
    measurementId: "G-WDQLMXMSC6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const storage = getStorage(app);

export const uploadFileToFireStore = async (file) => {
    if (!file) return;

    const storageRef = ref(storage, `files/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    const uploadPromise = new Promise((resolve, reject) => {
        uploadTask.on("state_changed",
            (snapshot) => {
            },
            (error) => {
                reject(error);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    resolve(downloadURL);
                });
            }
        );
    });
    return uploadPromise;
}

