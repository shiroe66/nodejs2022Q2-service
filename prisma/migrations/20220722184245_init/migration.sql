-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "login" TEXT,
    "password" TEXT,
    "version" INTEGER,
    "createdAt" INTEGER,
    "updatedAt" INTEGER,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);
