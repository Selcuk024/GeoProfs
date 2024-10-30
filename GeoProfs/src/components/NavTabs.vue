<template>
    <div class="nav-tabs">
      <button @click="$emit('change-tab', 'verlof')">Verlof</button>
      <button @click="$emit('change-tab', 'afwezig')">Afwezig</button>
      <button @click="$emit('change-tab', 'profiel')">Profiel</button>
    </div>
  </template>
  
  <script>
  export default {
    name: "NavTabs",
  };
  </script>
  
  <style scoped>
  .nav-tabs {
    display: flex;
    background-color: #e0e0e0;
  }
  button {
    flex: 1;
    padding: 10px;
    border: none;
    background: #fff;
    cursor: pointer;
  }
  button:focus {
    outline: none;
  }
  </style>
  