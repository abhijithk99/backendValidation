"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
var mongoose = require("mongoose");
var { stringify } = require("nodemon/lib/utils");
const User = require("./login.model");
const refreshTokenSchema = mongoose.Schema({
    owner: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: User,
    },
});
const RefreshToken = mongoose.model("refreshToken", refreshTokenSchema);
module.exports = RefreshToken;
