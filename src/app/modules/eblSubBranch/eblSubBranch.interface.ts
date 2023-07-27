import { Model } from 'mongoose';

export type IEblSubBranch = {
  networkId: string;
  serialNo: string;
  subBranchName: string;
  subBranchCode?: string;
  subBranchDivision: string;
  subBranchAddress: string;
  subBranchMapLink: string;
  subBranchLocation: {
    lat: number;
    long: number;
  };
};

export type EblSubBranchModel = Model<IEblSubBranch, Record<string, unknown>>;

export type ISubBranchFilters = {
  searchTerm?: string;
  id?: string;
  subBranchName?: string;
  subBranchCode?: string;
  subBranchDivision?: string;
  subBranchAddress?: string;
};
