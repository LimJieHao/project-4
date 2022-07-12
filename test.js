const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
    const user = await prisma.user.create({
      include: {
        inc_exp_budget: true,
      },
      data: {
        email: "12345@email.com",
        password: "12345",
        inc_exp_budget: {
          create: [
            {
              description: "Paycheck 1",
              planned_amt: 0.00,
              actual_amt: 0.00,
              inc_exp_id: "1",
            },
            {
                description: "Paycheck 2",
                planned_amt: 0.00,
                actual_amt: 0.00,
                inc_exp_id: "1",
              },
              {
                description: "Electricity",
                planned_amt: 0.00,
                actual_amt: 0.00,
                inc_exp_id: "2",
              },
              {
                description: "Water",
                planned_amt: 0.00,
                actual_amt: 0.00,
                inc_exp_id: "2",
              },
              {
                description: "Internet",
                planned_amt: 0.00,
                actual_amt: 0.00,
                inc_exp_id: "2",
              },
              {
                description: "Netflix",
                planned_amt: 0.00,
                actual_amt: 0.00,
                inc_exp_id: "3",
              },
              {
                description: "Disney Plus",
                planned_amt: 0.00,
                actual_amt: 0.00,
                inc_exp_id: "3",
              },
              {
                description: "Food",
                planned_amt: 0.00,
                actual_amt: 0.00,
                inc_exp_id: "4",
              },
              {
                description: "Groceries",
                planned_amt: 0.00,
                actual_amt: 0.00,
                inc_exp_id: "4",
              },
              {
                description: "Credit Card",
                planned_amt: 0.00,
                actual_amt: 0.00,
                inc_exp_id: "5",
              },                      
          ],
        },
      },
    });
  
//   const incExpCat = await prisma.inc_Exp_Category.createMany({
//     data: [
//       {
//         id: "1",
//         type: "Income",
//         name: "Income",
//       },
//       {
//         id: "2",
//         type: "Expense",
//         name: "Bills",
//       },
//       {
//         id: "3",
//         type: "Expense",
//         name: "Subscriptions",
//       },
//       {
//         id: "4",
//         type: "Expense",
//         name: "Spendings",
//       },
//       {
//         id: "5",
//         type: "Expense",
//         name: "Debt",
//       },
//       {
//         id: "6",
//         type: "Expense",
//         name: "Others",
//       },
//     ],
//   });
}

main()
  .catch((e) => {
    console.error(e.message);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
