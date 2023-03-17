import { protectedProcedure, router } from "../trpc";
import { z } from "zod";
import createCompletion from "../defer/createCompletion";
import { getExecution } from "@defer/client";

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
        prompt: z.string(),
        reportId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      //ensure not creating a job that's already in progress
      const { id: executionId } = await createCompletion(
        input.prompt,
        input.reportId,
      );
      return { executionId };
    }),
});
