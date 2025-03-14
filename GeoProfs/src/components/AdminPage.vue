<template>
  <main class="container">
    <!-- header sectie met titel -->
    <header>
      <h1 class="title">Admin Panel</h1>
    </header>

    <!-- navigatie met icons -->
    <nav class="icons-container" aria-label="Quick access icons">
      <div class="circle" aria-label="Manage Users" role="button" tabindex="0">
        <img src="@/assets/users.png" alt="Users" class="users-img" />
      </div>
      <div class="circle" aria-label="Manage Leave Requests" role="button" tabindex="0">
        <img src="@/assets/leave.jpg" alt="Leave Requests" class="leave-img" />
      </div>
    </nav>

    <!-- sectie voor het beheren van gebruikers -->
    <section aria-labelledby="users-section">
      <h2 class="title">Users</h2>
      <div class="big-container">
        <!-- loop door de lijst van gebruikers en toon hun gegevens -->
        <article
          class="user-container"
          v-for="user in users"
          :key="user.id"
          aria-labelledby="'user-' + user.id"
        >
          <div class="left">
            <p class="user" :id="'user-' + user.id">{{ user.username }}</p>
            <p class="user">Aangemaakt: {{ user.date }}</p>
          </div>
          <div class="right">
            <!-- knop om gebruikersinformatie te bekijken -->
            <button
              class="add-user-button"
              @click="showUserInfo(user)"
              aria-label="View information for {{ user.username }}"
            >
              Informatie
            </button>
            <!-- knop om een gebruiker te verwijderen -->
            <button
              class="add-user-button vw"
              @click="deleteUser(user.id)"
              aria-label="Delete user {{ user.username }}"
            >
              Verwijder Gebruiker
            </button>
          </div>
        </article>

        <!-- knop om een formulier voor het aanmaken van gebruikers te tonen -->
        <button
          class="add-user-button"
          @click="showForm = !showForm"
          :aria-expanded="showForm"
          aria-controls="create-user-form"
        >
          {{ showForm ? "Annuleer" : "Gebruiker Aanmaken" }}
        </button>

        <!-- formulier voor het aanmaken van een nieuwe gebruiker -->
        <form
          v-if="showForm"
          @submit.prevent="addUser"
          id="create-user-form"
          class="user-form"
        >
          <h2 id="form-title" class="sr-only">Create New User</h2>
          <input v-model="newUsername" type="text" placeholder="Enter username" class="input-field" required />
          <input v-model="email" type="email" placeholder="Enter email" class="input-field" required />
          <input v-model="Bsn" type="text" placeholder="Enter BSN" class="input-field" required />
          <input v-model="Afdeling" type="text" placeholder="Enter afdeling" class="input-field" required />
          <div v-if="errorMessage" class="error-message" role="alert">{{ errorMessage }}</div>
          <div class="row2">
            <!-- genereer wachtwoord veld -->
            <input
              v-model="generatedPassword"
              type="password"
              :readonly="true"
              disabled
              placeholder="Wachtwoord"
              class="input-field width"
            />
            <button type="button" @click="generatePassword" class="generate-button" aria-label="Generate Password">
              Genereer Wachtwoord
            </button>
          </div>
          <!-- dropdown voor positie selectie -->
          <select v-model="Positie" class="input-field" aria-label="Select Position">
            <option value="Werknemer">Werknemer</option>
            <option value="Manager">Manager</option>
            <option value="Office Manager">Office Manager</option>
          </select>
          <button type="submit" class="submit-button">User Aanmaken</button>
        </form>
      </div>
    </section>

    <!-- sectie voor het beheren van verlofaanvragen -->
    <section aria-labelledby="leave-requests-section">
      <h2 id="leave-requests-section" class="title">Verlofaanvragen</h2>
      <div class="big-container">
        <!-- loop door de verlofaanvragen en toon details -->
        <article
          class="user-container"
          v-for="verlof in verlofList"
          :key="verlof.id"
          aria-labelledby="'leave-' + verlof.id"
        >
          <div class="left">
            <p class="verlof-reden" :id="'leave-' + verlof.id">Reden: {{ verlof.reason }}</p>
            <p class="verlof-datum">Van: {{ verlof.startDate }} Tot: {{ verlof.endDate }}</p>
            <p class="status">
              Status: <span :class="verlof.status">{{ verlof.status }}</span>
            </p>
          </div>
          <div class="right">
            <!-- knop om een verlofaanvraag goed te keuren -->
            <button
              class="add-user-button approve"
              @click="updateVerlofStatus(verlof.id, 'Goedgekeurd')"
              aria-label="Approve leave request for {{ verlof.reason }}"
            >
              Goedkeuren
            </button>
            <!-- knop om een verlofaanvraag af te keuren -->
            <button
              class="add-user-button reject"
              @click="updateVerlofStatus(verlof.id, 'Afgewezen')"
              aria-label="Reject leave request for {{ verlof.reason }}"
            >
              Afkeuren
            </button>
          </div>
        </article>
      </div>
    </section>

    <!-- modal voor gebruikersinformatie -->
    <div v-if="selectedUser" class="modal" role="dialog" aria-labelledby="modal-title" aria-modal="true">
      <div class="modal-content">
        <h2 id="modal-title" class="info">Gebruiker Informatie</h2>
        <p><strong>Username:</strong> {{ selectedUser.username || "Geen username gevonden" }}</p>
        <p><strong>Gemaakt op:</strong> {{ selectedUser.date || "Geen datum gevonden" }}</p>
        <p><strong>BSN:</strong> {{ selectedUser.bsn || "Geen BSN gevonden" }}</p>
        <p><strong>Afdeling:</strong> {{ selectedUser.afdeling || "Afdeling niet gevonden" }}</p>
        <p><strong>Positie:</strong> {{ selectedUser.positie || "Positie niet gevonden" }}</p>
        <button class="close-button" @click="selectedUser = null" aria-label="Close user information modal">
          Terug
        </button>
      </div>
    </div>
  </main>
