/* eslint-disable @typescript-eslint/no-explicit-any */

import httpStatus from 'http-status';
import mongoose, { SortOrder } from 'mongoose';
import { employeeSearchableFields } from '../../../constants/employee.constant';
import ApiError from '../../../errors/apiError';
import { PaginationHelpers } from '../../../helper/paginationHelper';
import { IGenericResponse } from '../../../interface/genericResponse';
import { IPaginationOptions } from '../../../interface/pagination';
import { User } from '../user/user.model';
import { IViewer, IViewerFilters } from './viewer.interface';
import { Viewer } from './viewer.model';

const getAllViewers = async (
  filters: IViewerFilters,
  paginationOptions: IPaginationOptions,
): Promise<IGenericResponse<IViewer[]>> => {
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

  const result = await Viewer.find(whereConditions)
    .populate('department')
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await Viewer.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleViewer = async (employeeId: string): Promise<IViewer | null> => {
  const isExist = await Viewer.findOne({ employeeId });
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Viewer not found !');
  }

  const result = await Viewer.findOne({ employeeId }).populate('department');

  return result;
};

const updateViewer = async (
  employeeId: string,
  payload: Partial<IViewer>,
): Promise<IViewer | null> => {
  const isExist = await Viewer.findOne({ employeeId });
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Viewer not found !');
  }

  const { fullName, ...ViewerData } = payload;
  const updatedViewerData: Partial<IViewer> = { ...ViewerData };

  if (fullName && Object.keys(fullName).length > 0) {
    Object.keys(fullName).forEach(key => {
      const nameKey = `fullName.${key}` as keyof Partial<IViewer>;
      (updatedViewerData as any)[nameKey] =
        fullName[key as keyof typeof fullName];
    });
  }

  const result = await Viewer.findOneAndUpdate(
    { employeeId },
    updatedViewerData,
    {
      new: true,
    },
  );
  return result;
};

const deleteViewer = async (employeeId: string): Promise<IViewer | null> => {
  const isExist = await Viewer.findOne({ employeeId });
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Viewer not found !');
  }

  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const viewer = await Viewer.findOneAndDelete({ employeeId });
    if (!viewer) {
      throw new ApiError(404, 'Failed to delete Viewer');
    }

    await User.deleteOne({ employeeId });
    session.commitTransaction();
    session.endSession();

    return viewer;
  } catch (error) {
    session.abortTransaction();
    throw error;
  }
};

export const ViewerService = {
  getAllViewers,
  getSingleViewer,
  updateViewer,
  deleteViewer,
};
