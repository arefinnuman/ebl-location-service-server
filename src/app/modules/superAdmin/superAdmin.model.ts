import { Schema, model } from 'mongoose';
import { bloodGroup } from '../../../constants/bloodGroup';
import { gender } from '../../../constants/gender';
import { ISuperAdmin, SuperAdminModel } from './superAdmin.interface';

const SuperAdminSchema = new Schema<ISuperAdmin, SuperAdminModel>(
  {
    employeeId: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
    },
    fullName: {
      type: {
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
          required: false,
        },
      },
      required: true,
    },
    dateOfBirth: {
      type: String,
    },
    gender: {
      type: String,
      enum: [...gender] as [string, ...string[]],
    },
    bloodGroup: {
      type: String,
      enum: [...bloodGroup] as [string, ...string[]],
    },
    contactNo: {
      type: String,
      unique: true,
      required: true,
    },
    alternativeContactNo: {
      type: String,
      required: true,
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
      type: Schema.Types.ObjectId,
      ref: 'Department',
      required: true,
    },
    designation: {
      type: String,
      required: true,
    },
    team: {
      type: Schema.Types.ObjectId,
      ref: 'Team',
      required: true,
    },
    photo: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

export const SuperAdmin = model<ISuperAdmin, SuperAdminModel>(
  'SuperAdmin',
  SuperAdminSchema,
);
