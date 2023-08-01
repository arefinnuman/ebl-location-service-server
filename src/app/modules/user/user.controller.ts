import { Request, RequestHandler, Response } from 'express';
import httpStatus from 'http-status';

import { IUser } from './user.interface';
import { UserService } from './user.service';
import catchAsync from '../../../custom/catchAsync';
import sendResponse from '../../../custom/sendResponse';

const createSuperAdmin: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { superAdmin, ...userData } = req.body;
    const result = await UserService.createSuperAdmin(superAdmin, userData);

    sendResponse<IUser>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Super Admin created successfully!',
      data: result,
    });
  },
);

const createAdmin: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { admin, ...userData } = req.body;
    const result = await UserService.createAdmin(admin, userData);

    sendResponse<IUser>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Admin created successfully!',
      data: result,
    });
  },
);

const createMaker: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { maker, ...userData } = req.body;
    const result = await UserService.createMaker(maker, userData);

    sendResponse<IUser>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Maker created successfully!',
      data: result,
    });
  },
);

const createChecker: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { checker, ...userData } = req.body;
    const result = await UserService.createChecker(checker, userData);

    sendResponse<IUser>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'checker created successfully!',
      data: result,
    });
  },
);

const createViewer: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { viewer, ...userData } = req.body;
    const result = await UserService.createViewer(viewer, userData);

    sendResponse<IUser>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Viewer created successfully!',
      data: result,
    });
  },
);

const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.getAllUsers();

  sendResponse<IUser[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Users retrieved successfully !',
    data: result,
  });
});

export const UserController = {
  createSuperAdmin,
  createAdmin,
  createMaker,
  createChecker,
  createViewer,
  getAllUsers,
};
