import httpStatus from 'http-status';
import mongoose, { SortOrder } from 'mongoose';
import ApiError from '../../../errors/apiError';
import { PaginationHelpers } from '../../../helper/paginationHelper';
import { IGenericResponse } from '../../../interface/genericResponse';
import { IPaginationOptions } from '../../../interface/pagination';
import { EblNetwork } from '../eblNetwork/eblNetwork.model';
import { subBranchSearchableFields } from './eblSubBranch.constant';
import { IEblSubBranch, ISubBranchFilters } from './eblSubBranch.interface';
import { EblSubBranch } from './eblSubBranch.model';

const getAllSubBranch = async (
  filters: ISubBranchFilters,
  paginationOptions: IPaginationOptions,
): Promise<IGenericResponse<IEblSubBranch[]>> => {
  const { searchTerm, ...filtersData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    PaginationHelpers.calculatePagination(paginationOptions);

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: subBranchSearchableFields.map(field => ({
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

  const result = await EblSubBranch.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await EblSubBranch.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleSubBranch = async (
  id: string,
): Promise<IEblSubBranch | null> => {
  const result = await EblSubBranch.findOne({ _id: id });
  return result;
};

const updateSubBranch = async (
  id: string,
  payload: Partial<IEblSubBranch>,
): Promise<IEblSubBranch | null> => {
  const isExist = await EblSubBranch.findOne({ _id: id });
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Branch not found !');
  }
  const { ...BranchData } = payload;
  const updatedBranchData: Partial<IEblSubBranch> = { ...BranchData };

  const result = await EblSubBranch.findOneAndUpdate(
    { _id: id },
    updatedBranchData,
    {
      new: true,
    },
  );
  return result;
};

const deleteSubBranch = async (id: string): Promise<IEblSubBranch | null> => {
  const isExist = await EblSubBranch.findOne({ _id: id });
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'branch is not found !');
  }
  const networkId = isExist?.networkId;

  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const Branch = await EblSubBranch.findOneAndDelete({ networkId });
    if (!Branch) {
      throw new ApiError(404, 'failed to delete Branch');
    }

    await EblNetwork.deleteOne({ networkId });
    session.commitTransaction();
    session.endSession();

    return Branch;
  } catch (error) {
    session.abortTransaction();
    throw error;
  }
};

export const EblSubBranchService = {
  getAllSubBranch,
  getSingleSubBranch,
  updateSubBranch,
  deleteSubBranch,
};
