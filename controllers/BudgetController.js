// Import
const router = require("express").Router();
const prisma = require("../server");
const cookieJwtAuth = require("../middleware/cookieJwtAuth");

// Create
router.post("/addbudcat/", cookieJwtAuth, async (req, res) => {
  try {
    const newBudget = await prisma.Budget_Category.create({
      data: {
        date: req.body.date,
        type: req.body.type,
        category: req.body.category,
        planned_amt: req.body.planned_amt,
        name: req.body.name,
      },
    });
    res.send(newBudget);
  } catch (error) {
    res.send({ status: "fail", data: "error" });
  }
});

router.post("/populate/:id/:date", async (req, res) => {
  const { id } = req.params;
  const { date } = req.params;
  try {
    const newBudget = await prisma.Budget_Category.createMany({
      data: [
        {
          user_id: id,
          date: date,
          type: "Income",
          category: "Income",
          name: "Paycheck 1",
          planned_amt: 0.0,
        },
        // {
        //   user_id: id,
        //   date: date,
        //   type: "Income",
        //   category: "Income",
        //   name: "Paycheck 2",
        //   planned_amt: 0.0,
        // },
        // {
        //   user_id: id,
        //   date: date,
        //   type: "Expense",
        //   category: "Bills",
        //   name: "Electricity",
        //   planned_amt: 0.0,
        // },
        // {
        //   user_id: id,
        //   date: date,
        //   type: "Expense",
        //   category: "Bills",
        //   name: "Water",
        //   planned_amt: 0.0,
        // },
        // {
        //   user_id: id,
        //   date: date,
        //   type: "Expense",
        //   category: "Bills",
        //   name: "Internet",
        //   planned_amt: 0.0,
        // },
        // {
        //   user_id: id,
        //   date: date,
        //   type: "Expense",
        //   category: "Subscriptions",
        //   name: "Netflix",
        //   planned_amt: 0.0,
        // },
        // {
        //   user_id: id,
        //   date: date,
        //   type: "Expense",
        //   category: "Subscriptions",
        //   name: "Disney Plus",
        //   planned_amt: 0.0,
        // },
        // {
        //   user_id: id,
        //   date: date,
        //   type: "Expense",
        //   category: "Spending",
        //   name: "Food",
        //   planned_amt: 0.0,
        // },
        // {
        //   user_id: id,
        //   date: date,
        //   type: "Expense",
        //   category: "Spending",
        //   name: "Groceries",
        //   planned_amt: 0.0,
        // },
        // {
        //   user_id: id,
        //   date: date,
        //   type: "Expense",
        //   category: "Debt",
        //   name: "Credit Card",
        //   planned_amt: 0.0,
        // },
      ],
    });
    try {
      const budgetInfo = await prisma.Budget_Category.findMany({
        where: {
          user_id: id,
          date: date,
        },
        orderBy: [
          {
            type: "desc",
          },
          {
            category: "asc",
          },
          {
            name: "asc",
          },
        ],
      });
      res.send(budgetInfo);
    } catch (error) {
      res.send({ status: "fail", data: "error" });
    }
  } catch (error) {
    res.send({ status: "fail", data: "error" });
  }
});

// Read
router.get("/", cookieJwtAuth, async (req, res) => {
  try {
    const budgetInfo = await prisma.Budget_Category.findMany({});
    res.send(budgetInfo);
  } catch (error) {
    res.send({ status: "fail", data: "error" });
  }
});

router.get("/:id/:date", async (req, res) => {
  const { id } = req.params;
  const { date } = req.params;
  try {
    const budgetInfo = await prisma.Budget_Category.findMany({
      where: {
        user_id: id,
        date: date,
      },
      orderBy: [
        {
          type: "desc",
        },
        {
          category: "asc",
        },
        {
          name: "asc",
        },
      ],
    });
    res.send(budgetInfo);
  } catch (error) {
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
    res.send({ status: "fail", data: "error" });
  }
});

module.exports = router;
