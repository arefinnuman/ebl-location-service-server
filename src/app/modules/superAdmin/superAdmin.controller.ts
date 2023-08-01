import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { employeeFilterableFields } from '../../../constants/employee.constant';
import { paginationFields } from '../../../constants/pagination';
import { ISuperAdmin } from './superAdmin.interface';
import { SuperAdminService } from './superAdmin.service';
import catchAsync from '../../../custom/catchAsync';
import pick from '../../../interface/pick';
import sendResponse from '../../../custom/sendResponse';

const getAllSuperAdmin = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, employeeFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await SuperAdminService.getAllSuperAdmin(
    filters,
    paginationOptions,
  );

  sendResponse<ISuperAdmin[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'SuperAdmin retrieved successfully !',
    meta: result.meta,
    data: result.data,
  });
});

const gerSingleSuperAdmin = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await SuperAdminService.getSingleSuperAdmin(id);

  sendResponse<ISuperAdmin>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin retrieved successfully !',
    data: result,
  });
});

const updateSuperAdmin = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedData = req.body;

  const result = await SuperAdminService.updateSuperAdmin(id, updatedData);

  sendResponse<ISuperAdmin>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin updated successfully !',
    data: result,
  });
});

const deleteAdmin = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await SuperAdminService.deleteSuperAdmin(id);

  sendResponse<ISuperAdmin>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin deleted successfully !',
    data: result,
  });
});

export const SuperAdminController = {
  getAllSuperAdmin,
  gerSingleSuperAdmin,
  updateSuperAdmin,
  deleteAdmin,
};
