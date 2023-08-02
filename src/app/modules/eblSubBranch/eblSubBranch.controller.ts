import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/paginationField';
import catchAsync from '../../../custom/catchAsync';
import sendResponse from '../../../custom/sendResponse';
import pick from '../../../interface/pick';
import { subBranchFilterableFields } from './eblSubBranch.constant';
import { IEblSubBranch } from './eblSubBranch.interface';
import { EblSubBranchService } from './eblSubBranch.service';

const createSubBranch = catchAsync(async (req: Request, res: Response) => {
  const branchData = req.body;
  const result = await EblSubBranchService.createSUBBranch(branchData);
  sendResponse<IEblSubBranch>(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Branch created successfully !',
    data: result,
  });
});

const getAllSubBranch = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, subBranchFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await EblSubBranchService.getAllSubBranch(
    filters,
    paginationOptions,
  );

  sendResponse<IEblSubBranch[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'sub branch retrieved successfully !',
    meta: result.meta,
    data: result.data,
  });
});

const getSingleSubBranch = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await EblSubBranchService.getSingleSubBranch(id);

  sendResponse<IEblSubBranch>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'sub branch retrieved successfully !',
    data: result,
  });
});

const updateSubBranch = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedData = req.body;

  const result = await EblSubBranchService.updateSubBranch(id, updatedData);

  sendResponse<IEblSubBranch>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'sub branch updated successfully !',
    data: result,
  });
});

const deleteSubBranch = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await EblSubBranchService.deleteSubBranch(id);

  sendResponse<IEblSubBranch>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'sub branch deleted successfully !',
    data: result,
  });
});

export const EblSubBranchController = {
  getAllSubBranch,
  getSingleSubBranch,
  updateSubBranch,
  deleteSubBranch,
  createSubBranch,
};
