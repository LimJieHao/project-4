// Import
const router = require("express").Router();
const prisma = require("../server");
const cookieJwtAuth = require("../middleware/cookieJwtAuth");

// Create
router.post("/addbud/:id", cookieJwtAuth, async (req, res) => {
  const { id } = req.params;
  try {
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
        user_id: "06050c2c-abd9-4f5f-ada5-bb9f27a56019", // To amend
        inc_exp_id: "1", // To amend
      },
    });
    res.send(newBudget)
  } catch (error) {
    res.send({ status: "fail", data: "error" });
  }
});

// Read
router.get("/", cookieJwtAuth, async (req, res) => {
  try {
    const budgetInfo = await prisma.Inc_Exp_Budget.findMany();
    res.send(budgetInfo);
  } catch (error) {
    res.send({ status: "fail", data: "error" });
  }
});

router.get("/:id", cookieJwtAuth, async (req, res) => {
  const { id } = req.params;
  try {
    const budgetInfo = await prisma.Inc_Exp_Budget.findUnique({
      where: {
        id: id,
      },
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
    const updateBudget = await prisma.Inc_Exp_Budget.update({
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
      const deleteBudget = await prisma.Inc_Exp_Budget.delete({
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
