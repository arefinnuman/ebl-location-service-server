import { Schema, model } from 'mongoose';
import { EblAgentModel, IEblAgent } from './eblAgent.interface';

const EblAgentSchema = new Schema<IEblAgent, EblAgentModel>(
  {
    networkId: {
      type: String,
      required: true,
      unique: true,
    },
    agentName: {
      type: String,
      required: true,
    },
    agentCode: {
      type: String,
    },
    agentDivision: {
      type: String,
      required: true,
    },
    agentAddress: {
      type: String,
      required: true,
    },
    agentMapLink: {
      type: String,
      required: true,
    },
    agentLocation: {
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

export const EblAgent = model<IEblAgent, EblAgentModel>(
  'EblAgent',
  EblAgentSchema,
);
