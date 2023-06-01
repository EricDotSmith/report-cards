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
        required: z.boolean(),
        classId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      if (input.value.length > 100) {
        throw new TRPCError({
          code: "PAYLOAD_TOO_LARGE",
          message:
            "Criteria prompt is too long, please limit to 100 characters",
        });
      }

      const currentClass = await ctx.prisma.class.findFirst({
        where: { id: input.classId, AND: { teacherId: ctx.user.id } },
        include: {
          _count: {
            select: {
              criteria: true,
            },
          },
        },
      });

      if (!currentClass) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Class not found",
        });
      }

      if (currentClass._count.criteria >= 10) {
        throw new TRPCError({
          code: "PRECONDITION_FAILED",
          message: "Max criteria per class exceeded",
        });
      }

      return ctx.prisma.criteria.create({
        data: {
          type: input.type,
          value: input.value,
          required: input.required,
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
        required: z.boolean(),
        criteriaId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      if (input.value.length > 200) {
        throw new TRPCError({
          code: "PAYLOAD_TOO_LARGE",
          message:
            "Criteria prompt is too long, please limit to 200 characters",
        });
      }

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
          required: input.required,
        },
      });
    }),
  delete: protectedProcedure
    .input(
      z.object({
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

      return ctx.prisma.criteria.delete({
        where: { id: input.criteriaId },
      });
    }),
});
