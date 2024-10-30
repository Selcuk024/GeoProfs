<template>
  <div class="header">
    <img src="@/assets/logo-geo.jpeg" alt="Logo" class="logo" />
    <h1>Welkom Marco</h1>
    <img src="@/assets/profile-image.png" alt="Profile Icon" class="profile-icon" />
  </div>
</template>

<script>
export default {
  name: 'HeaderComponent'
}
</script>

<style scoped>
body {
  font-family: 'Inter', sans-serif;
}
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  background-color: #e87722;
  color: white;
  font-size: 1.5rem;
}
.logo,
.profile-icon {
  width: 40px;
  height: 40px;
}
</style>
