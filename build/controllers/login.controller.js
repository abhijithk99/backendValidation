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
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User.findOne({
            password: req.body.password,
            username: req.body.username,
        });
        const refreshTokens = yield new RefreshToken({
            owner: user.id,
        });
        if (user == null) {
            return res.status(401).send("invalid user");
        }
        else {
            createAccessToken(user.id);
            createRefreshToken(user.id, refreshTokens.id);
            return res.status(200).send("tokens created");
        }
    }
    catch (err) {
        console.log({ err });
        return res.status(500).send({ err });
    }
}));
router.post("/post", verifyAccessToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return res.send("post");
    }
    catch (err) {
        return res.send({ err });
    }
}));
module.exports = router;
