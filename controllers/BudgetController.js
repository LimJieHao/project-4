// Import
const router = require("express").Router();
const prisma = require("../server");
const cookieJwtAuth = require("../middleware/cookieJwtAuth");

// Create
router.post("/addbudcat/:id/:date", cookieJwtAuth, async (req, res) => {
  const { id } = req.params;
  const { date } = req.params;
  try {
    const newBudget = await prisma.Budget_Category.create({
      data: {
        user_id: id,
        date: date,
        type: req.body.type,
        category: req.body.category,
        name: req.body.name,
        planned_amt: req.body.planned_amt,
      },
    });
    res.send(newBudget);
  } catch (error) {
    res.send({ status: "fail", data: "error" });
  }
});

router.post("/populate/:id/:date", cookieJwtAuth, async (req, res) => {
  const { id } = req.params;
  const { date } = req.params;
  try {
    const newBudget = await prisma.Budget_Category.createMany({
      data: [
        {
          user_id: id,
          date: date,
          type: "Income",
          category: "Salary",
          name: "Paycheck",
          planned_amt: 0.0,
        },
        {
          user_id: id,
          date: date,
          type: "Income",
          category: "Investment",
          name: "Dividend",
          planned_amt: 0.0,
        },
        {
          user_id: id,
          date: date,
          type: "Expense",
          category: "Bills",
          name: "Electricity",
          planned_amt: 0.0,
        },
        {
          user_id: id,
          date: date,
          type: "Expense",
          category: "Bills",
          name: "Water",
          planned_amt: 0.0,
        },
        {
          user_id: id,
          date: date,
          type: "Expense",
          category: "Bills",
          name: "Internet",
          planned_amt: 0.0,
        },
        {
          user_id: id,
          date: date,
          type: "Expense",
          category: "Subscriptions",
          name: "Online",
          planned_amt: 0.0,
        },
        {
          user_id: id,
          date: date,
          type: "Expense",
          category: "Spending",
          name: "Food",
          planned_amt: 0.0,
        },
        {
          user_id: id,
          date: date,
          type: "Expense",
          category: "Spending",
          name: "Groceries",
          planned_amt: 0.0,
        },
        {
          user_id: id,
          date: date,
          type: "Expense",
          category: "Debt",
          name: "Credit Card",
          planned_amt: 0.0,
        },
      ],
    });
  } catch (error) {
    res.send({ status: "fail", data: "error" });
  }
  try {
    const budgetIncome = await prisma.budget_Category.findMany({
      where: {
        user_id: id,
        date: date,
        type: "Income",
      },
      select: {
        type: true,
        category: true,
        name: true,
        planned_amt: true,
        id: true,
      },
      orderBy: [
        {
          category: "asc",
        },
        {
          name: "asc",
        },
      ],
    });
    const budgetExpense = await prisma.budget_Category.findMany({
      where: {
        user_id: id,
        date: date,
        type: "Expense",
      },
      select: {
        type: true,
        category: true,
        name: true,
        planned_amt: true,
        id: true,
      },
      orderBy: [
        {
          category: "asc",
        },
        {
          name: "asc",
        },
      ],
    });
    const budgetInfo = { income: budgetIncome, expense: budgetExpense };
    res.send(budgetInfo);
  } catch (error) {
    res.send({ status: "fail", data: "error" });
  }
});

