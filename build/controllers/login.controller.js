"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const { user } = require("../services/login.service");
//const {authorization} = require("../middlewares/authorization")
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const login = yield user.loginUser(req.body.username, req.body.password);
    console.log("blabla");
    return res
        .status(login.status)
        .json({ message: login.message, data: login.data });
}));
router.post("/refresh", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const refresh = yield user.refresh(req.body.refreshToken);
    return res
        .status(refresh.status)
        .json({ message: refresh.message, data: refresh.data });
}));
router.post("/logout", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const logout = yield user.logout(req.body.refreshToken);
    return res
        .status(logout.status)
        .json({ message: logout.message, data: logout.data });
}));
module.exports = router;
