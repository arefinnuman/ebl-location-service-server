/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-this-alias */

import bcrypt from 'bcrypt';
import { Schema, model } from 'mongoose';
import config from '../../../config/config';
import { IUser, UserModel } from './user.interface';

const userSchema = new Schema<IUser, UserModel>(
  {
    employeeId: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    employeeCardNumber: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      enum: ['admin', 'viewer'],
      default: 'viewer',
    },
    password: {
      type: String,
      select: 0,
    },
    fullName: {
      firstName: {
        type: String,
        required: true,
      },
      lastName: {
        type: String,
        required: true,
      },
      middleName: {
        type: String,
      },
    },
    contactNo: {
      type: String,
      required: true,
    },
    alternativeContactNo: {
      type: String,
    },
    dateOfBirth: {
      type: String,
      required: true,
    },
    bloodGroup: {
      type: String,
      enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
    },
    gender: {
      type: String,
      enum: ['male', 'female'],
    },
    presentAddress: {
      type: String,
      required: true,
    },
    permanentAddress: {
      type: String,
      required: true,
    },
    department: {
      type: String,
      enum: ['test-1', 'test-2'],
    },
    designation: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
    },
    needsPasswordChange: {
      type: Boolean,
      default: true,
    },
    approvedByAdmin: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);
userSchema.statics.isUserExist = async function (
  employeeId: string,
): Promise<Pick<
  IUser,
  | 'employeeId'
  | 'email'
  | 'password'
  | 'role'
  | 'needsPasswordChange'
  | 'approvedByAdmin'
> | null> {
  return await User.findOne(
    { employeeId },
    { id: 1, password: 1, role: 1, needsPasswordChange: 1, approvedByAdmin: 1 },
  );
};

userSchema.statics.isPasswordMatched = async function (
  givenPassword: string,
  savedPassword: string,
): Promise<boolean> {
  return await bcrypt.compare(givenPassword, savedPassword);
};

userSchema.pre('save', async function (next) {
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});

export const User = model<IUser, UserModel>('User', userSchema);
