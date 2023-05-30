import { TRPCError } from "@trpc/server";
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
  create: protectedProcedure.mutation(async ({ ctx }) => {
    //find the most recently created class for the teacher
    const mostRecentCreatedClassesForUser = await ctx.prisma.class.findMany({
      where: { teacherId: ctx.user.id },
      orderBy: { createdAt: "desc" },
      select: { createdAt: true },
      take: 5,
    });

    //check to see if most 5 recent classes were created in the the last day
    const mostRecentCreatedClassesForUserInLastDay =
      mostRecentCreatedClassesForUser.filter((classObj) => {
        const oneDayAgo = new Date();
        oneDayAgo.setDate(oneDayAgo.getDate() - 1);
        return classObj.createdAt > oneDayAgo;
      });

    //check to see if the user has created more than 5 classes in the last day
    if (mostRecentCreatedClassesForUserInLastDay.length >= 5) {
      throw new TRPCError({
        code: "TOO_MANY_REQUESTS",
        message: "Too many classes created in the last day",
      });
    }

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
