import httpStatus from 'http-status';
import mongoose from 'mongoose';
import config from '../../../config/config';
import ApiError from '../../../errors/apiError';
import { IAdmin } from '../admin/admin.interface';
import { Admin } from '../admin/admin.model';
import { IUser } from '../user/user.interface';
import { User } from '../user/user.model';
import { IViewer } from '../viewer/viewer.interface';
import { Viewer } from '../viewer/viewer.model';

const createAdmin = async (
  admin: IAdmin,
  user: IUser,
): Promise<IUser | null> => {
  if (!user.password) {
    user.password = config.default_password.admin as string;
  }

  user.role = 'admin';
  let newUserAllData = null;
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    admin.email = user.email;
    admin.employeeId = user.employeeId;
    const newAdmin = await Admin.create([admin], { session });

    if (!newAdmin.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create admin');
    }

    user.admin = newAdmin[0]._id;
    const newUser = await User.create([user], { session });
    if (!newUser.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }
    newUserAllData = newUser[0];

    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }
  if (newUserAllData) {
    newUserAllData = await User.findOne({
      employeeId: newUserAllData.employeeId,
    }).populate({
      path: 'admin',
      populate: [
        {
          path: 'department',
        },
      ],
    });
  }

  return newUserAllData;
};

const createViewer = async (
  viewer: IViewer,
  user: IUser,
): Promise<IUser | null> => {
  if (!user.password) {
    user.password = config.default_password.admin as string;
  }

  user.role = 'viewer';
  let newUserAllData = null;
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    viewer.email = user.email;
    viewer.employeeId = user.employeeId;
    const newViewer = await Viewer.create([viewer], { session });

    if (!newViewer.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create viewer');
    }

    user.viewer = newViewer[0]._id;
    const newUser = await User.create([user], { session });
    if (!newUser.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }
    newUserAllData = newUser[0];

    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }

  if (newUserAllData) {
    newUserAllData = await User.findOne({
      employeeId: newUserAllData.employeeId,
    }).populate({
      path: 'viewer',
      populate: [
        {
          path: 'department',
        },
      ],
    });
  }

  return newUserAllData;
};

const getAllUsers = async (): Promise<IUser[]> => {
  const users = await User.find()
    .populate({
      path: 'admin',
      populate: [
        {
          path: 'department',
        },
        {
          path: 'team',
        },
      ],
    })

    .populate({
      path: 'viewer',
      populate: [
        {
          path: 'department',
        },
        {
          path: 'team',
        },
      ],
    });
  return users;
};

export const UserService = {
  createAdmin,
  createViewer,
  getAllUsers,
};
