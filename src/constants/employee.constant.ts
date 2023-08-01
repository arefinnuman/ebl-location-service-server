export const employeeFilterableFields = [
  'searchTerm',
  'id',
  'gender',
  'bloodGroup',
  'email',
  'contactNo',
  'alternateContactNo',
  'department',
  'designation',
];

export const employeeSearchableFields = [
  'email',
  'contactNo',
  'emergencyContactNo',
  'name.firstName',
  'name.lastName',
  'name.middleName',
];

export type IEmployeeFilters = {
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
