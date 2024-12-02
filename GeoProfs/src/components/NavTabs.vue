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
  </div>
</template>

<script>
export default {
  name: 'NavTabs',
  props: {
    currentTab: String
  }
}
</script>

<style scoped>
.header {
  margin: 0;
  padding: 0;
}


.nav-tabs {
  display: flex;
  flex-direction: column; /* Maakt het verticaal */
  width: 10%;
  background-color: #001f6b; /* Donkerblauwe zijbalk */
  color: white;
  padding-top: 20px;
  margin: 0;
  padding: 0;
  justify-content: space-evenly;
}

button {
  padding: 15px;
  color: white;
  border: none;
  background: none;
  text-align: left;
  cursor: pointer;
}

button.active {
  background-color: #4a90e2;
}

button:hover {
  background-color: #3a7bd5;
}
</style>
