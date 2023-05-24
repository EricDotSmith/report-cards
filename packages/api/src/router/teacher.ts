import { router, protectedProcedure } from "../trpc";
import { z } from "zod";

export const teacherRouter = router({
  byId: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.teacher.findFirst({ where: { id: ctx.user.id } });
  }),
  create: protectedProcedure
    .input(z.object({ name: z.string(), email: z.string() }))
    .mutation(({ ctx, input }) => {
      //name and email might already come from the user object
      return ctx.prisma.teacher.create({ data: { id: ctx.user.id, ...input } });
    }),
  subscriptionStatus: protectedProcedure.query(async ({ ctx }) => {
    const {
      prisma,
      user: { id },
    } = ctx;

    if (!id) {
      throw new Error("Not authenticated");
    }

    const data = await prisma.teacher.findUnique({
      where: {
        id: id,
      },
      select: {
        stripeSubscriptionStatus: true,
      },
    });

    if (!data) {
      throw new Error("Could not find user");
    }

    return data.stripeSubscriptionStatus;
  }),
});
