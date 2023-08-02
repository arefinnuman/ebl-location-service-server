import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/paginationField';
import catchAsync from '../../../custom/catchAsync';
import sendResponse from '../../../custom/sendResponse';
import pick from '../../../interface/pick';
import { ebl365FilterableFields } from './ebl365.constant ';
import { IEbl365 } from './ebl365.interface';
import { Ebl365Service } from './ebl365.service';

const createEbl365 = catchAsync(async (req: Request, res: Response) => {
  const { ...data } = req.body;
  const result = await Ebl365Service.createEbl365(data);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `Ebl 365 Created Successfully`,
    data: result,
  });
});

const getAllEbl365 = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, ebl365FilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await Ebl365Service.getAllEbl365(filters, paginationOptions);

  sendResponse<IEbl365[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'EBl365 booths retrieved successfully !',
    meta: result.meta,
    data: result.data,
  });
});

const getSingleEbl365 = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await Ebl365Service.getSingleEbl365(id);

  sendResponse<IEbl365>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Ebl365 booth retrieved successfully !',
    data: result,
  });
});

const updateEbl365 = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedData = req.body;

  const result = await Ebl365Service.updateEbl365(id, updatedData);

  sendResponse<IEbl365>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Ebl365 booth updated successfully !',
    data: result,
  });
});

const deleteEbl365 = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await Ebl365Service.deleteEbl365(id);

  sendResponse<IEbl365>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Ebl365 booth deleted successfully !',
    data: result,
  });
});

export const Ebl365Controller = {
  getAllEbl365,
  getSingleEbl365,
  updateEbl365,
  deleteEbl365,
  createEbl365,
};
