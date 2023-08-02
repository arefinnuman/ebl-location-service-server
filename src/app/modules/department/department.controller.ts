import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';

import { departmentFilterableFields } from './department.constant';
import { IDepartment } from './department.interface';
import { DepartmentService } from './department.service';
import catchAsync from '../../../custom/catchAsync';
import sendResponse from '../../../custom/sendResponse';
import pick from '../../../interface/pick';

const createDepartment = catchAsync(async (req: Request, res: Response) => {
  const { ...academicDepartmentData } = req.body;
  const result = await DepartmentService.createDepartment(
    academicDepartmentData,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: ` Created Successfully`,
    data: result,
  });
});

const getAllDepartment = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, departmentFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await DepartmentService.getAllDepartment(
    filters,
    paginationOptions,
  );

  sendResponse<IDepartment[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `Department Data`,
    meta: result.meta,
    data: result.data,
  });
});

const getSingleDepartment = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await DepartmentService.getSingleDepartment(id);

  if (result === null) {
    sendResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: `${id} not found in Database`,
    });
  } else {
    sendResponse<IDepartment>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: `Department Data `,
      data: result,
    });
  }
});

const updateDepartment = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedData = req.body;

  const result = await DepartmentService.updateDepartment(id, updatedData);

  if (result === null) {
    sendResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: `Department not found in Database`,
    });
  } else {
    sendResponse<IDepartment>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: `Department Data Updated`,
      data: result,
    });
  }
});

const deleteDepartment = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await DepartmentService.deleteDepartment(id);

  sendResponse<IDepartment>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Department deleted successfully !',
    data: result,
  });
});

export const DepartmentController = {
  createDepartment,
  getAllDepartment,
  getSingleDepartment,
  updateDepartment,
  deleteDepartment,
};
