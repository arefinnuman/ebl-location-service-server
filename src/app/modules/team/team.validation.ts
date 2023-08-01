import { z } from 'zod';

const createTeamZodSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: `title is required`,
    }),
  }),
});

const updateTeamZodSchema = z.object({
  body: z.object({
    title: z
      .string({
        required_error: `title is required`,
      })
      .optional(),
  }),
});

export const TeamValidation = {
  createTeamZodSchema,
  updateTeamZodSchema,
};
