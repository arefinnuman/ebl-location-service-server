import { Request, RequestHandler, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../custom/catchAsync';
import sendResponse from '../../../custom/sendResponse';
import { EblNetworkService } from './eblNetwork.service';

const createBranch: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { eblBranch, ...networkData } = req.body;
    const result = await EblNetworkService.createBranch(eblBranch, networkData);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: `branch created successfully`,
      data: result,
    });
  },
);

const createSubBranch: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { eblSubBranch, ...networkData } = req.body;
    const result = await EblNetworkService.createSubBranch(
      eblSubBranch,
      networkData,
    );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: `sub branch created successfully`,
      data: result,
    });
  },
);

export const EblNetworkController = {
  createBranch,
  createSubBranch,
};
