"use strict";
exports.__esModule = true;
var User_1 = require("./managers/User");
/**
 * Inicia todos os managers.
 */
var managers = {
    "user": new User_1.User()
};
exports.managers = managers;
