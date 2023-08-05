<script setup lang="ts">
import viteImg from './assets/vite.svg'
import CoreGameScreen from "./components/CoreGameScreen.vue";
</script>

<template>
  <!-- CoreGameScreen -->
  <CoreGameScreen class="screen" />

  <!-- footer -->
  <div class="footer">
    <span>Powered by</span>
    <a href="https://vitejs.dev" target="_blank">
      <img :src="viteImg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>
</template>

<style scoped>

.screen {
  width: 90vw;
  height: 100vh;

  max-width: 750px;
}

.footer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 1em;

  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: end;

  font-style: italic;
  font-size: 15px;
}

.logo {
  height: 2em;
  padding: 0.25em 0.25em 0 0.25em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
