-- CreateTable
CREATE TABLE "RevokeToken" (
    "id" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "revokedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RevokeToken_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "RevokeToken_token_key" ON "RevokeToken"("token");
