import { Model, Types } from 'mongoose';
import { IDepartment } from '../department/department.interface';

export type UserName = {
  firstName: string;
  lastName: string;
  middleName: string;
};

export type IViewer = {
  employeeId: string;
  email: string;
  fullName: UserName;
  contactNo: string;
  alternativeContactNo: string;
  dateOfBirth: string;
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  gender: 'male' | 'female';
  presentAddress: string;
  permanentAddress: string;
  department: Types.ObjectId | IDepartment;
  designation: string;
  photo?: string;
};

export type ViewerModel = Model<IViewer, Record<string, unknown>>;

export type IViewerFilters = {
  searchTerm?: string;
  id?: string;
  email?: string;
  contactNo?: string;
  emergencyContactNo?: string;
  gender?: 'male' | 'female';
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  managementDepartment?: string;
  designation?: string;
};
