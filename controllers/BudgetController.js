// Import
const router = require("express").Router();
const prisma = require("../server");
const cookieJwtAuth = require("../middleware/cookieJwtAuth");

// Create
router.post("/addbud/:id", cookieJwtAuth, async (req, res) => {
  const { id } = req.params;
  try {
    const newBudget = await prisma.Budget_Category.create({
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
        user_id: "06050c2c-abd9-4f5f-ada5-bb9f27a56019", // To amend
        inc_exp_id: "1", // To amend
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
          description: "Paycheck 1",
          planned_amt: 0.00,
          actual_amt: 0.00,
          inc_exp_id: "1",
        },
        {
          user_id: id,
          date: date,
          description: "Paycheck 2",
          planned_amt: 0.00,
          actual_amt: 0.00,
          inc_exp_id: "1",
        },
        {
          user_id: id,
          date: date,
          description: "Electricity",
          planned_amt: 0.00,
          actual_amt: 0.00,
          inc_exp_id: "2",
        },
        {
          user_id: id,
          date: date,
          description: "Water",
          planned_amt: 0.00,
          actual_amt: 0.00,
          inc_exp_id: "2",
        },
        {
          user_id: id,
          date: date,
          description: "Internet",
          planned_amt: 0.00,
          actual_amt: 0.00,
          inc_exp_id: "2",
        },
        {
          user_id: id,
          date: date,
          description: "Netflix",
          planned_amt: 0.00,
          actual_amt: 0.00,
          inc_exp_id: "3",
        },
        {
          user_id: id,
          date: date,
          description: "Disney Plus",
          planned_amt: 0.00,
          actual_amt: 0.00,
          inc_exp_id: "3",
        },
        {
          user_id: id,
          date: date,
          description: "Food",
          planned_amt: 0.00,
          actual_amt: 0.00,
          inc_exp_id: "4",
        },
        {
          user_id: id,
          date: date,
          description: "Groceries",
          planned_amt: 0.00,
          actual_amt: 0.00,
          inc_exp_id: "4",
        },
        {
          user_id: id,
          date: date,
          description: "Credit Card",
          planned_amt: 0.00,
          actual_amt: 0.00,
          inc_exp_id: "5",
        },
      ],
    });
    res.send(newBudget);
  } catch (error) {
    console.log(error)
    res.send({ status: "fail", data: "error" });
  }
});

// Read
router.get("/", cookieJwtAuth, async (req, res) => {
  try {
    const budgetInfo = await prisma.Budget_Category.findMany();
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
        date: date
      },
      include: {
        inc_exp_category: {},
      },
      orderBy: [
        {
          inc_exp_category: {
            type: "desc",
          },
        },
        {
          inc_exp_category: {
            category: "asc",
          },
        },
        {
          description: "asc",
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
