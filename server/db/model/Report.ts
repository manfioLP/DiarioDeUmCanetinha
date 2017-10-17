import {model, Schema} from "mongoose";
import {BaseSchema} from "../BaseSchema";
import * as path from "path";

const messages = require(path.resolve("util/messages.json")).user;
const config = require(path.resolve("config.json"));

let schema_options = {
    discriminatorKey: "type",
    timestamps: true,
    toObject: {
        virtuals: true,
        transform: function (doc, ret) {
            delete ret._id;
            delete ret.__v;
            return ret;
        }
    },
    toJSON: {
        virtuals: true,
        transform: function (doc, ret) {
            delete ret._id;
            delete ret.__v;
            return ret;
        }
    }
    // http://mongoosejs.com/docs/guide.html#options
};

let schema = new Schema(Object.assign({
    month: {
        type: Schema.Types.Number,
        required: [true, messages.month.REQUIRED],
        min: 1,
        max: 13
    },
    year: {
        type: Schema.Types.Number,
        required: [true, messages.year.REQUIRED],
    },
    user_jokes: {
        user: {
            type: Schema.Types.String,
            ref: 'user',
            required: [true, messages.user.REQUIRED],
        },
        score: {
            type: Schema.Types.Number,
            default: 0,
        },
        badJokes: {
            type: Schema.Types.String,
            ref: 'joke',
            required: [true, messages.badJokes.REQUIRED],
        },
        goodJokes: {
            type: Schema.Types.String,
            ref: 'joke',
            required: [true, messages.goodJokes.REQUIRED],
        }
    }
}, BaseSchema), schema_options);

let ReportModel = model ('report', schema);
export {ReportModel as Model};