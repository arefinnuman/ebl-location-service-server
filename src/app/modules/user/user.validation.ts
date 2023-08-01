import { z } from 'zod';
import { bloodGroup } from '../../../constants/bloodGroup';
import { designation } from '../../../constants/designation';
import { gender } from '../../../constants/gender';

const createAdminZodSchema = z.object({
  body: z.object({
    employeeId: z.string(),
    email: z.string(),
    password: z.string().optional(),

    admin: z.object({
      fullName: z.object({
        firstName: z
          .string({
            required_error: 'First name is required',
          })
          .nonempty(),

        lastName: z
          .string({
            required_error: 'Last name is required',
          })
          .nonempty(),

        middleName: z.string().optional(),
      }),

      gender: z.enum([...gender] as [string, ...string[]], {
        required_error: 'Gender is required',
      }),

      dateOfBirth: z
        .string({
          required_error: 'Date of birth is required',
        })
        .nonempty(),

      contactNo: z
        .string({
          required_error: 'Contact number is required',
        })
        .nonempty(),

      alternativeContactNo: z
        .string({
          required_error: 'Alternative contact number is required',
        })
        .nonempty(),

      presentAddress: z
        .string({
          required_error: 'Present address is required',
        })
        .nonempty(),

      permanentAddress: z
        .string({
          required_error: 'Permanent address is required',
        })
        .nonempty(),

      bloodGroup: z
        .enum([...bloodGroup] as [string, ...string[]], {
          required_error: 'Blood group is required',
        })
        .optional(),

      designation: z.enum([...designation] as [string, ...string[]], {
        required_error: 'Designation is required',
      }),

      department: z
        .string({
          required_error: 'Academic faculty is required',
        })
        .nonempty(),
    }),
  }),
});

const createViewerZodSchema = z.object({
  body: z.object({
    employeeId: z.string(),
    email: z.string(),
    password: z.string().optional(),

    viewer: z.object({
      fullName: z.object({
        firstName: z
          .string({
            required_error: 'First name is required',
          })
          .nonempty(),

        lastName: z
          .string({
            required_error: 'Last name is required',
          })
          .nonempty(),

        middleName: z.string().optional(),
      }),

      gender: z.enum([...gender] as [string, ...string[]], {
        required_error: 'Gender is required',
      }),

      dateOfBirth: z
        .string({
          required_error: 'Date of birth is required',
        })
        .nonempty(),

      contactNo: z
        .string({
          required_error: 'Contact number is required',
        })
        .nonempty(),

      alternativeContactNo: z
        .string({
          required_error: 'Alternative contact number is required',
        })
        .nonempty(),

      presentAddress: z
        .string({
          required_error: 'Present address is required',
        })
        .nonempty(),

      permanentAddress: z
        .string({
          required_error: 'Permanent address is required',
        })
        .nonempty(),

      bloodGroup: z
        .enum([...bloodGroup] as [string, ...string[]], {
          required_error: 'Blood group is required',
        })
        .optional(),

      designation: z.enum([...designation] as [string, ...string[]], {
        required_error: 'Designation is required',
      }),

      department: z
        .string({
          required_error: 'Academic faculty is required',
        })
        .nonempty(),

      team: z
        .string({
          required_error: 'Academic department is required',
        })
        .nonempty(),
    }),
  }),
});

export const UserValidation = {
  createAdminZodSchema,
  createViewerZodSchema,
};
