<template>
  <div class="container">
    <h1 class="username">Welkom Marco</h1>
    <div class="class">
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
*{
  margin: 0;
  padding: 0;

}
.container{
  width: 100%;
  background-color: red;
  height: 100%;  
  display: flex;
  flex-direction: column;
}
.class{
  background-color: #4a4a4a;
  width: 100%;
  height: 70%;
  align-self: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: auto;
}
.username{
  font-size: 48px;
  margin-left: 24px;
  margin-top: 24px;
}
.verlof-page {
  border: none;
  padding: 20px;
  background-color: #f5f5f5;
}

.verlof-item {
  background-color: white;
  padding: 16px;
  width: 70%;
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