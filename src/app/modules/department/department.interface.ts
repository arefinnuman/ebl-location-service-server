import { Model } from 'mongoose';

export type IDepartment = {
  title: string;
};

export type DepartmentModel = Model<IDepartment, Record<string, unknown>>;

export type IDepartmentFilters = {
  searchTerm: string;
};
