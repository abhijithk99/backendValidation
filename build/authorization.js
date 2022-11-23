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
const jwt = require("jsonwebtoken");
const createAccessToken = (userId, err, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const accessToken = yield jwt.sign({
            UserId: userId,
        }, (_a = process.env.ACCESS_TOKEN_SECRET) !== null && _a !== void 0 ? _a : "default-secret", { expiresIn: "10m" });
        console.log(accessToken);
        return res.status(200).send("access token generated" + accessToken);
    }
    catch (error) { }
});
const createRefreshToken = (userId, refreshTokenId, err, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        const refreshToken = yield jwt.sign({
            UserId: userId,
            tokenId: refreshTokenId,
        }, (_b = process.env.REFRESH_TOKEN_SECRET) !== null && _b !== void 0 ? _b : "default-secret", { expiresIn: "30m" });
        console.log(refreshToken);
        return res.status(200).send("refresh token generated" + refreshToken);
    }
    catch (error) { }
});
const verifyAccessToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.headers.authentication;
    if (!token) {
        return res.status(400).send("error");
    }
    try {
        var decoded = yield jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        return next(res.send({ decoded }));
    }
    catch (error) {
        console.log("err");
        return next(res.send("not verified"));
    }
});
module.exports = {
    verifyAccessToken,
    createRefreshToken,
    createAccessToken,
};
