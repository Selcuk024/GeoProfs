<template>
  <div class="verlof-page">
    <div class="verlof-item" v-for="(item, index) in verlofList" :key="index">
      <p class="title">{{ item.title }}</p>
      <p class="date">Data: {{ item.date }}</p>
      <p class="status">
        Status: <span :class="item.status">{{ item.status }}</span>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VerlofPage',
  data() {
    return {
      verlofList: [
        { title: 'Vakantie text...', date: '12-12-2024 - 13-12-2024', status: 'Verzonden' },
        { title: 'Vakantie met vak...', date: '12-12-2024 - 13-12-2024', status: 'Goedgekeurd' },
        { title: 'Vakantie', date: '12-12-2024 - 13-12-2024', status: 'Afgekeurd' }
      ]
    }
  }
}
</script>

<style scoped>
body {
  font-family: 'Inter', sans-serif;
}

.verlof-page {
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.verlof-item {
  border: 1px solid #ccc;
  padding: 16px;
  border-radius: 8px;
  background-color: #2e2e2e;
  color: #f5f5f5;
}
.title {
  font-weight: bold;
}
.date {
  margin: 4px 0;
}
.status {
  margin-top: 8px;
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
