/*
  Warnings:

  - The `roles` column on the `users` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "users_roles_enum" AS ENUM ('ADMIN', 'USUARIO');

-- AlterTable
ALTER TABLE "users" DROP COLUMN "roles",
ADD COLUMN     "roles" "users_roles_enum"[] DEFAULT ARRAY['ADMIN']::"users_roles_enum"[];

-- DropEnum
DROP TYPE "user_roles_enum";
