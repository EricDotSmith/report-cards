import { TRPCError } from "@trpc/server";
import { protectedProcedure, router } from "../trpc";
import { z } from "zod";

export const reportRouter = router({
  byId: protectedProcedure.input(z.string()).query(({ input, ctx }) => {
    return ctx.prisma.report.findFirst({
      where: { id: input, AND: { class: { teacherId: ctx.user.id } } },
      include: { comments: true },
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
        select: { id: true },
      });

      if (!currentClass) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Class not found",
        });
      }

      return ctx.prisma.report.create({
        data: {
          class: {
            connect: {
              id: input.classId,
            },
          },
        },
      });
    }),
});
