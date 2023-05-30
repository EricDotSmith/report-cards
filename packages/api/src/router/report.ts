import { TRPCError } from "@trpc/server";
import { protectedProcedure, router } from "../trpc";
import { z } from "zod";

export const reportRouter = router({
  byId: protectedProcedure.input(z.string()).query(({ input, ctx }) => {
    return ctx.prisma.report.findFirst({
      where: { id: input, AND: { class: { teacherId: ctx.user.id } } },
      include: {
        comments: true,
        studentEvaluation: {
          include: {
            criteriaValues: true,
          },
        },
      },
    });
  }),
  create: protectedProcedure
    .input(
      z.object({
        classId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const currentClass = await ctx.prisma.class.findFirst({
        where: { id: input.classId, AND: { teacherId: ctx.user.id } },
        include: {
          students: true,
          criteria: true,
          _count: {
            select: {
              reports: true,
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

      if (currentClass._count.reports >= 5) {
        throw new TRPCError({
          code: "PRECONDITION_FAILED",
          message: "Max reports per class exceeded",
        });
      }

      return ctx.prisma.report.create({
        data: {
          studentEvaluation: {
            create: currentClass.students.map((student) => ({
              studentId: student.id,
              studentName: student.name,
              studentPronouns: student.pronouns,
              criteriaValues: {
                createMany: {
                  data: currentClass.criteria.map((criteria) => ({
                    criteriaId: criteria.id,
                    criteriaType: criteria.type,
                    criteriaPrompt: criteria.value,
                    criteriaValue: "",
                    required: criteria.required,
                  })),
                },
              },
            })),
          },
          class: {
            connect: {
              id: input.classId,
            },
          },
        },
      });
    }),
});
