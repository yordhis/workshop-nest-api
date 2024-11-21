/*
  Warnings:

  - The `roles` column on the `users` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "user_roles_enum" AS ENUM ('ADMIN', 'USUARIO');

-- AlterTable
ALTER TABLE "users" DROP COLUMN "roles",
ADD COLUMN     "roles" "user_roles_enum"[] DEFAULT ARRAY['ADMIN']::"user_roles_enum"[];

-- DropEnum
DROP TYPE "userRolesEnum";
