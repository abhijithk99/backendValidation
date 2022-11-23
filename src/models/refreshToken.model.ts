import { Schema } from "mongoose";
var mongoose = require("mongoose");
var { stringify } = require("nodemon/lib/utils");
const User = require("./login.model");

const refreshTokenSchema = mongoose.Schema({
  owner: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: User,
  },
});

const RefreshToken = mongoose.model("refreshToken", refreshTokenSchema);
module.exports = RefreshToken;
