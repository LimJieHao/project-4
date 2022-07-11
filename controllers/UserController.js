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
    const user = await prisma.user.create({
      data: {
        email: req.body.email,
        password: await bcrypt.hash(req.body.password, saltRounds),
      },
    });
    const token = jwt.sign(user, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });
    res.cookie("token", token, {
      httpOnly: true,
    });
    res.send(user);
  } catch (error) {
    res.send({ status: "fail", data: "error" });
  }
});

// login
router.post("/login", async (req, res) => {
  try {
    const checkUser = await prisma.user.findUnique({
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
        res.send(token);
      } else {
        res.send({ status: "fail", data: "Incorrect password." });
      }
    }
  } catch (error) {
    res.send({ status: "fail", data: "error" });
  }
});

// Read
// Retrieve one user
router.get("/:id", cookieJwtAuth, async (req, res) => {
  const { id } = req.params;
  try {
    const userInfo = await prisma.user.findUnique({
      where: {
        id: id,
      },
    });
    res.send(userInfo);
  } catch (error) {
    res.send({ status: "fail", data: "error" });
  }
});

// log out
router.get("/logout", cookieJwtAuth, async (req, res) => {
  try {
    res.clearCookie("token");
    res.send({ status: "Successfully logged out." });
  } catch (error) {
    res.send({ status: "fail", data: "error" });
  }
});

// Update
router.put("/settings/:id", cookieJwtAuth, async (req, res) => {
  const { id } = req.params;
  try {
    const updateUser = await prisma.user.update({
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
    const deleteUser = await prisma.user.delete({
      where: {
        id: id,
      }
    });
    res.clearCookie("token");
    res.send({ status: "Successfully deleted user." });
  } catch (error) {
    res.send({ status: "fail", data: "error" });
  }
});

module.exports = router;
