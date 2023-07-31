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

const createAgent: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { eblAgent, ...networkData } = req.body;
    const result = await EblNetworkService.createAgent(eblAgent, networkData);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: `agent created successfully`,
      data: result,
    });
  },
);

const create365: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { ebl365, ...networkData } = req.body;
    const result = await EblNetworkService.create365(ebl365, networkData);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: `365 created successfully`,
      data: result,
    });
  },
);

const getAllNetworks: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await EblNetworkService.getAllNetworks();

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: `All networks fetched successfully`,
      data: result,
    });
  },
);

export const EblNetworkController = {
  createBranch,
  createSubBranch,
  createAgent,
  create365,
  getAllNetworks,
};