</template>


<script>
// importeer de benodigde functies en variabelen
import {
  collection,
  getDocs,
  addDoc,
  doc,
  deleteDoc,
  setDoc,
  Timestamp,
} from "firebase/firestore";
import { createUserWithEmailAndPassword, deleteUser as deleteAuthUser } from "firebase/auth";
import { db, auth } from "../firebase";

export default {
  name: "AdminPage",
  data() {
    return {
      // array voor gebruikers
      users: [],
      // array voor verlofaanvragen
      verlofList: [],
      // boolean om formulier te tonen/verbergen
      showForm: false,
      // velden voor nieuw gebruiker formulier
      newUsername: "",
      email: "",
      date: "",
      Bsn: "",
      Afdeling: "",
      generatedPassword: "",
      Positie: "",
      // geselecteerde gebruiker voor modal venster
      selectedUser: null,
      // foutmelding bij invoer
      errorMessage: "",
    };
  },
  async created() {
    // zodra de component wordt aangemaakt, haal gebruikers en verlofaanvragen op
    this.fetchUsers();
    this.fetchVerlofRequests();
  },
  methods: {
    async fetchUsers() {
      try {
        // haal de documenten op uit de 'users' collectie
        const querySnapshot = await getDocs(collection(db, "users"));
        // verwerk de documenten tot een array met gebruikers
        this.users = querySnapshot.docs.map((doc) => {
          let userData = doc.data();

          // convert firestore timestamp naar een leesbaar datum formaat
          if (userData.date && userData.date.seconds) {
            const dateObj = new Date(userData.date.seconds * 1000);
            userData.date = dateObj.toLocaleDateString("nl-NL"); // formaat: dd-mm-jjjj
          }

          return { id: doc.id, ...userData };
        });
      } catch (error) {
        // log fouten naar de console voor debug
        console.error("error fetching data: ", error);
      }
    },

    async fetchVerlofRequests() {
      try {
        // haal de documenten op uit de 'verlofAanvragen' collectie
        const querySnapshot = await getDocs(collection(db, "verlofAanvragen"));
        // verwerk de documenten tot een array en filter op status 'Verzonden'
        this.verlofList = querySnapshot.docs
          .map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
          .filter((verlof) => verlof.status === "Verzonden");
      } catch (error) {
        // log fouten naar de console voor debug
        console.error("error fetching verlof requests:", error);
      }
    },

    generatePassword() {
      // genereer een random wachtwoord van 12 tekens
      const length = 12;
      const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
      let password = "";
      for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        password += charset[randomIndex];
      }
      // sla het gegenereerde wachtwoord op
      this.generatedPassword = password;
    },

    async addUser() {
      try {
        // controleer of alle velden zijn ingevuld
        if (
          !this.newUsername ||
          !this.email ||
          !this.generatedPassword ||
          !this.Bsn ||
          !this.Afdeling
        ) {
          this.errorMessage = "vul alle velden in voordat je doorgaat.";
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

        // maak een timestamp voor de datum
        this.date = Timestamp.now();

        // maak een nieuwe gebruiker aan via firebase authentication
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          this.email,
          this.generatedPassword
        );
        const userId = userCredential.user.uid;

        // sla de gebruiker op in firestore
        await setDoc(doc(db, "users", userId), {
          username: this.newUsername,
          email: this.email,
          date: this.date, // timestamp voor de datum
          bsn: this.Bsn,
          wachtwoord: this.generatedPassword,
          afdeling: this.Afdeling,
          positie: this.Positie,
        });
        // haal de gebruikerslijst opnieuw op
        await this.fetchUsers();

        // reset de formulier velden
        this.newUsername = "";
        this.email = "";
        this.generatedPassword = "";
        this.Bsn = "";
        this.Afdeling = "";
        this.Positie = "";
        this.showForm = false;
      } catch (error) {
        // log fouten naar de console voor debug
        console.error("error adding user:", error.message);
      }
    },

    async deleteUser(userId) {
      try {
        // verwijder de gebruiker uit firestore
        const userDoc = doc(db, "users", userId);
        await deleteDoc(userDoc);

        // als de huidige auth gebruiker overeenkomt, verwijder ook uit firebase authentication
        const authUser = auth.currentUser;
        if (authUser && authUser.uid === userId) {
          await deleteAuthUser(authUser);
        }

        // haal de gebruikerslijst opnieuw op
        await this.fetchUsers();
      } catch (error) {
        // log fouten naar de console voor debug
        console.error("error deleting user: ", error);
      }
    },

    showUserInfo(user) {
      // zet de geselecteerde gebruiker zodat de modal getoond wordt
      this.selectedUser = user;
    },

    async updateVerlofStatus(verlofId, newStatus) {
      try {
        // haal de specifieke verlofaanvraag op
        const verlofDoc = doc(db, "verlofAanvragen", verlofId);
        // werk de status bij met merge zodat overige data behouden blijft
        await setDoc(verlofDoc, { status: newStatus }, { merge: true });
        // haal de verlofaanvragen opnieuw op
        await this.fetchVerlofRequests();
      } catch (error) {
        // log fouten naar de console voor debug
        console.error("error updating verlof status:", error);
      }
    },
  },
};
</script>

