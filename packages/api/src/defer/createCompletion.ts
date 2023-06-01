import { defer } from "@defer/client";
import { ChatCompletionRequestMessage, Configuration, OpenAIApi } from "openai";
import { prisma } from "../../../db";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

type CreateCompletionInput = {
  studentId: string;
  studentName: string;
  studentPronouns: string;
  studentCriteriaEvaluations: {
    criteriaQuestion: string;
    teacherResponse: string;
  }[];
}[];

type GPTResponse = {
  studentId: string;
  studentName: string;
  gptResponse: string;
}[];

const systemContent = `
You are to take the role of a teacher. It is report card season and I want you to create a comment based on the information for each student provided to you. 

When you write a response, always have the response written in the following JSON format:

[]{
"studentId": string,
"studentName": string,
"gptResponse": string
}

Student information will arrive to you in the following array of objects format:

[]{ 
"studentId": string, 
"studentName": string,
"studentPronouns": string,
"studentCriteriaEvaluations": []{"criteriaQuestion": string, "teacherResponse": string}
}
`;

async function createCompletion(reportId: string) {
  const reportWithStudentEvaluations = await prisma.report.findUnique({
    where: {
      id: reportId,
    },
    select: {
      studentEvaluation: {
        select: {
          studentId: true,
          studentName: true,
          studentPronouns: true,
          criteriaValues: {
            select: {
              criteriaPrompt: true,
              criteriaValue: true,
            },
          },
        },
      },
    },
  });

  if (!!reportWithStudentEvaluations) {
    const gptPrompt: CreateCompletionInput =
      reportWithStudentEvaluations.studentEvaluation.map((evaluation) => ({
        studentId: evaluation.studentId,
        studentName: evaluation.studentName,
        studentPronouns: evaluation.studentPronouns,
        studentCriteriaEvaluations: evaluation.criteriaValues.map(
          (criteriaValue) => ({
            criteriaQuestion: criteriaValue.criteriaPrompt,
            teacherResponse: criteriaValue.criteriaValue,
          }),
        ),
      }));

    const messages: ChatCompletionRequestMessage[] = [
      {
        role: "system",
        content: systemContent,
      },
      {
        role: "user",
        content: JSON.stringify(gptPrompt),
      },
    ];

    try {
      const chatGPT = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages,
      });

      const chatGPTResponseContent = chatGPT.data.choices[0]?.message?.content;

      if (!!chatGPTResponseContent) {
        const responseMessages = JSON.parse(
          chatGPTResponseContent,
        ) as GPTResponse;

        await prisma.report.update({
          where: {
            id: reportId,
          },
          data: {
            comments: {
              createMany: {
                data: responseMessages.map((response) => ({
                  studentId: response.studentId,
                  comment: response.gptResponse,
                  prompt: JSON.stringify(
                    gptPrompt.find(
                      (prompt) => prompt.studentId === response.studentId,
                    ),
                  ),
                })),
              },
            },
            reportStatus: "GENERATED",
          },
        });
      }
    } catch (e) {
      await prisma.report.update({
        where: {
          id: reportId,
        },
        data: {
          reportStatus: "FAILED",
        },
      });
    }

    return { success: true };
  }

  return { success: false };
}

export default defer(createCompletion);
