<script lang="ts" setup>
import { ref } from "vue";

const rawInput = ref("");
const emit = defineEmits<{
  (e: "input", rawInput: string): void;
}>();

function sendMessage() {
  emit("input", rawInput.value);
  clearInput();
}

function clearInput() {
  rawInput.value = "";
}
</script>

<template>
  <div class="user-input-container">
    <input
      type="text"
      v-model="rawInput"
      @keydown.enter="sendMessage"
      placeholder="Enter your question..."
      autofocus
    />
  </div>
</template>

<style scoped>
.user-input-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

input {
  text-align: center;
  width: 100%;
}
</style>
