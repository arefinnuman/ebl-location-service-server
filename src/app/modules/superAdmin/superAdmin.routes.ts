import express from 'express';
import { UpdateValidation } from '../../../constants/updateEmployeeValidation';
import validateRequest from '../../middleWares/validateRequest';
import { SuperAdminController } from './superAdmin.controller';

const router = express.Router();

router.get('/:id', SuperAdminController.gerSingleSuperAdmin);

router.patch(
  '/:id',
  validateRequest(UpdateValidation.updateEmployee),
  SuperAdminController.updateSuperAdmin,
);

router.delete('/:id', SuperAdminController.deleteAdmin);

router.get('/', SuperAdminController.getAllSuperAdmin);

export const SuperAdminRoutes = router;
