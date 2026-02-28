-- Unida Tech System - Database Schema (MySQL)
-- Use for manual DB setup. Charset: utf8mb4. Engine: InnoDB.
-- Roles: VISITOR | EMPLOYEE | ADMIN

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- =============================================================================
-- 1. User (must be first: self-reference + referenced by Account, Session, etc.)
-- =============================================================================
CREATE TABLE IF NOT EXISTS `User` (
  `id` VARCHAR(191) NOT NULL,
  `email` VARCHAR(191) NOT NULL,
  `passwordHash` VARCHAR(191) NULL,
  `name` VARCHAR(191) NULL,
  `role` VARCHAR(50) NOT NULL DEFAULT 'EMPLOYEE',
  `image` VARCHAR(500) NULL,
  `emailVerified` DATETIME(3) NULL,
  `twoFactorEnabled` TINYINT(1) NOT NULL DEFAULT 0,
  `twoFactorSecret` VARCHAR(191) NULL,
  `lockedUntil` DATETIME(3) NULL,
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  `createdById` VARCHAR(191) NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `User_email_key` (`email`),
  KEY `User_createdById_idx` (`createdById`),
  CONSTRAINT `User_createdById_fkey` FOREIGN KEY (`createdById`) REFERENCES `User` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =============================================================================
-- 2. Auth: Account, Session, VerificationToken
-- =============================================================================
CREATE TABLE IF NOT EXISTS `Account` (
  `id` VARCHAR(191) NOT NULL,
  `userId` VARCHAR(191) NOT NULL,
  `type` VARCHAR(191) NOT NULL,
  `provider` VARCHAR(191) NOT NULL,
  `providerAccountId` VARCHAR(191) NOT NULL,
  `refresh_token` TEXT NULL,
  `access_token` TEXT NULL,
  `expires_at` INT NULL,
  `token_type` VARCHAR(191) NULL,
  `scope` TEXT NULL,
  `id_token` TEXT NULL,
  `session_state` VARCHAR(191) NULL,
  PRIMARY KEY (`id`),
  KEY `Account_userId_idx` (`userId`),
  CONSTRAINT `Account_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `Session` (
  `id` VARCHAR(191) NOT NULL,
  `sessionToken` VARCHAR(191) NOT NULL,
  `userId` VARCHAR(191) NOT NULL,
  `expires` DATETIME(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Session_sessionToken_key` (`sessionToken`),
  KEY `Session_userId_idx` (`userId`),
  CONSTRAINT `Session_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `VerificationToken` (
  `identifier` VARCHAR(191) NOT NULL,
  `token` VARCHAR(191) NOT NULL,
  `expires` DATETIME(3) NOT NULL,
  PRIMARY KEY (`identifier`, `token`),
  UNIQUE KEY `VerificationToken_token_key` (`token`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =============================================================================
-- 3. Content & Public
-- =============================================================================
CREATE TABLE IF NOT EXISTS `Subscriber` (
  `id` VARCHAR(191) NOT NULL,
  `email` VARCHAR(191) NOT NULL,
  `name` VARCHAR(191) NULL,
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  UNIQUE KEY `Subscriber_email_key` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `Testimonial` (
  `id` VARCHAR(191) NOT NULL,
  `author` VARCHAR(191) NOT NULL,
  `role` VARCHAR(191) NULL,
  `company` VARCHAR(191) NULL,
  `content` LONGTEXT NOT NULL,
  `rating` INT NULL,
  `image` VARCHAR(500) NULL,
  `featured` TINYINT(1) NOT NULL DEFAULT 0,
  `sortOrder` INT NOT NULL DEFAULT 0,
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `PortfolioItem` (
  `id` VARCHAR(191) NOT NULL,
  `title` VARCHAR(255) NOT NULL,
  `slug` VARCHAR(191) NOT NULL,
  `description` LONGTEXT NULL,
  `image` VARCHAR(500) NULL,
  `url` VARCHAR(500) NULL,
  `tags` TEXT NULL,
  `featured` TINYINT(1) NOT NULL DEFAULT 0,
  `sortOrder` INT NOT NULL DEFAULT 0,
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  UNIQUE KEY `PortfolioItem_slug_key` (`slug`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `ContactMessage` (
  `id` VARCHAR(191) NOT NULL,
  `name` VARCHAR(191) NOT NULL,
  `email` VARCHAR(191) NOT NULL,
  `subject` VARCHAR(255) NULL,
  `message` LONGTEXT NOT NULL,
  `read` TINYINT(1) NOT NULL DEFAULT 0,
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =============================================================================
-- 4. FAQ, Policy, Terms
-- =============================================================================
CREATE TABLE IF NOT EXISTS `Faq` (
  `id` VARCHAR(191) NOT NULL,
  `question` VARCHAR(500) NOT NULL,
  `answer` LONGTEXT NOT NULL,
  `sortOrder` INT NOT NULL DEFAULT 0,
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `Policy` (
  `id` VARCHAR(191) NOT NULL,
  `slug` VARCHAR(191) NOT NULL,
  `title` VARCHAR(255) NOT NULL,
  `content` LONGTEXT NOT NULL,
  `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  UNIQUE KEY `Policy_slug_key` (`slug`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `TermsOfUse` (
  `id` VARCHAR(191) NOT NULL,
  `slug` VARCHAR(191) NOT NULL,
  `title` VARCHAR(255) NOT NULL,
  `content` LONGTEXT NOT NULL,
  `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  UNIQUE KEY `TermsOfUse_slug_key` (`slug`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =============================================================================
-- 5. Support (references User)
-- =============================================================================
CREATE TABLE IF NOT EXISTS `SupportTicket` (
  `id` VARCHAR(191) NOT NULL,
  `subject` VARCHAR(255) NOT NULL,
  `body` LONGTEXT NOT NULL,
  `status` VARCHAR(50) NOT NULL DEFAULT 'OPEN',
  `priority` VARCHAR(50) NOT NULL DEFAULT 'MEDIUM',
  `userId` VARCHAR(191) NULL,
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  KEY `SupportTicket_userId_idx` (`userId`),
  CONSTRAINT `SupportTicket_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =============================================================================
-- 6. Dashboard / Internal (Task, AttendanceRecord reference User)
-- =============================================================================
CREATE TABLE IF NOT EXISTS `Task` (
  `id` VARCHAR(191) NOT NULL,
  `title` VARCHAR(255) NOT NULL,
  `description` LONGTEXT NULL,
  `status` VARCHAR(50) NOT NULL DEFAULT 'TODO',
  `priority` VARCHAR(50) NOT NULL DEFAULT 'MEDIUM',
  `dueDate` DATETIME(3) NULL,
  `assigneeId` VARCHAR(191) NULL,
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  KEY `Task_assigneeId_idx` (`assigneeId`),
  CONSTRAINT `Task_assigneeId_fkey` FOREIGN KEY (`assigneeId`) REFERENCES `User` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `AttendanceRecord` (
  `id` VARCHAR(191) NOT NULL,
  `userId` VARCHAR(191) NOT NULL,
  `date` DATE NOT NULL,
  `checkIn` DATETIME(3) NULL,
  `checkOut` DATETIME(3) NULL,
  `notes` TEXT NULL,
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  UNIQUE KEY `AttendanceRecord_userId_date_key` (`userId`, `date`),
  KEY `AttendanceRecord_userId_idx` (`userId`),
  CONSTRAINT `AttendanceRecord_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =============================================================================
-- 7. Invoice, Quote
-- =============================================================================
CREATE TABLE IF NOT EXISTS `Invoice` (
  `id` VARCHAR(191) NOT NULL,
  `number` VARCHAR(191) NOT NULL,
  `clientName` VARCHAR(255) NOT NULL,
  `amount` DOUBLE NOT NULL,
  `status` VARCHAR(50) NOT NULL DEFAULT 'DRAFT',
  `dueDate` DATETIME(3) NOT NULL,
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  UNIQUE KEY `Invoice_number_key` (`number`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `Quote` (
  `id` VARCHAR(191) NOT NULL,
  `title` VARCHAR(255) NOT NULL,
  `clientName` VARCHAR(255) NOT NULL,
  `amount` DOUBLE NOT NULL,
  `status` VARCHAR(50) NOT NULL DEFAULT 'DRAFT',
  `validUntil` DATETIME(3) NOT NULL,
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =============================================================================
-- 8. Asset (references User)
-- =============================================================================
CREATE TABLE IF NOT EXISTS `Asset` (
  `id` VARCHAR(191) NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  `type` VARCHAR(191) NULL,
  `serialNo` VARCHAR(191) NULL,
  `assigneeId` VARCHAR(191) NULL,
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  KEY `Asset_assigneeId_idx` (`assigneeId`),
  CONSTRAINT `Asset_assigneeId_fkey` FOREIGN KEY (`assigneeId`) REFERENCES `User` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =============================================================================
-- 9. Audit & Email
-- =============================================================================
CREATE TABLE IF NOT EXISTS `AuditLog` (
  `id` VARCHAR(191) NOT NULL,
  `action` VARCHAR(191) NOT NULL,
  `entity` VARCHAR(191) NULL,
  `entityId` VARCHAR(191) NULL,
  `userId` VARCHAR(191) NULL,
  `details` TEXT NULL,
  `ip` VARCHAR(191) NULL,
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `EmailTemplate` (
  `id` VARCHAR(191) NOT NULL,
  `slug` VARCHAR(191) NOT NULL,
  `subject` VARCHAR(255) NOT NULL,
  `body` LONGTEXT NOT NULL,
  `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  UNIQUE KEY `EmailTemplate_slug_key` (`slug`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `NewsletterCampaign` (
  `id` VARCHAR(191) NOT NULL,
  `subject` VARCHAR(255) NOT NULL,
  `body` LONGTEXT NOT NULL,
  `sentAt` DATETIME(3) NULL,
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

SET FOREIGN_KEY_CHECKS = 1;
