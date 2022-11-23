import { Request, Response } from "express";
const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv/config");

//routes
const loginRoute = require("./controllers/login.controller");
app.use("/login", loginRoute);

app.get("/", (req: Request, res: Response) => {
  res.send("log in..");
});

// connect db
mongoose.connect(
  process.env.DB_CONNECT,
  { useNewUrlParser: true },
  (err: Error, res: Response) => {
    if (err) {
      console.log({ err });
    }
    console.log("database connected......");
    return;
  }
);

//port
app.listen(3001, () => {
  console.log("listening.....");
});
