import { Schema, model } from 'mongoose';
import { Ebl365Model, IEbl365 } from './ebl365.interface';

const Ebl365Schema = new Schema<IEbl365, Ebl365Model>(
  {
    networkId: {
      type: String,
      required: true,
      unique: true,
    },
    serialNo: {
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

export const Ebl365 = model<IEbl365, Ebl365Model>('Ebl365', Ebl365Schema);
