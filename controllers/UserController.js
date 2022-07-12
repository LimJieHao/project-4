// Import
const router = require("express").Router();
const prisma = require("../server");
const jwt = require("jsonwebtoken");
const cookieJwtAuth = require("../middleware/cookieJwtAuth");

// Import bcrypt
const bcrypt = require("bcrypt");
const saltRounds = bcrypt.genSaltSync(10);

// Create
// sign up
router.post("/signup", async (req, res) => {
  try {
    const user = await prisma.User.create({
      include: {
        inc_exp_budget: true,
      },
      data: {
        email: req.body.email,
        password: await bcrypt.hash(req.body.password, saltRounds),
        inc_exp_budget: {
          create: [
            {
              description: "Paycheck 1",
              planned_amt: 0.0,
              actual_amt: 0.0,
              inc_exp_id: "1",
            },
            {
              description: "Paycheck 2",
              planned_amt: 0.0,
              actual_amt: 0.0,
              inc_exp_id: "1",
            },
            {
              description: "Electricity",
              planned_amt: 0.0,
              actual_amt: 0.0,
              inc_exp_id: "2",
            },
            {
              description: "Water",
              planned_amt: 0.0,
              actual_amt: 0.0,
              inc_exp_id: "2",
            },
            {
              description: "Internet",
              planned_amt: 0.0,
              actual_amt: 0.0,
              inc_exp_id: "2",
            },
            {
              description: "Netflix",
              planned_amt: 0.0,
              actual_amt: 0.0,
              inc_exp_id: "3",
            },
            {
              description: "Disney Plus",
              planned_amt: 0.0,
              actual_amt: 0.0,
              inc_exp_id: "3",
            },
            {
              description: "Food",
              planned_amt: 0.0,
              actual_amt: 0.0,
              inc_exp_id: "4",
            },
            {
              description: "Groceries",
              planned_amt: 0.0,
              actual_amt: 0.0,
              inc_exp_id: "4",
            },
            {
              description: "Credit Card",
              planned_amt: 0.0,
              actual_amt: 0.0,
              inc_exp_id: "5",
            },
          ],
        },
      },
    });
    const token = jwt.sign(user, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });
    res.cookie("token", token, {
      httpOnly: true,
    });
    res.json(token);
  } catch (error) {
    res.send({ status: "fail", data: "error" });
  }
});

// login
router.post("/login", async (req, res) => {
  try {
    const checkUser = await prisma.User.findUnique({
      where: {
        email: req.body.email,
      },
    });
    if (checkUser === null) {
      res.send({ status: "fail", data: "No user found" });
    } else {
      if (bcrypt.compareSync(req.body.password, checkUser.password)) {
        const token = jwt.sign(checkUser, process.env.SECRET_KEY, {
          expiresIn: "1h",
        });
        res.cookie("token", token, {
          httpOnly: true,
        });
        res.json(token);
      } else {
        res.send({ status: "fail", data: "Incorrect password." });
      }
    }
  } catch (error) {
    res.send({ status: "fail", data: "error" });
  }
});

// Read
// log out
router.get("/logout", cookieJwtAuth, async (req, res) => {
  try {
    res.clearCookie("token");
    res.json({ status: "Successfully logged out." });
  } catch (error) {
    res.json({ status: "fail", data: "error" });
  }
});

// Retrieve one user, might not need this due to jotai
// router.get("/read/:id", cookieJwtAuth, async (req, res) => {
//   const { id } = req.params;
//   try {
//     const userInfo = await prisma.User.findUnique({
//       where: {
//         id: id,
//       },
//     });
//     res.send(userInfo);
//   } catch (error) {
//     res.send({ status: "fail", data: "error" });
//   }
// });

// Update
router.put("/settings/:id", cookieJwtAuth, async (req, res) => {
  try {
    const updateUser = await prisma.User.update({
      where: {
        id: id,
      },
      data: {
        email: req.body.email,
        password: await bcrypt.hash(req.body.password, saltRounds),
      },
    });
    res.send(updateUser);
  } catch (error) {
    res.send({ status: "fail", data: "error" });
  }
});

// Delete
router.delete("/settings/:id", cookieJwtAuth, async (req, res) => {
  const { id } = req.params;
  try {
    const deleteUser = prisma.User.delete({
      where: {
        id: id,
      },
    });
    const deleteBudget = prisma.Inc_Exp_Budget.deleteMany({
      where: {
        user_id: id,
      },
    });
    const deletePosition = prisma.Asset_Liab_Position.deleteMany({
      where: {
        user_id: id,
      },
    });
    const transaction = await prisma.$transaction([
      deletePosition,
      deleteBudget,
      deleteUser,
    ]);
    res.clearCookie("token");
    res.send({ status: "Successfully deleted user." });
  } catch (error) {
    res.send({ status: "fail", data: "error" });
  }
});

module.exports = router;
