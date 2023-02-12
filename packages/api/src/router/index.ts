import { router } from "../trpc";
import { teacherRouter } from "./teacher";
import { authRouter } from "./auth";

export const appRouter = router({
  teacher: teacherRouter,
  auth: authRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
