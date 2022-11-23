"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv/config");
//routes
const loginRoute = require("./controllers/login.controller");
app.use("/login", loginRoute);
app.get("/", (req, res) => {
    res.send("log in..");
});
// connect db
mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true }, (err, res) => {
    if (err) {
        console.log({ err });
    }
    console.log("database connected......");
    return;
});
//port
app.listen(3001, () => {
    console.log("listening.....");
});
