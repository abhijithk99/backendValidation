import { Schema } from "mongoose";
var mongoose = require("mongoose");
var { stringify } = require("nodemon/lib/utils");

const refreshTokenSchema = mongoose.Schema({
  user: {
    type: Schema.Types.ObjectId,
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

refreshTokenSchema.virtual("isActive").get(function (this: any) {
  return !this.revoked && Date.now() >= this.expires;
});

const RefreshToken = mongoose.model("refreshToken", refreshTokenSchema);
module.exports = { RefreshToken };
