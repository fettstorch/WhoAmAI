<script setup lang="ts">
import UserInput from "./UserInput.vue";
import Scrollable from "./Scrollable.vue";
import { onMounted, ref } from "vue";
import {
  getEntity,
  getIntroAsPerson,
  askQuestionAboutEntity,
  getEntityImageUrl,
} from "../core/ai";
import MessageBubble from "./MessageBubble.vue";
import ProfilePicture from "./ProfilePicture.vue";

const messages = ref<string[]>([]);
const entity = ref<string>("");
const scrollable = ref();
const gameFinished = ref(false);
const entityImagePathToBe = ref<string | undefined>(undefined);
let entityImagePath: string | undefined = "";

onMounted(async () => {
  entity.value = await getEntity();
  console.debug("entity", entity.value);
  getEntityImageUrl({ entity: entity.value }).then(
    (imgUrl) => (entityImagePath = imgUrl)
  );
  addIntroductionMessage();
});

//--- private utilities

function addIntroductionMessage() {
  const introMessage = getIntroAsPerson({ entity: entity.value });
  setTimeout(async () => {
    const introduction = await introMessage;
    messages.value.push(introduction);
  }, 3000);
}

async function processInput(question: string) {
  const aiAnswerPromise = askQuestionAboutEntity({
    entity: entity.value,
    question,
  });
  addMessageToChat(question);
  const aiAnswer = (await aiAnswerPromise).toLocaleLowerCase();
  addMessageToChat(aiAnswer);

  checkIfCorrect(aiAnswer);
}

function addMessageToChat(message: string) {
  messages.value.push(message);
  scrollable.value.scrollToBottom();
}

async function checkIfCorrect(aiAnswer: string) {
  const correctAnswer = `yes, I am ${entity.value}.`.toLowerCase();
  console.debug({ correctAnswer, aiAnswer });
  if (aiAnswer.toLocaleLowerCase() === correctAnswer) {
    gameFinished.value = true;
    if (entityImagePath) {
      entityImagePathToBe.value = entityImagePath;
    }
  }
}
</script>

<template>
  <Scrollable ref="scrollable" class="container">
    <ProfilePicture
      :img-path="entityImagePathToBe"
      class="entity-picture"
      :key="entityImagePathToBe"
    />
    <MessageBubble
      v-for="message in messages"
      class="message-bubble"
      style="position: relative"
      :message="message"
    />
  </Scrollable>

  <UserInput v-if="!gameFinished" @input="processInput" />
</template>

<style scoped>
.entity-picture {
  position: absolute;
  right: -80px;
  top: -80px;
}
.container {
  overflow: visible;
  position: relative;
  .message-bubble:nth-child(odd) {
    align-self: flex-start;
    background-color: lightcyan;
    font-weight: 400;
  }
  .message-bubble:nth-child(odd)::before {
    content: "";
    position: absolute;
    bottom: 0;
    left: -2px;
    background-color: lightcyan;
    width: 10px;
    height: 10px;
    transform: rotate(-30deg) skew(-45deg, 0deg);
  }

  .message-bubble:nth-child(even) {
    align-self: flex-end;
  }
  .message-bubble:nth-child(even)::before {
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
</style>
