<template>
  <div class="signup-form">
    <h2>Sign Up</h2>
    <form @submit.prevent="signUp">
      <div>
        <label for="email">Email:</label>
        <input type="email" v-model="email" id="email" required />
      </div>
      <div>
        <label for="password">Password:</label>
        <input type="password" v-model="password" id="password" required />
      </div>
      <button type="submit">Sign Up</button>
    </form>
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
  </div>
</template>

<script>
import { auth } from "@/firebase"; // Import the Firebase auth module

export default {
  name: "SignUpForm",
  data() {
    return {
      email: "",
      password: "",
      errorMessage: "",
    };
  },
  methods: {
    async signUp() {
      try {
        await auth.createUserWithEmailAndPassword(this.email, this.password);
        // On success, reset the form and handle redirection if necessary
        this.email = "";
        this.password = "";
        this.errorMessage = "";
        this.$emit("sign-up-success", this.email);
      } catch (error) {
        this.errorMessage = error.message; // Set the error message from Firebase
      }
    },
  },
};
</script>

<style scoped>
.signup-form {
  text-align: center;
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
}

.signup-form h2 {
  font-size: 1.5rem;
  margin-bottom: 20px;
}

.signup-form input {
  margin-bottom: 10px;
  padding: 8px;
  width: 100%;
  border-radius: 4px;
  border: 1px solid #ccc;
}

.signup-form button {
  padding: 10px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.signup-form button:hover {
  background-color: #45a049;
}

.error {
  color: red;
  margin-top: 10px;
}
</style>
