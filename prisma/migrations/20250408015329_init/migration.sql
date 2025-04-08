-- CreateTable
CREATE TABLE "VIP" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "email" TEXT,
    "phone" TEXT,
    "signedUp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "VIP_pkey" PRIMARY KEY ("id")
);
