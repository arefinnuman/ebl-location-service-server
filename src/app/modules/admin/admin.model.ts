import { Schema, model } from 'mongoose';
import { AdminModel, IAdmin } from './admin.interface';

const AdminSchema = new Schema<IAdmin, AdminModel>(
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
      enum: ['male', 'female'],
    },
    bloodGroup: {
      type: String,
      enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
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
    photo: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

export const Admin = model<IAdmin, AdminModel>('Admin', AdminSchema);
