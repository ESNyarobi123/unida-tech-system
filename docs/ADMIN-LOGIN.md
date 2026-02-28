# Admin login – dashboard

Admin user huundwa kwenye database wakati unapokwisha kukimbiza **seed**.

## Hatua

### 1. Hakikisha database iko tayari

- MySQL inaendesha na database `unida_tech` imeundwa.
- `.env` ina `DATABASE_URL` sahihi, mfano:
  ```env
  DATABASE_URL="mysql://USERNAME:PASSWORD@localhost:3306/unida_tech"
  ```
  (Badilisha `USERNAME` na `PASSWORD` kwa MySQL yako.)

### 2. Unda tables (kama bado)

```bash
npx prisma generate
npm run db:push
```

### 3. Ingiza admin na data ya mfano

```bash
npm run db:seed
```

Hii inaunda **user wa admin** na data ya mfano (FAQ, Policy, Tasks, n.k.).

### 4. Ingia kwenye dashboard

- **URL:** [http://localhost:3000/login](http://localhost:3000/login) (au **Staff Login** kwenye tovuti ya public).
- **Email:** `admin@unidatechs.com`
- **Password:** `Admin123!`

Baada ya kuingia utaelekezwa kwenye **dashboard** (`/dashboard`).

---

## Kubadilisha email au password ya admin

Weka kwenye `.env` kabla ya `npm run db:seed`:

```env
SEED_ADMIN_EMAIL="your-admin@example.com"
SEED_ADMIN_PASSWORD="YourSecurePassword123!"
```

Kisha endesha tena:

```bash
npm run db:seed
```

**Kumbuka:** Seed huangalia kama user yenye hiyo email tayari ipo. Ikiwa ipo, haitafanyi kitu (haitabadilisha password). Ili kubadilisha password ya admin aliyeisha kuwepo, tumia **Forgot password** kwenye `/login` au ubadilisha kwenye database (Prisma Studio: `npm run db:studio`).

---

## Admin tu anaweza

- Kusajili watumiaji wapya (Employee au Admin) kwenye `/register`
- Kuona na kudhibiti **Users** kwenye `/dashboard/users`
- Kuona **Maintenance** kwenye `/dashboard/maintenance`
