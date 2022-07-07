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


// const vendorController = require("./controllers/vendorController");
// const userProfile_Controller = require("./controllers/userProfile_Controller")

// middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static("./frontend/dist"))
// app.use("/api/vendors", vendorController);
// app.use("/api/user", require("./controllers/user_Controller"))

app.get("/api/", (req, res) => {
    res.send("API is working");
})

app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "./frontend/dist/index.html"));
  });

app.listen(PORT, () => {
    console.log(`server is running on port: ${PORT}`);
})