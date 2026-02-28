-- Weka upya password ya admin kuwa Admin123!
-- Run hii ikiwa admin tayari ipo kwenye DB lakini password haifanyi kazi.
-- Password hash hapa = Admin123! (bcrypt)

SET NAMES utf8mb4;

UPDATE `User`
SET `passwordHash` = '$2a$10$4uoVN1BghBsb89K8CFmNJuVEh3h7LszFyjFkuZjBTWASY7nd4JjUe',
    `updatedAt`   = CURRENT_TIMESTAMP(3)
WHERE `email` = 'admin@unidatechs.com';

-- Angalia: ikiwa 0 rows affected, hakuna user na email hiyo – run seed-admin.sql kwanza.
