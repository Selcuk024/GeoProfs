<template>
  <div class="home-page">
    <HeaderComponent />
    <div class="content">
      <NavTabs :currentTab="currentTab" @change-tab="currentTab = $event" />
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
import { useCollection } from 'vuefire'
import { collection } from 'firebase/firestore'
import ProfilePage from "./ProfilePage.vue";
import AdminPage from "./AdminPage.vue";

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
          return "AdminPage"
      }
    },
  },
};
</script>

<style scoped>
*{
  margin: 0px;
  padding: 0px;
}

.home-page {
  display: flex;
  flex-direction: column;
  height: 100vh;
  font-family: 'Inter', sans-serif;
  margin: 0; /* Voeg dit toe */
  padding: 0; /* Voeg dit toe */
}

.content {
  display: flex;
}

.main-content {
  flex: 1;
  overflow-y: auto;
  background-color: #f5f5f5;
}
</style>
