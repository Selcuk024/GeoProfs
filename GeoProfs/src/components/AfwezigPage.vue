<template>
  <main class="afwezig-page">
    <section class="absence-card" role="region" aria-labelledby="absence-title" aria-describedby="absence-desc">
      <header>
        <h3 id="absence-title">Geoorloofd afwezig</h3>
      </header>
      <p id="absence-desc">0 uur</p>
    </section>
  </main>
</template>

<script>
export default {
  name: 'AfwezigPage'
}
</script>

<style scoped lang="scss">
.afwezig-page {
  padding: 20px;
  display: flex;
  justify-content: center;
  background-color: #f5f5f5;

  .absence-card {
    width: 300px;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
    background-color: #2e2e2e;
    color: #f5f5f5;
    text-align: center;

    header {
      margin-bottom: 10px;
    }

    h3 {
      font-size: 1.2rem;
      font-weight: bold;
    }

    p {
      font-size: 1rem;
      font-weight: normal;
    }
  }
}

@media (max-width: 768px) {
  .absence-card {
    width: 100%;
    padding: 15px;
  }

  h3 {
    font-size: 1.3rem;
  }

  p {
    font-size: 1rem;
  }
}
</style>
