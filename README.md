# Unida Tech Admin System

**Domain:** unidatechs.com  
**Company:** Unida Tech – App, Website, System, Tracking, Hosting, Ethical Hacking, Server Solutions

Built to match **md/system.md** and **md/folder structure.md**.

## Tech stack

- **Next.js 14** App Router + TypeScript
- **Tailwind CSS** + shadcn/ui-style + Radix UI + Lucide Icons
- **Prisma** + **SQLite for dev** (PostgreSQL for production – change provider in schema)
- **tRPC** (type-safe API)
- **NextAuth v4** with Credentials + **Prisma (Database) adapter**
- **Zod** + **React Hook Form** + **TanStack Table** + **Recharts**
- **Zustand** for state
- **React Email** (`@react-email/components`) for email templates
- Ready for: UploadThing / next-upload, Socket.io / Pusher, Stripe / PayPal (placeholders)

## Roles

- **VISITOR** – Public only (portfolio, subscribe, testimonials, contact)
- **EMPLOYEE** – Login, limited dashboard
- **ADMIN** – Full access; **only Admin can register** new users (Employee/Admin)

## Setup

```bash
cp .env.example .env.local
# .env: DATABASE_URL="file:./prisma/dev.db" for SQLite dev

npm install
npm run db:push
npm run db:seed   # Admin + demo data (FAQ, Policy, Terms, Tasks, Invoice, etc.)
npm run dev
```

**First login:** `admin@unidatechs.com` / `Admin123!` (override with `SEED_ADMIN_EMAIL`, `SEED_ADMIN_PASSWORD`).

## Features (per system.md)

- **Auth:** Login, Register (admin-only), Forgot/Reset password, **Lockscreen**, 2FA/Security (placeholders)
- **Dashboard:** Overview with **widgets + Recharts**, role-based sidebar
- **Users:** CRUD, profile, role/permissions (admin)
- **Support, To-Do, Chat, Contacts, Calendar, Attendance**
- **File Manager, Invoices, Quotes**
- **FAQ, Policy, Terms** (Content)
- **Portfolio, Testimonials, Rate/Review**
- **Asset Management** (assign to employees)
- **Analytics** (Recharts), **Maintenance** (admin), **Audit logs** (schema ready)
- **Theme:** Unida Tech **blue/purple** brand, dark/light

## Scripts

- `npm run dev` – Development
- `npm run build` / `npm run start` – Production
- `npm run db:generate` / `npm run db:push` / `npm run db:seed` / `npm run db:studio`

## Folder structure

See `md/folder structure.md` and `docs/ARCHITECTURE.md`.
