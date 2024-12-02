<template>
  <div class="afwezig-page">
    <div class="absence-card">
      <h3>Geoorloofd afwezig</h3>
      <p>0 uur</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AfwezigPage'
}
</script>

<style scoped>
.afwezig-page {
  padding: 20px;
  display: flex;
  justify-content: center;
  background-color: #f5f5f5;
}


.absence-card {
  width: 300px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #2e2e2e;
  color: #f5f5f5;
  text-align: center;
}
</style>
