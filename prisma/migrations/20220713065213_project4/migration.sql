-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Inc_Exp_Category" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Inc_Exp_Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Inc_Exp_Budget" (
    "id" TEXT NOT NULL,
    "date" DATE NOT NULL,
    "planned_amt" DOUBLE PRECISION NOT NULL DEFAULT 0.00,
    "actual_amt" DOUBLE PRECISION NOT NULL DEFAULT 0.00,
    "merchant" TEXT,
    "note" TEXT,
    "rec_type" TEXT,
    "rec_start_date" DATE,
    "rec_end_date" DATE,
    "rec_amt" DOUBLE PRECISION DEFAULT 0.00,
    "user_id" TEXT NOT NULL,
    "inc_exp_id" TEXT NOT NULL,

    CONSTRAINT "Inc_Exp_Budget_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Inc_Exp_Category_category_key" ON "Inc_Exp_Category"("category");

-- AddForeignKey
ALTER TABLE "Inc_Exp_Budget" ADD CONSTRAINT "Inc_Exp_Budget_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inc_Exp_Budget" ADD CONSTRAINT "Inc_Exp_Budget_inc_exp_id_fkey" FOREIGN KEY ("inc_exp_id") REFERENCES "Inc_Exp_Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
