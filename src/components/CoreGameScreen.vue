<script setup lang="ts">
import UserInput from "./UserInput.vue";
import Scrollable from "./Scrollable.vue";
import { onMounted, ref } from "vue";
import MessageBubble from "./MessageBubble.vue";
import ProfilePicture from "./ProfilePicture.vue";
import { WhoAmAiClient } from "../core/WhoAmAiClient";

const messages = ref<string[]>([
  //'aölkdföasdlkfj',
  //'aölkdföasdlkfj',
  //'aölkdföasdlkfj',
  //'aölkdföasdlkfj',
  //'aölkdföasdlkfj',
  //'aölkdföasdlkfj',
  //'aölkdföasdlkfj',
  //'aölkdföasdlkfj',
  //'aölkdföasdlkfj',
  //'aölkdföasdlkfj',
  //'aölkdföasdlkfj',
  //'aölkdföasdlkfj',
  //'aölkdföasdlkfj',
  //'aölkdföasdlkfj',
  //'aölkdföasdlkfj',
  //'aölkdföasdlkfj',
  //'aölkdföasdlkfj',
  //'aölkdföasdlkfj',
  //'aölkdföasdlkfj',
  //'aölkdföasdlkfj',
]);
const entity = ref<string>("");
const scrollable = ref();
const gameFinished = ref(false);
const entityImagePathToBe = ref<string | undefined>(undefined);
let entityImagePath: string | undefined = "";

const whoAmAiClient = new WhoAmAiClient()

onMounted(async () => {
  const response = await whoAmAiClient.getEntity();
  entity.value = response.entity;

  whoAmAiClient.getImage({ entity: entity.value }).then(
    ({ imageUrl }) => (entityImagePath = imageUrl)
  );

  setTimeout(async () => {
    messages.value.push(response.intro);
  }, 2000);
});

//--- private utilities

async function processInput(question: string) {
  const aiAnswerPromise = whoAmAiClient.askQuestion({
    entity: entity.value,
    question,
  });
  addMessageToChat(question);
  const aiAnswer = (await aiAnswerPromise).answer.toLocaleLowerCase();
  addMessageToChat(aiAnswer);

  checkIfCorrect(aiAnswer);
}

function addMessageToChat(message: string) {
  messages.value.push(message);
  scrollable.value.scrollToBottom();
}

async function checkIfCorrect(aiAnswer: string) {
  const correctAnswer = `yes, I am ${entity.value}.`.toLowerCase();
  if (aiAnswer.toLocaleLowerCase() === correctAnswer) {
    gameFinished.value = true;
    if (entityImagePath) {
      entityImagePathToBe.value = entityImagePath;
    }
  }
}
</script>

<template>
  <div class="container">
    <div class="scrollable-container">
      <Scrollable ref="scrollable" class="scrollable">
        <MessageBubble
            v-for="message in messages"
            class="message-bubble"
            :message="message"
        />
      </Scrollable>
      <ProfilePicture
          class="entity-picture"
          :img-path="entityImagePathToBe"
          :key="entityImagePathToBe"
      />
    </div>

    <UserInput
        v-if="!gameFinished"
        class="input"
        @input="processInput"
    />
  </div>
</template>

<style scoped>
.container {
  position: relative;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.scrollable-container {
  position: relative;
}

.scrollable {
  position: relative;
  min-width: 70vw;
  min-height: 150px;
  max-height: 70vh;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .message-bubble {
    position: relative;
  }

  .message-bubble:nth-child(even) {
    align-self: flex-start;
    background-color: lightcyan;
    font-weight: 400;
  }
  .message-bubble:nth-child(even)::before {
    content: "";
    position: absolute;
    bottom: 0;
    left: -2px;
    background-color: lightcyan;
    width: 10px;
    height: 10px;
    transform: rotate(-30deg) skew(-45deg, 0deg);
  }

  .message-bubble:nth-child(odd) {
    align-self: flex-end;
  }
  .message-bubble:nth-child(odd)::before {
    content: "";
    position: absolute;
    bottom: 0;
    right: -2px;
    background-color: white;
    width: 10px;
    height: 10px;
    transform: rotate(30deg) skew(45deg, 0deg);
  }
}

.message-bubble {
  animation: appear 1.5s ease-in-out forwards;
  @keyframes appear {
    from {
      transform: scale(0.5);
      opacity: 0;
    }
    to {
      transform: scale(1);
      opacity: 1;
    }
  }
}

.entity-picture {
  position: absolute;
  right: 0;
  top: 0;

  max-width: 200px;
  transform: translate(70%, -70%);
}

.input {
  margin-top: 20px;
  width: 50%;
}
</style>
