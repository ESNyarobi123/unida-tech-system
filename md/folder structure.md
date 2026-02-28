nataka Next.js full project (App Router) kwa Unida Tech (unidatechs.com) – company inayofanya app dev, website, system, tracking, hosting, ethical hacking n.k.
Hii system itakuwa na 3 roles:

Visitor → public access tu (portfolio, subscribe, testimonials, contact)
Employee → login + limited dashboard
Admin → full control (anaweza register employee & admin)

unida-tech-system/
├── .env.local
├── .env.example
├── .gitignore
├── next.config.mjs
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── middleware.ts                 # Role protection + auth
├── README.md
├── public/
│   ├── assets/
│   ├── icons/
│   └── uploads/                  # static files
├── prisma/
│   └── schema.prisma
├── src/
│   ├── app/
│   │   ├── (auth)/
│   │   │   ├── login/
│   │   │   ├── register/         # Admin only
│   │   │   ├── forgot-password/
│   │   │   ├── reset-password/
│   │   │   └── layout.tsx
│   │   ├── (dashboard)/          # Protected group
│   │   │   ├── layout.tsx        # Sidebar + Navbar + Role switcher
│   │   │   ├── page.tsx          # Dashboard Overview (widgets, analytics)
│   │   │   ├── users/
│   │   │   ├── tasks/            # Kanban + To-do
│   │   │   ├── calendar/
│   │   │   ├── attendance/
│   │   │   ├── contacts/
│   │   │   ├── chat/             # Internal + Chatbot
│   │   │   ├── billing/
│   │   │   │   ├── invoices/
│   │   │   │   └── quotes/
│   │   │   ├── file-manager/
│   │   │   ├── asset-management/
│   │   │   ├── support/
│   │   │   ├── content/          # FAQ, Policy, Terms, Portfolio, Testimonials
│   │   │   ├── analytics/
│   │   │   ├── settings/
│   │   │   └── maintenance/
│   │   ├── (public)/             # Visitor pages
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx          # Home
│   │   │   ├── portfolio/
│   │   │   ├── services/
│   │   │   └── contact/
│   │   ├── api/
│   │   │   └── trpc/             # tRPC routes
│   │   └── layout.tsx
│   │
│   ├── components/
│   │   ├── ui/                   # shadcn/ui
│   │   ├── layout/               # Sidebar, Header, Footer
│   │   ├── common/               # DataTable, Card, Modal, etc.
│   │   └── features/             # UserTable, KanbanBoard, FileUploader...
│   │
│   ├── features/                 # ★ CORE BUSINESS LOGIC (best practice)
│   │   ├── auth/
│   │   ├── user-management/
│   │   ├── task-management/
│   │   ├── billing/
│   │   ├── communication/        # chat, email, newsletter, chatbot
│   │   ├── calendar/
│   │   ├── attendance/
│   │   ├── file-asset/
│   │   ├── analytics/
│   │   └── content-management/
│   │
│   ├── lib/
│   │   ├── prisma.ts
│   │   ├── auth.ts               # NextAuth config + role checks
│   │   ├── utils.ts
│   │   ├── upload.ts
│   │   └── email.ts
│   │
│   ├── hooks/
│   ├── store/                    # Zustand (user, theme, etc.)
│   ├── types/
│   ├── constants/
│   └── schemas/                  # Zod schemas
│
├── docs/
│   └── ARCHITECTURE.md
└── Cursor-Prompt-UnidaTech.md    # ← hii nitakupa chini