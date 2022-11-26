"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const { authorization } = require("../middlewares/authorization");
router.post("/", authorization, (req, res) => {
    res.send("post success");
});
module.exports = router;
