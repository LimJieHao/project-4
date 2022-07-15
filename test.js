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
  // const getUser = await prisma.budget_Category.findMany({
  //   where: {
  //     user_id: "2eb2ab66-1ecb-45c4-8b5a-7248d73354ad",
  //     type: "Income"
  //   },
  //   select: {
  //     type: true,
  //     category: true,
  //     name: true,
  //     planned_amt: true,
  //   },
  // })
  // const getUser1 = await prisma.budget_Category.findMany({
  //   where: {
  //     user_id: "2eb2ab66-1ecb-45c4-8b5a-7248d73354ad",
  //     type: "Expense"
  //   },
  //   select: {
  //     type: true,
  //     category: true,
  //     name: true,
  //     planned_amt: true,
  //   },
  // })
  // const obj = {"Income":getUser,"Expense":getUser1}
  // console.log(obj)
  // const newBudget = await prisma.transaction.createMany({
  //   data: [
  //     {
  //       date: "2022-07-20T00:00:00.000Z",
  //       merchant: "Company",
  //       actual_amt: 5500,
  //       note: "July 2022 pay",
  //       user_id: "688a1c32-f7b5-4264-8dae-dd418ccbdb89",
  //       budget_id: "cb7f97c7-e424-457e-afe0-42795e3eaba0", 
  //     },
  //     {
  //       date: "2022-07-15T00:00:00.000Z",
  //       merchant: "SGX",
  //       actual_amt: 500,
  //       note: "IBM shares",
  //       user_id: "688a1c32-f7b5-4264-8dae-dd418ccbdb89",
  //       budget_id: "adfc1b32-29fd-4812-a8f8-2b203c867c0e", 
  //     },
  //     {
  //       date: "2022-07-01T00:00:00.000Z",
  //       merchant: "Grabfood",
  //       actual_amt: 20,
  //       note: "Lunch",
  //       user_id: "688a1c32-f7b5-4264-8dae-dd418ccbdb89",
  //       budget_id: "282735c7-b1a5-420a-a458-df204307094b", 
  //     },
  //     {
  //       date: "2022-07-01T00:00:00.000Z",
  //       merchant: "Grabfood",
  //       actual_amt: 50,
  //       note: "Dinner",
  //       user_id: "688a1c32-f7b5-4264-8dae-dd418ccbdb89",
  //       budget_id: "282735c7-b1a5-420a-a458-df204307094b", 
  //     },
  //     {
  //       date: "2022-07-02T00:00:00.000Z",
  //       merchant: "Happy hour",
  //       actual_amt: 100,
  //       note: "Lunch",
  //       user_id: "688a1c32-f7b5-4264-8dae-dd418ccbdb89",
  //       budget_id: "282735c7-b1a5-420a-a458-df204307094b", 
  //     },
  //   ],
  // });
  // console.log(newBudget)
  // const transactionInfo = await prisma.Transaction.findMany({
  //   where: {
  //     user_id: "688a1c32-f7b5-4264-8dae-dd418ccbdb89",
  //     budget_id: "a1f4ae03-ebb3-441a-9801-7f1ae5578763",
  //     date: {
  //       lte: "2022-07-31T00:00:00.000Z",
  //       gte: "2022-07-01T00:00:00.000Z",
  //     },
  //   },
  // });
  // console.log(transactionInfo);
  // const transactionInfo = await prisma.Transaction.findMany({
  //   where: {
  //     user_id: "688a1c32-f7b5-4264-8dae-dd418ccbdb89",
  //     budget_id: "a1f4ae03-ebb3-441a-9801-7f1ae5578763",
  //     date: {
  //       lte: "2022-06-30T00:00:00.000Z",
  //       gte: "2022-06-01T00:00:00.000Z",
  //     },
  //   },
  //   orderBy: [
  //     {
  //       date: "asc",
  //     },
  //     {
  //       merchant: "asc",
  //     },
  //   ],
  // });
  // console.log(transactionInfo);
  // const budgetExpense = await prisma.budget_Category.findMany({
  //   where: {
  //     user_id: id,
  //     date: date,
  //     type: "Expense",
  //   },
  //   select: {
  //     type: true,
  //     category: true,
  //     name: true,
  //     planned_amt: true,
  //     id: true,
  //   },
  //   orderBy: [
  //     {
  //       category: "asc",
  //     },
  //     {
  //       name: "asc",
  //     },
  //   ],
  // });
  // const budgetInfo = { income: budgetIncome, expense: budgetExpense };

  // get a list of unique budget in july
  const budgetIdList = await prisma.budget_Category.findMany({
    where: {
      date: "2022-07-01T00:00:00.000Z",
      user_id: "688a1c32-f7b5-4264-8dae-dd418ccbdb89"
    },
    select : {
      id: true,
      type: true,
      category: true,
      name: true,
      planned_amt: true,
      id: true,
    }
  
  });
  console.log(budgetIdList)

  const budgetIdTotal = await prisma.transaction.groupBy({
    by: ['budget_id'],
    _sum: {
      actual_amt: true,
    },
  })
  console.log(budgetIdTotal)
  // budgetIdList = [
  //   { id: '69954d1d-c57f-464d-a036-9178af13b029' },
  //   { id: 'b7b6de63-55cb-4b47-b035-b3feea4a65c6' },
  //   { id: 'be4f9fc8-1c44-41a5-b150-fc5f94b89de9' },
  //   { id: '1510e76c-536c-4dd8-bc35-ead53f10e335' },
  //   { id: '4a93b747-a1aa-4e34-b467-909e2f33acbe' },
  //   { id: '5868cbc4-66cf-4f4e-b785-a1a5ddccff7b' },
  //   { id: 'e4fbf48d-ad29-4225-880f-2477d1e177d4' },
  //   { id: '43f7cdd1-87d7-4837-a528-96cc3e54e774' },
  //   { id: 'f116cf87-30ff-4cd5-937a-8013c8f09cd4' }
  // ]

  // budgetIdTotal = [
  //   {
  //     _sum: { actual_amt: 230 },
  //     budget_id: 'be4f9fc8-1c44-41a5-b150-fc5f94b89de9'
  //   },
  //   {
  //     _sum: { actual_amt: 30 },
  //     budget_id: '1510e76c-536c-4dd8-bc35-ead53f10e335'
  //   },
  //   {
  //     _sum: { actual_amt: 100 },
  //     budget_id: '69954d1d-c57f-464d-a036-9178af13b029'
  //   },
  //   {
  //     _sum: { actual_amt: 20 },
  //     budget_id: '4a93b747-a1aa-4e34-b467-909e2f33acbe'
  //   },
  //   {
  //     _sum: { actual_amt: 220 },
  //     budget_id: 'e4fbf48d-ad29-4225-880f-2477d1e177d4'
  //   },
  //   {
  //     _sum: { actual_amt: 1586.57 },
  //     budget_id: 'f116cf87-30ff-4cd5-937a-8013c8f09cd4'
  //   },
  //   {
  //     _sum: { actual_amt: 5970 },
  //     budget_id: 'b7b6de63-55cb-4b47-b035-b3feea4a65c6'
  //   },
  //   {
  //     _sum: { actual_amt: 50 },
  //     budget_id: '5868cbc4-66cf-4f4e-b785-a1a5ddccff7b'
  //   },
  //   {
  //     _sum: { actual_amt: 90 },
  //     budget_id: '43f7cdd1-87d7-4837-a528-96cc3e54e774'
  //   }
  // ]
  for (let i = 0; i < budgetIdList.length; i++) {
    for (let j = 0; j < budgetIdTotal.length; j++) {
      if (budgetIdList[i].id === budgetIdTotal[j].budget_id) {
          budgetIdList[i].actual_amt = budgetIdTotal[j]._sum.actual_amt
      }
    }
  }
  console.log(budgetIdList)
}

main()
  .catch((e) => {
    console.error(e.message);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
