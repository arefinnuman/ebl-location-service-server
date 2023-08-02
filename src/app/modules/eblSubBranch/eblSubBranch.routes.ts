import express from 'express';
import { EblSubBranchController } from './eblSubBranch.controller';

const router = express.Router();

router.post('/', EblSubBranchController.createSubBranch);

router.get('/', EblSubBranchController.getAllSubBranch);

router.get('/:id', EblSubBranchController.getSingleSubBranch);

router.patch('/:id', EblSubBranchController.updateSubBranch);

router.delete('/:id', EblSubBranchController.deleteSubBranch);

export const EblSubBranchRoutes = router;
