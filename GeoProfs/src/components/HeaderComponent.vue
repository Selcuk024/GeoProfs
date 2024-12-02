<template>
  <div class="header">
    <img src="@/assets/logo-geo.jpeg" alt="Logo" class="logo" />
    <img src="@/assets/profile-icon-white.png" alt="Profile Icon" class="profile-icon" />
  </div>
</template>

<style scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  background-color: #001f6b; /* Donkerblauw */
  color: white;
}

.logo,
.profile-icon {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
</style>
