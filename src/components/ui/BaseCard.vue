<template>
  <div class="card">
    <slot></slot>
  </div>
</template>

<style scoped>
.card {
  border-radius: 12px;
  box-shadow: 0 2px 50px rgb(66, 97, 68);
  /* box-shadow: 0 2px 100px white; */
  padding: 1rem;
  margin: 2rem auto;
  max-width: 40rem;
  color: lightgray;
}
</style>
