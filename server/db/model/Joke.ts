import {model, Schema, SchemaType} from "mongoose";
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
  littlePen: {  // littlePen is the older register.
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: [true, messages.text.REQUIRED]
  },
  votes: {
    type: [ {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
      },
      vote: {
        type: Schema.Types.Number,
        min: 0,
        max: 1
      }
    }],
    default: []
  },
  defense: {
    type: Schema.Types.String,
    trim: true,
    max: 100,
    default: null
  },
  type: {
    type: Schema.Types.String,
    default: null

  }

}, BaseSchema), schema_options);

let JokeModel = model ('joke', schema);
export {JokeModel as Model};