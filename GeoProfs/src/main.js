import './assets/main.css';
import './assets/test.css';
import { createApp } from 'vue';
import App from './App.vue';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';

let app;

// Initialize the app only after checking authentication state
onAuthStateChanged(auth, (user) => {
  if (!app) {
    app = createApp(App);
    app.mount('#app');
  }
});
