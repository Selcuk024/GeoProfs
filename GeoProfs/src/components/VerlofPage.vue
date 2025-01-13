<template>
  <div class="container">
    <h1 class="username">Welkom Marco</h1>
    <div class="miniContainer">
      <div class="tabs">
        <button v-for="(tab, index) in tabs" :key="index" :class="['tab', { active: currentTab === tab }]"
          @click="currentTab = tab">
          {{ tab }}
        </button>

        <div id="app">
          <button class="add" @click="showModal = true">+</button>
          <VerlofModal v-if="showModal" @close="showModal = false">
          </VerlofModal>
        </div>
      </div>
    </div>
    <div class="content">
      <div v-if="currentTab === 'Verlof'" class="allItems">
        <div class="verlof-item" v-for="(item, index) in verlofList" :key="index">
          <div class="verlof-content">
            <p class="title">{{ item.title }}</p>
            <p class="date">Data: {{ item.date }}</p>
            <p class="status">
              Status: <span :class="item.status">{{ item.status }}</span>
            </p>
          </div>
        </div>
      </div>
      <div v-if="currentTab === 'Goedgekeurd'" class="allItems">
        <div class="verlof-item" v-for="(item, index) in filteredVerlof('Goedgekeurd')" :key="index">
          <div class="verlof-content">
            <p class="title">{{ item.title }}</p>
            <p class="date">Data: {{ item.date }}</p>
          </div>
        </div>
      </div>
      <div v-if="currentTab === 'Afgekeurd'" class="allItems">
        <div class="verlof-item" v-for="(item, index) in filteredVerlof('Afgekeurd')" :key="index">
          <div class="verlof-content">
            <p class="title">{{ item.title }}</p>
            <p class="date">Data: {{ item.date }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import VerlofModal from "../components/VerlofModal.vue";

export default {
  name: "VerlofPage",
  components:{
    VerlofModal
  },
  data() {
    return {
      tabs: ["Verlof", "Goedgekeurd", "Afgekeurd"],
      currentTab: "Verlof",
      showModal: false,
      verlofList: [
        { title: "Vakantie text...", date: "12-12-2024 - 13-12-2024", status: "Verzonden" },
        { title: "Vakantie met vak...", date: "12-12-2024 - 13-12-2024", status: "Goedgekeurd" },
        { title: "Vakantie", date: "12-12-2024 - 13-12-2024", status: "Afgekeurd" },
        { title: "Vakantie", date: "12-12-2024 - 13-12-2024", status: "Afgekeurd" },
        { title: "Vakantie", date: "12-12-2024 - 13-12-2024", status: "Afgekeurd" },
        { title: "Vakantie", date: "12-12-2024 - 13-12-2024", status: "Afgekeurd" },
        { title: "Vakantie", date: "12-12-2024 - 13-12-2024", status: "Afgekeurd" },
        { title: "Vakantie", date: "12-12-2024 - 13-12-2024", status: "Afgekeurd" },
        { title: "Vakantie", date: "12-12-2024 - 13-12-2024", status: "Afgekeurd" },
        { title: "Vakantie", date: "12-12-2024 - 13-12-2024", status: "Afgekeurd" },
        { title: "Vakantie", date: "12-12-2024 - 13-12-2024", status: "Afgekeurd" },
        { title: "Vakantie", date: "12-12-2024 - 13-12-2024", status: "Afgekeurd" },
        { title: "Vakantie", date: "12-12-2024 - 13-12-2024", status: "Afgekeurd" },
        { title: "Vakantie met vak...", date: "12-12-2024 - 13-12-2024", status: "Goedgekeurd" },
      ],
    };
  },
  methods: {
    filteredVerlof(status) {
      return this.verlofList.filter((item) => item.status === status);
    },
  },
};
</script>

<style scoped>
.tabs {
  width: 70%;
  display: flex;
  justify-content: flex-start;
}

.add {
  margin-left: auto;
  width: 46px;
  height: 46px;
  font-weight: bolder;
  margin-right: 15px;
  font-size: 40px;
  color: white;
  background-color: #209FD2;
  border-radius: 13px;
  border: none;
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
