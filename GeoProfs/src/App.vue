<template>
  <div id="app">
    <LoginPage v-if="!isLoggedIn" @login-success="handleLoginSuccess" />
    <HomePage v-else @logout-success="handleLogout" />
  </div>
</template>

<script>
import LoginPage from "./components/LoginPage.vue";
import HomePage from "./components/HomePage.vue";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";

export default {
  name: "App",
  components: {
    LoginPage,
    HomePage,
  },
  data() {
    return {
      isLoggedIn: false,
    };
  },
  created() {
    onAuthStateChanged(auth, (user) => {
      this.isLoggedIn = !!user; // Update the login state
    });
  },
  methods: {
    handleLoginSuccess() {
      this.isLoggedIn = true; // Update the state on login
    },
    handleLogout() {
      this.isLoggedIn = false; // Update the state on logout
    },
  },
};
</script>

<style scoped lang="scss">
html,
body {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>

