import { protectedProcedure, router } from "../trpc";
import { z } from "zod";
import createCompletion from "../defer/createCompletion";
import { getExecution } from "@defer/client";
export type CreateCompletionInput = {
  studentId: string;
  studentName: string;
  studentPronouns: string;
  studentCriteriaEvaluations: {
    criteriaQuestion: string;
    teacherResponse: string;
  }[];
}[];
export const completionRouter = router({
  byExecutionId: protectedProcedure
    .input(z.string())
    .query(async ({ input, ctx }) => {
      const executionResponse = await getExecution(input);
      return executionResponse;
    }),
  create: protectedProcedure
    .input(
      z.object({
        gptPrompt: z.array(
          z.object({
            studentId: z.string(),
            studentName: z.string(),
            studentPronouns: z.string(),
            studentCriteriaEvaluations: z.array(
              z.object({
                criteriaQuestion: z.string(),
                teacherResponse: z.string(),
              }),
            ),
          }),
        ),
        reportId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      //ensure not creating a job that's already in progress
      const { id: executionId } = await createCompletion(
        input.gptPrompt,
        input.reportId,
      );

      //store executionId in report
      //then fetch on pull rate the executionId until success?
      await ctx.prisma.report.update({
        where: {
          id: input.reportId,
        },
        data: {
          reportGenerated: true,
          reportExecutionId: executionId,
        },
      });

      return { executionId, reportId: input.reportId };
    }),
});
