import { Model, Types } from 'mongoose';
import { IDepartment } from '../department/department.interface';
import { ITeam } from '../team/team.interface';

export type UserName = {
  firstName: string;
  lastName: string;
  middleName: string;
};

export type ISuperAdmin = {
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

export type SuperAdminModel = Model<ISuperAdmin, Record<string, unknown>>;
