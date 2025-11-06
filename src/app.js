require("dotenv").config();
const express = require("express");
const app = express();

app.use(express.json());

const authRoutes = require("./routes/auth.routes");
const itemRoutes = require("./routes/item.routes");

app.use("/auth", authRoutes);
app.use("/items", itemRoutes);

module.exports = app;
