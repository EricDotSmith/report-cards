import { criteriaRouter } from "./criteria";
import { router } from "../trpc";
import { teacherRouter } from "./teacher";
import { authRouter } from "./auth";
import { classRouter } from "./class";

export const appRouter = router({
  teacher: teacherRouter,
  class: classRouter,
  criteria: criteriaRouter,
  auth: authRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
