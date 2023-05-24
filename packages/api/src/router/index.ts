import { reportRouter } from "./report";
import { criteriaRouter } from "./criteria";
import { router } from "../trpc";
import { teacherRouter } from "./teacher";
import { authRouter } from "./auth";
import { classRouter } from "./class";
import { studentRouter } from "./student";
import { completionRouter } from "./completion";
import { evaluationRouter } from "./evaluation";
import { stripeRouter } from "./stripe";

export const appRouter = router({
  teacher: teacherRouter,
  class: classRouter,
  student: studentRouter,
  criteria: criteriaRouter,
  report: reportRouter,
  completion: completionRouter,
  evaluation: evaluationRouter,
  auth: authRouter,
  stripe: stripeRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
