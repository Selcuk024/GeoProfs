<template>
  <div class="container">
    <h1 class="title">Admin Panel</h1>
    <h1 class="title">Users</h1>
    <div class="bigContainer">
      <div class="userContainer" v-for="user in users" :key="user.id">
        <div class="left">
          <p class="user">{{ user.username }}</p>
          <p class="user">Aangemaakt: {{ user.date }}</p>
        </div>
        <div class="right">
          <button class="addUserButton" @click="showUserInfo(user)">
            Informatie
          </button>
          <button class="addUserButton vw" @click="deleteUser(user.id)">
            Verwijder Gebruiker
          </button>
        </div>
      </div>

      <button class="addUserButton" @click="showForm = !showForm">
        {{ showForm ? "Annuleer" : "Gebruiker Aanmaken" }}
      </button>

      <form v-if="showForm" @submit.prevent="addUser" class="userForm">
        <input
          v-model="newUsername"
          type="text"
          placeholder="Enter username"
          required
          class="inputField"
        />
        <input
          v-model="Bsn"
          type="text"
          placeholder="Enter BSN"
          required
          class="inputField"
        />
        <input
          v-model="Afdeling"
          type="text"
          placeholder="Enter afdeling"
          required
          class="inputField"
        />
      
        <div class="row2">
        <input
          v-model="generatedPassword"
          type="password"
          :readonly="true"
          disabled
          placeholder="Wachtwoord"
          required
          class="inputField width"
        />
        <button type="button" @click="generatePassword" class="generateButton">
          Genereer Wachtwoord
        </button>
      </div>
      <select
        v-model="Positie"
        class="inputField"
        >
        <option value="Werknemer">Werknemer</option>
        <option value="Manager">Manager</option>
        <option value="Office Manager">Office Manager</option>
      </select>
        <button type="submit" class="submitButton">User Aanmaken</button>
      </form>
    </div>

    <div v-if="selectedUser" class="modal">
      <div class="modal-content">
        <h2 class="info">Gebruiker Informatie</h2>
        <p><strong>Username:</strong> {{ selectedUser.username ? selectedUser.username : "Geen username gevonden"}}</p>
        <p><strong>Gemaakt op:</strong> {{ selectedUser.date ? selectedUser.date : "Geen datum gevonden" }}</p>
        <p><strong>BSN:</strong> {{ selectedUser.bsn ? selectedUser.bsn : "Geen BSN gevonden" }}</p>
        <p><strong>Afdeling:</strong> {{  selectedUser.afdeling ? selectedUser.afdeling : "Afdeling niet gevonden" }}</p>
        <p><strong>Positie:</strong> {{  selectedUser.positie ? selectedUser.positie : "Positie niet gevonden" }}</p>
        <button class="closeButton" @click="selectedUser = null">Terug</button>
      </div>
    </div>
  </div>
</template>

<script>
import { collection, getDocs, addDoc, doc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase";

export default {
  name: "AdminPage",
  data() {
    return {
      users: [],
      showForm: false,
      newUsername: "",
      date: "",
      Bsn: "",
      Afdeling: "",
      generatedPassword: "",
      Positie: "",
      selectedUser: null,
    };
  },
  async created() {
    this.fetchUsers();
  },
  methods: {
    async fetchUsers() {
  try {
    const querySnapshot = await getDocs(collection(db, "users"));
    this.users = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("Error fetching data: ", error);
  }
},

    generatePassword() {
      const length = 12;
      const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
      let password = "";
      for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        password += charset[randomIndex];
      }
      this.generatedPassword = password;
    },
    async addUser() {
      try {
        if (!this.newUsername.trim() || !this.Bsn.trim() || !this.generatedPassword.trim() || !this.Afdeling.trim()) return;

        const currentDate = new Date();
        this.date = currentDate.toISOString().split("T")[0];

        await addDoc(collection(db, "users"), {
          username: this.newUsername,
          date: this.date,
          bsn: this.Bsn,
          afdeling: this.Afdeling,
          password: this.generatedPassword,
          positie: this.Positie,
        });

        await this.fetchUsers();
        this.newUsername = "";
        this.Bsn = "";
        this.generatedPassword = "";
        this.Afdeling = "";
        this.Positie = "";
        this.showForm = false;
      } catch (error) {
        console.error("Error adding user: ", error);
      }
    },
    async deleteUser(userId) {
      try {
        const userDoc = doc(db, "users", userId);
        await deleteDoc(userDoc);

        await this.fetchUsers();
      } catch (error) {
        console.error("Error deleting user: ", error);
      }
    },
    showUserInfo(user) {
      this.selectedUser = user;
    },
  },
};
</script>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}
.info{
  margin-bottom: 24px;
}
.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
  text-align: center;
}

.closeButton {
  padding: 8px 16px;
  background-color: red;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 20px;
}
.generateButton{
  margin-bottom: 8px;
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-left: auto;
  width: 40%;
  color: #fff;
  background-color: #007bff;
}
.generateButton:hover{
  cursor: pointer;
}
.vw{
  background-color: red !important;
  margin-left: 24px !important; 
}
.width{
  width: 60% !important;
}
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
.row2{
  width: 100%;
  display: flex;
  flex-direction: row;
}
.userContainer {
  height: 96px;
  width: 100%;
  border: 0.01rem solid #939393;
  background-color: white;
  text-decoration: none;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.right{
  margin-left: auto;
  margin-right: 24px;
}
.left{
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin-left: 24px;
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
