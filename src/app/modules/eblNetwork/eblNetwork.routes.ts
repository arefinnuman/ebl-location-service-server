import express from 'express';
import validateRequest from '../../middleWares/validateRequest';
import { EblNetworkController } from './eblNetwork.controller';
import { EblNetworkValidation } from './eblNetwork.validation';

const router = express.Router();

router.post(
  '/create-branch',
  validateRequest(EblNetworkValidation.createBranchZodSchema),
  EblNetworkController.createBranch,
);

router.post(
  '/create-sub-branch',
  validateRequest(EblNetworkValidation.createSubBranchZodSchema),
  EblNetworkController.createSubBranch,
);

router.post(
  '/create-agent',
  validateRequest(EblNetworkValidation.createAgentZodSchema),
  EblNetworkController.createAgent,
);

router.post(
  '/create-365',
  validateRequest(EblNetworkValidation.create365ZodSchema),
  EblNetworkController.create365,
);

router.get('/', EblNetworkController.getAllNetworks);

export const EblNetworkRoutes = router;
