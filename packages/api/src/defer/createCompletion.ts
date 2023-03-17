import { defer } from "@defer/client";
import { ChatCompletionRequestMessage, Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

async function createCompletion(prompt: string) {
  const messages: ChatCompletionRequestMessage[] = [
    {
      role: "system",
      content:
        "You are teacher. You are to write a comment for a students report card based on provided evaluation criteria.",
    },
    {
      role: "user",
      content: prompt,
    },
  ];

  const chatGPT = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages,
  });

  const chatGPTMessage = chatGPT.data.choices[0]?.message;

  return chatGPTMessage;
}

export default defer(createCompletion);
