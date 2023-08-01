import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { employeeFilterableFields } from '../../../constants/employee.constant';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../custom/catchAsync';
import sendResponse from '../../../custom/sendResponse';
import pick from '../../../interface/pick';
import { IViewer } from './viewer.interface';
import { ViewerService } from './viewer.service';

const getAllViewers = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, employeeFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await ViewerService.getAllViewers(filters, paginationOptions);

  sendResponse<IViewer[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Viewers retrieved successfully !',
    meta: result.meta,
    data: result.data,
  });
});

const getSingleViewer = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await ViewerService.getSingleViewer(id);

  sendResponse<IViewer>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Viewer retrieved successfully !',
    data: result,
  });
});

const updateViewer = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedData = req.body;

  const result = await ViewerService.updateViewer(id, updatedData);

  sendResponse<IViewer>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Viewer updated successfully !',
    data: result,
  });
});

const deleteViewer = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await ViewerService.deleteViewer(id);

  sendResponse<IViewer>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Viewer deleted successfully !',
    data: result,
  });
});

export const ViewerController = {
  getAllViewers,
  getSingleViewer,
  deleteViewer,
  updateViewer,
};
