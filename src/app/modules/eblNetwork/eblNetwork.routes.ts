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

export const EblNetworkRoutes = router;
