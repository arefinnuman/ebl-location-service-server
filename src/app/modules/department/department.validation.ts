import { z } from 'zod';

const createDepartmentZodSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: `title is required`,
    }),
  }),
});

const updateDepartmentZodSchema = z.object({
  body: z.object({
    title: z
      .string({
        required_error: `title is required`,
      })
      .optional(),
  }),
});

export const DepartmentValidation = {
  createDepartmentZodSchema,
  updateDepartmentZodSchema,
};
