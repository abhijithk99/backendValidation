"use strict";
var mongoose = require("mongoose");
var { stringify } = require("nodemon/lib/utils");
const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
});
const User = mongoose.model("users", userSchema);
module.exports = User;
