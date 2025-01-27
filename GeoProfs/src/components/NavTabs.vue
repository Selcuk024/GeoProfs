<template>
  <div class="nav-tabs">
    <button :class="{ active: currentTab === 'verlof' }" @click="$emit('change-tab', 'verlof')">
      Verlof
    </button>
    <button :class="{ active: currentTab === 'afwezig' }" @click="$emit('change-tab', 'afwezig')">
      Afwezig
    </button>
    <button :class="{ active: currentTab === 'profiel' }" @click="$emit('change-tab', 'profiel')">
      Profiel
    </button>
    <!-- Toon de admin-tab alleen als de gebruiker admin is -->
    <button
      v-if="isAdmin"
      :class="{ active: currentTab === 'admin' }"
      @click="$emit('change-tab', 'admin')"
    >
      Admin
    </button>
  </div>
</template>

<script>
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase";

export default {
  name: "NavTabs",
  props: {
    currentTab: String,
    userId: String, // Ontvang de userId als prop
  },
  data() {
    return {
      isAdmin: false, // Admin-rechten standaard uitgeschakeld
    };
  },
  async created() {
    if (this.userId) {
      try {
        // Haal de Firestore-document van de gebruiker op
        const userDocRef = doc(db, "users", this.userId);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          const userData = userDoc.data();
          console.log("Gebruikersgegevens:", userData); // Debug-log
          // Controleer of de gebruiker een admin-rol heeft
          if (["Office Manager", "Manager"].includes(userData.positie)) {
            this.isAdmin = true;
          }
        } else {
          console.error("Gebruikersdocument niet gevonden.");
        }
      } catch (error) {
        console.error("Fout bij ophalen gebruikersgegevens:", error);
      }
    } else {
      console.error("Geen userId beschikbaar.");
    }
  },
};
</script>

<style scoped lang="scss">
.nav-tabs {
  display: flex;
  flex-direction: column;
  width: 10%;
  height: 85vh;
  background-color: #001f6b;
  color: white;
  padding-top: 20px;
  margin: 0;
  justify-content: space-evenly;

  button {
    padding: 15px;
    color: white;
    border: none;
    background: none;
    text-align: left;
    cursor: pointer;

    &.active {
      background-color: #4a90e2;
    }

    &:hover {
      background-color: #3a7bd5;
    }
  }
}
</style>

