import express from 'express';
import validateRequest from '../../middleWares/validateRequest';
import { DepartmentController } from './department.controller';
import { DepartmentValidation } from './department.validation';

const router = express.Router();

router.post(
  '/create-department',
  validateRequest(DepartmentValidation.createDepartmentZodSchema),
  DepartmentController.createDepartment,
);

router.get('/:id', DepartmentController.getSingleDepartment);

router.patch(
  '/:id',
  validateRequest(DepartmentValidation.updateDepartmentZodSchema),
  DepartmentController.updateDepartment,
);

router.delete('/:id', DepartmentController.deleteDepartment);

router.get('/', DepartmentController.getAllDepartment);

export const DepartmentRoutes = router;
