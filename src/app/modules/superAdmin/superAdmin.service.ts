/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import mongoose, { SortOrder } from 'mongoose';
import {
  IEmployeeFilters,
  employeeSearchableFields,
} from '../../../constants/employee.constant';
import ApiError from '../../../errors/apiError';
import { User } from '../user/user.model';
import { ISuperAdmin } from './superAdmin.interface';
import { SuperAdmin } from './superAdmin.model';
import { IGenericResponse } from '../../../interface/genericResponse';
import { IPaginationOptions } from '../../../interface/pagination';
import { PaginationHelpers } from '../../../helper/paginationHelper';

const getAllSuperAdmin = async (
  filters: IEmployeeFilters,
  paginationOptions: IPaginationOptions,
): Promise<IGenericResponse<ISuperAdmin[]>> => {
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

  const result = await SuperAdmin.find(whereConditions)
    .populate('department')
    .populate('team')
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await SuperAdmin.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleSuperAdmin = async (
  employeeId: string,
): Promise<ISuperAdmin | null> => {
  const isExist = await SuperAdmin.findOne({ employeeId });
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Super Admin not found !');
  }

  const result = await SuperAdmin.findOne({ employeeId })
    .populate('department')
    .populate('team');
  return result;
};

const updateSuperAdmin = async (
  employeeId: string,
  payload: Partial<ISuperAdmin>,
): Promise<ISuperAdmin | null> => {
  const isExist = await SuperAdmin.findOne({ employeeId });
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Admin not found !');
  }

  const { fullName, ...data } = payload;
  const updatedData: Partial<ISuperAdmin> = { ...data };

  if (fullName && Object.keys(fullName).length > 0) {
    Object.keys(fullName).forEach(key => {
      const nameKey = `fullName.${key}` as keyof Partial<ISuperAdmin>;
      (updatedData as any)[nameKey] = fullName[key as keyof typeof fullName];
    });
  }

  const result = await SuperAdmin.findOneAndUpdate(
    { employeeId },
    updatedData,
    {
      new: true,
    },
  );
  return result;
};

const deleteSuperAdmin = async (
  employeeId: string,
): Promise<ISuperAdmin | null> => {
  const isExist = await SuperAdmin.findOne({ employeeId });
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Super Admin not found !');
  }

  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const superAdmin = await SuperAdmin.findOneAndDelete({ employeeId });
    if (!superAdmin) {
      throw new ApiError(404, 'Failed to delete admin');
    }

    await User.deleteOne({ employeeId });
    session.commitTransaction();
    session.endSession();

    return superAdmin;
  } catch (error) {
    session.abortTransaction();
    throw error;
  }
};

export const SuperAdminService = {
  getAllSuperAdmin,
  getSingleSuperAdmin,
  updateSuperAdmin,
  deleteSuperAdmin,
};
