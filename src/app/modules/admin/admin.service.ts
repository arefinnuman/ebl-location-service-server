/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import mongoose, { SortOrder } from 'mongoose';
import { employeeSearchableFields } from '../../../constants/employee.constant';
import ApiError from '../../../errors/apiError';
import { User } from '../user/user.model';
import { IAdmin, IAdminFilters } from './admin.interface';
import { Admin } from './admin.model';
import { IPaginationOptions } from '../../../interface/pagination';
import { IGenericResponse } from '../../../interface/genericResponse';
import { PaginationHelpers } from '../../../helper/paginationHelper';

const getAllAdmins = async (
  filters: IAdminFilters,
  paginationOptions: IPaginationOptions,
): Promise<IGenericResponse<IAdmin[]>> => {
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

  const result = await Admin.find(whereConditions)
    .populate('department')
    .populate('team')
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await Admin.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleAdmin = async (employeeId: string): Promise<IAdmin | null> => {
  const isExist = await Admin.findOne({ employeeId });
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Admin not found !');
  }

  const result = await Admin.findOne({ employeeId })
    .populate('department')
    .populate('team');
  return result;
};

const updateAdmin = async (
  employeeId: string,
  payload: Partial<IAdmin>,
): Promise<IAdmin | null> => {
  const isExist = await Admin.findOne({ employeeId });
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Admin not found !');
  }

  const { fullName, ...adminData } = payload;
  const updatedAdminData: Partial<IAdmin> = { ...adminData };

  if (fullName && Object.keys(fullName).length > 0) {
    Object.keys(fullName).forEach(key => {
      const nameKey = `fullName.${key}` as keyof Partial<IAdmin>;
      (updatedAdminData as any)[nameKey] =
        fullName[key as keyof typeof fullName];
    });
  }

  const result = await Admin.findOneAndUpdate(
    { employeeId },
    updatedAdminData,
    {
      new: true,
    },
  );
  return result;
};

const deleteAdmin = async (employeeId: string): Promise<IAdmin | null> => {
  const isExist = await Admin.findOne({ employeeId });
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Admin not found !');
  }

  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const admin = await Admin.findOneAndDelete({ employeeId });
    if (!admin) {
      throw new ApiError(404, 'Failed to delete admin');
    }

    await User.deleteOne({ employeeId });
    session.commitTransaction();
    session.endSession();

    return admin;
  } catch (error) {
    session.abortTransaction();
    throw error;
  }
};

export const AdminService = {
  getAllAdmins,
  getSingleAdmin,
  updateAdmin,
  deleteAdmin,
};
