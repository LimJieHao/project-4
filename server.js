// Prisma
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
module.exports = prisma

// Other set up
require('dotenv').config()
const path = require("path");

// Express
const express = require("express");
const app = express();
const PORT = process.env.PORT ?? 2500

// middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static("./frontend/dist"))
const budgetController  = require("./controllers/budget")
const categoryController  = require("./controllers/category")
const positionController  = require("./controllers/position")
const usersController = require("./controllers/users");
app.use("/api/budget", budgetController);
app.use("/api/category", categoryController)
app.use("/api/position", positionController)
app.use("/api/users", usersController)

app.get("/api/", (req, res) => {
    res.send("API is working");
})

app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "./frontend/dist/index.html"));
  });

app.listen(PORT, () => {
    console.log(`server is running on port: ${PORT}`);
})