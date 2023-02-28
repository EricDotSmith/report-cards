import { TRPCError } from "@trpc/server";
import { protectedProcedure, router } from "../trpc";
import { z } from "zod";

export const studentRouter = router({
  students: protectedProcedure
    .input(z.object({ classId: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.student.findMany({
        where: {
          classId: input.classId,
          AND: { class: { teacherId: ctx.user.id } },
        },
      });
    }),
  create: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        pronouns: z.string(),
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

      return ctx.prisma.student.create({
        data: {
          name: input.name,
          pronouns: input.pronouns,
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
        name: z.string(),
        pronouns: z.string(),
        studentId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const currentStudent = await ctx.prisma.student.findFirst({
        where: {
          id: input.studentId,
          AND: { class: { teacherId: ctx.user.id } },
        },
        select: { id: true },
      });

      if (!currentStudent) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Student not found",
        });
      }

      return ctx.prisma.student.update({
        where: { id: input.studentId },
        data: {
          name: input.name,
          pronouns: input.pronouns,
        },
      });
    }),
  delete: protectedProcedure
    .input(
      z.object({
        studentId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const currentStudent = await ctx.prisma.student.findFirst({
        where: {
          id: input.studentId,
          AND: { class: { teacherId: ctx.user.id } },
        },
        select: { id: true },
      });

      if (!currentStudent) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Student not found",
        });
      }

      return ctx.prisma.student.delete({
        where: { id: input.studentId },
      });
    }),
});
