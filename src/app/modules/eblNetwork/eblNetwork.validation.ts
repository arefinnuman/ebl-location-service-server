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

const createAgentZodSchema = z.object({
  body: z.object({
    networkId: z.string().optional(),

    eblAgent: z.object({
      serialNo: z.string({
        required_error: 'Serial No is required from zod',
      }),
      agentName: z.string({
        required_error: 'Agent Name is required from zod',
      }),
      agentCode: z
        .string({
          required_error: 'Agent Code is required from zod',
        })
        .optional(),
      agentDivision: z.string({
        required_error: 'Agent Division is required',
      }),
      agentAddress: z.string({
        required_error: 'Agent Address is required',
      }),
      agentMapLink: z.string({
        required_error: 'Agent Map Link is required',
      }),

      agentLocation: z
        .object({
          lat: z.number().optional(),
          lng: z.number().optional(),
        })
        .optional(),
    }),
  }),
});

const create365ZodSchema = z.object({
  body: z.object({
    networkId: z.string().optional(),

    ebl365: z.object({
      serialNo: z.string({
        required_error: 'Serial No is required from zod',
      }),
      ebl365Name: z.string({
        required_error: '365 Name is required from zod',
      }),
      ebl365Code: z
        .string({
          required_error: '365 Code is required from zod',
        })
        .optional(),
      ebl365Division: z.string({
        required_error: '365 Division is required',
      }),
      ebl365Address: z.string({
        required_error: '365 Address is required',
      }),
      ebl365MapLink: z.string({
        required_error: '365 Map Link is required',
      }),
      ebl365Location: z
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
  createAgentZodSchema,
  create365ZodSchema,
};
