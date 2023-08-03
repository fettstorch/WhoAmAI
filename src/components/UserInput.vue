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
    <label for="user-input">Enter your question:</label>
    <input
      id="user-input"
      type="text"
      v-model="rawInput"
      @keydown.enter="sendMessage"
      autofocus
    />
  </div>
</template>

<style scoped>
.user-input-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
}

input {
  width: 375px;
  text-align: center;
}
</style>
