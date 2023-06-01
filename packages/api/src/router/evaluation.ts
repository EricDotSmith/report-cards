import { CriteriaType } from "@acme/db";
import { TRPCError } from "@trpc/server";
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
            type: z.string(),
          }),
        ),
        studentName: z.optional(z.string()),
        studentPronouns: z.optional(z.string()),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      input.criteriaValues.forEach((criteriaValue) => {
        if (
          criteriaValue.type === CriteriaType.COMMENT &&
          criteriaValue.value.length > 200
        ) {
          throw new TRPCError({
            code: "PAYLOAD_TOO_LARGE",
            message: `${criteriaValue.id}-is too long, please limit to 200 characters`,
          });
        }
      });

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
