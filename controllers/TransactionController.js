// Import
const router = require("express").Router();
const prisma = require("../server");
const cookieJwtAuth = require("../middleware/cookieJwtAuth");

// Create
router.post("/addtrans/", cookieJwtAuth, async (req, res) => {
  try {
    const newTransaction = await prisma.Transaction.create({
      data: {
        date: req.body.date,
        merchant: req.body.merchant,
        actual_amt: req.body.actual_amt,
        note: req.body.note
      },
    });
    res.send(newTransaction);
  } catch (error) {
    res.send({ status: "fail", data: "error" });
  }
});

// Read
router.get("/read/:userid/:startmth/:endmonth/:type", cookieJwtAuth, async (req, res) => {
  const { userid } = req.params;
  const { startmth } = req.params;
  const { endmth } = req.params;
  const { type } = req.params;
  try {
    const transactionInfo = await prisma.Transaction.findMany({
      where: {
        user_id: userid,
        budget_id: type,
        date: {
          lte: endmth,
          gte: startmth,
        },
      },
      orderBy: [
        {
          date: "asc",
        },
        {
          merchant: "asc",
        },
      ],
    });
    res.send(transactionInfo);
  } catch (error) {
    res.send({ status: "fail", data: "error" });
  }
});

router.get("/:userid/:startmth/:endmth/", cookieJwtAuth, async (req, res) => {
  const { userid } = req.params;
  const { startmth } = req.params;
  const { endmth } = req.params;
  try {
    const transactionInfo = await prisma.Transaction.findMany({
      where: {
        user_id: userid,
        date: {
          lte: endmth,
          gte: startmth,
        },
      },
      orderBy: [
        {
          date: "asc",
        },
        {
          merchant: "asc",
        },
      ],
    });
    res.send(transactionInfo);
  } catch (error) {
    res.send({ status: "fail", data: "error" });
  }
});

// Update
router.put("/updatetrans/:transid", cookieJwtAuth, async (req, res) => {
  const { transid } = req.params;
  try {
    const updateTransaction = await prisma.Transaction.update({
      where: {
        id: transid,
      },
      data: {
        date: req.body.date,
        merchant: req.body.merchant,
        actual_amt: req.body.actual_amt,
        note: req.body.note
      },
    });
    res.send(updateTransaction);
  } catch (error) {
    res.send({ status: "fail", data: "error" });
  }
});

// Delete
router.delete("/removetrans/:transid", cookieJwtAuth, async (req, res) => {
  const { transid } = req.params;
  try {
    const deleteCategory = await prisma.Transaction.delete({
      where: {
        id: transid,
      },
    });
    res.send({ status: "Successfully deleted category." });
  } catch (error) {
    res.send({ status: "fail", data: "error" });
  }
});

module.exports = router;
