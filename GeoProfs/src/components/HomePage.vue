<template>
  <div class="home-page">
    <HeaderComponent />
  </div>
  <div class="content">
    <NavTabs :currentTab="currentTab" @change-tab="currentTab = $event" />
    <div class="main-content">
      <component :is="currentComponent" />
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

button:hover {
  background-color: darkred;
}
</style>
