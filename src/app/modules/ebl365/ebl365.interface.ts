import { Model } from 'mongoose';

export type IEbl365 = {
  networkId?: string;
  ebl365Name: string;
  ebl365Code?: string;
  ebl365Division: string;
  ebl365Address: string;
  ebl365MapLink?: string;
  deviceAvailability: string;
  lat: number;
  long: number;
};

export type Ebl365Model = Model<IEbl365, Record<string, unknown>>;

export type IEbl365Filters = {
  searchTerm?: string;
  id?: string;
  ebl365Name?: string;
  ebl365Code?: string;
  ebl365Division?: string;
  ebl365Address?: string;
};
