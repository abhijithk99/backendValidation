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
const jwt = require("jsonwebtoken");
const { User } = require("../models/login.model");
const { getRefreshToken } = require("../utils/refreshToken");
const { RefreshToken } = require("../models/refreshToken.model");
const loginUser = (username, password) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User.findOne({ username: username, password: password });
        if (user == null) {
            return {
                status: 401,
                message: "username and password doesn't exist",
                data: null,
            };
        }
        const accessToken = jwt.sign({ userId: user.id, userName: user.name }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "30m" });
        const refreshToken = getRefreshToken();
        yield new RefreshToken({
            user: user.id,
            token: refreshToken,
            created: Date.now(),
            expires: Date.now() + 365,
        }).save();
        return {
            status: 200,
            message: "login successfull",
            data: { id: user.id, accessToken, refreshToken },
        };
    }
    catch (err) {
        console.log("error in login");
        return {
            status: 500,
            message: "login failed",
            data: null,
        };
    }
});
const refresh = (refreshToken) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const findRefreshToken = yield RefreshToken.findOne({
            token: refreshToken,
        }).populate("user");
        if (findRefreshToken == null || !findRefreshToken.isActive) {
            return {
                status: 401,
                message: "token invalid",
                data: null,
            };
        }
        const newRefreshToken = getRefreshToken();
        yield new RefreshToken({
            user: findRefreshToken.user.id,
            token: newRefreshToken,
            created: Date.now(),
            expires: Date.now() + 30 * 24 * 60 * 60 * 1000,
        }).save();
        findRefreshToken.revoked = Date.now();
        findRefreshToken.replaced_token = newRefreshToken;
        findRefreshToken.save();
        const accessToken = jwt.sign({ userId: findRefreshToken.user.id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "30m" });
        return {
            status: 200,
            message: "new refresh token created",
            data: {
                user: findRefreshToken.id,
                accessToken: accessToken,
                refreshToken: newRefreshToken,
            },
        };
    }
    catch (err) {
        return {
            status: 401,
            message: "can't generate new refresh token",
            data: null,
        };
    }
});
const logout = (refreshToken) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const findRefreshToken = yield RefreshToken.findOne({
            token: refreshToken,
        }).populate("user");
        if (findRefreshToken == null || !findRefreshToken.isActive) {
            return {
                status: 401,
                message: "token invalid",
                data: null,
            };
        }
        findRefreshToken.revoked = Date.now();
        findRefreshToken.save();
        return {
            status: 200,
            message: "user logout",
            data: {
                user: findRefreshToken.id,
            },
        };
    }
    catch (err) {
        return {
            status: 401,
            message: "logout failed",
            data: null,
        };
    }
});
module.exports = {
    loginUser,
    refresh,
    logout,
};
