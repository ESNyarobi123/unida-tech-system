-- Unida Tech – Kuongeza Admin kwenye Database (MySQL)
-- Upload / run this file to add the default admin user.
--
-- Login baada ya ku-run:
--   Email:    admin@unidatechs.com
--   Password: Admin123!
--
-- Tumia: Run after schema is created (schema-mysql.sql or db:push).
-- Run mara nyingi: safe (INSERT IGNORE – haitafanya kitu ikiwa email tayari ipo).

SET NAMES utf8mb4;

-- Admin user (password: Admin123! – bcrypt hash)
-- Kubadilisha password: generate hash then replace passwordHash below:
--   node -e "console.log(require('bcryptjs').hashSync('YourNewPassword', 10))"
INSERT IGNORE INTO `User` (
  `id`,
  `email`,
  `passwordHash`,
  `name`,
  `role`,
  `image`,
  `emailVerified`,
  `twoFactorEnabled`,
  `twoFactorSecret`,
  `lockedUntil`,
  `createdAt`,
  `updatedAt`,
  `createdById`
) VALUES (
  'clseedadmin00000000000001',
  'admin@unidatechs.com',
  '$2a$10$4uoVN1BghBsb89K8CFmNJuVEh3h7LszFyjFkuZjBTWASY7nd4JjUe',
  'Admin',
  'ADMIN',
  NULL,
  NULL,
  0,
  NULL,
  NULL,
  CURRENT_TIMESTAMP(3),
  CURRENT_TIMESTAMP(3),
  NULL
);
