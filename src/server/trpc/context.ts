import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function createTRPCContext(opts: { req: Request }) {
  const session = await getServerSession(authOptions);
  return { session };
}

export type Context = Awaited<ReturnType<typeof createTRPCContext>>;