// Read
router.get("/:id/:date", cookieJwtAuth, async (req, res) => {
  const { id } = req.params;
  const { date } = req.params;
  try {
    const budgetIncome = await prisma.budget_Category.findMany({
      where: {
        user_id: id,
        date: date,
        type: "Income",
      },
      select: {
        type: true,
        category: true,
        name: true,
        planned_amt: true,
        id: true,
      },
    });
    const budgetExpense = await prisma.budget_Category.findMany({
      where: {
        user_id: id,
        date: date,
        type: "Expense",
      },
      select: {
        type: true,
        category: true,
        name: true,
        planned_amt: true,
        id: true,
      },
    });

    const budgetIdTotal = await prisma.transaction.groupBy({
      by: ["budget_id"],
      _sum: {
        actual_amt: true,
      },
    });

    for (let i = 0; i < budgetIncome.length; i++) {
      for (let j = 0; j < budgetIdTotal.length; j++) {
        if (budgetIncome[i].id === budgetIdTotal[j].budget_id) {
          budgetIncome[i].actual_amt = budgetIdTotal[j]._sum.actual_amt;
        }
      }
    }

    for (let i = 0; i < budgetExpense.length; i++) {
      for (let j = 0; j < budgetIdTotal.length; j++) {
        if (budgetExpense[i].id === budgetIdTotal[j].budget_id) {
          budgetExpense[i].actual_amt = budgetIdTotal[j]._sum.actual_amt;
        }
      }
    }
    let totalPlannedIncome = budgetIncome.reduce((accumulator, Object) => {
      return accumulator + Object.planned_amt;
    }, 0);
    totalPlannedIncome === null ? totalPlannedIncome = 0 : null
    let totalActualIncome = budgetIncome.reduce((accumulator, Object) => {
      return accumulator + Object.actual_amt;
    }, 0);
    totalActualIncome === null ? totalActualIncome = 0 : null
    let totalPlannedExpense = budgetExpense.reduce((accumulator, Object) => {
      return accumulator + Object.planned_amt;
    }, 0);
    totalPlannedExpense === null ? totalPlannedExpense = 0 : null
    let totalActualExpense = budgetExpense.reduce((accumulator, Object) => {
      return accumulator + Object.actual_amt;
    }, 0);
    totalActualExpense === null ? totalActualExpense = 0 : null
    let remainPlanned= totalPlannedIncome - totalPlannedExpense
    let remainActual = totalActualIncome - totalActualExpense
    const totalAmt = [
      {
        type: "Income",
        planned_amt: totalPlannedIncome,
        actual_amt: totalActualIncome,
      },
      { type: "Expense", planned_amt: totalPlannedExpense, actual_amt: totalActualExpense },
      { type: "Remaining", planned_amt: remainPlanned, actual_amt: remainActual}
    ];
    const budgetInfo = {
      income: budgetIncome,
      expense: budgetExpense,
      total: totalAmt,
    };
    res.send(budgetInfo);
  } catch (error) {
    console.log(error);
    res.send({ status: "fail", data: "error" });
  }
});

// Update
router.put("/updatebud/:id", cookieJwtAuth, async (req, res) => {
  const { id } = req.params;
  try {
    const updateBudget = await prisma.Budget_Category.update({
      where: {
        id: id,
      },
      data: {
        type: req.body.type,
        category: req.body.category,
        name: req.body.name,
        planned_amt: req.body.planned_amt,
      },
    });
    res.send(updateBudget);
  } catch (error) {
    res.send({ status: "fail", data: "error" });
  }
});

// Delete
router.delete("/removebud/:id", cookieJwtAuth, async (req, res) => {
  const { id } = req.params;
  try {
    const deleteBudget = await prisma.Budget_Category.delete({
      where: {
        id: id,
      },
    });
    res.send({ status: "Successfully deleted Budget." });
  } catch (error) {
    console.log(error);
    res.send({ status: "fail", data: "error" });
  }
});

router.delete(
  "/removebudbyuser/:id/:startmth/:endmth/",
  cookieJwtAuth,
  async (req, res) => {
    const { id } = req.params;
    const { startmth } = req.params;
    const { endmth } = req.params;
    try {
      const deleteBudget = await prisma.Budget_Category.deleteMany({
        where: {
          user_id: id,
          date: {
            lte: endmth,
            gte: startmth,
          },
        },
      });
      res.send({ status: "Successfully deleted Budget." });
    } catch (error) {
      console.log(error);
      res.send({ status: "fail", data: "error" });
    }
  }
);

module.exports = router;
