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
const verifyAccessToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.headers.authentication;
        if (!token) {
            return res.status(401).json({ message: "cannot find token" });
        }
        const decoded = yield jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const user = {
            id: decoded.userId,
            role: decoded.role,
        };
        req.user = user;
        next();
        return res.status(400).json({ message: "user authentiated" });
    }
    catch (err) {
        return res
            .status(500)
            .json({ message: "there was an error in aunthentiation" });
    }
});
module.exports = {
    verifyAccessToken,
};
