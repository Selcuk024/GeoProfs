<template>
  <div class="container">
    <h1 class="username">Welkom Marco</h1>
    <div class="miniContainer">
      <div class="tabs">
        <button
          v-for="(tab, index) in tabs"
          :key="index"
          :class="['tab', { active: currentTab === tab }]"
          @click="currentTab = tab"
        >
          {{ tab }}
        </button>

        <div id="app">
          <button class="add" @click="showModal = true">+</button>
          <VerlofModal v-if="showModal" @close="showModal = false"> </VerlofModal>
        </div>
      </div>
    </div>
    <div class="content">
      <div v-if="currentTab === 'Verlof'" class="allItems">
        <div class="verlof-item" v-for="(item, index) in filteredVerlof('Verzonden')" :key="index">
          <div class="verlof-content">
            <p class="title">Reden: {{ item.reason }}</p>
            <p class="date">Van: {{ item.startDate }} Tot: {{ item.endDate }}</p>
            <p class="status">
              Status: <span :class="item.status">{{ item.status }}</span>
            </p>
            <p class="type">Type: {{ item.type }}</p>
          </div>
        </div>
      </div>

      <div v-if="currentTab === 'Goedgekeurd'" class="allItems">
        <div
          class="verlof-item"
          v-for="(item, index) in filteredVerlof('Goedgekeurd')"
          :key="index"
        >
          <div class="verlof-content">
            <p class="title">Reden: {{ item.reason }}</p>
            <p class="date">Van: {{ item.startDate }} Tot: {{ item.endDate }}</p>
            <p class="status">
              Status: <span :class="item.status">{{ item.status }}</span>
            </p>
            <p class="type">Type: {{ item.type }}</p>
          </div>
        </div>
      </div>

      <div v-if="currentTab === 'Afgekeurd'" class="allItems">
        <div class="verlof-item" v-for="(item, index) in filteredVerlof('Afgewezen')" :key="index">
          <div class="verlof-content">
            <p class="title">Reden: {{ item.reason }}</p>
            <p class="date">Van: {{ item.startDate }} Tot: {{ item.endDate }}</p>
            <p class="status">
              Status: <span :class="item.status">{{ item.status }}</span>
            </p>
            <p class="type">Type: {{ item.type }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { collection, getDocs } from 'firebase/firestore'
import { db } from '@/firebase'

import VerlofModal from '../components/VerlofModal.vue'

export default {
  name: 'VerlofPage',
  components: {
    VerlofModal
  },
  data() {
    return {
      tabs: ['Verlof', 'Goedgekeurd', 'Afgekeurd'],
      currentTab: 'Verlof',
      showModal: false,
      verlofList: []
    }
  },
  created() {
    this.fetchVerlofRequests()
  },
  methods: {
    async fetchVerlofRequests() {
      try {
        const querySnapshot = await getDocs(collection(db, 'verlofAanvragen'))
        const requests = querySnapshot.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data()
          }
        })
        this.verlofList = requests
      } catch (error) {
        console.error('Error fetching verlof requests:', error)
      }
    },
    filteredVerlof(status) {
      return this.verlofList.filter((item) => item.status === status)
    }
  }
}
</script>

<style scoped lang="scss">
// Define variables for reusability
$primary-color: #209fd2;
$tab-active-bg: #f0f0f0;
$tab-inactive-bg: #b7b7b7;
$border-color: #ccc;
$border-radius: 13px;

// Mixin for flexbox centering
@mixin flex-center($direction: row) {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: $direction;
}

// Styling starts here
.container {
  width: 100%;
  height: 85vh;
  display: flex;
  flex-direction: column;

  .username {
    margin: 24px;
  }
}

.miniContainer {
  width: 100%;
  @include flex-center(column);
  margin-top: 24px;

  .tabs {
    width: 70%;
    display: flex;
    justify-content: flex-start;

    .tab {
      padding: 15px 30px;
      background-color: $tab-inactive-bg;
      border: 1px solid $border-color;
      cursor: pointer;
      color: #000;
      border-radius: $border-radius $border-radius 0 0;
      font-weight: bold;

      &.active {
        background-color: $tab-active-bg;
        color: #000;
      }
    }
  }
}

.add {
  width: 46px;
  height: 46px;
  font-weight: bolder;
  margin-right: 15px;
  font-size: 40px;
  color: white;
  background-color: $primary-color;
  border-radius: $border-radius;
  border: none;
  cursor: pointer;
}

.content {
  height: 100%;
  overflow-y: scroll;

  .allItems {
    @include flex-center(column);

    .verlof-item {
      background-color: white;
      padding: 16px;
      width: 70%;
      border: 1px solid $border-color;

      .verlof-content {
        .title {
          font-weight: bold;
        }

        .date,
        .status,
        .type {
          margin: 4px 0;
        }

        .status {
          span {
            &.Goedgekeurd {
              color: green;
            }

            &.Afgekeurd {
              color: red;
            }

            &.Verzonden {
              color: gray;
            }
          }
        }
      }
    }
  }
}
</style>
