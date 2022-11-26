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
const User = require("../models/login.model");
const RefreshToken = require("../models/refreshToken.model");
const bodyParser = require("body-parser");
require("dotenv/config");
const { verifyAccessToken, createAccessToken, createRefreshToken, } = require("../authorization");
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));
router.post("/", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    //  const refreshTokens = await new RefreshToken({
    //    owner: user.id,
    // });
    try {
        const user = yield new User({
            password: req.body.password,
            username: req.body.username,
        });
        const saveData = yield user.save();
        const refreshTokens = yield new RefreshToken({
            owner: user.id,
        });
        const RefreshTokens = createRefreshToken(user.id, refreshTokens.id);
        next();
        user.refreshToken = RefreshTokens;
        user.save();
        return res.json(saveData);
    }
    catch (error) {
        return res.send("err");
    }
}));
module.exports = router;
