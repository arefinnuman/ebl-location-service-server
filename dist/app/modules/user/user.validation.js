"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidation = void 0;
const zod_1 = require("zod");
const bloodGroup_1 = require("../../../constants/bloodGroup");
const gender_1 = require("../../../constants/gender");
const createAdminZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        employeeId: zod_1.z.string(),
        email: zod_1.z.string(),
        password: zod_1.z.string().optional(),
        fullName: zod_1.z.object({
            firstName: zod_1.z
                .string({
                required_error: 'First name is required',
            })
                .nonempty(),
            lastName: zod_1.z
                .string({
                required_error: 'Last name is required',
            })
                .nonempty(),
            middleName: zod_1.z.string().optional(),
        }),
        gender: zod_1.z.enum([...gender_1.gender], {
            required_error: 'Gender is required',
        }),
        dateOfBirth: zod_1.z
            .string({
            required_error: 'Date of birth is required',
        })
            .nonempty(),
        contactNo: zod_1.z
            .string({
            required_error: 'Contact number is required',
        })
            .nonempty(),
        alternativeContactNo: zod_1.z
            .string({
            required_error: 'Alternative contact number is required',
        })
            .nonempty(),
        presentAddress: zod_1.z
            .string({
            required_error: 'Present address is required',
        })
            .nonempty(),
        permanentAddress: zod_1.z
            .string({
            required_error: 'Permanent address is required',
        })
            .nonempty(),
        bloodGroup: zod_1.z
            .enum([...bloodGroup_1.bloodGroup], {
            required_error: 'Blood group is required',
        })
            .optional(),
        designation: zod_1.z.string().optional(),
        department: zod_1.z
            .string({
            required_error: 'Department faculty is required',
        })
            .nonempty(),
    }),
});
const createViewerZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        employeeId: zod_1.z.string().optional(),
        email: zod_1.z.string(),
        password: zod_1.z.string().optional(),
        fullName: zod_1.z.object({
            firstName: zod_1.z
                .string({
                required_error: 'First name is required',
            })
                .nonempty(),
            lastName: zod_1.z
                .string({
                required_error: 'Last name is required',
            })
                .nonempty(),
            middleName: zod_1.z.string().optional(),
        }),
        gender: zod_1.z.enum([...gender_1.gender], {
            required_error: 'Gender is required',
        }),
        dateOfBirth: zod_1.z
            .string({
            required_error: 'Date of birth is required',
        })
            .nonempty(),
        contactNo: zod_1.z
            .string({
            required_error: 'Contact number is required',
        })
            .nonempty(),
        alternativeContactNo: zod_1.z
            .string({
            required_error: 'Alternative contact number is required',
        })
            .nonempty(),
        presentAddress: zod_1.z
            .string({
            required_error: 'Present address is required',
        })
            .nonempty(),
        permanentAddress: zod_1.z
            .string({
            required_error: 'Permanent address is required',
        })
            .nonempty(),
        bloodGroup: zod_1.z
            .enum([...bloodGroup_1.bloodGroup], {
            required_error: 'Blood group is required',
        })
            .optional(),
        designation: zod_1.z.string().optional(),
        department: zod_1.z
            .string({
            required_error: 'Department faculty is required',
        })
            .nonempty(),
    }),
});
const updateUserZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        fullName: zod_1.z
            .object({
            firstName: zod_1.z.string().optional(),
            lastName: zod_1.z.string().optional(),
            middleName: zod_1.z.string().optional(),
        })
            .optional(),
        dateOfBirth: zod_1.z.string().optional(),
        gender: zod_1.z.string().optional(),
        bloodGroup: zod_1.z.string().optional(),
        email: zod_1.z.string().email().optional(),
        contactNo: zod_1.z.string().optional(),
        emergencyContactNo: zod_1.z.string().optional(),
        presentAddress: zod_1.z.string().optional(),
        permanentAddress: zod_1.z.string().optional(),
        department: zod_1.z.string().optional(),
        designation: zod_1.z.string().optional(),
        profileImage: zod_1.z.string().optional(),
    }),
});
exports.UserValidation = {
    createAdminZodSchema,
    createViewerZodSchema,
    updateUserZodSchema,
};
