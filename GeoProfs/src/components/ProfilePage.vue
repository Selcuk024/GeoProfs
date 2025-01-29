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
        <h3>Verzonden</h3>
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

<style scoped lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.container {
  width: 100%;
  background-color: #f1f1f1;
  padding: 24px;

  .username {
    font-size: 32px;
  }
}

.personal-data-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  padding: 20px;
  background-color: #f1f1f1;
}

.personal-data-col {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 300px;
  gap: 20px;
}

.personal-data {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 50px;
  background-color: #ffffff;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 8px;

  h3 {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 8px;
  }

  p {
    font-size: 24px;
    color: #333;
  }
}

@media (max-width: 768px) {
  .personal-data-container {
    flex-direction: column;
    align-items: center;
  }

  .personal-data-col {
    width: 100%;
    max-width: 100%;
  }
}
</style>
