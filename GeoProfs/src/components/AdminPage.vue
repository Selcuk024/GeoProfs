<template>
  <div class="container">
    <h1 class="title">Admin Panel</h1>
    <h1 class="title">Users</h1>
    <div class="bigContainer">
    <div class="userContainer" v-for="user in users" :key="user.id">
      <p class="user">{{ user.username }}</p>
    </div>

    <button class="addUserButton" @click="showForm = !showForm">
      {{ showForm ? "Annuleer" : "User Aanmaken" }}
    </button>

    <form v-if="showForm" @submit.prevent="addUser" class="userForm">
      <input
        v-model="newUsername"
        type="text"
        placeholder="Enter username"
        required
        class="inputField"
      />
      <button type="submit" class="submitButton">User Aanmaken</button>
    </form>
  </div>
  </div>
</template>

<script>
import { collection, getDocs, addDoc } from "firebase/firestore";
import { db } from "../firebase";

export default {
  name: "AdminPage",
  data() {
    return {
      users: [], // Store fetched users
      showForm: false, // Controls form visibility
      newUsername: "", // Stores the new user's username
    };
  },
  async created() {
    this.fetchUsers();
  },
  methods: {
    // Fetch users from Firestore
    async fetchUsers() {
      try {
        const querySnapshot = await getDocs(collection(db, "users"));
        this.users = querySnapshot.docs.map((doc) => {
          return { id: doc.id, username: doc.data().username };
        });
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    },
    // Add a new user to Firestore
    async addUser() {
      try {
        if (!this.newUsername.trim()) return;

        // Add new user to Firestore
        await addDoc(collection(db, "users"), {
          username: this.newUsername,
        });

        // Refresh the user list
        await this.fetchUsers();

        // Clear form and hide it
        this.newUsername = "";
        this.showForm = false;
      } catch (error) {
        console.error("Error adding user: ", error);
      }
    },
  },
};
</script>

<style scoped>
.container {
  width: 100%;
  height: 85vh;
  display: flex;
  flex-direction: column;
}
.bigContainer{
  display: flex;
  flex-direction: column;
  width: 70%;
  margin-left: 24px
}
.title {
  margin: 24px;
}
.userContainer {
  height: 96px;
  width: 100%;
  border: 1px solid #939393;
  background-color: white;
  text-decoration: none;
}
.addUserButton {
  padding: 8px 16px;
  font-size: 16px;
  cursor: pointer;
  background-color: black;
  color: white;
  border: none;
  border-radius: 4px;
  margin-left: auto;
  margin-top: 16px;
}
.userForm {
  display: flex;
  flex-direction: column;
  width: 50%;
}
.inputField {
  margin-bottom: 8px;
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
.submitButton {
  padding: 8px 16px;
  font-size: 16px;
  cursor: pointer;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
}
</style>
