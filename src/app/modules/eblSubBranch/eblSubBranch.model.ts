import { Schema, model } from 'mongoose';
import { EblSubBranchModel, IEblSubBranch } from './eblSubBranch.interface';

const EblSubBranchSchema = new Schema<IEblSubBranch, EblSubBranchModel>(
  {
    networkId: {
      type: String,
      required: true,
      unique: true,
    },
    subBranchName: {
      type: String,
      required: true,
    },
    subBranchCode: {
      type: String,
    },
    subBranchDivision: {
      type: String,
      required: true,
    },
    subBranchAddress: {
      type: String,
      required: true,
    },
    subBranchMapLink: {
      type: String,
      required: true,
    },
    subBranchLocation: {
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

export const EblSubBranch = model<IEblSubBranch, EblSubBranchModel>(
  'EblSubBranch',
  EblSubBranchSchema,
);
