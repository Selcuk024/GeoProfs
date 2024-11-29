<template>
  <div class="container">
    <h1 class="username">Welkom Marco</h1>
    <div class="tabs">
      <button
        v-for="(tab, index) in tabs"
        :key="index"
        :class="['tab', { active: currentTab === tab }]"
        @click="currentTab = tab"
      >
        {{ tab }}
      </button>
    </div>
    <div class="content">
      <div v-if="currentTab === 'Verlof'">
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
      <div v-if="currentTab === 'Goedgekeurd'">
        <div
          class="verlof-item"
          v-for="(item, index) in filteredVerlof('Goedgekeurd')"
          :key="index"
        >
          <div class="verlof-content">
            <p class="title">{{ item.title }}</p>
            <p class="date">Data: {{ item.date }}</p>
          </div>
        </div>
      </div>
      <div v-if="currentTab === 'Afgekeurd'">
        <div
          class="verlof-item"
          v-for="(item, index) in filteredVerlof('Afgekeurd')"
          :key="index"
        >
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
export default {
  name: "VerlofPage",
  data() {
    return {
      tabs: ["Verlof", "Goedgekeurd", "Afgekeurd"],
      currentTab: "Verlof",
      verlofList: [
        { title: "Vakantie text...", date: "12-12-2024 - 13-12-2024", status: "Verzonden" },
        { title: "Vakantie met vak...", date: "12-12-2024 - 13-12-2024", status: "Goedgekeurd" },
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
  display: flex;
  justify-content: center;
  margin: 20px 0;
}

.tab {
  padding: 10px 20px;
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  cursor: pointer;
  font-weight: bold;
}

.tab.active {
  background-color: #007bff;
  color: white;
  border-color: #007bff;
}

.content {
  margin-top: 20px;
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
</style>
