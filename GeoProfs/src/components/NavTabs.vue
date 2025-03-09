<template>
  <!-- container voor navigatietabs met role tablist -->
  <div class="nav-tabs" role="tablist" aria-label="navigatie tabs">
    <!-- knop voor de verlof tab -->
    <button
      :class="{ active: currentTab === 'verlof' }"
      @click="$emit('change-tab', 'verlof')"
      role="tab"
      :aria-selected="currentTab === 'verlof'"
      aria-controls="verlof-panel"
    >
      Verlof
    </button>
    <!-- knop voor de afwezig tab -->
    <button
      :class="{ active: currentTab === 'afwezig' }"
      @click="$emit('change-tab', 'afwezig')"
      role="tab"
      :aria-selected="currentTab === 'afwezig'"
      aria-controls="afwezig-panel"
    >
      Afwezig
    </button>
    <!-- knop voor de profiel tab -->
    <button
      :class="{ active: currentTab === 'profiel' }"
      @click="$emit('change-tab', 'profiel')"
      role="tab"
      :aria-selected="currentTab === 'profiel'"
      aria-controls="profiel-panel"
    >
      Profiel
    </button>
    <!-- knop voor de admin tab, zichtbaar als gebruiker admin is -->
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
// importeer firestore functies voor ophalen van gebruikersdata
import { doc, getDoc } from "firebase/firestore"
import { db } from "@/firebase"

export default {
  name: "NavTabs",
  props: {
    currentTab: String,
    userId: String,
  },
  data() {
    return {
      // boolean om admin rechten vast te stellen
      isAdmin: false,
    }
  },
  async created() {
    // controleer of er een userId is doorgegeven
    if (this.userId) {
      try {
        // haal het gebruikersdocument op uit de database
        const userDocRef = doc(db, "users", this.userId)
        const userDoc = await getDoc(userDocRef)

        if (userDoc.exists()) {
          const userData = userDoc.data()
          console.log("gebruikersgegevens:", userData)
          // als de positie 'Manager' of 'Office Manager' is, geef admin
          if (["Office Manager", "Manager"].includes(userData.positie)) {
            this.isAdmin = true
          }
        } else {
          console.error("gebruikersdocument niet gevonden.")
        }
      } catch (error) {
        console.error("fout bij ophalen gebruikersgegevens:", error)
      }
    } else {
      console.error("geen userId beschikbaar.")
    }
  },
}
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
