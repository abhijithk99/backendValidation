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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const router = express.Router();
const Profile = require("../models/profile.model");
const bodyParser = require("body-parser");
const login_controller_1 = __importDefault(require("../controllers/login.controller"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv/config");
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        validateAccessKey(login_controller_1.default);
    }
    catch (error) { }
}));
const validateAccessKey = (accessToken) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        var decoded = yield jsonwebtoken_1.default.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
        console.log({ decoded });
    }
    catch (err) {
        throw err;
    }
});
