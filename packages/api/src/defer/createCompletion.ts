import { generateEncryptedJwt } from "./../../../../apps/nextjs/src/utils/jwt";
import { defer } from "@defer/client";
import { ChatCompletionRequestMessage, Configuration, OpenAIApi } from "openai";
import axios from "axios";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const secret = Buffer.from(process.env.SECRET_KEY_FOR_JWT as string, "hex");

const apiUrl =
  process.env.NODE_ENV !== "development"
    ? "https://reportcards.io/api/updateCompletionStatus"
    : "http://localhost:3000/api/updateCompletionStatus";

async function createCompletion(prompt: string, reportId: string) {
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

  const encryptedJwt = await generateEncryptedJwt(
    "createCompletionResponse",
    { message: chatGPTMessage, reportId },
    secret,
  );

  const response = await axios.post(apiUrl, undefined, {
    headers: { Authorization: `Bearer ${encryptedJwt}` },
  });

  if (response.status !== 200) {
    throw new Error("Error creating completion");
  }

  return encryptedJwt;
}

export default defer(createCompletion);
