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

let schema = new Schema(Object.assign( {
  text: {
    type: Schema.Types.String,
    trim: true,
    required: [true, messages.text.REQUIRED],
    max: 255
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: [true, messages.text.REQUIRED]
  },
  register: 

}, BaseSchema), schema_options);