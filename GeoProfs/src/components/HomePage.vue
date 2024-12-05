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

      }
    },
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
