import { Configuration, OpenAIApi } from "openai";

const model = "gpt-4";

// Set up OpenAI API credentials
const configuration = new Configuration({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
});
const openAi = new OpenAIApi(configuration);

export async function getEntity(): Promise<string> {
  const prompt = `You are a game director for a classic game of "who am i".
  Your job is to give me the name of a person, be it fictional or real. Possible personas could be movie stars, game characters, musicians, characters from a kids show and so on.
  Make sure to only use family friendly names. Answer only with the name, nothing else.
  Don't always choose the most obvious name from a franchise for example for Harry Potter retrieve Tom Riddle instead of Harry Potter, Daisy instead of Mario.

  Name: Peppa Pig
  Name: Agnes Obel
  Name: Dwayne Johnson
  Name: Joel Miller
  Name: Ash ketchum
  Name: Gandalf
  Name: Heimerdinger
  Name: Arielle the Mermaid
  Name: kermit the frog
  Name:`;

  const completion = await openAi.createChatCompletion({
    model,
    messages: [{ role: "user", content: prompt }],
  });

  return completion.data.choices[0].message?.content ?? "Kermit the Frog";
}

/**
 * Generates an introduction as a given entity for a game.
 * @param {string} options.entity - The entity to pretend to be.
 * @returns {Promise<string>} - A Promise that resolves to the generated introduction.
 */
export async function getIntroAsPerson(options: {
  entity: string;
}): Promise<string> {
  const { entity } = options;
  const prompt = `You are in a game and your role is to pretend to be '${entity}'.
  Pretending to be ${entity} introduce yourself to the other players and challenge
  them to find out who you are, but never mention your name. Give an answer of at max two sentences.
  Don't give further hints to your identity. Don't use names of other people or places IPs or other things.'
  
  E.g.:
  Entity: Arielle the Mermaid
  Introduction: I am thrilled to meet you, human! Can you guess who I am?;

  Entity: kermit the frog
  Introduction: Hey kids! Nice to meet y'all! Can you guess who I am?

  Entity: ${entity}
  Introduction: `;

  const completion = await openAi.createChatCompletion({
    model,
    messages: [{ role: "user", content: prompt }],
  });

  return (
    completion.data.choices[0].message?.content ??
    "Greetings! Can you find out who I am?"
  );
}

/**
 * Determines whether the given message is a question about a person.
 * @param {string} question - The message to be checked.
 * @returns {Promise<boolean>} - A Promise that resolves to a boolean value indicating whether the message is a question about a person or not.
 */
export async function askQuestionAboutEntity(options: {
  question: string;
  entity: string;
}): Promise<string> {
  const { question, entity } = options;
  const prompt = `You are in a game and your role is to pretend to be '${entity}'. A user is trying to guess who or what you are, by asking you questions.
  If you think that the question is not actually a question in order to find out who or what you are, answer with the following string only: 'not a question about me.'.
  Pretending to be '${entity}', answer the question as if you were the real '${entity}', but never mention your name, or give further hints to your identity.
  If the user correctly guesses your identity, you can end the game by saying 'yes, I am ${entity}.'.

  Entity: Arielle the Mermaid
  Q: 'is Frodo a hobbit?'
  A: 'not a question about me.'

  Entity: Gandalf
  Q: 'are you Gandalf the Grey?'
  A: 'yes, I am Gandalf.'

  Entity: kermit the frog
  Q: 'is pipi longstocking a character from a book?'
  A: 'not a question about me.'

  Entity: Leslie Knope
  Q: 'who is stronger, superman or batman?'
  A: 'not a question about me.'

  Entity: The Grinch
  Q: 'do you have green fur?'
  A: 'Yes, my fur is a vibrant shade of green. It perfectly matches my mischievous personality.'

  Entity: Heimerdinger
  Q: 'Heimerdinger?'
  A: 'yes, I am Heimerdinger.'

  Entity: Claudia Schiffer
  Q: 'Are you a model?'
  A: 'Yes, I am a model. I have been modeling since I was 17 years old.'

  Entity: Ash Ketchum
  Q: 'are you a woman?'
  A: 'No, I am not.'

  Entity: Pikachu
  Q: 'Who is the german chancellor?'
  A: 'not a question about me.'

  Entity: Peppa Pig
  Q: 'whats the distance from earth to the moon?'
  A: 'not a question about me.'

  Entity: ${entity}
  Q: '${question}'
  A:`;

  const completion = await openAi.createChatCompletion({
    model,
    messages: [{ role: "user", content: prompt }],
  });
  const gptAnswer = completion.data.choices[0].message?.content;

  console.debug("[USR QUESTION:", question);
  console.debug("[GPT ANSWER:  ", gptAnswer);

  return gptAnswer?.replace(/'/g, "") ?? "pls try again";
}

export async function getEntityImageUrl(options: {
  entity: string;
}): Promise<string | undefined> {
  const { entity } = options;
  const prompt = `image of ${entity} that is happy to meet you, smiling. Hyper realistic.
  Creamy blue background, no other characters in the image.`;
  const response = openAi.createImage({
    prompt: prompt,
    n: 1,
    size: "256x256",
  });
  return (await response).data.data[0].url;
}

//vitest
if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest;

  it('ai askQuestionAboutEntity returns false for "Who is the president of the USA?"', async () => {
    const response = await askQuestionAboutEntity({
      question: "Who is the president of the USA?",
      entity: "Gregor Gysi",
    });
    expect(response).toBe("not a question about me.");
  });

  it('ai askQuestionAboutEntity returns false for "is Joel Miller a character from The Last Of Us?"', async () => {
    const response = await askQuestionAboutEntity({
      question: "is Joel Miller a character from The Last Of Us?",
      entity: "Ash Ketchum",
    });
    expect(response).toBe("not a question about me.");
  });

  it('ai askQuestionAboutEntity returns false for "is Papa Roach a musician from the 18th century?"', async () => {
    const response = await askQuestionAboutEntity({
      question: "is Papa Roach a musician from the 18th century?",
      entity: "Son Goku",
    });
    expect(response).toBe("not a question about me.");
  });

  it('ai askQuestionAboutEntity returns false for "whats the distance from earth to the moon?"', async () => {
    const response = await askQuestionAboutEntity({
      question: "whats the distance from earth to the moon?",
      entity: "Peppa Pig",
    });
    expect(response).toBe("not a question about me.");
  });

  it('ai isQuestionAboutPerson returns true for "are you a vampire?" when asking Nosferatu', async () => {
    const response = await askQuestionAboutEntity({
      question: "are you a vampire?",
      entity: "Nosferatu",
    });
    expect(response).not.toBe("not a question about me.");
  });
}
