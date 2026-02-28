import { router } from "../trpc";

export const appRouter = router({
  // Add routers: auth, userManagement, tasks, etc.
});

export type AppRouter = typeof appRouter;
