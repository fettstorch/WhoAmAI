<script lang="ts" setup>
import { nextTick, ref } from "vue";

const rawInput = ref("");
const inputEl = ref()
const emit = defineEmits<{
  (e: "input", rawInput: string): void;
}>();

defineExpose({
  toggle,
});

const active = ref(false);

function toggle() {
  active.value = !active.value;
  nextTick(() => {
    focus();
  });
}

function focus() {
  (inputEl.value as HTMLInputElement | undefined)?.focus();
}

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
        ref="inputEl"
        type="text"
        v-model="rawInput"
        @keydown.enter="sendMessage"
        :disabled="!active"
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
