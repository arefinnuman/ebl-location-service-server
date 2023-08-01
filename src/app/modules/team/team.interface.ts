import { Model } from 'mongoose';

export type ITeam = {
  title: string;
};

export type TeamModel = Model<ITeam, Record<string, unknown>>;

export type ITeamFilters = {
  searchTerm: string;
};
