import { protectedProcedure, router } from "../trpc";
import { z } from "zod";

export const evaluationRouter = router({
  update: protectedProcedure
    .input(
      z.object({
        evaluationId: z.string(),
        criteriaValues: z.array(
          z.object({
            id: z.string(),
            value: z.string(),
            required: z.boolean(),
          }),
        ),
        studentName: z.optional(z.string()),
        studentPronouns: z.optional(z.string()),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const incompleteCriteria = input.criteriaValues.filter(
        (criteriaValue) => criteriaValue.required && criteriaValue.value === "",
      );

      return ctx.prisma.studentEvaluation.update({
        where: {
          id: input.evaluationId,
        },
        data: {
          criteriaValues: {
            updateMany: input.criteriaValues.map((criteriaValue) => ({
              where: {
                id: criteriaValue.id,
              },
              data: {
                criteriaValue: criteriaValue.value,
              },
            })),
          },
          studentName: input.studentName,
          studentPronouns: input.studentPronouns,
          completed: incompleteCriteria.length === 0,
        },
        include: {
          criteriaValues: true,
        },
      });
    }),
});
