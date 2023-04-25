<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <div class="container content">
      <h1>Department of Computer Studies</h1>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
header {
  height: 80px;
  background-color: var(--color-accent);
  color: var(--color-base);
  display: fixed;
  top: 0;
  left: 0;
}
</style>
