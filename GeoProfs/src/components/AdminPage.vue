<template>
  <div class="container">
    <h1 class="title">Admin Panel</h1>
    <div class="icons-container">
      <div class="circle">
        <img src="@/assets/users.png" alt="Users" class="users-img" />
      </div>
      <div class="circle">
        <img src="@/assets/leave.jpg" alt="Leave" class="leave-img" />
      </div>
    </div>

    <h1 class="title">Users</h1>
    <div class="big-container">
      <div class="user-container" v-for="user in users" :key="user.id">
        <div class="left">
          <p class="user">{{ user.username }}</p>
          <p class="user">Aangemaakt: {{ user.date }}</p>
        </div>
        <div class="right">
          <button class="add-user-button" @click="showUserInfo(user)">Informatie</button>
          <button class="add-user-button vw" @click="deleteUser(user.id)">
            Verwijder Gebruiker
          </button>
        </div>
      </div>

      <button class="add-user-button" @click="showForm = !showForm">
        {{ showForm ? "Annuleer" : "Gebruiker Aanmaken" }}
      </button>

      <form v-if="showForm" @submit.prevent="addUser" class="user-form">
        <input
          v-model="newUsername"
          type="text"
          placeholder="Enter username"
          class="input-field"
        />
        <input
          v-model="email"
          type="email"
          placeholder="Enter email"
          class="input-field"
        />
        <input v-model="Bsn" type="text" placeholder="Enter BSN" class="input-field" />
        <input
          v-model="Afdeling"
          type="text"
          placeholder="Enter afdeling"
          class="input-field"
        />
        <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
        <div class="row2">
          <input
            v-model="generatedPassword"
            type="password"
            :readonly="true"
            disabled
            placeholder="Wachtwoord"
            class="input-field width"
          />
          <button type="button" @click="generatePassword" class="generate-button">
            Genereer Wachtwoord
          </button>
        </div>
        <select v-model="Positie" class="input-field">
          <option value="Werknemer">Werknemer</option>
          <option value="Manager">Manager</option>
          <option value="Office Manager">Office Manager</option>
        </select>
        <button type="submit" class="submit-button">User Aanmaken</button>
      </form>
    </div>

    <h1 class="title">Verlofaanvragen</h1>
    <div class="big-container">
      <div class="user-container" v-for="verlof in verlofList" :key="verlof.id">
        <div class="left">
          <p class="verlof-reden">Reden: {{ verlof.reason }}</p>
          <p class="verlof-datum">Van: {{ verlof.startDate }} Tot: {{ verlof.endDate }}</p>
          <p class="status">
            Status: <span :class="verlof.status">{{ verlof.status }}</span>
          </p>
        </div>
        <div class="right">
          <button
            class="add-user-button approve"
            @click="updateVerlofStatus(verlof.id, 'Goedgekeurd')"
          >
            Goedkeuren
          </button>
          <button class="add-user-button reject" @click="updateVerlofStatus(verlof.id, 'Afgewezen')">
            Afkeuren
          </button>
        </div>
      </div>
    </div>

    <div v-if="selectedUser" class="modal">
      <div class="modal-content">
        <h2 class="info">Gebruiker Informatie</h2>
        <p>
          <strong>Username:</strong>
          {{ selectedUser.username ? selectedUser.username : "Geen username gevonden" }}
        </p>
        <p>
          <strong>Gemaakt op:</strong>
          {{ selectedUser.date ? selectedUser.date : "Geen datum gevonden" }}
        </p>
        <p>
          <strong>BSN:</strong>
          {{ selectedUser.bsn ? selectedUser.bsn : "Geen BSN gevonden" }}
        </p>
        <p>
          <strong>Afdeling:</strong>
          {{ selectedUser.afdeling ? selectedUser.afdeling : "Afdeling niet gevonden" }}
        </p>
        <p>
          <strong>Positie:</strong>
          {{ selectedUser.positie ? selectedUser.positie : "Positie niet gevonden" }}
        </p>
        <button class="close-button" @click="selectedUser = null">Terug</button>
      </div>
    </div>
  </div>
</template>

<script>
import {
  collection,
  getDocs,
  addDoc,
  doc,
  deleteDoc,
  setDoc,
  Timestamp,
} from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { db, auth } from "../firebase";

