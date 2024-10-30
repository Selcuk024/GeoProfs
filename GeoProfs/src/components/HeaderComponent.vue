<template>
    <div class="header">
      <h1>Welkom Marco</h1>
    </div>
  </template>
  
  <script>
  export default {
    name: "HeaderComponent",
  };
  </script>
  
  <style scoped>
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px;
    background-color: #e87722;
  }
  .logo, .profile-icon {
    width: 40px;
    height: 40px;
  }
  </style>
  