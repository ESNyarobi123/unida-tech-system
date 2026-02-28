-- Unida Tech System - Database Schema (SQLite)
-- Generated from Prisma schema. Use for manual DB setup or migration reference.
-- Roles: VISITOR | EMPLOYEE | ADMIN

-- =============================================================================
-- 1. User (must be first: self-reference + referenced by Account, Session, etc.)
-- =============================================================================
CREATE TABLE IF NOT EXISTS "User" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "email" TEXT NOT NULL,
  "passwordHash" TEXT,
  "name" TEXT,
  "role" TEXT NOT NULL DEFAULT 'EMPLOYEE',
  "image" TEXT,
  "emailVerified" TEXT,
  "twoFactorEnabled" INTEGER NOT NULL DEFAULT 0,
  "twoFactorSecret" TEXT,
  "lockedUntil" TEXT,
  "createdAt" TEXT NOT NULL DEFAULT (datetime('now')),
  "updatedAt" TEXT NOT NULL DEFAULT (datetime('now')),
  "createdById" TEXT,
  CONSTRAINT "User_email_key" UNIQUE ("email"),
  CONSTRAINT "User_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

CREATE INDEX IF NOT EXISTS "User_createdById_idx" ON "User" ("createdById");
CREATE INDEX IF NOT EXISTS "User_email_idx" ON "User" ("email");

-- =============================================================================
-- 2. Auth: Account, Session, VerificationToken
-- =============================================================================
CREATE TABLE IF NOT EXISTS "Account" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "userId" TEXT NOT NULL,
  "type" TEXT NOT NULL,
  "provider" TEXT NOT NULL,
  "providerAccountId" TEXT NOT NULL,
  "refresh_token" TEXT,
  "access_token" TEXT,
  "expires_at" INTEGER,
  "token_type" TEXT,
  "scope" TEXT,
  "id_token" TEXT,
  "session_state" TEXT,
  CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE INDEX IF NOT EXISTS "Account_userId_idx" ON "Account" ("userId");

CREATE TABLE IF NOT EXISTS "Session" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "sessionToken" TEXT NOT NULL,
  "userId" TEXT NOT NULL,
  "expires" TEXT NOT NULL,
  CONSTRAINT "Session_sessionToken_key" UNIQUE ("sessionToken"),
  CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE INDEX IF NOT EXISTS "Session_userId_idx" ON "Session" ("userId");

CREATE TABLE IF NOT EXISTS "VerificationToken" (
  "identifier" TEXT NOT NULL,
  "token" TEXT NOT NULL,
  "expires" TEXT NOT NULL,
  PRIMARY KEY ("identifier", "token"),
  CONSTRAINT "VerificationToken_token_key" UNIQUE ("token")
);

-- =============================================================================
-- 3. Content & Public
-- =============================================================================
CREATE TABLE IF NOT EXISTS "Subscriber" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "email" TEXT NOT NULL,
  "name" TEXT,
  "createdAt" TEXT NOT NULL DEFAULT (datetime('now')),
  CONSTRAINT "Subscriber_email_key" UNIQUE ("email")
);

CREATE TABLE IF NOT EXISTS "Testimonial" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "author" TEXT NOT NULL,
  "role" TEXT,
  "company" TEXT,
  "content" TEXT NOT NULL,
  "rating" INTEGER,
  "image" TEXT,
  "featured" INTEGER NOT NULL DEFAULT 0,
  "sortOrder" INTEGER NOT NULL DEFAULT 0,
  "createdAt" TEXT NOT NULL DEFAULT (datetime('now')),
  "updatedAt" TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS "PortfolioItem" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "title" TEXT NOT NULL,
  "slug" TEXT NOT NULL,
  "description" TEXT,
  "image" TEXT,
  "url" TEXT,
  "tags" TEXT,
  "featured" INTEGER NOT NULL DEFAULT 0,
  "sortOrder" INTEGER NOT NULL DEFAULT 0,
  "createdAt" TEXT NOT NULL DEFAULT (datetime('now')),
  "updatedAt" TEXT NOT NULL DEFAULT (datetime('now')),
  CONSTRAINT "PortfolioItem_slug_key" UNIQUE ("slug")
);

CREATE TABLE IF NOT EXISTS "ContactMessage" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "name" TEXT NOT NULL,
  "email" TEXT NOT NULL,
  "subject" TEXT,
  "message" TEXT NOT NULL,
  "read" INTEGER NOT NULL DEFAULT 0,
  "createdAt" TEXT NOT NULL DEFAULT (datetime('now'))
);

-- =============================================================================
-- 4. FAQ, Policy, Terms
-- =============================================================================
CREATE TABLE IF NOT EXISTS "Faq" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "question" TEXT NOT NULL,
  "answer" TEXT NOT NULL,
  "sortOrder" INTEGER NOT NULL DEFAULT 0,
  "createdAt" TEXT NOT NULL DEFAULT (datetime('now')),
  "updatedAt" TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS "Policy" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "slug" TEXT NOT NULL,
  "title" TEXT NOT NULL,
  "content" TEXT NOT NULL,
  "updatedAt" TEXT NOT NULL DEFAULT (datetime('now')),
  CONSTRAINT "Policy_slug_key" UNIQUE ("slug")
);

