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
  name: {
    first_name: {
      type: Schema.Types.String,
      trim: true,
      required: [true, messages.first_name.REQUIRED]
    },
    surname: {
      type: Schema.Types.String,
      trim: true,
      required: [true, messages.surname.REQUIRED]
    },
    nickname: {
      type: Schema.Types.String,
      trim: true,
      required: [true, messages.nickname.REQUIRED]
    }
  },
  email: {
    type: Schema.Types.String,
    required: [true, messages.email.REQUIRED],
    unique: [true, messages.email.UNIQUE]
  },
  password: {
    type: Schema.Types.String,
    required: [true, messages.password.REQUIRED]
  },
  logged: {
    type: Schema.Types.Boolean,
    default: false
  },
  type: {
    type: Schema.Types.String,
    default: 'common',
  },
  removed: {
    type: Schema.Types.Boolean,
    default: false
  },
  reports: {
    type: Schema.Types.ObjectId,
    ref: 'report',
  },
  score: {
    type: Schema.Types.Number,
    default: 0,
  },
  acc_score: {
    type: Schema.Types.Number,
    default: 0,
  }
}, BaseSchema), schema_options);

let UserModel = model("user", schema);
export {UserModel as Model};
