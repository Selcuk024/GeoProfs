<template>
  <div class="login-page">
    <div class="login-container">
      <div class="logo">
        <img src="@/assets/logo-geo.jpeg" alt="Geoprofs logo" />
      </div>
      <h2>Geoprofs</h2>
      <form @submit.prevent="login" class="login-form">
        <label for="email">Email</label>
        <input type="text" v-model="email" id="email" placeholder="Email" required />

        <label for="password">Password</label>
        <input type="password" v-model="password" id="password" placeholder="Password" required />

        <button type="submit" class="submit-button">Submit</button>
      </form>

      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    </div>
  </div>
</template>

<script>
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import { collection, query, where, getDocs, deleteField, doc  } from "firebase/firestore";

export default {
  name: "LoginPage",
  data() {
    return {
      email: "",
      password: "",
      errorMessage: null,
    };
  },
  methods: {
    async login() {
      try {
        const userCredential = await signInWithEmailAndPassword(auth, this.email, this.password);
        console.log("User logged in:", userCredential.user);
        this.$emit("login-success", userCredential.user);
      } catch (error) {
        console.error(error);
        this.errorMessage = error.message || "Login failed. Please try again.";
        this.errorMessage ? this.loginWithDatabase(this.email, this.password) : console.log("no")
      }
    },

    async loginWithDatabase(username, password) { //dit is alleen voor de eerste keer
  try {
    const userQuery = query(collection(db, "users"), where("username", "==", username));
    const querySnapshot = await getDocs(userQuery);

    if (querySnapshot.empty) {
      console.error("No user found with this email");
      return false;
    }

    const userDoc = querySnapshot.docs[0];
    const userData = userDoc.data();

    if (userData.password === password) {
      console.log(userData.password);
      deleteField(userData.password);
      console.log("Login successful", userData);
      return true;
    } else {
      console.error("Incorrect password");
      return false;
    }
  } catch (error) {
    console.error("Error during login", error);
    return false;
  }
}

  },
};

</script>

<style scoped>
/* Algemene pagina opmaak */
.login-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f4f4f4;
}

/* Container voor login formulier */
.login-container {
  text-align: center;
  padding: 40px;
  max-width: 400px;
  width: 100%;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

/* Logo styling */
.logo img {
  width: 80px;
  height: 80px;
  margin-bottom: 20px;
}

/* Titel styling */
h2 {
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 20px;
}

/* Formulier styling */
.login-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.login-form label {
  text-align: left;
  font-size: 0.9rem;
  color: #666;
}

.login-form input {
  padding: 12px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.submit-button {
  padding: 12px;
  font-size: 1rem;
  background-color: black;
  color: white;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.submit-button:hover {
  background-color: #333;
}

/* Error bericht styling */
.error {
  margin-top: 15px;
  color: red;
}
</style>
