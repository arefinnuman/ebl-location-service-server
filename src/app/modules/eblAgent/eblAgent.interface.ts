import { Model } from 'mongoose';

export type IEblAgent = {
  networkId: string;
  serialNo: string;
  agentName: string;
  agentCode?: string;
  agentDivision: string;
  agentAddress: string;
  agentMapLink?: string;
  agentLocation?: {
    lat: number;
    long: number;
  };
};

export type EblAgentModel = Model<IEblAgent, Record<string, unknown>>;
