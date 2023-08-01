import { Schema, model } from 'mongoose';
import { IMaker, MakerModel } from './maker.interface';

const MakerSchema = new Schema<IMaker, MakerModel>(
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

export const Maker = model<IMaker, MakerModel>('Maker', MakerSchema);
