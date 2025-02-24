<template>
  <section class="container">
    <h1 class="username" aria-label="Welkom Marco">Welkom Marco</h1>
  </section>

  <section class="personal-data-container" aria-labelledby="personal-data-heading">
    <h2 id="personal-data-heading" class="sr-only">Persoonlijke gegevens</h2>
    <div class="personal-data-col">
      <article class="personal-data" aria-labelledby="afwezig-title">
        <h3 id="afwezig-title">Geoorloofd afwezig</h3>
        <p aria-live="polite">21 uur</p>
      </article>
      <article class="personal-data" aria-labelledby="aanvragen-title">
        <h3 id="aanvragen-title">Aantal aanvragen</h3>
        <p aria-live="polite">6</p>
      </article>
    </div>

    <div class="personal-data-col">
      <article class="personal-data" aria-labelledby="goedgekeurd-title">
        <h3 id="goedgekeurd-title">Goedgekeurd</h3>
        <p aria-live="polite">3</p>
      </article>
      <article class="personal-data" aria-labelledby="afgekeurd-title">
        <h3 id="afgekeurd-title">Afgekeurd</h3>
        <p aria-live="polite">2</p>
      </article>
    </div>

    <div class="personal-data-col">
      <article class="personal-data" aria-labelledby="verzonden-title">
        <h3 id="verzonden-title">Verzonden</h3>
        <p aria-live="polite">3</p>
      </article>
    </div>
  </section>
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

  .sr-only {
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

  * {
    margin: 0;
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
}
</style>
