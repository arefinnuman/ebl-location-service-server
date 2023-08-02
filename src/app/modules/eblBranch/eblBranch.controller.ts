import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/paginationField';
import catchAsync from '../../../custom/catchAsync';
import sendResponse from '../../../custom/sendResponse';
import pick from '../../../interface/pick';
import { branchFilterableFields } from './eblBranch.constant';
import { IEblBranch } from './eblBranch.interface';
import { EblBranchService } from './eblBranch.service';

const createBranch = catchAsync(async (req: Request, res: Response) => {
  const branchData = req.body;
  const result = await EblBranchService.createBranch(branchData);
  sendResponse<IEblBranch>(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Branch created successfully !',
    data: result,
  });
});

const getAllBranch = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, branchFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await EblBranchService.getAllBranch(
    filters,
    paginationOptions,
  );

  sendResponse<IEblBranch[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Branches retrieved successfully !',
    meta: result.meta,
    data: result.data,
  });
});

const getSingleBranch = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await EblBranchService.getSingleBranch(id);

  sendResponse<IEblBranch>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'branch retrieved successfully !',
    data: result,
  });
});

const updateBranch = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedData = req.body;

  const result = await EblBranchService.updateBranch(id, updatedData);

  sendResponse<IEblBranch>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'branch updated successfully !',
    data: result,
  });
});

const deleteBranch = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await EblBranchService.deleteBranch(id);

  sendResponse<IEblBranch>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'branch deleted successfully !',
    data: result,
  });
});

export const EblBranchController = {
  createBranch,
  getAllBranch,
  getSingleBranch,
  updateBranch,
  deleteBranch,
};
