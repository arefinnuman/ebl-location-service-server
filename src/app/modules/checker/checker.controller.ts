import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { IChecker } from './checker.interface';
import { CheckerService } from './checker.service';
import catchAsync from '../../../custom/catchAsync';
import pick from '../../../interface/pick';
import { employeeFilterableFields } from '../../../constants/employee.constant';
import { paginationFields } from '../../../constants/paginationField';
import sendResponse from '../../../custom/sendResponse';

const getAllChecker = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, employeeFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await CheckerService.getAllChecker(filters, paginationOptions);

  sendResponse<IChecker[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Checker retrieved successfully !',
    meta: result.meta,
    data: result.data,
  });
});

const gerSingleChecker = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await CheckerService.getSingleChecker(id);

  sendResponse<IChecker>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Checker retrieved successfully !',
    data: result,
  });
});

const updateChecker = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedData = req.body;

  const result = await CheckerService.updateChecker(id, updatedData);

  sendResponse<IChecker>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Checker updated successfully !',
    data: result,
  });
});

const deleteChecker = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await CheckerService.deleteChecker(id);

  sendResponse<IChecker>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Checker deleted successfully !',
    data: result,
  });
});

export const CheckerController = {
  getAllChecker,
  gerSingleChecker,
  updateChecker,
  deleteChecker,
};
