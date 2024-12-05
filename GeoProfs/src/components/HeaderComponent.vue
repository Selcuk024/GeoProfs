<template>
  <div class="headerContainer">
    <div class="aroundLogo">
      <img src="@/assets/logo-geo.jpeg" alt="Logo" class="logo" />
    </div>
    <div class="header">
      <img src="@/assets/profile-icon-white.png" alt="Profile Icon" class="profile-icon" />
    </div>
  </div>
</template>

<style scoped>
.header {
  width: 90%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  background-color: #001f6b;
  /* Donkerblauw */
  color: white;
}

.aroundLogo {
  width: 10%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.logo{
  width: 55%;
  border-radius: 50%;
  margin-top: 12px;
  margin-bottom: 12px;
}

.profile-icon {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-left: auto;
}

.headerContainer {
  display: flex;
  flex-direction: row;
}
</style>