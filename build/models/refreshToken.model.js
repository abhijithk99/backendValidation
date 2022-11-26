"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
var mongoose = require("mongoose");
var { stringify } = require("nodemon/lib/utils");
const refreshTokenSchema = mongoose.Schema({
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: "users",
    },
    token: {
        type: String,
    },
    expires: {
        type: Date,
    },
    created: {
        type: Date,
    },
    revoked: {
        type: Date,
    },
    replaced_token: {
        type: String,
    },
});
refreshTokenSchema.virtual("isActive").get(function () {
    return !this.revoked && Date.now() >= this.expires;
});
const RefreshToken = mongoose.model("refreshToken", refreshTokenSchema);
module.exports = { RefreshToken };
