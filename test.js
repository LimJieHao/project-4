const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  // const user = await prisma.user.create({
  //   include: {
  //     inc_exp_budget: true,
  //   },
  //   data: {
  //     email: "12345@email.com",
  //     password: "12345",
  //     inc_exp_budget: {
  //       create: [
  //         {
  //           description: "Paycheck 1",
  //           planned_amt: 0.00,
  //           actual_amt: 0.00,
  //           inc_exp_id: "1",
  //         },
  //         {
  //             description: "Paycheck 2",
  //             planned_amt: 0.00,
  //             actual_amt: 0.00,
  //             inc_exp_id: "1",
  //           },
  //           {
  //             description: "Electricity",
  //             planned_amt: 0.00,
  //             actual_amt: 0.00,
  //             inc_exp_id: "2",
  //           },
  //           {
  //             description: "Water",
  //             planned_amt: 0.00,
  //             actual_amt: 0.00,
  //             inc_exp_id: "2",
  //           },
  //           {
  //             description: "Internet",
  //             planned_amt: 0.00,
  //             actual_amt: 0.00,
  //             inc_exp_id: "2",
  //           },
  //           {
  //             description: "Netflix",
  //             planned_amt: 0.00,
  //             actual_amt: 0.00,
  //             inc_exp_id: "3",
  //           },
  //           {
  //             description: "Disney Plus",
  //             planned_amt: 0.00,
  //             actual_amt: 0.00,
  //             inc_exp_id: "3",
  //           },
  //           {
  //             description: "Food",
  //             planned_amt: 0.00,
  //             actual_amt: 0.00,
  //             inc_exp_id: "4",
  //           },
  //           {
  //             description: "Groceries",
  //             planned_amt: 0.00,
  //             actual_amt: 0.00,
  //             inc_exp_id: "4",
  //           },
  //           {
  //             description: "Credit Card",
  //             planned_amt: 0.00,
  //             actual_amt: 0.00,
  //             inc_exp_id: "5",
  //           },
  //       ],
  //     },
  //   },
  // });

  //   const incExpCat = await prisma.inc_Exp_Category.createMany({
  //     data: [
  //       {
  //         id: "1",
  //         type: "Income",
  //         category: "Income",
  //       },
  //       {
  //         id: "2",
  //         type: "Expense",
  //         category: "Bills",
  //       },
  //       {
  //         id: "3",
  //         type: "Expense",
  //         category: "Subscriptions",
  //       },
  //       {
  //         id: "4",
  //         type: "Expense",
  //         category: "Spendings",
  //       },
  //       {
  //         id: "5",
  //         type: "Expense",
  //         category: "Debt",
  //       },
  //     ],
  //   });

  // const newBudget = await prisma.Inc_Exp_Budget.createMany({
  //   data: [
  //     {
  //       user_id: "2d294a6b-9822-4fe2-8032-1ffc81ed561f",
  //       date: "2022-07-01T00:00:00.000Z",
  //       description: "Paycheck 1",
  //       planned_amt: 0.0,
  //       actual_amt: 0.0,
  //       inc_exp_id: "1",
  //     },
  //     {
  //       user_id: "2d294a6b-9822-4fe2-8032-1ffc81ed561f",
  //       date: "2022-07-01T00:00:00.000Z",
  //       description: "Paycheck 2",
  //       planned_amt: 0.0,
  //       actual_amt: 0.0,
  //       inc_exp_id: "1",
  //     },
  //     {
  //       user_id: "2d294a6b-9822-4fe2-8032-1ffc81ed561f",
  //       date: "2022-07-01T00:00:00.000Z",
  //       description: "Electricity",
  //       planned_amt: 0.0,
  //       actual_amt: 0.0,
  //       inc_exp_id: "2",
  //     },
  //     {
  //       user_id: "2d294a6b-9822-4fe2-8032-1ffc81ed561f",
  //       date: "2022-07-01T00:00:00.000Z",
  //       description: "Water",
  //       planned_amt: 0.0,
  //       actual_amt: 0.0,
  //       inc_exp_id: "2",
  //     },
  //     {
  //       user_id: "2d294a6b-9822-4fe2-8032-1ffc81ed561f",
  //       date: "2022-07-01T00:00:00.000Z",
  //       description: "Internet",
  //       planned_amt: 0.0,
  //       actual_amt: 0.0,
  //       inc_exp_id: "2",
  //     },
  //     {
  //       user_id: "2d294a6b-9822-4fe2-8032-1ffc81ed561f",
  //       date: "2022-07-01T00:00:00.000Z",
  //       description: "Netflix",
  //       planned_amt: 0.0,
  //       actual_amt: 0.0,
  //       inc_exp_id: "3",
  //     },
  //     {
  //       user_id: "2d294a6b-9822-4fe2-8032-1ffc81ed561f",
  //       date: "2022-07-01T00:00:00.000Z",
  //       description: "Disney Plus",
  //       planned_amt: 0.0,
  //       actual_amt: 0.0,
  //       inc_exp_id: "3",
  //     },
  //     {
  //       user_id: "2d294a6b-9822-4fe2-8032-1ffc81ed561f",
  //       date: "2022-07-01T00:00:00.000Z",
  //       description: "Food",
  //       planned_amt: 0.0,
  //       actual_amt: 0.0,
  //       inc_exp_id: "4",
  //     },
  //     {
  //       user_id: "2d294a6b-9822-4fe2-8032-1ffc81ed561f",
  //       date: "2022-07-01T00:00:00.000Z",
  //       description: "Groceries",
  //       planned_amt: 0.0,
  //       actual_amt: 0.0,
  //       inc_exp_id: "4",
  //     },
  //     {
  //       user_id: "2d294a6b-9822-4fe2-8032-1ffc81ed561f",
  //       date: "2022-07-01T00:00:00.000Z",
  //       description: "Credit Card",
  //       planned_amt: 0.0,
  //       actual_amt: 0.0,
  //       inc_exp_id: "5",
  //     },
  //   ],
  // });

  // const budgetInfo = await prisma.Inc_Exp_Budget.findMany({
  //   where: {
  //     user_id: "2d294a6b-9822-4fe2-8032-1ffc81ed561f",
  //     date: "2022-07-01T00:00:00.000Z",
  //   },
  //   include: {
  //     inc_exp_category: {},
  //   },
  //   orderBy: [
  //     {
  //       inc_exp_category: {
  //         type: "desc",
  //       },
  //     },
  //     {
  //       inc_exp_category: {
  //         category: "asc",
  //       },
  //     },
  //     {
  //       description: "asc",
  //     },
  //   ],
  // });
  // console.log(budgetInfo)
  // const newBudget = await prisma.Inc_Exp_Budget.createMany({
  //   data: [
  //     {
  //       user_id: "2d294a6b-9822-4fe2-8032-1ffc81ed561f",
  //       date: "2022-07-01T00:00:00.000Z",
  //       description: "Paycheck 1",
  //       planned_amt: 0.0,
  //       actual_amt: 0.0,
  //       inc_exp_id: "1",
  //     },
  //     {
  //       user_id: "2d294a6b-9822-4fe2-8032-1ffc81ed561f",
  //       date: "2022-07-01T00:00:00.000Z",
  //       description: "Paycheck 2",
  //       planned_amt: 0.0,
  //       actual_amt: 0.0,
  //       inc_exp_id: "1",
  //     },
  //     {
  //       user_id: "2d294a6b-9822-4fe2-8032-1ffc81ed561f",
  //       date: "2022-07-01T00:00:00.000Z",
  //       description: "Electricity",
  //       planned_amt: 0.0,
  //       actual_amt: 0.0,
  //       inc_exp_id: "2",
  //     },
  //     {
  //       user_id: "2d294a6b-9822-4fe2-8032-1ffc81ed561f",
  //       date: "2022-07-01T00:00:00.000Z",
  //       description: "Water",
  //       planned_amt: 0.0,
  //       actual_amt: 0.0,
  //       inc_exp_id: "2",
  //     },
  //     {
  //       user_id: "2d294a6b-9822-4fe2-8032-1ffc81ed561f",
  //       date: "2022-07-01T00:00:00.000Z",
  //       description: "Internet",
  //       planned_amt: 0.0,
  //       actual_amt: 0.0,
  //       inc_exp_id: "2",
  //     },
  //     {
  //       user_id: "2d294a6b-9822-4fe2-8032-1ffc81ed561f",
  //       date: "2022-07-01T00:00:00.000Z",
  //       description: "Netflix",
  //       planned_amt: 0.0,
  //       actual_amt: 0.0,
  //       inc_exp_id: "3",
  //     },
  //     {
  //       user_id: "2d294a6b-9822-4fe2-8032-1ffc81ed561f",
  //       date: "2022-07-01T00:00:00.000Z",
  //       description: "Disney Plus",
  //       planned_amt: 0.0,
  //       actual_amt: 0.0,
  //       inc_exp_id: "3",
  //     },
  //     {
  //       user_id: "2d294a6b-9822-4fe2-8032-1ffc81ed561f",
  //       date: "2022-07-01T00:00:00.000Z",
  //       description: "Food",
  //       planned_amt: 0.0,
  //       actual_amt: 0.0,
  //       inc_exp_id: "4",
  //     },
  //     {
  //       user_id: "2d294a6b-9822-4fe2-8032-1ffc81ed561f",
  //       date: "2022-07-01T00:00:00.000Z",
  //       description: "Groceries",
  //       planned_amt: 0.0,
  //       actual_amt: 0.0,
  //       inc_exp_id: "4",
  //     },
  //     {
  //       user_id: "2d294a6b-9822-4fe2-8032-1ffc81ed561f",
  //       date: "2022-07-01T00:00:00.000Z",
  //       description: "Credit Card",
  //       planned_amt: 0.0,
  //       actual_amt: 0.0,
  //       inc_exp_id: "5",
  //     },
  //   ],
  // });
  // console.log(newBudget)
}

main()
  .catch((e) => {
    console.error(e.message);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
