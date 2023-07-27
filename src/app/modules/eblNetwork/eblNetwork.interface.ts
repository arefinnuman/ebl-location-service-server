import { Model, Types } from 'mongoose';

export type IEblNetwork = {
  networkId: string;
  type: 'eblBranch' | 'eblSubBranch' | 'eblAgent' | 'ebl365';
  eblBranch?: Types.ObjectId;
  eblSubBranch?: Types.ObjectId;
  eblAgent?: Types.ObjectId;
  ebl365?: Types.ObjectId;
};

export type EblNetworkModel = Model<IEblNetwork, Record<string, unknown>>;
