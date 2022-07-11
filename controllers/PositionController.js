// Import
const router = require("express").Router();
const prisma = require("../server");
const cookieJwtAuth = require("../middleware/cookieJwtAuth");

// Create
router.post("/addpos/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const newPosition = await prisma.Asset_Liab_Position.create({
      data: {
        month: req.body.month,
        balance: req.body.balance,
        quantity: req.body.quantity,
        interest_rate: req.body.interest_rate,
        merchant: req.body.merchant,
        description: req.body.description,
        note: req.body.note,
        user_id: "06050c2c-abd9-4f5f-ada5-bb9f27a56019", //To amend
        inc_exp_id: "1", // To amend
      },
    });
    res.send(newPosition);
  } catch (error) {
    res.send({ status: "fail", data: "error" });
  }
});

// Read
router.get("/", async (req, res) => {
  try {
    const positionInfo = await prisma.Asset_Liab_Position.findMany();
    res.send(positionInfo);
  } catch (error) {
    res.send({ status: "fail", data: "error" });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const positionInfo = await prisma.Asset_Liab_Position.findUnique({
      where: {
        id: id,
      },
    });
    res.send(positionInfo);
  } catch (error) {
    res.send({ status: "fail", data: "error" });
  }
});

// Update
router.put("/updatepos/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const updatePosition = await prisma.Asset_Liab_Position.update({
      where: {
        id: id,
      },
      data: {
        month: req.body.month,
        balance: req.body.balance,
        quantity: req.body.quantity,
        interest_rate: req.body.interest_rate,
        merchant: req.body.merchant,
        description: req.body.description,
        note: req.body.note,
      },
    });
    res.send(updatePosition);
  } catch (error) {
    res.send({ status: "fail", data: "error" });
  }
});

// Delete
router.delete("/removepos/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletePosition = await prisma.Asset_Liab_Position.delete({
      where: {
        id: id,
      },
    });
    res.send({ status: "Successfully deleted position." });
  } catch (error) {
    res.send({ status: "fail", data: "error" });
  }
});

module.exports = router;
