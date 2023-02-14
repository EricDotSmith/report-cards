import { router, protectedProcedure } from "../trpc";
import { z } from "zod";

export const classRouter = router({
  classes: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.class.findMany({
      where: { teacherId: ctx.user.id },
    });
  }),
  byId: protectedProcedure.input(z.string()).query(({ input, ctx }) => {
    return ctx.prisma.class.findFirst({
      where: { id: input, AND: { teacherId: ctx.user.id } },
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
