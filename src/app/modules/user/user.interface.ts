/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';

export type UserName = {
  firstName: string;
  lastName: string;
  middleName: string;
};

export type IUser = {
  employeeId: string;
  password: string;
  email: string;
  employeeCardNumber: string;
  role: 'admin' | 'viewer';
  fullName: UserName;
  contactNo: string;
  alternativeContactNo: string;
  dateOfBirth: string;
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  gender: 'male' | 'female';
  presentAddress: string;
  permanentAddress: string;
  department: 'test-1' | 'test-2';
  designation: string;
  photo?: string;
  needsPasswordChange: true | false;
  approvedByAdmin: true | false;
};

export type UserModel = {
  isUserExist(
    employeeId: string,
  ): Promise<
    Pick<
      IUser,
      | 'employeeId'
      | 'email'
      | 'password'
      | 'role'
      | 'needsPasswordChange'
      | 'approvedByAdmin'
    >
  >;
  isPasswordMatched(
    givenPassword: string,
    savedPassword: string,
  ): Promise<boolean>;
} & Model<IUser>;

export type IUserFilters = {
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
