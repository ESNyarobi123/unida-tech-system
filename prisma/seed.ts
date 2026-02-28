import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const email = process.env.SEED_ADMIN_EMAIL ?? "admin@unidatechs.com";
  const password = process.env.SEED_ADMIN_PASSWORD ?? "Admin123!";

  let admin = await prisma.user.findUnique({ where: { email } });
  if (!admin) {
    const passwordHash = await hash(password, 10);
    admin = await prisma.user.create({
      data: {
        email,
        passwordHash,
        name: "Admin",
        role: "ADMIN",
      },
    });
    console.log("Created admin user:", email);
  } else {
    console.log("Admin user already exists:", email);
  }

  // Demo data (idempotent: create only if empty)
  if ((await prisma.faq.count()) === 0) {
    await prisma.faq.createMany({
      data: [
        { question: "What services does Unida Tech offer?", answer: "App development, websites, systems, tracking, hosting, and ethical hacking." },
        { question: "How do I get a quote?", answer: "Use the Contact form or request a quote from the dashboard." },
      ],
    });
    console.log("Seeded FAQ");
  }

  if ((await prisma.policy.count()) === 0) {
    await prisma.policy.create({
      data: { slug: "privacy", title: "Privacy Policy", content: "We respect your privacy. This policy outlines how we collect and use data." },
    });
    console.log("Seeded Policy");
  }

  if ((await prisma.termsOfUse.count()) === 0) {
    await prisma.termsOfUse.create({
      data: { slug: "terms", title: "Terms of Use", content: "By using our services you agree to these terms." },
    });
    console.log("Seeded Terms");
  }

  if ((await prisma.task.count()) === 0) {
    await prisma.task.createMany({
      data: [
        { title: "Setup staging env", status: "DONE", priority: "HIGH" },
        { title: "Review client quote", status: "IN_PROGRESS", priority: "MEDIUM" },
        { title: "Update portfolio page", status: "TODO", priority: "LOW" },
      ],
    });
    console.log("Seeded Tasks");
  }

  if ((await prisma.invoice.count()) === 0) {
    await prisma.invoice.create({
      data: {
        number: "INV-001",
        clientName: "Acme Corp",
        amount: 1500,
        status: "SENT",
        dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      },
    });
    console.log("Seeded Invoice");
  }

  if ((await prisma.quote.count()) === 0) {
    await prisma.quote.create({
      data: {
        title: "Website redesign",
        clientName: "Beta Ltd",
        amount: 5000,
        status: "DRAFT",
        validUntil: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
      },
    });
    console.log("Seeded Quote");
  }

  if ((await prisma.asset.count()) === 0) {
    await prisma.asset.create({
      data: { name: "MacBook Pro", type: "Laptop", serialNo: "MBP-001", assigneeId: admin.id },
    });
    console.log("Seeded Asset");
  }

  if ((await prisma.supportTicket.count()) === 0) {
    await prisma.supportTicket.create({
      data: {
        subject: "Login issue",
        body: "Cannot access dashboard from Safari.",
        status: "OPEN",
        priority: "HIGH",
        userId: admin.id,
      },
    });
    console.log("Seeded Support ticket");
  }

  if ((await prisma.testimonial.count()) === 0) {
    await prisma.testimonial.create({
      data: {
        author: "Jane Doe",
        role: "CTO",
        company: "Acme",
        content: "Professional and delivered on time.",
        rating: 5,
        featured: true,
      },
    });
    console.log("Seeded Testimonial");
  }
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });
