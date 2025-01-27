<template>
  <div class="headerContainer">
    <div class="aroundLogo">
      <img src="@/assets/logo-geo.jpeg" alt="Logo" class="logo" />
    </div>
    <div class="header">
      <div class="dropdown">
        <img src="@/assets/profile-icon-white.png" alt="Profile Icon" class="profile-icon" />
        <button class="dropdown-content">
          <span @click="logout" class="logout-text">Logout</span>
          
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { signOut } from 'firebase/auth'
import { auth } from '../firebase'
export default {
  methods: {
    async logout() {
      try {
        await signOut(auth)
        this.$emit('logout-success')
        console.log('User logged out successfully')
      } catch (error) {
        console.error('Error during logout:', error)
      }
    }
  }
}
</script>

<style scoped lang="scss">
.headerContainer {
  display: flex;
  flex-direction: row;

  .aroundLogo {
    height: 15vh;
    width: 10%;
    display: flex;
    justify-content: center;
    align-items: center;

    .logo {
      width: 55%;
      border-radius: 50%;
      margin-top: 12px;
      margin-bottom: 12px;
    }
  }

  .header {
    width: 90%;
    display: flex;
    align-items: center;
    justify-content: end;
    padding: 16px;
    background-color: #001f6b;
    color: white;

    .profile-icon {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      margin-left: auto;
      cursor: pointer;
    }

    .dropdown {
      height: 50px;
      width: 50px;
      position: relative;
      display: flex;
      background-color: transparent;

      &:hover .dropdown-content {
        display: block;
      }

      .dropdown-content {
        display: none;
        position: absolute;
        background-color: #f9f9f9;
        width: 6vw;
        height: 5vh;
        border: none;
        z-index: 1;
        top: 100%;
        right: 0;
        cursor: pointer;

        .logout-text {
          font-weight: 400;
          color: #000;
          cursor: pointer;
        }
      }
    }
  }
}
</style>

