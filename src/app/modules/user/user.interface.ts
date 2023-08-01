/* eslint-disable no-unused-vars */
import { Model, Types } from 'mongoose';

export type IUser = {
  employeeId: string;
  password: string;
  email: string;
  needsPasswordChange: true | false;
  approvedByAdmin: true | false;
  role: string;
  admin?: Types.ObjectId;
  viewer?: Types.ObjectId;
};

export type UserModel = {
  isUserExist(
    id: string,
  ): Promise<
    Pick<
      IUser,
      'employeeId' | 'email' | 'password' | 'role' | 'needsPasswordChange'
    >
  >;
  isPasswordMatched(
    givenPassword: string,
    savedPassword: string,
  ): Promise<boolean>;
} & Model<IUser>;
