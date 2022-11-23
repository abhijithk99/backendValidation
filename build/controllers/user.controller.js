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
const Book = require("../models/user.model");
const bodyParser = require("body-parser");
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = User.findOne({ username: req.body.username }, { password: req.body.password });
    if (user) {
        res.status(200).json({
            message: "login success",
            data: user
        });
    }
    res.status(401).json({
        message: "authentiation failed",
        data: {}
    });
}));
module.exports = router;
