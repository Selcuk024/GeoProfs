<template>
  <div class="container">
    <h1 class="username">Welkom Marco</h1>
  </div>
  <div class="personal-data-container">
    <div class="personal-data-col">
      <div class="personal-data">
        <h3>Geoorloofd afwezig</h3>
        <p>21 uur</p>
      </div>
      <div class="personal-data">
        <h3>Aantal aanvragen</h3>
        <p>6</p>
      </div>
    </div>
    <div class="personal-data-col">
      <div class="personal-data">
        <h3>Goedgekeurd</h3>
        <p>3</p>
      </div>
      <div class="personal-data">
        <h3>Afgekeurd</h3>
        <p>2</p>
      </div>
    </div>
    <div class="personal-data-col">
      <div class="personal-data">
        <h3>Afwachting</h3>
        <p>3</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProfilePage",
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}

.container {
  width: 100%;
  background-color: #f1f1f1;
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
  background-color: #f1f1f1;
}

.personal-data-col {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 25%;
  height: 100%;
  gap: 50px;
  background-color: #f1f1f1;
}

.personal-data {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 40%;
  background-color: #ffffff;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1); /* Schaduw toevoegen */
  border-radius: 8px; /* Optioneel: afgeronde hoeken */
}

.personal-data h3 {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 8px;
}

.personal-data p {
  font-size: 24px;
  color: #333;
}
</style>
