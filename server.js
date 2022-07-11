// Prisma
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
module.exports = prisma

// Other set up
require('dotenv').config()
const path = require("path");
const cookieParser = require("cookie-parser")

// Express
const express = require("express");
const app = express();
const PORT = process.env.PORT ?? 2500

// Controllers
const budgetController  = require("./controllers/BudgetController")
const categoryController  = require("./controllers/CategoryController")
const positionController  = require("./controllers/PositionController")
const userController = require("./controllers/UserController");

// middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static("./frontend/dist"))
app.use(cookieParser());

// Controllers
app.use("/api/budget", budgetController);
app.use("/api/category", categoryController)
app.use("/api/position", positionController)
app.use("/api/user", userController)

app.get("/api/", (req, res) => {
    res.send("API is working");
})

app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "./frontend/dist/index.html"));
  });

app.listen(PORT, () => {
    console.log(`server is running on port: ${PORT}`);
})