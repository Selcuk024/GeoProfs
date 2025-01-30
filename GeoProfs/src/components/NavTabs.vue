<template>
  <div class="nav-tabs" role="tablist" aria-label="Navigatie tabs">
    <button
      :class="{ active: currentTab === 'verlof' }"
      @click="$emit('change-tab', 'verlof')"
      role="tab"
      :aria-selected="currentTab === 'verlof'"
      aria-controls="verlof-panel"
    >
      Verlof
    </button>
    <button
      :class="{ active: currentTab === 'afwezig' }"
      @click="$emit('change-tab', 'afwezig')"
      role="tab"
      :aria-selected="currentTab === 'afwezig'"
      aria-controls="afwezig-panel"
    >
      Afwezig
    </button>
    <button
      :class="{ active: currentTab === 'profiel' }"
      @click="$emit('change-tab', 'profiel')"
      role="tab"
      :aria-selected="currentTab === 'profiel'"
      aria-controls="profiel-panel"
    >
      Profiel
    </button>
    <button
      v-if="isAdmin"
      :class="{ active: currentTab === 'admin' }"
      @click="$emit('change-tab', 'admin')"
      role="tab"
      :aria-selected="currentTab === 'admin'"
      aria-controls="admin-panel"
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
    userId: String,
  },
  data() {
    return {
      isAdmin: false,
    };
  },
  async created() {
    if (this.userId) {
      try {
        const userDocRef = doc(db, "users", this.userId);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          const userData = userDoc.data();
          console.log("Gebruikersgegevens:", userData);
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