export default {
  name: "AdminPage",
  data() {
    return {
      users: [],
      verlofList: [],
      showForm: false,
      newUsername: "",
      email: "",
      date: "",
      Bsn: "",
      Afdeling: "",
      generatedPassword: "",
      Positie: "",
      selectedUser: null,
      errorMessage: "",
    };
  },
  async created() {
    this.fetchUsers()
    this.fetchVerlofRequests()
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

    async fetchVerlofRequests() {
      try {
        const querySnapshot = await getDocs(collection(db, 'verlofAanvragen'))
        this.verlofList = querySnapshot.docs
          .map((doc) => ({
            id: doc.id,
            ...doc.data()
          }))
          .filter((verlof) => verlof.status === 'Verzonden') // Filteren op 'Verzonden' status
      } catch (error) {
        console.error('Error fetching verlof requests:', error)
      }
    },

    generatePassword() {
      const length = 12;
      const charset =
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
      let password = "";
      for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        password += charset[randomIndex];
      }
      this.generatedPassword = password;
    },

    async addUser() {
      try {
        if (
          !this.newUsername ||
          !this.email ||
          !this.generatedPassword ||
          !this.Bsn ||
          !this.Afdeling
        ) {
          this.errorMessage = "Vul alle velden in voordat je doorgaat.";
          return;
        }
        if (
          !this.newUsername.trim() ||
          !this.email.trim() ||
          !this.generatedPassword.trim() ||
          !this.Bsn.trim() ||
          !this.Afdeling.trim()
        )
          return;

        const currentDate = new Date();
        // Correcte omzetting naar Firestore Timestamp
        this.date = Timestamp.now(); // Dit maakt de datum een Firestore Timestamp.

        const userCredential = await createUserWithEmailAndPassword(
          auth,
          this.email,
          this.generatedPassword
        );
        const userId = userCredential.user.uid;
        
        await setDoc(doc(db, 'users', userId), {
          username: this.newUsername,
          email: this.email,
          date: this.date, // Timestamp voor de datum
          bsn: this.Bsn,
          wachtwoord: this.generatedPassword,
          afdeling: this.Afdeling,
          positie: this.Positie,
        });
        await this.fetchUsers()

        this.newUsername = ''
        this.email = ''
        this.generatedPassword = ''
        this.Bsn = ''
        this.Afdeling = ''
        this.Positie = ''
        this.showForm = false
      } catch (error) {
        console.error("Error adding user:", error.message);
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
      this.selectedUser = user
    },

    async updateVerlofStatus(verlofId, newStatus) {
      try {
        // Haal de specifieke verlofaanvraag op
        const verlofDoc = doc(db, 'verlofAanvragen', verlofId)

        // Werk de status bij
        await setDoc(verlofDoc, { status: newStatus }, { merge: true })

        // Haal de verlofaanvragen opnieuw op om de lijst te vernieuwen
        await this.fetchVerlofRequests()
      } catch (error) {
        console.error('Error updating verlof status:', error)
      }
    }
  }
}
</script>

<style scoped>
.error-message {
  color: red;
  font-size: 14px;
  margin-bottom: 10px;
}
.icons-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 15%;
  height: 10vh;
  padding-left: 30px;
}

.circle {
  width: 70px;
  height: 70px;
  background-color: #ccc;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.icon {
  font-size: 20px;
}

.users-img {
  width: 65%;
}

.leave-img {
  width: 60%;
  padding-left: 5px;
}

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

.info {
  margin-bottom: 24px;
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
  text-align: center;
}

.close-button {
  padding: 8px 16px;
  background-color: #209fd2;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 20px;
}

.generate-button {
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

.generate-button:hover {
  cursor: pointer;
}

.vw {
  background-color: red !important;
  margin-left: 24px !important;
}

.width {
  width: 60% !important;
}

.container {
  width: 100%;
  height: 85vh;
  display: flex;
  flex-direction: column;
}

.big-container {
  display: flex;
  flex-direction: column;
  width: 70%;
  margin-left: 24px;
}

.title {
  margin: 24px;
}

.row2 {
  width: 100%;
  display: flex;
  flex-direction: row;
}

.user-container {
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

.right {
  margin-left: auto;
  margin-right: 24px;
}

.left {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin-left: 24px;
}

.add-user-button {
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

.user-form {
  display: flex;
  flex-direction: column;
  width: 50%;
}

.input-field {
  margin-bottom: 8px;
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.submit-button {
  padding: 8px 16px;
  font-size: 16px;
  cursor: pointer;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
}

.approve {
  background-color: #28a745;
  color: white;
  margin-right: 24px;
}

.reject {
  background-color: #dc3545;
  color: white;
}

.approve:hover,
.reject:hover {
  opacity: 0.9;
}
</style>
