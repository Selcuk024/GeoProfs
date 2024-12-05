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

  export default {
    name: 'AdminPage',
  };
  </script>
  