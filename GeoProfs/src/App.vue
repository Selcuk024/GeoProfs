
<template>
  <div id="app">
    <LoginPage v-if="isLoggedIn" @login-success="handleLoginSuccess" />
    <router-view v-else />

  </div>
</template>

<script>
import LoginPage from "./components/LoginPage.vue";
import HomePage from "./components/HomePage.vue";
import AdminPage from "./components/AdminPage.vue";

export default {
  name: "App",
  components: {
    LoginPage,
    HomePage,
    AdminPage,
  },
  data() {
    return {
      isLoggedIn: false,
    };
  },
  methods: {
    handleLoginSuccess() {
      this.isLoggedIn = true;
    },
  },
};
</script>

<style scoped>

html, body {
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