CREATE TABLE IF NOT EXISTS "TermsOfUse" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "slug" TEXT NOT NULL,
  "title" TEXT NOT NULL,
  "content" TEXT NOT NULL,
  "updatedAt" TEXT NOT NULL DEFAULT (datetime('now')),
  CONSTRAINT "TermsOfUse_slug_key" UNIQUE ("slug")
);

-- =============================================================================
-- 5. Support (references User)
-- =============================================================================
CREATE TABLE IF NOT EXISTS "SupportTicket" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "subject" TEXT NOT NULL,
  "body" TEXT NOT NULL,
  "status" TEXT NOT NULL DEFAULT 'OPEN',
  "priority" TEXT NOT NULL DEFAULT 'MEDIUM',
  "userId" TEXT,
  "createdAt" TEXT NOT NULL DEFAULT (datetime('now')),
  "updatedAt" TEXT NOT NULL DEFAULT (datetime('now')),
  CONSTRAINT "SupportTicket_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

CREATE INDEX IF NOT EXISTS "SupportTicket_userId_idx" ON "SupportTicket" ("userId");

-- =============================================================================
-- 6. Dashboard / Internal (Task, AttendanceRecord reference User)
-- =============================================================================
CREATE TABLE IF NOT EXISTS "Task" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "title" TEXT NOT NULL,
  "description" TEXT,
  "status" TEXT NOT NULL DEFAULT 'TODO',
  "priority" TEXT NOT NULL DEFAULT 'MEDIUM',
  "dueDate" TEXT,
  "assigneeId" TEXT,
  "createdAt" TEXT NOT NULL DEFAULT (datetime('now')),
  "updatedAt" TEXT NOT NULL DEFAULT (datetime('now')),
  CONSTRAINT "Task_assigneeId_fkey" FOREIGN KEY ("assigneeId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

CREATE INDEX IF NOT EXISTS "Task_assigneeId_idx" ON "Task" ("assigneeId");

CREATE TABLE IF NOT EXISTS "AttendanceRecord" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "userId" TEXT NOT NULL,
  "date" TEXT NOT NULL,
  "checkIn" TEXT,
  "checkOut" TEXT,
  "notes" TEXT,
  "createdAt" TEXT NOT NULL DEFAULT (datetime('now')),
  CONSTRAINT "AttendanceRecord_userId_date_key" UNIQUE ("userId", "date"),
  CONSTRAINT "AttendanceRecord_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE INDEX IF NOT EXISTS "AttendanceRecord_userId_idx" ON "AttendanceRecord" ("userId");

-- =============================================================================
-- 7. Invoice, Quote
-- =============================================================================
CREATE TABLE IF NOT EXISTS "Invoice" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "number" TEXT NOT NULL,
  "clientName" TEXT NOT NULL,
  "amount" REAL NOT NULL,
  "status" TEXT NOT NULL DEFAULT 'DRAFT',
  "dueDate" TEXT NOT NULL,
  "createdAt" TEXT NOT NULL DEFAULT (datetime('now')),
  "updatedAt" TEXT NOT NULL DEFAULT (datetime('now')),
  CONSTRAINT "Invoice_number_key" UNIQUE ("number")
);

CREATE TABLE IF NOT EXISTS "Quote" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "title" TEXT NOT NULL,
  "clientName" TEXT NOT NULL,
  "amount" REAL NOT NULL,
  "status" TEXT NOT NULL DEFAULT 'DRAFT',
  "validUntil" TEXT NOT NULL,
  "createdAt" TEXT NOT NULL DEFAULT (datetime('now')),
  "updatedAt" TEXT NOT NULL DEFAULT (datetime('now'))
);

-- =============================================================================
-- 8. Asset (references User)
-- =============================================================================
CREATE TABLE IF NOT EXISTS "Asset" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "name" TEXT NOT NULL,
  "type" TEXT,
  "serialNo" TEXT,
  "assigneeId" TEXT,
  "createdAt" TEXT NOT NULL DEFAULT (datetime('now')),
  "updatedAt" TEXT NOT NULL DEFAULT (datetime('now')),
  CONSTRAINT "Asset_assigneeId_fkey" FOREIGN KEY ("assigneeId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

CREATE INDEX IF NOT EXISTS "Asset_assigneeId_idx" ON "Asset" ("assigneeId");

-- =============================================================================
-- 9. Audit & Email
-- =============================================================================
CREATE TABLE IF NOT EXISTS "AuditLog" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "action" TEXT NOT NULL,
  "entity" TEXT,
  "entityId" TEXT,
  "userId" TEXT,
  "details" TEXT,
  "ip" TEXT,
  "createdAt" TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS "EmailTemplate" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "slug" TEXT NOT NULL,
  "subject" TEXT NOT NULL,
  "body" TEXT NOT NULL,
  "updatedAt" TEXT NOT NULL DEFAULT (datetime('now')),
  CONSTRAINT "EmailTemplate_slug_key" UNIQUE ("slug")
);

CREATE TABLE IF NOT EXISTS "NewsletterCampaign" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "subject" TEXT NOT NULL,
  "body" TEXT NOT NULL,
  "sentAt" TEXT,
  "createdAt" TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Note: updatedAt is managed by Prisma in the application layer.
