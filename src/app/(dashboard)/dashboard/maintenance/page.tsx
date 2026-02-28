import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { ROUTES } from "@/constants/routes";

export default async function MaintenancePage() {
  const session = await getServerSession(authOptions);
  if (session?.user?.role !== "ADMIN") redirect(ROUTES.DASHBOARD);

  return (
    <div>
      <h1 className="text-2xl font-bold">Maintenance</h1>
      <p className="mt-1 text-muted-foreground">Admin-only maintenance (placeholder)</p>
    </div>
  );
}
