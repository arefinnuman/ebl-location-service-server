import httpStatus from 'http-status';
import mongoose, { SortOrder } from 'mongoose';
import ApiError from '../../../errors/apiError';
import { PaginationHelpers } from '../../../helper/paginationHelper';
import { IGenericResponse } from '../../../interface/genericResponse';
import { IPaginationOptions } from '../../../interface/pagination';
import { EblNetwork } from '../eblNetwork/eblNetwork.model';
import { branchSearchableFields } from './eblBranch.constant';
import { IBranchFilters, IEblBranch } from './eblBranch.interface';
import { EblBranch } from './eblBranch.model';

const getAllBranch = async (
  filters: IBranchFilters,
  paginationOptions: IPaginationOptions,
): Promise<IGenericResponse<IEblBranch[]>> => {
  const { searchTerm, ...filtersData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    PaginationHelpers.calculatePagination(paginationOptions);

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: branchSearchableFields.map(field => ({
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

  const result = await EblBranch.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await EblBranch.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleBranch = async (id: string): Promise<IEblBranch | null> => {
  const result = await EblBranch.findOne({ _id: id });
  return result;
};

const updateBranch = async (
  id: string,
  payload: Partial<IEblBranch>,
): Promise<IEblBranch | null> => {
  const isExist = await EblBranch.findOne({ _id: id });
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Branch not found !');
  }
  const { ...BranchData } = payload;
  const updatedBranchData: Partial<IEblBranch> = { ...BranchData };

  const result = await EblBranch.findOneAndUpdate(
    { _id: id },
    updatedBranchData,
    {
      new: true,
    },
  );
  return result;
};

const deleteBranch = async (id: string): Promise<IEblBranch | null> => {
  const isExist = await EblBranch.findOne({ _id: id });
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'branch is not found !');
  }
  const networkId = isExist?.networkId;

  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const Branch = await EblBranch.findOneAndDelete({ networkId });
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

export const EblBranchService = {
  getAllBranch,
  getSingleBranch,
  updateBranch,
  deleteBranch,
};
