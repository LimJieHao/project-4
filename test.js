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

  // const budgetInfo = await prisma.Inc_Exp_Budget.findMany({
  //   where: {
  //     user_id: "d8e850c6-75b4-4197-b4a4-e0590913bc81",
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
  //         name: "asc",
  //       },
  //     },
  //     {
  //       description: "asc"
  //     }
  //   ],
  // });
  // console.log(budgetInfo);
  const newBudget = await prisma.Inc_Exp_Budget.create({
    data: {
      date: req.body.date,
      planned_amt: req.body.planned_amt,
      actual_amt: req.body.actual_amt,
      merchant: req.body.merchant,
      description: req.body.description,
      note: req.body.note,
      rec_type: req.body.rec_type,
      rec_start_date: req.body.rec_start_date,
      rec_end_date: req.body.rec_end_date,
      rec_amt: req.body.rec_amt,
      user_id: "d8e850c6-75b4-4197-b4a4-e0590913bc81", // To amend
      inc_exp_id: "1", // To amend
    },
  });
}

main()
  .catch((e) => {
    console.error(e.message);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
