import express from 'express';
import { EblBranchController } from './eblBranch.controller';

const router = express.Router();

router.post('/', EblBranchController.createBranch);

router.get('/', EblBranchController.getAllBranch);

router.get('/:id', EblBranchController.getSingleBranch);

router.patch('/:id', EblBranchController.updateBranch);

router.delete('/:id', EblBranchController.deleteBranch);

export const EblBranchRoutes = router;
