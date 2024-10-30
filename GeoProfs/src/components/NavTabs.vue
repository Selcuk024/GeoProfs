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
body {
  font-family: 'Inter', sans-serif;
}

.nav-tabs {
  display: flex;
  background-color: #e0e0e0;
}
button {
  flex: 1;
  padding: 12px;
  font-size: 1rem;
  border: none;
  background: #f5f5f5;
  cursor: pointer;
}
button.active {
  background-color: #fff;
  font-weight: bold;
}
button:hover {
  background-color: #d0d0d0;
}
button:focus {
  outline: none;
}
</style>
