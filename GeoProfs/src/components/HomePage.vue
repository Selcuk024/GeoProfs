<template>
  <div class="home-page">
    <HeaderComponent />
    <NavTabs :currentTab="currentTab" @change-tab="currentTab = $event" />
    <component :is="currentComponent" />
  </div>
</template>

<script>
import NavTabs from "@/components/NavTabs.vue";
import VerlofPage from "@/components/VerlofPage.vue";
import AfwezigPage from "@/components/AfwezigPage.vue";
import HeaderComponent from "@/components/HeaderComponent.vue";

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
.home-page {
  font-family: 'Inter', sans-serif;
}
</style>
