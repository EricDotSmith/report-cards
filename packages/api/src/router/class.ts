import { router, protectedProcedure } from "../trpc";
import { z } from "zod";

export const classRouter = router({
  classes: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.class.findMany({
      where: { teacherId: ctx.user.id },
      // maybe make a separate query for the counts of students and criteria
      include: {
        _count: {
          select: {
            students: true,
            criteria: true,
            reports: true,
          },
        },
      },
    });
  }),
  byId: protectedProcedure.input(z.string()).query(({ input, ctx }) => {
    return ctx.prisma.class.findFirst({
      where: { id: input, AND: { teacherId: ctx.user.id } },
      include: {
        students: true,
        criteria: true,
        reports: true,
      },
    });
  }),
  create: protectedProcedure.mutation(({ ctx }) => {
    return ctx.prisma.class.create({
      data: {
        teacher: {
          connect: {
            id: ctx.user.id,
          },
        },
      },
    });
  }),
});
