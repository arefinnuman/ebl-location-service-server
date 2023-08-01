import { Request, RequestHandler, Response } from 'express';
import httpStatus from 'http-status';

import catchAsync from '../../../custom/catchAsync';
import sendResponse from '../../../custom/sendResponse';
import { IUser } from './user.interface';
import { UserService } from './user.service';

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
  createAdmin,
  createViewer,
  getAllUsers,
};
