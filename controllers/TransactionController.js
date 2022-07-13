// Import
const router = require("express").Router();
const prisma = require("../server");
const cookieJwtAuth = require("../middleware/cookieJwtAuth");

// Create
router.post("/addcat", cookieJwtAuth, async (req, res) => {
  try {
    const newCategory = await prisma.Transaction.create({
      data: {
        type: req.body.type,
        name: req.body.name,
      },
    });
    res.send(newCategory);
  } catch (error) {
    res.send({ status: "fail", data: "error" });
  }
});

// Read
router.get("/", cookieJwtAuth, async (req, res) => {
  try {
    const categoryInfo = await prisma.Transaction.findMany();
    res.send(categoryInfo);
  } catch (error) {
    res.send({ status: "fail", data: "error" });
  }
});

router.get("/:id", cookieJwtAuth, async (req, res) => {
  const { id } = req.params;
  try {
    const categoryInfo = await prisma.Transaction.findUnique({
      where: {
        id: id,
      },
    });
    res.send(categoryInfo);
  } catch (error) {
    res.send({ status: "fail", data: "error" });
  }
});

// Update
router.put("/updatecat/:id", cookieJwtAuth, async (req, res) => {
  const { id } = req.params;
  try {
    const updateCategory = await prisma.Transaction.update({
      where: {
        id: id,
      },
      data: {
        type: req.body.type,
        name: req.body.name,
      },
    });
    res.send(updateCategory);
  } catch (error) {
    res.send({ status: "fail", data: "error" });
  }
});

// Delete
router.delete("/removecat/:id", cookieJwtAuth, async (req, res) => {
  const { id } = req.params;
  try {
    const deleteCategory = await prisma.Transaction.delete({
      where: {
        id: id,
      },
    });
    res.send({ status: "Successfully deleted category." });
  } catch (error) {
    res.send({ status: "fail", data: "error" });
  }
});

module.exports = router;
