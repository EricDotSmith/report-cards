import { initTRPC, TRPCError } from "@trpc/server";
import { type Context } from "./context";
import superjson from "superjson";
import { createTRPCUpstashLimiter } from "@trpc-limiter/upstash";
import { type NextApiRequest } from "next";

const t = initTRPC.context<Context>().create({
  transformer: superjson,
  errorFormatter({ shape }) {
    return shape;
  },
});

const isAuthed = t.middleware(({ next, ctx }) => {
  if (!ctx.user) {
    throw new TRPCError({ code: "UNAUTHORIZED", message: "Not authenticated" });
  }
  return next({
    ctx: {
      user: ctx.user,
    },
  });
});

const getFingerPrint = (req: NextApiRequest) => {
  const ip = req.socket.remoteAddress ?? req.headers["x-forwarded-for"];
  return (Array.isArray(ip) ? ip[0] : ip) ?? "127.0.0.1";
};

const rateLimiter = createTRPCUpstashLimiter({
  root: t,
  fingerprint: (ctx) => getFingerPrint(ctx.req),
  windowMs: 20000,
  message: (hitInfo) =>
    `Too many requests, please try again later. ${Math.ceil(
      (hitInfo.reset - Date.now()) / 1000,
    )}`,
  onLimit: (hitInfo) => {
    console.log(hitInfo);
  },
  max: 5,
});

export const router = t.router;
export const publicProcedure = t.procedure.use(rateLimiter);
export const protectedProcedure = t.procedure.use(rateLimiter).use(isAuthed);
