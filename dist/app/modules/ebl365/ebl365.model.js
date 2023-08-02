'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.Ebl365 = void 0;
const mongoose_1 = require('mongoose');
const Ebl365Schema = new mongoose_1.Schema(
  {
    networkId: {
      type: String,
      required: true,
      unique: true,
    },

    ebl365Name: {
      type: String,
      required: true,
    },
    ebl365Code: {
      type: String,
    },
    ebl365Division: {
      type: String,
      required: true,
    },
    ebl365Address: {
      type: String,
      required: true,
    },
    ebl365MapLink: {
      type: String,
      required: true,
    },
    ebl365Location: {
      lat: {
        type: Number,
      },
      long: {
        type: Number,
      },
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);
exports.Ebl365 = (0, mongoose_1.model)('Ebl365', Ebl365Schema);
