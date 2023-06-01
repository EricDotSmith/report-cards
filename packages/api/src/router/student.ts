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
      if (input.name.length > 50) {
        throw new TRPCError({
          code: "PAYLOAD_TOO_LARGE",
          message: "Name is too long, please limit to 50 characters",
        });
      } else if (input.pronouns.length > 50) {
        throw new TRPCError({
          code: "PAYLOAD_TOO_LARGE",
          message: "Pronouns are too long, please limit to 50 characters",
        });
      }

      const currentClass = await ctx.prisma.class.findFirst({
        where: { id: input.classId, AND: { teacherId: ctx.user.id } },
        include: {
          _count: {
            select: {
              students: true,
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

      if (currentClass._count.students >= 50) {
        throw new TRPCError({
          code: "PRECONDITION_FAILED",
          message: "Max students per class exceeded",
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
      if (input.name.length > 50) {
        throw new TRPCError({
          code: "PAYLOAD_TOO_LARGE",
          message: "Name is too long, please limit to 50 characters",
        });
      } else if (input.pronouns.length > 50) {
        throw new TRPCError({
          code: "PAYLOAD_TOO_LARGE",
          message: "Pronouns are too long, please limit to 50 characters",
        });
      }

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
