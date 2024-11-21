-- CreateEnum
CREATE TYPE "users_roles_enum" AS ENUM ('ADMIN', 'USUARIO');

-- CreateTable
CREATE TABLE "articles" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "is_published" BOOLEAN NOT NULL DEFAULT false,
    "author_id" DECIMAL NOT NULL,
    "user_id" INTEGER,

    CONSTRAINT "PK_0a6e2c450d83e0b6052c2793334" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "profiles" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "last_name" VARCHAR,
    "email" TEXT NOT NULL,
    "age" INTEGER NOT NULL,

    CONSTRAINT "PK_8e520eb4da7dc01d0e190447c8e" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT false,
    "roles" "users_roles_enum"[] DEFAULT ARRAY['ADMIN']::"users_roles_enum"[],
    "profile_id" INTEGER,

    CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UQ_fe0bb3f6520ee0469504521e710" ON "users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "REL_23371445bd80cb3e413089551b" ON "users"("profile_id");

-- AddForeignKey
ALTER TABLE "articles" ADD CONSTRAINT "FK_87bb15395540ae06337a486a77a" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "FK_23371445bd80cb3e413089551bf" FOREIGN KEY ("profile_id") REFERENCES "profiles"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

