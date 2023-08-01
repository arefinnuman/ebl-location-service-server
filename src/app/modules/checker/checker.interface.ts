import { Model, Types } from 'mongoose';
import { IDepartment } from '../department/department.interface';
import { ITeam } from '../team/team.interface';

export type UserName = {
  firstName: string;
  lastName: string;
  middleName: string;
};

export type IChecker = {
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
  team: Types.ObjectId | ITeam;
  photo?: string;
};

export type CheckerModel = Model<IChecker, Record<string, unknown>>;

export type ICheckerFilters = {
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
