# Unida Tech System – Architecture

## Roles

- **Visitor** – Public access: portfolio, subscribe, testimonials, contact. No login.
- **Employee** – Login + limited dashboard (tasks, calendar, billing, etc.). Cannot register users or access Users / Maintenance.
- **Admin** – Full control: can register employees and admins, access Users, Maintenance, and all dashboard areas.

## Stack (per system.md)

- **Next.js 14** App Router + TypeScript
- **Tailwind CSS** + shadcn-style + Radix + Lucide
- **Prisma** + **SQLite for dev** (PostgreSQL for prod)
- **NextAuth v4** (Credentials + Prisma/Database adapter)
- **tRPC**, **Zustand**, **Zod**
- **React Hook Form**, **TanStack Table**, **Recharts**
- **@react-email/components** for emails

## Route groups

- **(public)** – Layout with public header/footer. Routes: `/`, `/portfolio`, `/services`, `/contact`, `/testimonials`, `/subscribe`.
- **(auth)** – Centered layout. Routes: `/login`, `/register` (admin only), `/forgot-password`, `/reset-password`.
- **(dashboard)** – Layout with sidebar + header. All routes under `/dashboard/*`. Protected by middleware; admin-only routes enforced in layout/pages.

## Middleware

- Protects `/dashboard/*`: requires authenticated user.
- Protects `/register`: requires authenticated **admin** (else redirect to dashboard).
- Public and auth routes are not protected by middleware.

## Folder structure

See project root `md/folder structure.md`. Highlights:

- `src/app/` – App Router routes and layouts.
- `src/components/` – UI, layout, common, features.
- `src/features/` – Core business logic by domain (auth, user-management, tasks, billing, etc.).
- `src/lib/` – DB (Prisma), auth, utils, upload, email.
- `src/server/trpc/` – tRPC router and context.
- `src/store/` – Zustand stores.
- `src/schemas/` – Zod schemas.
- `src/constants/` – Routes and other constants.

## Database

- **Dev:** SQLite (`DATABASE_URL="file:./prisma/dev.db"`). Run `npm run db:push` then `npm run db:seed` for admin + demo data.
- **Prod:** Switch Prisma datasource to PostgreSQL and run migrations.

## First admin

Run `npm run db:seed` to create `admin@unidatechs.com` (password: `Admin123!`) and demo data. Or use Prisma Studio to create a User with `role: "ADMIN"`.
