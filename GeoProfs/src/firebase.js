import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAHgbjc3U6Oc00ggNq4KWvhwh-SGpb77o4",
  authDomain: "geoprofs-96030.firebaseapp.com",
  projectId: "geoprofs-96030",
  storageBucket: "geoprofs-96030.firebasestorage.app",
  messagingSenderId: "186660256247",
  appId: "1:186660256247:web:8a51a5924f339be28f56f2",
  measurementId: "G-VHQ8RFS3SV",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export { onAuthStateChanged };

