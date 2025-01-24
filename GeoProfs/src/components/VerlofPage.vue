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

<style scoped>
.tabs {
  width: 70%;
  display: flex;
  justify-content: flex-start;
}

.add {
  width: 46px;
  height: 46px;
  font-weight: bolder;
  margin-right: 15px;
  font-size: 40px;
  color: white;
  background-color: #209fd2;
  border-radius: 13px;
  border: none;
  cursor: pointer;
}

.miniContainer {
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-top: 24px;
}

.allItems {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.container {
  width: 100%;
  height: 85vh;
  display: flex;
  flex-direction: column;
}

.content {
  height: 100%;
  overflow-y: scroll;
}

.tab {
  padding: 15px 30px;
  background-color: #b7b7b7;
  border: 1px solid #ccc;
  cursor: pointer;
  color: #000;
  border-radius: 13px 13px 0px 0px;
  font-weight: bold;
}

.tab.active {
  background-color: #f0f0f0;
  color: #000;
}

.verlof-item {
  background-color: white;
  padding: 16px;
  width: 70%;
  border: 1px solid #ccc;
}

.Goedgekeurd {
  color: green;
}

.Afgekeurd {
  color: red;
}

.Verzonden {
  color: gray;
}

.username {
  margin: 24px;
}
</style>
