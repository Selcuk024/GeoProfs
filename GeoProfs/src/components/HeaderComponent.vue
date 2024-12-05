  <template>
    <div class="header">
      <img src="@/assets/logo-geo.jpeg" alt="Logo" class="logo" />
      <h1>Welkom Kenny Intelligence</h1>
      <div class="dropdown">
        <img src="@/assets/profile-icon-white.png" alt="Profile Icon" class="dropdown" />
        <button @click="logout" class="dropdown-content"><span class="logout-text">Logout</span></button>        
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
        this.$emit("logout-success"); // Notify parent component (App.vue) about logout
        console.log("User logged out successfully");
      } catch (error) {
        console.error("Error during logout:", error);
      }
    },
  },
}
</script>

<style scoped>
.home-page {
  display: flex;
  flex-direction: column;
  height: 100vh;
  font-family: 'Inter', sans-serif;
  margin: 0;
  padding: 0;
}

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
  background-color: #0000;
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  width: 6vw;
  height: 5vh;
  border: none;
  z-index: 1;
  top: 100%;
  right: 0;

}

.logout-text {
  font-weight: 400;
  color: #000;

}

.dropdown:hover .dropdown-content {
  display: block;
}
</style>
