import { Schema, model } from 'mongoose';
import { DepartmentModel, IDepartment } from './department.interface';

const DepartmentSchema = new Schema<IDepartment, DepartmentModel>(
  {
    title: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);

export const Department = model<IDepartment, DepartmentModel>(
  'Department',
  DepartmentSchema,
);
