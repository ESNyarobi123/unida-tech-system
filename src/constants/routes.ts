// Public
export const ROUTES = {
  HOME: "/",
  PORTFOLIO: "/portfolio",
  SERVICES: "/services",
  CONTACT: "/contact",
  TESTIMONIALS: "/testimonials",
  SUBSCRIBE: "/subscribe",

  // Auth
  LOGIN: "/login",
  REGISTER: "/register",
  FORGOT_PASSWORD: "/forgot-password",
  RESET_PASSWORD: "/reset-password",
  LOCKSCREEN: "/lockscreen",

  // Dashboard
  DASHBOARD: "/dashboard",
  USERS: "/dashboard/users",
  TASKS: "/dashboard/tasks",
  CALENDAR: "/dashboard/calendar",
  ATTENDANCE: "/dashboard/attendance",
  CONTACTS: "/dashboard/contacts",
  CHAT: "/dashboard/chat",
  BILLING_INVOICES: "/dashboard/billing/invoices",
  BILLING_QUOTES: "/dashboard/billing/quotes",
  FILE_MANAGER: "/dashboard/file-manager",
  ASSET_MANAGEMENT: "/dashboard/asset-management",
  SUPPORT: "/dashboard/support",
  CONTENT: "/dashboard/content",
  CONTENT_FAQ: "/dashboard/content/faq",
  CONTENT_POLICY: "/dashboard/content/policy",
  CONTENT_TERMS: "/dashboard/content/terms",
  ANALYTICS: "/dashboard/analytics",
  SETTINGS: "/dashboard/settings",
  MAINTENANCE: "/dashboard/maintenance",
} as const;

export const PUBLIC_PATHS = [
  ROUTES.HOME,
  ROUTES.PORTFOLIO,
  ROUTES.SERVICES,
  ROUTES.CONTACT,
  ROUTES.TESTIMONIALS,
  ROUTES.SUBSCRIBE,
  "/api/trpc",
  "/api/auth",
] as const;

export const AUTH_PATHS = [
  ROUTES.LOGIN,
  ROUTES.REGISTER,
  ROUTES.FORGOT_PASSWORD,
  ROUTES.RESET_PASSWORD,
] as const;
