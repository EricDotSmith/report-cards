import { TRPCError } from "@trpc/server";
import { protectedProcedure, router } from "../trpc";
import { z } from "zod";
import { CriteriaType } from "@acme/db";

export const criteriaRouter = router({
  criteria: protectedProcedure
    .input(z.object({ classId: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.criteria.findMany({
        where: {
          classId: input.classId,
          AND: { class: { teacherId: ctx.user.id } },
        },
      });
    }),
  create: protectedProcedure
    .input(
      z.object({
        type: z.nativeEnum(CriteriaType),
        value: z.string(),
        classId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const currentClass = await ctx.prisma.class.findFirst({
        where: { id: input.classId, AND: { teacherId: ctx.user.id } },
        select: { id: true },
      });

      if (!currentClass) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Class not found",
        });
      }

      return ctx.prisma.criteria.create({
        data: {
          type: input.type,
          value: input.value,
          class: {
            connect: {
              id: input.classId,
            },
          },
        },
      });
    }),
  update: protectedProcedure
    .input(
      z.object({
        type: z.nativeEnum(CriteriaType),
        value: z.string(),
        criteriaId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const currentCriteria = await ctx.prisma.criteria.findFirst({
        where: {
          id: input.criteriaId,
          AND: { class: { teacherId: ctx.user.id } },
        },
        select: { id: true },
      });

      if (!currentCriteria) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Criteria not found",
        });
      }

      return ctx.prisma.criteria.update({
        where: { id: input.criteriaId },
        data: {
          type: input.type,
          value: input.value,
        },
      });
    }),
});