<style scoped lang="scss">
/* definieer scss variabelen */
$error-message-color: red;
$primary-color: #209fd2;
$tab-active-bg: #f0f0f0;
$tab-inactive-bg: #b7b7b7;
$border-color: #ccc;
$border-radius: 13px;

.error-message {
  color: $error-message-color;
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

  .circle {
    width: 70px;
    height: 70px;
    background-color: #ccc;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;

    .users-img {
      width: 65%;
    }

    .leave-img {
      width: 60%;
      padding-left: 5px;
    }
  }
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

  .modal-content {
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    width: 400px;
    text-align: center;

    .info {
      margin-bottom: 24px;
    }

    .close-button {
      padding: 8px 16px;
      background-color: $primary-color;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      margin-top: 20px;
    }
  }
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

  &:hover {
    cursor: pointer;
  }
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

  .big-container {
    display: flex;
    flex-direction: column;
    width: 70%;
    margin-left: 24px;

    .user-container {
      height: 96px;
      width: 100%;
      border: 0.01rem solid #939393;
      background-color: white;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;

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
    }
  }

  .title {
    margin: 24px;
  }
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
}

.approve {
  background-color: #28a745;
  color: white;
  margin-right: 24px;

  &:hover {
    opacity: 0.9;
  }
}

.reject {
  background-color: #dc3545;
  color: white;

  &:hover {
    opacity: 0.9;
  }
}

@media (max-width: 768px) {
  .container {
    padding: 10px;
  }

  .user-container {
    display: flex !important;
    flex-direction: column !important;
    align-items: flex-start !important;
    padding: 15px;
  }

  .right {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }

  .status {
    width: 160px;
  }

  .icons-container {
    width: 100%;
    margin-left: 30px;
    justify-content: flex-start;
    padding: 10px 0;
    gap: 10px;

    .circle {
      width: 60px;
      height: 60px;

      .users-img,
      .leave-img {
        width: 50%;
      }
    }
  }

  .add-user-button {
    padding: 2px 8px;
    font-size: 16px;
    cursor: pointer;
    background-color: black;
    color: white;
    border: none;
    border-radius: 4px;
    margin-top: 4px;
  }

  .add {
    padding: 2px 8px;
    height: 40px;
    width: 180px;
    font-size: 16px;
    cursor: pointer;
    background-color: black;
    color: white;
    border: none;
    border-radius: 4px;
    margin-top: 4px;
  }

  .vw {
    background-color: red !important;
    margin-left: 13px !important;
  }
}
</style>
