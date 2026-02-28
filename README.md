# Unida Tech Admin System

**Domain:** unidatechs.com  
**Company:** Unida Tech – App, Website, System, Tracking, Hosting, Ethical Hacking, Server Solutions

Built to match **md/system.md** and **md/folder structure.md**.

## Tech stack

- **Next.js 14** App Router + TypeScript
- **Tailwind CSS** + **Hero UI** (components: Button, Card, etc.) + Radix UI + Lucide Icons
- **Prisma** + **MySQL**
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
# .env: DATABASE_URL="mysql://user:password@localhost:3306/unida_tech"

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

## Database (MySQL)

- **Prisma (recommended):** Create the DB in MySQL, set `DATABASE_URL` in `.env`, then:
  ```bash
  npm run db:push
  npm run db:seed
  ```
- **Raw SQL:** Create database and user in MySQL, then load schema:
  ```bash
  mysql -u user -p -e "CREATE DATABASE IF NOT EXISTS unida_tech CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"
  mysql -u user -p unida_tech < prisma/schema-mysql.sql
  ```
  Then run `npm run db:seed` for initial data. SQLite version (legacy): `prisma/schema.sql`.

## Scripts

- `npm run dev` – Development
- `npm run build` / `npm run start` – Production
- `npm run db:generate` / `npm run db:push` / `npm run db:seed` / `npm run db:studio`

## Folder structure

See `md/folder structure.md` and `docs/ARCHITECTURE.md`.
