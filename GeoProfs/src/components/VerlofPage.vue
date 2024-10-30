<template>
    <div class="verlof-page">
      <div class="verlof-item" v-for="(item, index) in verlofList" :key="index">
        <p>{{ item.title }}</p>
        <p>Data: {{ item.date }}</p>
        <p>Status: <span :class="item.status">{{ item.status }}</span></p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "VerlofPage",
    data() {
      return {
        verlofList: [
          { title: "Vakantie text...", date: "12-12-2024 - 13-12-2024", status: "Verzonden" },
          { title: "Vakantie met vak...", date: "12-12-2024 - 13-12-2024", status: "Goedgekeurd" },
          { title: "Vakantie", date: "12-12-2024 - 13-12-2024", status: "Afgekeurd" },
        ],
      };
    },
  };
  </script>
  
  <style scoped>
  .verlof-page {
    padding: 20px;
  }
  .verlof-item {
    border: 1px solid #ccc;
    padding: 10px;
    margin: 5px 0;
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
  