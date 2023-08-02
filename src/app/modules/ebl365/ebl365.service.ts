import httpStatus from 'http-status';
import { SortOrder } from 'mongoose';
import { generateRandom4DigitNumber } from '../../../constants/constant.function';
import ApiError from '../../../errors/apiError';
import { PaginationHelpers } from '../../../helper/paginationHelper';
import { IGenericResponse } from '../../../interface/genericResponse';
import { IPaginationOptions } from '../../../interface/pagination';
import { ebl365SearchableFields } from './ebl365.constant ';
import { IEbl365, IEbl365Filters } from './ebl365.interface';
import { Ebl365 } from './ebl365.model';

const createEbl365 = async (eblBranch: IEbl365): Promise<IEbl365 | null> => {
  eblBranch.networkId = generateRandom4DigitNumber();
  const newBranch = await Ebl365.create(eblBranch);
  return newBranch;
};

const getAllEbl365 = async (
  filters: IEbl365Filters,
  paginationOptions: IPaginationOptions,
): Promise<IGenericResponse<IEbl365[]>> => {
  const { searchTerm, ...filtersData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    PaginationHelpers.calculatePagination(paginationOptions);

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: ebl365SearchableFields.map(field => ({
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

  const sortConditions: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }
  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await Ebl365.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await Ebl365.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleEbl365 = async (id: string): Promise<IEbl365 | null> => {
  const result = await Ebl365.findOne({ _id: id });
  return result;
};

const updateEbl365 = async (
  id: string,
  payload: Partial<IEbl365>,
): Promise<IEbl365 | null> => {
  const isExist = await Ebl365.findOne({ _id: id });
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Ebl365 not found !');
  }
  const { ...ebl365Data } = payload;
  const updatedEbl365Data: Partial<IEbl365> = { ...ebl365Data };

  const result = await Ebl365.findOneAndUpdate({ _id: id }, updatedEbl365Data, {
    new: true,
  });
  return result;
};

const deleteEbl365 = async (id: string): Promise<IEbl365 | null> => {
  const isExist = await Ebl365.findOne({ _id: id });
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Ebl 365 Booth is not found !');
  }
  const result = await Ebl365.findByIdAndDelete(id, { new: true });
  return result;
};

export const Ebl365Service = {
  getAllEbl365,
  getSingleEbl365,
  updateEbl365,
  deleteEbl365,
  createEbl365,
};
