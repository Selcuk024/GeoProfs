<template>
    <div class="login-page">
      <h2>Login</h2>
      <form @submit.prevent="login">
        <label for="username">Username:</label>
        <input type="text" v-model="username" id="username" />
  
        <label for="password">Password:</label>
        <input type="password" v-model="password" id="password" />
  
        <button type="submit">Login</button>
      </form>
  
      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    </div>
  </template>
  
  <script>
  export default {
    name: "LoginPage",
    data() {
      return {
        username: "",
        password: "",
        errorMessage: null,
      };
    },
    methods: {
      login() {
        // Hardcoded username and password
        const hardcodedUsername = "marco";
        const hardcodedPassword = "admin";
  
        if (this.username === hardcodedUsername && this.password === hardcodedPassword) {
          // Login successful
          this.$emit("login-success");
        } else {
          // Login failed
          this.errorMessage = "Invalid username or password.";
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .login-page {
    max-width: 300px;
    margin: auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #f9f9f9;
  }
  .error {
    color: red;
  }
  </style>
  