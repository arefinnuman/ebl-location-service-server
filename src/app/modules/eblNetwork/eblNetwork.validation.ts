import { z } from 'zod';

const createBranchZodSchema = z.object({
  body: z.object({
    networkId: z.string().optional(),

    eblBranch: z.object({
      serialNo: z.string({
        required_error: 'Serial No is required from zod',
      }),
      branchName: z.string({
        required_error: 'Branch Name is required from zod',
      }),
      branchCode: z
        .string({
          required_error: 'Branch Code is required from zod',
        })
        .optional(),
      branchDivision: z.string({
        required_error: 'Branch Division is required',
      }),
      branchAddress: z.string({
        required_error: 'Branch Address is required',
      }),
      branchMapLink: z.string({
        required_error: 'Branch Map Link is required',
      }),
      branchLocation: z
        .object({
          lat: z.number().optional(),
          lng: z.number().optional(),
        })
        .optional(),
    }),
  }),
});

const createSubBranchZodSchema = z.object({
  body: z.object({
    networkId: z.string().optional(),

    eblSubBranch: z.object({
      serialNo: z.string({
        required_error: 'Serial No is required from zod',
      }),
      subBranchName: z.string({
        required_error: 'Sub Branch Name is required from zod',
      }),
      subBranchCode: z
        .string({
          required_error: 'Sub Branch Code is required from zod',
        })
        .optional(),
      subBranchDivision: z.string({
        required_error: 'Sub Branch Division is required',
      }),
      subBranchAddress: z.string({
        required_error: 'Sub Branch Address is required',
      }),
      subBranchMapLink: z.string({
        required_error: 'Sub Branch Map Link is required',
      }),
      branchLocation: z
        .object({
          lat: z.number().optional(),
          lng: z.number().optional(),
        })
        .optional(),
    }),
  }),
});

export const EblNetworkValidation = {
  createBranchZodSchema,
  createSubBranchZodSchema,
};
