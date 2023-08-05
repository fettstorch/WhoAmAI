<script setup lang="ts">
import { ref } from "vue";
const scrollable = ref();

function scrollToBottom() {
  if (!scrollable.value) return;

  scrollable.value.scrollTop = scrollable.value.scrollHeight;
}

defineExpose({ scrollToBottom });
</script>

<template>
  <div ref="scrollable" class="scrollable-container">
    <slot></slot>
  </div>
</template>

<style scoped>
.scrollable-container {
  display: flex;
  flex-direction: column;
  align-items: center;

  overflow-y: scroll;
  scroll-behavior: smooth;

  border: 3px solid lightskyblue;
  background-color: lightslategray;
  border-radius: 5px;

  padding: 10px;

  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none;
  }
}
</style>
