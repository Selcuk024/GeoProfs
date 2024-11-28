<template>
  <div class="container">
    <h1 class="username">Welkom Marco</h1>
  </div>
  <div class="personal-data-container">
    <div class="personal-data-col">
      <div class="personal-data"></div>
      <div class="personal-data"></div>
    </div>
    <div class="personal-data-col">
      <div class="personal-data"></div>
      <div class="personal-data"></div>
    </div>
    <div class="personal-data-col">
      <div class="personal-data"></div>
      <div class="personal-data"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProfilePage'
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}
.container {
  width: 100%;
  background-color: #F1F1F1;
  height: 20%;
  display: flex;
  flex-direction: column;
}

.username {
  font-size: 48px;
  margin-left: 24px;
  margin-top: 24px;
}

.personal-data-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 80%;
  gap: 50px;
  background-color: #F1F1F1;
}

.personal-data-col {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 25%;
  height: 100%;
  gap: 50px;
  background-color: #F1F1F1;
}

.personal-data {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 40%;
  background-color: #FFFFFF;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1); /* Schaduw toevoegen */
  border-radius: 8px; /* Optioneel: afgeronde hoeken */
}

</style>
