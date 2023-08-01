/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import mongoose, { SortOrder } from 'mongoose';
import {
  IEmployeeFilters,
  employeeSearchableFields,
} from '../../../constants/employee.constant';
import ApiError from '../../../errors/apiError';
import { User } from '../user/user.model';
import { IChecker } from './checker.interface';
import { Checker } from './checker.model';
import { IGenericResponse } from '../../../interface/genericResponse';
import { IPaginationOptions } from '../../../interface/pagination';
import { PaginationHelpers } from '../../../helper/paginationHelper';

const getAllChecker = async (
  filters: IEmployeeFilters,
  paginationOptions: IPaginationOptions,
): Promise<IGenericResponse<IChecker[]>> => {
  const { searchTerm, ...filtersData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    PaginationHelpers.calculatePagination(paginationOptions);

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: employeeSearchableFields.map(field => ({
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

  const result = await Checker.find(whereConditions)
    .populate('department')
    .populate('team')
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await Checker.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleChecker = async (
  employeeId: string,
): Promise<IChecker | null> => {
  const isExist = await Checker.findOne({ employeeId });
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Checker not found !');
  }

  const result = await Checker.findOne({ employeeId })
    .populate('department')
    .populate('team');
  return result;
};

const updateChecker = async (
  employeeId: string,
  payload: Partial<IChecker>,
): Promise<IChecker | null> => {
  const isExist = await Checker.findOne({ employeeId });
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Checker not found !');
  }

  const { fullName, ...data } = payload;
  const updatedData: Partial<IChecker> = { ...data };

  if (fullName && Object.keys(fullName).length > 0) {
    Object.keys(fullName).forEach(key => {
      const nameKey = `fullName.${key}` as keyof Partial<IChecker>;
      (updatedData as any)[nameKey] = fullName[key as keyof typeof fullName];
    });
  }

  const result = await Checker.findOneAndUpdate({ employeeId }, updatedData, {
    new: true,
  });
  return result;
};

const deleteChecker = async (employeeId: string): Promise<IChecker | null> => {
  const isExist = await Checker.findOne({ employeeId });
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Checker not found !');
  }

  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const employee = await Checker.findOneAndDelete({ employeeId });
    if (!employee) {
      throw new ApiError(404, 'Failed to delete Checker');
    }

    await User.deleteOne({ employeeId });
    session.commitTransaction();
    session.endSession();

    return employee;
  } catch (error) {
    session.abortTransaction();
    throw error;
  }
};

export const CheckerService = {
  getAllChecker,
  getSingleChecker,
  updateChecker,
  deleteChecker,
};
