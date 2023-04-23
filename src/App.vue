<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="main">
    <RouterView />
  </div>
</template>

<style scoped>
.main {
    width: 100%;
    height: 100vh;
    background-image: linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)),
        url(src/assets/images/background-1.jpg);
    background-size: cover;
    background-position: center;
    padding: 10px 8%;
    position: relative;
}
</style>
