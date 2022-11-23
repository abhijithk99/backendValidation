"use strict";
var mongoose = require("mongoose");
var { stringify } = require("nodemon/lib/utils");
const profileSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    branch: {
        type: String,
        required: true,
    },
});
const Profile = mongoose.model("profile", profileSchema);
module.exports = Profile;
