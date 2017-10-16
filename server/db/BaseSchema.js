"use strict";
exports.__esModule = true;
var mongoose_1 = require("mongoose");
var schema = {
    id: {
        type: mongoose_1.Schema.Types.String,
        required: true,
        trim: true
    }
};
exports.BaseSchema = schema;
