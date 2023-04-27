<script setup>
import { RouterView } from 'vue-router'
import Navbar from './components/Navbar.vue';
</script>

<template>
  <div class="main">
    <Navbar />
    <RouterView />
  </div>
</template>

<style scoped>
.main {
    width: 100%;
    height: 100vh;
    background-image: linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)),
        url('/src/assets/images/background-1.jpg');
    background-size: cover;
    background-position: center;
    padding: 0;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
}
</style>
