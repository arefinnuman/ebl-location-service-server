import { Model } from 'mongoose';

export type IEblBranch = {
  networkId: string;
  serialNo: string;
  branchName: string;
  branchCode?: string;
  branchDivision: string;
  branchAddress: string;
  branchMapLink?: string;
  branchLocation?: {
    lat: number;
    long: number;
  };
};

export type EblBranchModel = Model<IEblBranch, Record<string, unknown>>;