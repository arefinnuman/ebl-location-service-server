import { SortOrder } from 'mongoose';
import { IGenericResponse } from '../../../interface/genericResponse';
import { IPaginationOptions } from '../../../interface/pagination';
import { teamSearchableFields } from './team.constant';
import { ITeam, ITeamFilters } from './team.interface';
import { Team } from './team.model';
import { PaginationHelpers } from '../../../helper/paginationHelper';

const createTeam = async (payload: ITeam): Promise<ITeam> => {
  const result = await Team.create(payload);
  return result;
};

const getAllTeam = async (
  filters: Partial<ITeamFilters>,
  paginationOptions: IPaginationOptions,
): Promise<IGenericResponse<ITeam[]>> => {
  const { searchTerm, ...filtersData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: teamSearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }

  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  const { page, limit, skip, sortBy, sortOrder } =
    PaginationHelpers.calculatePagination(paginationOptions);
  const sortConditions: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  const whereConditions =
    andConditions.length > 0
      ? {
          $and: andConditions,
        }
      : {};

  const result = await Team.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await Team.countDocuments();
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleTeam = async (id: string): Promise<ITeam | null> => {
  const result = await Team.findById(id);
  return result;
};

const updateTeam = async (
  id: string,
  payload: Partial<ITeam>,
): Promise<ITeam | null> => {
  const result = await Team.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

const deleteTeam = async (id: string): Promise<ITeam | null> => {
  const result = await Team.findByIdAndDelete(id, { new: true });
  return result;
};

export const TeamService = {
  createTeam,
  getAllTeam,
  getSingleTeam,
  updateTeam,
  deleteTeam,
};
