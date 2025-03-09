<template>
  <!-- container voor de home pagina -->
  <div class="home-page">
    <!-- header component met logo en navigatie -->
    <HeaderComponent />
    <!-- container voor de hoofdinhoud -->
    <div class="content">
      <!-- navigatietabs component met huidige tab en userId -->
      <NavTabs class="comp" :currentTab="currentTab" :userId="userId" @change-tab="currentTab = $event" />
      <!-- container voor de geladen component op basis van de tab -->
      <div class="main-content">
        <component :is="currentComponent" />
      </div>
    </div>
  </div>
</template>

<script>
// importeer benodigde componenten
import NavTabs from "@/components/NavTabs.vue"
import VerlofPage from "@/components/VerlofPage.vue"
import AfwezigPage from "@/components/AfwezigPage.vue"
import HeaderComponent from "@/components/HeaderComponent.vue"
import ProfilePage from "@/components/ProfilePage.vue"
import AdminPage from "@/components/AdminPage.vue"
import { getAuth } from "firebase/auth"

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
      // standaard ingestelde tab is 'verlof'
      currentTab: "verlof",
      // opslag voor de huidige userId
      userId: null,
    }
  },
  computed: {
    // bepaal de component die getoond wordt op basis van de huidige tab
    currentComponent() {
      switch (this.currentTab) {
        case "verlof":
          return "VerlofPage"
        case "afwezig":
          return "AfwezigPage"
        case "profiel":
          return "ProfilePage"
        case "admin":
          return "AdminPage"
      }
    },
  },
  async created() {
    // haal de huidige gebruiker op via firebase authentication
    const auth = getAuth()
    const currentUser = auth.currentUser

    if (currentUser) {
      this.userId = currentUser.uid
    } else {
      console.error("geen gebruiker ingelogd.")
    }
  },
}
</script>

<style scoped lang="scss">
button {
  padding: 10px 20px;
  font-size: 1rem;
  color: white;
  background-color: red;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: darkred;
  }
}

.content {
  display: flex;
  flex: 1;
  height: 85vh;

  .main-content {
    flex: 1;
    overflow-y: auto;
    background-color: #f5f5f5;
  }
}

@media (max-width: 768px) {
  .nav-tabs {
    display: flex;
    flex-direction: row;
    bottom: 0;
    width: 100%;
    height: unset;
    padding: 20px;
  }
  .content {
    flex-direction: column-reverse;
  }
}
</style>
