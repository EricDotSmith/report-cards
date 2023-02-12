import { router, protectedProcedure } from "../trpc";
import { z } from "zod";

export const teacherRouter = router({
  byId: protectedProcedure.input(z.string()).query(({ ctx, input }) => {
    return ctx.prisma.teacher.findFirst({ where: { id: input } });
  }),
  create: protectedProcedure
    .input(z.object({ id: z.string(), name: z.string(), email: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.teacher.create({ data: input });
    }),
});
