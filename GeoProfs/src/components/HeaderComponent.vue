<template>
  <!-- container voor de header -->
  <header class="headerContainer">
    <!-- sectie rondom het logo -->
    <section class="aroundLogo">
      <!-- logo van de applicatie -->
      <img src="@/assets/logo-geo.jpeg" alt="geoprofs logo" class="logo" />
    </section>

    <!-- navigatie in de header -->
    <nav class="header">
      <!-- dropdown container voor profielmenu -->
      <div class="dropdown">
        <div class="dropdown">
          <!-- profielicoon, klikbaar om dropdown te openen -->
          <img
            src="@/assets/profile-icon-white.png"
            alt="profile icon"
            class="profile-icon"
            role="button"
            tabindex="0"
            aria-label="profile menu"
            @click="toggleDropdown"
          />
          <!-- dropdown content met logout knop, zichtbaar als dropdownOpen true is -->
          <button
            class="dropdown-content"
            role="menuitem"
            v-show="dropdownOpen"
            aria-hidden="false"
            aria-label="logout button"
          >
            <span @click="logout" class="logout-text">Logout</span>
          </button>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
// importeer signOut functie van firebase auth en de auth configuratie
import { signOut } from 'firebase/auth'
import { auth } from '../firebase'

export default {
  data() {
    return {
      // boolean om bij te houden of de dropdown open is
      dropdownOpen: false
    }
  },
  methods: {
    async logout() {
      try {
        // voer de sign out en stuur een event naar de parent
        await signOut(auth)
        this.$emit('logout-success')
        console.log('user logged out successfully')
      } catch (error) {
        // log fouten bij logout
        console.error('error during logout:', error)
      }
    },
    // wissel de dropdown status
    toggleDropdown() {
      this.dropdownOpen = !this.dropdownOpen
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

@media (max-width: 768px) {
  .headerContainer {
    flex-direction: row;

    .aroundLogo {
      height: auto;
      width: 20%;

      .logo {
        width: 70%;
      }
    }

    .header {
      width: 100%;
      padding: 8px;

      .profile-icon {
        width: 40px;
        height: 40px;
      }

      .dropdown {
        width: auto;
        height: auto;

        .dropdown-content {
          width: 80%;
          height: auto;
        }

        .logout-text {
          text-align: center;
        }
      }
    }
  }
}
</style>
