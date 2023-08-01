import express from 'express';
import { UpdateValidation } from '../../../constants/updateEmployeeValidation';
import validateRequest from '../../middleWares/validateRequest';
import { CheckerController } from './checker.controller';

const router = express.Router();

router.get('/:id', CheckerController.gerSingleChecker);

router.patch(
  '/:id',
  validateRequest(UpdateValidation.updateEmployee),
  CheckerController.updateChecker,
);

router.delete('/:id', CheckerController.deleteChecker);

router.get('/', CheckerController.getAllChecker);

export const CheckerRoutes = router;
