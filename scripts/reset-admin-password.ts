/**
 * Weka upya password ya admin kuwa Admin123!
 * Run: npx tsx scripts/reset-admin-password.ts
 * Then login with: admin@unidatechs.com / Admin123!
 */
import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();
const ADMIN_EMAIL = "admin@unidatechs.com";
const NEW_PASSWORD = "Admin123!";

async function main() {
  const user = await prisma.user.findUnique({
    where: { email: ADMIN_EMAIL },
  });
  if (!user) {
    console.error("Admin user not found with email:", ADMIN_EMAIL);
    console.log("Run: npm run db:seed   or   upload prisma/seed-admin.sql");
    process.exit(1);
  }
  const passwordHash = await hash(NEW_PASSWORD, 10);
  await prisma.user.update({
    where: { id: user.id },
    data: { passwordHash },
  });
  console.log("Password reset for:", ADMIN_EMAIL);
  console.log("Login with password:", NEW_PASSWORD);
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });
