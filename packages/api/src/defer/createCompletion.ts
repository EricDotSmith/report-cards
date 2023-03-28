import { defer } from "@defer/client";
import { ChatCompletionRequestMessage, Configuration, OpenAIApi } from "openai";
import { prisma } from "../../../db";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

async function createCompletion(gptPrompt: string, reportId: string) {
  const messages: ChatCompletionRequestMessage[] = [
    {
      role: "system",
      content:
        "You are teacher. You are to write a comment for a students report card based on provided evaluation criteria.",
    },
    {
      role: "user",
      content: gptPrompt,
    },
  ];

  const chatGPT = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages,
  });

  const chatGPTMessage = chatGPT.data.choices[0]?.message;

  await prisma.report.update({
    where: {
      id: reportId,
    },
    data: {
      comments: {
        create: {
          comment: chatGPTMessage?.content ?? "",
          studentId: "1",
          prompt: gptPrompt,
        },
      },
    },
  });

  return chatGPTMessage;
}

export default defer(createCompletion);
