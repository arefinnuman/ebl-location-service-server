import { Schema, model } from 'mongoose';
import { EblBranchModel, IEblBranch } from './eblBranch.interface';

const EblBranchSchema = new Schema<IEblBranch, EblBranchModel>(
  {
    networkId: {
      type: String,
      required: true,
      unique: true,
    },
    branchName: {
      type: String,
      required: true,
      unique: true,
    },
    branchCode: {
      type: String,
    },
    branchDivision: {
      type: String,
      required: true,
    },
    branchAddress: {
      type: String,
      required: true,
    },
    branchMapLink: {
      type: String,
    },
    branchImage: {
      type: String,
    },
    branchLocation: {
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
export const EblBranch = model<IEblBranch, EblBranchModel>(
  'EblBranch',
  EblBranchSchema,
);
