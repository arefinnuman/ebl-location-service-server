import { Model } from 'mongoose';

export type IEblBranch = {
  networkId: string;
  branchName: string;
  branchCode?: string;
  branchDivision: string;
  branchAddress: string;
  branchMapLink?: string;
  branchImage?: string;
  branchLocation?: {
    lat: number;
    long: number;
  };
};

export type EblBranchModel = Model<IEblBranch, Record<string, unknown>>;

export type IBranchFilters = {
  searchTerm?: string;
  id?: string;
  branchName?: string;
  branchCode?: string;
  branchDivision?: string;
  branchAddress?: string;
};
