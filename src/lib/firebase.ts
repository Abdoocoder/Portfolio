// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCUaj4Wf1Vhq71SZKTZi0JUhG8TcRefxhs",
    authDomain: "abdoocoderportfolio.firebaseapp.com",
    projectId: "abdoocoderportfolio",
    storageBucket: "abdoocoderportfolio.firebasestorage.app",
    messagingSenderId: "403038742218",
    appId: "1:403038742218:web:db3aaeb0e6e826d3863633",
    measurementId: "G-LESL4N1GCG"
};

// Initialize Firebase
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

// Initialize Analytics conditionally (only works in browser)
export const initAnalytics = async () => {
    if (typeof window !== "undefined") {
        const { getAnalytics, isSupported } = await import("firebase/analytics");
        const supported = await isSupported();
        if (supported) {
            return getAnalytics(app);
        }
    }
    return null;
};

export { app };
