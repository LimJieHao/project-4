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
    console.log(error)
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
    const budgetInfo = { income: budgetIncome, expense: budgetExpense, total: []};
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
    const budgetInfo = { income: budgetIncome, expense: budgetExpense };
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
    console.log(error)
    res.send({ status: "fail", data: "error" });
  }
});

router.delete("/removebudbyuser/:id/:startmth/:endmth/", cookieJwtAuth, async (req, res) => {
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
    console.log(error)
    res.send({ status: "fail", data: "error" });
  }
});

module.exports = router;
