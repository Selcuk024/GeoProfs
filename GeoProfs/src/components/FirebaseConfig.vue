<script>
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection } from 'firebase/firestore'
import { VueFire, VueFireAppCheck } from 'vuefire'
import { useFirestore } from 'vuefire'
import { createApp } from 'vue-demi'


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration


export const firebaseApp = initializeApp({
    apiKey: "AIzaSyAHgbjc3U6Oc00ggNq4KWvhwh-SGpb77o4",
  authDomain: "geoprofs-96030.firebaseapp.com",
  projectId: "geoprofs-96030",
  storageBucket: "geoprofs-96030.firebasestorage.app",
  messagingSenderId: "186660256247",
  appId: "1:186660256247:web:8a51a5924f339be28f56f2",
  measurementId: "G-VHQ8RFS3SV"
})

// Initialize Firebase
const db = getFirestore(firebaseApp)
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const todosRef = collection(db, 'todos')

</script>