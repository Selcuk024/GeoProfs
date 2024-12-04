<template>
  <div class="header">
    <img src="@/assets/logo-geo.jpeg" alt="Logo" class="logo" />
    <h1>Welkom Kenny Intelligence</h1>
    <div class="dropdown">
      <img src="@/assets/profile-icon-white.png" alt="Profile Icon" class="dropdown" />
      <button @click="logout" class="dropdown-content">Logout</button>
    </div>
  </div>
</template>

<script>
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

export default {
  methods: {
    async logout() {
      try {
        await signOut(auth);
        this.$emit("logout-success"); // Notify the parent component (App.vue) about logout
        console.log("User logged out successfully");
      } catch (error) {
        console.error("Error during logout:", error);
      }
    },
  },
}
</script>

<style scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  background-color: #001f6b;
  color: white;
}

.logo {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}

.dropdown {
  height: 50px;
  width: 50px;
  position: relative;
  display: inline-block;
}

.dropdown-content {
  display: none;
  position: absolute;
  text-align: center;
  font-weight: 400;
  background-color: #f9f9f9;
  width: 4vw;
  height: 5vh;
  border: none;
  z-index: 1;
}

.dropdown:hover .dropdown-content {
  display: block;
}
</style>
