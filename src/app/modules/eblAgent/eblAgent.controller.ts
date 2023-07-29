import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../custom/catchAsync';
import sendResponse from '../../../custom/sendResponse';
import pick from '../../../interface/pick';
import { paginationFields } from '../../constants/paginationField';
import { agentFilterableFields } from './eblAgent.constant';
import { IEblAgent } from './eblAgent.interface';
import { EblAgentService } from './eblAgent.service';

const getAllAgent = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, agentFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await EblAgentService.getAllAgent(filters, paginationOptions);

  sendResponse<IEblAgent[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'ebl agent retrieved successfully !',
    meta: result.meta,
    data: result.data,
  });
});

const getSingleAgent = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await EblAgentService.getSingleAgent(id);

  sendResponse<IEblAgent>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'ebl agent retrieved successfully !',
    data: result,
  });
});

const updateAgent = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedData = req.body;

  const result = await EblAgentService.updateAgent(id, updatedData);

  sendResponse<IEblAgent>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'ebl agent updated successfully !',
    data: result,
  });
});

const deleteAgent = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await EblAgentService.deleteAgent(id);

  sendResponse<IEblAgent>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'ebl agent deleted successfully !',
    data: result,
  });
});

export const EblAgentController = {
  getAllAgent,
  getSingleAgent,
  updateAgent,
  deleteAgent,
};
