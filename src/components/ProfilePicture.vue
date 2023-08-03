<script lang="ts" setup>
import defaultImage from "../assets/question-mark.jpg";
defineProps<{
  imgPath?: string;
}>();
</script>

<template>
  <img :src="imgPath ?? defaultImage" />
</template>

<style scoped>
img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 3px solid lightskyblue;
  background-color: lightslategray;
  animation: popup 3s forwards cubic-bezier(0.175, 1.885, 0.32, 1.275);

  @keyframes popup {
    from {
      transform: rotate(-45deg) scale(0);
    }
    to {
      transform: rotate(0deg) scale(1);
    }
  }
}
</style>
