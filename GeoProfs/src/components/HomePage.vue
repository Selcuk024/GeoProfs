<template>
  <div class="home-page">
    <HeaderComponent />
    <div class="content">
      <NavTabs :currentTab="currentTab" :userId="userId" @change-tab="currentTab = $event" />
      <div class="main-content">
        <component :is="currentComponent" />
      </div>
    </div>
  </div>
</template>

<script>
import NavTabs from "@/components/NavTabs.vue";
import VerlofPage from "@/components/VerlofPage.vue";
import AfwezigPage from "@/components/AfwezigPage.vue";
import HeaderComponent from "@/components/HeaderComponent.vue";
import ProfilePage from "@/components/ProfilePage.vue";
import AdminPage from "@/components/AdminPage.vue";
import { getAuth } from "firebase/auth";

export default {
  name: "HomePage",
  components: {
    HeaderComponent,
    NavTabs,
    VerlofPage,
    AfwezigPage,
    ProfilePage,
    AdminPage,
  },
  data() {
    return {
      currentTab: "verlof",
      userId: null, // Opslag voor de huidige userId
    };
  },
  computed: {
    currentComponent() {
      switch (this.currentTab) {
        case "verlof":
          return "VerlofPage";
        case "afwezig":
          return "AfwezigPage";
        case "profiel":
          return "ProfilePage";
        case "admin":
          return "AdminPage";
      }
    },
  },
  async created() {
    // Haal de huidige gebruiker op via Firebase Authentication
    const auth = getAuth();
    const currentUser = auth.currentUser;

    if (currentUser) {
      this.userId = currentUser.uid;
    } else {
      console.error("Geen gebruiker ingelogd.");
    }
  },
};
</script>

<style scoped>
button {
  padding: 10px 20px;
  font-size: 1rem;
  color: white;
  background-color: red;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.content {
  display: flex;
  flex: 1;
  height: 85vh;
}

.main-content {
  flex: 1;
  overflow-y: auto;
  background-color: #f5f5f5;
}

button:hover {
  background-color: darkred;
}
</style>
