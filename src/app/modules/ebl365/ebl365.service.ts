import httpStatus from 'http-status';
import mongoose, { SortOrder } from 'mongoose';
import ApiError from '../../../errors/apiError';
import { PaginationHelpers } from '../../../helper/paginationHelper';
import { IGenericResponse } from '../../../interface/genericResponse';
import { IPaginationOptions } from '../../../interface/pagination';
import { EblNetwork } from '../eblNetwork/eblNetwork.model';
import { ebl365SearchableFields } from './ebl365.constant ';
import { IEbl365, IEbl365Filters } from './ebl365.interface';
import { Ebl365 } from './ebl365.model';

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
    throw new ApiError(httpStatus.NOT_FOUND, 'Ebl365 is not found !');
  }
  const networkId = isExist?.networkId;

  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const ebl365 = await Ebl365.findOneAndDelete({ networkId });
    if (!ebl365) {
      throw new ApiError(404, 'failed to delete Ebl365');
    }

    await EblNetwork.deleteOne({ networkId });
    session.commitTransaction();
    session.endSession();

    return ebl365;
  } catch (error) {
    session.abortTransaction();
    throw error;
  }
};

export const Ebl365Service = {
  getAllEbl365,
  getSingleEbl365,
  updateEbl365,
  deleteEbl365,
};
