import httpStatus from 'http-status';
import { SortOrder } from 'mongoose';
import { generateRandom4DigitNumber } from '../../../constants/constant.function';
import ApiError from '../../../errors/apiError';
import { PaginationHelpers } from '../../../helper/paginationHelper';
import { IGenericResponse } from '../../../interface/genericResponse';
import { IPaginationOptions } from '../../../interface/pagination';
import { branchSearchableFields } from './eblBranch.constant';
import { IBranchFilters, IEblBranch } from './eblBranch.interface';
import { EblBranch } from './eblBranch.model';

const createBranch = async (
  eblBranch: IEblBranch,
): Promise<IEblBranch | null> => {
  eblBranch.networkId = generateRandom4DigitNumber();
  const newBranch = await EblBranch.create(eblBranch);
  return newBranch;
};

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

  const { ...branchData } = payload;
  const updatedBranchData: Partial<IEblBranch> = { ...branchData };

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

  const result = await EblBranch.findByIdAndDelete(id, { new: true });
  return result;
};

export const EblBranchService = {
  createBranch,
  getAllBranch,
  getSingleBranch,
  updateBranch,
  deleteBranch,
};
