"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv/config");
const loginRoute = require("./controllers/login.controller");
//const post = require("./controllers/profile.controller");
app.use("/user", loginRoute);
//app.use("/post", post);
app.get("/", (req, res) => {
    res.send("log in..");
});
mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true }, (err, res) => {
    if (err) {
        console.log({ err });
    }
    console.log("database connected......");
    return;
});
app.listen(3001, () => {
    console.log("listening.....");
});
