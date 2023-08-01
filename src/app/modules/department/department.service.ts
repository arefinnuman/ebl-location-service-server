import { SortOrder } from 'mongoose';
import { IGenericResponse } from '../../../global/genericResponse';
import { IPaginationOptions } from '../../../global/pagination';
import { PaginationHelpers } from '../../../helpers/pagination';
import { departmentSearchableFields } from './department.constant';
import { IDepartment, IDepartmentFilters } from './department.interface';
import { Department } from './department.model';

const createDepartment = async (payload: IDepartment): Promise<IDepartment> => {
  const result = await Department.create(payload);
  return result;
};

const getAllDepartment = async (
  filters: Partial<IDepartmentFilters>,
  paginationOptions: IPaginationOptions,
): Promise<IGenericResponse<IDepartment[]>> => {
  const { searchTerm, ...filtersData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: departmentSearchableFields.map(field => ({
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

  const { page, limit, skip, sortBy, sortOrder } =
    PaginationHelpers.calculatePagination(paginationOptions);
  const sortConditions: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  const whereConditions =
    andConditions.length > 0
      ? {
          $and: andConditions,
        }
      : {};

  const result = await Department.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await Department.countDocuments();
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleDepartment = async (id: string): Promise<IDepartment | null> => {
  const result = await Department.findById(id);
  return result;
};

const updateDepartment = async (
  id: string,
  payload: Partial<IDepartment>,
): Promise<IDepartment | null> => {
  const result = await Department.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

const deleteDepartment = async (id: string): Promise<IDepartment | null> => {
  const result = await Department.findByIdAndDelete(id, { new: true });
  return result;
};

export const DepartmentService = {
  createDepartment,
  getAllDepartment,
  getSingleDepartment,
  updateDepartment,
  deleteDepartment,
};
