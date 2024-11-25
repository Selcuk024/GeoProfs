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


export default {
  name: "HomePage",
  components: {
    HeaderComponent,
    NavTabs,
    VerlofPage,
    AfwezigPage,
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
        default:
          return "VerlofPage";
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
  flex: 1;
}

.main-content {
  flex: 1;
  overflow-y: auto;
  background-color: #f5f5f5;
}
</style>
