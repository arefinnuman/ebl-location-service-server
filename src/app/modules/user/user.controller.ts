import { Request, RequestHandler, Response } from 'express';
import httpStatus from 'http-status';
import { employeeFilterableFields } from '../../../constants/employee.constant';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../custom/catchAsync';
import sendResponse from '../../../custom/sendResponse';
import pick from '../../../interface/pick';
import { IUser } from './user.interface';
import { UserService } from './user.service';

const createAdmin: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { ...admin } = req.body;
    const result = await UserService.createAdmin(admin);

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
    const { ...viewer } = req.body;
    const result = await UserService.createViewer(viewer);

    sendResponse<IUser>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Viewer created successfully!',
      data: result,
    });
  },
);

const getAllUser = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, employeeFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await UserService.getAllUser(filters, paginationOptions);

  sendResponse<IUser[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Users retrieved successfully !',
    meta: result.meta,
    data: result.data,
  });
});

const getSingleUser = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await UserService.getSingleUser(id);

  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User retrieved successfully !',
    data: result,
  });
});

const updateUser = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedData = req.body;

  const result = await UserService.updateUser(id, updatedData);

  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User updated successfully !',
    data: result,
  });
});

const deleteUser = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await UserService.deleteUser(id);

  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User deleted successfully !',
    data: result,
  });
});

const updateToAdmin = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await UserService.updateToAdmin(id);

  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User updated to admin successfully !',
    data: result,
  });
});

const updateToViewer = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await UserService.updateToViewer(id);

  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User updated to viewer successfully !',
    data: result,
  });
});

const approvedByAdmin = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await UserService.approvedByAdmin(id);

  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User approved by admin successfully !',
    data: result,
  });
});

const rejectedByAdmin = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await UserService.rejectedByAdmin(id);

  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User rejected by admin successfully !',
    data: result,
  });
});

const createUserByAdmin = catchAsync(async (req: Request, res: Response) => {
  const { ...user } = req.body;
  const result = await UserService.createUserByAdmin(user);

  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User created successfully !',
    data: result,
  });
});

export const UserController = {
  createAdmin,
  createViewer,
  getAllUser,
  getSingleUser,
  updateUser,
  deleteUser,
  updateToAdmin,
  updateToViewer,
  approvedByAdmin,
  rejectedByAdmin,
  createUserByAdmin,
};
