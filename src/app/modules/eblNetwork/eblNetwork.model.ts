import { Schema, model } from 'mongoose';
import { EblNetworkModel, IEblNetwork } from './eblNetwork.interface';

const EblNetworkSchema = new Schema<IEblNetwork, EblNetworkModel>(
  {
    networkId: {
      type: String,
      unique: true,
    },
    type: {
      type: String,
      enum: ['eblBranch', 'eblSubBranch', 'eblAgent', 'ebl365'],
      required: true,
    },
    eblBranch: {
      type: Schema.Types.ObjectId,
      ref: 'EblBranch',
    },
    eblSubBranch: {
      type: Schema.Types.ObjectId,
      ref: 'EblSubBranch',
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);

export const EblNetwork = model<IEblNetwork, EblNetworkModel>(
  'EblNetwork',
  EblNetworkSchema,
);
