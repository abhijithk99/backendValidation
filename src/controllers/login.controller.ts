import { Request, Response } from "express";
const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const { user } = require("../services/login.service");
//const {authorization} = require("../middlewares/authorization")

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

router.post("/", async (req: Request, res: Response) => {
  const login = await user.loginUser(req.body.username, req.body.password);
  return res
    .status(login.status)
    .json({ message: login.message, data: login.data });
});

router.post("/refresh", async (req: Request, res: Response) => {
  const refresh = await user.refresh(req.body.refreshToken);
  return res
    .status(refresh.status)
    .json({ message: refresh.message, data: refresh.data });
});

router.post("/logout", async (req: Request, res: Response) => {
  const logout = await user.logout(req.body.refreshToken);
  return res
    .status(logout.status)
    .json({ message: logout.message, data: logout.data });
});

module.exports = router;
