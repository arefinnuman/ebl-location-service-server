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
    role: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      select: 0,
    },
    needsPasswordChange: {
      type: Boolean,
      default: true,
    },
    approvedByAdmin: {
      type: Boolean,
      default: false,
    },

    admin: {
      type: Schema.Types.ObjectId,
      ref: 'Admin',
    },

    viewer: {
      type: Schema.Types.ObjectId,
      ref: 'Viewer',
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
  id: string,
): Promise<Pick<
  IUser,
  'employeeId' | 'email' | 'password' | 'role' | 'needsPasswordChange'
> | null> {
  return await User.findOne(
    { id },
    { id: 1, password: 1, role: 1, needsPasswordChange: 1 },
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
