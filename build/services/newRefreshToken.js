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
const RefreshToken = require("../models/refreshToken.model");
const User = require("../models/login.model");
const bodyParser = require("body-parser");
require("dotenv/config");
const jwt = require("jsonwebtoken");
const { createRefreshToken } = require("../authorization");
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const refreshToken = yield User.findOne({
        refreshToken: req.body.refreshToken,
    });
    try {
        if (refreshToken == null || refreshToken == undefined) {
            return res.status(401).send("invalid token");
        }
        const data = refreshToken.refreshToken;
        jwt.verify(data, process.env.REFRESH_TOKEN_SECRET, (error, response) => __awaiter(void 0, void 0, void 0, function* () {
            if (error)
                return res.send("not verefied");
            const refreshTokens = yield new RefreshToken({
                owner: refreshToken.id,
            });
            const newRefreshToken = createRefreshToken(refreshToken.id, refreshTokens.id);
            return res.status(200).json(newRefreshToken);
        }));
    }
    catch (err) { }
}));
module.exports = router;
