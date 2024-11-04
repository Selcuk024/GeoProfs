<template>
  <div class="verlof-page">
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
.verlof-page {
  padding: 20px;
  background-color: #f5f5f5;
}

.verlof-item {
  background-color: white;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.title {
  font-weight: bold;
}

.date,
.status {
  color: #4a4a4a;
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