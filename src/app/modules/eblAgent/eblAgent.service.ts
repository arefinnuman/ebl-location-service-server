import httpStatus from 'http-status';
import { SortOrder } from 'mongoose';
import { generateRandom4DigitNumber } from '../../../constants/constant.function';
import ApiError from '../../../errors/apiError';
import { PaginationHelpers } from '../../../helper/paginationHelper';
import { IGenericResponse } from '../../../interface/genericResponse';
import { IPaginationOptions } from '../../../interface/pagination';
import { agentSearchableFields } from './eblAgent.constant';
import { IAgentFilters, IEblAgent } from './eblAgent.interface';
import { EblAgent } from './eblAgent.model';

const createAgent = async (eblBranch: IEblAgent): Promise<IEblAgent | null> => {
  eblBranch.networkId = generateRandom4DigitNumber();
  const newBranch = await EblAgent.create(eblBranch);
  return newBranch;
};

const getAllAgent = async (
  filters: IAgentFilters,
  paginationOptions: IPaginationOptions,
): Promise<IGenericResponse<IEblAgent[]>> => {
  const { searchTerm, ...filtersData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    PaginationHelpers.calculatePagination(paginationOptions);

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: agentSearchableFields.map(field => ({
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

  const result = await EblAgent.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await EblAgent.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleAgent = async (id: string): Promise<IEblAgent | null> => {
  const result = await EblAgent.findOne({ _id: id });
  return result;
};

const updateAgent = async (
  id: string,
  payload: Partial<IEblAgent>,
): Promise<IEblAgent | null> => {
  const isExist = await EblAgent.findOne({ _id: id });
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Agent not found !');
  }
  const { ...AgentData } = payload;
  const updatedAgentData: Partial<IEblAgent> = { ...AgentData };

  const result = await EblAgent.findOneAndUpdate(
    { _id: id },
    updatedAgentData,
    {
      new: true,
    },
  );
  return result;
};

const deleteAgent = async (id: string): Promise<IEblAgent | null> => {
  const isExist = await EblAgent.findOne({ _id: id });
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Agent outlet is not found !');
  }

  const result = await EblAgent.findByIdAndDelete(id, { new: true });
  return result;
};

export const EblAgentService = {
  getAllAgent,
  getSingleAgent,
  updateAgent,
  deleteAgent,
  createAgent,
};
