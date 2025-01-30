<template>
  <div class="container">
    <h1 class="username" aria-label="Welkom Marco">Welkom Marco</h1>
  </div>

  <div class="personal-data-container" role="region" aria-labelledby="data-summary-heading">
    <h2 id="data-summary-heading" class="visually-hidden">Overzicht van persoonlijke gegevens</h2>

    <div class="personal-data-col">
      <div class="personal-data" role="article" aria-labelledby="absent-heading">
        <h3 id="absent-heading">Geoorloofd afwezig</h3>
        <p aria-label="Totaal geoorloofde afwezigheid: 21 uur">21 uur</p>
      </div>
      <div class="personal-data" role="article" aria-labelledby="requests-heading">
        <h3 id="requests-heading">Aantal aanvragen</h3>
        <p aria-label="Aantal verlofaanvragen: 6">6</p>
      </div>
    </div>

    <div class="personal-data-col">
      <div class="personal-data" role="article" aria-labelledby="approved-heading">
        <h3 id="approved-heading">Goedgekeurd</h3>
        <p aria-label="Aantal goedgekeurde aanvragen: 3">3</p>
      </div>
      <div class="personal-data" role="article" aria-labelledby="rejected-heading">
        <h3 id="rejected-heading">Afgekeurd</h3>
        <p aria-label="Aantal afgekeurde aanvragen: 2">2</p>
      </div>
    </div>

    <div class="personal-data-col">
      <div class="personal-data" role="article" aria-labelledby="sent-heading">
        <h3 id="sent-heading">Verzonden</h3>
        <p aria-label="Aantal verzonden aanvragen: 3">3</p>
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
.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
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
