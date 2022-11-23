import { Request, Response } from "express";
const express = require("express");
const router = express.Router();
const User = require("../models/login.model");
const RefreshToken = require("../models/refreshToken.model");
const bodyParser = require("body-parser");
require("dotenv/config");
const {
  verifyAccessToken,
  createAccessToken,
  createRefreshToken,
} = require("../authorization");

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

router.post("/", async (req: Request, res: Response) => {
  try {
    const user = await User.findOne({
      password: req.body.password,
      username: req.body.username,
    });
    const refreshTokens = await new RefreshToken({
      owner: user.id,
    });

    if (user == null) {
      return res.status(401).send("invalid user");
    } else {
      createAccessToken(user.id);
      createRefreshToken(user.id, refreshTokens.id);
      return res.status(200).send("tokens created");
    }
  } catch (err) {
    console.log({ err });
    return res.status(500).send({ err });
  }
});

router.post("/post", verifyAccessToken, async (req: Request, res: Response) => {
  try {
    return res.send("post");
  } catch (err) {
    return res.send({ err });
  }
});

module.exports = router;
