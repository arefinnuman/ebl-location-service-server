"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EblNetworkValidation = void 0;
const zod_1 = require("zod");
const createBranchZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        networkId: zod_1.z.string().optional(),
        eblBranch: zod_1.z.object({
            serialNo: zod_1.z.string({
                required_error: 'Serial No is required from zod',
            }),
            branchName: zod_1.z.string({
                required_error: 'Branch Name is required from zod',
            }),
            branchCode: zod_1.z
                .string({
                required_error: 'Branch Code is required from zod',
            })
                .optional(),
            branchDivision: zod_1.z.string({
                required_error: 'Branch Division is required',
            }),
            branchAddress: zod_1.z.string({
                required_error: 'Branch Address is required',
            }),
            branchMapLink: zod_1.z.string({
                required_error: 'Branch Map Link is required',
            }),
            branchLocation: zod_1.z
                .object({
                lat: zod_1.z.number().optional(),
                lng: zod_1.z.number().optional(),
            })
                .optional(),
        }),
    }),
});
const createSubBranchZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        networkId: zod_1.z.string().optional(),
        eblSubBranch: zod_1.z.object({
            serialNo: zod_1.z.string({
                required_error: 'Serial No is required from zod',
            }),
            subBranchName: zod_1.z.string({
                required_error: 'Sub Branch Name is required from zod',
            }),
            subBranchCode: zod_1.z
                .string({
                required_error: 'Sub Branch Code is required from zod',
            })
                .optional(),
            subBranchDivision: zod_1.z.string({
                required_error: 'Sub Branch Division is required',
            }),
            subBranchAddress: zod_1.z.string({
                required_error: 'Sub Branch Address is required',
            }),
            subBranchMapLink: zod_1.z.string({
                required_error: 'Sub Branch Map Link is required',
            }),
            branchLocation: zod_1.z
                .object({
                lat: zod_1.z.number().optional(),
                lng: zod_1.z.number().optional(),
            })
                .optional(),
        }),
    }),
});
const createAgentZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        networkId: zod_1.z.string().optional(),
        eblAgent: zod_1.z.object({
            serialNo: zod_1.z.string({
                required_error: 'Serial No is required from zod',
            }),
            agentName: zod_1.z.string({
                required_error: 'Agent Name is required from zod',
            }),
            agentCode: zod_1.z
                .string({
                required_error: 'Agent Code is required from zod',
            })
                .optional(),
            agentDivision: zod_1.z.string({
                required_error: 'Agent Division is required',
            }),
            agentAddress: zod_1.z.string({
                required_error: 'Agent Address is required',
            }),
            agentMapLink: zod_1.z.string({
                required_error: 'Agent Map Link is required',
            }),
            agentLocation: zod_1.z
                .object({
                lat: zod_1.z.number().optional(),
                lng: zod_1.z.number().optional(),
            })
                .optional(),
        }),
    }),
});
const create365ZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        networkId: zod_1.z.string().optional(),
        ebl365: zod_1.z.object({
            serialNo: zod_1.z.string({
                required_error: 'Serial No is required from zod',
            }),
            ebl365Name: zod_1.z.string({
                required_error: '365 Name is required from zod',
            }),
            ebl365Code: zod_1.z
                .string({
                required_error: '365 Code is required from zod',
            })
                .optional(),
            ebl365Division: zod_1.z.string({
                required_error: '365 Division is required',
            }),
            ebl365Address: zod_1.z.string({
                required_error: '365 Address is required',
            }),
            ebl365MapLink: zod_1.z.string({
                required_error: '365 Map Link is required',
            }),
            ebl365Location: zod_1.z
                .object({
                lat: zod_1.z.number().optional(),
                lng: zod_1.z.number().optional(),
            })
                .optional(),
        }),
    }),
});
exports.EblNetworkValidation = {
    createBranchZodSchema,
    createSubBranchZodSchema,
    createAgentZodSchema,
    create365ZodSchema,
};
